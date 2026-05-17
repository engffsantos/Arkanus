import { GameState } from '../../types/game';
import { createLogEvent } from './shared';

export function handleLibraryAction(state: GameState, action: {type: string, payload: any}): GameState {
  const nextState = JSON.parse(JSON.stringify(state)) as GameState;

  if (action.type === 'LIBRARY_SCRIBE_BOOK') {
    nextState.library.books.push(action.payload.book || {
        id: Date.now().toString(),
        title: 'Tratado de Fundamentos',
        type: 'tratado',
        subject: 'Vim',
        level: 5,
        quality: 7,
        author: 'Mago Anônimo',
        language: 'Latim',
        status: 'available',
    });
    const logEvent = createLogEvent(nextState, 'Biblioteca', action.payload.description || `Obra adicionada ao acervo.`);
    nextState.events = [logEvent, ...nextState.events].slice(0, 50);
  }

  return nextState;
}
