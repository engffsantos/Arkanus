import { GameState } from '../../types/game';

/**
 * Qualidade de Escrita = Comunicação + 3 + (Good Teacher/etc) + Resonance
 */
export function calculateWritingQuality(state: GameState): number {
  let quality = 3; // Base
  
  const communication = state.mage.characteristics?.communication || state.mage.communication || 0;
  quality += communication;
  
  // Future: Check virtues for "Good Teacher"
  // For now, return base calculation
  return Math.max(1, quality);
}

/**
 * Produção por Estação = Comunicação + Latim
 */
export function calculateWritingProgress(state: GameState): number {
  const communication = state.mage.characteristics?.communication || state.mage.communication || 0;
  const latin = state.mage.abilities?.latin || state.mage.language || 0;
  
  return Math.max(1, communication + latin);
}
