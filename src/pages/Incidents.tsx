import { AppLayout, PageHeader } from "@/components/layout";
import { AlertCircle } from "lucide-react";

export default function Incidents() {
  return (
    <AppLayout>
      <PageHeader
        title="Incidents & Continuous Improvement"
        subtitle="Track, analyze, and learn from AI-related incidents to drive continuous improvement."
      />
      <div className="p-[var(--g-space-6)]">
        {/* Phase 2 Notice */}
        <div className="bg-[hsl(var(--g-surface-subtle))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-lg)] p-[var(--g-space-5)] mb-[var(--g-space-6)]">
          <div className="flex items-start gap-[var(--g-space-3)]">
            <AlertCircle className="h-5 w-5 text-[hsl(var(--g-text-secondary))] shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-sm font-medium text-[hsl(var(--g-text-primary))]">Phase 2 Module</p>
              <p className="text-sm text-[hsl(var(--g-text-secondary))] mt-[var(--g-space-1)]">
                This module is scheduled for Phase 2 implementation. Structure is prepared for future development.
              </p>
            </div>
          </div>
        </div>

        {/* Incident Register Placeholder */}
        <section aria-labelledby="incident-register">
          <h2 
            id="incident-register" 
            className="text-sm font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider mb-[var(--g-space-4)]"
          >
            Incident Register
          </h2>
          <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-lg)] overflow-hidden">
            <div className="bg-[hsl(var(--g-surface-subtle))] border-b border-[hsl(var(--g-border-default))] px-[var(--g-space-4)] py-[var(--g-space-3)]">
              <div className="grid grid-cols-6 gap-[var(--g-space-4)] text-xs font-medium text-[hsl(var(--g-text-primary))] uppercase tracking-wider">
                <span>Incident ID</span>
                <span>Date</span>
                <span>AI System</span>
                <span>Severity</span>
                <span>Status</span>
                <span>Owner</span>
              </div>
            </div>
            <div className="p-[var(--g-space-6)] text-center">
              <p className="text-sm text-[hsl(var(--g-text-secondary))]">
                Incident register table structure prepared for Phase 2.
              </p>
            </div>
          </div>
        </section>

        {/* CAPA Placeholder */}
        <section aria-labelledby="capa" className="mt-[var(--g-space-7)]">
          <h2 
            id="capa" 
            className="text-sm font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider mb-[var(--g-space-4)]"
          >
            Corrective and Preventive Actions (CAPA)
          </h2>
          <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-lg)] p-[var(--g-space-6)]">
            <p className="text-sm text-[hsl(var(--g-text-secondary))]">
              CAPA tracking will be implemented in Phase 2.
            </p>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
