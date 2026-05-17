import { GameState, TechniqueKey, FormKey } from '../../types/game';

/**
 * Total de Laboratório = Inteligência + Teoria Mágica + Técnica + Forma + Qualidade do Laboratório + Aura aplicável + Bônus de materiais + Bônus de assistentes
 */
export function calculateLabTotal(state: GameState, technique: TechniqueKey, form: FormKey): number {
  let total = 0;
  
  // Base attributes
  const intelligence = state.mage.characteristics?.intelligence || state.mage.intelligence || 0;
  const magicTheory = state.mage.abilities?.magicTheory || state.mage.magicTheory || 0;
  
  const techScore = state.mage.arts?.techniques?.[technique] || state.mage.technique || 0;
  const formScore = state.mage.arts?.forms?.[form] || state.mage.form || 0;
  
  total += intelligence + magicTheory + techScore + formScore;
  
  // Lab bonuses
  total += state.laboratory.quality;
  
  // Aura currently just uses Aura Arcana
  total += state.covenant.auraArcana;
  
  return total;
}
