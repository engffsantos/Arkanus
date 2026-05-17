import { GameState } from '../../types/game';
import { cloneGameState } from '../../utils/immutable';

import { resolveSelectedPrimaryAction } from './resolveSelectedPrimaryAction';
import { advanceCalendar } from './advanceCalendar';
import { resolveSeasonSummary } from './resolveSeasonSummary';

import { resolveLaboratoryProjects } from '../laboratory/resolveLaboratoryProjects';
import { resolveWritingProjects } from '../writing/resolveWritingProjects';
import { resolveReadingProjects } from '../library/resolveReadingProjects';
import { resolveGuildProduction } from '../guilds/resolveGuildProduction';
import { resolveCaravans } from '../commerce/resolveCaravans';
import { resolveTerritoryProduction } from '../map/resolveTerritoryProduction';
import { resolveCharterEffects } from '../charters/resolveCharterEffects';
import { resolveAuraPressure } from '../auras/resolveAuraPressure';
import { resolveHealthAndHumors } from '../health/resolveHealthAndHumors';
import { resolveEconomy } from '../economy/resolveEconomy';
import { resolveFactionPressure } from '../diplomacy/resolveFactionPressure';
import { resolveConflictDeadlines } from '../conflicts/resolveConflictDeadlines';
import { generateSeasonalEvents } from '../events/generateSeasonalEvents';
import { resolveVictoryDefeatConditions } from '../victory/resolveVictoryDefeatConditions';

export function advanceSeason(state: GameState): GameState {
  let next = cloneGameState(state);

  next = resolveSelectedPrimaryAction(next);
  next = resolveLaboratoryProjects(next);
  next = resolveWritingProjects(next);
  next = resolveReadingProjects(next);
  next = resolveGuildProduction(next);
  next = resolveCaravans(next);
  next = resolveTerritoryProduction(next);
  next = resolveCharterEffects(next);
  next = resolveAuraPressure(next);
  next = resolveHealthAndHumors(next);
  next = resolveEconomy(next);
  next = resolveFactionPressure(next);
  next = resolveConflictDeadlines(next);
  next = generateSeasonalEvents(next);
  next = resolveVictoryDefeatConditions(next);
  next = advanceCalendar(next);
  next = resolveSeasonSummary(next);

  return next;
}
