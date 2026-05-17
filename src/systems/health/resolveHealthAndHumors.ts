import { GameState } from '../../types/game';
import { cloneGameState } from '../../utils/immutable';
import { resolveHealthAndPopulation } from '../../services/season/healthEngine';

export function resolveHealthAndHumors(state: GameState): GameState {
  return resolveHealthAndPopulation(cloneGameState(state));
}
