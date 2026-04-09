import { useEffect, useState } from "react";
import { toast } from "sonner";
import AppShell from "@/components/AppShell";
import LoadingScreen from "@/components/LoadingScreen";
import MetricCard from "@/components/MetricCard";
import { applicationService } from "@/services/applicationService";
import { jobService } from "@/services/jobService";
import { resumeService } from "@/services/resumeService";
import type { Application, Job, Resume } from "@/types";

const StudentDashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [resume, setResume] = useState<Resume | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const [resumeData, appData, jobData] = await Promise.all([
          resumeService.getMine(),
          applicationService.getStudentApplications(),
          jobService.getMatchedJobs(),
        ]);
        setResume(resumeData);
        setApplications(appData);
        setJobs(jobData);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Unable to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  if (loading) {
    return <LoadingScreen label="Loading student dashboard..." />;
  }

  return (
    <AppShell
      title="Student Dashboard"
      subtitle="Track resume readiness, discover matched jobs, and monitor how your applications are moving."
    >
      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard label="Extracted Skills" value={resume?.skills.length ?? 0} hint="Detected from your uploaded resume." />
        <MetricCard label="Matched Jobs" value={jobs.length} hint="Only relevant jobs are shown." />
        <MetricCard label="Applications" value={applications.length} hint="Your current job applications." />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-[2rem] bg-white p-6 shadow-card">
          <h3 className="text-xl font-semibold text-slate-900">Top skills from your resume</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {resume?.skills.length ? (
              resume.skills.map((skill) => (
                <span key={skill} className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-sm text-slate-500">No supported skills have been extracted from your resume yet.</p>
            )}
          </div>
        </div>

        <div className="rounded-[2rem] bg-white p-6 shadow-card">
          <h3 className="text-xl font-semibold text-slate-900">Recent matched roles</h3>
          <div className="mt-4 space-y-3">
            {jobs.length ? (
              jobs.slice(0, 4).map((job) => (
                <div key={job.id} className="rounded-2xl border border-slate-100 p-4">
                  <p className="font-semibold text-slate-900">{job.title}</p>
                  <p className="text-sm text-slate-500">{job.employerName} ? Match score {job.matchScore}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">No matched jobs yet. Ask an employer to post roles with overlapping skills.</p>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default StudentDashboardPage;
