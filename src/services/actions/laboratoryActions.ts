import { GameState } from '../../types/game';
import { createLogEvent } from './shared';

export function handleLaboratoryAction(state: GameState, action: {type: string, payload: any}): GameState {
  const nextState = JSON.parse(JSON.stringify(state)) as GameState;

  if (action.type === 'LAB_NEW_PROJECT') {
    nextState.laboratory.activeProjects.push(action.payload);
    const logEvent = createLogEvent(nextState, 'Laboratório', `Iniciou planejamento do experimento: ${action.payload.name}.`);
    nextState.events = [logEvent, ...nextState.events].slice(0, 50);
  } else if (action.type === 'LAB_PAUSE_PROJECT') {
     nextState.laboratory.activeProjects = nextState.laboratory.activeProjects.map(p => 
        p.id === action.payload.id ? { ...p, status: 'paused' } : p
     );
     const logEvent = createLogEvent(nextState, 'Laboratório', `Experimento pausado.`);
     nextState.events = [logEvent, ...nextState.events].slice(0, 50);
  } else if (action.type === 'LAB_RESUME_PROJECT') {
     nextState.laboratory.activeProjects = nextState.laboratory.activeProjects.map(p => 
        p.id === action.payload.id ? { ...p, status: 'active' } : p
     );
     const logEvent = createLogEvent(nextState, 'Laboratório', `Experimento retomado.`);
     nextState.events = [logEvent, ...nextState.events].slice(0, 50);
  } else if (action.type === 'LAB_DISTILL_ESSENCIA') {
    nextState.resources.essencia.total += 3;
    nextState.resources.essencia.vim += 3;
  }

  return nextState;
}
