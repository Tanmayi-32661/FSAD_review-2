import { api } from "@/api/api";
import type { Resume } from "@/types";

export const resumeService = {
  async getMine(): Promise<Resume> {
    const { data } = await api.get("/resumes/me");
    return data;
  },

  async upload(file: File): Promise<Resume> {
    const formData = new FormData();
    formData.append("file", file);

    const { data } = await api.post("/resumes/me", formData);
    return data;
  },

  async deleteMine(): Promise<void> {
    await api.delete("/resumes/me");
  },
};
