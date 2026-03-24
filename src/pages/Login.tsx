import { useState } from "react";
import { useAuth } from "@/lib/authContext";
import { Hexagon, ArrowRight, Lock, Mail } from "lucide-react";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login(email, password);
    }, 600);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(265_90%_65%/0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(220_70%_55%/0.1),transparent_50%)]" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

      <div className="glass-card rounded-2xl p-8 w-full max-w-md mx-4 animate-fade-in relative z-10 shadow-[0_0_60px_-20px_hsl(var(--primary)/0.2)]">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl gradient-btn flex items-center justify-center group relative">
            <Hexagon className="w-6 h-6 transition-transform duration-500 group-hover:rotate-180" />
            <div className="absolute inset-0 rounded-xl bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          <h1 className="text-3xl font-display font-bold gradient-text">NexusDAO</h1>
        </div>

        <p className="text-center text-muted-foreground mb-8">Connect to the decentralized network</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="group">
            <label className="text-sm text-muted-foreground mb-1.5 block">Email</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="satoshi@example.com"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all duration-200"
              />
            </div>
          </div>
          <div className="group">
            <label className="text-sm text-muted-foreground mb-1.5 block">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all duration-200"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full gradient-btn py-3.5 rounded-lg font-medium flex items-center justify-center gap-2 mt-6 group disabled:opacity-70"
          >
            {loading ? (
              <LoadingSpinner size="sm" />
            ) : (
              <>
                Launch Dashboard
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Secured by zero-knowledge proofs
        </p>
      </div>
    </div>
  );
};

export default Login;
