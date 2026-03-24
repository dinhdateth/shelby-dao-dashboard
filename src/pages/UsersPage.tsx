import { useState } from "react";
import { UserPlus, Sparkles } from "lucide-react";
import { mockApi, User } from "@/lib/mockStore";
import { DashboardLayout } from "@/components/DashboardLayout";

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>(mockApi.getUsers());
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleAdd = () => {
    if (!name.trim() || !email.trim()) return;
    mockApi.addUser(name, email);
    setUsers(mockApi.getUsers());
    setName("");
    setEmail("");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="opacity-0 animate-fade-in" style={{ animationFillMode: "forwards" }}>
          <h1 className="text-2xl font-display font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage network participants</p>
        </div>

        <div
          className="glass-card rounded-xl p-6 opacity-0 animate-fade-in"
          style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
        >
          <h2 className="font-display font-semibold mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-accent" /> Add User
          </h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="flex-1 px-4 py-2.5 rounded-lg bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all duration-200"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="flex-1 px-4 py-2.5 rounded-lg bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all duration-200"
            />
            <button
              onClick={handleAdd}
              className="gradient-btn px-6 py-2.5 rounded-lg font-medium flex items-center gap-2 group"
            >
              <UserPlus className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" /> Add
            </button>
          </div>
        </div>

        <div
          className="glass-card rounded-xl overflow-hidden opacity-0 animate-fade-in"
          style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50 bg-muted/20">
                  <th className="text-left text-xs text-muted-foreground font-medium px-6 py-3 uppercase tracking-wider">Name</th>
                  <th className="text-left text-xs text-muted-foreground font-medium px-6 py-3 uppercase tracking-wider">Email</th>
                  <th className="text-left text-xs text-muted-foreground font-medium px-6 py-3 uppercase tracking-wider">Wallet</th>
                  <th className="text-left text-xs text-muted-foreground font-medium px-6 py-3 uppercase tracking-wider">Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, i) => (
                  <tr
                    key={u.id}
                    className="border-b border-border/20 last:border-0 hover:bg-muted/20 transition-colors duration-150 group"
                  >
                    <td className="px-6 py-4 text-sm font-medium group-hover:text-primary transition-colors duration-150">{u.name}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{u.email}</td>
                    <td className="px-6 py-4 text-sm font-mono text-primary/80">{u.wallet}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{u.joinedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UsersPage;
