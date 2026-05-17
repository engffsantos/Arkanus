import { GameState } from '../../types/game';
import { cloneGameState } from '../../utils/immutable';

export function resolveVictoryDefeatConditions(state: GameState): GameState {
  return cloneGameState(state);
}
