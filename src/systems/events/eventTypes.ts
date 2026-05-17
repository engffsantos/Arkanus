import { GameState, Season } from '../../types/game';
import { ActionCost, GameEffect } from '../../types/actions';

export type EventType = 'climate' | 'political' | 'religious' | 'magical' | 'economic' | 'health' | 'territorial' | 'diplomatic' | 'laboratory' | 'commercial' | 'conflict' | 'charter' | 'guild' | 'aura';

export type EventCondition = {
  property: string;
  operator: 'gte' | 'lte' | 'eq' | 'neq' | 'includes';
  value: any;
};

export type EventChoice = {
  id: string;
  label: string;
  description: string;
  cost?: ActionCost;
  effects: GameEffect[];
  createsConflict?: boolean;
  followUpEventId?: string;
  logMessage: string;
};

export type EventTemplate = {
  id: string;
  title: string;
  description: string;
  type: EventType;
  weight: number;
  cooldownTurns?: number;
  minYear?: number;
  allowedSeasons?: Season[];
  conditions: EventCondition[];
  choices: EventChoice[];
};
