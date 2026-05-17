import { GameState, GameEvent } from '../types/game';
import { resolveSeasonalEvents } from './eventEngine';

// This is a generic game effect target modifier
export function applyEffects(state: GameState, effects: any[]): GameState {
  let nextState = { ...state };
  // Just stubbing basic dynamic effect resolution for now (Sprint 6.5 real action application)
  for (const effect of effects) {
    if (effect.target === 'publicHealth') {
      nextState.covenant.publicHealth = Math.max(0, Math.min(100, nextState.covenant.publicHealth + effect.value));
    }
    if (effect.target === 'loyalty') {
      nextState.covenant.loyalty = Math.max(0, Math.min(100, nextState.covenant.loyalty + effect.value));
    }
    if (effect.target === 'security') {
      nextState.covenant.security = Math.max(0, Math.min(100, nextState.covenant.security + effect.value));
    }
    if (effect.target === 'epidemicRisk') {
      nextState.health.epidemicRisk = Math.max(0, Math.min(100, nextState.health.epidemicRisk + effect.value));
    }
    if (effect.target === 'unrest') {
      nextState.covenant.unrest = Math.max(0, Math.min(100, nextState.covenant.unrest + effect.value));
    }
  }
  return nextState;
}

export function createLogEvent(state: GameState, category: string, text: string): GameEvent {
  return {
    id: Date.now().toString() + Math.random().toString(),
    text: `[${category}] ${text}`,
    season: state.meta.season,
    year: state.meta.year,
    type: 'normal'
  };
}

export function resolveAction(state: GameState, action: any): { state: GameState, error?: string } {
  let nextState = { ...state };

  // Common cost check
  if (action.cost?.prata) {
    if (nextState.resources.prata < action.cost.prata) {
      return { state, error: 'Prata insuficiente.' };
    }
    nextState.resources = {
      ...nextState.resources,
      prata: nextState.resources.prata - action.cost.prata
    };
  }

  // Common effects
  if (action.effects) {
    nextState = applyEffects(nextState, action.effects);
  }

  // Create Log Event
  let logEvent = createLogEvent(nextState, action.category || 'Atividade', action.description || 'Uma ação foi realizada.');
  
  nextState.events = [logEvent, ...nextState.events].slice(0, 50);

  // Hardcoded handlers for Sprint 6.5 (should be refactored to action systems later)
  if (action.type === 'LAB_NEW_PROJECT') {
    nextState.laboratory.activeProjects = [
      ...nextState.laboratory.activeProjects,
      action.payload
    ];
    logEvent = createLogEvent(nextState, 'Laboratório', `Iniciou planejamento do experimento: ${action.payload.name}.`);
  } else if (action.type === 'LAB_PAUSE_PROJECT') {
     nextState.laboratory.activeProjects = nextState.laboratory.activeProjects.map(p => 
        p.id === action.payload.id ? { ...p, status: 'paused' } : p
     );
     logEvent = createLogEvent(nextState, 'Laboratório', `Experimento pausado.`);
  } else if (action.type === 'LAB_RESUME_PROJECT') {
     nextState.laboratory.activeProjects = nextState.laboratory.activeProjects.map(p => 
        p.id === action.payload.id ? { ...p, status: 'active' } : p
     );
     logEvent = createLogEvent(nextState, 'Laboratório', `Experimento retomado.`);
  } else if (action.type === 'LIBRARY_SCRIBE_BOOK') {
    nextState.library = {
      ...nextState.library,
      books: [...nextState.library.books, action.payload.book || {
        id: Date.now().toString(),
        title: 'Tratado de Fundamentos',
        type: 'tratado',
        subject: 'Vim',
        level: 5,
        quality: 7,
        author: 'Mago Anônimo',
        language: 'Latim',
        status: 'available',
      }]
    };
    logEvent = createLogEvent(nextState, 'Biblioteca', action.payload.description || `Obra adicionada ao acervo.`);
  } else if (action.type === 'EXTRACT_CHARTER_ESSENCIA') {
    nextState.resources.essencia.total += 1;
    nextState.resources.essencia.rego += 1;
    nextState.charters.activeCharter.sympatheticConnectionActive = false;
    nextState.covenant.unrest += 5;
  } else if (action.type === 'EMIT_CHARTER') {
     nextState.resources.prata -= 250;
     
     let arcanaEff = -2;
     let sacraEff = 5;
     
     if (action.payload.type === 'encantado') {
        arcanaEff = 3;
        sacraEff = -3;
     } else if (action.payload.type === 'abissal') {
        arcanaEff = 5;
        sacraEff = -10;
     }

     nextState.charters.activeCharter = {
        ...nextState.charters.activeCharter,
        type: action.payload.type,
        auraArcanaEffect: arcanaEff,
        auraSacraEffect: sacraEff,
        sympatheticConnectionActive: true
     };
     nextState.covenant.auraArcana += arcanaEff;
     nextState.covenant.auraSacra += sacraEff;
     logEvent = createLogEvent(nextState, 'Jurisdição', `Foral ${action.payload.type} emitido. Propriedades místicas das terras alteradas.`);
  } else if (action.type === 'DIPLOMACY_SEND_EMISSARY') {
     nextState.diplomacy.factions = nextState.diplomacy.factions.map(f => {
         if (f.id === action.factionId) {
             return { ...f, relations: Math.min(100, f.relations + 5) };
         }
         return f;
     });
  } else if (action.type === 'CONFLICT_PREPARE_DEFENSE') {
     nextState.conflicts.tribunalPreparation = (nextState.conflicts.tribunalPreparation || 0) + 10;
     logEvent = createLogEvent(nextState, 'Conflitos', `Nossa defesa jurídica aumentou neste tribunal.`);
  } else if (action.type === 'CONFLICT_RESOLVE_DUEL') {
     const victory = Math.random() > 0.4;
     if (victory) {
        nextState.resources.prestigio += 10;
        nextState.conflicts.activeConflicts = nextState.conflicts.activeConflicts.filter(c => c.id !== action.conflictId);
        logEvent = createLogEvent(nextState, 'Conflitos', `Vitória no certâmen mágico! Conflito resolvido e prestígio adquirido.`);
     } else {
        nextState.covenant.auraArcana -= 2;
        nextState.conflicts.activeConflicts = nextState.conflicts.activeConflicts.filter(c => c.id !== action.conflictId);
        logEvent = createLogEvent(nextState, 'Conflitos', `Derrota no certâmen. Nossa aura arcana sofreu consequências.`);
     }
  } else if (action.type === 'DIPLOMACY_OFFER_BRIBE') {
     nextState.diplomacy.factions = nextState.diplomacy.factions.map(f => {
         if (f.id === action.factionId) {
             return { ...f, relations: Math.min(100, f.relations + 25) };
         }
         return f;
     });
  } else if (action.type === 'ESTABLISH_GUILD') {
     nextState.resources.prata -= 100;
     nextState.guilds = {
        ...nextState.guilds,
        guilds: [...(nextState.guilds.guilds || []), action.payload]
     };
     logEvent = createLogEvent(nextState, 'Governança', `Guilda de ${action.payload.type} estabelecida.`);
  } else if (action.type === 'LAB_DISTILL_ESSENCIA') {
    nextState.resources.essencia.total += 3;
    nextState.resources.essencia.vim += 3;
  } else if (action.type === 'COMMERCE_SEND_CARAVAN') {
    const currentSeasons = ['Primavera', 'Verão', 'Outono', 'Inverno'];
    const currentSeasonIndex = currentSeasons.indexOf(nextState.meta.season);
    const nextSeason = currentSeasons[(currentSeasonIndex + 1) % 4] as any;
    const nextYear = nextSeason === 'Primavera' ? nextState.meta.year + 1 : nextState.meta.year;

    nextState.commerce.caravans = [...nextState.commerce.caravans, {
      id: Date.now().toString(),
      destination: action.payload?.destination || 'Feira de Champagne',
      stock: [], // empty for stub
      status: 'active',
      returnSeason: nextSeason,
      returnYear: nextYear
    }];
  }

  return { state: nextState };
}

// Pipeline for ADVANCE_TURN (Sprint 6.5 resolution step 7)
export function advanceSeason(state: GameState): GameState {
  let nextState = { ...state };

  // 1. Resolve Primary Action
  const primaryActionSnapshot = nextState.meta.primaryAction;
  if (primaryActionSnapshot) {
     const result = resolveAction(nextState, primaryActionSnapshot.payload);
     if (!result.error) {
       nextState = result.state;
     } else {
       nextState.events = [createLogEvent(nextState, 'Sistema', `Ação falhou: ${result.error}`), ...nextState.events].slice(0, 50);
     }

     // 1.5. Progress Lab Projects if primary action was Laboratory
     if (primaryActionSnapshot.category === 'Laboratório') {
       const progressGiven = 15 + nextState.laboratory.level + nextState.laboratory.quality;
       const newActive: typeof nextState.laboratory.activeProjects = [];
       const newCompleted = [...nextState.laboratory.completedProjects];

       for (const proj of nextState.laboratory.activeProjects) {
          if (proj.status === 'active') {
             // Check risk failure
             const failed = Math.random() * 100 < proj.risk;
             
             if (failed) {
                nextState.events = [createLogEvent(nextState, 'Laboratório', `Um erro catastrófico ocorreu no experimento "${proj.name}"! Progresso perdido e materiais danificados.`), ...nextState.events].slice(0, 50);
                nextState.laboratory.safety -= 1;
                // Destroy project or just wipe progress
                if (Math.random() > 0.5) {
                   continue; // Destroy project
                } else {
                   newActive.push({ ...proj, accumulatedProgress: 0, status: 'paused' });
                   continue;
                }
             }

             const updatedProj = { ...proj, accumulatedProgress: proj.accumulatedProgress + progressGiven };
             if (updatedProj.accumulatedProgress >= updatedProj.requiredTotal) {
                updatedProj.status = 'completed';
                newCompleted.push(updatedProj);
                nextState.events = [createLogEvent(nextState, 'Laboratório', `Experimento "${updatedProj.name}" concluído com sucesso!`), ...nextState.events].slice(0, 50);
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

  // 2. Resolve basic seasonal resources
  const income = nextState.covenant.incomePerSeason;
  const maintenance = nextState.covenant.expensesPerSeason + (nextState.laboratory.level * 10);
  
  nextState.resources = {
    ...nextState.resources,
    prata: Math.max(0, nextState.resources.prata + income - maintenance),
    essencia: {
      ...nextState.resources.essencia,
      total: nextState.resources.essencia.total + (nextState.covenant.auraArcana >= 3 ? 1 : 0) // Base aura regen
    }
  };

  // 3. Health & Crises
  // Epidemic risk increases if health is low, decreases if high
  if (nextState.covenant.publicHealth < 40) {
     nextState.health.epidemicRisk += 5;
  } else if (nextState.covenant.publicHealth > 70) {
     nextState.health.epidemicRisk = Math.max(0, nextState.health.epidemicRisk - 5);
  }

  // Population Dynamics
  const popGrowthRate = (nextState.covenant.publicHealth - 50) + (nextState.covenant.loyalty - 50);
  const newPop = Math.ceil(nextState.covenant.population + (nextState.covenant.population * (popGrowthRate / 1000)));
  nextState.covenant.population = Math.max(10, newPop);

  // 4. Guilds and Commerce Production
  if (nextState.guilds && nextState.guilds.guilds) {
     let silverProduced = 0;
     for (const guild of nextState.guilds.guilds) {
       silverProduced += guild.level * 10;
     }
     if (silverProduced > 0) {
        nextState.resources.prata += silverProduced;
        nextState.events = [createLogEvent(nextState, 'Comércio', `As guildas produziram ${silverProduced} Prata no total.`), ...nextState.events].slice(0, 50);
     }
  }

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
           // Return the caravan with profit and risk
           const risk = Math.random() * 100;
           if (risk < 15) {
              nextState.events = [createLogEvent(nextState, 'Comércio', `A caravana para ${caravan.destination} foi assaltada ou sofreu perdas. Não retornou lucro.`), ...nextState.events].slice(0, 50);
              caravan.status = 'lost';
           } else {
              const profit = 150 + Math.floor(Math.random() * 150);
              caravanProfits += profit;
              caravan.status = 'returning';
              nextState.events = [createLogEvent(nextState, 'Comércio', `A caravana de ${caravan.destination} retornou com sucesso, trazendo lucros.`), ...nextState.events].slice(0, 50);
           }
        } else {
           stillActive.push(caravan);
        }
     }
     if (caravanProfits > 0) {
        nextState.resources.prata += caravanProfits;
        nextState.events = [createLogEvent(nextState, 'Comércio', `Lucro total de bens comerciais: ${caravanProfits} Prata.`), ...nextState.events].slice(0, 50);
     }
     nextState.commerce.caravans = nextState.commerce.caravans.map(c => c.status === 'active' || c.status === 'returning' || c.status === 'lost' ? c : c).filter(c => c.status === 'active');
  }

  // Very high risk or unrest triggers a crisis
  if (nextState.health.epidemicRisk > 80 && Math.random() > 0.5) {
     const deaths = Math.floor(nextState.covenant.population * 0.1); 
     nextState.covenant.population = Math.max(0, nextState.covenant.population - deaths);
     nextState.covenant.loyalty -= 10;
     nextState.health.epidemicRisk = 20; // reset after crisis
     nextState.events = [createLogEvent(nextState, 'Crise', `Epidemia atingiu a soberania! Muitas mortes.`), ...nextState.events].slice(0, 50);
  }

  if (nextState.covenant.unrest > 80 && Math.random() > 0.5) {
     nextState.covenant.security -= 20;
     nextState.covenant.loyalty -= 20;
     nextState.covenant.unrest = 30; // reset after break
     nextState.events = [createLogEvent(nextState, 'Crise', `Uma revolta camponesa danificou estruturas e reduziu a segurança.`), ...nextState.events].slice(0, 50);
  }

  // Determine Faction relation decay and possible crises
  if (nextState.diplomacy && nextState.diplomacy.factions) {
     nextState.diplomacy.factions = nextState.diplomacy.factions.map(f => {
         let newRel = f.relations;
         // Slight decay towards 50
         if (newRel > 50) newRel -= 1;
         if (newRel < 50) newRel += 1;
         
         // Trigger low relation events
         if (newRel < 30 && Math.random() > 0.7) {
            nextState.events = [createLogEvent(nextState, 'Diplomacia', `A facção ${f.name} gerou um atrito formal. Isso pode causar conflitos em breve.`), ...nextState.events].slice(0, 50);
            nextState.covenant.unrest += 5;
         }
         return { ...f, relations: newRel };
     });
  }

  const currentSeasons = ['Primavera', 'Verão', 'Outono', 'Inverno'];
  const currentSeasonIndex = currentSeasons.indexOf(nextState.meta.season);
  const nextSeasonIndex = (currentSeasonIndex + 1) % 4;
  const nextSeason = currentSeasons[nextSeasonIndex] as any;
  const nextYear = nextSeason === 'Primavera' ? nextState.meta.year + 1 : nextState.meta.year;

  if (nextSeason === 'Primavera') {
      nextState.events = [createLogEvent(nextState, 'Sistema', `Ano ${nextYear} começa.`), ...nextState.events].slice(0, 50);

      // Resolve Tribunal Hermetic on years divisible by 7
      if (nextYear % 7 === 0) {
          if ((nextState.conflicts.activeConflicts?.length || 0) > 0) {
              const prep = nextState.conflicts.tribunalPreparation || 0;
              if (prep >= 10) {
                 nextState.events = [createLogEvent(nextState, 'Tribunal', `O Tribunal Hermético foi realizado. Vencemos todas as disputas abertas legalmente.`), ...nextState.events].slice(0, 50);
                 nextState.conflicts.activeConflicts = [];
                 nextState.resources.prestigio += 20;
              } else {
                 nextState.events = [createLogEvent(nextState, 'Tribunal', `O Tribunal Hermético julgou desfavoravelmente. Pagamos pesadas multas.`), ...nextState.events].slice(0, 50);
                 nextState.resources.prata = Math.max(0, nextState.resources.prata - 300);
                 nextState.conflicts.activeConflicts = [];
                 nextState.resources.prestigio = Math.max(0, nextState.resources.prestigio - 10);
              }
          } else {
              nextState.events = [createLogEvent(nextState, 'Tribunal', `Um Tribunal Hermético pacífico. Recebemos aprovação pela estabilidade.`), ...nextState.events].slice(0, 50);
              nextState.resources.prestigio += 5;
          }
          nextState.conflicts.tribunalPreparation = 0;
      }
      
      // Every year chance to spawn new conflict
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
          nextState.events = [createLogEvent(nextState, 'Conflitos', `Disputa formulada por ${cName}. Precisará ser resolvida até o próximo Tribunal.`), ...nextState.events].slice(0, 50);
      }
  }

  nextState.meta = {
    ...nextState.meta,
    season: nextSeason,
    year: nextYear,
    turn: nextState.meta.turn + 1
  };

  // Resolve Caravans arriving this season
  const arrivingCaravans = nextState.commerce.caravans.filter(c => c.returnSeason === nextSeason && c.returnYear === nextYear && c.status === 'active');
  const remainingCaravans = nextState.commerce.caravans.filter(c => !(c.returnSeason === nextSeason && c.returnYear === nextYear && c.status === 'active'));

  let tradeProfit = 0;
  for (const c of arrivingCaravans) {
     c.status = 'returning'; // Actually we can just remove them or set 'returning'
     // Simple stub math: gain 120 silver per caravan
     tradeProfit += 120;
     nextState.events = [createLogEvent(nextState, 'Comércio', `Caravana retornou de ${c.destination} com ${120} pratas.`), ...nextState.events].slice(0, 50);
  }

  if (tradeProfit > 0) {
    nextState.resources.prata += tradeProfit;
  }
  
  nextState.commerce.caravans = [...remainingCaravans, ...arrivingCaravans.map(c => ({...c, status: 'returning'} as typeof c))];

  // Pipeline summary event
  const seasonalLog = `Estação de ${nextState.meta.season} avançada. Receita: ${income}. Despesas: ${maintenance}.`;
  nextState.events = [createLogEvent(nextState, 'Sistema', seasonalLog), ...nextState.events].slice(0, 50);

  // 4. Resolve Dynamic Seasonal Events
  nextState = resolveSeasonalEvents(nextState);

  return nextState;
}
