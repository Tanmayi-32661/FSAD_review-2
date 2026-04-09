import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { authService } from "@/services/authService";
import { storage } from "@/services/storage";
import type { Role, User } from "@/types";

const INACTIVITY_TIMEOUT_MS = 30 * 60 * 1000;

interface AppAuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string, captchaToken: string, captchaAnswer: string) => Promise<User>;
  register: (values: {
    name: string;
    email: string;
    password: string;
    role: Role;
    captchaToken: string;
    captchaAnswer: string;
  }) => Promise<User>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  setUser: (user: User | null) => void;
}

const AppAuthContext = createContext<AppAuthContextType | undefined>(undefined);

export const AppAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User | null>(() => storage.getUser());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bootstrap = async () => {
      const token = storage.getToken();
      const sessionExpiresAt = storage.getSessionExpiresAt();
      const lastActivityAt = storage.getLastActivityAt();

      if (!token) {
        setLoading(false);
        return;
      }

      if ((sessionExpiresAt && sessionExpiresAt <= Date.now()) || (lastActivityAt && Date.now() - lastActivityAt > INACTIVITY_TIMEOUT_MS)) {
        storage.clearAll();
        setUserState(null);
        setLoading(false);
        return;
      }

      try {
        const currentUser = await authService.me();
        storage.setUser(currentUser);
        storage.markActivity();
        setUserState(currentUser);
      } catch {
        storage.clearAll();
        setUserState(null);
      } finally {
        setLoading(false);
      }
    };

    void bootstrap();
  }, []);

  useEffect(() => {
    if (!user) {
      return;
    }

    const markActive = () => storage.markActivity();
    const sessionCheck = () => {
      const sessionExpiresAt = storage.getSessionExpiresAt();
      const lastActivityAt = storage.getLastActivityAt();

      if ((sessionExpiresAt && sessionExpiresAt <= Date.now()) || (lastActivityAt && Date.now() - lastActivityAt > INACTIVITY_TIMEOUT_MS)) {
        storage.clearAll();
        setUserState(null);
      }
    };

    const events: Array<keyof WindowEventMap> = ["click", "keydown", "mousemove", "scroll"];
    events.forEach((eventName) => window.addEventListener(eventName, markActive));
    const interval = window.setInterval(sessionCheck, 60_000);

    return () => {
      events.forEach((eventName) => window.removeEventListener(eventName, markActive));
      window.clearInterval(interval);
    };
  }, [user]);

  const setUser = (nextUser: User | null) => {
    setUserState(nextUser);
    if (nextUser) {
      storage.setUser(nextUser);
      return;
    }
    storage.clearUser();
  };

  const login = async (email: string, password: string, captchaToken: string, captchaAnswer: string) => {
    const payload = await authService.login(email, password, captchaToken, captchaAnswer);
    storage.setToken(payload.token);
    storage.setSessionExpiresAt(payload.sessionExpiresAt);
    storage.markActivity();
    setUser(payload.user);
    return payload.user;
  };

  const register = async (values: {
    name: string;
    email: string;
    password: string;
    role: Role;
    captchaToken: string;
    captchaAnswer: string;
  }) => {
    const payload = await authService.register(values);
    storage.setToken(payload.token);
    storage.setSessionExpiresAt(payload.sessionExpiresAt);
    storage.markActivity();
    setUser(payload.user);
    return payload.user;
  };

  const logout = () => {
    storage.clearAll();
    setUserState(null);
  };

  const refreshUser = async () => {
    const currentUser = await authService.me();
    setUser(currentUser);
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
      refreshUser,
      setUser,
    }),
    [user, loading]
  );

  return <AppAuthContext.Provider value={value}>{children}</AppAuthContext.Provider>;
};

export const useAppAuth = () => {
  const context = useContext(AppAuthContext);
  if (!context) {
    throw new Error("useAppAuth must be used within AppAuthProvider");
  }
  return context;
};
