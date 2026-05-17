import { describe, it, expect } from "vitest";
import { advanceSeason } from "../../src/services/season/seasonEngine";
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
        id: "123",
        selected: true,
        locked: true,
        resolved: false,
        category: "Governança",
        subAction: "test_action",
        payload: {
            type: "DUMMY_ACTION"
        }
    };
    
    const nextState = advanceSeason(initialState);
    // After season advances, primary action should be cleared
    expect(nextState.meta.primaryAction).toBeUndefined();
  });

  it("laboratório avançando projeto", () => {
    const initialState = createInitialGameState(commonConfig);
    
    initialState.laboratory.level = 2;
    initialState.laboratory.quality = 3;
    initialState.laboratory.activeProjects = [
      {
        id: 'p1',
        name: 'Spell 1',
        type: 'spell',
        technique: 5,
        form: 5,
        requiredTotal: 50,
        accumulatedProgress: 0,
        essenciaCost: 0,
        risk: 0, // no wipe
        status: 'active'
      }
    ];

    initialState.meta.primaryAction = {
        id: "123",
        selected: true,
        locked: true,
        resolved: false,
        category: "Laboratório",
        subAction: "study",
        payload: { type: "LAB_STUDY" }
    };
    
    const nextState = advanceSeason(initialState);
    // Progress given = 15 + level(2) + quality(3) = 20
    expect(nextState.laboratory.activeProjects[0].accumulatedProgress).toBe(20);
  });
});
