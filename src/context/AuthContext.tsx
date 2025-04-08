import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useCallback,
  useEffect,
} from "react";
import { AuthUser } from "../types/user";

type AuthContextType = {
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = useCallback((userData: AuthUser) => {
    const authUser: AuthUser = {
      ...userData,
      tokenExpiry: userData.tokenExpiry
        ? userData.tokenExpiry
        : Date.now() + 60 * 60 * 1000,
    } as AuthUser;
    setUser(authUser);
    localStorage.setItem("user", JSON.stringify(authUser));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("user");
  }, []);

  
  const refreshAccessToken = useCallback(async () => {
    if (!user) return;
    try {
      const response = await fetch("https://dummyjson.com/auth/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken: user.refreshToken }),
      });
      if (!response.ok) throw new Error("Token refresh failed");
      const data = await response.json();

      const updatedUser: AuthUser = {
        ...user,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        tokenExpiry:
          Date.now() +
          (data.expiresIn ? data.expiresIn * 1000 : 60 * 60 * 1000),
      };

      login(updatedUser);
    } catch (error) {
      console.error("Error refreshing token:", error);
      logout();
    }
  }, [user, login, logout]);

 
  useEffect(() => {
    if (user) {
    
      const buffer = 60000; 
      const delay = user.tokenExpiry - Date.now() - buffer;
      if (delay <= 0) {
       
        refreshAccessToken();
      } else {
        const timer = setTimeout(() => {
          refreshAccessToken();
        }, delay);
  
        return () => clearTimeout(timer);
      }
    }
  }, [user, refreshAccessToken]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
