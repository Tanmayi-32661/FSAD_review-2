import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Role } from '@/types';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>('student');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const success = await register(name, email, password, role);
    setLoading(false);
    if (success) {
      toast({ title: 'Account created!', description: 'Welcome to PlaceIT' });
      navigate(`/${role}`);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg gradient-accent flex items-center justify-center">
              <Building2 className="h-4 w-4 text-primary" />
            </div>
            <span className="font-display font-bold text-lg text-foreground">PlaceIT</span>
          </Link>

          <h1 className="text-2xl font-display font-bold text-foreground">Create your account</h1>
          <p className="text-muted-foreground mt-1 text-sm">Join PlaceIT and start your placement journey</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="John Doe" required className="mt-1" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required className="mt-1" />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Min 6 characters" required className="mt-1" />
            </div>
            <div>
              <Label>Role</Label>
              <Select value={role} onValueChange={(v) => setRole(v as Role)}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="employer">Employer</SelectItem>
                  <SelectItem value="officer">Placement Officer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90" disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account? <Link to="/login" className="text-secondary font-medium hover:underline">Sign In</Link>
          </p>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 gradient-hero items-center justify-center p-12">
        <div className="text-center max-w-md">
          <h2 className="text-3xl font-display font-bold text-primary-foreground">Join the Community</h2>
          <p className="mt-4 text-primary-foreground/70">Whether you're a student seeking opportunities or an employer looking for talent, we've got you covered.</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
