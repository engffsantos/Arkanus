import { GameState } from '../../types/game';
import { cloneGameState } from '../../utils/immutable';
import { resolveEconomy as oldResolveEconomy } from '../../services/season/economyEngine';

export function resolveEconomy(state: GameState): GameState {
  return oldResolveEconomy(cloneGameState(state));
}
