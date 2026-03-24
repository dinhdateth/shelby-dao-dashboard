import { useState, useEffect } from "react";
import { Users, Upload, Activity, Shield, Wallet, FileUp, ArrowUpDown } from "lucide-react";
import { mockApi } from "@/lib/mockStore";
import { useAuth } from "@/lib/authContext";
import { StatCard } from "@/components/StatCard";
import { DashboardLayout } from "@/components/DashboardLayout";
import { FullPageLoader } from "@/components/LoadingSpinner";

const Dashboard = () => {
  const { walletAddress } = useAuth();
  const [stats, setStats] = useState<ReturnType<typeof mockApi.getStats> | null>(null);
  const [walletStats, setWalletStats] = useState<ReturnType<typeof mockApi.getWalletStats> | null>(null);
  const [activities, setActivities] = useState(mockApi.getActivities());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStats(mockApi.getStats());
      if (walletAddress) setWalletStats(mockApi.getWalletStats(walletAddress));
      setActivities(mockApi.getActivities());
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [walletAddress]);

  if (loading) return <FullPageLoader />;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="opacity-0 animate-fade-in" style={{ animationFillMode: "forwards" }}>
          <h1 className="text-2xl font-display font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">Network overview & analytics</p>
        </div>

        {/* Network stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Users" value={stats!.totalUsers} icon={Users} change="12% this month" delay={100} />
          <StatCard title="Total Uploads" value={stats!.totalUploads} icon={Upload} change="8% this week" delay={200} />
          <StatCard title="Transactions" value={stats!.totalTransactions.toLocaleString()} icon={Activity} change="24% today" delay={300} />
          <StatCard title="Network Health" value={`${stats!.networkHealth}%`} icon={Shield} delay={400} />
        </div>

        {/* Wallet-specific stats */}
        {walletStats && (
          <div
            className="opacity-0 animate-fade-in"
            style={{ animationDelay: "450ms", animationFillMode: "forwards" }}
          >
            <h2 className="font-display font-semibold mb-3 flex items-center gap-2 text-sm text-muted-foreground uppercase tracking-wider">
              <Wallet className="w-4 h-4 text-primary" /> Your Wallet
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard title="Your Users" value={walletStats.myUsers} icon={Users} delay={500} />
              <StatCard title="Your Uploads" value={walletStats.myUploads} icon={FileUp} delay={550} />
              <StatCard title="Your TXs" value={walletStats.myTransactions} icon={ArrowUpDown} delay={600} />
            </div>
          </div>
        )}

        <div
          className="glass-card rounded-xl p-6 opacity-0 animate-fade-in"
          style={{ animationDelay: "650ms", animationFillMode: "forwards" }}
        >
          <h2 className="font-display font-semibold mb-4 tracking-tight">Recent Activity</h2>
          <div className="space-y-1">
            {activities.slice(0, 6).map((a) => (
              <div
                key={a.id}
                className="flex items-center gap-3 py-3 px-3 -mx-3 rounded-lg border-b border-border/30 last:border-0 hover:bg-muted/20 transition-all duration-200 cursor-default group"
              >
                <div className="glow-dot flex-shrink-0 transition-shadow duration-300 group-hover:shadow-[0_0_12px_3px_hsl(var(--primary)/0.6)]" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate group-hover:text-foreground transition-colors">{a.action}</p>
                  <p className="text-xs text-muted-foreground font-mono">{mockApi.shortWallet(a.wallet)}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
