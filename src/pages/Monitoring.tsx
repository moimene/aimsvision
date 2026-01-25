import { useState, useMemo } from "react";
import { AppLayout, PageHeader } from "@/components/layout";
import { StatusIndicator } from "@/components/indicators";
import {
  eventLogData,
  kpiMetrics,
  eventTypeMapping,
  decisionOutcomeMapping,
  isoClauses,
  type EventType,
  type DecisionOutcome,
  type ISOClause,
} from "@/data/monitoring";
import { aiSystemsData } from "@/data/aiSystems";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { FileDown, FileText, FileJson, AlertTriangle, AlertCircle, CheckCircle } from "lucide-react";
import { toast } from "sonner";

function formatTimestamp(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function RateIndicator({ rate, thresholds }: { rate: number; thresholds: { warning: number; critical: number } }) {
  let Icon = CheckCircle;
  let colorClass = "text-[hsl(var(--g-status-success))]";
  let label = "Normal";

  if (rate >= thresholds.critical) {
    Icon = AlertTriangle;
    colorClass = "text-[hsl(var(--g-status-critical))]";
    label = "High";
  } else if (rate >= thresholds.warning) {
    Icon = AlertCircle;
    colorClass = "text-[hsl(var(--g-status-warning))]";
    label = "Elevated";
  }

  return (
    <span className={`inline-flex items-center gap-[var(--g-space-2)] ${colorClass}`}>
      <Icon className="h-4 w-4" aria-hidden="true" />
      <span className="text-sm">{rate.toFixed(1)}%</span>
      <span className="text-xs">({label})</span>
    </span>
  );
}

function DriftIndicator({ drift }: { drift: number }) {
  let Icon = CheckCircle;
  let colorClass = "text-[hsl(var(--g-status-success))]";
  let label = "Stable";

  if (drift >= 25) {
    Icon = AlertTriangle;
    colorClass = "text-[hsl(var(--g-status-critical))]";
    label = "High Drift";
  } else if (drift >= 15) {
    Icon = AlertCircle;
    colorClass = "text-[hsl(var(--g-status-warning))]";
    label = "Moderate";
  }

  return (
    <span className={`inline-flex items-center gap-[var(--g-space-2)] ${colorClass}`}>
      <Icon className="h-4 w-4" aria-hidden="true" />
      <span className="text-sm">{drift}%</span>
      <span className="text-xs">({label})</span>
    </span>
  );
}

type ExportFormat = "pdf" | "markdown" | "json";
type ExportScope = "system" | "period" | "clause";

interface ExportConfig {
  format: ExportFormat;
  scope: ExportScope;
  value: string;
}

function handleExport(config: ExportConfig) {
  const scopeLabels: Record<ExportScope, string> = {
    system: "AI System",
    period: "Period",
    clause: "ISO Clause",
  };
  
  toast.success(`Export initiated`, {
    description: `${config.format.toUpperCase()} export for ${scopeLabels[config.scope]}: ${config.value}`,
  });
  
  // In production, this would trigger actual export logic
  console.log("Export requested:", config);
}

export default function Monitoring() {
  // Event Log Filters
  const [eventSystemFilter, setEventSystemFilter] = useState<string>("all");
  const [eventTypeFilter, setEventTypeFilter] = useState<EventType | "all">("all");

  // Export Configuration
  const [exportSystem, setExportSystem] = useState<string>("");
  const [exportPeriod, setExportPeriod] = useState<string>("");
  const [exportClause, setExportClause] = useState<string>("");

  const systems = useMemo(() => {
    return aiSystemsData.map(s => ({ id: s.id, name: s.name }));
  }, []);

  const filteredEvents = useMemo(() => {
    return eventLogData.filter(event => {
      if (eventSystemFilter !== "all" && event.aiSystemId !== eventSystemFilter) return false;
      if (eventTypeFilter !== "all" && event.eventType !== eventTypeFilter) return false;
      return true;
    });
  }, [eventSystemFilter, eventTypeFilter]);

  const clearEventFilters = () => {
    setEventSystemFilter("all");
    setEventTypeFilter("all");
  };

  const hasEventFilters = eventSystemFilter !== "all" || eventTypeFilter !== "all";

  // Summary stats
  const todayEvents = eventLogData.filter(e => e.timestamp.startsWith("2026-01-25")).length;
  const blocksToday = eventLogData.filter(e => e.timestamp.startsWith("2026-01-25") && e.eventType === "Block").length;
  const escalationsToday = eventLogData.filter(e => e.timestamp.startsWith("2026-01-25") && e.eventType === "Escalation").length;

  const periods = ["Jan 2026", "Dec 2025", "Nov 2025", "Q4 2025", "Q3 2025", "2025 Full Year"];

  return (
    <AppLayout>
      <PageHeader
        title="Monitoring & Evidence"
        subtitle="Operational evidence and audit trail"
      />
      <div className="p-[var(--g-space-6)]">
        {/* Summary Stats */}
        <section aria-labelledby="monitoring-summary" className="mb-[var(--g-space-5)]">
          <h2 id="monitoring-summary" className="sr-only">Monitoring Summary</h2>
          <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-lg)] overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-[hsl(var(--g-surface-subtle))] hover:bg-[hsl(var(--g-surface-subtle))]">
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium">Metric</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium text-right w-24">Value</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-36">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="hover:bg-[hsl(var(--g-surface-hover))]">
                  <TableCell className="text-[hsl(var(--g-text-secondary))]">Events Today</TableCell>
                  <TableCell className="text-[hsl(var(--g-text-primary))] font-semibold text-right">{todayEvents}</TableCell>
                  <TableCell>
                    <StatusIndicator status="neutral" text="Logged" />
                  </TableCell>
                </TableRow>
                <TableRow className="hover:bg-[hsl(var(--g-surface-hover))]">
                  <TableCell className="text-[hsl(var(--g-text-secondary))]">Blocks Today</TableCell>
                  <TableCell className="text-[hsl(var(--g-text-primary))] font-semibold text-right">{blocksToday}</TableCell>
                  <TableCell>
                    <StatusIndicator status={blocksToday > 3 ? "warning" : "success"} text={blocksToday > 3 ? "Elevated" : "Normal"} />
                  </TableCell>
                </TableRow>
                <TableRow className="hover:bg-[hsl(var(--g-surface-hover))]">
                  <TableCell className="text-[hsl(var(--g-text-secondary))]">Escalations Today</TableCell>
                  <TableCell className="text-[hsl(var(--g-text-primary))] font-semibold text-right">{escalationsToday}</TableCell>
                  <TableCell>
                    <StatusIndicator status={escalationsToday > 5 ? "warning" : "success"} text={escalationsToday > 5 ? "Elevated" : "Normal"} />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </section>

        {/* Event Log Filters */}
        <section aria-labelledby="event-filters" className="mb-[var(--g-space-5)]">
          <h2 id="event-filters" className="sr-only">Event Log Filters</h2>
          <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-lg)] p-[var(--g-space-4)]">
            <div className="flex flex-wrap items-end gap-[var(--g-space-4)]">
              <div className="flex flex-col gap-[var(--g-space-2)]">
                <Label htmlFor="event-system-filter" className="text-xs text-[hsl(var(--g-text-secondary))]">AI System</Label>
                <Select value={eventSystemFilter} onValueChange={setEventSystemFilter}>
                  <SelectTrigger id="event-system-filter" className="w-[220px] h-9 text-sm bg-[hsl(var(--g-surface-base))] border-[hsl(var(--g-border-default))]">
                    <SelectValue placeholder="All Systems" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Systems</SelectItem>
                    {systems.map(s => (
                      <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-[var(--g-space-2)]">
                <Label htmlFor="event-type-filter" className="text-xs text-[hsl(var(--g-text-secondary))]">Event Type</Label>
                <Select value={eventTypeFilter} onValueChange={(v) => setEventTypeFilter(v as EventType | "all")}>
                  <SelectTrigger id="event-type-filter" className="w-[140px] h-9 text-sm bg-[hsl(var(--g-surface-base))] border-[hsl(var(--g-border-default))]">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Decision">Decision</SelectItem>
                    <SelectItem value="Escalation">Escalation</SelectItem>
                    <SelectItem value="Block">Block</SelectItem>
                    <SelectItem value="Alert">Alert</SelectItem>
                    <SelectItem value="Audit">Audit</SelectItem>
                    <SelectItem value="Configuration">Configuration</SelectItem>
                    <SelectItem value="Review">Review</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {hasEventFilters && (
                <button
                  onClick={clearEventFilters}
                  className="text-sm text-[hsl(var(--g-link))] hover:text-[hsl(var(--g-link-hover))] hover:underline focus:outline-none focus:ring-2 focus:ring-[hsl(var(--g-border-strong))] rounded px-2 py-1"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Event Log Table */}
        <section aria-labelledby="event-log">
          <div className="flex items-baseline justify-between mb-[var(--g-space-4)]">
            <h2 
              id="event-log" 
              className="text-sm font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider"
            >
              Event Log
            </h2>
            <span className="text-sm text-[hsl(var(--g-text-secondary))]">
              {filteredEvents.length} events
            </span>
          </div>
          <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-lg)] overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-[hsl(var(--g-surface-subtle))] hover:bg-[hsl(var(--g-surface-subtle))]">
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-40">Timestamp</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-48">AI System</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-28">Event Type</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-28">Decision</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-40">Reference ID</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium">Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEvents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-[hsl(var(--g-text-secondary))]">
                      No events match the selected filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredEvents.map((event) => (
                    <TableRow key={event.id} className="hover:bg-[hsl(var(--g-surface-hover))]">
                      <TableCell className="text-[hsl(var(--g-text-secondary))] font-mono text-xs">
                        {formatTimestamp(event.timestamp)}
                      </TableCell>
                      <TableCell className="text-[hsl(var(--g-text-primary))]">{event.aiSystemName}</TableCell>
                      <TableCell>
                        <StatusIndicator 
                          status={eventTypeMapping[event.eventType].status} 
                          text={eventTypeMapping[event.eventType].text} 
                        />
                      </TableCell>
                      <TableCell>
                        <StatusIndicator 
                          status={decisionOutcomeMapping[event.decision].status} 
                          text={decisionOutcomeMapping[event.decision].text} 
                        />
                      </TableCell>
                      <TableCell className="text-[hsl(var(--g-text-secondary))] font-mono text-xs">{event.referenceId}</TableCell>
                      <TableCell className="text-[hsl(var(--g-text-secondary))] truncate max-w-[300px]" title={event.description}>
                        {event.description}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </section>

        {/* KPI Metrics Table */}
        <section aria-labelledby="kpi-metrics" className="mt-[var(--g-space-7)]">
          <div className="flex items-baseline justify-between mb-[var(--g-space-4)]">
            <h2 
              id="kpi-metrics" 
              className="text-sm font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider"
            >
              KPI Metrics by AI System
            </h2>
            <span className="text-sm text-[hsl(var(--g-text-secondary))]">
              Period: Jan 2026
            </span>
          </div>
          <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-lg)] overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-[hsl(var(--g-surface-subtle))] hover:bg-[hsl(var(--g-surface-subtle))]">
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium">AI System</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-36">Block Rate</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-36">Escalation Rate</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-36">Error Rate</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-36">Drift Indicator</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {kpiMetrics.map((metric) => (
                  <TableRow key={metric.aiSystemId} className="hover:bg-[hsl(var(--g-surface-hover))]">
                    <TableCell>
                      <div>
                        <span className="text-[hsl(var(--g-text-primary))] font-medium">{metric.aiSystemName}</span>
                        <span className="text-xs text-[hsl(var(--g-text-secondary))] ml-2">{metric.aiSystemId}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <RateIndicator rate={metric.blockRate} thresholds={{ warning: 2, critical: 5 }} />
                    </TableCell>
                    <TableCell>
                      <RateIndicator rate={metric.escalationRate} thresholds={{ warning: 20, critical: 50 }} />
                    </TableCell>
                    <TableCell>
                      <RateIndicator rate={metric.errorRate} thresholds={{ warning: 1, critical: 3 }} />
                    </TableCell>
                    <TableCell>
                      <DriftIndicator drift={metric.driftIndicator} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        {/* Evidence Pack Export */}
        <section aria-labelledby="evidence-export" className="mt-[var(--g-space-7)]">
          <h2 
            id="evidence-export" 
            className="text-sm font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider mb-[var(--g-space-4)]"
          >
            Evidence Pack Export
          </h2>
          <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-lg)] p-[var(--g-space-5)]">
            <div className="space-y-[var(--g-space-5)]">
              {/* Export by AI System */}
              <div className="flex flex-wrap items-end gap-[var(--g-space-4)]">
                <div className="flex flex-col gap-[var(--g-space-2)]">
                  <Label htmlFor="export-system" className="text-xs text-[hsl(var(--g-text-secondary))]">Export by AI System</Label>
                  <Select value={exportSystem} onValueChange={setExportSystem}>
                    <SelectTrigger id="export-system" className="w-[260px] h-9 text-sm bg-[hsl(var(--g-surface-base))] border-[hsl(var(--g-border-default))]">
                      <SelectValue placeholder="Select AI System..." />
                    </SelectTrigger>
                    <SelectContent>
                      {systems.map(s => (
                        <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-[var(--g-space-2)]">
                  <button
                    type="button"
                    disabled={!exportSystem}
                    onClick={() => exportSystem && handleExport({ format: "pdf", scope: "system", value: systems.find(s => s.id === exportSystem)?.name || "" })}
                    className="inline-flex items-center gap-[var(--g-space-2)] px-[var(--g-space-3)] py-[var(--g-space-2)] text-sm font-medium text-[hsl(var(--g-text-primary))] bg-[hsl(var(--g-surface-subtle))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-md)] hover:bg-[hsl(var(--g-surface-hover))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--g-border-strong))] disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Export as PDF"
                  >
                    <FileDown className="h-4 w-4" aria-hidden="true" />
                    PDF
                  </button>
                  <button
                    type="button"
                    disabled={!exportSystem}
                    onClick={() => exportSystem && handleExport({ format: "markdown", scope: "system", value: systems.find(s => s.id === exportSystem)?.name || "" })}
                    className="inline-flex items-center gap-[var(--g-space-2)] px-[var(--g-space-3)] py-[var(--g-space-2)] text-sm font-medium text-[hsl(var(--g-text-primary))] bg-[hsl(var(--g-surface-subtle))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-md)] hover:bg-[hsl(var(--g-surface-hover))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--g-border-strong))] disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Export as Markdown"
                  >
                    <FileText className="h-4 w-4" aria-hidden="true" />
                    MD
                  </button>
                  <button
                    type="button"
                    disabled={!exportSystem}
                    onClick={() => exportSystem && handleExport({ format: "json", scope: "system", value: systems.find(s => s.id === exportSystem)?.name || "" })}
                    className="inline-flex items-center gap-[var(--g-space-2)] px-[var(--g-space-3)] py-[var(--g-space-2)] text-sm font-medium text-[hsl(var(--g-text-primary))] bg-[hsl(var(--g-surface-subtle))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-md)] hover:bg-[hsl(var(--g-surface-hover))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--g-border-strong))] disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Export as JSON"
                  >
                    <FileJson className="h-4 w-4" aria-hidden="true" />
                    JSON
                  </button>
                </div>
              </div>

              <div className="border-t border-[hsl(var(--g-border-subtle))]" />

              {/* Export by Period */}
              <div className="flex flex-wrap items-end gap-[var(--g-space-4)]">
                <div className="flex flex-col gap-[var(--g-space-2)]">
                  <Label htmlFor="export-period" className="text-xs text-[hsl(var(--g-text-secondary))]">Export by Period</Label>
                  <Select value={exportPeriod} onValueChange={setExportPeriod}>
                    <SelectTrigger id="export-period" className="w-[260px] h-9 text-sm bg-[hsl(var(--g-surface-base))] border-[hsl(var(--g-border-default))]">
                      <SelectValue placeholder="Select Period..." />
                    </SelectTrigger>
                    <SelectContent>
                      {periods.map(p => (
                        <SelectItem key={p} value={p}>{p}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-[var(--g-space-2)]">
                  <button
                    type="button"
                    disabled={!exportPeriod}
                    onClick={() => exportPeriod && handleExport({ format: "pdf", scope: "period", value: exportPeriod })}
                    className="inline-flex items-center gap-[var(--g-space-2)] px-[var(--g-space-3)] py-[var(--g-space-2)] text-sm font-medium text-[hsl(var(--g-text-primary))] bg-[hsl(var(--g-surface-subtle))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-md)] hover:bg-[hsl(var(--g-surface-hover))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--g-border-strong))] disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Export as PDF"
                  >
                    <FileDown className="h-4 w-4" aria-hidden="true" />
                    PDF
                  </button>
                  <button
                    type="button"
                    disabled={!exportPeriod}
                    onClick={() => exportPeriod && handleExport({ format: "markdown", scope: "period", value: exportPeriod })}
                    className="inline-flex items-center gap-[var(--g-space-2)] px-[var(--g-space-3)] py-[var(--g-space-2)] text-sm font-medium text-[hsl(var(--g-text-primary))] bg-[hsl(var(--g-surface-subtle))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-md)] hover:bg-[hsl(var(--g-surface-hover))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--g-border-strong))] disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Export as Markdown"
                  >
                    <FileText className="h-4 w-4" aria-hidden="true" />
                    MD
                  </button>
                  <button
                    type="button"
                    disabled={!exportPeriod}
                    onClick={() => exportPeriod && handleExport({ format: "json", scope: "period", value: exportPeriod })}
                    className="inline-flex items-center gap-[var(--g-space-2)] px-[var(--g-space-3)] py-[var(--g-space-2)] text-sm font-medium text-[hsl(var(--g-text-primary))] bg-[hsl(var(--g-surface-subtle))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-md)] hover:bg-[hsl(var(--g-surface-hover))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--g-border-strong))] disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Export as JSON"
                  >
                    <FileJson className="h-4 w-4" aria-hidden="true" />
                    JSON
                  </button>
                </div>
              </div>

              <div className="border-t border-[hsl(var(--g-border-subtle))]" />

              {/* Export by ISO Clause */}
              <div className="flex flex-wrap items-end gap-[var(--g-space-4)]">
                <div className="flex flex-col gap-[var(--g-space-2)]">
                  <Label htmlFor="export-clause" className="text-xs text-[hsl(var(--g-text-secondary))]">Export by ISO 42001 Clause</Label>
                  <Select value={exportClause} onValueChange={setExportClause}>
                    <SelectTrigger id="export-clause" className="w-[320px] h-9 text-sm bg-[hsl(var(--g-surface-base))] border-[hsl(var(--g-border-default))]">
                      <SelectValue placeholder="Select Clause..." />
                    </SelectTrigger>
                    <SelectContent>
                      {isoClauses.map(c => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-[var(--g-space-2)]">
                  <button
                    type="button"
                    disabled={!exportClause}
                    onClick={() => exportClause && handleExport({ format: "pdf", scope: "clause", value: exportClause })}
                    className="inline-flex items-center gap-[var(--g-space-2)] px-[var(--g-space-3)] py-[var(--g-space-2)] text-sm font-medium text-[hsl(var(--g-text-primary))] bg-[hsl(var(--g-surface-subtle))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-md)] hover:bg-[hsl(var(--g-surface-hover))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--g-border-strong))] disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Export as PDF"
                  >
                    <FileDown className="h-4 w-4" aria-hidden="true" />
                    PDF
                  </button>
                  <button
                    type="button"
                    disabled={!exportClause}
                    onClick={() => exportClause && handleExport({ format: "markdown", scope: "clause", value: exportClause })}
                    className="inline-flex items-center gap-[var(--g-space-2)] px-[var(--g-space-3)] py-[var(--g-space-2)] text-sm font-medium text-[hsl(var(--g-text-primary))] bg-[hsl(var(--g-surface-subtle))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-md)] hover:bg-[hsl(var(--g-surface-hover))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--g-border-strong))] disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Export as Markdown"
                  >
                    <FileText className="h-4 w-4" aria-hidden="true" />
                    MD
                  </button>
                  <button
                    type="button"
                    disabled={!exportClause}
                    onClick={() => exportClause && handleExport({ format: "json", scope: "clause", value: exportClause })}
                    className="inline-flex items-center gap-[var(--g-space-2)] px-[var(--g-space-3)] py-[var(--g-space-2)] text-sm font-medium text-[hsl(var(--g-text-primary))] bg-[hsl(var(--g-surface-subtle))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-md)] hover:bg-[hsl(var(--g-surface-hover))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--g-border-strong))] disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Export as JSON"
                  >
                    <FileJson className="h-4 w-4" aria-hidden="true" />
                    JSON
                  </button>
                </div>
              </div>
            </div>

            <p className="text-xs text-[hsl(var(--g-text-secondary))] mt-[var(--g-space-4)]">
              Exports are logged and traceable. Each export includes generation timestamp and requestor ID.
            </p>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
