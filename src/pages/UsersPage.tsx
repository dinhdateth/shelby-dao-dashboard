import { useState } from "react";
import { UserPlus } from "lucide-react";
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
        <h1 className="text-2xl font-display font-bold">Users</h1>

        <div className="glass-card rounded-xl p-6">
          <h2 className="font-display font-semibold mb-4">Add User</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="flex-1 px-4 py-2.5 rounded-lg bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="flex-1 px-4 py-2.5 rounded-lg bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
            <button onClick={handleAdd} className="gradient-btn px-6 py-2.5 rounded-lg font-medium flex items-center gap-2">
              <UserPlus className="w-4 h-4" /> Add
            </button>
          </div>
        </div>

        <div className="glass-card rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left text-xs text-muted-foreground font-medium px-6 py-3">Name</th>
                  <th className="text-left text-xs text-muted-foreground font-medium px-6 py-3">Email</th>
                  <th className="text-left text-xs text-muted-foreground font-medium px-6 py-3">Wallet</th>
                  <th className="text-left text-xs text-muted-foreground font-medium px-6 py-3">Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b border-border/30 last:border-0 hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium">{u.name}</td>
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
