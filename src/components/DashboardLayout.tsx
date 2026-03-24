import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Wifi, Copy, Check } from "lucide-react";
import { useAuth } from "@/lib/authContext";
import { useState } from "react";

export function DashboardLayout({ children }: { children: ReactNode }) {
  const { walletShort, walletAddress } = useAuth();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center border-b border-border/50 px-4 backdrop-blur-sm bg-background/80">
            <SidebarTrigger className="text-muted-foreground hover:text-foreground transition-colors duration-200" />
            <div className="ml-auto flex items-center gap-3">
              {/* Wallet address badge */}
              {walletShort && (
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/30 border border-border/50 hover:border-primary/30 transition-all duration-200 group"
                >
                  <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_2px_hsl(var(--primary)/0.4)] animate-pulse-glow" />
                  <span className="text-xs font-mono text-muted-foreground group-hover:text-foreground transition-colors">
                    {walletShort}
                  </span>
                  {copied ? (
                    <Check className="w-3 h-3 text-green-400" />
                  ) : (
                    <Copy className="w-3 h-3 text-muted-foreground group-hover:text-foreground transition-colors" />
                  )}
                </button>
              )}

              {/* Connected status */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/30 border border-border/50">
                <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_2px_hsl(142_76%_55%/0.4)] animate-pulse-glow" />
                <Wifi className="w-3 h-3 text-green-400" />
                <span className="text-xs text-green-400 font-medium">Connected</span>
              </div>
            </div>
          </header>
          <main className="flex-1 p-6 overflow-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
