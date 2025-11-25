import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { User } from "@/shared/types/auth";
import { storage } from "@/shared/utils/token-storage";
import api from "@/api/client";

interface AuthContextType {
  user: User | null;
  setUser: (u: User) => void;
  isAuthenticated: boolean;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;

  useEffect(() => {
    const checkAuth = async () => {
      const token = storage.getAccessToken();
      if (!token) {
        setLoading(false);
        return;
      }

      api
        .get("/auth/me")
        .then((res) => {
          setUser(res.data);
          storage.setUser(res.data);
        })
        .catch(() => {
          storage.clearTokens();
        })
        .finally(() => setLoading(false));
    };

    setTimeout(checkAuth, 0);
  }, []);

  const logout = () => {
    storage.clearTokens();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
