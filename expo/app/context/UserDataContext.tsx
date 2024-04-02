import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Define a TypeScript interface for the context value for better type safety (if using TypeScript)
interface UserData {
  balance: number;
  loading: boolean;
  error: Error | null;
  email: string | null;
  username: string | null;
  membershipLevel: string | null;
  refreshUserData: () => Promise<void>;
}

const UserDataContext = createContext<UserData | undefined>(undefined);

// TODO: tbh shouldnt return anything if there was an error
const defaultData = {
  balance: 0,
  loading: true,
  error: null,
  email: null,
  username: null,
  membershipLevel: null,
};

interface UserDataProviderProps {
  children: ReactNode;
}

export const UserDataProvider: React.FC<UserDataProviderProps> = ({
  children,
}) => {
  const [userData, setUserData] =
    useState<Omit<UserData, "refreshUserData">>(defaultData);

  const fetchUserData = useCallback(async () => {
    const auth = getAuth();
    const db = getFirestore();
    const user = auth.currentUser;

    setUserData((prevData) => ({ ...prevData, loading: true }));

    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      try {
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData({
            balance: data.balance ? data.balance / 100 : 0,
            loading: false,
            error: null,
            email: data.email,
            username: data.username,
            membershipLevel: data.membershipLevel,
          });
        } else {
          setUserData({
            ...defaultData,
            loading: false,
            error: new Error("No such document!"),
          });
        }
      } catch (err) {
        setUserData({
          ...defaultData,
          loading: false,
          error: err instanceof Error ? err : new Error("An error occurred"),
        });
      }
    } else {
      setUserData({
        ...defaultData,
        loading: false,
        error: new Error("User not logged in"),
      });
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const value = {
    ...userData,
    refreshUserData: fetchUserData,
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error("useUserData must be used within a UserDataProvider");
  }
  return context;
};
