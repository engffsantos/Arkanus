import { GameState } from '../types/game';
import { CURRENT_SAVE_VERSION } from './saveMigration';

export interface CampaignCreationConfig {
  covenantName: string;
  mageName: string;
  tradition: string;
  region: string;
  archetype: 'Laboratory' | 'Commerce' | 'Rural' | 'Arcane' | 'Sacred' | 'Political';
  difficulty: 'Easy' | 'Normal' | 'Hard';
  gameMode: 'Standard' | 'Sandbox';
}

export function createInitialGameState(config: CampaignCreationConfig): GameState {
  const basePrata = config.difficulty === 'Easy' ? 4000 : config.difficulty === 'Normal' ? 2000 : 1000;
  
  let state: GameState = {
    meta: {
      saveId: Date.now().toString(),
      campaignName: config.covenantName,
      year: 1220,
      season: 'Primavera',
      turn: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      version: CURRENT_SAVE_VERSION
    },
    mage: {
      name: config.mageName,
      tradition: config.tradition,
      intelligence: 2,
      communication: 2,
      magicTheory: 5,
      technique: 5,
      form: 5,
      language: 5
    },
    covenant: {
      name: config.covenantName,
      region: config.region,
      archetype: config.archetype,
      loyalty: 70,
      population: 1000,
      publicHealth: 70,
      security: 70,
      prosperity: 50,
      incomePerSeason: 250,
      expensesPerSeason: 150,
      unrest: 0,
      auraArcana: 0,
      auraSacra: 0,
      auraEncantada: 0,
      auraAbissal: 0,
    },
    resources: {
      prata: basePrata,
      essencia: { total: 0, rego: 0, creo: 0, intellego: 0, corpus: 0, vim: 0 },
      influencia: 5,
      prestigio: 0
    },
    library: {
      capacity: 50,
      books: [],
      transcriptionProjects: [],
      scribes: 0,
      binders: 0,
      illuminators: 0
    },
    laboratory: {
      level: 1,
      quality: 0,
      safety: 0,
      activeProjects: [],
      completedProjects: [],
      modifiers: []
    },
    territory: {
      locations: [
        { id: 'castelo', name: 'Fortaleza Central', type: 'castle', x: 50, y: 50, level: 1, aura: 'none', risk: 0, status: 'stable', activeEvents: [] },
        { id: 'vila', name: 'Vila dos Servos', type: 'village', x: 55, y: 55, level: 2, aura: 'none', risk: 5, status: 'stable', activeEvents: [] },
        { id: 'campos', name: 'Campos Agrícolas', type: 'fields', x: 60, y: 60, level: 1, aura: 'none', risk: 5, status: 'stable', activeEvents: [] },
        { id: 'capela', name: 'Capela Comunitária', type: 'chapel', x: 45, y: 55, level: 1, aura: 'sacra', risk: 0, status: 'stable', activeEvents: [] },
        { id: 'oficinas', name: 'Oficinas', type: 'guild', x: 52, y: 48, level: 1, aura: 'none', risk: 10, status: 'stable', activeEvents: [] },
        { id: 'guildhall', name: 'Guildhall', type: 'guild', x: 55, y: 50, level: 1, aura: 'none', risk: 5, status: 'stable', activeEvents: [] },
        { id: 'bosque', name: 'Bosque Obscuro', type: 'forest', x: 80, y: 80, level: 1, aura: 'encantada', risk: 20, status: 'stable', activeEvents: [] },
        { id: 'ruinas', name: 'Ruínas Antigas', type: 'ruins', x: 20, y: 20, level: 1, aura: 'none', risk: 30, status: 'stable', activeEvents: [] },
        { id: 'fonte', name: 'Fonte Arcana', type: 'essencia_source', x: 70, y: 30, level: 1, aura: 'arcana', risk: 15, status: 'stable', activeEvents: [] },
        { id: 'estrada', name: 'Estrada Comercial', type: 'road', x: 30, y: 70, level: 1, aura: 'none', risk: 10, status: 'threatened', activeEvents: [] }
      ],
      expansionLevel: 1,
      borderRisk: 0
    },
    health: {
      dominantHumor: 'blood',
      heat: 50,
      cold: 50,
      dryness: 50,
      humidity: 50,
      epidemicRisk: 0,
      physicians: 0,
      apothecaries: 0,
      sanitation: 50
    },
    charters: {
      activeCharter: {
        type: 'general',
        auraArcanaEffect: 0,
        auraSacraEffect: 0,
        extractedEssencia: false,
        citizens: 50,
        eligibleResidents: 150,
        sympatheticConnectionActive: true
      }
    },
    guilds: {
      guilds: [],
      artisans: [],
      goods: []
    },
    commerce: {
      routes: [],
      caravans: [],
      fairs: [],
      stock: []
    },
    diplomacy: {
      factions: [
        { id: 'nobles', name: 'Nobreza Local', relations: 50, influence: 'Média' },
        { id: 'church', name: 'Igreja', relations: 50, influence: 'Média' },
        { id: 'merchants', name: 'Mercadores', relations: 50, influence: 'Média' },
        { id: 'peasants', name: 'Camponeses', relations: 50, influence: 'Média' },
        { id: 'rivals', name: 'Rivais Arcanos', relations: 50, influence: 'Média' },
        { id: 'hermetic', name: 'Tribunal Arcano', relations: 50, influence: 'Alta' }
      ],
      activeTreaties: [],
      pendingDemands: []
    },
    conflicts: {
      activeConflicts: [],
      resolvedConflicts: [],
      tribunalPreparation: 0
    },
    reports: {
      totalRisk: 0,
      annualBalance: 0
    },
    events: [
      { id: Date.now().toString(), text: `A soberania ${config.covenantName} foi fundada.`, type: 'success', season: 'Primavera', year: 1220 }
    ]
  };

  // Archetype adjustments
  switch (config.archetype) {
    case 'Laboratory':
      state.laboratory.level = 3;
      state.covenant.auraArcana = 2;
      state.resources.essencia.vim = 5;
      state.resources.essencia.total = 5;
      state.resources.prata -= 500;
      state.library.books.push({ id: 'b1', title: 'Fundamentos Arcanos', type: 'tomo', subject: 'Teoria Arcana', level: 10, quality: 12, author: config.mageName, language: 'Latim', status: 'available' });
      break;
    case 'Commerce':
      state.resources.prata += 1500;
      state.covenant.incomePerSeason += 150;
      const merchInd = state.diplomacy.factions.findIndex(f => f.id === 'merchants');
      if (merchInd !== -1) state.diplomacy.factions[merchInd].relations += 20;
      break;
    case 'Rural':
      state.covenant.population += 1000;
      state.covenant.publicHealth += 15;
      state.covenant.incomePerSeason += 50;
      const peasInd = state.diplomacy.factions.findIndex(f => f.id === 'peasants');
      if (peasInd !== -1) state.diplomacy.factions[peasInd].relations += 15;
      break;
    case 'Arcane':
      state.covenant.auraArcana = 4;
      state.resources.essencia.total = 12;
      state.resources.essencia.vim = 4;
      state.resources.essencia.creo = 4;
      state.resources.essencia.rego = 4;
      const arcChurchInd = state.diplomacy.factions.findIndex(f => f.id === 'church');
      if (arcChurchInd !== -1) state.diplomacy.factions[arcChurchInd].relations -= 15;
      break;
    case 'Sacred':
      state.covenant.auraSacra = 4;
      const sacChurchInd = state.diplomacy.factions.findIndex(f => f.id === 'church');
      if (sacChurchInd !== -1) state.diplomacy.factions[sacChurchInd].relations += 30;
      state.covenant.publicHealth += 10;
      state.covenant.security += 10;
      state.covenant.auraArcana -= 2;
      break;
    case 'Political':
      state.resources.influencia += 10;
      state.resources.prestigio += 10;
      const polNoblesInd = state.diplomacy.factions.findIndex(f => f.id === 'nobles');
      if (polNoblesInd !== -1) state.diplomacy.factions[polNoblesInd].relations += 20;
      state.covenant.security += 20;
      break;
  }

  // Difficulty limits
  if (config.difficulty === 'Hard') {
    state.covenant.unrest += 20;
    state.covenant.loyalty -= 20;
    const hChurchInd = state.diplomacy.factions.findIndex(f => f.id === 'church');
    if (hChurchInd !== -1) state.diplomacy.factions[hChurchInd].relations -= 10;
    const hNoblesInd = state.diplomacy.factions.findIndex(f => f.id === 'nobles');
    if (hNoblesInd !== -1) state.diplomacy.factions[hNoblesInd].relations -= 10;
  }

  // Region adjustments
  switch (config.region) {
    case 'Rhine':
      state.covenant.auraSacra += 3;
      state.diplomacy.factions.find(f => f.id === 'church')!.relations += 20;
      break;
    case 'Normandy':
      state.covenant.security -= 10;
      state.diplomacy.factions.find(f => f.id === 'nobles')!.relations -= 10;
      break;
    case 'Stonehenge':
      state.covenant.auraArcana += 2;
      state.resources.essencia.total += 5;
      break;
    case 'Iberia':
      state.covenant.unrest += 10;
      state.diplomacy.factions.find(f => f.id === 'merchants')!.relations += 10;
      break;
    case 'Rome':
      state.resources.influencia += 15;
      state.diplomacy.factions.find(f => f.id === 'hermetic')!.relations += 20;
      break;
  }

  // Tradition adjustments
  switch (config.tradition) {
    case 'Mercúrio':
      state.mage.communication += 2;
      state.resources.influencia += 10;
      break;
    case 'Flambeau':
      state.mage.technique += 3;
      state.covenant.security += 20;
      break;
    case 'Bonisagus':
      state.mage.intelligence += 2;
      state.mage.magicTheory += 3;
      state.library.books.push({ id: 't_bon1', title: 'Teoria da Integração', type: 'tomo', subject: 'Teoria Arcana', level: 12, quality: 15, author: 'Bonisagus', language: 'Latim', status: 'available' });
      break;
    case 'Verditius':
      state.resources.prata += 1000;
      state.laboratory.quality += 1;
      break;
    case 'Tremere':
      state.resources.influencia += 5;
      state.covenant.loyalty += 15;
      break;
    case 'Ex Miscellanea':
      state.mage.technique += 1;
      state.mage.form += 1;
      state.mage.magicTheory += 1;
      state.mage.language += 2;
      break;
  }

  return state;
}
