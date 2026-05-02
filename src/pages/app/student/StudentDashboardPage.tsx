import { useEffect, useState } from "react";
import { toast } from "sonner";
import AppShell from "@/components/AppShell";
import AppStatusBadge from "@/components/AppStatusBadge";
import { Button } from "@/components/ui/button";
import LoadingScreen from "@/components/LoadingScreen";
import MetricCard from "@/components/MetricCard";
import { applicationService } from "@/services/applicationService";
import { jobService } from "@/services/jobService";
import { officerService } from "@/services/officerService";
import { resumeService } from "@/services/resumeService";
import type { Application, Interaction, Job, Resume } from "@/types";

const StudentDashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [resume, setResume] = useState<Resume | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [meetings, setMeetings] = useState<Interaction[]>([]);

  const requestJoin = async (meetingId: number) => {
    try {
      const updated = await officerService.requestMeetingJoin(meetingId);
      setMeetings((current) => current.map((meeting) => (meeting.id === meetingId ? updated : meeting)));
      toast.success("Join request sent to placement officer");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to request meeting access");
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        const [resumeData, appData, jobData, meetingData] = await Promise.all([
          resumeService.getMine(),
          applicationService.getStudentApplications(),
          jobService.getMatchedJobs(),
          officerService.getStudentMeetings(),
        ]);
        setResume(resumeData);
        setApplications(appData);
        setJobs(jobData);
        setMeetings(meetingData);
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

      {applications.some((application) => ["SHORTLISTED", "SELECTED", "REJECTED"].includes(String(application.status))) ? (
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {applications
            .filter((application) => ["SHORTLISTED", "SELECTED", "REJECTED"].includes(String(application.status)))
            .map((application) => (
              <div key={application.id} className="rounded-[1.5rem] bg-white p-5 shadow-card">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-slate-900">{application.jobTitle}</p>
                  <AppStatusBadge status={String(application.status)} />
                </div>
                <p className="mt-2 text-sm text-slate-500">{application.company}</p>
              </div>
            ))}
        </div>
      ) : null}

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

      <div className="mt-6 rounded-[2rem] bg-white p-6 shadow-card">
        <h3 className="text-xl font-semibold text-slate-900">Meeting Notifications</h3>
        <div className="mt-4 space-y-3">
          {meetings.length ? (
            meetings.map((meeting) => (
              <div key={meeting.id} className="flex flex-col gap-4 rounded-2xl border border-emerald-100 bg-emerald-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-slate-900">{meeting.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{meeting.description}</p>
                  <p className="mt-2 text-sm font-medium text-emerald-700">{new Date(meeting.interactionDate).toLocaleString()}</p>
                </div>
                <div className="flex flex-col gap-2 sm:items-end">
                  <AppStatusBadge status={meeting.joinStatus ?? "NOT_REQUESTED"} />
                  {meeting.joinStatus === "ADMITTED" && meeting.meetingUrl ? (
                  <Button asChild className="rounded-2xl bg-slate-950 hover:bg-slate-800">
                    <a href={meeting.meetingUrl} target="_blank" rel="noreferrer">
                      Join Meeting
                    </a>
                  </Button>
                  ) : (
                    <Button
                      className="rounded-2xl bg-slate-950 hover:bg-slate-800"
                      disabled={meeting.joinStatus === "WAITING"}
                      onClick={() => requestJoin(meeting.id)}
                    >
                      {meeting.joinStatus === "WAITING" ? "Waiting for Admit" : "Request to Join"}
                    </Button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500">No scheduled placement meetings yet.</p>
          )}
        </div>
      </div>
    </AppShell>
  );
};

export default StudentDashboardPage;
