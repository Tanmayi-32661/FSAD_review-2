import { api, normalizeCollection } from "@/api/api";
import type { Application, Interaction, ReportSummary } from "@/types";

export const officerService = {
  async getSummary(): Promise<ReportSummary> {
    const { data } = await api.get("/officer/reports/summary");
    return data;
  },

  async getPlacements(): Promise<Application[]> {
    const { data } = await api.get("/officer/reports/placements");
    return normalizeCollection(data);
  },

  async getInteractions(): Promise<Interaction[]> {
    const { data } = await api.get("/officer/interactions");
    return normalizeCollection(data);
  },

  async createInteraction(payload: {
    title: string;
    description: string;
    status: Interaction["status"];
    interactionDate: string;
    studentId?: number;
    employerId?: number;
  }): Promise<Interaction> {
    const { data } = await api.post("/officer/interactions", payload);
    return data;
  },

  async deleteInteraction(interactionId: number): Promise<void> {
    await api.delete(`/officer/interactions/${interactionId}`);
  },

  async getAdminOverview(): Promise<ReportSummary> {
    const { data } = await api.get("/admin/overview");
    return data;
  },
};
