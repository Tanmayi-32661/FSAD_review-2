import { useData } from '@/context/DataContext';
import { mockUsers } from '@/data/mockData';
import DashboardLayout from '@/components/DashboardLayout';
import StatsCard from '@/components/StatsCard';
import { Users, Briefcase, FileText, Shield } from 'lucide-react';

const AdminDashboard = () => {
  const { jobs, applications } = useData();

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <h1 className="text-2xl font-display font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">System overview and management</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <StatsCard title="Total Users" value={mockUsers.length} icon={Users} variant="primary" />
          <StatsCard title="Active Jobs" value={jobs.length} icon={Briefcase} />
          <StatsCard title="Applications" value={applications.length} icon={FileText} variant="warning" />
          <StatsCard title="Active Roles" value={4} icon={Shield} variant="success" />
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mt-8">
          <div className="bg-card rounded-lg border border-border shadow-card p-5">
            <h3 className="font-display font-semibold text-foreground mb-4">Users by Role</h3>
            <div className="space-y-3">
              {['student', 'employer', 'officer', 'admin'].map(role => {
                const count = mockUsers.filter(u => u.role === role).length;
                const pct = (count / mockUsers.length) * 100;
                return (
                  <div key={role} className="flex items-center gap-3">
                    <span className="text-sm capitalize text-foreground w-24">{role}</span>
                    <div className="flex-1 bg-muted rounded-full h-2.5">
                      <div className="bg-secondary h-2.5 rounded-full transition-all" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-sm text-muted-foreground w-8">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-card rounded-lg border border-border shadow-card p-5">
            <h3 className="font-display font-semibold text-foreground mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {applications.slice(0, 5).map(app => (
                <div key={app.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="text-sm font-medium text-foreground">{app.studentName}</p>
                    <p className="text-xs text-muted-foreground">Applied to {app.jobTitle}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{app.appliedDate}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
