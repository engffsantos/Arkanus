import { GameState } from '../../types/game';
import { GameAction, ResolvedActionResult } from '../../types/actions';
import { cloneGameState } from '../../utils/immutable';
import { applyCost, applyEffects, createLogEvent } from '../../services/actions/shared';
import { EVENT_DATABASE } from '../../data/events';

export function resolveEventAction(state: GameState, action: GameAction): ResolvedActionResult {
  const nextState = cloneGameState(state);
  const { eventId, choiceId } = action.payload as any;

  if (!eventId || !choiceId) {
    return { ok: false, state, error: 'Evento ou escolha inválidos.', logs: [] };
  }

  const template = EVENT_DATABASE.find((e) => e.id === eventId);
  if (!template) {
    return { ok: false, state, error: 'Templates de evento não encontrado.', logs: [] };
  }

  const choice = template.choices.find((c) => c.id === choiceId);
  if (!choice) {
    return { ok: false, state, error: 'Escolha não encontrada.', logs: [] };
  }

  // Remove event from queue
  if (nextState.meta.activeEventsQueue) {
    nextState.meta.activeEventsQueue = nextState.meta.activeEventsQueue.filter(id => id !== eventId);
  }

  // Apply cost
  if (choice.cost) {
    const costResult = applyCost(nextState, choice.cost);
    if (costResult.error) {
      return { ok: false, state, error: costResult.error, logs: [] };
    }
  }

  // Apply effects
  if (choice.effects && choice.effects.length > 0) {
    const stateAfterEffects = applyEffects(nextState, choice.effects);
    Object.assign(nextState, stateAfterEffects);
  }

  const log = createLogEvent(nextState, 'Eventos', choice.logMessage || `Opção selecionada no evento ${template.title}.`);
  nextState.events = [log, ...nextState.events].slice(0, 50);

  return { ok: true, state: nextState, logs: [log] };
}
