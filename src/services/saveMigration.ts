import { GameState } from '../types/game';

export const CURRENT_SAVE_VERSION = '0.7.0';

export function migrateSave(savedState: any): GameState {
  if (!savedState) return savedState;
  
  let state = { ...savedState };
  
  if (!state.meta) {
     return state; // too old or invalid
  }

  // Very old formats or missing version
  if (!state.meta.version) {
    state.meta.version = '0.6.0';
  }

  // Always ensure essencia is populated directly if vis exists and essencia doesn't
  if (state.resources) {
     if (state.resources.vis !== undefined && state.resources.essencia === undefined) {
        if (typeof state.resources.vis === 'number') {
           state.resources.essencia = { total: state.resources.vis, rego: 0, creo: 0, intellego: 0, corpus: 0, vim: 0 };
        } else {
           state.resources.essencia = state.resources.vis;
        }
     } else if (!state.resources.essencia) {
        state.resources.essencia = { total: 0, rego: 0, creo: 0, intellego: 0, corpus: 0, vim: 0 };
     }
     if (typeof state.resources.essencia === 'number') {
        state.resources.essencia = { total: state.resources.essencia, rego: 0, creo: 0, intellego: 0, corpus: 0, vim: 0 };
     }
     delete state.resources.vis;
  }

  if (state.covenant) {
     if (state.covenant.magicAura !== undefined && state.covenant.auraArcana === undefined) {
         state.covenant.auraArcana = state.covenant.magicAura;
     }
     if (state.covenant.divineAura !== undefined && state.covenant.auraSacra === undefined) {
         state.covenant.auraSacra = state.covenant.divineAura;
     }
     if (state.covenant.faeAura !== undefined && state.covenant.auraEncantada === undefined) {
         state.covenant.auraEncantada = state.covenant.faeAura;
     }
     if (state.covenant.infernalAura !== undefined && state.covenant.auraAbissal === undefined) {
         state.covenant.auraAbissal = state.covenant.infernalAura;
     }
     delete state.covenant.magicAura;
     delete state.covenant.divineAura;
     delete state.covenant.faeAura;
     delete state.covenant.infernalAura;
  }
  
  if (state.charters && state.charters.activeCharter) {
     if (state.charters.activeCharter.magicAuraEffect !== undefined && state.charters.activeCharter.auraArcanaEffect === undefined) {
         state.charters.activeCharter.auraArcanaEffect = state.charters.activeCharter.magicAuraEffect;
     }
     if (state.charters.activeCharter.divineAuraEffect !== undefined && state.charters.activeCharter.auraSacraEffect === undefined) {
         state.charters.activeCharter.auraSacraEffect = state.charters.activeCharter.divineAuraEffect;
     }
     if (state.charters.activeCharter.extractedVis !== undefined && state.charters.activeCharter.extractedEssencia === undefined) {
         state.charters.activeCharter.extractedEssencia = state.charters.activeCharter.extractedVis;
     }
     delete state.charters.activeCharter.magicAuraEffect;
     delete state.charters.activeCharter.divineAuraEffect;
     delete state.charters.activeCharter.extractedVis;
  }

  // Arrays to objects migration
  if (Array.isArray(state.territory)) {
     state.territory = { locations: state.territory, expansionLevel: 1, borderRisk: 0 };
  }
  if (Array.isArray(state.guilds)) {
     state.guilds = { guilds: state.guilds, artisans: [], goods: [] };
  }
  if (Array.isArray(state.commerce)) {
     state.commerce = { fairs: [], routes: [], caravans: [], stock: [] };
  }
  if (Array.isArray(state.conflicts)) {
     state.conflicts = { activeConflicts: state.conflicts, resolvedConflicts: [], tribunalPreparation: 0 };
  }
  if (Array.isArray(state.diplomacy)) {
     state.diplomacy = { factions: state.diplomacy, activeTreaties: [], pendingDemands: [] };
  }
  if (Array.isArray(state.library)) {
      // old library didn't exist as array, but just in case
      state.library = { capacity: 50, books: state.library, transcriptionProjects: [], scribes: 0, binders: 0, illuminators: 0 };
  } else if (!state.library) {
      state.library = { capacity: 50, books: [], transcriptionProjects: [], scribes: 0, binders: 0, illuminators: 0 };
  }

  if (!state.charters) {
      state.charters = {
          activeCharter: {
              type: 'general',
              auraArcanaEffect: 0,
              auraSacraEffect: 0,
              extractedEssencia: false,
              citizens: 50,
              eligibleResidents: 150,
              sympatheticConnectionActive: true
          }
      };
  }

  if (state.mage) {
      // Ensure age/status
      if (state.mage.age === undefined) state.mage.age = 40;
      if (state.mage.warping === undefined) state.mage.warping = 0;
      if (!state.mage.status) {
          state.mage.status = {
             physical: 'stable',
             mental: 'focused',
             seasonalAvailability: 'available'
          };
      }
      
      // Ensure characteristics map 
      if (!state.mage.characteristics) {
          state.mage.characteristics = {
             intelligence: state.mage.intelligence || 0,
             communication: state.mage.communication || 0,
             perception: 0,
             presence: 0,
             strength: 0,
             stamina: 0,
             dexterity: 0,
             quickness: 0
          };
      }

      // Ensure arts map
      if (!state.mage.arts) {
          state.mage.arts = {
              techniques: {
                 creo: 0, intellego: 0, muto: 0, perdo: 0, rego: state.mage.technique || 5
              },
              forms: {
                 animal: 0, aquam: 0, auram: 0, corpus: 0, herbam: 0, ignem: 0, imaginem: 0, mentem: 0, terram: 0, vim: state.mage.form || 5
              }
          };
      }

      // Ensure abilities map
      if (!state.mage.abilities) {
          state.mage.abilities = {
              magicTheory: state.mage.magicTheory || 3,
              penetration: 0,
              finesse: 0,
              latin: state.mage.language || 4,
              leadership: 0,
              medicine: 0,
              bargain: 0,
              law: 0,
              intrigue: 0
          };
      }

      if (!state.mage.virtues) state.mage.virtues = [];
      if (!state.mage.flaws) state.mage.flaws = [];
      
      if (!state.mage.reputation) {
          state.mage.reputation = { academic: 0, political: 0, religious: 0, arcane: 0 };
      }

      if (!state.mage.history) state.mage.history = [];
  }

  // Update version
  state.meta.version = CURRENT_SAVE_VERSION;
  
  return state as GameState;
}
