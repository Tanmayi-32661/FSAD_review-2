import { Application } from '@/types';

const statusConfig: Record<Application['status'], { label: string; className: string }> = {
  applied: { label: 'Applied', className: 'bg-info/15 text-info border border-info/30' },
  shortlisted: { label: 'Shortlisted', className: 'bg-warning/15 text-warning border border-warning/30' },
  rejected: { label: 'Rejected', className: 'bg-destructive/15 text-destructive border border-destructive/30' },
  selected: { label: 'Selected', className: 'bg-success/15 text-success border border-success/30' },
  offered: { label: 'Offered', className: 'bg-secondary/15 text-secondary border border-secondary/30' },
  accepted: { label: 'Accepted', className: 'bg-success/15 text-success border border-success/30' },
  declined: { label: 'Declined', className: 'bg-muted-foreground/15 text-muted-foreground border border-muted-foreground/30' },
};

const StatusBadge = ({ status }: { status: Application['status'] }) => {
  const config = statusConfig[status];
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${config.className}`}>
      {config.label}
    </span>
  );
};

export default StatusBadge;
