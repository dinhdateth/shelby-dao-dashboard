import { useState } from "react";
import { useAuth } from "@/lib/authContext";
import { Hexagon, Wallet, ExternalLink, AlertCircle } from "lucide-react";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const Login = () => {
  const { connectWallet, connecting, error, isPetraInstalled } = useAuth();

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

        <p className="text-center text-muted-foreground mb-8">
          Connect your Petra wallet to access the network
        </p>

        <div className="space-y-4">
          {/* Error / Install message */}
          {(error || !isPetraInstalled) && (
            <div className="flex items-start gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-destructive font-medium">
                  {error || "Petra wallet not detected"}
                </p>
                {!isPetraInstalled && (
                  <a
                    href="https://petra.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline mt-1 inline-flex items-center gap-1"
                  >
                    Install Petra Wallet <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Connect button */}
          <button
            onClick={connectWallet}
            disabled={connecting}
            className="w-full gradient-btn py-3.5 rounded-lg font-medium flex items-center justify-center gap-3 group disabled:opacity-70"
          >
            {connecting ? (
              <LoadingSpinner size="sm" />
            ) : (
              <>
                <Wallet className="w-5 h-5" />
                Connect Petra Wallet
              </>
            )}
          </button>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Powered by Aptos blockchain
        </p>
      </div>
    </div>
  );
};

export default Login;
