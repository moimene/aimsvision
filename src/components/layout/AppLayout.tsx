import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { HarveyChat } from "@/components/HarveyChat";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-[hsl(var(--g-surface-base))]">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          {/* Global Header with Garrigues brand accent */}
          <header 
            className="h-14 flex items-center justify-between px-[var(--g-space-4)] border-b border-[hsl(var(--g-border-default))] bg-[hsl(var(--g-surface-card))] relative"
            role="banner"
          >
            {/* Brand accent line */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[hsl(var(--g-brand-primary))] via-[hsl(var(--g-brand-sec-700))] to-[hsl(var(--g-brand-bright))]" />
            
            <div className="flex items-center gap-[var(--g-space-3)]">
              <SidebarTrigger 
                className="text-[hsl(var(--g-text-secondary))] hover:text-[hsl(var(--g-brand-primary))] hover:bg-[hsl(var(--g-surface-hover))] rounded-[var(--g-radius-md)] p-[var(--g-space-2)] transition-colors"
                aria-label="Toggle navigation sidebar"
              />
            </div>
            <div className="flex items-center gap-[var(--g-space-3)] text-sm">
              <span className="text-[hsl(var(--g-text-secondary))]">Designed by</span>
              <span className="font-bold text-[hsl(var(--g-brand-primary))] tracking-tight">Garrigues</span>
              <span className="w-px h-4 bg-[hsl(var(--g-border-default))]" />
              <span className="text-[hsl(var(--g-text-secondary))]">Powered by</span>
              <span className="font-bold text-[hsl(var(--g-text-primary))] tracking-tight">g-digital</span>
            </div>
          </header>

          {/* Main Content Area */}
          <main 
            className="flex-1 overflow-auto scrollbar-garrigues"
            role="main"
          >
            {children}
          </main>
        </div>
      </div>
      <HarveyChat />
    </SidebarProvider>
  );
}
