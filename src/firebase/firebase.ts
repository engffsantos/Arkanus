import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "../../firebase-applet-config.json";

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
// The skill explicitly said `firebaseConfig.firestoreDatabaseId` is critical
export const db = getFirestore(firebaseApp, firebaseConfig.firestoreDatabaseId);
