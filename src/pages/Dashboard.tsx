import { useState, useEffect } from "react";
import { Users, Upload, Activity, Shield } from "lucide-react";
import { mockApi } from "@/lib/mockStore";
import { StatCard } from "@/components/StatCard";
import { DashboardLayout } from "@/components/DashboardLayout";
import { FullPageLoader } from "@/components/LoadingSpinner";

const Dashboard = () => {
  const [stats, setStats] = useState<ReturnType<typeof mockApi.getStats> | null>(null);
  const [activities, setActivities] = useState(mockApi.getActivities());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStats(mockApi.getStats());
      setActivities(mockApi.getActivities());
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <FullPageLoader />;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="opacity-0 animate-fade-in" style={{ animationFillMode: "forwards" }}>
          <h1 className="text-2xl font-display font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">Network overview & analytics</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Users" value={stats!.totalUsers} icon={Users} change="12% this month" delay={100} />
          <StatCard title="Total Uploads" value={stats!.totalUploads} icon={Upload} change="8% this week" delay={200} />
          <StatCard title="Transactions" value={stats!.totalTransactions.toLocaleString()} icon={Activity} change="24% today" delay={300} />
          <StatCard title="Network Health" value={`${stats!.networkHealth}%`} icon={Shield} delay={400} />
        </div>

        <div
          className="glass-card rounded-xl p-6 opacity-0 animate-fade-in"
          style={{ animationDelay: "500ms", animationFillMode: "forwards" }}
        >
          <h2 className="font-display font-semibold mb-4 tracking-tight">Recent Activity</h2>
          <div className="space-y-1">
            {activities.slice(0, 6).map((a, i) => (
              <div
                key={a.id}
                className="flex items-center gap-3 py-3 px-3 -mx-3 rounded-lg border-b border-border/30 last:border-0 hover:bg-muted/20 transition-all duration-200 cursor-default group"
              >
                <div className="glow-dot flex-shrink-0 transition-shadow duration-300 group-hover:shadow-[0_0_12px_3px_hsl(var(--primary)/0.6)]" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate group-hover:text-foreground transition-colors">{a.action}</p>
                  <p className="text-xs text-muted-foreground">{a.user}</p>
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
