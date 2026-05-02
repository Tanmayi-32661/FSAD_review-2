// 📂 src/api/api.ts

import axios from "axios";
import { storage } from "@/services/storage";

const API_BASE_URL = "http://localhost:8082/api";
const BASE_URL = "http://localhost:8082";

const getHeaders = () => {
  const token = storage.getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

// ✅ Headers helper
export const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = storage.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      storage.clearAll();
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Something went wrong";

    return Promise.reject(new Error(message));
  }
);

const normalizeRole = (role: string) => role.toLowerCase();

const normalizeUser = (user: any) => ({
  ...user,
  role: normalizeRole(user.role),
});

export const normalizeAuthPayload = (payload: any) => ({
  token: payload.token,
  sessionExpiresAt: payload.sessionExpiresAt,
  user: normalizeUser(payload.user),
});

export const normalizeCollection = <T>(items: T[]) => items;
export const normalizeSingleUser = normalizeUser;

export const API = {

  getJobs: async () => {
    const res = await fetch(`${BASE_URL}/jobs`);
    if (!res.ok) throw new Error("Failed to fetch jobs");
    return res.json();
  },

  getApplications: async () => {
    const res = await fetch(`${BASE_URL}/applications`, {
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error("Failed to fetch applications");
    return res.json();
  },

  // ================= AUTH =================
  login: async (data: any) => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Login failed");

    return res.json(); // { token, user }
  },

  register: async (data: any) => {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Register failed");

    return res.json();
  },

  // ================= APPLICATION =================
  apply: async (data: any) => {
    const res = await fetch(`${BASE_URL}/apply`, { // ✅ FIXED endpoint
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Apply failed");

    return res.json();
  },

  deleteApplication: async (id: number) => {
    const res = await fetch(`${BASE_URL}/apply/${id}`, { // ✅ FIXED endpoint
      method: "DELETE",
      headers: getHeaders(),
    });

    if (!res.ok) throw new Error("Delete failed");
  },

  // ================= RESUME =================
  uploadResume: async (id: number, file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const token = storage.getToken();

    const headers: any = {};
    if (token) {
      headers["Authorization"] = "Bearer " + token;
    }

    const res = await fetch(`${BASE_URL}/upload/${id}`, {
      method: "POST",
      headers,
      body: formData,
    });

    if (!res.ok) throw new Error("Upload failed");

    return res.text();
  },
};
