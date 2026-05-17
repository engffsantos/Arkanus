import { GameState, GameEvent } from '../types/game';
import { resolveSeasonalEvents } from './eventEngine';
import { applyCost, applyEffects, createLogEvent } from './actions/shared';
import { handleLaboratoryAction } from './actions/laboratoryActions';
import { handleLibraryAction } from './actions/libraryActions';
import { handleCharterAction } from './actions/charterActions';
import { handleCommerceAction } from './actions/commerceActions';
import { handleConflictAction } from './actions/conflictActions';

export { applyEffects, createLogEvent };

export function resolveAction(state: GameState, action: any): { state: GameState, error?: string } {
  const costResult = applyCost(state, action.cost);
  if (costResult.error) return costResult;
  let nextState = costResult.state;

  if (action.effects) {
    nextState = applyEffects(nextState, action.effects);
  }

  const logEvent = createLogEvent(nextState, action.category || 'Atividade', action.description || 'Uma ação foi realizada.');
  nextState.events = [logEvent, ...nextState.events].slice(0, 50);

  if (action.type?.startsWith('LAB_')) {
    nextState = handleLaboratoryAction(nextState, action);
  } else if (action.type?.startsWith('LIBRARY_')) {
    nextState = handleLibraryAction(nextState, action);
  } else if (action.type?.startsWith('EXTRACT_CHARTER_') || action.type?.startsWith('EMIT_CHARTER')) {
    nextState = handleCharterAction(nextState, action);
  } else if (action.type?.startsWith('COMMERCE_') || action.type?.startsWith('ESTABLISH_')) {
    nextState = handleCommerceAction(nextState, action);
  } else if (action.type?.startsWith('DIPLOMACY_') || action.type?.startsWith('CONFLICT_')) {
    nextState = handleConflictAction(nextState, action);
  }

  return { state: nextState };
}

export { advanceSeason } from './season/seasonEngine';
