import { describe, it, expect } from "vitest";
import { advanceSeason } from "../../src/systems/seasons/advanceSeason";
import { createInitialGameState } from "../../src/services/campaignCreator";

describe("advanceSeason & seasonEngine", () => {
  const commonConfig = {
      covenantName: "Test",
      mageName: "Test Mage",
      tradition: "Bjornaer",
      region: "Hibernia",
      archetype: "Laboratory" as const,
      difficulty: "Normal" as const,
      gameMode: "Standard" as const
  };

  it("avanço Primavera -> Verão", () => {
    const initialState = createInitialGameState(commonConfig);
    initialState.meta.season = 'Primavera';
    const nextState = advanceSeason(initialState);
    expect(nextState.meta.season).toBe('Verão');
  });

  it("renda e despesa por estação", () => {
    const initialState = createInitialGameState(commonConfig);
    initialState.meta.season = 'Primavera';
    initialState.resources.prata = 100;
    initialState.covenant.incomePerSeason = 50;
    initialState.covenant.expensesPerSeason = 20;
    // Laboratório lv 1 = 10 maint -> total 30
    initialState.laboratory.level = 1;
    
    const nextState = advanceSeason(initialState);
    // 100 + 50 - 30 = 120
    expect(nextState.resources.prata).toBe(120);
  });

  it("bloqueio de ação primária por estação", () => {
    const initialState = createInitialGameState(commonConfig);
    
    initialState.meta.primaryAction = {
        selected: true,
        locked: true,
        resolved: false,
        actionId: "123",
        actionType: null,
        domain: "Governança",
        label: "test_action",
        payload: {
            type: "DUMMY_ACTION"
        },
        id: "123",
        category: "Governança",
        subAction: "test_action"
    };
    
    const nextState = advanceSeason(initialState);
    // After season advances, primary action should be cleared
    expect(nextState.meta.primaryAction).toBeUndefined();
  });

  it("laboratório avançando projeto", () => {
    const initialState = createInitialGameState(commonConfig);
    
    initialState.laboratory.level = 2;
    initialState.laboratory.quality = 3;
    initialState.covenant.auraArcana = 20; // +2 bonus
    initialState.mage.characteristics = { intelligence: 3 } as any;
    initialState.mage.abilities = { magicTheory: 4 } as any;
    initialState.mage.arts = {
        techniques: { creo: 5 } as any,
        forms: { ignem: 5 } as any
    };

    initialState.laboratory.activeProjects = [
      {
        id: 'p1',
        name: 'Spell 1',
        type: 'spell',
        technique: 'creo' as any,
        form: 'ignem' as any,
        requiredTotal: 50,
        accumulatedProgress: 0,
        essenciaCost: 0,
        risk: 0, // no wipe
        status: 'active'
      }
    ];

    initialState.meta.primaryAction = {
        selected: true,
        locked: true,
        resolved: false,
        actionId: "123",
        actionType: "LAB_START_PROJECT",
        domain: "laboratory",
        label: "study",
        payload: { type: "LAB_STUDY" },
        id: "123",
        category: "Laboratório",
        subAction: "study"
    };
    
    const nextState = advanceSeason(initialState);
    // Int(3) + MT(4) + Creo(5) + Ignem(5) + LabQ(3) + Aura(20 = 20 bonus wait no, auraArcana was added fully so +20)
    // In `calculateLabTotal`: total += state.covenant.auraArcana; (wait, is it pure value or /10? It's pure value).
    // So 3+4+5+5+3+20 = 40.
    expect(nextState.laboratory.activeProjects[0].accumulatedProgress).toBe(40);
  });
});
