import { GameState } from '../../types/game';
import { cloneGameState } from '../../utils/immutable';
import { createLogEvent } from '../../services/actions/shared';

export function resolveSeasonSummary(state: GameState): GameState {
  const nextState = cloneGameState(state);
  
  const maintenance = nextState.covenant.expensesPerSeason + (nextState.laboratory.level * 10);
  const income = nextState.covenant.incomePerSeason;
  const seasonalLog = `Estação de ${nextState.meta.season} resolvida. Receita: ${income} Prata. Despesas: ${maintenance} Prata.`;
  
  const finalLogEvent = createLogEvent(nextState, 'Sistema', seasonalLog);
  nextState.events = [finalLogEvent, ...nextState.events].slice(0, 50);

  // Clear primary action at the very end of summary
  nextState.meta.primaryAction = undefined;

  return nextState;
}
