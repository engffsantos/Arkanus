import { GameState } from '../../types/game';
import { cloneGameState } from '../../utils/immutable';
import { createLogEvent } from '../../services/actions/shared';
import { calculateLabTotal } from '../magus/calculateLabTotal';

export function resolveLaboratoryProjects(state: GameState): GameState {
  let nextState = cloneGameState(state);
  const primaryActionSnapshot = nextState.meta.primaryAction;

  if (primaryActionSnapshot && primaryActionSnapshot.category === 'Laboratório') {
    const newActive: typeof nextState.laboratory.activeProjects = [];
    const newCompleted = [...nextState.laboratory.completedProjects];

    for (const proj of nextState.laboratory.activeProjects) {
      if (proj.status === 'active') {
        const progressGiven = Math.max(1, calculateLabTotal(nextState, proj.technique as any, proj.form as any));
        
        const failed = Math.random() * 100 < proj.risk;
        if (failed) {
          const logEvent = createLogEvent(nextState, 'Laboratório', `Um erro catastrófico ocorreu no experimento "${proj.name}"! Progresso perdido e materiais danificados.`);
          nextState.events = [logEvent, ...nextState.events].slice(0, 50);
          nextState.laboratory.safety -= 1;
          if (Math.random() > 0.5) {
            newActive.push(proj);
            continue;
          } else {
            newActive.push({ ...proj, accumulatedProgress: 0, status: 'paused' });
            continue;
          }
        }

        const updatedProj = { ...proj, accumulatedProgress: proj.accumulatedProgress + progressGiven };
        if (updatedProj.accumulatedProgress >= updatedProj.requiredTotal) {
          updatedProj.status = 'completed';
          newCompleted.push(updatedProj);
          const logEvent = createLogEvent(nextState, 'Laboratório', `Experimento "${updatedProj.name}" concluído com sucesso! Renderam ${progressGiven} pontos este turno.`);
          nextState.events = [logEvent, ...nextState.events].slice(0, 50);
        } else {
          newActive.push(updatedProj);
        }
      } else {
        newActive.push(proj);
      }
    }
    nextState.laboratory.activeProjects = newActive;
    nextState.laboratory.completedProjects = newCompleted;
  }
  
  return nextState;
}
