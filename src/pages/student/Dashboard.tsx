import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import DashboardLayout from '@/components/DashboardLayout';
import StatsCard from '@/components/StatsCard';
import StatusBadge from '@/components/StatusBadge';
import { Briefcase, FileText, CheckCircle2, Clock, Gift, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
  const { user } = useAuth();
  const { applications, jobs, getRecommendedJobs } = useData();

  const myApps = applications.filter(a => a.studentId === user?.id);
  const shortlisted = myApps.filter(a => a.status === 'shortlisted').length;
  const selected = myApps.filter(a => a.status === 'selected').length;
  const offers = myApps.filter(a => a.status === 'offered').length;
  const upcoming = myApps.filter(a => a.interviewDate && a.status === 'shortlisted');
  const recommended = user ? getRecommendedJobs(user) : [];

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <h1 className="text-2xl font-display font-bold text-foreground">Welcome, {user?.name}</h1>
        <p className="text-muted-foreground text-sm mt-1">Here's your placement overview</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-6">
          <StatsCard title="Available Jobs" value={jobs.length} icon={Briefcase} variant="primary" />
          <StatsCard title="Applications" value={myApps.length} icon={FileText} />
          <StatsCard title="Shortlisted" value={shortlisted} icon={Clock} variant="warning" />
          <StatsCard title="Selected" value={selected} icon={CheckCircle2} variant="success" />
          <StatsCard title="Offers" value={offers} icon={Gift} variant="secondary" />
        </div>

        {/* Recommended Jobs Preview */}
        {recommended.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-secondary" />
                <h2 className="text-lg font-display font-semibold text-foreground">Recommended for You</h2>
              </div>
              <Link to="/student/recommended" className="text-sm text-secondary hover:underline">View all</Link>
            </div>
            <div className="grid gap-3">
              {recommended.slice(0, 3).map(({ job, matchPercent }) => (
                <div key={job.id} className="p-4 bg-card rounded-lg border border-border shadow-card flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{job.title}</p>
                    <p className="text-sm text-muted-foreground">{job.company} · {job.package}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                    matchPercent >= 80 ? 'bg-success/15 text-success' :
                    matchPercent >= 50 ? 'bg-warning/15 text-warning' : 'bg-info/15 text-info'
                  }`}>{matchPercent}% match</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Interviews */}
        {upcoming.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-display font-semibold text-foreground mb-4">Upcoming Interviews</h2>
            <div className="grid gap-3">
              {upcoming.map(app => (
                <div key={app.id} className="p-4 bg-card rounded-lg border border-border shadow-card flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{app.jobTitle}</p>
                    <p className="text-sm text-muted-foreground">{app.company}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-secondary">{app.interviewDate}</p>
                    <StatusBadge status={app.status} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Applications */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-display font-semibold text-foreground">Recent Applications</h2>
            <Link to="/student/applications" className="text-sm text-secondary hover:underline">View all</Link>
          </div>
          <div className="bg-card rounded-lg border border-border shadow-card overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-3 font-medium text-muted-foreground">Job</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Company</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Date</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {myApps.slice(0, 5).map(app => (
                  <tr key={app.id} className="border-t border-border">
                    <td className="p-3 font-medium text-foreground">{app.jobTitle}</td>
                    <td className="p-3 text-muted-foreground">{app.company}</td>
                    <td className="p-3 text-muted-foreground">{app.appliedDate}</td>
                    <td className="p-3"><StatusBadge status={app.status} /></td>
                  </tr>
                ))}
                {myApps.length === 0 && (
                  <tr><td colSpan={4} className="p-6 text-center text-muted-foreground">No applications yet. <Link to="/student/jobs" className="text-secondary hover:underline">Browse jobs</Link></td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
