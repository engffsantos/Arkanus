import { GameState } from './game';
import { GameEvent } from './game';

export type ResourceKey =
  | "silver"
  | "influence"
  | "prestige"
  | "essenceTotal"
  | "essenceCreo"
  | "essenceIntellego"
  | "essenceMuto"
  | "essencePerdo"
  | "essenceRego"
  | "essenceVim";

export type GameActionDomain =
  | "governance"
  | "laboratory"
  | "library"
  | "writing"
  | "map"
  | "health"
  | "charters"
  | "guilds"
  | "commerce"
  | "diplomacy"
  | "conflicts"
  | "events"
  | "settings"
  | string;

export type ActionCost = Partial<Record<ResourceKey, number>>;

export type ActionRequirement = {
  id: string;
  description: string;
  isMet: boolean;
  failureMessage: string;
};

export type GameEffectTarget =
  | "resources"
  | "covenant"
  | "mage"
  | "laboratory"
  | "library"
  | "territory"
  | "health"
  | "charters"
  | "guilds"
  | "commerce"
  | "diplomacy"
  | "conflicts"
  | "events";

export type GameEffect = {
  target: GameEffectTarget;
  path: string;
  operation: "add" | "subtract" | "set" | "push" | "remove" | "multiply";
  value: number | string | boolean | object;
  description: string;
};

export type GameRisk = {
  id: string;
  description: string;
  severity: "low" | "medium" | "high" | "critical";
  probability?: number;
};

export type GameActionType =
  | "GOVERNANCE_INVEST_HEALTH"
  | "GOVERNANCE_REINFORCE_SECURITY"
  | "GOVERNANCE_ADJUST_TAXES"
  | "GOVERNANCE_DISTRIBUTE_FOOD"
  | "LAB_START_PROJECT"
  | "LAB_PAUSE_PROJECT"
  | "LAB_RESUME_PROJECT"
  | "LAB_APPLY_ESSENCE"
  | "LIBRARY_READ_BOOK"
  | "WRITING_WRITE_TREATY"
  | "WRITING_WRITE_TOME"
  | "MAP_INSPECT_LOCATION"
  | "MAP_INVEST_LOCATION"
  | "MAP_COLLECT_RESOURCE"
  | "HEALTH_PREPARE_PROPHYLAXIS"
  | "HEALTH_HIRE_PHYSICIAN"
  | "HEALTH_HIRE_APOTHECARY"
  | "CHARTER_GRANT_CITIZENSHIP"
  | "CHARTER_EXTRACT_ESSENCE"
  | "GUILD_CREATE"
  | "GUILD_HIRE_ARTISAN"
  | "GUILD_PRODUCE_GOODS"
  | "COMMERCE_SEND_CARAVAN"
  | "COMMERCE_RESOLVE_CARAVAN"
  | "DIPLOMACY_SEND_ENVOY"
  | "DIPLOMACY_OFFER_SILVER"
  | "CONFLICT_OPEN"
  | "CONFLICT_PREPARE_DEFENSE"
  | "CONFLICT_RESOLVE_TRIBUNAL"
  | "EVENT_CHOOSE_OPTION";

export type GameAction<TPayload = unknown> = {
  id: string;
  type: GameActionType | string; // Allowing string for currently existing actions migration
  domain: GameActionDomain;
  label: string;
  description: string;
  consumesPrimaryAction: boolean;
  confirmationRequired: boolean;
  destructive?: boolean;
  cost: ActionCost;
  requirements: ActionRequirement[];
  effects: GameEffect[];
  risks: GameRisk[];
  payload: TPayload;
};

export type ResolvedActionResult = {
  ok: boolean;
  state: GameState;
  error?: string;
  warnings?: string[];
  logs: GameEvent[];
};
