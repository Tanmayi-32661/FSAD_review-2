import { api, normalizeCollection } from "@/api/api";
import type { Application } from "@/types";

export const applicationService = {
  async apply(jobId: number): Promise<Application> {
    const { data } = await api.post("/applications", { jobId });
    return data;
  },

  async getStudentApplications(): Promise<Application[]> {
    const { data } = await api.get("/applications/me");
    return normalizeCollection(data);
  },

  async withdraw(applicationId: number): Promise<void> {
    await api.delete(`/applications/${applicationId}`);
  },

  async getEmployerApplications(): Promise<Application[]> {
    const { data } = await api.get("/applications/employer");
    return normalizeCollection(data);
  },

  async updateStatus(applicationId: number, status: Application["status"]): Promise<Application> {
    const { data } = await api.patch(`/applications/${applicationId}/status`, { status });
    return data;
  },

  async getAllApplications(): Promise<Application[]> {
    const { data } = await api.get("/applications");
    return normalizeCollection(data);
  },
};
