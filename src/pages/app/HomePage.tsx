import { Link } from "react-router-dom";
import { ArrowRight, BriefcaseBusiness, FileCheck2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">PlaceIT Hub</h1>
          <div className="flex gap-3">
            <Button asChild variant="secondary" className="rounded-full">
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild className="rounded-full bg-emerald-500 text-slate-950 hover:bg-emerald-400">
              <Link to="/register">Register</Link>
            </Button>
          </div>
        </div>

        <div className="mt-20 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-emerald-300">Placement Interaction System</p>
            <h2 className="mt-4 max-w-3xl text-5xl font-bold leading-tight">
              Full-stack placement tracking with strict resume-first student access.
            </h2>
            <p className="mt-6 max-w-2xl text-lg text-slate-300">
              Students upload resumes before anything else, employers manage jobs and applicants, and placement officers
              monitor placements, meetings, reports, and user access.
            </p>
            <div className="mt-8 flex gap-4">
              <Button asChild className="rounded-full bg-white text-slate-950 hover:bg-slate-200">
                <Link to="/register">
                  Start Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full border-white/30 bg-transparent text-white hover:bg-white/10">
                <Link to="/login">Sign In</Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-4">
            {[
              {
                icon: FileCheck2,
                title: "Resume Gate",
                copy: "Students are blocked from placements, profile actions, and job discovery until resume upload succeeds.",
              },
              {
                icon: BriefcaseBusiness,
                title: "Smart Matching",
                copy: "Matched jobs are filtered by extracted resume skills so students only see relevant opportunities.",
              },
              {
                icon: Shield,
                title: "JWT + RBAC",
                copy: "Role-based dashboards and protected routes keep each workflow secure and focused.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur">
                  <Icon className="h-8 w-8 text-emerald-300" />
                  <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-300">{item.copy}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
