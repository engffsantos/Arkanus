import { describe, it, expect, vi } from "vitest";
import { resolveSeasonalEvents } from "../../src/services/eventEngine";
import { createInitialGameState } from "../../src/services/campaignCreator";

describe("eventEngine", () => {
    it("aplica evento sazonal aleatório de forma correta modificando o status ou logs", () => {
        const initialState = createInitialGameState({
            covenantName: "Test",
            mageName: "Mage",
            tradition: "Flambeau",
            region: "Hibernia",
            archetype: "Laboratory",
            difficulty: "Normal",
            gameMode: "Standard"
        });

        // Setup to match condition for 'arcane_anomaly' (auraArcana >= 3)
        initialState.covenant.auraArcana = 4;
        
        vi.spyOn(Math, 'random').mockReturnValue(0.01); 
        
        const nextState = resolveSeasonalEvents(initialState);
        
        expect(nextState.events.length).toBeGreaterThan(initialState.events.length);
        expect(nextState.events[0].text).toContain("Anomalia Arcana");

        vi.restoreAllMocks();
    });
});
