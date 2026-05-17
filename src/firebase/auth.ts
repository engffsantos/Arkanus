import {
  GoogleAuthProvider,
  signInWithPopup,
  getRedirectResult,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth } from "./firebase";

const provider = new GoogleAuthProvider();

export function loginWithGoogleRedirect() {
  return signInWithPopup(auth, provider);
}

export function handleRedirectResult() {
  return getRedirectResult(auth);
}

export function logout() {
  return signOut(auth);
}

export function listenAuthState(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}
