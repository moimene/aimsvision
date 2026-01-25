import { AppLayout, PageHeader } from "@/components/layout";
import { ClipboardCheck, Eye } from "lucide-react";

export default function Audit() {
  return (
    <AppLayout>
      <PageHeader
        title="Audit & Certification"
        subtitle="Support internal and external audits with ISO clause tracking and certification readiness assessment."
      />
      <div className="p-[var(--g-space-6)]">
        {/* Read-Only Mode Indicator */}
        <div className="bg-[hsl(var(--g-surface-subtle))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-lg)] p-[var(--g-space-5)] mb-[var(--g-space-6)]">
          <div className="flex items-start gap-[var(--g-space-3)]">
            <Eye className="h-5 w-5 text-[hsl(var(--g-text-secondary))] shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-sm font-medium text-[hsl(var(--g-text-primary))]">Read-Only Mode</p>
              <p className="text-sm text-[hsl(var(--g-text-secondary))] mt-[var(--g-space-1)]">
                This module is designed for read-only access by auditors. Write operations require elevated permissions.
              </p>
            </div>
          </div>
        </div>

        {/* Phase 2 Notice */}
        <div className="bg-[hsl(var(--g-surface-subtle))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-lg)] p-[var(--g-space-5)] mb-[var(--g-space-6)]">
          <div className="flex items-start gap-[var(--g-space-3)]">
            <ClipboardCheck className="h-5 w-5 text-[hsl(var(--g-text-secondary))] shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-sm font-medium text-[hsl(var(--g-text-primary))]">Phase 2 Module</p>
              <p className="text-sm text-[hsl(var(--g-text-secondary))] mt-[var(--g-space-1)]">
                This module is scheduled for Phase 2 implementation. Structure is prepared for future development.
              </p>
            </div>
          </div>
        </div>

        {/* ISO Clause Checklist Placeholder */}
        <section aria-labelledby="iso-checklist">
          <h2 
            id="iso-checklist" 
            className="text-sm font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider mb-[var(--g-space-4)]"
          >
            ISO 42001 Clause Checklist
          </h2>
          <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-lg)] p-[var(--g-space-6)]">
            <p className="text-sm text-[hsl(var(--g-text-secondary))]">
              ISO clause checklist with linked evidence will be implemented in Phase 2.
            </p>
          </div>
        </section>

        {/* Non-Conformity Tracking Placeholder */}
        <section aria-labelledby="non-conformity" className="mt-[var(--g-space-7)]">
          <h2 
            id="non-conformity" 
            className="text-sm font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider mb-[var(--g-space-4)]"
          >
            Non-Conformity Tracking
          </h2>
          <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-lg)] p-[var(--g-space-6)]">
            <p className="text-sm text-[hsl(var(--g-text-secondary))]">
              Non-conformity register and tracking will be implemented in Phase 2.
            </p>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
