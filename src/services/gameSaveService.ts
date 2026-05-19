import { doc, getDoc, setDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { GameState } from "../types/game";
import { migrateSave, CURRENT_SAVE_VERSION } from "./saveMigration";

export async function loadGameSave(uid: string): Promise<GameState | null> {
  const ref = doc(db, "gameSaves", uid);
  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) {
    return null;
  }

  // Cast the returned data to GameState and migrate it
  return migrateSave(snapshot.data());
}

export async function deleteGameSave(uid: string) {
  const ref = doc(db, "gameSaves", uid);
  await deleteDoc(ref);
}

export async function saveGameState(uid: string, gameState: GameState) {
  const ref = doc(db, "gameSaves", uid);

  // Updates current save version before saving
  const gameStateToSave = {
    ...gameState,
    meta: {
      ...gameState.meta,
      version: CURRENT_SAVE_VERSION
    }
  };

  await setDoc(
    ref,
    {
      ...gameStateToSave,
      uid,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}
