import { GameState } from '../types/game';

export const CURRENT_SAVE_VERSION = '1.0.0-beta.1';

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

  // Mage creation fields — new in 0.8.0
  if (state.mage) {
    if (state.mage.title === undefined) state.mage.title = '';
    if (state.mage.origin === undefined) state.mage.origin = 'unknown_legacy';
    if (state.mage.originRegion === undefined) state.mage.originRegion = '';
    if (state.mage.personalSymbol === undefined) state.mage.personalSymbol = '';
    if (state.mage.appearance === undefined) state.mage.appearance = { portrait: 'middle_male', vestment: 'robes_dark', symbol: '' };
    if (state.mage.specialization === undefined) state.mage.specialization = 'laboratory_researcher';
    if (state.mage.initialLaboratory === undefined) state.mage.initialLaboratory = 'ancient_tower';
    if (state.mage.ambition === undefined) state.mage.ambition = 'found_great_library';
    if (state.mage.fatigue === undefined) state.mage.fatigue = 0;
    if (!state.mage.virtues) state.mage.virtues = [];
    if (!state.mage.flaws) state.mage.flaws = [];
    if (!state.mage.history) state.mage.history = [];
    if (!state.mage.arts) state.mage.arts = {
      techniques: { creo: 0, intellego: 0, muto: 0, perdo: 0, rego: 0 },
      forms: { animal: 0, aquam: 0, auram: 0, corpus: 0, herbam: 0, ignem: 0, imaginem: 0, mentem: 0, terram: 0, vim: 0 }
    };
    if (!state.mage.characteristics) state.mage.characteristics = {
      intelligence: 0, communication: 0, perception: 0, presence: 0,
      strength: 0, stamina: 0, dexterity: 0, quickness: 0
    };
    if (!state.mage.abilities) state.mage.abilities = {
      magicTheory: state.mage.magicTheory ?? 5,
      penetration: 2, finesse: 2, latin: 4,
      leadership: 1, medicine: 0, bargain: 1, law: 0, intrigue: 1
    };
  }

  // Territory migration & validation
  if (!state.territory) {
     state.territory = { locations: [], expansionLevel: 1, borderRisk: 0 };
  } else if (Array.isArray(state.territory)) {
     state.territory = { locations: state.territory, expansionLevel: 1, borderRisk: 0 };
  } else {
     if (state.territory.locations && !Array.isArray(state.territory.locations) && typeof state.territory.locations === 'object') {
        state.territory.locations = Object.values(state.territory.locations);
     }
     if (!Array.isArray(state.territory.locations)) {
        state.territory.locations = [];
     }
     if (state.territory.expansionLevel === undefined) state.territory.expansionLevel = 1;
     if (state.territory.borderRisk === undefined) state.territory.borderRisk = 0;
  }

  // Guilds migration & validation
  if (!state.guilds) {
     state.guilds = { guilds: [], artisans: [], goods: [] };
  } else if (Array.isArray(state.guilds)) {
     state.guilds = { guilds: state.guilds, artisans: [], goods: [] };
  } else {
     if (state.guilds.guilds && !Array.isArray(state.guilds.guilds) && typeof state.guilds.guilds === 'object') {
        state.guilds.guilds = Object.values(state.guilds.guilds);
     }
     if (!Array.isArray(state.guilds.guilds)) state.guilds.guilds = [];
     
     if (state.guilds.artisans && !Array.isArray(state.guilds.artisans) && typeof state.guilds.artisans === 'object') {
        state.guilds.artisans = Object.values(state.guilds.artisans);
     }
     if (!Array.isArray(state.guilds.artisans)) state.guilds.artisans = [];
     
     if (state.guilds.goods && !Array.isArray(state.guilds.goods) && typeof state.guilds.goods === 'object') {
        state.guilds.goods = Object.values(state.guilds.goods);
     }
     if (!Array.isArray(state.guilds.goods)) state.guilds.goods = [];
  }

  // Commerce migration & validation
  if (!state.commerce) {
     state.commerce = { fairs: [], routes: [], caravans: [], stock: [] };
  } else if (Array.isArray(state.commerce)) {
     state.commerce = { fairs: [], routes: [], caravans: [], stock: [] };
  } else {
     if (state.commerce.routes && !Array.isArray(state.commerce.routes) && typeof state.commerce.routes === 'object') {
        state.commerce.routes = Object.values(state.commerce.routes);
     }
     if (!Array.isArray(state.commerce.routes)) state.commerce.routes = [];

     if (state.commerce.caravans && !Array.isArray(state.commerce.caravans) && typeof state.commerce.caravans === 'object') {
        state.commerce.caravans = Object.values(state.commerce.caravans);
     }
     if (!Array.isArray(state.commerce.caravans)) state.commerce.caravans = [];

     if (state.commerce.fairs && !Array.isArray(state.commerce.fairs) && typeof state.commerce.fairs === 'object') {
        state.commerce.fairs = Object.values(state.commerce.fairs);
     }
     if (!Array.isArray(state.commerce.fairs)) state.commerce.fairs = [];

     if (state.commerce.stock && !Array.isArray(state.commerce.stock) && typeof state.commerce.stock === 'object') {
        state.commerce.stock = Object.values(state.commerce.stock);
     }
     if (!Array.isArray(state.commerce.stock)) state.commerce.stock = [];
  }

  // Conflicts migration & validation
  if (!state.conflicts) {
     state.conflicts = { activeConflicts: [], resolvedConflicts: [], tribunalPreparation: 0 };
  } else if (Array.isArray(state.conflicts)) {
     state.conflicts = { activeConflicts: state.conflicts, resolvedConflicts: [], tribunalPreparation: 0 };
  } else {
     if (state.conflicts.activeConflicts && !Array.isArray(state.conflicts.activeConflicts) && typeof state.conflicts.activeConflicts === 'object') {
        state.conflicts.activeConflicts = Object.values(state.conflicts.activeConflicts);
     }
     if (!Array.isArray(state.conflicts.activeConflicts)) state.conflicts.activeConflicts = [];

     if (state.conflicts.resolvedConflicts && !Array.isArray(state.conflicts.resolvedConflicts) && typeof state.conflicts.resolvedConflicts === 'object') {
        state.conflicts.resolvedConflicts = Object.values(state.conflicts.resolvedConflicts);
     }
     if (!Array.isArray(state.conflicts.resolvedConflicts)) state.conflicts.resolvedConflicts = [];

     if (state.conflicts.tribunalPreparation === undefined) state.conflicts.tribunalPreparation = 0;
  }
  // Diplomacy migration & validation
  const defaultFactions = [
    { id: 'nobles', name: 'Nobreza Local', relations: 50, influence: 'Média' },
    { id: 'church', name: 'Igreja', relations: 50, influence: 'Média' },
    { id: 'merchants', name: 'Mercadores', relations: 50, influence: 'Média' },
    { id: 'peasants', name: 'Camponeses', relations: 50, influence: 'Média' },
    { id: 'rivals', name: 'Rivais Arcanos', relations: 50, influence: 'Média' },
    { id: 'hermetic', name: 'Tribunal Arcano', relations: 50, influence: 'Alta' }
  ];

  if (!state.diplomacy) {
     state.diplomacy = { factions: defaultFactions, activeTreaties: [], pendingDemands: [] };
  } else if (Array.isArray(state.diplomacy)) {
     state.diplomacy = { factions: state.diplomacy, activeTreaties: [], pendingDemands: [] };
  } else {
     if (state.diplomacy.factions && !Array.isArray(state.diplomacy.factions) && typeof state.diplomacy.factions === 'object') {
        state.diplomacy.factions = Object.values(state.diplomacy.factions);
     }
     if (!Array.isArray(state.diplomacy.factions) || state.diplomacy.factions.length === 0) {
        state.diplomacy.factions = defaultFactions;
     }

     if (state.diplomacy.activeTreaties && !Array.isArray(state.diplomacy.activeTreaties) && typeof state.diplomacy.activeTreaties === 'object') {
        state.diplomacy.activeTreaties = Object.values(state.diplomacy.activeTreaties);
     }
     if (!Array.isArray(state.diplomacy.activeTreaties)) state.diplomacy.activeTreaties = [];

     if (state.diplomacy.pendingDemands && !Array.isArray(state.diplomacy.pendingDemands) && typeof state.diplomacy.pendingDemands === 'object') {
        state.diplomacy.pendingDemands = Object.values(state.diplomacy.pendingDemands);
     }
     if (!Array.isArray(state.diplomacy.pendingDemands)) state.diplomacy.pendingDemands = [];
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
