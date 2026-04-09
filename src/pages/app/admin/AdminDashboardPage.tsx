import { useEffect, useState } from "react";
import { toast } from "sonner";
import AppShell from "@/components/AppShell";
import MetricCard from "@/components/MetricCard";
import { officerService } from "@/services/officerService";
import type { ReportSummary } from "@/types";

const AdminDashboardPage = () => {
  const [summary, setSummary] = useState<ReportSummary | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setSummary(await officerService.getAdminOverview());
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Unable to load admin dashboard");
      }
    };
    void load();
  }, []);

  return (
    <AppShell title="Admin Dashboard" subtitle="System-wide oversight across users, placements, resumes, and applications.">
      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard label="Students" value={summary?.totalStudents ?? 0} hint="Student accounts." />
        <MetricCard label="Employers" value={summary?.totalEmployers ?? 0} hint="Employer accounts." />
        <MetricCard label="Jobs" value={summary?.totalJobs ?? 0} hint="Jobs currently in the system." />
        <MetricCard label="Applications" value={summary?.totalApplications ?? 0} hint="All recorded applications." />
      </div>

      <div className="mt-6 rounded-[2rem] bg-white p-6 shadow-card">
        <h3 className="text-xl font-semibold text-slate-900">Platform health</h3>
        <p className="mt-3 text-slate-600">
          {summary
            ? `There are currently ${summary.totalStudents} students, ${summary.totalEmployers} employers, ${summary.totalJobs} jobs, and ${summary.totalApplications} applications in the system.`
            : "Overview data will appear here once the dashboard loads successfully."}
        </p>
      </div>
    </AppShell>
  );
};

export default AdminDashboardPage;
