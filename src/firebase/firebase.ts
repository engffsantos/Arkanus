import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

let firebaseConfig: any = {};
try {
  const jsonConfig = require("../../firebase-applet-config.json");
  firebaseConfig = { ...jsonConfig };
} catch (e) {
  // It's a fallback
}

// Prefer VITE_FIREBASE_ variables if available
const env = (import.meta as any).env || {};
const config = {
  apiKey: env.VITE_FIREBASE_API_KEY || firebaseConfig.apiKey,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || firebaseConfig.authDomain,
  projectId: env.VITE_FIREBASE_PROJECT_ID || firebaseConfig.projectId,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || firebaseConfig.storageBucket,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || firebaseConfig.messagingSenderId,
  appId: env.VITE_FIREBASE_APP_ID || firebaseConfig.appId,
  firestoreDatabaseId: env.VITE_FIREBASE_FIRESTORE_DATABASE_ID || firebaseConfig.firestoreDatabaseId || "(default)"
};

// Validate defensivamente
const requiredEnvVars = [
  "apiKey",
  "authDomain",
  "projectId",
  "storageBucket",
  "messagingSenderId",
  "appId",
];

// Comentar o check se usar o json fallback no ambiente local do dev.
for (const key of requiredEnvVars) {
  if (!config[key as keyof typeof config]) {
    console.warn(`Firebase config warning: ausente ${key}`);
  }
}

export const firebaseApp = initializeApp(config);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp, config.firestoreDatabaseId);
