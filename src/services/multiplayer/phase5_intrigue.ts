// Fase 5: Intriga e política avançada (Espionagem, pactos secretos).
import { SeasonAction } from "../../types/multiplayer";
import { coreMultiplayerService } from "./phase2_core";

export class IntrigueService {
  async submitSpyAction(regionId: string, userId: string, targetuserId: string, targetAspect: string): Promise<string> {
    return coreMultiplayerService.submitSeasonAction({
      regionId,
      userId,
      year: 0, // Should be injected by context
      season: 'Primavera', // Should be injected by context
      type: 'espionage',
      targetId: targetuserId,
      payload: { aspect: targetAspect }
    });
  }

  async submitSabotageAction(regionId: string, userId: string, targetuserId: string,  targetResource: string): Promise<string> {
    return coreMultiplayerService.submitSeasonAction({
      regionId,
      userId,
      year: 0,
      season: 'Primavera',
      type: 'sabotage',
      targetId: targetuserId,
      payload: { resource: targetResource }
    });
  }
}

export const intrigueService = new IntrigueService();
