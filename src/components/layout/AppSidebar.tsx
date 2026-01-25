import {
  LayoutDashboard,
  Database,
  Users,
  AlertTriangle,
  Shield,
  Activity,
  AlertCircle,
  ClipboardCheck,
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
      className="border-r border-[hsl(var(--g-border-default))] bg-[hsl(var(--g-surface-card))]"
    >
      <SidebarContent>
        {/* Logo / Brand */}
        <div 
          className={`flex items-center h-14 px-[var(--g-space-4)] border-b border-[hsl(var(--g-border-subtle))] ${isCollapsed ? 'justify-center px-[var(--g-space-2)]' : ''}`}
        >
          {isCollapsed ? (
            <span 
              className="text-lg font-bold text-[hsl(var(--g-text-primary))]"
              aria-label="AIMS Console"
            >
              A
            </span>
          ) : (
            <div>
              <h1 className="text-sm font-semibold text-[hsl(var(--g-text-primary))] tracking-tight">
                AIMS Console
              </h1>
              <p className="text-xs text-[hsl(var(--g-text-secondary))]">
                ISO/IEC 42001
              </p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel 
            className={`text-xs font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider ${isCollapsed ? 'sr-only' : ''}`}
          >
            Modules
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="flex items-center gap-[var(--g-space-3)] px-[var(--g-space-3)] py-[var(--g-space-2)] rounded-[var(--g-radius-sm)] text-[hsl(var(--g-text-secondary))] hover:bg-[hsl(var(--g-surface-hover))] hover:text-[hsl(var(--g-text-primary))] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--g-focus-ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--g-focus-ring-offset))]"
                      activeClassName="bg-[hsl(var(--g-surface-subtle))] text-[hsl(var(--g-text-primary))] font-medium"
                      aria-label={`${item.title}: ${item.subtitle}`}
                    >
                      <item.icon 
                        className="h-5 w-5 shrink-0" 
                        aria-hidden="true"
                      />
                      {!isCollapsed && (
                        <div className="flex flex-col min-w-0">
                          <span className="text-sm truncate">{item.title}</span>
                          <span className="text-xs text-[hsl(var(--g-text-secondary))] truncate">
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
    </Sidebar>
  );
}
