import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import {
  LayoutDashboard, Briefcase, FileText, Users, LogOut,
  ChevronLeft, ChevronRight, GraduationCap, Building2, ClipboardList, BarChart3,
  PlusCircle, Eye, Sparkles, Gift, FileSearch
} from 'lucide-react';

interface SidebarItem {
  title: string;
  icon: React.ElementType;
  path: string;
}

const roleMenus: Record<string, SidebarItem[]> = {
  student: [
    { title: 'Dashboard', icon: LayoutDashboard, path: '/student' },
    { title: 'Browse Jobs', icon: Briefcase, path: '/student/jobs' },
    { title: 'Recommended', icon: Sparkles, path: '/student/recommended' },
    { title: 'My Applications', icon: FileText, path: '/student/applications' },
    { title: 'My Offers', icon: Gift, path: '/student/offers' },
    { title: 'Profile', icon: GraduationCap, path: '/student/profile' },
  ],
  employer: [
    { title: 'Dashboard', icon: LayoutDashboard, path: '/employer' },
    { title: 'Post Job', icon: PlusCircle, path: '/employer/post-job' },
    { title: 'Manage Jobs', icon: Briefcase, path: '/employer/jobs' },
    { title: 'Applications', icon: Eye, path: '/employer/applications' },
  ],
  officer: [
    { title: 'Dashboard', icon: LayoutDashboard, path: '/officer' },
    { title: 'Placement Records', icon: ClipboardList, path: '/officer/records' },
    { title: 'Student Resumes', icon: FileSearch, path: '/officer/resumes' },
    { title: 'Reports', icon: BarChart3, path: '/officer/reports' },
    { title: 'User Management', icon: Users, path: '/officer/users' },
  ],
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  if (!user) return null;

  const menuItems = roleMenus[user.role] || [];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const roleLabels: Record<string, string> = {
    student: 'Student',
    employer: 'Employer',
    officer: 'Placement Officer',
  };

  return (
    <div className="flex min-h-screen w-full">
      <aside className={`${collapsed ? 'w-16' : 'w-64'} bg-sidebar text-sidebar-foreground flex flex-col transition-all duration-300 relative`}>
        <div className="h-16 flex items-center px-4 border-b border-sidebar-border">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-accent flex items-center justify-center">
                <Building2 className="h-4 w-4 text-primary" />
              </div>
              <span className="font-display font-bold text-sm text-sidebar-accent-foreground">PIS</span>
            </div>
          )}
          {collapsed && (
            <div className="w-8 h-8 rounded-lg gradient-accent flex items-center justify-center mx-auto">
              <Building2 className="h-4 w-4 text-primary" />
            </div>
          )}
        </div>

        <nav className="flex-1 py-4 px-2 space-y-1">
          {menuItems.map(item => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-sidebar-accent text-sidebar-primary'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                }`}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                {!collapsed && <span>{item.title}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-sidebar-border">
          {!collapsed && (
            <div className="mb-3 px-2">
              <p className="text-xs font-semibold text-sidebar-accent-foreground truncate">{user.name}</p>
              <p className="text-xs text-sidebar-foreground/60">{roleLabels[user.role]}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-sidebar-foreground hover:bg-destructive/20 hover:text-destructive transition-colors"
          >
            <LogOut className="h-4 w-4 flex-shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-card border border-border shadow-card flex items-center justify-center hover:bg-muted transition-colors"
        >
          {collapsed ? <ChevronRight className="h-3 w-3 text-foreground" /> : <ChevronLeft className="h-3 w-3 text-foreground" />}
        </button>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
