import { Link } from 'react-router-dom';
import { Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: 'Reset link sent!', description: 'Check your email for password reset instructions.' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-background">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg gradient-accent flex items-center justify-center">
            <Building2 className="h-4 w-4 text-primary" />
          </div>
          <span className="font-display font-bold text-lg text-foreground">PlaceIT</span>
        </Link>

        <h1 className="text-2xl font-display font-bold text-foreground">Forgot Password</h1>
        <p className="text-muted-foreground mt-1 text-sm">Enter your email and we'll send you a reset link</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required className="mt-1" />
          </div>
          <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            Send Reset Link
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Remember your password? <Link to="/login" className="text-secondary font-medium hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
