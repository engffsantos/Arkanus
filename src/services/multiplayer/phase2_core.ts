// Fase 2: Multiplayer assíncrono simples (Login, mapa, rodadas, ações simultâneas).
import { Region, PlayerSovereignty, SeasonAction, PublicEvent } from "../../types/multiplayer";
import { db } from "../../firebase/firebase";
import { collection, doc, getDoc, getDocs, setDoc, addDoc, query, where, updateDoc } from "firebase/firestore";

export class CoreMultiplayerService {
  async getRegions(): Promise<Region[]> {
    const q = query(collection(db, "multiplayer_regions"));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as Region));
  }

  async joinRegion(regionId: string, userId: string, sovereigntyData: Partial<PlayerSovereignty>): Promise<void> {
    const docRef = doc(db, "multiplayer_sovereignties", `${regionId}_${userId}`);
    await setDoc(docRef, {
      ...sovereigntyData,
      regionId,
      userId,
      status: 'active',
      creadedAt: new Date().toISOString()
    });
  }

  async submitSeasonAction(action: Omit<SeasonAction, 'id' | 'status'>): Promise<string> {
    const actionRef = await addDoc(collection(db, "multiplayer_actions"), {
      ...action,
      status: 'pending',
      submittedAt: new Date().toISOString()
    });
    return actionRef.id;
  }

  async getRegionEvents(regionId: string): Promise<PublicEvent[]> {
    const q = query(collection(db, "multiplayer_events"), where("regionId", "==", regionId));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as PublicEvent));
  }
}

export const coreMultiplayerService = new CoreMultiplayerService();
