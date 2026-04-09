import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download, FileText, GraduationCap, Code } from 'lucide-react';
import { User } from '@/types';

interface ResumeViewerProps {
  student: User | null;
  open: boolean;
  onClose: () => void;
}

const ResumeViewer = ({ student, open, onClose }: ResumeViewerProps) => {
  if (!student) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display">{student.name} — Profile & Resume</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <p className="font-semibold text-foreground">{student.name}</p>
              <p className="text-sm text-muted-foreground">{student.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-muted-foreground text-xs">Department</p>
              <p className="font-medium text-foreground">{student.department || '—'}</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-muted-foreground text-xs">CGPA</p>
              <p className="font-medium text-foreground">{student.cgpa || '—'}</p>
            </div>
          </div>

          {student.skills && student.skills.length > 0 && (
            <div>
              <div className="flex items-center gap-1 mb-2">
                <Code className="h-3.5 w-3.5 text-muted-foreground" />
                <p className="text-xs font-medium text-muted-foreground">Skills</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {student.skills.map(s => (
                  <span key={s} className="px-2 py-0.5 rounded-md bg-accent text-accent-foreground text-xs font-medium">{s}</span>
                ))}
              </div>
            </div>
          )}

          <div className="border border-border rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-secondary" />
              <div>
                <p className="font-medium text-sm text-foreground">{student.resumeName || 'No resume uploaded'}</p>
                <p className="text-xs text-muted-foreground">{student.resumeUrl ? 'PDF Document' : 'Not available'}</p>
              </div>
            </div>
            {student.resumeUrl && (
              <Button size="sm" variant="outline" className="gap-1.5" onClick={() => {
                // Mock download
                const link = document.createElement('a');
                link.href = '#';
                link.download = student.resumeName || 'resume.pdf';
                link.click();
              }}>
                <Download className="h-3.5 w-3.5" />
                Download
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResumeViewer;
