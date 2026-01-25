import { AppLayout, PageHeader } from "@/components/layout";

export default function RiskManagement() {
  return (
    <AppLayout>
      <PageHeader
        title="AI Risk Management"
        subtitle="Operate a living AI risk register with impact assessment, control mapping, and acceptance tracking."
      />
      <div className="p-[var(--g-space-6)]">
        {/* Risk Register */}
        <section aria-labelledby="risk-register">
          <h2 
            id="risk-register" 
            className="text-sm font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider mb-[var(--g-space-4)]"
          >
            Risk Register
          </h2>
          <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-lg)] overflow-hidden">
            {/* Table Header */}
            <div className="bg-[hsl(var(--g-surface-subtle))] border-b border-[hsl(var(--g-border-default))] px-[var(--g-space-4)] py-[var(--g-space-3)]">
              <div className="grid grid-cols-7 gap-[var(--g-space-4)] text-xs font-medium text-[hsl(var(--g-text-primary))] uppercase tracking-wider">
                <span>Risk ID</span>
                <span>Description</span>
                <span>Impact</span>
                <span>Probability</span>
                <span>Score</span>
                <span>Status</span>
                <span>Owner</span>
              </div>
            </div>
            {/* Table Body Placeholder */}
            <div className="p-[var(--g-space-6)] text-center">
              <p className="text-sm text-[hsl(var(--g-text-secondary))]">
                Risk register data with 20+ entries will be populated in Phase 4.
              </p>
            </div>
          </div>
        </section>

        {/* Risk-to-Control Mapping */}
        <section aria-labelledby="control-mapping" className="mt-[var(--g-space-7)]">
          <h2 
            id="control-mapping" 
            className="text-sm font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider mb-[var(--g-space-4)]"
          >
            Risk-to-Control Mapping
          </h2>
          <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-lg)] p-[var(--g-space-6)]">
            <p className="text-sm text-[hsl(var(--g-text-secondary))]">
              Mapping of risks to mitigating controls will be implemented in Phase 4.
            </p>
          </div>
        </section>

        {/* Residual Risk Acceptance */}
        <section aria-labelledby="risk-acceptance" className="mt-[var(--g-space-7)]">
          <h2 
            id="risk-acceptance" 
            className="text-sm font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider mb-[var(--g-space-4)]"
          >
            Residual Risk Acceptance Log
          </h2>
          <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-lg)] p-[var(--g-space-6)]">
            <p className="text-sm text-[hsl(var(--g-text-secondary))]">
              Sign-off tracking for accepted residual risks will be implemented in Phase 4.
            </p>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
