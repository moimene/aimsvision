import { AppLayout, PageHeader } from "@/components/layout";
import { Shield } from "lucide-react";

export default function OperationalControls() {
  return (
    <AppLayout>
      <PageHeader
        title="Operational Controls & Guardrails"
        subtitle="Execute governance decisions in production through configurable guardrails and decision rules."
      />
      <div className="p-[var(--g-space-6)]">
        {/* Phase 2 Notice */}
        <div className="bg-[hsl(var(--g-surface-subtle))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-lg)] p-[var(--g-space-5)] mb-[var(--g-space-6)]">
          <div className="flex items-start gap-[var(--g-space-3)]">
            <Shield className="h-5 w-5 text-[hsl(var(--g-text-secondary))] shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-sm font-medium text-[hsl(var(--g-text-primary))]">Phase 2 Module</p>
              <p className="text-sm text-[hsl(var(--g-text-secondary))] mt-[var(--g-space-1)]">
                This module is scheduled for Phase 2 implementation. Structure is prepared for future development.
              </p>
            </div>
          </div>
        </div>

        {/* Guardrail Configuration Placeholder */}
        <section aria-labelledby="guardrails">
          <h2 
            id="guardrails" 
            className="text-sm font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider mb-[var(--g-space-4)]"
          >
            Guardrail Configuration
          </h2>
          <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-lg)] overflow-hidden">
            <div className="bg-[hsl(var(--g-surface-subtle))] border-b border-[hsl(var(--g-border-default))] px-[var(--g-space-4)] py-[var(--g-space-3)]">
              <div className="grid grid-cols-5 gap-[var(--g-space-4)] text-xs font-medium text-[hsl(var(--g-text-primary))] uppercase tracking-wider">
                <span>Guardrail ID</span>
                <span>Rule Name</span>
                <span>Decision</span>
                <span>Human Override</span>
                <span>Version</span>
              </div>
            </div>
            <div className="p-[var(--g-space-6)] text-center">
              <p className="text-sm text-[hsl(var(--g-text-secondary))]">
                Guardrail configuration table structure prepared for Phase 2.
              </p>
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
