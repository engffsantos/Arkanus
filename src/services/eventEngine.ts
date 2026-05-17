import { GameState, GameEvent } from '../types/game';
import { createLogEvent } from './actionDispatcher';

export interface EventTemplate {
  id: string;
  title: string;
  description: string;
  type: 'climate' | 'political' | 'religious' | 'magical' | 'economic' | 'health' | 'territorial';
  weight: number;
  condition: (state: GameState) => boolean;
  apply: (state: GameState) => { nextState: GameState, log: string };
}

export const seasonalEvents: EventTemplate[] = [
  {
    id: 'bountiful_harvest',
    title: 'Colheita Farta',
    description: 'Um clima excelente trouxe prosperidade aos campos.',
    type: 'economic',
    weight: 10,
    condition: (state) => state.meta.season === 'Inverno' && state.meta.year > 1220, // Only appliest when advancing TO Inverno (from Outono)
    apply: (state) => {
      let nextState = { ...state };
      nextState.resources.prata += 200;
      nextState.covenant.prosperity = Math.min(100, nextState.covenant.prosperity + 10);
      return { nextState, log: 'Colheita muito farta enriqueceu os cofres em 200 pratas.' };
    }
  },
  {
    id: 'fever_outbreak',
    title: 'Surto de Febre',
    description: 'O ar viciado e pântanos próximos trouxeram doença.',
    type: 'health',
    weight: 20,
    condition: (state) => state.meta.season === 'Verão' && state.covenant.publicHealth < 50,
    apply: (state) => {
      let nextState = { ...state };
      nextState.covenant.publicHealth -= 15;
      nextState.covenant.loyalty -= 5;
      nextState.covenant.population -= Math.floor(nextState.covenant.population * 0.05); // 5% dies
      return { nextState, log: 'Um surto febril reduziu severamente nossa população rural.' };
    }
  },
  {
    id: 'arcane_anomaly',
    title: 'Anomalia Arcana',
    description: 'Aura arcana se adensou momentaneamente.',
    type: 'magical',
    weight: 5,
    condition: (state) => state.covenant.auraArcana >= 3,
    apply: (state) => {
      let nextState = { ...state };
      nextState.resources.essencia.vim += 2;
      nextState.resources.essencia.total += 2;
      return { nextState, log: 'A Aura Arcana vibrou, cristalizando 2 Essências de Vim puras nos salões.' };
    }
  }
];

export function resolveSeasonalEvents(state: GameState): GameState {
  let nextState = { ...state };

  // Get eligible events
  const eligibleEvents = seasonalEvents.filter(ev => ev.condition(nextState));

  if (eligibleEvents.length === 0) return nextState;

  // Simple weighted random selection
  const totalWeight = eligibleEvents.reduce((acc, ev) => acc + ev.weight, 0);
  let randomVal = Math.random() * totalWeight;

  let selectedEvent = eligibleEvents[0];
  for (const ev of eligibleEvents) {
    if (randomVal < ev.weight) {
      selectedEvent = ev;
      break;
    }
    randomVal -= ev.weight;
  }

  // Apply Event
  const result = selectedEvent.apply(nextState);
  nextState = result.nextState;

  nextState.events = [createLogEvent(nextState, 'Evento Aleatório', `[${selectedEvent.title}] ` + result.log), ...nextState.events].slice(0, 50);

  return nextState;
}
