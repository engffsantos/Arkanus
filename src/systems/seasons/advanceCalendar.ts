import { GameState } from '../../types/game';
import { cloneGameState } from '../../utils/immutable';
import { createLogEvent } from '../../services/actions/shared';

export function advanceCalendar(state: GameState): GameState {
  const nextState = cloneGameState(state);
  
  const seasons = ['Primavera', 'Verão', 'Outono', 'Inverno'];
  const currentSeasonIndex = seasons.indexOf(nextState.meta.season);
  const nextSeasonIndex = (currentSeasonIndex + 1) % 4;
  const nextSeason = seasons[nextSeasonIndex] as any;
  const nextYear = nextSeason === 'Primavera' ? nextState.meta.year + 1 : nextState.meta.year;

  if (nextSeason === 'Primavera') {
      const logEvent = createLogEvent(nextState, 'Sistema', `Ano ${nextYear} começa.`);
      nextState.events = [logEvent, ...nextState.events].slice(0, 50);
  }

  nextState.meta = {
    ...nextState.meta,
    season: nextSeason,
    year: nextYear,
    turn: nextState.meta.turn + 1
  };

  return nextState;
}
