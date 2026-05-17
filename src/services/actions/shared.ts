import { GameState, GameEvent } from '../../types/game';
import { ActionCost, GameEffect } from '../../types/actions';
import { cloneGameState } from '../../utils/immutable';
import { clamp } from '../../utils/clamp';

export function createLogEvent(state: GameState, category: string, text: string): GameEvent {
  return {
    id: Date.now().toString() + Math.random().toString(),
    text: `[${category}] ${text}`,
    season: state.meta.season,
    year: state.meta.year,
    type: 'normal'
  };
}

export function applyEffects(state: GameState, effects: GameEffect[]): GameState {
  let nextState = cloneGameState(state);
  
  for (const effect of effects) {
    const value = typeof effect.value === 'number' ? effect.value : 0;
    
    if (effect.path === 'publicHealth' || effect.target === 'covenant') {
        if (effect.path === 'publicHealth') nextState.covenant.publicHealth = clamp(nextState.covenant.publicHealth + value, 0, 100);
        if (effect.path === 'loyalty') nextState.covenant.loyalty = clamp(nextState.covenant.loyalty + value, 0, 100);
        if (effect.path === 'security') nextState.covenant.security = clamp(nextState.covenant.security + value, 0, 100);
        if (effect.path === 'unrest') nextState.covenant.unrest = clamp(nextState.covenant.unrest + value, 0, 100);
    }
    
    if (effect.target === 'health') {
        if (effect.path === 'epidemicRisk') nextState.health.epidemicRisk = clamp(nextState.health.epidemicRisk + value, 0, 100);
    }
  }
  return nextState;
}

export function applyCost(state: GameState, cost: ActionCost): { state: GameState, error?: string } {
    let nextState = cloneGameState(state);
    if (!cost) return { state: nextState };

    if (cost.silver) {
      if (nextState.resources.prata < cost.silver) {
        return { state, error: 'Prata insuficiente.' };
      }
      nextState.resources.prata -= cost.silver;
    }
    
    if (cost.influence) {
      if (nextState.resources.influencia < cost.influence) {
        return { state, error: 'Influência insuficiente.' };
      }
      nextState.resources.influencia -= cost.influence;
    }

    if (cost.prestige) {
      if (nextState.resources.prestigio < cost.prestige) {
        return { state, error: 'Prestígio insuficiente.' };
      }
      nextState.resources.prestigio -= cost.prestige;
    }
    
    return { state: nextState };
}
