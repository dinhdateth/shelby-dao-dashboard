import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: string;
  delay?: number;
}

export function StatCard({ title, value, icon: Icon, change, delay = 0 }: StatCardProps) {
  return (
    <div
      className="glass-card-hover rounded-xl p-6 group opacity-0 animate-fade-in"
      style={{ animationDelay: `${delay}ms`, animationFillMode: "forwards" }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-3xl font-display font-bold mt-1 tracking-tight">{value}</p>
          {change && (
            <p className="text-xs text-green-400 mt-2 flex items-center gap-1">
              <span className="inline-block w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[6px] border-b-green-400" />
              {change}
            </p>
          )}
        </div>
        <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110 group-hover:shadow-[0_0_20px_-4px_hsl(var(--primary)/0.4)]">
          <Icon className="w-5 h-5 text-primary transition-transform duration-300 group-hover:scale-110" />
        </div>
      </div>
    </div>
  );
}
