import { useEffect, useState } from "react";
import AppShell from "@/components/AppShell";
import AppStatusBadge from "@/components/AppStatusBadge";
import MetricCard from "@/components/MetricCard";
import { officerService } from "@/services/officerService";
import type { Application, ReportSummary } from "@/types";

const OfficerDashboardPage = () => {
  const [summary, setSummary] = useState<ReportSummary | null>(null);
  const [placements, setPlacements] = useState<Application[]>([]);

  useEffect(() => {
    const load = async () => {
      const [summaryData, placementData] = await Promise.all([
        officerService.getSummary(),
        officerService.getPlacements(),
      ]);
      setSummary(summaryData);
      setPlacements(placementData);
    };
    void load();
  }, []);

  return (
    <AppShell title="Officer Dashboard" subtitle="Placement officers can review reports, track selected students, and manage interactions.">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <MetricCard label="Students" value={summary?.totalStudents ?? 0} hint="Registered students in the system." />
        <MetricCard label="Students Applied" value={summary?.studentsApplied ?? 0} hint="University students who submitted at least one application." />
        <MetricCard label="Students Placed" value={summary?.studentsPlaced ?? 0} hint="University students who got selected for at least one job." />
        <MetricCard label="Placements" value={summary?.selectedCount ?? 0} hint="Applications marked selected." />
        <MetricCard label="Resumes" value={summary?.resumesUploaded ?? 0} hint="Students who uploaded resumes." />
      </div>

      <div className="mt-6 rounded-[2rem] bg-white p-6 shadow-card">
        <h3 className="text-xl font-semibold text-slate-900">Latest placements</h3>
        <div className="mt-4 space-y-3">
          {placements.slice(0, 5).map((placement) => (
            <div key={placement.id} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
              <div>
                <p className="font-semibold text-slate-900">{placement.studentName}</p>
                <p className="text-sm text-slate-500">{placement.company} • {placement.jobTitle}</p>
              </div>
              <AppStatusBadge status={placement.status} />
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
};

export default OfficerDashboardPage;
