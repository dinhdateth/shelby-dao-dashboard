import { useState } from "react";
import { useAuth } from "@/lib/authContext";
import { Hexagon, ArrowRight } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(265_90%_65%/0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(220_70%_55%/0.1),transparent_50%)]" />

      <div className="glass-card rounded-2xl p-8 w-full max-w-md mx-4 animate-fade-in relative z-10">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl gradient-btn flex items-center justify-center">
            <Hexagon className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-display font-bold gradient-text">NexusDAO</h1>
        </div>

        <p className="text-center text-muted-foreground mb-8">Connect to the decentralized network</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground mb-1.5 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="satoshi@example.com"
              className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1.5 block">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
            />
          </div>
          <button
            type="submit"
            className="w-full gradient-btn py-3 rounded-lg font-medium flex items-center justify-center gap-2 mt-6"
          >
            Launch Dashboard <ArrowRight className="w-4 h-4" />
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
