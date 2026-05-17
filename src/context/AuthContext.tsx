import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { listenAuthState, loginWithGoogleRedirect, handleRedirectResult, logout } from '../firebase/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: () => Promise<void>;
  loginAsGuest: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Captura o resultado do redirect quando o Firebase retorna ao app
  useEffect(() => {
    handleRedirectResult()
      .then(async (result) => {
        if (result?.user) {
          try {
            await setDoc(doc(db, 'users', result.user.uid), {
              uid: result.user.uid,
              email: result.user.email,
              displayName: result.user.displayName,
              photoURL: result.user.photoURL,
              lastLoginAt: serverTimestamp()
            }, { merge: true });
          } catch (error) {
            console.error("Error saving user profile after redirect:", error);
          }
        }
      })
      .catch((error) => {
        console.error("Redirect result error:", error);
      });
  }, []);

  useEffect(() => {
    const unsubscribe = listenAuthState(async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        try {
          await setDoc(doc(db, 'users', currentUser.uid), {
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
            lastLoginAt: serverTimestamp()
          }, { merge: true });
        } catch (error) {
          console.error("Error saving user profile:", error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await loginWithGoogleRedirect();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLoginAsGuest = async () => {
    setLoading(true);
    setUser({
      uid: 'guest_magus_123',
      email: 'convidado@arkanus.com',
      displayName: 'Magus Convidado',
      photoURL: null,
    } as any);
    setLoading(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login: handleLogin, loginAsGuest: handleLoginAsGuest, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

