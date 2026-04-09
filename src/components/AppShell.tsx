import { Link, useLocation } from "react-router-dom";
import { BriefcaseBusiness, FileText, LayoutDashboard, LogOut, ShieldCheck, UserCircle2, Users } from "lucide-react";
import { useAppAuth } from "@/context/AppAuthContext";
import { Button } from "@/components/ui/button";
import type { Role } from "@/types";

const navByRole: Record<Role, { label: string; href: string; icon: typeof LayoutDashboard }[]> = {
  student: [
    { label: "Dashboard", href: "/student", icon: LayoutDashboard },
    { label: "Resume", href: "/student/resume", icon: FileText },
    { label: "Matched Jobs", href: "/student/jobs", icon: BriefcaseBusiness },
    { label: "Applications", href: "/student/applications", icon: Users },
    { label: "Profile", href: "/student/profile", icon: UserCircle2 },
  ],
  employer: [
    { label: "Dashboard", href: "/employer", icon: LayoutDashboard },
    { label: "Jobs", href: "/employer/jobs", icon: BriefcaseBusiness },
    { label: "Applicants", href: "/employer/applications", icon: Users },
    { label: "Profile", href: "/employer/profile", icon: UserCircle2 },
  ],
  officer: [
    { label: "Dashboard", href: "/officer", icon: LayoutDashboard },
    { label: "Reports", href: "/officer/reports", icon: ShieldCheck },
    { label: "Interactions", href: "/officer/interactions", icon: Users },
  ],
  admin: [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Users", href: "/admin/users", icon: Users },
    { label: "Applications", href: "/admin/applications", icon: BriefcaseBusiness },
  ],
};

const AppShell = ({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) => {
  const { user, logout } = useAppAuth();
  const location = useLocation();

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="grid min-h-screen lg:grid-cols-[260px_1fr]">
        <aside className="gradient-hero p-6 text-white">
          <Link to={`/${user.role}`} className="text-2xl font-bold tracking-tight">
            PlaceIT Hub
          </Link>
          <div className="mt-8 space-y-2">
            {navByRole[user.role].map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${
                    active ? "bg-white/20 text-white" : "text-white/75 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="mt-10 rounded-3xl bg-white/10 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-white/60">Signed in as</p>
            <p className="mt-2 font-semibold">{user.name}</p>
            <p className="text-sm text-white/70">{user.email}</p>
          </div>

          <Button
            variant="secondary"
            className="mt-6 w-full justify-start rounded-2xl bg-white/90 text-slate-900 hover:bg-white"
            onClick={logout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </aside>

        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mb-6 rounded-[2rem] bg-white p-6 shadow-card">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-600">{user.role}</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">{title}</h1>
            <p className="mt-2 max-w-3xl text-slate-600">{subtitle}</p>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppShell;
