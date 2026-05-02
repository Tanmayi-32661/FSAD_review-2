import { api, normalizeCollection, normalizeSingleUser } from "@/api/api";
import type { ProfileFormValues, Role, User } from "@/types";

export const userService = {
  async getMe(): Promise<User> {
    const { data } = await api.get("/users/me");
    return normalizeSingleUser(data);
  },

  async updateMe(values: ProfileFormValues): Promise<User> {
    const { data } = await api.put("/users/me", values);
    return normalizeSingleUser(data);
  },

  async getAllUsers(): Promise<User[]> {
    const { data } = await api.get("/officer/users");
    return normalizeCollection(data.map(normalizeSingleUser));
  },

  async updateUserRole(userId: number, role: Role): Promise<User> {
    const { data } = await api.patch(`/officer/users/${userId}/role`, {
      role: role.toUpperCase(),
    });
    return normalizeSingleUser(data);
  },

  async deleteUser(userId: number): Promise<void> {
    await api.delete(`/officer/users/${userId}`);
  },
};
