import { api, normalizeAuthPayload, normalizeSingleUser } from "@/api/api";
import type { AuthPayload, CaptchaChallenge, Role, User } from "@/types";

export const authService = {
  async getCaptcha(): Promise<CaptchaChallenge> {
    const { data } = await api.get("/auth/captcha");
    return data;
  },

  async login(email: string, password: string, captchaToken: string, captchaAnswer: string): Promise<AuthPayload> {
    const { data } = await api.post("/auth/login", { email, password, captchaToken, captchaAnswer });
    return normalizeAuthPayload(data);
  },

  async register(payload: {
    name: string;
    email: string;
    password: string;
    role: Role;
    captchaToken: string;
    captchaAnswer: string;
  }): Promise<AuthPayload> {
    const { data } = await api.post("/auth/register", {
      ...payload,
      role: payload.role.toUpperCase(),
    });
    return normalizeAuthPayload(data);
  },

  async me(): Promise<User> {
    const { data } = await api.get("/auth/me");
    return normalizeSingleUser(data);
  },
};
