import DashboardLayout from '@/components/DashboardLayout';
import { mockPlacementRecords } from '@/data/mockData';
import { useData } from '@/context/DataContext';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const Reports = () => {
  const { applications } = useData();
  const records = mockPlacementRecords;
  const { toast } = useToast();

  const companyData = Object.entries(
    records.reduce((acc, r) => { acc[r.company] = (acc[r.company] || 0) + 1; return acc; }, {} as Record<string, number>)
  ).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);

  const yearData = Object.entries(
    records.reduce((acc, r) => { acc[r.year] = (acc[r.year] || 0) + 1; return acc; }, {} as Record<number, number>)
  ).map(([year, count]) => ({ year, count }));

  const statusData = [
    { name: 'Applied', count: applications.filter(a => a.status === 'applied').length },
    { name: 'Shortlisted', count: applications.filter(a => a.status === 'shortlisted').length },
    { name: 'Selected', count: applications.filter(a => a.status === 'selected').length },
    { name: 'Rejected', count: applications.filter(a => a.status === 'rejected').length },
  ];

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">Reports & Analytics</h1>
            <p className="text-muted-foreground text-sm mt-1">Detailed placement insights</p>
          </div>
          <Button size="sm" variant="outline" onClick={() => toast({ title: 'Export', description: 'Report download started' })}>
            <Download className="h-4 w-4 mr-2" />Export Report
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mt-6">
          <div className="bg-card rounded-lg border border-border shadow-card p-5">
            <h3 className="font-display font-semibold text-foreground mb-4">Company-wise Placements</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={companyData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(220, 60%, 20%)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card rounded-lg border border-border shadow-card p-5">
            <h3 className="font-display font-semibold text-foreground mb-4">Application Status Overview</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={statusData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(175, 60%, 40%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card rounded-lg border border-border shadow-card p-5 lg:col-span-2">
            <h3 className="font-display font-semibold text-foreground mb-4">Year-wise Placement Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={yearData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" />
                <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="hsl(175, 60%, 40%)" strokeWidth={2} dot={{ fill: 'hsl(175, 60%, 40%)' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
