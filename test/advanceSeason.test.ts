import { describe, it, expect } from 'vitest';
import { createInitialGameState } from '../src/services/campaignCreator';
import { advanceSeason } from '../src/services/actionDispatcher';

describe('Seasonal Progression', () => {
    it('Should advance season and increase year correctly', () => {
        let state = createInitialGameState({
          covenantName: 'Test',
          mageName: 'Test Mage',
          tradition: 'Bonisagus',
          region: 'Rhine',
          archetype: 'Laboratory',
          difficulty: 'Normal',
          gameMode: 'Standard'
        });

        // Current should be Primavera 1220
        expect(state.meta.season).toBe('Primavera');
        expect(state.meta.year).toBe(1220);

        // Advance to Verão
        state = advanceSeason(state);
        expect(state.meta.season).toBe('Verão');
        expect(state.meta.year).toBe(1220);

        // Advance to Outono
        state = advanceSeason(state);
        expect(state.meta.season).toBe('Outono');
        
        // Advance to Inverno
        state = advanceSeason(state);
        expect(state.meta.season).toBe('Inverno');
        
        // Advance to Primavera 1221
        state = advanceSeason(state);
        expect(state.meta.season).toBe('Primavera');
        expect(state.meta.year).toBe(1221);
    });
});
