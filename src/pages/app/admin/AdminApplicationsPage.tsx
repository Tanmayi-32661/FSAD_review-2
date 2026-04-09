import { useEffect, useState } from "react";
import { toast } from "sonner";
import AppShell from "@/components/AppShell";
import AppStatusBadge from "@/components/AppStatusBadge";
import { applicationService } from "@/services/applicationService";
import type { Application } from "@/types";

const AdminApplicationsPage = () => {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        setApplications(await applicationService.getAllApplications());
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Unable to load applications");
      }
    };
    void load();
  }, []);

  return (
    <AppShell title="All Applications" subtitle="Admins can inspect the full application dataset across the platform.">
      {applications.length === 0 ? (
        <div className="mb-6 rounded-[2rem] bg-white p-8 shadow-card">
          <h3 className="text-2xl font-semibold text-slate-900">No applications recorded</h3>
          <p className="mt-3 text-slate-600">
            Applications will appear here after students begin applying to posted jobs.
          </p>
        </div>
      ) : null}

      <div className="overflow-hidden rounded-[2rem] bg-white shadow-card">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-6 py-4">Student</th>
              <th className="px-6 py-4">Job</th>
              <th className="px-6 py-4">Company</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr key={application.id} className="border-t border-slate-100">
                <td className="px-6 py-4 font-medium text-slate-900">{application.studentName}</td>
                <td className="px-6 py-4 text-slate-600">{application.jobTitle}</td>
                <td className="px-6 py-4 text-slate-600">{application.company}</td>
                <td className="px-6 py-4"><AppStatusBadge status={application.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
};

export default AdminApplicationsPage;
