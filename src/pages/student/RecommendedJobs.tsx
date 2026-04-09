import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Briefcase, Clock, Sparkles, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const RecommendedJobs = () => {
  const { user } = useAuth();
  const { getRecommendedJobs, applications, applyForJob } = useData();
  const { toast } = useToast();

  if (!user) return null;

  const hasProfile = user.cgpa && user.skills && user.skills.length > 0;
  const recommended = hasProfile ? getRecommendedJobs(user) : [];
  const hasApplied = (jobId: string) => applications.some(a => a.studentId === user.id && a.jobId === jobId);

  const handleApply = (job: typeof recommended[0]['job']) => {
    const success = applyForJob(user.id, user.name, job);
    if (success) {
      toast({ title: 'Applied!', description: `You applied to ${job.title} at ${job.company}` });
    } else {
      toast({ title: 'Already applied', variant: 'destructive' });
    }
  };

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-secondary" />
          <h1 className="text-2xl font-display font-bold text-foreground">Recommended Jobs</h1>
        </div>
        <p className="text-muted-foreground text-sm mt-1">Jobs matched to your CGPA and skills</p>

        {!hasProfile && (
          <div className="mt-6 bg-warning/10 border border-warning/30 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Complete your profile first</p>
              <p className="text-xs text-muted-foreground mt-1">Add your CGPA and skills to get personalized job recommendations.</p>
              <Link to="/student/profile">
                <Button size="sm" variant="outline" className="mt-2">Update Profile</Button>
              </Link>
            </div>
          </div>
        )}

        <div className="mt-6 grid gap-4">
          {recommended.map(({ job, matchPercent }) => (
            <div key={job.id} className="p-5 bg-card rounded-lg border border-border shadow-card hover:shadow-elevated transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-semibold text-lg text-foreground">{job.title}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                      matchPercent >= 80 ? 'bg-success/15 text-success' :
                      matchPercent >= 50 ? 'bg-warning/15 text-warning' :
                      'bg-info/15 text-info'
                    }`}>
                      {matchPercent}% match
                    </span>
                  </div>
                  <p className="text-secondary font-medium text-sm">{job.company}</p>
                  <p className="text-muted-foreground text-sm mt-2 line-clamp-2">{job.description}</p>

                  {job.requiredCGPA && (
                    <p className="text-xs text-muted-foreground mt-2">Min CGPA: <span className="font-medium text-foreground">{job.requiredCGPA}</span></p>
                  )}

                  <div className="flex flex-wrap gap-2 mt-2">
                    {(job.requiredSkills || job.skills).map(s => {
                      const matched = user.skills?.some(us => us.toLowerCase() === s.toLowerCase());
                      return (
                        <span key={s} className={`px-2 py-0.5 rounded-md text-xs font-medium ${
                          matched ? 'bg-success/15 text-success border border-success/30' : 'bg-muted text-muted-foreground'
                        }`}>{s}</span>
                      );
                    })}
                  </div>

                  <div className="flex flex-wrap gap-4 mt-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{job.location}</span>
                    <span className="flex items-center gap-1"><Briefcase className="h-3 w-3" />{job.type}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />Deadline: {job.deadline}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-lg font-display font-bold text-foreground">{job.package}</span>
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
          {hasProfile && recommended.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">No matching jobs found. Try updating your skills.</div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RecommendedJobs;
