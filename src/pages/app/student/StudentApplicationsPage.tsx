import { useEffect, useState } from "react";
import { toast } from "sonner";
import AppShell from "@/components/AppShell";
import AppStatusBadge from "@/components/AppStatusBadge";
import { Button } from "@/components/ui/button";
import { applicationService } from "@/services/applicationService";
import type { Application } from "@/types";

const StudentApplicationsPage = () => {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        setApplications(await applicationService.getStudentApplications());
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Unable to load applications");
      }
    };
    void load();
  }, []);

  const withdraw = async (applicationId: number) => {
    try {
      await applicationService.withdraw(applicationId);
      setApplications((current) => current.filter((application) => application.id !== applicationId));
      toast.success("Application withdrawn");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Withdraw failed");
    }
  };

  return (
    <AppShell title="Application Tracker" subtitle="Monitor each application and withdraw if your plans change.">
      {applications.length === 0 ? (
        <div className="mb-6 rounded-[2rem] bg-white p-8 shadow-card">
          <h3 className="text-2xl font-semibold text-slate-900">No applications yet</h3>
          <p className="mt-3 text-slate-600">
            Once you apply to a matched job, it will appear here together with its current placement status.
          </p>
        </div>
      ) : null}

      <div className="overflow-hidden rounded-[2rem] bg-white shadow-card">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Company</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Applied</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr key={application.id} className="border-t border-slate-100">
                <td className="px-6 py-4 font-medium text-slate-900">{application.jobTitle}</td>
                <td className="px-6 py-4 text-slate-600">{application.company}</td>
                <td className="px-6 py-4"><AppStatusBadge status={application.status} /></td>
                <td className="px-6 py-4 text-slate-600">{new Date(application.appliedAt).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <Button
                    variant="outline"
                    className="rounded-2xl"
                    disabled={application.status === "SELECTED"}
                    onClick={() => withdraw(application.id)}
                  >
                    Withdraw
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
};

export default StudentApplicationsPage;
