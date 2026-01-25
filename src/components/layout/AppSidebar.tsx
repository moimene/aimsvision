import {
  LayoutDashboard,
  Database,
  Users,
  AlertTriangle,
  Shield,
  Activity,
  AlertCircle,
  ClipboardCheck,
  Scale,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Overview",
    subtitle: "AIMS Status",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "AI Inventory",
    subtitle: "AI Systems & Scope",
    url: "/inventory",
    icon: Database,
  },
  {
    title: "Governance",
    subtitle: "Accountability & Approvals",
    url: "/governance",
    icon: Users,
  },
  {
    title: "Risk Management",
    subtitle: "AI Risk Register",
    url: "/risks",
    icon: AlertTriangle,
  },
  {
    title: "Operational Controls",
    subtitle: "Guardrails & Rules",
    url: "/controls",
    icon: Shield,
  },
  {
    title: "Monitoring",
    subtitle: "Evidence & KPIs",
    url: "/monitoring",
    icon: Activity,
  },
  {
    title: "Incidents",
    subtitle: "Continuous Improvement",
    url: "/incidents",
    icon: AlertCircle,
  },
  {
    title: "Audit",
    subtitle: "Certification Readiness",
    url: "/audit",
    icon: ClipboardCheck,
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-[hsl(var(--sidebar-border))] bg-[hsl(var(--sidebar-background))] shadow-lg"
    >
      <SidebarContent className="scrollbar-garrigues">
        {/* Logo / Brand Header */}
        <div 
          className={`flex items-center gap-3 h-16 px-4 border-b border-[hsl(var(--sidebar-border)/0.5)] ${isCollapsed ? 'justify-center px-2' : ''}`}
        >
          {/* Garrigues Logo Icon */}
          <div className="flex items-center justify-center w-8 h-8 rounded-md bg-[hsl(var(--sidebar-accent))] shrink-0">
            <Scale className="h-5 w-5 text-[hsl(var(--sidebar-foreground))]" aria-hidden="true" />
          </div>
          
          {!isCollapsed && (
            <div className="flex flex-col min-w-0">
              <h1 className="text-sm font-bold text-[hsl(var(--sidebar-foreground))] tracking-tight truncate">
                AIMS Console
              </h1>
              <p className="text-xs text-[hsl(var(--sidebar-foreground)/0.7)] truncate">
                ISO/IEC 42001
              </p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <SidebarGroup className="py-4">
          <SidebarGroupLabel 
            className={`px-4 mb-2 text-[10px] font-medium text-[hsl(var(--sidebar-foreground)/0.6)] uppercase tracking-widest ${isCollapsed ? 'sr-only' : ''}`}
          >
            Modules
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="px-2 space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className={`
                        flex items-center gap-3 px-3 py-2.5 rounded-lg
                        text-[hsl(var(--sidebar-foreground)/0.8)]
                        hover:bg-[hsl(var(--sidebar-accent)/0.5)] hover:text-[hsl(var(--sidebar-foreground))]
                        transition-all duration-150 ease-out
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--sidebar-ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--sidebar-background))]
                        ${isCollapsed ? 'justify-center' : ''}
                      `}
                      activeClassName="bg-[hsl(var(--sidebar-accent))] text-[hsl(var(--sidebar-accent-foreground))] font-medium shadow-sm"
                      aria-label={`${item.title}: ${item.subtitle}`}
                    >
                      <item.icon 
                        className="h-5 w-5 shrink-0" 
                        aria-hidden="true"
                      />
                      {!isCollapsed && (
                        <div className="flex flex-col min-w-0">
                          <span className="text-sm font-medium truncate">{item.title}</span>
                          <span className="text-[11px] text-[hsl(var(--sidebar-foreground)/0.6)] truncate">
                            {item.subtitle}
                          </span>
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t border-[hsl(var(--sidebar-border)/0.5)] p-4">
        {!isCollapsed && (
          <div className="text-[10px] text-[hsl(var(--sidebar-foreground)/0.5)] text-center uppercase tracking-wider">
            Garrigues AIMS v1.0
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
