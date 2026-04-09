import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const PostJob = () => {
  const { user } = useAuth();
  const { addJob } = useData();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [form, setForm] = useState({
    title: '', description: '', package: '', location: '', type: 'Full-time', skills: '', deadline: '', openings: '1', requiredCGPA: '', requiredSkills: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addJob({
      title: form.title,
      company: user?.company || user?.name || 'Company',
      description: form.description,
      package: form.package,
      location: form.location,
      type: form.type,
      skills: form.skills.split(',').map(s => s.trim()).filter(Boolean),
      deadline: form.deadline,
      employerId: user?.id || '',
      openings: parseInt(form.openings) || 1,
      requiredCGPA: form.requiredCGPA ? parseFloat(form.requiredCGPA) : undefined,
      requiredSkills: form.requiredSkills ? form.requiredSkills.split(',').map(s => s.trim()).filter(Boolean) : undefined,
    });
    toast({ title: 'Job posted!', description: `${form.title} has been published` });
    navigate('/employer/jobs');
  };

  const update = (key: string, value: string) => setForm(prev => ({ ...prev, [key]: value }));

  return (
    <DashboardLayout>
      <div className="animate-fade-in max-w-2xl">
        <h1 className="text-2xl font-display font-bold text-foreground">Post a Job</h1>
        <p className="text-muted-foreground text-sm mt-1">Create a new job listing</p>

        <form onSubmit={handleSubmit} className="mt-6 bg-card rounded-lg border border-border shadow-card p-6 space-y-4">
          <div>
            <Label>Job Title</Label>
            <Input value={form.title} onChange={e => update('title', e.target.value)} placeholder="e.g. Software Engineer" required className="mt-1" />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea value={form.description} onChange={e => update('description', e.target.value)} placeholder="Job description..." required className="mt-1" rows={4} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Package</Label>
              <Input value={form.package} onChange={e => update('package', e.target.value)} placeholder="e.g. 12 LPA" required className="mt-1" />
            </div>
            <div>
              <Label>Location</Label>
              <Input value={form.location} onChange={e => update('location', e.target.value)} placeholder="e.g. Bangalore" required className="mt-1" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Deadline</Label>
              <Input type="date" value={form.deadline} onChange={e => update('deadline', e.target.value)} required className="mt-1" />
            </div>
            <div>
              <Label>Openings</Label>
              <Input type="number" value={form.openings} onChange={e => update('openings', e.target.value)} min="1" className="mt-1" />
            </div>
          </div>
          <div>
            <Label>Skills (comma-separated)</Label>
            <Input value={form.skills} onChange={e => update('skills', e.target.value)} placeholder="React, Node.js, MongoDB" className="mt-1" />
          </div>

          <div className="border-t border-border pt-4">
            <p className="text-sm font-display font-semibold text-foreground mb-3">Eligibility Criteria</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Minimum CGPA</Label>
                <Input type="number" step="0.1" min="0" max="10" value={form.requiredCGPA} onChange={e => update('requiredCGPA', e.target.value)} placeholder="e.g. 7.5" className="mt-1" />
              </div>
              <div>
                <Label>Required Skills (comma-separated)</Label>
                <Input value={form.requiredSkills} onChange={e => update('requiredSkills', e.target.value)} placeholder="React, Node.js" className="mt-1" />
              </div>
            </div>
          </div>

          <Button type="submit" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">Publish Job</Button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default PostJob;
