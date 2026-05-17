import { GameState } from '../../types/game';
import { resolveAction, createLogEvent } from '../actionDispatcher';
import { resolveEconomy } from './economyEngine';
import { resolveHealthAndPopulation } from './healthEngine';
import { resolveSeasonalEvents } from '../eventEngine';

export function advanceSeason(state: GameState): GameState {
  let nextState = JSON.parse(JSON.stringify(state)) as GameState;

  // 1. Resolve Primary Action
  const primaryActionSnapshot = nextState.meta.primaryAction;
  if (primaryActionSnapshot) {
     const result = resolveAction(nextState, primaryActionSnapshot.payload);
     if (!result.error) {
       nextState = result.state;
     } else {
       const logEvent = createLogEvent(nextState, 'Sistema', `Ação falhou: ${result.error}`);
       nextState.events = [logEvent, ...nextState.events].slice(0, 50);
     }

     // 1.5. Progress Lab Projects
     if (primaryActionSnapshot.category === 'Laboratório') {
       const progressGiven = 15 + nextState.laboratory.level + nextState.laboratory.quality;
       const newActive: typeof nextState.laboratory.activeProjects = [];
       const newCompleted = [...nextState.laboratory.completedProjects];

       for (const proj of nextState.laboratory.activeProjects) {
          if (proj.status === 'active') {
             const failed = Math.random() * 100 < proj.risk;
             if (failed) {
                const logEvent = createLogEvent(nextState, 'Laboratório', `Um erro catastrófico ocorreu no experimento "${proj.name}"! Progresso perdido e materiais danificados.`);
                nextState.events = [logEvent, ...nextState.events].slice(0, 50);
                nextState.laboratory.safety -= 1;
                if (Math.random() > 0.5) {
                   continue;
                } else {
                   newActive.push({ ...proj, accumulatedProgress: 0, status: 'paused' });
                   continue;
                }
             }

             const updatedProj = { ...proj, accumulatedProgress: proj.accumulatedProgress + progressGiven };
             if (updatedProj.accumulatedProgress >= updatedProj.requiredTotal) {
                updatedProj.status = 'completed';
                newCompleted.push(updatedProj);
                const logEvent = createLogEvent(nextState, 'Laboratório', `Experimento "${updatedProj.name}" concluído com sucesso!`);
                nextState.events = [logEvent, ...nextState.events].slice(0, 50);
             } else {
                newActive.push(updatedProj);
             }
          } else {
             newActive.push(proj);
          }
       }
       nextState.laboratory.activeProjects = newActive;
       nextState.laboratory.completedProjects = newCompleted;
     }

     nextState.meta.primaryAction = undefined; // clear lock
  }

  // 2. Economy
  nextState = resolveEconomy(nextState);

  // 3. Health & Crises
  nextState = resolveHealthAndPopulation(nextState);

  const seasons = ['Primavera', 'Verão', 'Outono', 'Inverno'];
  const currentSeasonIdx = seasons.indexOf(nextState.meta.season);
  const isAdvanceYear = currentSeasonIdx === 3;
  const nextSeasonField = seasons[(currentSeasonIdx + 1) % 4] as any;
  const nextYearField = isAdvanceYear ? nextState.meta.year + 1 : nextState.meta.year;

  // 4.5. Resolve Caravans returning
  if (nextState.commerce && nextState.commerce.caravans) {
     const stillActive: typeof nextState.commerce.caravans = [];
     let caravanProfits = 0;
     for (const caravan of nextState.commerce.caravans) {
        if (caravan.status === 'active' && caravan.returnSeason === nextSeasonField && caravan.returnYear === nextYearField) {
           const risk = Math.random() * 100;
           if (risk < 15) {
              const logEvent = createLogEvent(nextState, 'Comércio', `A caravana para ${caravan.destination} foi assaltada ou sofreu perdas. Não retornou lucro.`);
              nextState.events = [logEvent, ...nextState.events].slice(0, 50);
              caravan.status = 'lost';
           } else {
              const profit = 150 + Math.floor(Math.random() * 150);
              caravanProfits += profit;
              caravan.status = 'returning';
              const logEvent = createLogEvent(nextState, 'Comércio', `A caravana de ${caravan.destination} retornou com sucesso, trazendo lucros.`);
              nextState.events = [logEvent, ...nextState.events].slice(0, 50);
           }
        } else {
           stillActive.push(caravan);
        }
     }
     if (caravanProfits > 0) {
        nextState.resources.prata += caravanProfits;
        const logEvent = createLogEvent(nextState, 'Comércio', `Lucro total de bens comerciais: ${caravanProfits} Prata.`);
        nextState.events = [logEvent, ...nextState.events].slice(0, 50);
     }
     nextState.commerce.caravans = nextState.commerce.caravans.map((c: any) => c.status === 'active' || c.status === 'returning' || c.status === 'lost' ? c : c).filter((c: any) => c.status === 'active');
  }

  // Determine Faction relation decay and possible crises
  if (nextState.diplomacy && nextState.diplomacy.factions) {
     nextState.diplomacy.factions = nextState.diplomacy.factions.map(f => {
         let newRel = f.relations;
         if (newRel > 50) newRel -= 1;
         if (newRel < 50) newRel += 1;
         
         if (newRel < 30 && Math.random() > 0.7) {
            const logEvent = createLogEvent(nextState, 'Diplomacia', `A facção ${f.name} gerou um atrito formal. Isso pode causar conflitos em breve.`);
            nextState.events = [logEvent, ...nextState.events].slice(0, 50);
            nextState.covenant.unrest += 5;
         }
         return { ...f, relations: newRel };
     });
  }

  const currentSeasonIndex = seasons.indexOf(nextState.meta.season);
  const nextSeasonIndex = (currentSeasonIndex + 1) % 4;
  const nextSeason = seasons[nextSeasonIndex] as any;
  const nextYear = nextSeason === 'Primavera' ? nextState.meta.year + 1 : nextState.meta.year;

  if (nextSeason === 'Primavera') {
      const logEvent = createLogEvent(nextState, 'Sistema', `Ano ${nextYear} começa.`);
      nextState.events = [logEvent, ...nextState.events].slice(0, 50);

      // Resolve Tribunal
      if (nextYear % 7 === 0) {
          if ((nextState.conflicts.activeConflicts?.length || 0) > 0) {
              const prep = nextState.conflicts.tribunalPreparation || 0;
              if (prep >= 10) {
                 const logEvent = createLogEvent(nextState, 'Tribunal', `O Tribunal Hermético foi realizado. Vencemos todas as disputas abertas legalmente.`);
                 nextState.events = [logEvent, ...nextState.events].slice(0, 50);
                 nextState.conflicts.activeConflicts = [];
                 nextState.resources.prestigio += 20;
              } else {
                 const logEvent = createLogEvent(nextState, 'Tribunal', `O Tribunal Hermético julgou desfavoravelmente. Pagamos pesadas multas.`);
                 nextState.events = [logEvent, ...nextState.events].slice(0, 50);
                 nextState.resources.prata = Math.max(0, nextState.resources.prata - 300);
                 nextState.conflicts.activeConflicts = [];
                 nextState.resources.prestigio = Math.max(0, nextState.resources.prestigio - 10);
              }
          } else {
              const logEvent = createLogEvent(nextState, 'Tribunal', `Um Tribunal Hermético pacífico. Recebemos aprovação pela estabilidade.`);
              nextState.events = [logEvent, ...nextState.events].slice(0, 50);
              nextState.resources.prestigio += 5;
          }
          nextState.conflicts.tribunalPreparation = 0;
      }
      
      if (Math.random() > 0.8 && (nextState.conflicts.activeConflicts?.length || 0) === 0) {
          const names = ["Soberania de Aethelgard", "Mago Exilado", "Guilda de Salernum"];
          const cName = names[Math.floor(Math.random()*names.length)];
          nextState.conflicts.activeConflicts = [{
              id: Date.now().toString(),
              title: "Disputa Fronteiriça ou Legal",
              type: "magical",
              opponent: cName,
              severity: 4,
              status: "preparing",
              deadlineSeason: 'Inverno',
              deadlineYear: nextYear + 7 - (nextYear % 7),
              possibleOutcomes: []
          }];
          const logEvent = createLogEvent(nextState, 'Conflitos', `Disputa formulada por ${cName}. Precisará ser resolvida até o próximo Tribunal.`);
          nextState.events = [logEvent, ...nextState.events].slice(0, 50);
      }
  }

  nextState.meta = {
    ...nextState.meta,
    season: nextSeason,
    year: nextYear,
    turn: nextState.meta.turn + 1
  };

  const arrivingCaravans = nextState.commerce.caravans.filter((c: any) => c.returnSeason === nextSeason && c.returnYear === nextYear && c.status === 'active');
  const remainingCaravans = nextState.commerce.caravans.filter((c: any) => !(c.returnSeason === nextSeason && c.returnYear === nextYear && c.status === 'active'));

  let tradeProfit = 0;
  for (const c of arrivingCaravans) {
     c.status = 'returning';
     tradeProfit += 120;
     const logEvent = createLogEvent(nextState, 'Comércio', `Caravana retornou de ${c.destination} com ${120} pratas.`);
     nextState.events = [logEvent, ...nextState.events].slice(0, 50);
  }

  if (tradeProfit > 0) {
    nextState.resources.prata += tradeProfit;
  }
  
  nextState.commerce.caravans = [...remainingCaravans, ...arrivingCaravans.map((c: any) => ({...c, status: 'returning'} as typeof c))];

  const maintenance = nextState.covenant.expensesPerSeason + (nextState.laboratory.level * 10);
  const income = nextState.covenant.incomePerSeason;
  const seasonalLog = `Estação de ${nextState.meta.season} avançada. Receita: ${income}. Despesas: ${maintenance}.`;
  
  const finalLogEvent = createLogEvent(nextState, 'Sistema', seasonalLog);
  nextState.events = [finalLogEvent, ...nextState.events].slice(0, 50);

  // 4. Resolve Dynamic Seasonal Events
  nextState = resolveSeasonalEvents(nextState);

  return nextState;
}
