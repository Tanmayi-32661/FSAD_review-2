import { useData } from '@/context/DataContext';
import DashboardLayout from '@/components/DashboardLayout';
import StatsCard from '@/components/StatsCard';
import { mockPlacementRecords } from '@/data/mockData';
import { Users, Building2, TrendingUp, Award } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const OfficerDashboard = () => {
  const { jobs, applications } = useData();
  const records = mockPlacementRecords;

  const selected = applications.filter(a => a.status === 'selected').length;
  const uniqueCompanies = [...new Set(records.map(r => r.company))].length;
  const avgPackage = records.reduce((sum, r) => sum + parseFloat(r.package), 0) / records.length;

  const deptData = Object.entries(
    records.reduce((acc, r) => { acc[r.department] = (acc[r.department] || 0) + 1; return acc; }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }));

  const COLORS = ['hsl(175, 60%, 40%)', 'hsl(220, 60%, 20%)', 'hsl(38, 92%, 50%)', 'hsl(210, 80%, 52%)', 'hsl(142, 70%, 40%)'];

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <h1 className="text-2xl font-display font-bold text-foreground">Placement Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Overview of placement statistics</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <StatsCard title="Total Placed" value={records.length} icon={Users} variant="primary" />
          <StatsCard title="Active Jobs" value={jobs.length} icon={TrendingUp} />
          <StatsCard title="Companies" value={uniqueCompanies} icon={Building2} variant="secondary" />
          <StatsCard title="Avg Package" value={`${avgPackage.toFixed(1)} LPA`} icon={Award} variant="success" />
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mt-8">
          <div className="bg-card rounded-lg border border-border shadow-card p-5">
            <h3 className="font-display font-semibold text-foreground mb-4">Department-wise Placements</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={deptData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="value" fill="hsl(175, 60%, 40%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card rounded-lg border border-border shadow-card p-5">
            <h3 className="font-display font-semibold text-foreground mb-4">Distribution by Department</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={deptData} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {deptData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OfficerDashboard;
