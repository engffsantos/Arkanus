import { GameState, GameEvent } from '../../types/game';

export function createLogEvent(state: GameState, category: string, text: string): GameEvent {
  return {
    id: Date.now().toString() + Math.random().toString(),
    text: `[${category}] ${text}`,
    season: state.meta.season,
    year: state.meta.year,
    type: 'normal'
  };
}

export function applyEffects(state: GameState, effects: {target: string, value: number}[]): GameState {
  let nextState = JSON.parse(JSON.stringify(state)) as GameState;
  
  for (const effect of effects) {
    if (effect.target === 'publicHealth') {
      nextState.covenant.publicHealth = Math.max(0, Math.min(100, nextState.covenant.publicHealth + effect.value));
    }
    if (effect.target === 'loyalty') {
      nextState.covenant.loyalty = Math.max(0, Math.min(100, nextState.covenant.loyalty + effect.value));
    }
    if (effect.target === 'security') {
      nextState.covenant.security = Math.max(0, Math.min(100, nextState.covenant.security + effect.value));
    }
    if (effect.target === 'epidemicRisk') {
      nextState.health.epidemicRisk = Math.max(0, Math.min(100, nextState.health.epidemicRisk + effect.value));
    }
    if (effect.target === 'unrest') {
      nextState.covenant.unrest = Math.max(0, Math.min(100, nextState.covenant.unrest + effect.value));
    }
  }
  return nextState;
}

export function applyCost(state: GameState, cost: {prata?: number}): { state: GameState, error?: string } {
    let nextState = JSON.parse(JSON.stringify(state)) as GameState;
    if (cost?.prata) {
      if (nextState.resources.prata < cost.prata) {
        return { state, error: 'Prata insuficiente.' };
      }
      nextState.resources.prata -= cost.prata;
    }
    return { state: nextState };
}
