import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Settings, Database, Bell, Shield } from 'lucide-react';

const SystemSettings = () => {
  const { toast } = useToast();

  const settingSections = [
    { icon: Database, title: 'Database', desc: 'Manage database connections and backups', action: 'Configure' },
    { icon: Bell, title: 'Notifications', desc: 'Email and push notification settings', action: 'Configure' },
    { icon: Shield, title: 'Security', desc: 'Authentication and authorization settings', action: 'Configure' },
    { icon: Settings, title: 'General', desc: 'Application name, logo, and preferences', action: 'Configure' },
  ];

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <h1 className="text-2xl font-display font-bold text-foreground">System Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">Configure system preferences</p>

        <div className="mt-6 grid gap-4">
          {settingSections.map(s => (
            <div key={s.title} className="bg-card rounded-lg border border-border shadow-card p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-muted">
                  <s.icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => toast({ title: s.title, description: 'Settings panel coming soon' })}>
                {s.action}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SystemSettings;
