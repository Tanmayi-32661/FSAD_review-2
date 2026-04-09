import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import DashboardLayout from '@/components/DashboardLayout';
import { Search, MapPin, Clock, Briefcase } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const BrowseJobs = () => {
  const { user } = useAuth();
  const { jobs, applications, applyForJob } = useData();
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  const filtered = jobs.filter(j => {
    const matchSearch = j.title.toLowerCase().includes(search.toLowerCase()) || j.company.toLowerCase().includes(search.toLowerCase()) || j.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchLocation = !locationFilter || j.location.toLowerCase().includes(locationFilter.toLowerCase());
    return matchSearch && matchLocation;
  });

  const hasApplied = (jobId: string) => applications.some(a => a.studentId === user?.id && a.jobId === jobId);

  const handleApply = (job: typeof jobs[0]) => {
    if (!user) return;
    const success = applyForJob(user.id, user.name, job);
    if (success) {
      toast({ title: 'Applied!', description: `You applied to ${job.title} at ${job.company}` });
    } else {
      toast({ title: 'Already applied', description: 'You have already applied to this job', variant: 'destructive' });
    }
  };

  
if (!user?.resumeUrl) {
  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <h2 className="text-2xl font-bold text-foreground">
          Upload Resume to Unlock Jobs 🔒
        </h2>
        <p className="text-muted-foreground mt-2">
          You must upload your resume before browsing jobs.
        </p>
        <Button className="mt-4" onClick={() => window.location.href = "/student/profile"}>
          Upload Resume
        </Button>
      </div>
    </DashboardLayout>
  );
}
return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <h1 className="text-2xl font-display font-bold text-foreground">Browse Jobs</h1>
        <p className="text-muted-foreground text-sm mt-1">Find your next opportunity</p>

        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by title, company, or skill..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
          </div>
          <div className="relative w-full sm:w-48">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Location" value={locationFilter} onChange={e => setLocationFilter(e.target.value)} className="pl-10" />
          </div>
        </div>

        <div className="mt-6 grid gap-4">
          {filtered.map(job => (
            <div key={job.id} className="p-5 bg-card rounded-lg border border-border shadow-card hover:shadow-elevated transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-display font-semibold text-lg text-foreground">{job.title}</h3>
                  <p className="text-secondary font-medium text-sm">{job.company}</p>
                  <p className="text-muted-foreground text-sm mt-2 line-clamp-2">{job.description}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {job.skills.map(s => (
                      <span key={s} className="px-2 py-0.5 rounded-md bg-accent text-accent-foreground text-xs font-medium">{s}</span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-4 mt-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{job.location}</span>
                    <span className="flex items-center gap-1"><Briefcase className="h-3 w-3" />{job.type}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />Deadline: {job.deadline}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-lg font-display font-bold text-foreground">{job.package}</span>
                  <span className="text-xs text-muted-foreground">{job.openings} openings</span>
                  <Button
                    size="sm"
                    onClick={() => handleApply(job)}
                    disabled={hasApplied(job.id)}
                    className={hasApplied(job.id) ? 'bg-muted text-muted-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/90'}
                  >
                    {hasApplied(job.id) ? 'Applied' : 'Apply Now'}
                  </Button>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">No jobs found matching your criteria.</div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BrowseJobs;
