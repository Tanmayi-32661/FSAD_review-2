import { api, normalizeCollection } from "@/api/api";
import type { Job, JobFormValues } from "@/types";

export const jobService = {
  async getMatchedJobs(): Promise<Job[]> {
    const { data } = await api.get("/jobs/matched");
    return normalizeCollection(data);
  },

  async getEmployerJobs(): Promise<Job[]> {
    const { data } = await api.get("/jobs");
    return normalizeCollection(data);
  },

  async createJob(values: JobFormValues): Promise<Job> {
    const { data } = await api.post("/jobs", values);
    return data;
  },

  async updateJob(jobId: number, values: JobFormValues): Promise<Job> {
    const { data } = await api.put(`/jobs/${jobId}`, values);
    return data;
  },

  async deleteJob(jobId: number): Promise<void> {
    await api.delete(`/jobs/${jobId}`);
  },
};
