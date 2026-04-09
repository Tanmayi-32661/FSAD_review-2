import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import DashboardLayout from '@/components/DashboardLayout';
import StatusBadge from '@/components/StatusBadge';
import ResumeViewer from '@/components/ResumeViewer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Application, User } from '@/types';
import { Eye, Send } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const ViewApplications = () => {
  const { user } = useAuth();
  const { jobs, applications, updateApplicationStatus, sendOffer, getStudentById } = useData();
  const { toast } = useToast();

  const [viewingStudent, setViewingStudent] = useState<User | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [offerOpen, setOfferOpen] = useState(false);
  const [selectedAppId, setSelectedAppId] = useState('');
  const [offerDetails, setOfferDetails] = useState('');

  const myJobIds = jobs.filter(j => j.employerId === user?.id).map(j => j.id);
  const myApps = applications.filter(a => myJobIds.includes(a.jobId));

  const handleStatusChange = (id: string, status: Application['status']) => {
    updateApplicationStatus(id, status, status === 'shortlisted' ? '2026-03-15' : undefined);
    toast({ title: 'Status updated', description: `Application marked as ${status}` });
  };

  const handleViewResume = (studentId: string) => {
    const student = getStudentById(studentId);
    setViewingStudent(student || null);
    setResumeOpen(true);
  };

  const handleOpenOffer = (appId: string, app: typeof myApps[0]) => {
    setSelectedAppId(appId);
    setOfferDetails(`${app.jobTitle} at ${app.company}`);
    setOfferOpen(true);
  };

  const handleSendOffer = () => {
    if (!offerDetails.trim()) return;
    sendOffer(selectedAppId, offerDetails);
    toast({ title: 'Offer sent!', description: 'The student has been notified' });
    setOfferOpen(false);
    setOfferDetails('');
  };

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <h1 className="text-2xl font-display font-bold text-foreground">Applications</h1>
        <p className="text-muted-foreground text-sm mt-1">Review and manage student applications</p>

        <div className="mt-6 bg-card rounded-lg border border-border shadow-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-3 font-medium text-muted-foreground">Student</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Job</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Applied</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {myApps.map(app => (
                <tr key={app.id} className="border-t border-border">
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{app.studentName}</span>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => handleViewResume(app.studentId)}>
                        <Eye className="h-3.5 w-3.5 text-secondary" />
                      </Button>
                    </div>
                  </td>
                  <td className="p-3 text-muted-foreground">{app.jobTitle}</td>
                  <td className="p-3 text-muted-foreground">{app.appliedDate}</td>
                  <td className="p-3"><StatusBadge status={app.status} /></td>
                  <td className="p-3">
                    <div className="flex gap-1 flex-wrap">
                      <Button size="sm" variant="ghost" className="text-xs text-success hover:text-success" onClick={() => handleStatusChange(app.id, 'shortlisted')}>Shortlist</Button>
                      <Button size="sm" variant="ghost" className="text-xs text-secondary hover:text-secondary" onClick={() => handleStatusChange(app.id, 'selected')}>Select</Button>
                      <Button size="sm" variant="ghost" className="text-xs text-destructive hover:text-destructive" onClick={() => handleStatusChange(app.id, 'rejected')}>Reject</Button>
                      <Button size="sm" variant="ghost" className="text-xs gap-1" onClick={() => handleOpenOffer(app.id, app)}>
                        <Send className="h-3 w-3" />Offer
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {myApps.length === 0 && (
                <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">No applications received yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ResumeViewer student={viewingStudent} open={resumeOpen} onClose={() => setResumeOpen(false)} />

      {/* Send Offer Dialog */}
      <Dialog open={offerOpen} onOpenChange={setOfferOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display">Send Job Offer</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <Label>Offer Details</Label>
              <Textarea value={offerDetails} onChange={e => setOfferDetails(e.target.value)} rows={3} className="mt-1" placeholder="e.g. 12 LPA - Software Engineer role with joining in July 2026" />
            </div>
            <Button onClick={handleSendOffer} className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-1.5">
              <Send className="h-3.5 w-3.5" />Send Offer
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default ViewApplications;
