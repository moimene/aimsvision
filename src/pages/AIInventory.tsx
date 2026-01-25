import { AppLayout, PageHeader } from "@/components/layout";

export default function AIInventory() {
  return (
    <AppLayout>
      <PageHeader
        title="AI Inventory & Scope"
        subtitle="Single source of truth for all managed AI systems within the organization."
      />
      <div className="p-[var(--g-space-6)]">
        <section aria-labelledby="asset-register">
          <h2 
            id="asset-register" 
            className="text-sm font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider mb-[var(--g-space-4)]"
          >
            AI Asset Register
          </h2>
          <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-lg)] overflow-hidden">
            {/* Table Header */}
            <div className="bg-[hsl(var(--g-surface-subtle))] border-b border-[hsl(var(--g-border-default))] px-[var(--g-space-4)] py-[var(--g-space-3)]">
              <div className="grid grid-cols-6 gap-[var(--g-space-4)] text-xs font-medium text-[hsl(var(--g-text-primary))] uppercase tracking-wider">
                <span>System Name</span>
                <span>Risk Level</span>
                <span>Status</span>
                <span>Provider</span>
                <span>Business Unit</span>
                <span>Lifecycle</span>
              </div>
            </div>
            {/* Table Body Placeholder */}
            <div className="p-[var(--g-space-6)] text-center">
              <p className="text-sm text-[hsl(var(--g-text-secondary))]">
                Asset register data will be populated in Phase 4.
              </p>
              <p className="text-xs text-[hsl(var(--g-text-secondary))] mt-[var(--g-space-2)]">
                Columns: System Name, Risk Level, Status, Provider, Business Unit, Lifecycle State
              </p>
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
