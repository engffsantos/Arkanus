import { GameState } from '../../types/game';
import { cloneGameState } from '../../utils/immutable';

export function resolveAuraPressure(state: GameState): GameState {
  return cloneGameState(state);
}
