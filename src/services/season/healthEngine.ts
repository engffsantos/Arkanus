import { GameState } from '../../types/game';
import { createLogEvent } from '../actions/shared';

export function resolveHealthAndPopulation(state: GameState): GameState {
  let nextState = JSON.parse(JSON.stringify(state)) as GameState;

  if (nextState.covenant.publicHealth < 40) {
     nextState.health.epidemicRisk += 5;
  } else if (nextState.covenant.publicHealth > 70) {
     nextState.health.epidemicRisk = Math.max(0, nextState.health.epidemicRisk - 5);
  }

  const popGrowthRate = (nextState.covenant.publicHealth - 50) + (nextState.covenant.loyalty - 50);
  const newPop = Math.ceil(nextState.covenant.population + (nextState.covenant.population * (popGrowthRate / 1000)));
  nextState.covenant.population = Math.max(10, newPop);

  if (nextState.health.epidemicRisk > 80 && Math.random() > 0.5) {
     const deaths = Math.floor(nextState.covenant.population * 0.1); 
     nextState.covenant.population = Math.max(0, nextState.covenant.population - deaths);
     nextState.covenant.loyalty -= 10;
     nextState.health.epidemicRisk = 20;
     const logEvent = createLogEvent(nextState, 'Crise', `Epidemia atingiu a soberania! Muitas mortes.`);
     nextState.events = [logEvent, ...nextState.events].slice(0, 50);
  }

  if (nextState.covenant.unrest > 80 && Math.random() > 0.5) {
     nextState.covenant.security -= 20;
     nextState.covenant.loyalty -= 20;
     nextState.covenant.unrest = 30;
     const logEvent = createLogEvent(nextState, 'Crise', `Uma revolta camponesa danificou estruturas e reduziu a segurança.`);
     nextState.events = [logEvent, ...nextState.events].slice(0, 50);
  }

  return nextState;
}
