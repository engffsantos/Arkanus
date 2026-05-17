import { GameState } from '../../types/game';
import { cloneGameState } from '../../utils/immutable';
import { createLogEvent } from '../../services/actions/shared';

export function resolveFactionPressure(state: GameState): GameState {
  const nextState = cloneGameState(state);

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

  return nextState;
}
