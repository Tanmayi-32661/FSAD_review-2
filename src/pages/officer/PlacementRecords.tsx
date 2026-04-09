import DashboardLayout from '@/components/DashboardLayout';
import { mockPlacementRecords } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PlacementRecords = () => {
  const records = mockPlacementRecords;
  const { toast } = useToast();

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">Placement Records</h1>
            <p className="text-muted-foreground text-sm mt-1">Complete history of campus placements</p>
          </div>
          <Button size="sm" variant="outline" onClick={() => toast({ title: 'Export', description: 'Report download started' })}>
            <Download className="h-4 w-4 mr-2" />Export
          </Button>
        </div>

        <div className="mt-6 bg-card rounded-lg border border-border shadow-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-3 font-medium text-muted-foreground">Student</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Company</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Role</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Package</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Department</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Year</th>
              </tr>
            </thead>
            <tbody>
              {records.map(r => (
                <tr key={r.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                  <td className="p-3 font-medium text-foreground">{r.studentName}</td>
                  <td className="p-3 text-muted-foreground">{r.company}</td>
                  <td className="p-3 text-muted-foreground">{r.role}</td>
                  <td className="p-3 font-medium text-foreground">{r.package}</td>
                  <td className="p-3 text-muted-foreground">{r.department}</td>
                  <td className="p-3 text-muted-foreground">{r.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PlacementRecords;
