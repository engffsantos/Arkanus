import { GameActionDomain, GameActionType } from './actions';

export type Season = 'Primavera' | 'Verão' | 'Outono' | 'Inverno';

export interface PrimaryActionState {
  selected: boolean;
  actionId: string | null;
  actionType: GameActionType | string | null;
  domain: GameActionDomain | string | null;
  label: string | null;
  payload: any;
  locked: boolean;
  resolved: boolean;
  // Legacy fields for backward compatibility during transition
  id?: string;
  category?: string;
  subAction?: string;
}

export interface GameMeta {
  saveId: string;
  campaignName: string;
  year: number;
  season: Season;
  turn: number;
  primaryAction?: PrimaryActionState;
  activeEventsQueue?: string[]; // Queue of IDs of events waiting for user choices
  createdAt: string;
  updatedAt: string;
  version: string;
}

export interface ResourceState {
  prata: number;
  essencia: {
    total: number;
    rego: number;
    creo: number;
    intellego: number;
    corpus: number;
    vim: number;
  };
  influencia: number;
  prestigio: number;
}

export type CharacteristicKey =
  | "intelligence"
  | "communication"
  | "perception"
  | "presence"
  | "strength"
  | "stamina"
  | "dexterity"
  | "quickness";

export type TechniqueKey =
  | "creo"
  | "intellego"
  | "muto"
  | "perdo"
  | "rego";

export type FormKey =
  | "animal"
  | "aquam"
  | "auram"
  | "corpus"
  | "herbam"
  | "ignem"
  | "imaginem"
  | "mentem"
  | "terram"
  | "vim";

export type AbilityKey =
  | "magicTheory"
  | "penetration"
  | "finesse"
  | "latin"
  | "leadership"
  | "medicine"
  | "bargain"
  | "law"
  | "intrigue";

export interface MagusTrait {
  id: string;
  name: string;
  effects: any[];
}

export interface MagusHistoryEntry {
  season: string;
  year: number;
  description: string;
}

export interface MageState {
  name: string;
  tradition: string;
  intelligence: number; // legacy mapped, keep for backwards compat
  communication: number; // legacy mapped
  magicTheory: number; // legacy mapped
  technique: number; // legacy mapped
  form: number; // legacy mapped
  language: number; // legacy mapped

  age?: number;
  warping?: number;
  
  status?: {
    physical: "stable" | "tired" | "injured" | "sick";
    mental: "focused" | "strained" | "unstable";
    seasonalAvailability: "available" | "committed";
  };

  characteristics?: Record<CharacteristicKey, number>;

  arts?: {
    techniques: Record<TechniqueKey, number>;
    forms: Record<FormKey, number>;
  };

  abilities?: Record<AbilityKey, number>;

  virtues?: MagusTrait[];
  flaws?: MagusTrait[];

  reputation?: {
    academic: number;
    political: number;
    religious: number;
    arcane: number;
  };

  history?: MagusHistoryEntry[];
}

export interface CovenantState {
  name: string;
  region: string;
  archetype: string;
  loyalty: number;
  population: number;
  publicHealth: number;
  security: number;
  prosperity: number;
  unrest: number;
  incomePerSeason: number;
  expensesPerSeason: number;
  auraArcana: number;
  auraSacra: number;
  auraEncantada: number;
  auraAbissal: number;
}

export interface LabProject {
  id: string;
  name: string;
  type: 'spell' | 'item' | 'potion' | 'research' | 'upgrade';
  technique: number;
  form: number;
  requiredTotal: number;
  accumulatedProgress: number;
  essenciaCost: number;
  risk: number;
  status: 'active' | 'paused' | 'completed' | 'failed';
}

export interface LabModifier {
  id: string;
  name: string;
  effect: number;
}

export interface LaboratoryState {
  level: number;
  quality: number;
  safety: number;
  activeProjects: LabProject[];
  completedProjects: LabProject[];
  modifiers: LabModifier[];
}

export interface Book {
  id: string;
  title: string;
  type: 'tomo' | 'tratado' | 'grimorio' | 'mundano';
  subject: string;
  level: number;
  quality: number;
  author: string;
  language: string;
  status: 'available' | 'reading' | 'copying' | 'completed';
  seasonsUsed?: number;
}

export interface TranscriptionProject {
  id: string;
  originalId: string;
  progress: number;
  totalRequired: number;
  scribesAssigned: number;
}

export interface LibraryState {
  capacity: number;
  books: Book[];
  transcriptionProjects: TranscriptionProject[];
  scribes: number;
  binders: number;
  illuminators: number;
}

export interface TerritoryLocation {
  id: string;
  name: string;
  type: 'castle' | 'village' | 'chapel' | 'essencia_source' | 'forest' | 'fields' | 'guild' | 'road' | 'ruins';
  x: number;
  y: number;
  level: number;
  risk: number;
  status: 'stable' | 'threatened' | 'corrupted' | 'prosperous';
  production?: {
    silver?: number;
    essencia?: number;
    food?: number;
  };
  aura?: 'arcana' | 'sacra' | 'encantada' | 'abissal' | 'none';
  activeEvents: string[];
}

export interface TerritoryState {
  locations: TerritoryLocation[];
  expansionLevel: number;
  borderRisk: number;
}

export interface HealthState {
  dominantHumor: 'blood' | 'choler' | 'melancholy' | 'phlegm';
  heat: number;
  cold: number;
  dryness: number;
  humidity: number;
  epidemicRisk: number;
  physicians: number;
  apothecaries: number;
  sanitation: number;
}

export interface CharterState {
  activeCharter: {
    type: 'general' | 'ecclesiastical' | 'fae' | 'infernal';
    sympatheticConnectionActive: boolean;
    citizens: number;
    eligibleResidents: number;
    auraSacraEffect: number;
    auraArcanaEffect: number;
    extractedEssencia: boolean;
  };
}

export interface Artisan {
  id: string;
  name: string;
  profession: string;
  skill: number;
}

export interface ManufacturedGood {
  id: string;
  name: string;
  quality: number;
  value: number;
  quantity: number;
}

export interface Guild {
  id: string;
  type: string;
  level: number;
  quality: string;
}

export interface GuildsState {
  guilds: Guild[];
  artisans: Artisan[];
  goods: ManufacturedGood[];
}

export interface TradeRoute {
  id: string;
  destination: string;
  risk: number;
  status: 'open' | 'closed';
}

export interface Caravan {
  id: string;
  destination: string;
  stock: ManufacturedGood[];
  status: 'active' | 'preparing' | 'returning' | 'lost';
  returnSeason: Season;
  returnYear: number;
}

export interface TradeFair {
  id: string;
  name: string;
  region: string;
  demandModifier: number;
}

export interface CommerceState {
  routes: TradeRoute[];
  caravans: Caravan[];
  fairs: TradeFair[];
  stock: ManufacturedGood[];
}

export interface Faction {
  id: string;
  name: string;
  relations: number;
  influence: string;
}

export interface Treaty {
  id: string;
  factionId: string;
  terms: string;
}

export interface DiplomaticDemand {
  id: string;
  factionId: string;
  demand: string;
  deadlineSeason: Season;
  deadlineYear: number;
}

export interface DiplomacyState {
  factions: Faction[];
  activeTreaties: Treaty[];
  pendingDemands: DiplomaticDemand[];
}

export interface Conflict {
  id: string;
  type: 'essencia' | 'territorial' | 'noble' | 'religious' | 'economic' | 'magical' | 'war';
  title: string;
  severity: number;
  opponent: string;
  status: 'open' | 'preparing' | 'judged' | 'resolved';
  deadlineSeason: Season;
  deadlineYear: number;
  possibleOutcomes: string[];
}

export interface ConflictState {
  activeConflicts: Conflict[];
  resolvedConflicts: Conflict[];
  tribunalPreparation: number;
}

export interface ReportState {
  totalRisk: number;
  annualBalance: number;
}

export interface GameEvent {
  id: string;
  season: Season;
  year: number;
  text: string;
  type: 'info' | 'warning' | 'critical' | 'success' | 'normal' | 'alert';
}

export interface GameState {
  meta: GameMeta;
  resources: ResourceState;
  mage: MageState;
  covenant: CovenantState;
  laboratory: LaboratoryState;
  library: LibraryState;
  territory: TerritoryState;
  health: HealthState;
  charters: CharterState;
  guilds: GuildsState;
  commerce: CommerceState;
  diplomacy: DiplomacyState;
  conflicts: ConflictState;
  reports: ReportState;
  events: GameEvent[];
}

