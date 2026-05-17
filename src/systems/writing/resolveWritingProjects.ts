import { GameState } from '../../types/game';
import { cloneGameState } from '../../utils/immutable';
import { createLogEvent } from '../../services/actions/shared';
import { calculateWritingProgress, calculateWritingQuality } from '../magus/calculateWritingQuality';

export function resolveWritingProjects(state: GameState): GameState {
  let nextState = cloneGameState(state);
  const primaryActionSnapshot = nextState.meta.primaryAction;

  if (primaryActionSnapshot && primaryActionSnapshot.category === 'Biblioteca') {
    if (primaryActionSnapshot.subAction === 'ESCREVER_TRATADO') {
      const payload = primaryActionSnapshot.payload as any;
      const progressGiven = calculateWritingProgress(nextState);
      const writingQuality = calculateWritingQuality(nextState);

      const logEvent = createLogEvent(nextState, 'Biblioteca', `Um tratado sobre ${payload.subject} (Nv ${payload.level}, Ql ${writingQuality}) foi escrito com sucesso, gerando ${progressGiven} pontos de progresso.`);
      nextState.events = [logEvent, ...nextState.events].slice(0, 50);

      nextState.library.books.push({
        id: `book_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        title: `Tratado sobre ${payload.subject}`,
        type: 'tratado',
        subject: payload.subject || 'Atributo Desconhecido',
        level: payload.level || 5,
        quality: writingQuality,
        author: nextState.mage.name || 'Desconhecido',
        language: 'Latim',
        status: 'available'
      });
    }
  }

  return nextState;
}
