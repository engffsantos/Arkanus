import { GameState } from '../../types/game';
import { cloneGameState } from '../../utils/immutable';

export function resolveCharterEffects(state: GameState): GameState {
  return cloneGameState(state);
}
