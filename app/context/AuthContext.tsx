"use client";

import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type User = {
  username: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<
    React.SetStateAction<User | null>
  >;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(
  null
);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get("/api/users/me");

        if (res.data?.user) {
          setUser(res.data.user);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};