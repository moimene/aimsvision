import { AppLayout, PageHeader } from "@/components/layout";
import { CheckCircle, AlertTriangle, XCircle, Clock } from "lucide-react";

export default function Overview() {
  return (
    <AppLayout>
      <PageHeader
        title="Overview"
        subtitle="Executive snapshot of AIMS compliance status across all managed AI systems."
      />
      <div className="p-[var(--g-space-6)]">
        {/* Compliance Summary Metrics */}
        <section aria-labelledby="compliance-summary">
          <h2 
            id="compliance-summary" 
            className="text-sm font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider mb-[var(--g-space-4)]"
          >
            Compliance Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[var(--g-space-4)]">
            <StatBlock
              label="Total AI Systems"
              value="12"
              icon={<Clock className="h-5 w-5" aria-hidden="true" />}
              status="neutral"
            />
            <StatBlock
              label="Compliant"
              value="8"
              icon={<CheckCircle className="h-5 w-5" aria-hidden="true" />}
              status="success"
              statusText="Compliant"
            />
            <StatBlock
              label="At Risk"
              value="3"
              icon={<AlertTriangle className="h-5 w-5" aria-hidden="true" />}
              status="warning"
              statusText="At Risk"
            />
            <StatBlock
              label="Non-Compliant"
              value="1"
              icon={<XCircle className="h-5 w-5" aria-hidden="true" />}
              status="critical"
              statusText="Non-Compliant"
            />
          </div>
        </section>

        {/* ISO Coverage */}
        <section aria-labelledby="iso-coverage" className="mt-[var(--g-space-7)]">
          <h2 
            id="iso-coverage" 
            className="text-sm font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider mb-[var(--g-space-4)]"
          >
            ISO 42001 Clause Coverage
          </h2>
          <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-lg)] p-[var(--g-space-5)]">
            <div className="flex items-baseline gap-[var(--g-space-2)]">
              <span className="text-3xl font-semibold text-[hsl(var(--g-text-primary))]">78%</span>
              <span className="text-sm text-[hsl(var(--g-text-secondary))]">of required clauses addressed</span>
            </div>
            <div className="mt-[var(--g-space-3)] h-2 bg-[hsl(var(--g-surface-subtle))] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[hsl(var(--g-status-success))] rounded-full"
                style={{ width: '78%' }}
                role="progressbar"
                aria-valuenow={78}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="ISO clause coverage: 78 percent"
              />
            </div>
          </div>
        </section>

        {/* Open Incidents & Upcoming Audits placeholder */}
        <section aria-labelledby="status-tables" className="mt-[var(--g-space-7)]">
          <h2 
            id="status-tables" 
            className="text-sm font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider mb-[var(--g-space-4)]"
          >
            Open Incidents & Upcoming Audits
          </h2>
          <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-lg)] p-[var(--g-space-6)]">
            <p className="text-sm text-[hsl(var(--g-text-secondary))]">
              Detailed tables will be implemented in Phase 4.
            </p>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}

interface StatBlockProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  status: 'success' | 'warning' | 'critical' | 'neutral';
  statusText?: string;
}

function StatBlock({ label, value, icon, status, statusText }: StatBlockProps) {
  const statusColors = {
    success: 'text-[hsl(var(--g-status-success))]',
    warning: 'text-[hsl(var(--g-status-warning))]',
    critical: 'text-[hsl(var(--g-status-critical))]',
    neutral: 'text-[hsl(var(--g-text-secondary))]',
  };

  return (
    <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-lg)] p-[var(--g-space-5)]">
      <div className="flex items-center justify-between">
        <span className="text-sm text-[hsl(var(--g-text-secondary))]">{label}</span>
        <span className={statusColors[status]}>{icon}</span>
      </div>
      <div className="mt-[var(--g-space-2)]">
        <span className="text-2xl font-semibold text-[hsl(var(--g-text-primary))]">{value}</span>
        {statusText && (
          <span className={`ml-[var(--g-space-2)] text-xs ${statusColors[status]}`}>
            {statusText}
          </span>
        )}
      </div>
    </div>
  );
}
