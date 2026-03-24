import { useState } from "react";
import { UserPlus, Sparkles, Filter } from "lucide-react";
import { mockApi, User } from "@/lib/mockStore";
import { useAuth } from "@/lib/authContext";
import { DashboardLayout } from "@/components/DashboardLayout";

const UsersPage = () => {
  const { email: currentEmail } = useAuth();
  const [users, setUsers] = useState<User[]>(mockApi.getUsers());
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showMine, setShowMine] = useState(false);

  const handleAdd = () => {
    if (!name.trim() || !email.trim() || !currentEmail) return;
    mockApi.addUser(name, email, currentEmail);
    setUsers(mockApi.getUsers());
    setName("");
    setEmail("");
  };

  const displayedUsers = showMine && currentEmail
    ? users.filter((u) => u.addedBy === currentEmail)
    : users;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between opacity-0 animate-fade-in" style={{ animationFillMode: "forwards" }}>
          <div>
            <h1 className="text-2xl font-display font-bold tracking-tight">Users</h1>
            <p className="text-muted-foreground text-sm mt-1">Manage network participants</p>
          </div>
          <button
            onClick={() => setShowMine(!showMine)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              showMine
                ? "gradient-btn"
                : "bg-muted/50 border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
            }`}
          >
            <Filter className="w-4 h-4" />
            {showMine ? "My Users" : "All Users"}
          </button>
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
                  <th className="text-left text-xs text-muted-foreground font-medium px-6 py-3 uppercase tracking-wider">Added By</th>
                  <th className="text-left text-xs text-muted-foreground font-medium px-6 py-3 uppercase tracking-wider">Joined</th>
                </tr>
              </thead>
              <tbody>
                {displayedUsers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-sm text-muted-foreground">
                      No users added by you yet
                    </td>
                  </tr>
                ) : (
                  displayedUsers.map((u) => (
                    <tr
                      key={u.id}
                      className="border-b border-border/20 last:border-0 hover:bg-muted/20 transition-colors duration-150 group"
                    >
                      <td className="px-6 py-4 text-sm font-medium group-hover:text-primary transition-colors duration-150">{u.name}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{u.email}</td>
                      <td className="px-6 py-4 text-sm font-mono text-primary/80">{u.wallet}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {u.addedBy === "system" ? (
                          <span className="px-2 py-0.5 rounded-full bg-muted/50 text-xs">System</span>
                        ) : u.addedBy === currentEmail ? (
                          <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">You</span>
                        ) : (
                          u.addedBy
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{u.joinedAt}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UsersPage;
