import { AppLayout, PageHeader } from "@/components/layout";

export default function Monitoring() {
  return (
    <AppLayout>
      <PageHeader
        title="Monitoring & Evidence"
        subtitle="Turn operational data into ISO-compliant audit evidence with event tracking and KPI monitoring."
      />
      <div className="p-[var(--g-space-6)]">
        {/* Event Timeline */}
        <section aria-labelledby="event-timeline">
          <h2 
            id="event-timeline" 
            className="text-sm font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider mb-[var(--g-space-4)]"
          >
            Event Timeline
          </h2>
          <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-lg)] p-[var(--g-space-6)]">
            <p className="text-sm text-[hsl(var(--g-text-secondary))]">
              Chronological event log will be implemented in Phase 4.
            </p>
          </div>
        </section>

        {/* KPI Metrics */}
        <section aria-labelledby="kpi-metrics" className="mt-[var(--g-space-7)]">
          <h2 
            id="kpi-metrics" 
            className="text-sm font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider mb-[var(--g-space-4)]"
          >
            KPI Metrics
          </h2>
          <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-lg)] p-[var(--g-space-6)]">
            <p className="text-sm text-[hsl(var(--g-text-secondary))]">
              Key performance indicators table will be implemented in Phase 4.
            </p>
          </div>
        </section>

        {/* Evidence Export */}
        <section aria-labelledby="evidence-export" className="mt-[var(--g-space-7)]">
          <h2 
            id="evidence-export" 
            className="text-sm font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider mb-[var(--g-space-4)]"
          >
            Evidence Pack Export
          </h2>
          <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-lg)] p-[var(--g-space-5)]">
            <div className="flex flex-wrap gap-[var(--g-space-3)]">
              <button 
                type="button"
                disabled
                className="px-[var(--g-space-4)] py-[var(--g-space-2)] text-sm font-medium text-[hsl(var(--g-text-secondary))] bg-[hsl(var(--g-surface-subtle))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-md)] opacity-60 cursor-not-allowed"
                aria-label="Export as PDF (disabled)"
              >
                Export PDF
              </button>
              <button 
                type="button"
                disabled
                className="px-[var(--g-space-4)] py-[var(--g-space-2)] text-sm font-medium text-[hsl(var(--g-text-secondary))] bg-[hsl(var(--g-surface-subtle))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-md)] opacity-60 cursor-not-allowed"
                aria-label="Export as Markdown (disabled)"
              >
                Export Markdown
              </button>
              <button 
                type="button"
                disabled
                className="px-[var(--g-space-4)] py-[var(--g-space-2)] text-sm font-medium text-[hsl(var(--g-text-secondary))] bg-[hsl(var(--g-surface-subtle))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-md)] opacity-60 cursor-not-allowed"
                aria-label="Export as JSON (disabled)"
              >
                Export JSON
              </button>
            </div>
            <p className="text-xs text-[hsl(var(--g-text-secondary))] mt-[var(--g-space-3)]">
              Export functionality will be enabled in Phase 4.
            </p>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
