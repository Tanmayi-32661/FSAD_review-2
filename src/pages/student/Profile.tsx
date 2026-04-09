import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { User, Upload, FileText, X } from 'lucide-react';

const StudentProfile = () => {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [department, setDepartment] = useState(user?.department || '');
  const [cgpa, setCgpa] = useState(String(user?.cgpa || ''));
  const [skillsInput, setSkillsInput] = useState((user?.skills || []).join(', '));
  const [resumeName, setResumeName] = useState(user?.resumeName || '');

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowed.includes(file.type)) {
      toast({ title: 'Invalid file type', description: 'Please upload PDF or DOC/DOCX files only', variant: 'destructive' });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: 'File too large', description: 'Maximum file size is 5MB', variant: 'destructive' });
      return;
    }
    setResumeName(file.name);
    toast({ title: 'Resume uploaded', description: `${file.name} selected` });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedCgpa = parseFloat(cgpa);
    if (cgpa && (isNaN(parsedCgpa) || parsedCgpa < 0 || parsedCgpa > 10)) {
      toast({ title: 'Invalid CGPA', description: 'CGPA must be between 0 and 10', variant: 'destructive' });
      return;
    }
    updateProfile({
      name,
      phone,
      department,
      cgpa: parsedCgpa || 0,
      skills: skillsInput.split(',').map(s => s.trim()).filter(Boolean),
      resumeName,
      resumeUrl: resumeName ? `/uploads/resumes/${resumeName}` : undefined,
    });
    toast({ title: 'Profile updated', description: 'Your changes have been saved' });
  };

  return (
    <DashboardLayout>
      <div className="animate-fade-in max-w-2xl">
        <h1 className="text-2xl font-display font-bold text-foreground">Profile</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage your personal information</p>

        <div className="mt-6 bg-card rounded-lg border border-border shadow-card p-6">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
              <User className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <p className="font-display font-semibold text-lg text-foreground">{user?.name}</p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>Full Name</Label>
                <Input value={name} onChange={e => setName(e.target.value)} className="mt-1" />
              </div>
              <div>
                <Label>Email</Label>
                <Input value={user?.email || ''} disabled className="mt-1 bg-muted" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>Phone</Label>
                <Input value={phone} onChange={e => setPhone(e.target.value)} className="mt-1" />
              </div>
              <div>
                <Label>Department</Label>
                <Input value={department} onChange={e => setDepartment(e.target.value)} className="mt-1" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>CGPA (out of 10)</Label>
                <Input type="number" step="0.1" min="0" max="10" value={cgpa} onChange={e => setCgpa(e.target.value)} className="mt-1" placeholder="e.g. 8.5" />
              </div>
              <div>
                <Label>Skills (comma-separated)</Label>
                <Input value={skillsInput} onChange={e => setSkillsInput(e.target.value)} className="mt-1" placeholder="React, Python, SQL" />
              </div>
            </div>

            {/* Resume Upload */}
            <div>
              <Label>Resume (PDF/DOC)</Label>
              <div className="mt-1 border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-secondary/50 transition-colors">
                {resumeName ? (
                  <div className="flex items-center justify-center gap-3">
                    <FileText className="h-5 w-5 text-secondary" />
                    <span className="text-sm font-medium text-foreground">{resumeName}</span>
                    <Button type="button" variant="ghost" size="sm" onClick={() => setResumeName('')}>
                      <X className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center gap-2">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Click to upload resume</span>
                    <span className="text-xs text-muted-foreground">PDF, DOC, DOCX — Max 5MB</span>
                    <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleResumeUpload} />
                  </label>
                )}
              </div>
            </div>

            {/* Skills Preview */}
            {skillsInput && (
              <div className="flex flex-wrap gap-1.5">
                {skillsInput.split(',').map(s => s.trim()).filter(Boolean).map(s => (
                  <span key={s} className="px-2 py-0.5 rounded-md bg-accent text-accent-foreground text-xs font-medium">{s}</span>
                ))}
              </div>
            )}

            <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">Save Changes</Button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentProfile;
