import { useState, useMemo } from "react";
import { AppLayout, PageHeader } from "@/components/layout";
import { StatusIndicator, SeverityIndicator } from "@/components/indicators";
import {
  incidentsData,
  incidentStatusMapping,
  capaStatusMapping,
  type IncidentStatus,
  type IncidentSeverity,
  type Incident,
} from "@/data/incidents";
import { riskData } from "@/data/risks";
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle, Clock, FileText, ExternalLink } from "lucide-react";

function formatDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatTimestamp(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function BooleanIndicator({ value, trueText, falseText }: { value: boolean; trueText: string; falseText: string }) {
  return (
    <span className={`inline-flex items-center gap-[var(--g-space-2)] ${value ? "text-[hsl(var(--g-status-success))]" : "text-[hsl(var(--g-status-warning))]"}`}>
      {value ? (
        <CheckCircle className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Clock className="h-4 w-4" aria-hidden="true" />
      )}
      <span className="text-sm">{value ? trueText : falseText}</span>
    </span>
  );
}

function IncidentDetailPanel({ incident, onClose }: { incident: Incident; onClose: () => void }) {
  const linkedRisks = riskData.filter(r => incident.linkedRiskIds?.includes(r.id));

  return (
    <Sheet open={true} onOpenChange={onClose}>
      <SheetContent className="w-[550px] sm:w-[650px] bg-[hsl(var(--g-surface-base))] border-l border-[hsl(var(--g-border-default))] overflow-y-auto">
        <SheetHeader className="border-b border-[hsl(var(--g-border-default))] pb-[var(--g-space-4)]">
          <div className="flex items-center gap-[var(--g-space-3)]">
            <SeverityIndicator severity={incident.severity} />
            <StatusIndicator 
              status={incidentStatusMapping[incident.status].status} 
              text={incident.status} 
            />
          </div>
          <SheetTitle className="text-[hsl(var(--g-text-primary))]">{incident.id}: {incident.description}</SheetTitle>
          <SheetDescription className="text-[hsl(var(--g-text-secondary))]">
            {incident.aiSystemName} · Reported {formatDate(incident.reportedDate)}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-[var(--g-space-5)] space-y-[var(--g-space-6)]">
          {/* Incident Summary */}
          <section>
            <h3 className="text-xs font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider mb-[var(--g-space-3)]">
              Incident Summary
            </h3>
            <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-md)] overflow-hidden">
              <Table>
                <TableBody>
                  <TableRow className="hover:bg-[hsl(var(--g-surface-hover))]">
                    <TableCell className="text-[hsl(var(--g-text-secondary))] w-40">Owner</TableCell>
                    <TableCell className="text-[hsl(var(--g-text-primary))]">{incident.owner}</TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-[hsl(var(--g-surface-hover))]">
                    <TableCell className="text-[hsl(var(--g-text-secondary))]">Reported Date</TableCell>
                    <TableCell className="text-[hsl(var(--g-text-primary))]">{formatDate(incident.reportedDate)}</TableCell>
                  </TableRow>
                  {incident.resolvedDate && (
                    <TableRow className="hover:bg-[hsl(var(--g-surface-hover))]">
                      <TableCell className="text-[hsl(var(--g-text-secondary))]">Resolved Date</TableCell>
                      <TableCell className="text-[hsl(var(--g-text-primary))]">{formatDate(incident.resolvedDate)}</TableCell>
                    </TableRow>
                  )}
                  <TableRow className="hover:bg-[hsl(var(--g-surface-hover))]">
                    <TableCell className="text-[hsl(var(--g-text-secondary))]">Root Cause</TableCell>
                    <TableCell>
                      <BooleanIndicator 
                        value={incident.rootCauseIdentified} 
                        trueText="Identified" 
                        falseText="Pending" 
                      />
                    </TableCell>
                  </TableRow>
                  {incident.linkedPostmortem && (
                    <TableRow className="hover:bg-[hsl(var(--g-surface-hover))]">
                      <TableCell className="text-[hsl(var(--g-text-secondary))]">Postmortem</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center gap-[var(--g-space-2)] text-[hsl(var(--g-link))]">
                          <FileText className="h-4 w-4" aria-hidden="true" />
                          <span className="text-sm">{incident.linkedPostmortem}</span>
                          <ExternalLink className="h-3 w-3" aria-hidden="true" />
                        </span>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </section>

          {/* Impact Summary */}
          {incident.impactSummary && (
            <section>
              <h3 className="text-xs font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider mb-[var(--g-space-3)]">
                Impact Summary
              </h3>
              <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-md)] p-[var(--g-space-4)]">
                <p className="text-sm text-[hsl(var(--g-text-primary))] leading-relaxed">{incident.impactSummary}</p>
              </div>
            </section>
          )}

          {/* Root Cause */}
          {incident.rootCause && (
            <section>
              <h3 className="text-xs font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider mb-[var(--g-space-3)]">
                Root Cause Analysis
              </h3>
              <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-md)] p-[var(--g-space-4)]">
                <p className="text-sm text-[hsl(var(--g-text-primary))] leading-relaxed">{incident.rootCause}</p>
              </div>
            </section>
          )}

          {/* Timeline */}
          <section>
            <h3 className="text-xs font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider mb-[var(--g-space-3)]">
              Timeline
            </h3>
            <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-md)] overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[hsl(var(--g-surface-subtle))] hover:bg-[hsl(var(--g-surface-subtle))]">
                    <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-32">Time</TableHead>
                    <TableHead className="text-[hsl(var(--g-text-primary))] font-medium">Event</TableHead>
                    <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-36">Actor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {incident.timeline.map((entry, idx) => (
                    <TableRow key={idx} className="hover:bg-[hsl(var(--g-surface-hover))]">
                      <TableCell className="text-[hsl(var(--g-text-secondary))] font-mono text-xs">
                        {formatTimestamp(entry.timestamp)}
                      </TableCell>
                      <TableCell className="text-[hsl(var(--g-text-primary))]">{entry.event}</TableCell>
                      <TableCell className="text-[hsl(var(--g-text-secondary))]">{entry.actor}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </section>

          {/* Corrective Actions (CAPA) */}
          <section>
            <h3 className="text-xs font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider mb-[var(--g-space-3)]">
              Corrective & Preventive Actions (CAPA)
            </h3>
            {incident.correctiveActions.length === 0 ? (
              <p className="text-sm text-[hsl(var(--g-text-secondary))] bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-md)] p-[var(--g-space-4)]">
                No corrective actions defined yet.
              </p>
            ) : (
              <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-md)] overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[hsl(var(--g-surface-subtle))] hover:bg-[hsl(var(--g-surface-subtle))]">
                      <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-24">ID</TableHead>
                      <TableHead className="text-[hsl(var(--g-text-primary))] font-medium">Action</TableHead>
                      <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-24">Type</TableHead>
                      <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-28">Status</TableHead>
                      <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-28">Due</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {incident.correctiveActions.map((action) => (
                      <TableRow key={action.id} className="hover:bg-[hsl(var(--g-surface-hover))]">
                        <TableCell className="text-[hsl(var(--g-text-primary))] font-medium">{action.id}</TableCell>
                        <TableCell className="text-[hsl(var(--g-text-secondary))]">{action.description}</TableCell>
                        <TableCell className="text-[hsl(var(--g-text-secondary))]">{action.type}</TableCell>
                        <TableCell>
                          <StatusIndicator 
                            status={capaStatusMapping[action.status].status} 
                            text={action.status} 
                          />
                        </TableCell>
                        <TableCell className="text-[hsl(var(--g-text-secondary))]">
                          {action.completedDate ? formatDate(action.completedDate) : formatDate(action.dueDate)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </section>

          {/* Linked Risks */}
          {linkedRisks.length > 0 && (
            <section>
              <h3 className="text-xs font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider mb-[var(--g-space-3)]">
                Linked Risks
              </h3>
              <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-md)] overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[hsl(var(--g-surface-subtle))] hover:bg-[hsl(var(--g-surface-subtle))]">
                      <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-24">Risk ID</TableHead>
                      <TableHead className="text-[hsl(var(--g-text-primary))] font-medium">Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {linkedRisks.map((risk) => (
                      <TableRow key={risk.id} className="hover:bg-[hsl(var(--g-surface-hover))]">
                        <TableCell className="text-[hsl(var(--g-text-primary))] font-medium">{risk.id}</TableCell>
                        <TableCell className="text-[hsl(var(--g-text-secondary))]">{risk.description}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </section>
          )}

          {/* Lessons Learned */}
          {incident.lessonsLearned && (
            <section>
              <h3 className="text-xs font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider mb-[var(--g-space-3)]">
                Lessons Learned
              </h3>
              <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-md)] p-[var(--g-space-4)]">
                <p className="text-sm text-[hsl(var(--g-text-primary))] leading-relaxed">{incident.lessonsLearned}</p>
              </div>
            </section>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default function Incidents() {
  const [statusFilter, setStatusFilter] = useState<IncidentStatus | "all">("all");
  const [severityFilter, setSeverityFilter] = useState<IncidentSeverity | "all">("all");
  const [systemFilter, setSystemFilter] = useState<string>("all");
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);

  const systems = useMemo(() => {
    const uniqueSystems = [...new Map(incidentsData.map(i => [i.aiSystemId, i.aiSystemName])).entries()];
    return uniqueSystems.sort((a, b) => a[1].localeCompare(b[1]));
  }, []);

  const filteredIncidents = useMemo(() => {
    return incidentsData.filter(incident => {
      if (statusFilter !== "all" && incident.status !== statusFilter) return false;
      if (severityFilter !== "all" && incident.severity !== severityFilter) return false;
      if (systemFilter !== "all" && incident.aiSystemId !== systemFilter) return false;
      return true;
    });
  }, [statusFilter, severityFilter, systemFilter]);

  const clearFilters = () => {
    setStatusFilter("all");
    setSeverityFilter("all");
    setSystemFilter("all");
  };

  const hasActiveFilters = statusFilter !== "all" || severityFilter !== "all" || systemFilter !== "all";

  // Summary stats
  const openIncidents = incidentsData.filter(i => i.status === "Open" || i.status === "Investigating").length;
  const pendingCAPAs = incidentsData.flatMap(i => i.correctiveActions).filter(c => c.status === "Pending" || c.status === "In Progress").length;
  const resolvedThisMonth = incidentsData.filter(i => i.resolvedDate?.startsWith("2026-01")).length;

  return (
    <AppLayout>
      <PageHeader
        title="Incidents & Continuous Improvement"
        subtitle="Incident handling and corrective actions"
      />
      <div className="p-[var(--g-space-6)]">
        {/* Summary Stats */}
        <section aria-labelledby="incident-summary" className="mb-[var(--g-space-5)]">
          <h2 id="incident-summary" className="sr-only">Incident Summary</h2>
          <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-lg)] overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-[hsl(var(--g-surface-subtle))] hover:bg-[hsl(var(--g-surface-subtle))]">
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium">Metric</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium text-right w-24">Value</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-40">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="hover:bg-[hsl(var(--g-surface-hover))]">
                  <TableCell className="text-[hsl(var(--g-text-secondary))]">Total Incidents Recorded</TableCell>
                  <TableCell className="text-[hsl(var(--g-text-primary))] font-semibold text-right">{incidentsData.length}</TableCell>
                  <TableCell>
                    <StatusIndicator status="neutral" text="Tracked" />
                  </TableCell>
                </TableRow>
                <TableRow className="hover:bg-[hsl(var(--g-surface-hover))]">
                  <TableCell className="text-[hsl(var(--g-text-secondary))]">Open / Investigating</TableCell>
                  <TableCell className="text-[hsl(var(--g-text-primary))] font-semibold text-right">{openIncidents}</TableCell>
                  <TableCell>
                    <StatusIndicator status={openIncidents > 2 ? "warning" : "success"} text={openIncidents > 2 ? "Attention Needed" : "Manageable"} />
                  </TableCell>
                </TableRow>
                <TableRow className="hover:bg-[hsl(var(--g-surface-hover))]">
                  <TableCell className="text-[hsl(var(--g-text-secondary))]">Pending / In-Progress CAPAs</TableCell>
                  <TableCell className="text-[hsl(var(--g-text-primary))] font-semibold text-right">{pendingCAPAs}</TableCell>
                  <TableCell>
                    <StatusIndicator status={pendingCAPAs > 5 ? "warning" : "neutral"} text={pendingCAPAs > 5 ? "Review Backlog" : "On Track"} />
                  </TableCell>
                </TableRow>
                <TableRow className="hover:bg-[hsl(var(--g-surface-hover))]">
                  <TableCell className="text-[hsl(var(--g-text-secondary))]">Resolved This Month</TableCell>
                  <TableCell className="text-[hsl(var(--g-text-primary))] font-semibold text-right">{resolvedThisMonth}</TableCell>
                  <TableCell>
                    <StatusIndicator status="success" text="Improvement" />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </section>

        {/* Filters */}
        <section aria-labelledby="filters-heading" className="mb-[var(--g-space-5)]">
          <h2 id="filters-heading" className="sr-only">Filters</h2>
          <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-lg)] p-[var(--g-space-4)]">
            <div className="flex flex-wrap items-end gap-[var(--g-space-4)]">
              <div className="flex flex-col gap-[var(--g-space-2)]">
                <Label htmlFor="severity-filter" className="text-xs text-[hsl(var(--g-text-secondary))]">Severity</Label>
                <Select value={severityFilter} onValueChange={(v) => setSeverityFilter(v as IncidentSeverity | "all")}>
                  <SelectTrigger id="severity-filter" className="w-[120px] h-9 text-sm bg-[hsl(var(--g-surface-base))] border-[hsl(var(--g-border-default))]">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="Critical">Critical</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-[var(--g-space-2)]">
                <Label htmlFor="status-filter" className="text-xs text-[hsl(var(--g-text-secondary))]">Status</Label>
                <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as IncidentStatus | "all")}>
                  <SelectTrigger id="status-filter" className="w-[140px] h-9 text-sm bg-[hsl(var(--g-surface-base))] border-[hsl(var(--g-border-default))]">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="Open">Open</SelectItem>
                    <SelectItem value="Investigating">Investigating</SelectItem>
                    <SelectItem value="Resolved">Resolved</SelectItem>
                    <SelectItem value="Closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-[var(--g-space-2)]">
                <Label htmlFor="system-filter" className="text-xs text-[hsl(var(--g-text-secondary))]">AI System</Label>
                <Select value={systemFilter} onValueChange={setSystemFilter}>
                  <SelectTrigger id="system-filter" className="w-[220px] h-9 text-sm bg-[hsl(var(--g-surface-base))] border-[hsl(var(--g-border-default))]">
                    <SelectValue placeholder="All Systems" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Systems</SelectItem>
                    {systems.map(([id, name]) => (
                      <SelectItem key={id} value={id}>{name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-[hsl(var(--g-link))] hover:text-[hsl(var(--g-link-hover))] hover:underline focus:outline-none focus:ring-2 focus:ring-[hsl(var(--g-border-strong))] rounded px-2 py-1"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Incident Register Table */}
        <section aria-labelledby="incident-register">
          <div className="flex items-baseline justify-between mb-[var(--g-space-4)]">
            <h2 
              id="incident-register" 
              className="text-sm font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider"
            >
              Incident Register
            </h2>
            <span className="text-sm text-[hsl(var(--g-text-secondary))]">
              {filteredIncidents.length} incidents · Click row for details
            </span>
          </div>
          <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-lg)] overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-[hsl(var(--g-surface-subtle))] hover:bg-[hsl(var(--g-surface-subtle))]">
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-24">Incident ID</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-44">AI System</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-24">Severity</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium">Description</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-28">Status</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-28">Root Cause</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-24">Postmortem</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-20">CAPAs</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredIncidents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-[hsl(var(--g-text-secondary))]">
                      No incidents match the selected filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredIncidents.map((incident) => (
                    <TableRow 
                      key={incident.id} 
                      className="hover:bg-[hsl(var(--g-surface-hover))] cursor-pointer"
                      onClick={() => setSelectedIncident(incident)}
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === 'Enter') setSelectedIncident(incident); }}
                      role="button"
                      aria-label={`View details for ${incident.id}`}
                    >
                      <TableCell className="text-[hsl(var(--g-text-primary))] font-medium">{incident.id}</TableCell>
                      <TableCell className="text-[hsl(var(--g-text-primary))]">{incident.aiSystemName}</TableCell>
                      <TableCell>
                        <SeverityIndicator severity={incident.severity} />
                      </TableCell>
                      <TableCell className="text-[hsl(var(--g-text-secondary))] truncate max-w-[200px]" title={incident.description}>
                        {incident.description}
                      </TableCell>
                      <TableCell>
                        <StatusIndicator 
                          status={incidentStatusMapping[incident.status].status} 
                          text={incident.status} 
                        />
                      </TableCell>
                      <TableCell>
                        <BooleanIndicator 
                          value={incident.rootCauseIdentified} 
                          trueText="Yes" 
                          falseText="Pending" 
                        />
                      </TableCell>
                      <TableCell className="text-[hsl(var(--g-text-secondary))]">
                        {incident.linkedPostmortem || "—"}
                      </TableCell>
                      <TableCell className="text-[hsl(var(--g-text-primary))] text-center">
                        {incident.correctiveActions.length}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </section>
      </div>

      {/* Detail Panel */}
      {selectedIncident && (
        <IncidentDetailPanel incident={selectedIncident} onClose={() => setSelectedIncident(null)} />
      )}
    </AppLayout>
  );
}
