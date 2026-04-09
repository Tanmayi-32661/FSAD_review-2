import { useEffect, useState } from "react";
import { toast } from "sonner";
import AppShell from "@/components/AppShell";
import MetricCard from "@/components/MetricCard";
import { applicationService } from "@/services/applicationService";
import { jobService } from "@/services/jobService";
import type { Application, Job } from "@/types";

const EmployerDashboardPage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const [jobData, applicationData] = await Promise.all([
          jobService.getEmployerJobs(),
          applicationService.getEmployerApplications(),
        ]);
        setJobs(jobData);
        setApplications(applicationData);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Unable to load employer dashboard");
      }
    };
    void load();
  }, []);

  return (
    <AppShell
      title="Employer Dashboard"
      subtitle="Post roles, review applicant pipelines, and update placement decisions from one place."
    >
      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard label="Open Jobs" value={jobs.length} hint="Jobs you have posted." />
        <MetricCard label="Applicants" value={applications.length} hint="Total applications across your roles." />
        <MetricCard label="Selected" value={applications.filter((item) => item.status === "SELECTED").length} hint="Candidates marked selected." />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-[2rem] bg-white p-6 shadow-card">
          <h3 className="text-xl font-semibold text-slate-900">Recent jobs</h3>
          <div className="mt-4 space-y-3">
            {jobs.length ? (
              jobs.slice(0, 4).map((job) => (
                <div key={job.id} className="rounded-2xl border border-slate-100 p-4">
                  <p className="font-semibold text-slate-900">{job.title}</p>
                  <p className="text-sm text-slate-500">{job.location} • {job.employmentType}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">No jobs posted yet. Create one to start receiving applications.</p>
            )}
          </div>
        </div>

        <div className="rounded-[2rem] bg-white p-6 shadow-card">
          <h3 className="text-xl font-semibold text-slate-900">Recent applicants</h3>
          <div className="mt-4 space-y-3">
            {applications.length ? (
              applications.slice(0, 4).map((application) => (
                <div key={application.id} className="rounded-2xl border border-slate-100 p-4">
                  <p className="font-semibold text-slate-900">{application.studentName}</p>
                  <p className="text-sm text-slate-500">{application.jobTitle} • {application.status}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">No applications yet. Applicants will appear here once students apply.</p>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default EmployerDashboardPage;

