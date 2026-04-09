import { useEffect, useState } from "react";
import { toast } from "sonner";
import AppShell from "@/components/AppShell";
import AppStatusBadge from "@/components/AppStatusBadge";
import { applicationService } from "@/services/applicationService";
import type { Application } from "@/types";

const EmployerApplicationsPage = () => {
  const [applications, setApplications] = useState<Application[]>([]);

  const load = async () => {
    setApplications(await applicationService.getEmployerApplications());
  };

  useEffect(() => {
    void load();
  }, []);

  const updateStatus = async (applicationId: number, status: Application["status"]) => {
    try {
      await applicationService.updateStatus(applicationId, status);
      toast.success("Status updated");
      await load();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Status update failed");
    }
  };

  return (
    <AppShell title="Applicants" subtitle="Review applicant progress and update selection decisions.">
      <div className="overflow-hidden rounded-[2rem] bg-white shadow-card">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-6 py-4">Student</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Update</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr key={application.id} className="border-t border-slate-100">
                <td className="px-6 py-4 font-medium text-slate-900">{application.studentName}</td>
                <td className="px-6 py-4 text-slate-600">{application.jobTitle}</td>
                <td className="px-6 py-4"><AppStatusBadge status={application.status} /></td>
                <td className="px-6 py-4">
                  <select
                    className="rounded-xl border border-slate-200 px-3 py-2"
                    value={application.status}
                    onChange={(e) => updateStatus(application.id, e.target.value as Application["status"])}
                  >
                    <option value="APPLIED">Applied</option>
                    <option value="SHORTLISTED">Shortlisted</option>
                    <option value="REJECTED">Rejected</option>
                    <option value="SELECTED">Selected</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
};

export default EmployerApplicationsPage;
