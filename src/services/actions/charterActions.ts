import { GameState } from '../../types/game';
import { createLogEvent } from './shared';

export function handleCharterAction(state: GameState, action: {type: string, payload: any}): GameState {
  const nextState = JSON.parse(JSON.stringify(state)) as GameState;

  if (action.type === 'EXTRACT_CHARTER_ESSENCIA') {
    nextState.resources.essencia.total += 1;
    nextState.resources.essencia.rego += 1;
    nextState.charters.activeCharter.sympatheticConnectionActive = false;
    nextState.covenant.unrest += 5;
  } else if (action.type === 'EMIT_CHARTER') {
     nextState.resources.prata -= 250;
     
     let arcanaEff = -2;
     let sacraEff = 5;
     
     if (action.payload.type === 'encantado') {
        arcanaEff = 3;
        sacraEff = -3;
     } else if (action.payload.type === 'abissal') {
        arcanaEff = 5;
        sacraEff = -10;
     }

     nextState.charters.activeCharter = {
        ...nextState.charters.activeCharter,
        type: action.payload.type,
        auraArcanaEffect: arcanaEff,
        auraSacraEffect: sacraEff,
        sympatheticConnectionActive: true
     };
     nextState.covenant.auraArcana += arcanaEff;
     nextState.covenant.auraSacra += sacraEff;
     const logEvent = createLogEvent(nextState, 'Jurisdição', `Foral ${action.payload.type} emitido. Propriedades místicas das terras alteradas.`);
     nextState.events = [logEvent, ...nextState.events].slice(0, 50);
  }

  return nextState;
}
