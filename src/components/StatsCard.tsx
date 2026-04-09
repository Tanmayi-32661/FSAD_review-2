import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning';
}

const variantStyles = {
  default: 'bg-card border border-border',
  primary: 'bg-primary text-primary-foreground',
  secondary: 'bg-secondary text-secondary-foreground',
  success: 'bg-success/10 border border-success/20',
  warning: 'bg-warning/10 border border-warning/20',
};

const iconStyles = {
  default: 'bg-muted text-muted-foreground',
  primary: 'bg-primary-foreground/20 text-primary-foreground',
  secondary: 'bg-secondary-foreground/20 text-secondary-foreground',
  success: 'bg-success/20 text-success',
  warning: 'bg-warning/20 text-warning',
};

const StatsCard = ({ title, value, icon: Icon, trend, variant = 'default' }: StatsCardProps) => {
  return (
    <div className={`rounded-lg p-5 shadow-card transition-all hover:shadow-elevated ${variantStyles[variant]}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm font-medium ${variant === 'default' ? 'text-muted-foreground' : 'opacity-80'}`}>{title}</p>
          <p className="text-2xl font-bold mt-1 font-display">{value}</p>
          {trend && <p className="text-xs mt-1 opacity-70">{trend}</p>}
        </div>
        <div className={`p-3 rounded-lg ${iconStyles[variant]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
