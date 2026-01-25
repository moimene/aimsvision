import { AppLayout, PageHeader } from "@/components/layout";
import { 
  StatusIndicator, 
  SeverityIndicator, 
  AlertTypeIndicator,
  type SeverityLevel,
  type AlertType,
} from "@/components/indicators";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data for summary metrics
const summaryData = [
  { metric: "Total AI Systems in Scope", value: 12 },
  { metric: "Systems in Production", value: 8 },
  { metric: "High-Risk Systems", value: 3 },
  { metric: "Non-Compliant Systems", value: 1 },
];

// Mock data for compliance indicators
const complianceIndicators = [
  { 
    indicator: "ISO 42001 Clause Coverage", 
    value: "78%", 
    status: "warning" as const,
    statusText: "In Progress"
  },
  { 
    indicator: "Open Risks Above Threshold", 
    value: "4", 
    status: "critical" as const,
    statusText: "Action Required"
  },
  { 
    indicator: "Open Incidents", 
    value: "2", 
    status: "warning" as const,
    statusText: "Under Review"
  },
  { 
    indicator: "Pending Reviews / Audits", 
    value: "3", 
    status: "neutral" as const,
    statusText: "Scheduled"
  },
];

// Mock data for alerts
const alertsData: {
  id: string;
  type: AlertType;
  aiSystem: string;
  severity: SeverityLevel;
  dueDate: string;
}[] = [
  {
    id: "ALT-001",
    type: "Risk",
    aiSystem: "Customer Sentiment Analyzer",
    severity: "High",
    dueDate: "2026-02-01",
  },
  {
    id: "ALT-002",
    type: "Incident",
    aiSystem: "Fraud Detection Model v2",
    severity: "Medium",
    dueDate: "2026-01-28",
  },
  {
    id: "ALT-003",
    type: "Audit",
    aiSystem: "Document Classification Engine",
    severity: "Low",
    dueDate: "2026-02-15",
  },
  {
    id: "ALT-004",
    type: "Risk",
    aiSystem: "HR Screening Assistant",
    severity: "Critical",
    dueDate: "2026-01-26",
  },
  {
    id: "ALT-005",
    type: "Incident",
    aiSystem: "Customer Sentiment Analyzer",
    severity: "High",
    dueDate: "2026-01-30",
  },
];

export default function Overview() {
  return (
    <AppLayout>
      <PageHeader
        title="AIMS Overview"
        subtitle="Current status of the AI Management System (ISO/IEC 42001)"
      />
      <div className="p-[var(--g-space-6)]">
        {/* Summary Table */}
        <section aria-labelledby="summary-heading">
          <h2 
            id="summary-heading" 
            className="text-sm font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider mb-[var(--g-space-4)]"
          >
            System Summary
          </h2>
          <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-lg)] overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-[hsl(var(--g-surface-subtle))] hover:bg-[hsl(var(--g-surface-subtle))]">
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium">Metric</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium text-right w-32">Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {summaryData.map((row) => (
                  <TableRow key={row.metric} className="hover:bg-[hsl(var(--g-surface-hover))]">
                    <TableCell className="text-[hsl(var(--g-text-secondary))]">{row.metric}</TableCell>
                    <TableCell className="text-[hsl(var(--g-text-primary))] font-semibold text-right">{row.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        {/* Compliance Indicators Table */}
        <section aria-labelledby="compliance-heading" className="mt-[var(--g-space-7)]">
          <h2 
            id="compliance-heading" 
            className="text-sm font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider mb-[var(--g-space-4)]"
          >
            Compliance Indicators
          </h2>
          <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-lg)] overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-[hsl(var(--g-surface-subtle))] hover:bg-[hsl(var(--g-surface-subtle))]">
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium">Indicator</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium text-right w-24">Value</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-48">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {complianceIndicators.map((row) => (
                  <TableRow key={row.indicator} className="hover:bg-[hsl(var(--g-surface-hover))]">
                    <TableCell className="text-[hsl(var(--g-text-secondary))]">{row.indicator}</TableCell>
                    <TableCell className="text-[hsl(var(--g-text-primary))] font-semibold text-right">{row.value}</TableCell>
                    <TableCell>
                      <StatusIndicator status={row.status} text={row.statusText} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        {/* Alerts Table */}
        <section aria-labelledby="alerts-heading" className="mt-[var(--g-space-7)]">
          <h2 
            id="alerts-heading" 
            className="text-sm font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider mb-[var(--g-space-4)]"
          >
            Active Alerts
          </h2>
          <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-lg)] overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-[hsl(var(--g-surface-subtle))] hover:bg-[hsl(var(--g-surface-subtle))]">
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-28">Type</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium">AI System</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-32">Severity</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-32">Due Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {alertsData.map((alert) => (
                  <TableRow key={alert.id} className="hover:bg-[hsl(var(--g-surface-hover))]">
                    <TableCell>
                      <AlertTypeIndicator type={alert.type} />
                    </TableCell>
                    <TableCell className="text-[hsl(var(--g-text-primary))]">{alert.aiSystem}</TableCell>
                    <TableCell>
                      <SeverityIndicator severity={alert.severity} />
                    </TableCell>
                    <TableCell className="text-[hsl(var(--g-text-secondary))]">{alert.dueDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
