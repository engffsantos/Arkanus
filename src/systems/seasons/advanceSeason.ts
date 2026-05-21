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

  const beforeStats = {
    prata: state.resources.prata,
    loyalty: state.covenant.loyalty,
    population: state.covenant.population,
    publicHealth: state.covenant.publicHealth,
    security: state.covenant.security,
  };

  const executedActionId = state.meta.primaryAction?.actionId || 'none';
  const executedActionName = state.meta.primaryAction?.label || 'Manutenção Geral';

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

  const afterStats = {
    prata: next.resources.prata,
    loyalty: next.covenant.loyalty,
    population: next.covenant.population,
    publicHealth: next.covenant.publicHealth,
    security: next.covenant.security,
  };

  // Determine gains and losses
  const gains: string[] = [];
  const losses: string[] = [];

  if (afterStats.prata > beforeStats.prata) gains.push(`+${Math.floor(afterStats.prata - beforeStats.prata)} Prata`);
  if (afterStats.prata < beforeStats.prata) losses.push(`-${Math.floor(beforeStats.prata - afterStats.prata)} Prata`);

  if (afterStats.loyalty > beforeStats.loyalty) gains.push(`+${Math.floor(afterStats.loyalty - beforeStats.loyalty)}% Lealdade`);
  if (afterStats.loyalty < beforeStats.loyalty) losses.push(`-${Math.floor(beforeStats.loyalty - afterStats.loyalty)}% Lealdade`);

  if (afterStats.population > beforeStats.population) gains.push(`+${Math.floor(afterStats.population - beforeStats.population)} População`);
  if (afterStats.population < beforeStats.population) losses.push(`-${Math.floor(beforeStats.population - afterStats.population)} População`);

  if (afterStats.publicHealth > beforeStats.publicHealth) gains.push(`+${Math.floor(afterStats.publicHealth - beforeStats.publicHealth)}% Saúde`);
  if (afterStats.publicHealth < beforeStats.publicHealth) losses.push(`-${Math.floor(beforeStats.publicHealth - afterStats.publicHealth)}% Saúde`);

  if (afterStats.security > beforeStats.security) gains.push(`+${Math.floor(afterStats.security - beforeStats.security)}% Segurança`);
  if (afterStats.security < beforeStats.security) losses.push(`-${Math.floor(beforeStats.security - afterStats.security)}% Segurança`);

  let recommendation = "A soberania está estável. Favorece estudos na Biblioteca ou projetos de Laboratório.";
  if (afterStats.prata < 35) {
    recommendation = "Atenção! Prata baixa. Estimule o comércio local ou envie caravanas para evitar falência.";
  } else if (afterStats.loyalty < 40) {
    recommendation = "Crise de lealdade iminente. Uma ação de Governança acalmará os súditos.";
  } else if (afterStats.publicHealth < 40) {
    recommendation = "Alerta de peste! Foque em saneamento e boticários para curar o povo.";
  } else if (afterStats.security < 35) {
    recommendation = "Segurança precária! Os caminhos estão perigosos. Reorganize a guarda do feudo.";
  }

  next.lastTurnResult = {
    season: state.meta.season,
    year: state.meta.year,
    actionId: executedActionId,
    actionName: executedActionName,
    before: beforeStats,
    after: afterStats,
    gains,
    losses,
    description: `A estação de ${state.meta.season} do Ano ${state.meta.year} encerrou-se. O conselho compilou o relatório com base na atividade executada: ${executedActionName}.`,
    recommendation
  };

  return next;
}
