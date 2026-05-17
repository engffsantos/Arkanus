import { createInitialGameState } from '../src/services/campaignCreator';
import { resolveAction, advanceSeason } from '../src/services/actionDispatcher';

let state = createInitialGameState({
  covenantName: 'Test Covenant',
  mageName: 'Test Mage',
  tradition: 'Bonisagus',
  region: 'Rhine',
  archetype: 'Laboratory',
  difficulty: 'Normal',
  gameMode: 'Standard'
});

try {
  console.log('--- INIT SIMULATION ---');
  for (let i = 0; i < 20; i++) {
     console.log(`[YEAR ${state.meta.year}] [SEASON ${state.meta.season}] -> Prata: ${state.resources.prata}, Unrest: ${state.covenant.unrest}`);
     
     // Set primary action
     state.meta.primaryAction = {
         id: 'act1',
         selected: true,
         category: 'Sys',
         subAction: 'Nothing',
         locked: false,
         resolved: false,
         payload: { type: 'NONE' }
     };
     
     // Advance season
     state = advanceSeason(state);
  }
  console.log('--- SIMULATION DONE ---');
  process.exit(0);
} catch (e) {
  console.error('SIMULATION FAILED', e);
  process.exit(1);
}
