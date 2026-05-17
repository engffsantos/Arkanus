import { GameState } from '../../types/game';
import { createLogEvent } from './shared';

export function handleConflictAction(state: GameState, action: {type: string, payload: any, factionId?: string, conflictId?: string}): GameState {
  const nextState = JSON.parse(JSON.stringify(state)) as GameState;

  if (action.type === 'DIPLOMACY_SEND_EMISSARY') {
     nextState.diplomacy.factions = nextState.diplomacy.factions.map(f => {
         if (f.id === action.factionId) {
             return { ...f, relations: Math.min(100, f.relations + 5) };
         }
         return f;
     });
  } else if (action.type === 'CONFLICT_PREPARE_DEFENSE') {
     nextState.conflicts.tribunalPreparation = (nextState.conflicts.tribunalPreparation || 0) + 10;
     const logEvent = createLogEvent(nextState, 'Conflitos', `Nossa defesa jurídica aumentou neste tribunal.`);
     nextState.events = [logEvent, ...nextState.events].slice(0, 50);
  } else if (action.type === 'CONFLICT_RESOLVE_DUEL') {
     const victory = Math.random() > 0.4;
     if (victory) {
        nextState.resources.prestigio += 10;
        nextState.conflicts.activeConflicts = nextState.conflicts.activeConflicts.filter((c: any) => c.id !== action.conflictId);
        const logEvent = createLogEvent(nextState, 'Conflitos', `Vitória no certâmen mágico! Conflito resolvido e prestígio adquirido.`);
        nextState.events = [logEvent, ...nextState.events].slice(0, 50);
     } else {
        nextState.covenant.auraArcana -= 2;
        nextState.conflicts.activeConflicts = nextState.conflicts.activeConflicts.filter((c: any) => c.id !== action.conflictId);
        const logEvent = createLogEvent(nextState, 'Conflitos', `Derrota no certâmen. Nossa aura arcana sofreu consequências.`);
        nextState.events = [logEvent, ...nextState.events].slice(0, 50);
     }
  } else if (action.type === 'DIPLOMACY_OFFER_BRIBE') {
     nextState.diplomacy.factions = nextState.diplomacy.factions.map(f => {
         if (f.id === action.factionId) {
             return { ...f, relations: Math.min(100, f.relations + 25) };
         }
         return f;
     });
  }

  return nextState;
}
