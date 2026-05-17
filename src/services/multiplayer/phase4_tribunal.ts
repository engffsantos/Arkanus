// Fase 4: Tribunal e Certâmen (Votações, duelos PvP, reputação).
import { TribunalCase, CertamenDuel } from "../../types/multiplayer";
import { db } from "../../firebase/firebase";
import { collection, doc, getDocs, addDoc, updateDoc, query, where } from "firebase/firestore";

export class TribunalCertamenService {
  // Tribunal
  async openCase(caseData: Omit<TribunalCase, 'id' | 'status' | 'votes' | 'createdAt'>): Promise<string> {
    const docRef = await addDoc(collection(db, "multiplayer_tribunal"), {
      ...caseData,
      status: 'open',
      votes: {},
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  }

  async castVote(caseId: string, voterId: string, vote: 'guilty' | 'innocent' | 'abstain'): Promise<void> {
    const docRef = doc(db, "multiplayer_tribunal", caseId);
    await updateDoc(docRef, {
      [`votes.${voterId}`]: vote
    });
  }

  async getActiveCases(regionId: string): Promise<TribunalCase[]> {
    const q = query(
      collection(db, "multiplayer_tribunal"), 
      where("regionId", "==", regionId),
      where("status", "in", ["open", "voting"])
    );
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as TribunalCase));
  }

  // Certamen
  async challengeDuel(duelData: Omit<CertamenDuel, 'id' | 'status' | 'createdAt'>): Promise<string> {
    const docRef = await addDoc(collection(db, "multiplayer_certamen"), {
      ...duelData,
      status: 'challenged',
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  }

  async respondToDuel(duelId: string, accept: boolean): Promise<void> {
    const docRef = doc(db, "multiplayer_certamen", duelId);
    await updateDoc(docRef, { status: accept ? 'accepted' : 'declined' });
  }

  async submitDuelActions(duelId: string, userId: string, isChallenger: boolean, actions: any): Promise<void> {
    const docRef = doc(db, "multiplayer_certamen", duelId);
    const field = isChallenger ? 'challengerActions' : 'challengedActions';
    await updateDoc(docRef, { [field]: actions });
  }
}

export const tribunalCertamenService = new TribunalCertamenService();
