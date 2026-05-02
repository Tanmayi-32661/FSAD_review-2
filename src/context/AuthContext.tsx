import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { User, Role } from "@/types";
import { API } from "@/api/api";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    name: string,
    email: string,
    password: string,
    role: Role
  ) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Load auth per browser tab.
  const [user, setUser] = useState<User | null>(() => {
    const stored = sessionStorage.getItem("pis_user");
    return stored ? JSON.parse(stored) : null;
  });

  // ================= LOGIN =================
  const login = useCallback(
    async (email: string, password: string): Promise<boolean> => {
      try {
        const res = await API.login({ email, password });

        // ✅ backend returns { token, user }
        const { user, token } = res;

        setUser(user);

        sessionStorage.setItem("pis_user", JSON.stringify(user));
        sessionStorage.setItem("pis_token", token);

        return true;
      } catch (err) {
        console.error("Login failed:", err);
        return false;
      }
    },
    []
  );

  // ================= REGISTER =================
  const register = useCallback(
    async (
      name: string,
      email: string,
      password: string,
      role: Role
    ): Promise<boolean> => {
      try {
        const user = await API.register({
          name,
          email,
          password,
          role,
        });

        setUser(user);
        sessionStorage.setItem("pis_user", JSON.stringify(user));

        return true;
      } catch (err) {
        console.error("Register failed:", err);
        return false;
      }
    },
    []
  );

  // ================= LOGOUT =================
  const logout = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem("pis_user");
    sessionStorage.removeItem("pis_token");
  }, []);

  // ================= UPDATE PROFILE =================
  const updateProfile = useCallback((updates: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev;

      const updated = { ...prev, ...updates };
      sessionStorage.setItem("pis_user", JSON.stringify(updated));

      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        updateProfile,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ================= HOOK =================
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
