import { GameState } from '../../types/game';
import { cloneGameState } from '../../utils/immutable';
import { createLogEvent } from '../../services/actions/shared';

export function resolveCaravans(state: GameState): GameState {
  const nextState = cloneGameState(state);
  
  const seasons = ['Primavera', 'Verão', 'Outono', 'Inverno'];
  const currentSeasonIdx = seasons.indexOf(nextState.meta.season);
  const isAdvanceYear = currentSeasonIdx === 3;
  const nextSeasonField = seasons[(currentSeasonIdx + 1) % 4] as any;
  const nextYearField = isAdvanceYear ? nextState.meta.year + 1 : nextState.meta.year;

  if (nextState.commerce && nextState.commerce.caravans) {
      const stillActive: typeof nextState.commerce.caravans = [];
      let caravanProfits = 0;
      for (const caravan of nextState.commerce.caravans) {
         if (caravan.status === 'active' && caravan.returnSeason === nextSeasonField && caravan.returnYear === nextYearField) {
            const risk = Math.random() * 100;
            if (risk < 15) {
               const logEvent = createLogEvent(nextState, 'Comércio', `A caravana para ${caravan.destination} foi assaltada ou sofreu perdas. Não retornou lucro.`);
               nextState.events = [logEvent, ...nextState.events].slice(0, 50);
               caravan.status = 'lost';
            } else {
               const profit = 150 + Math.floor(Math.random() * 150);
               caravanProfits += profit;
               caravan.status = 'returning';
               const logEvent = createLogEvent(nextState, 'Comércio', `A caravana de ${caravan.destination} retornou com sucesso, trazendo lucros.`);
               nextState.events = [logEvent, ...nextState.events].slice(0, 50);
            }
         } else {
            stillActive.push(caravan);
         }
      }
      if (caravanProfits > 0) {
         nextState.resources.prata += caravanProfits;
         const logEvent = createLogEvent(nextState, 'Comércio', `Lucro total de bens comerciais: ${caravanProfits} Prata.`);
         nextState.events = [logEvent, ...nextState.events].slice(0, 50);
      }
      nextState.commerce.caravans = nextState.commerce.caravans.map((c: any) => c.status === 'active' || c.status === 'returning' || c.status === 'lost' ? c : c).filter((c: any) => c.status === 'active');
   }
   
   // Part 2 of commerce logic that was down below in original engine
   const arrivingCaravans = nextState.commerce.caravans.filter((c: any) => c.returnSeason === nextSeasonField && c.returnYear === nextYearField && c.status === 'active');
   const remainingCaravans = nextState.commerce.caravans.filter((c: any) => !(c.returnSeason === nextSeasonField && c.returnYear === nextYearField && c.status === 'active'));

   let tradeProfit = 0;
   for (const c of arrivingCaravans) {
      c.status = 'returning';
      tradeProfit += 120;
      const logEvent = createLogEvent(nextState, 'Comércio', `Caravana retornou de ${c.destination} com ${120} pratas.`);
      nextState.events = [logEvent, ...nextState.events].slice(0, 50);
   }

   if (tradeProfit > 0) {
     nextState.resources.prata += tradeProfit;
   }
   
   nextState.commerce.caravans = [...remainingCaravans, ...arrivingCaravans.map((c: any) => ({...c, status: 'returning'} as typeof c))];

  return nextState;
}
