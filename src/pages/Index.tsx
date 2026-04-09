import { Link } from 'react-router-dom';
import { Building2, Briefcase, Users, TrendingUp, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  { icon: Briefcase, title: 'Job Listings', desc: 'Browse and apply to top companies visiting campus' },
  { icon: Users, title: 'Smart Matching', desc: 'Get matched with roles that fit your profile' },
  { icon: TrendingUp, title: 'Track Progress', desc: 'Monitor application status in real-time' },
  { icon: CheckCircle2, title: 'Analytics', desc: 'Comprehensive placement statistics and reports' },
];

const stats = [
  { value: '500+', label: 'Students Placed' },
  { value: '120+', label: 'Partner Companies' },
  { value: '95%', label: 'Placement Rate' },
  { value: '12 LPA', label: 'Avg Package' },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-accent flex items-center justify-center">
              <Building2 className="h-4 w-4 text-primary" />
            </div>
            <span className="font-display font-bold text-lg text-foreground">PlaceIT</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">Login</Button>
            </Link>
            <Link to="/register">
              <Button size="sm" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">Register</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="gradient-hero pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-display font-extrabold text-primary-foreground leading-tight animate-fade-in">
            Your Career Journey<br />Starts Here
          </h1>
          <p className="mt-5 text-lg md:text-xl text-primary-foreground/70 max-w-2xl mx-auto animate-slide-up">
            Connecting students with top employers through a seamless campus placement experience.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link to="/register">
              <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold px-8">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-card border-b border-border">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(s => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-display font-extrabold text-secondary">{s.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-center text-foreground">Everything You Need</h2>
          <p className="text-muted-foreground text-center mt-3 max-w-xl mx-auto">
            A complete placement management system for students, employers, and placement officers.
          </p>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(f => (
              <div key={f.title} className="p-6 rounded-xl bg-card border border-border shadow-card hover:shadow-elevated transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center mb-4">
                  <f.icon className="h-5 w-5 text-accent-foreground" />
                </div>
                <h3 className="font-display font-semibold text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-20 px-6 bg-muted/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-display font-bold text-foreground">About PlaceIT</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            PlaceIT is a comprehensive Placement Interaction System designed to bridge the gap between students 
            and employers. Our platform streamlines the entire campus recruitment process — from job posting to 
            final selection — making it efficient, transparent, and accessible for everyone involved.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border bg-card">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-secondary" />
            <span className="font-display font-semibold text-sm text-foreground">PlaceIT</span>
          </div>
          <p className="text-xs text-muted-foreground">© 2026 Placement Interaction System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
