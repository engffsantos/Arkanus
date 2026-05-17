export type ActionCategory = 
  | 'governance' 
  | 'laboratory' 
  | 'library' 
  | 'charter' 
  | 'diplomacy' 
  | 'commerce' 
  | 'health' 
  | 'conflict';

export interface ActionCost {
  prata?: number;
  essencia?: {
    total?: number;
    creo?: number;
    intellego?: number;
    muto?: number;
    perdo?: number;
    rego?: number;
    vim?: number;
  };
  influence?: number;
  prestige?: number;
}

export interface ActionEffect {
  type: string;
  value: any;
}

export interface BaseGameAction {
  category: ActionCategory;
  subAction: string;
  cost?: ActionCost;
}

// Laboratory
export interface InvestigateSamplePayload {
  sampleId?: string;
}

export interface BuildLaboratoryItemPayload {
  itemName: string;
}

// Governance
export interface InvestHealthPayload {
  amount: number;
}
export interface BolsterSecurityPayload {
  amount: number;
}

export interface GameActionPayloads {
  'investigate_sample': InvestigateSamplePayload;
  'bolster_security': BolsterSecurityPayload;
  'invest_health': InvestHealthPayload;
  [key: string]: any;
}

export interface ResolvedActionResult {
  success: boolean;
  message: string;
  stateChanges?: any;
}
