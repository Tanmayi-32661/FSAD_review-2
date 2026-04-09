import { useEffect, useState } from "react";
import { toast } from "sonner";
import AppShell from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { applicationService } from "@/services/applicationService";
import { jobService } from "@/services/jobService";
import { resumeService } from "@/services/resumeService";
import type { Application, Job, Resume } from "@/types";

const StudentJobsPage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [resume, setResume] = useState<Resume | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [jobData, applicationData, resumeData] = await Promise.all([
          jobService.getMatchedJobs(),
          applicationService.getStudentApplications(),
          resumeService.getMine(),
        ]);
        setJobs(jobData);
        setApplications(applicationData);
        setResume(resumeData);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Unable to load matched jobs");
      }
    };
    void load();
  }, []);

  const appliedJobIds = new Set(applications.map((application) => application.jobId));

  const apply = async (jobId: number) => {
    try {
      const created = await applicationService.apply(jobId);
      setApplications((current) => [created, ...current]);
      toast.success("Application submitted");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Application failed");
    }
  };

  return (
    <AppShell
      title="Matched Jobs"
      subtitle="Only jobs relevant to extracted resume skills are shown here."
    >
      <div className="grid gap-4">
        {jobs.length === 0 ? (
          <div className="rounded-[2rem] bg-white p-8 shadow-card">
            <h3 className="text-2xl font-semibold text-slate-900">No matched jobs yet</h3>
            <p className="mt-3 max-w-3xl text-slate-600">
              Your resume upload worked, but the system only shows jobs that share at least one extracted skill.
              This usually means either no employer has posted jobs yet, or the posted jobs do not overlap with your
              detected skills.
            </p>

            <div className="mt-6 rounded-[1.5rem] bg-slate-50 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Extracted Resume Skills</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {resume?.skills.length ? (
                  resume.skills.map((skill) => (
                    <span key={skill} className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-slate-500">No supported skills were detected from the uploaded resume.</p>
                )}
              </div>
            </div>

            <div className="mt-6 rounded-[1.5rem] border border-dashed border-slate-200 p-5 text-sm text-slate-600">
              Ask an employer or admin to create jobs whose required skills overlap with the skills above, for example
              `java`, `react`, `mysql`, or `python`.
            </div>
          </div>
        ) : null}

        {jobs.map((job) => (
          <div key={job.id} className="rounded-[2rem] bg-white p-6 shadow-card">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-slate-900">{job.title}</h3>
                <p className="mt-1 text-slate-500">{job.employerName} • {job.location} • {job.employmentType}</p>
                <p className="mt-4 text-slate-700">{job.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {job.skillsRequired.map((skill) => (
                    <span key={skill} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">{skill}</span>
                  ))}
                </div>
              </div>
              <div className="min-w-48 rounded-[1.5rem] bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Match score</p>
                <p className="text-3xl font-bold text-emerald-600">{job.matchScore}</p>
                <p className="mt-3 text-sm text-slate-500">Package {job.packageOffered}</p>
                <Button
                  className="mt-4 w-full rounded-2xl bg-slate-950 hover:bg-slate-800"
                  disabled={appliedJobIds.has(job.id)}
                  onClick={() => apply(job.id)}
                >
                  {appliedJobIds.has(job.id) ? "Applied" : "Apply Now"}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
};

export default StudentJobsPage;

