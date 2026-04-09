import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { mockUsers } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const UserManagement = () => {
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState(mockUsers);

  const filtered = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  const toggleActive = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, active: !u.active } : u));
    toast({ title: 'User updated' });
  };

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <h1 className="text-2xl font-display font-bold text-foreground">User Management</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage all system users</p>

        <div className="relative mt-6 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
        </div>

        <div className="mt-4 bg-card rounded-lg border border-border shadow-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-3 font-medium text-muted-foreground">Name</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Email</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Role</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(u => (
                <tr key={u.id} className="border-t border-border">
                  <td className="p-3 font-medium text-foreground">{u.name}</td>
                  <td className="p-3 text-muted-foreground">{u.email}</td>
                  <td className="p-3"><span className="capitalize px-2 py-0.5 rounded-md bg-accent text-accent-foreground text-xs font-medium">{u.role}</span></td>
                  <td className="p-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${u.active ? 'bg-success/15 text-success' : 'bg-destructive/15 text-destructive'}`}>
                      {u.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="p-3">
                    <Button size="sm" variant="ghost" onClick={() => toggleActive(u.id)} className="text-xs">
                      {u.active ? 'Deactivate' : 'Activate'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserManagement;
