import { GameState } from '../types/game';
import { CURRENT_SAVE_VERSION } from './saveMigration';
import {
  MageCreationConfig,
  MAGE_ORIGINS, MAGE_TRADITIONS, MAGE_SPECIALIZATIONS,
  MAGE_VIRTUES, MAGE_FLAWS, INITIAL_LABORATORIES, MAGE_AMBITIONS
} from '../data/mageCreation';

export type { MageCreationConfig };

export interface CampaignCreationConfig {
  covenantName: string;
  archetype: 'Laboratory' | 'Commerce' | 'Rural' | 'Arcane' | 'Sacred' | 'Political';
  difficulty: 'Easy' | 'Normal' | 'Hard';
  gameMode: 'Standard' | 'Sandbox';
  mage?: MageCreationConfig;
  // Legacy flat fields (kept for migration compatibility)
  mageName?: string;
  tradition?: string;
  region?: string;
}

export function createInitialGameState(config: CampaignCreationConfig): GameState {
  const basePrata = config.difficulty === 'Easy' ? 4000 : config.difficulty === 'Normal' ? 2000 : 1000;
  const mage = config.mage;
  const mageName = mage?.mageName ?? config.mageName ?? 'Mago';
  const region = mage?.originRegion ?? config.region ?? 'Rhine';
  const tradition = mage?.tradition ?? config.tradition ?? 'grey_mercury_school';

  // Build full Arts state from mage creation config
  const defaultArts = {
    techniques: { creo: 0, intellego: 0, muto: 0, perdo: 0, rego: 0 },
    forms: { animal: 0, aquam: 0, auram: 0, corpus: 0, herbam: 0, ignem: 0, imaginem: 0, mentem: 0, terram: 0, vim: 0 }
  };

  if (mage?.arts) {
    const { primaryTechnique, primaryForm, secondaryArts, minorArts } = mage.arts;
    const setArt = (key: string, val: number) => {
      if (key in defaultArts.techniques) (defaultArts.techniques as any)[key] = Math.max((defaultArts.techniques as any)[key], val);
      else if (key in defaultArts.forms) (defaultArts.forms as any)[key] = Math.max((defaultArts.forms as any)[key], val);
    };
    setArt(primaryTechnique, 5);
    setArt(primaryForm, 5);
    secondaryArts?.forEach(a => setArt(a, 3));
    minorArts?.forEach(a => setArt(a, 1));
  }

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
      name: mageName,
      tradition,
      intelligence: mage?.characteristics?.intelligence ?? 2,
      communication: mage?.characteristics?.communication ?? 2,
      magicTheory: 5,
      technique: 5,
      form: 5,
      language: 5,
      age: mage?.age ?? 35,
      fatigue: 0,
      title: mage?.title ?? '',
      origin: mage?.origin ?? 'unknown_legacy',
      originRegion: mage?.originRegion ?? region,
      personalSymbol: mage?.personalSymbol ?? '',
      appearance: mage?.appearance,
      specialization: mage?.specialization ?? 'laboratory_researcher',
      initialLaboratory: mage?.initialLaboratory ?? 'ancient_tower',
      ambition: mage?.ambition ?? 'found_great_library',
      characteristics: {
        intelligence: mage?.characteristics?.intelligence ?? 0,
        communication: mage?.characteristics?.communication ?? 0,
        perception: mage?.characteristics?.perception ?? 0,
        presence: mage?.characteristics?.presence ?? 0,
        strength: mage?.characteristics?.strength ?? 0,
        stamina: mage?.characteristics?.stamina ?? 0,
        dexterity: mage?.characteristics?.dexterity ?? 0,
        quickness: mage?.characteristics?.quickness ?? 0,
      },
      arts: defaultArts,
      abilities: {
        magicTheory: 5, penetration: 2, finesse: 2,
        latin: 4, leadership: 1, medicine: 0,
        bargain: 1, law: 0, intrigue: 1
      },
      virtues: mage?.virtues ? mage.virtues.map(vId => {
        const v = MAGE_VIRTUES.find(x => x.id === vId)!;
        return { id: v.id, name: v.name, description: v.description, effects: v.bonuses };
      }) : [],
      flaws: mage?.flaw ? (() => {
        const f = MAGE_FLAWS.find(x => x.id === mage.flaw);
        return f ? [{ id: f.id, name: f.name, description: f.description, effects: f.penalties }] : [];
      })() : [],
      creationChoices: mage ? {
        origin: mage.origin,
        tradition: mage.tradition,
        specialization: mage.specialization,
        initialLaboratory: mage.initialLaboratory,
        ambition: mage.ambition,
        virtues: [...mage.virtues],
        flaw: mage.flaw,
        arts: mage.arts
      } : undefined,
      history: [
        { season: 'Primavera', year: 1220, description: `${mageName} funda a soberania ${config.covenantName}.` }
      ],
      status: { physical: 'stable', mental: 'focused', seasonalAvailability: 'available' },
      reputation: { academic: 0, political: 0, religious: 0, arcane: 0 }
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

  // Region adjustments (legacy fallback)
  const legacyRegion = config.region ?? mage?.originRegion;
  switch (legacyRegion) {
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

  // Apply bonuses from mage creation choices
  if (mage) {
    const applyBonus = (field: string, value: number) => {
      const parts = field.split('.');
      let obj: any = state;
      for (let i = 0; i < parts.length - 1; i++) { if (obj[parts[i]] !== undefined) obj = obj[parts[i]]; else return; }
      const key = parts[parts.length - 1];
      if (typeof obj[key] === 'number') obj[key] += value;
    };

    const applyChoiceBonuses = (choices: { bonuses: { field: string; value: number }[]; penalties: { field: string; value: number }[] }[]) => {
      choices.forEach(c => {
        c.bonuses.forEach(b => applyBonus(b.field, b.value));
        c.penalties.forEach(p => applyBonus(p.field, p.value));
      });
    };

    // Origin
    const originData = MAGE_ORIGINS.find(o => o.id === mage.origin);
    if (originData) applyChoiceBonuses([originData]);

    // Tradition (new IDs)
    const traditionData = MAGE_TRADITIONS.find(t => t.id === mage.tradition);
    if (traditionData) applyChoiceBonuses([traditionData]);
    // Legacy tradition names fallback
    else {
      const trad = mage.tradition as string;
      if (trad === 'Mercúrio') { state.mage.communication += 2; state.resources.influencia += 10; }
      else if (trad === 'Flambeau') { state.mage.technique += 3; state.covenant.security += 20; }
      else if (trad === 'Bonisagus') {
        state.mage.intelligence += 2; state.mage.magicTheory += 3;
        state.library.books.push({ id: 't_bon1', title: 'Fundamentos da Integração', type: 'tomo', subject: 'Teoria Arcana', level: 12, quality: 15, author: 'Linhagem', language: 'Latim', status: 'available' });
      } else if (trad === 'Verditius') { state.resources.prata += 1000; state.laboratory.quality += 1; }
      else if (trad === 'Tremere') { state.resources.influencia += 5; state.covenant.loyalty += 15; }
      else if (trad === 'Ex Miscellanea') { state.mage.technique += 1; state.mage.form += 1; state.mage.magicTheory += 1; }
    }

    // Specialization
    const specData = MAGE_SPECIALIZATIONS.find(s => s.id === mage.specialization);
    if (specData) applyChoiceBonuses([specData]);

    // Virtues
    mage.virtues.forEach(vId => {
      const v = MAGE_VIRTUES.find(x => x.id === vId);
      if (v) applyChoiceBonuses([v]);
    });

    // Flaw
    const flawData = MAGE_FLAWS.find(f => f.id === mage.flaw);
    if (flawData) applyChoiceBonuses([flawData]);

    // Laboratory
    const labData = INITIAL_LABORATORIES.find(l => l.id === mage.initialLaboratory);
    if (labData) applyChoiceBonuses([labData]);

    // Ambition
    const ambData = MAGE_AMBITIONS.find(a => a.id === mage.ambition);
    if (ambData) applyChoiceBonuses([ambData]);

    // Generate narrative starting event
    const allStartingEvents = [
      ...(originData?.startingEvents ?? []),
      ...(traditionData?.startingEvents ?? []),
      ...(flawData?.startingEvents ?? []),
    ];
    allStartingEvents.forEach((text, i) => {
      state.events.push({ id: (Date.now() + i + 1).toString(), text, type: 'info', season: 'Primavera', year: 1220 });
    });
  } else {
    // Legacy tradition adjustments for old saves
    switch (config.tradition) {
      case 'Mercúrio': state.mage.communication += 2; state.resources.influencia += 10; break;
      case 'Flambeau': state.mage.technique += 3; state.covenant.security += 20; break;
      case 'Bonisagus':
        state.mage.intelligence += 2; state.mage.magicTheory += 3;
        state.library.books.push({ id: 't_bon1', title: 'Teoria da Integração', type: 'tomo', subject: 'Teoria Arcana', level: 12, quality: 15, author: 'Bonisagus', language: 'Latim', status: 'available' });
        break;
      case 'Verditius': state.resources.prata += 1000; state.laboratory.quality += 1; break;
      case 'Tremere': state.resources.influencia += 5; state.covenant.loyalty += 15; break;
      case 'Ex Miscellanea': state.mage.technique += 1; state.mage.form += 1; state.mage.magicTheory += 1; state.mage.language += 2; break;
    }
  }

  return state;
}
