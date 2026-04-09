import { useEffect, useState } from "react";
import AppShell from "@/components/AppShell";
import AppStatusBadge from "@/components/AppStatusBadge";
import MetricCard from "@/components/MetricCard";
import { officerService } from "@/services/officerService";
import type { Application, ReportSummary } from "@/types";

const OfficerReportsPage = () => {
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
    <AppShell title="Placement Reports" subtitle="Quick placement analytics and selected student records.">
      <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
        <MetricCard label="Employers" value={summary?.totalEmployers ?? 0} hint="Participating employers." />
        <MetricCard label="Jobs" value={summary?.totalJobs ?? 0} hint="Posted jobs in the system." />
        <MetricCard label="Applications" value={summary?.totalApplications ?? 0} hint="All submitted applications." />
        <MetricCard label="Students Applied" value={summary?.studentsApplied ?? 0} hint="Students from the university who applied to jobs." />
        <MetricCard label="Students Placed" value={summary?.studentsPlaced ?? 0} hint="Students from the university who were selected." />
        <MetricCard label="Rejected" value={summary?.rejectedCount ?? 0} hint="Rejected applications tracked." />
      </div>

      <div className="mt-6 overflow-hidden rounded-[2rem] bg-white shadow-card">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-6 py-4">Student</th>
              <th className="px-6 py-4">Company</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {placements.map((placement) => (
              <tr key={placement.id} className="border-t border-slate-100">
                <td className="px-6 py-4 font-medium text-slate-900">{placement.studentName}</td>
                <td className="px-6 py-4 text-slate-600">{placement.company}</td>
                <td className="px-6 py-4 text-slate-600">{placement.jobTitle}</td>
                <td className="px-6 py-4"><AppStatusBadge status={placement.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
};

export default OfficerReportsPage;
