// Fase 3: Diplomacia e comércio (Tratados, troca de vis/livros).
import { Treaty } from "../../types/multiplayer";
import { db } from "../../firebase/firebase";
import { collection, doc, getDocs, addDoc, updateDoc, query, where, or } from "firebase/firestore";

export class DiplomacyTradeService {
  async proposeTreaty(treaty: Omit<Treaty, 'id' | 'status' | 'createdAt'>): Promise<string> {
    const docRef = await addDoc(collection(db, "multiplayer_treaties"), {
      ...treaty,
      status: 'proposed',
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  }

  async respondToTreaty(treatyId: string, accept: boolean): Promise<void> {
    const docRef = doc(db, "multiplayer_treaties", treatyId);
    await updateDoc(docRef, { status: accept ? 'active' : 'rejected' });
  }

  async getPlayerTreaties(regionId: string, userId: string): Promise<Treaty[]> {
    const q = query(
      collection(db, "multiplayer_treaties"), 
      where("regionId", "==", regionId),
      // Firebase might need an index for this OR query or two separate queries
      where("proposerId", "==", userId)
    );
    const snap1 = await getDocs(q);

    const q2 = query(
      collection(db, "multiplayer_treaties"),
      where("regionId", "==", regionId),
      where("targetId", "==", userId)
    );
    const snap2 = await getDocs(q2);

    const results = new Map<string, Treaty>();
    snap1.docs.forEach(d => results.set(d.id, { id: d.id, ...d.data() } as Treaty));
    snap2.docs.forEach(d => results.set(d.id, { id: d.id, ...d.data() } as Treaty));

    return Array.from(results.values());
  }
}

export const diplomacyTradeService = new DiplomacyTradeService();
