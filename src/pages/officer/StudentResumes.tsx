import { useState } from 'react';
import { useData } from '@/context/DataContext';
import DashboardLayout from '@/components/DashboardLayout';
import ResumeViewer from '@/components/ResumeViewer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Eye } from 'lucide-react';
import { User } from '@/types';

const StudentResumes = () => {
  const { allStudents } = useData();
  const [search, setSearch] = useState('');
  const [viewingStudent, setViewingStudent] = useState<User | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);

  const filtered = allStudents.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.department?.toLowerCase().includes(search.toLowerCase()) ||
    s.skills?.some(sk => sk.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <h1 className="text-2xl font-display font-bold text-foreground">Student Resumes</h1>
        <p className="text-muted-foreground text-sm mt-1">View student profiles and download resumes</p>

        <div className="relative mt-6 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by name, department, or skill..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
        </div>

        <div className="mt-6 bg-card rounded-lg border border-border shadow-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-3 font-medium text-muted-foreground">Name</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Department</th>
                <th className="text-left p-3 font-medium text-muted-foreground">CGPA</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Skills</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Resume</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                  <td className="p-3 font-medium text-foreground">{s.name}</td>
                  <td className="p-3 text-muted-foreground">{s.department || '—'}</td>
                  <td className="p-3 text-muted-foreground">{s.cgpa || '—'}</td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-1">
                      {(s.skills || []).slice(0, 3).map(sk => (
                        <span key={sk} className="px-1.5 py-0.5 rounded bg-accent text-accent-foreground text-xs">{sk}</span>
                      ))}
                      {(s.skills || []).length > 3 && <span className="text-xs text-muted-foreground">+{s.skills!.length - 3}</span>}
                    </div>
                  </td>
                  <td className="p-3 text-muted-foreground text-xs">{s.resumeName || 'Not uploaded'}</td>
                  <td className="p-3">
                    <Button variant="ghost" size="sm" className="text-secondary gap-1" onClick={() => { setViewingStudent(s); setResumeOpen(true); }}>
                      <Eye className="h-3.5 w-3.5" />View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ResumeViewer student={viewingStudent} open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </DashboardLayout>
  );
};

export default StudentResumes;
