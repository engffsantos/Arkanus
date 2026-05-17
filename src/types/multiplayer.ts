export interface Region {
  id: string; // The region/match ID
  name: string;
  year: number;
  season: 'Primavera' | 'Verão' | 'Outono' | 'Inverno';
  turn: number;
  phase: 'planning' | 'resolving'; // Users submit actions in planning phase
  lastResolutionAt: string; // ISO date
  intervalHours: number; // 12, 24, 48
}

export interface PlayerSovereignty {
  id: string;
  regionId: string;
  userId: string;
  name: string;
  archetype: string;
  prestige: number;
  influence: number;
  silver: number;
  vis: {
    creo: number; intellego: number; muto: number; perdo: number; rego: number; vim: number;
  };
  reputation: number;
  status: 'active' | 'eliminated';
}

export interface SeasonAction {
  id: string;
  regionId: string;
  userId: string;
  year: number;
  season: 'Primavera' | 'Verão' | 'Outono' | 'Inverno';
  type: string; // The action type, e.g. 'govern', 'diplomacy', 'certamen'
  targetId?: string; // e.g. target player id, or point of interest id
  payload: any;
  status: 'pending' | 'resolved';
  result?: any;
}

export interface PublicEvent {
  id: string;
  regionId: string;
  year: number;
  season: 'Primavera' | 'Verão' | 'Outono' | 'Inverno';
  title: string;
  description: string;
  participants: string[]; // userIds involved
  type: 'diplomacy' | 'conflict' | 'market' | 'tribunal' | 'certamen' | 'world';
  createdAt: string;
}

// Fase 3
export interface Treaty {
  id: string;
  regionId: string;
  proposerId: string;
  targetId: string;
  type: 'non-aggression' | 'alliance' | 'trade' | 'tribute';
  status: 'proposed' | 'active' | 'rejected' | 'broken';
  terms: any;
  createdAt: string;
}

// Fase 4
export interface TribunalCase {
  id: string;
  regionId: string;
  accuserId: string;
  accusedId: string;
  charge: string;
  status: 'open' | 'voting' | 'resolved';
  votes: Record<string, 'guilty' | 'innocent' | 'abstain'>; 
  verdict?: 'guilty' | 'innocent';
  penalty?: string;
  createdAt: string;
}

export interface CertamenDuel {
  id: string;
  regionId: string;
  challengerId: string;
  challengedId: string;
  reason: string;
  status: 'challenged' | 'accepted' | 'declined' | 'resolved';
  challengerActions?: any; // Technique, Form, Posture
  challengedActions?: any;
  winnerId?: string;
  resolutionText?: string;
  createdAt: string;
}
