import { GameState, TechniqueKey, FormKey } from '../../types/game';

/**
 * Poder de Duelo = Técnica escolhida + Forma escolhida + modificadores (Penetração)
 */
export function calculateDuelPower(state: GameState, technique: TechniqueKey, form: FormKey): number {
  const techScore = state.mage.arts?.techniques?.[technique] || state.mage.technique || 0;
  const formScore = state.mage.arts?.forms?.[form] || state.mage.form || 0;
  const penetration = state.mage.abilities?.penetration || 0;
  
  let power = techScore + formScore + penetration;
  
  // Future modifiers like talisman or specific virtues
  return power;
}
