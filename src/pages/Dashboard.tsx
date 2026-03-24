import { useState, useEffect } from "react";
import { Users, Upload, Activity, Shield } from "lucide-react";
import { mockApi } from "@/lib/mockStore";
import { StatCard } from "@/components/StatCard";
import { DashboardLayout } from "@/components/DashboardLayout";

const Dashboard = () => {
  const [stats, setStats] = useState(mockApi.getStats());
  const [activities, setActivities] = useState(mockApi.getActivities());

  useEffect(() => {
    setStats(mockApi.getStats());
    setActivities(mockApi.getActivities());
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold">Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">Network overview & analytics</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Users" value={stats.totalUsers} icon={Users} change="12% this month" />
          <StatCard title="Total Uploads" value={stats.totalUploads} icon={Upload} change="8% this week" />
          <StatCard title="Transactions" value={stats.totalTransactions.toLocaleString()} icon={Activity} change="24% today" />
          <StatCard title="Network Health" value={`${stats.networkHealth}%`} icon={Shield} />
        </div>

        <div className="glass-card rounded-xl p-6">
          <h2 className="font-display font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {activities.slice(0, 6).map((a) => (
              <div key={a.id} className="flex items-center gap-3 py-2 border-b border-border/50 last:border-0">
                <div className="glow-dot flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{a.action}</p>
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
