import DashboardLayout from '@/components/DashboardLayout';
import { Shield } from 'lucide-react';

const roles = [
  { name: 'Student', permissions: ['Browse jobs', 'Apply to jobs', 'View own applications', 'Update profile'], color: 'bg-info/15 text-info' },
  { name: 'Employer', permissions: ['Post jobs', 'Manage own jobs', 'View applications', 'Shortlist/Reject candidates'], color: 'bg-secondary/15 text-secondary' },
  { name: 'Placement Officer', permissions: ['View all placements', 'View reports', 'Export data', 'View analytics'], color: 'bg-warning/15 text-warning' },
  { name: 'Admin', permissions: ['Manage all users', 'Assign roles', 'System settings', 'Full access'], color: 'bg-destructive/15 text-destructive' },
];

const RoleManagement = () => {
  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <h1 className="text-2xl font-display font-bold text-foreground">Role Management</h1>
        <p className="text-muted-foreground text-sm mt-1">View and manage system roles</p>

        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          {roles.map(role => (
            <div key={role.name} className="bg-card rounded-lg border border-border shadow-card p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${role.color}`}>
                  <Shield className="h-4 w-4" />
                </div>
                <h3 className="font-display font-semibold text-foreground">{role.name}</h3>
              </div>
              <ul className="space-y-2">
                {role.permissions.map(p => (
                  <li key={p} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RoleManagement;
