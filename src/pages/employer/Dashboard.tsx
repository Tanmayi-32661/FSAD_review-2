import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import DashboardLayout from '@/components/DashboardLayout';
import StatsCard from '@/components/StatsCard';
import { Briefcase, Users, CheckCircle2, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const EmployerDashboard = () => {
  const { user } = useAuth();
  const { jobs, applications } = useData();

  const myJobs = jobs.filter(j => j.employerId === user?.id);
  const myJobIds = myJobs.map(j => j.id);
  const myApps = applications.filter(a => myJobIds.includes(a.jobId));
  const shortlisted = myApps.filter(a => a.status === 'shortlisted').length;
  const selected = myApps.filter(a => a.status === 'selected').length;

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <h1 className="text-2xl font-display font-bold text-foreground">Employer Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage your job listings and applications</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <StatsCard title="Posted Jobs" value={myJobs.length} icon={Briefcase} variant="primary" />
          <StatsCard title="Total Applications" value={myApps.length} icon={FileText} />
          <StatsCard title="Shortlisted" value={shortlisted} icon={Users} variant="warning" />
          <StatsCard title="Selected" value={selected} icon={CheckCircle2} variant="success" />
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-display font-semibold text-foreground">Your Job Listings</h2>
            <Link to="/employer/post-job" className="text-sm text-secondary hover:underline">Post new job</Link>
          </div>
          <div className="grid gap-3">
            {myJobs.map(job => (
              <div key={job.id} className="p-4 bg-card rounded-lg border border-border shadow-card flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">{job.title}</p>
                  <p className="text-sm text-muted-foreground">{job.location} · {job.package} · {job.openings} openings</p>
                </div>
                <span className="text-sm text-muted-foreground">{applications.filter(a => a.jobId === job.id).length} applicants</span>
              </div>
            ))}
            {myJobs.length === 0 && (
              <p className="text-muted-foreground text-center py-8">No jobs posted yet. <Link to="/employer/post-job" className="text-secondary hover:underline">Post one now</Link></p>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EmployerDashboard;
