import type { User } from "@/types";

const TOKEN_KEY = "pis_token";
const USER_KEY = "pis_user";
const SESSION_EXPIRES_AT_KEY = "pis_session_expires_at";
const LAST_ACTIVITY_AT_KEY = "pis_last_activity_at";
const tabStorage = sessionStorage;

export const storage = {
  getToken() {
    return tabStorage.getItem(TOKEN_KEY);
  },
  setToken(token: string) {
    tabStorage.setItem(TOKEN_KEY, token);
  },
  clearToken() {
    tabStorage.removeItem(TOKEN_KEY);
  },
  getUser() {
    const raw = tabStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  },
  setUser(user: User) {
    tabStorage.setItem(USER_KEY, JSON.stringify(user));
  },
  getSessionExpiresAt() {
    const raw = tabStorage.getItem(SESSION_EXPIRES_AT_KEY);
    return raw ? Number(raw) : null;
  },
  setSessionExpiresAt(expiresAt: number) {
    tabStorage.setItem(SESSION_EXPIRES_AT_KEY, String(expiresAt));
  },
  clearSessionExpiresAt() {
    tabStorage.removeItem(SESSION_EXPIRES_AT_KEY);
  },
  getLastActivityAt() {
    const raw = tabStorage.getItem(LAST_ACTIVITY_AT_KEY);
    return raw ? Number(raw) : null;
  },
  markActivity() {
    tabStorage.setItem(LAST_ACTIVITY_AT_KEY, String(Date.now()));
  },
  clearLastActivityAt() {
    tabStorage.removeItem(LAST_ACTIVITY_AT_KEY);
  },
  clearUser() {
    tabStorage.removeItem(USER_KEY);
  },
  clearAll() {
    this.clearToken();
    this.clearUser();
    this.clearSessionExpiresAt();
    this.clearLastActivityAt();
  },
};
