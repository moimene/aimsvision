import { AppLayout, PageHeader } from "@/components/layout";

export default function Governance() {
  return (
    <AppLayout>
      <PageHeader
        title="Governance & Accountability"
        subtitle="Define and track responsibility assignments, approvals, and human oversight requirements."
      />
      <div className="p-[var(--g-space-6)]">
        {/* RACI Matrix */}
        <section aria-labelledby="raci-matrix">
          <h2 
            id="raci-matrix" 
            className="text-sm font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider mb-[var(--g-space-4)]"
          >
            RACI Matrix
          </h2>
          <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-lg)] p-[var(--g-space-6)]">
            <p className="text-sm text-[hsl(var(--g-text-secondary))]">
              RACI (Responsible, Accountable, Consulted, Informed) assignments per AI system will be implemented in Phase 4.
            </p>
          </div>
        </section>

        {/* Approval History */}
        <section aria-labelledby="approval-history" className="mt-[var(--g-space-7)]">
          <h2 
            id="approval-history" 
            className="text-sm font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider mb-[var(--g-space-4)]"
          >
            Approval History
          </h2>
          <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-lg)] p-[var(--g-space-6)]">
            <p className="text-sm text-[hsl(var(--g-text-secondary))]">
              Approval log with date, approver, and action will be implemented in Phase 4.
            </p>
          </div>
        </section>

        {/* Human Oversight Requirements */}
        <section aria-labelledby="oversight-requirements" className="mt-[var(--g-space-7)]">
          <h2 
            id="oversight-requirements" 
            className="text-sm font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider mb-[var(--g-space-4)]"
          >
            Human Oversight Requirements
          </h2>
          <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-lg)] p-[var(--g-space-6)]">
            <p className="text-sm text-[hsl(var(--g-text-secondary))]">
              Oversight rules and escalation paths will be implemented in Phase 4.
            </p>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
