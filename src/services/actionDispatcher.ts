import { GameState, GameEvent } from '../types/game';
import { GameAction, ResolvedActionResult } from '../types/actions';
import { resolveSeasonalEvents } from './eventEngine';
import { applyCost, applyEffects, createLogEvent } from './actions/shared';
import { handleLaboratoryAction } from './actions/laboratoryActions';
import { handleLibraryAction } from './actions/libraryActions';
import { handleCharterAction } from './actions/charterActions';
import { handleCommerceAction } from './actions/commerceActions';
import { handleConflictAction } from './actions/conflictActions';
import { cloneGameState } from '../utils/immutable';
import { resolveEventAction } from '../systems/events/eventResolver';

export { applyEffects, createLogEvent };

export function resolveAction(state: GameState, action: GameAction): ResolvedActionResult {
  const costResult = applyCost(state, action.cost);
  if (costResult.error) return { ok: false, state, error: costResult.error, logs: [] };
  
  let nextState = cloneGameState(costResult.state);

  if (action.effects) {
    nextState = applyEffects(nextState, action.effects);
  }

  const logEvent = createLogEvent(nextState, action.domain || 'Atividade', action.description || 'Uma ação foi realizada.');
  nextState.events = [logEvent, ...nextState.events].slice(0, 50);

  if (typeof action.type === 'string') {
    if (action.type === 'EVENT_CHOOSE_OPTION') {
      nextState = resolveEventAction(nextState, action as any).state;
    } else if (action.type.startsWith('LAB_')) {
      nextState = handleLaboratoryAction(nextState, action as any);
    } else if (action.type.startsWith('LIBRARY_')) {
      nextState = handleLibraryAction(nextState, action as any);
    } else if (action.type.startsWith('EXTRACT_CHARTER_') || action.type.startsWith('EMIT_CHARTER')) {
      nextState = handleCharterAction(nextState, action as any);
    } else if (action.type.startsWith('COMMERCE_') || action.type.startsWith('ESTABLISH_')) {
      nextState = handleCommerceAction(nextState, action as any);
    } else if (action.type.startsWith('DIPLOMACY_') || action.type.startsWith('CONFLICT_')) {
      nextState = handleConflictAction(nextState, action as any);
    }
  }

  return { ok: true, state: nextState, logs: [] };
}

export function dispatchGameAction(state: GameState, action: GameAction): ResolvedActionResult {
   return resolveAction(state, action);
}

export { advanceSeason } from '../systems/seasons/advanceSeason';
