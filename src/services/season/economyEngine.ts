import { GameState } from '../../types/game';
import { createLogEvent } from '../actions/shared';

export function resolveEconomy(state: GameState): GameState {
  let nextState = JSON.parse(JSON.stringify(state)) as GameState;

  const income = nextState.covenant.incomePerSeason;
  const maintenance = nextState.covenant.expensesPerSeason + (nextState.laboratory.level * 10);
  
  nextState.resources.prata = Math.max(0, nextState.resources.prata + income - maintenance);
  nextState.resources.essencia.total += (nextState.covenant.auraArcana >= 3 ? 1 : 0);

  if (nextState.guilds && nextState.guilds.guilds) {
     let silverProduced = 0;
     for (const guild of nextState.guilds.guilds) {
       silverProduced += guild.level * 10;
     }
     if (silverProduced > 0) {
        nextState.resources.prata += silverProduced;
        const logEvent = createLogEvent(nextState, 'Comércio', `As guildas produziram ${silverProduced} Prata no total.`);
        nextState.events = [logEvent, ...nextState.events].slice(0, 50);
     }
  }

  return nextState;
}
