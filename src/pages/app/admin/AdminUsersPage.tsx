import { useEffect, useState } from "react";
import { toast } from "sonner";
import AppShell from "@/components/AppShell";
import { userService } from "@/services/userService";
import type { Role, User } from "@/types";

const AdminUsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  const load = async () => {
    setUsers(await userService.getAllUsers());
  };

  useEffect(() => {
    void load();
  }, []);

  const updateRole = async (userId: number, role: Role) => {
    try {
      await userService.updateUserRole(userId, role);
      toast.success("Role updated");
      await load();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Role update failed");
    }
  };

  return (
    <AppShell title="Manage Users" subtitle="Admins can review users, update roles, and remove accounts.">
      <div className="overflow-hidden rounded-[2rem] bg-white shadow-card">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Resume</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t border-slate-100">
                <td className="px-6 py-4 font-medium text-slate-900">{user.name}</td>
                <td className="px-6 py-4 text-slate-600">{user.email}</td>
                <td className="px-6 py-4">
                  <select className="rounded-xl border border-slate-200 px-3 py-2" value={user.role} onChange={(e) => updateRole(user.id, e.target.value as Role)}>
                    <option value="student">student</option>
                    <option value="employer">employer</option>
                    <option value="officer">officer</option>
                    <option value="admin">admin</option>
                  </select>
                </td>
                <td className="px-6 py-4 text-slate-600">{user.resumeUploaded ? "Uploaded" : "Missing"}</td>
                <td className="px-6 py-4">
                  <button
                    className="rounded-xl bg-rose-100 px-3 py-2 text-rose-700"
                    onClick={async () => {
                      try {
                        await userService.deleteUser(user.id);
                        toast.success("User deleted");
                        await load();
                      } catch (error) {
                        toast.error(error instanceof Error ? error.message : "Unable to delete user");
                      }
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
};

export default AdminUsersPage;
