import { GameState } from '../../types/game';
import { cloneGameState } from '../../utils/immutable';

export function resolveReadingProjects(state: GameState): GameState {
  return cloneGameState(state);
}
