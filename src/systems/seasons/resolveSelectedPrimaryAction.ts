import { GameState } from '../../types/game';
import { cloneGameState } from '../../utils/immutable';
import { resolveAction, createLogEvent } from '../../services/actionDispatcher';

export function resolveSelectedPrimaryAction(state: GameState): GameState {
  let next = cloneGameState(state);
  const primaryActionSnapshot = next.meta.primaryAction;
  
  if (primaryActionSnapshot) {
     const result = resolveAction(next, primaryActionSnapshot.payload as any);
     if (!result.error) {
       next = result.state;
     } else {
       const logEvent = createLogEvent(next, 'Sistema', `Ação falhou: ${result.error}`);
       next.events = [logEvent, ...next.events].slice(0, 50);
     }
  }
  return next;
}
