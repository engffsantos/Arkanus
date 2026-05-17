import { GameState } from '../../types/game';
import { createLogEvent } from './shared';

export function handleCommerceAction(state: GameState, action: {type: string, payload: any}): GameState {
  const nextState = JSON.parse(JSON.stringify(state)) as GameState;

  if (action.type === 'ESTABLISH_GUILD') {
     nextState.resources.prata -= 100;
     if (!nextState.guilds.guilds) {
       nextState.guilds.guilds = [];
     }
     nextState.guilds.guilds.push(action.payload);
     const logEvent = createLogEvent(nextState, 'Governança', `Guilda de ${action.payload.type} estabelecida.`);
     nextState.events = [logEvent, ...nextState.events].slice(0, 50);
  } else if (action.type === 'COMMERCE_SEND_CARAVAN') {
    const currentSeasons = ['Primavera', 'Verão', 'Outono', 'Inverno'];
    const currentSeasonIndex = currentSeasons.indexOf(nextState.meta.season);
    const nextSeason = currentSeasons[(currentSeasonIndex + 1) % 4] as any;
    const nextYear = nextSeason === 'Primavera' ? nextState.meta.year + 1 : nextState.meta.year;

    nextState.commerce.caravans.push({
      id: Date.now().toString(),
      destination: action.payload?.destination || 'Feira de Champagne',
      stock: [], // empty for stub
      status: 'active',
      returnSeason: nextSeason,
      returnYear: nextYear
    });
  }

  return nextState;
}
