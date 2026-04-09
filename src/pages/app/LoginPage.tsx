import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import CaptchaImage from "@/components/CaptchaImage";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppAuth } from "@/context/AppAuthContext";
import { authService } from "@/services/authService";
import type { CaptchaChallenge } from "@/types";
import { validateEmail, validatePassword, validateRequired } from "@/utils/validation";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAppAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState<CaptchaChallenge | null>(null);
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const loadCaptcha = async () => {
    try {
      const nextCaptcha = await authService.getCaptcha();
      setCaptcha(nextCaptcha);
      setCaptchaAnswer("");
    } catch {
      toast.error("Unable to load captcha");
    }
  };

  useEffect(() => {
    void loadCaptcha();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitAttempted(true);
    if (emailError || passwordError || captchaError || !captcha) {
      toast.error("Fix the highlighted fields before signing in");
      return;
    }

    try {
      setSubmitting(true);
      const user = await login(email, password, captcha.token, captchaAnswer);
      toast.success("Welcome back");
      navigate(`/${user.role}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Login failed");
      void loadCaptcha();
    } finally {
      setSubmitting(false);
    }
  };

  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);
  const captchaError = validateRequired("Captcha answer", captchaAnswer);
  const showError = (value: string) => submitAttempted || value.trim().length > 0;

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="gradient-hero hidden items-center justify-center p-12 text-white lg:flex">
        <div className="max-w-lg">
          <p className="text-sm uppercase tracking-[0.25em] text-emerald-200">Placement Workflow</p>
          <h1 className="mt-4 text-5xl font-bold">Secure placement operations for every role.</h1>
          <p className="mt-6 text-lg text-white/75">
            JWT sessions, resume-first student gating, and role-based dashboards built for real placement tracking.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center bg-slate-100 px-6 py-10">
        <form onSubmit={handleSubmit} className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-card">
          <Link to="/" className="text-sm font-semibold text-emerald-700">
            PlaceIT Hub
          </Link>
          <h2 className="mt-4 text-3xl font-bold text-slate-900">Login</h2>
          <p className="mt-2 text-sm text-slate-500">Sign in to continue to your placement workspace.</p>

          <div className="mt-8 space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" className="mt-2" value={email} onChange={(e) => setEmail(e.target.value)} />
              {showError(email) && emailError ? <p className="mt-1 text-sm text-rose-600">{emailError}</p> : null}
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" className="mt-2" value={password} onChange={(e) => setPassword(e.target.value)} />
              {showError(password) && passwordError ? <p className="mt-1 text-sm text-rose-600">{passwordError}</p> : null}
            </div>
            <div>
              <Label htmlFor="captcha">Captcha</Label>
              <div className="mt-2 flex items-start gap-3">
                <Input
                  id="captcha"
                  className="flex-1"
                  value={captchaAnswer}
                  onChange={(e) => setCaptchaAnswer(e.target.value)}
                  placeholder="Type captcha"
                />
                {captcha ? (
                  <CaptchaImage value={captcha.challenge} />
                ) : (
                  <div className="flex h-12 w-[170px] items-center justify-center rounded-md border border-slate-200 bg-slate-50 text-sm text-slate-500">
                    Loading...
                  </div>
                )}
              </div>
              <div className="mt-2 flex justify-end">
                <Button type="button" variant="outline" className="rounded-xl" onClick={() => void loadCaptcha()}>
                  Refresh
                </Button>
              </div>
              {showError(captchaAnswer) && captchaError ? <p className="mt-1 text-sm text-rose-600">{captchaError}</p> : null}
            </div>
          </div>

          <Button type="submit" disabled={submitting || !captcha} className="mt-8 w-full rounded-2xl bg-slate-950 hover:bg-slate-800">
            {submitting ? "Signing in..." : "Login"}
          </Button>

          <p className="mt-6 text-sm text-slate-500">
            No account yet?{" "}
            <Link to="/register" className="font-semibold text-emerald-700">
              Create one
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
