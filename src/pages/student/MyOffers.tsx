import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import DashboardLayout from '@/components/DashboardLayout';
import StatusBadge from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Gift, CheckCircle2, XCircle } from 'lucide-react';

const MyOffers = () => {
  const { user } = useAuth();
  const { applications, respondToOffer } = useData();
  const { toast } = useToast();

  const offers = applications.filter(a => a.studentId === user?.id && ['offered', 'accepted', 'declined'].includes(a.status));

  const handleRespond = (id: string, accept: boolean) => {
    respondToOffer(id, accept);
    toast({
      title: accept ? 'Offer Accepted!' : 'Offer Declined',
      description: accept ? 'Congratulations! You have accepted the offer.' : 'You have declined this offer.',
    });
  };

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <div className="flex items-center gap-2">
          <Gift className="h-5 w-5 text-secondary" />
          <h1 className="text-2xl font-display font-bold text-foreground">My Offers</h1>
        </div>
        <p className="text-muted-foreground text-sm mt-1">View and respond to job offers</p>

        <div className="mt-6 grid gap-4">
          {offers.map(offer => (
            <div key={offer.id} className="p-5 bg-card rounded-lg border border-border shadow-card">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="font-display font-semibold text-lg text-foreground">{offer.jobTitle}</h3>
                  <p className="text-secondary font-medium text-sm">{offer.company}</p>
                  {offer.offerLetter && (
                    <div className="mt-2 bg-muted/50 rounded-lg p-3">
                      <p className="text-xs text-muted-foreground mb-1">Offer Details</p>
                      <p className="text-sm font-medium text-foreground">{offer.offerLetter}</p>
                    </div>
                  )}
                  <div className="mt-2">
                    <StatusBadge status={offer.status} />
                  </div>
                </div>

                {offer.status === 'offered' && (
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-success text-primary-foreground hover:bg-success/90 gap-1.5" onClick={() => handleRespond(offer.id, true)}>
                      <CheckCircle2 className="h-3.5 w-3.5" />Accept
                    </Button>
                    <Button size="sm" variant="outline" className="text-destructive border-destructive/30 hover:bg-destructive/10 gap-1.5" onClick={() => handleRespond(offer.id, false)}>
                      <XCircle className="h-3.5 w-3.5" />Decline
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
          {offers.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">No offers received yet.</div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MyOffers;
