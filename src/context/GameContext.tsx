import React, { createContext, useContext, useReducer, useEffect, useRef, useState } from 'react';
import { useAuth } from './AuthContext';
import { loadGameSave, saveGameState, deleteGameSave } from '../services/gameSaveService';
import { migrateSave } from '../services/saveMigration';
import { GameState, Season, GameEvent } from '../types/game';
import { GameAction } from '../types/actions';
import { resolveAction, advanceSeason } from '../services/actionDispatcher';
import { createInitialGameState } from '../services/campaignCreator';

type Action =
  | { type: 'ADVANCE_TURN'; payload: { actionDetails: any, selectedActionId: string } }
  | { type: 'LOAD_STATE'; payload: GameState }
  | { type: 'CREATE_CAMPAIGN'; payload: any }
  | { type: 'DO_ACTION'; payload: any }
  | { type: 'SELECT_PRIMARY_ACTION'; payload: { id: string; category: string; subAction: string; payload: any } }
  | { type: 'CANCEL_PRIMARY_ACTION' }
  | { type: 'CLEAR_LAST_TURN_RESULT' }
  | { type: 'RESET_STATE' };

const seasons: Season[] = ['Primavera', 'Verão', 'Outono', 'Inverno'];

const initialState: GameState = {
  meta: {
    saveId: '',
    campaignName: 'Arkanus',
    year: 1,
    season: 'Primavera',
    turn: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    version: '1.0.0'
  },
  resources: {
    prata: 2450,
    essencia: { total: 12, rego: 2, creo: 2, intellego: 2, corpus: 2, vim: 4 },
    influencia: 10,
    prestigio: 5
  },
  mage: {
    name: 'Severian',
    tradition: 'Filhos de Mercúrio',
    intelligence: 3,
    communication: 2,
    magicTheory: 4,
    technique: 5,
    form: 4,
    language: 5
  },
  covenant: {
    name: 'Arkanus',
    region: 'Europa',
    archetype: 'Laboratory',
    loyalty: 65,
    population: 1256,
    publicHealth: 72,
    security: 60,
    prosperity: 50,
    unrest: 15,
    incomePerSeason: 320,
    expensesPerSeason: 180,
    auraArcana: 3,
    auraSacra: 1,
    auraEncantada: 0,
    auraAbissal: 0
  },
  laboratory: {
    level: 1, quality: 0, safety: 0, activeProjects: [], completedProjects: [], modifiers: []
  },
  library: {
    books: [], capacity: 100, transcriptionProjects: [], scribes: 1, binders: 0, illuminators: 0
  },
  territory: { locations: [], expansionLevel: 1, borderRisk: 10 },
  charters: {
    activeCharter: { type: 'general', sympatheticConnectionActive: true, citizens: 450, eligibleResidents: 1000, auraSacraEffect: 0, auraArcanaEffect: 0, extractedEssencia: false }
  },
  guilds: { guilds: [], artisans: [], goods: [] },
  commerce: { routes: [], caravans: [], fairs: [], stock: [] },
  diplomacy: { factions: [], activeTreaties: [], pendingDemands: [] },
  health: {
    dominantHumor: 'blood', heat: 40, cold: 20, dryness: 25, humidity: 55, epidemicRisk: 12, physicians: 1, apothecaries: 1, sanitation: 55
  },
  conflicts: { activeConflicts: [], resolvedConflicts: [], tribunalPreparation: 0 },
  reports: { totalRisk: 0, annualBalance: 0 },
  events: [
    { id: '1', text: "Bem-vindo a Arkanus, Soberano.", type: "normal", season: 'Primavera', year: 1 }
  ]
};

function gameReducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'CREATE_CAMPAIGN': {
      return createInitialGameState(action.payload);
    }
    case 'DO_ACTION': {
      const result = resolveAction(state, action.payload);
      if (result.error) {
        console.warn('Action failed:', result.error);
        return state;
      }
      return result.state;
    }
    case 'SELECT_PRIMARY_ACTION': {
      if (state.meta.primaryAction?.locked) {
        console.warn('Action already locked this season.');
        return state;
      }
      return {
        ...state,
        meta: {
          ...state.meta,
          primaryAction: {
            selected: true,
            locked: true,
            resolved: false,
            actionId: action.payload.id,
            actionType: null,
            domain: action.payload.category,
            label: action.payload.subAction,
            payload: action.payload.payload,
            // legacy
            id: action.payload.id,
            category: action.payload.category,
            subAction: action.payload.subAction
          }
        }
      };
    }
    case 'CANCEL_PRIMARY_ACTION': {
      return {
        ...state,
        meta: {
          ...state.meta,
          primaryAction: undefined
        }
      };
    }
    case 'ADVANCE_TURN': {
      let stateWithAction = state;
      if (!state.meta.primaryAction && action.payload?.selectedActionId) {
        const id = action.payload.selectedActionId;
        const details = action.payload.actionDetails;
        
        let cost: any = {};
        let effects: any[] = [];
        let type = 'GENERIC_ACTION';
        
        if (id === 'gov') {
          cost = { silver: 8 };
          effects = [
            { target: 'covenant', path: 'loyalty', value: 6 },
            { target: 'covenant', path: 'publicHealth', value: 4 }
          ];
        } else if (id === 'com') {
          cost = { silver: -20 };
        } else if (id === 'dip') {
          cost = { silver: 10 };
          effects = [
            { target: 'covenant', path: 'unrest', value: -8 }
          ];
        } else if (id === 'con') {
          cost = { silver: 15 };
          effects = [
            { target: 'covenant', path: 'security', value: 8 },
            { target: 'covenant', path: 'unrest', value: -5 }
          ];
        }
        
        stateWithAction = {
          ...state,
          meta: {
            ...state.meta,
            primaryAction: {
              selected: true,
              locked: true,
              resolved: false,
              actionId: id,
              actionType: type,
              domain: details?.title || 'Ação Sazonal',
              label: details?.title || 'Ação Sazonal',
              payload: {
                type,
                description: `Ação realizada: ${details?.title || id}`,
                cost,
                effects
              }
            }
          }
        };
      }
      return advanceSeason(stateWithAction);
    }
    case 'CLEAR_LAST_TURN_RESULT': {
      return {
        ...state,
        lastTurnResult: undefined
      };
    }
    case 'LOAD_STATE':
      return { ...initialState, ...action.payload };
    case 'RESET_STATE':
      return initialState;
    default:
      return state;
  }
}

const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<Action>;
  isSaving: boolean;
  deleteCampaign: () => Promise<void>;
} | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const { user, loading: authLoading } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const isFirstLoad = useRef(true);
  const isInitializing = useRef(false);
  const isDeleting = useRef(false);

  useEffect(() => {
    if (authLoading) return;
    if (isInitializing.current) return;

    const getLocalSaveKey = () => user ? `arkanus_save_${user.uid}` : 'arkanus_save_guest';

    const loadData = async () => {
      isInitializing.current = true;
      let loadedState: GameState | null = null;
      const localKey = getLocalSaveKey();

      try {
        if (user) {
          loadedState = await loadGameSave(user.uid);
        }

        if (!loadedState) {
          const savedState = localStorage.getItem(localKey);
          if (savedState) {
            loadedState = JSON.parse(savedState);
          }
        }

        if (loadedState) {
          dispatch({ type: 'LOAD_STATE', payload: migrateSave(loadedState) });
        }
      } catch (e) {
        console.error("Failed to load save", e);
      } finally {
        isInitializing.current = false;
        isFirstLoad.current = false;
      }
    };

    loadData();
  }, [user, authLoading]);

  useEffect(() => {
    if (isFirstLoad.current) return;
    if (isDeleting.current) return;

    const localKey = user ? `arkanus_save_${user.uid}` : 'arkanus_save_guest';
    localStorage.setItem(localKey, JSON.stringify(state));

    const timeoutId = setTimeout(async () => {
      if (isDeleting.current) return;
      if (user) {
        setIsSaving(true);
        try {
          await saveGameState(user.uid, state);
        } catch (err) {
          console.error("Failed to save to cloud", err);
        } finally {
          setIsSaving(false);
        }
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [state, user]);

  const deleteCampaign = async () => {
    isDeleting.current = true;
    try {
      if (user) {
        await deleteGameSave(user.uid);
        localStorage.removeItem(`arkanus_save_${user.uid}`);
      } else {
        localStorage.removeItem('arkanus_save_guest');
      }
      dispatch({ type: 'RESET_STATE' });
    } finally {
      // Mantém o flag ativo por tempo suficiente para o useEffect de auto-save não reescrever
      setTimeout(() => { isDeleting.current = false; }, 2000);
    }
  };

  return (
    <GameContext.Provider value={{ state, dispatch, isSaving, deleteCampaign }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameState = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameState must be used within a GameProvider');
  }
  return context;
};

