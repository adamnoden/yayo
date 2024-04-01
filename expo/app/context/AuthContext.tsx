import {
  getAuth,
  onAuthStateChanged,
  signOut as firebaseSignOut,
  User,
} from "firebase/auth";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface AuthContextType {
  user: User | null;
  signIn: (user: User) => void;
  signOut: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  // see if was already signed in
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      console.log("persisted user:", user);
      setLoading(false); // Set loading to false once we receive the auth state
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const signIn = (user: User) => setUser(user);

  const signOut = () => {
    const auth = getAuth();
    firebaseSignOut(auth)
      .then(() => {
        console.log("Sign out succesful");
        setUser(null);
      })
      .catch((error) => {
        console.error("Sign out error:", error);
      });
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
