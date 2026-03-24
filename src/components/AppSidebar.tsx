import { LayoutDashboard, Users, Upload, LogOut, Hexagon, Zap } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useAuth } from "@/lib/authContext";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Users", url: "/users", icon: Users },
  { title: "Uploads", url: "/uploads", icon: Upload },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { logout } = useAuth();

  return (
    <Sidebar collapsible="icon" className="border-r border-border/50">
      <div className="p-4 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl gradient-btn flex items-center justify-center flex-shrink-0 relative group">
          <Hexagon className="w-4 h-4 transition-transform duration-300 group-hover:rotate-90" />
          <div className="absolute inset-0 rounded-xl bg-primary/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        {!collapsed && (
          <div className="flex items-center gap-2">
            <span className="font-display text-lg font-bold gradient-text">NexusDAO</span>
            <Zap className="w-3.5 h-3.5 text-accent animate-pulse" />
          </div>
        )}
      </div>

      {!collapsed && (
        <div className="px-4 pb-3">
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>
      )}

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item, i) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className="hover:bg-sidebar-accent/60 rounded-lg transition-all duration-200 group/nav"
                      activeClassName="bg-sidebar-accent text-primary font-medium shadow-[inset_0_0_0_1px_hsl(var(--primary)/0.2)]"
                    >
                      <div className="relative">
                        <item.icon className="mr-2 h-4 w-4 flex-shrink-0 transition-all duration-200 group-hover/nav:text-primary group-hover/nav:drop-shadow-[0_0_6px_hsl(var(--primary)/0.5)]" />
                      </div>
                      {!collapsed && (
                        <span className="transition-colors duration-200">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-2">
        {!collapsed && (
          <div className="px-2 pb-2">
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>
        )}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={logout}
              className="hover:bg-destructive/10 text-muted-foreground hover:text-destructive rounded-lg transition-all duration-200 group/logout"
            >
              <LogOut className="mr-2 h-4 w-4 transition-transform duration-200 group-hover/logout:-translate-x-0.5" />
              {!collapsed && <span>Logout</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
