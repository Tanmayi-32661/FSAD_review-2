import { api } from "@/api/api";
import { storage } from "@/services/storage";
import type { Resume } from "@/types";

const API_BASE_URL = "http://localhost:8082/api";

const readErrorMessage = async (response: Response) => {
  try {
    const data = await response.json();
    return data.message || data.error || response.statusText || "Upload failed";
  } catch {
    return response.statusText || "Upload failed";
  }
};

export const resumeService = {
  async getMine(): Promise<Resume> {
    const { data } = await api.get("/resumes/me");
    return data;
  },

  async upload(file: File): Promise<Resume> {
    const formData = new FormData();
    formData.append("file", file);

    const token = storage.getToken();
    const response = await fetch(`${API_BASE_URL}/resumes/me`, {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      body: formData,
    });

    if (!response.ok) {
      throw new Error(await readErrorMessage(response));
    }

    return response.json();
  },

  async deleteMine(): Promise<void> {
    await api.delete("/resumes/me");
  },
};
