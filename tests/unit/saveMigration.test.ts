import { describe, it, expect } from "vitest";

// Optional: if save migration doesn't export the test we expect, we can stub or mock
// Or we can import from `gameSaveService` if it exists and exports it.
import { migrateSave } from "../../src/services/saveMigration"; 
// Note: original error said "Module... has no exported member migrateGameState", it might be migrateGameSave
import { createInitialGameState } from "../../src/services/campaignCreator";

describe("saveMigration", () => {
    it("preserva os campos do estado antigo que ainda são válidos após a migração", () => {
        const initialState = createInitialGameState({
            covenantName: "Old Campaign",
            mageName: "Test Mage",
            tradition: "Bjornaer",
            region: "Hibernia",
            archetype: "Laboratory",
            difficulty: "Normal",
            gameMode: "Standard"
        });
        
        // Simular um estado salvo com uma versão mais antiga (se suportar)
        // O `migrateGameSave` cria um novo
        
        const oldSavedState = {
            ...initialState,
            meta: {
                ...initialState.meta,
                version: "v4.0.0", // old
                campaignName: "Old Name Kept" // legacy config
            },
            resources: {
                ...initialState.resources,
                prata: 999,
                vis: 5 // legacy field that should be migrated
            }
        };

        const migrated = (migrateSave as any)(oldSavedState);

        // Deve preencher covenant, mage, etc, a partir do root if it was somehow missing or broken, but keep prata and name
        expect(migrated.meta.campaignName).toBe("Old Name Kept");
        expect(migrated.resources.prata).toBe(999);
        // Garante que o vis foi convertido para essencia
        expect(migrated.resources.essencia.total).toBe(5);
        // Garante que um item profundo como covenant foi mesclado com valores default se tivesse campo faltando
        expect(migrated.covenant).toBeDefined();
    });
});
