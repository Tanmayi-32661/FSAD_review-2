import { useEffect, useState } from "react";
import AppShell from "@/components/AppShell";
import AppStatusBadge from "@/components/AppStatusBadge";
import MetricCard from "@/components/MetricCard";
import { applicationService } from "@/services/applicationService";
import { officerService } from "@/services/officerService";
import type { Application, ReportSummary } from "@/types";

const OfficerDashboardPage = () => {
  const [summary, setSummary] = useState<ReportSummary | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    const load = async () => {
      const [summaryData, applicationData] = await Promise.all([
        officerService.getSummary(),
        applicationService.getAllApplications(),
      ]);
      setSummary(summaryData);
      setApplications(applicationData);
    };
    void load();
  }, []);

  return (
    <AppShell title="Officer Dashboard" subtitle="Review all student application statuses and manage meetings.">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <MetricCard label="Students" value={summary?.totalStudents ?? 0} hint="Registered students in the system." />
        <MetricCard label="Students Applied" value={summary?.studentsApplied ?? 0} hint="Students who submitted at least one application." />
        <MetricCard label="Students Placed" value={summary?.studentsPlaced ?? 0} hint="Students selected for at least one job." />
        <MetricCard label="Selected" value={summary?.selectedCount ?? 0} hint="Applications marked selected." />
        <MetricCard label="Rejected" value={summary?.rejectedCount ?? 0} hint="Applications marked rejected." />
      </div>

      <div className="mt-6 rounded-[2rem] bg-white p-6 shadow-card">
        <h3 className="text-xl font-semibold text-slate-900">Latest student applications</h3>
        <div className="mt-4 space-y-3">
          {applications.slice(0, 5).map((application) => (
            <div key={application.id} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
              <div>
                <p className="font-semibold text-slate-900">{application.studentName}</p>
                <p className="text-sm text-slate-500">{application.company} - {application.jobTitle}</p>
              </div>
              <AppStatusBadge status={String(application.status)} />
            </div>
          ))}
          {applications.length === 0 ? <p className="text-sm text-slate-500">No student applications yet.</p> : null}
        </div>
      </div>
    </AppShell>
  );
};

export default OfficerDashboardPage;
