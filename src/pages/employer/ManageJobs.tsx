import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Trash2, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

const ManageJobs = () => {
  const { user } = useAuth();
  const { jobs, deleteJob } = useData();
  const { toast } = useToast();

  const myJobs = jobs.filter(j => j.employerId === user?.id);

  const handleDelete = (id: string, title: string) => {
    deleteJob(id);
    toast({ title: 'Job deleted', description: `${title} has been removed` });
  };

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">Manage Jobs</h1>
            <p className="text-muted-foreground text-sm mt-1">Edit or remove your job listings</p>
          </div>
          <Link to="/employer/post-job">
            <Button size="sm" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">Post New Job</Button>
          </Link>
        </div>

        <div className="mt-6 bg-card rounded-lg border border-border shadow-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-3 font-medium text-muted-foreground">Title</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Location</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Package</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Deadline</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {myJobs.map(job => (
                <tr key={job.id} className="border-t border-border">
                  <td className="p-3 font-medium text-foreground">{job.title}</td>
                  <td className="p-3 text-muted-foreground">{job.location}</td>
                  <td className="p-3 text-muted-foreground">{job.package}</td>
                  <td className="p-3 text-muted-foreground">{job.deadline}</td>
                  <td className="p-3 flex gap-2">
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground"><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={() => handleDelete(job.id, job.title)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
              {myJobs.length === 0 && (
                <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">No jobs posted yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ManageJobs;
