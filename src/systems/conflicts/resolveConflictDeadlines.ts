import { GameState } from '../../types/game';
import { cloneGameState } from '../../utils/immutable';
import { createLogEvent } from '../../services/actions/shared';

export function resolveConflictDeadlines(state: GameState): GameState {
  const nextState = cloneGameState(state);
  
  const seasons = ['Primavera', 'Verão', 'Outono', 'Inverno'];
  const currentSeasonIndex = seasons.indexOf(nextState.meta.season);
  const nextSeasonIndex = (currentSeasonIndex + 1) % 4;
  const nextSeason = seasons[nextSeasonIndex] as any;
  const nextYear = nextSeason === 'Primavera' ? nextState.meta.year + 1 : nextState.meta.year;

  if (nextSeason === 'Primavera') {
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

  return nextState;
}
