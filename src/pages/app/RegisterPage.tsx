import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import CaptchaImage from "@/components/CaptchaImage";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAppAuth } from "@/context/AppAuthContext";
import { authService } from "@/services/authService";
import type { CaptchaChallenge, Role } from "@/types";
import { validateEmail, validatePassword, validateRequired } from "@/utils/validation";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("student");
  const [captcha, setCaptcha] = useState<CaptchaChallenge | null>(null);
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const { register } = useAppAuth();
  const navigate = useNavigate();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);
    if (nameError || emailError || passwordError || captchaError || !captcha) {
      toast.error("Fix the highlighted fields before creating the account");
      return;
    }

    try {
      setLoading(true);
      const user = await register({ name, email, password, role, captchaToken: captcha.token, captchaAnswer });
      toast.success("Account created");
      navigate(`/${user.role}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Registration failed");
      void loadCaptcha();
    } finally {
      setLoading(false);
    }
  };

  const nameError = validateRequired("Full name", name);
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);
  const captchaError = validateRequired("Captcha answer", captchaAnswer);
  const showError = (value: string) => submitAttempted || value.trim().length > 0;

  return (
    <div className="min-h-screen flex">
      <div className="flex flex-1 items-center justify-center bg-slate-100 p-8">
        <div className="w-full max-w-md">
          <Link to="/" className="text-sm font-semibold text-emerald-700">PlaceIT Hub</Link>

          <h1 className="mt-4 text-3xl font-bold text-slate-900">Create your account</h1>
          <p className="mt-1 text-sm text-slate-500">Choose a role and enter the placement system.</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4 rounded-[2rem] bg-white p-8 shadow-card">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" required className="mt-2" />
              {showError(name) && nameError ? <p className="mt-1 text-sm text-rose-600">{nameError}</p> : null}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required className="mt-2" />
              {showError(email) && emailError ? <p className="mt-1 text-sm text-rose-600">{emailError}</p> : null}
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min 6 characters" required className="mt-2" />
              {showError(password) && passwordError ? <p className="mt-1 text-sm text-rose-600">{passwordError}</p> : null}
            </div>
            <div>
              <Label>Role</Label>
              <Select value={role} onValueChange={(v) => setRole(v as Role)}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="employer">Employer</SelectItem>
                  <SelectItem value="officer">Placement Officer</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
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
            <Button type="submit" className="w-full rounded-2xl bg-slate-950 text-white hover:bg-slate-800" disabled={loading || !captcha}>
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account? <Link to="/login" className="font-medium text-emerald-700 hover:underline">Sign In</Link>
          </p>
        </div>
      </div>

      <div className="gradient-hero hidden flex-1 items-center justify-center p-12 lg:flex">
        <div className="max-w-md text-center">
          <h2 className="text-4xl font-bold text-white">One platform for the full placement lifecycle.</h2>
          <p className="mt-4 text-white/70">Students, employers, officers, and admins all work from the same secure placement flow.</p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
