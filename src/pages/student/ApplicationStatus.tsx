import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import DashboardLayout from '@/components/DashboardLayout';
import StatusBadge from '@/components/StatusBadge';

const ApplicationStatus = () => {
  const { user } = useAuth();
  const { applications } = useData();
const { removeApplication } = useData();
  const myApps = applications.filter(a => a.studentId === user?.id);

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <h1 className="text-2xl font-display font-bold text-foreground">My Applications</h1>
        <p className="text-muted-foreground text-sm mt-1">Track your application progress</p>

        <div className="mt-6 bg-card rounded-lg border border-border shadow-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-3 font-medium text-muted-foreground">Job Title</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Company</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Applied Date</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Interview</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Action</th><td className="p-3"><button onClick={() => removeApplication(app.id)}>Remove</button></td></tr>
            </thead>
            <tbody>
              {myApps.map(app => (
                <tr key={app.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                  <td className="p-3 font-medium text-foreground">{app.jobTitle}</td>
                  <td className="p-3 text-muted-foreground">{app.company}</td>
                  <td className="p-3 text-muted-foreground">{app.appliedDate}</td>
                  <td className="p-3 text-muted-foreground">{app.interviewDate || '—'}</td>
                  <td className="p-3"><StatusBadge status={app.status} /></td>
                <td className="p-3"><button onClick={() => removeApplication(app.id)}>Remove</button></td></tr>
              ))}
              {myApps.length === 0 && (
                <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">No applications yet.</td><td className="p-3"><button onClick={() => removeApplication(app.id)}>Remove</button></td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ApplicationStatus;
