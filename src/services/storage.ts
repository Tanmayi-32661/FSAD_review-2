import type { User } from "@/types";

const TOKEN_KEY = "pis_token";
const USER_KEY = "pis_user";
const SESSION_EXPIRES_AT_KEY = "pis_session_expires_at";
const LAST_ACTIVITY_AT_KEY = "pis_last_activity_at";

export const storage = {
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },
  setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  },
  clearToken() {
    localStorage.removeItem(TOKEN_KEY);
  },
  getUser() {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  },
  setUser(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },
  getSessionExpiresAt() {
    const raw = localStorage.getItem(SESSION_EXPIRES_AT_KEY);
    return raw ? Number(raw) : null;
  },
  setSessionExpiresAt(expiresAt: number) {
    localStorage.setItem(SESSION_EXPIRES_AT_KEY, String(expiresAt));
  },
  clearSessionExpiresAt() {
    localStorage.removeItem(SESSION_EXPIRES_AT_KEY);
  },
  getLastActivityAt() {
    const raw = localStorage.getItem(LAST_ACTIVITY_AT_KEY);
    return raw ? Number(raw) : null;
  },
  markActivity() {
    localStorage.setItem(LAST_ACTIVITY_AT_KEY, String(Date.now()));
  },
  clearLastActivityAt() {
    localStorage.removeItem(LAST_ACTIVITY_AT_KEY);
  },
  clearUser() {
    localStorage.removeItem(USER_KEY);
  },
  clearAll() {
    this.clearToken();
    this.clearUser();
    this.clearSessionExpiresAt();
    this.clearLastActivityAt();
  },
};
