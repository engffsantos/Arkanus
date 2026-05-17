import { GameState } from '../../types/game';
import { cloneGameState } from '../../utils/immutable';
import { EVENT_DATABASE } from '../../data/events';

export function generateSeasonalEvents(state: GameState): GameState {
  const nextState = cloneGameState(state);
  
  if (!nextState.meta.activeEventsQueue) {
    nextState.meta.activeEventsQueue = [];
  }

  // Filter based on very rudimentary conditions for now (season matching, or none specified)
  const eligibleEvents = EVENT_DATABASE.filter(ev => {
     if (ev.allowedSeasons && ev.allowedSeasons.length > 0 && ev.allowedSeasons.includes(nextState.meta.season as any) === false) {
       return false;
     }
     if (ev.minYear && nextState.meta.year < ev.minYear) {
       return false;
     }
     return true;
  });

  if (eligibleEvents.length === 0) return nextState;

  // Weighted random pick
  const totalWeight = eligibleEvents.reduce((acc, ev) => acc + (ev.weight || 10), 0);
  let randomVal = Math.random() * totalWeight;

  let selectedEvent = eligibleEvents[0];
  for (const ev of eligibleEvents) {
    if (randomVal < (ev.weight || 10)) {
      selectedEvent = ev;
      break;
    }
    randomVal -= (ev.weight || 10);
  }

  // Enqueue event
  nextState.meta.activeEventsQueue.push(selectedEvent.id);

  return nextState;
}
