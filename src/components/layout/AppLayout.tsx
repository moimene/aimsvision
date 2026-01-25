import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-[hsl(var(--g-surface-base))]">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          {/* Global Header */}
          <header 
            className="h-14 flex items-center justify-between px-[var(--g-space-4)] border-b border-[hsl(var(--g-border-default))] bg-[hsl(var(--g-surface-card))]"
            role="banner"
          >
            <div className="flex items-center gap-[var(--g-space-3)]">
              <SidebarTrigger 
                className="text-[hsl(var(--g-text-secondary))] hover:text-[hsl(var(--g-text-primary))] hover:bg-[hsl(var(--g-surface-hover))] rounded-[var(--g-radius-sm)] p-[var(--g-space-2)]"
                aria-label="Toggle navigation sidebar"
              />
            </div>
            <div className="flex items-center gap-[var(--g-space-2)] text-sm text-[hsl(var(--g-text-secondary))]">
              <span>Designed by <strong className="text-[hsl(var(--g-text-primary))] font-semibold">Garrigues</strong></span>
              <span className="text-[hsl(var(--g-border-strong))]">·</span>
              <span>Powered by <strong className="text-[hsl(var(--g-text-primary))] font-semibold">Galtea</strong></span>
            </div>
          </header>

          {/* Main Content Area */}
          <main 
            className="flex-1 overflow-auto"
            role="main"
          >
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
