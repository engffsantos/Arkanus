import { GameState } from '../../types/game';
import { cloneGameState } from '../../utils/immutable';

export function resolveTerritoryProduction(state: GameState): GameState {
  return cloneGameState(state);
}
