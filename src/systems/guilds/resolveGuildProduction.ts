import { GameState } from '../../types/game';
import { cloneGameState } from '../../utils/immutable';

export function resolveGuildProduction(state: GameState): GameState {
  return cloneGameState(state);
}
