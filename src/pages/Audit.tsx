import { useState, useMemo } from "react";
import { AppLayout, PageHeader } from "@/components/layout";
import { StatusIndicator } from "@/components/indicators/StatusIndicator";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, FileText, AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import {
  isoClauses,
  nonConformities,
  coverageMetrics,
  clauseStatusMapping,
  ncStatusMapping,
  ncSeverityMapping,
  type ISOClause,
  type NonConformity,
  type ClauseStatus,
  type NCStatus,
  type NCSeverity,
} from "@/data/audit";

// Filter options
const clauseStatusOptions: ClauseStatus[] = ["Compliant", "Partially Compliant", "Non-Compliant", "Not Assessed"];
const ncStatusOptions: NCStatus[] = ["Open", "In Progress", "Closed", "Verified"];
const ncSeverityOptions: NCSeverity[] = ["Major", "Minor", "Observation"];

export default function Audit() {
  // State for clause checklist
  const [clauseStatusFilter, setClauseStatusFilter] = useState<string>("all");
  const [selectedClause, setSelectedClause] = useState<ISOClause | null>(null);
  const [isClauseDetailOpen, setIsClauseDetailOpen] = useState(false);

  // State for non-conformity register
  const [ncStatusFilter, setNCStatusFilter] = useState<string>("all");
  const [ncSeverityFilter, setNCSeverityFilter] = useState<string>("all");
  const [selectedNC, setSelectedNC] = useState<NonConformity | null>(null);
  const [isNCDetailOpen, setIsNCDetailOpen] = useState(false);

  // Filtered clauses
  const filteredClauses = useMemo(() => {
    return isoClauses.filter((clause) => {
      if (clauseStatusFilter !== "all" && clause.status !== clauseStatusFilter) return false;
      return true;
    });
  }, [clauseStatusFilter]);

  // Filtered non-conformities
  const filteredNCs = useMemo(() => {
    return nonConformities.filter((nc) => {
      if (ncStatusFilter !== "all" && nc.status !== ncStatusFilter) return false;
      if (ncSeverityFilter !== "all" && nc.severity !== ncSeverityFilter) return false;
      return true;
    });
  }, [ncStatusFilter, ncSeverityFilter]);

  // Summary metrics
  const openNCs = nonConformities.filter(nc => nc.status === "Open" || nc.status === "In Progress").length;
  const majorNCs = nonConformities.filter(nc => nc.severity === "Major" && nc.status !== "Closed" && nc.status !== "Verified").length;

  const handleClauseClick = (clause: ISOClause) => {
    setSelectedClause(clause);
    setIsClauseDetailOpen(true);
  };

  const handleNCClick = (nc: NonConformity) => {
    setSelectedNC(nc);
    setIsNCDetailOpen(true);
  };

  return (
    <AppLayout>
      <PageHeader
        title="Audit & Certification"
        subtitle="ISO 42001 clause compliance tracking and certification readiness"
      />
      <div className="p-[var(--g-space-6)]">
        {/* Read-Only Mode Indicator */}
        <div className="bg-[hsl(var(--g-surface-subtle))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-lg)] p-[var(--g-space-4)] mb-[var(--g-space-6)]">
          <div className="flex items-center gap-[var(--g-space-3)]">
            <Eye className="h-4 w-4 text-[hsl(var(--g-text-secondary))] shrink-0" aria-hidden="true" />
            <p className="text-sm text-[hsl(var(--g-text-secondary))]">
              <span className="font-medium text-[hsl(var(--g-text-primary))]">Read-Only Mode</span> — This module supports internal and external audits with ISO clause tracking.
            </p>
          </div>
        </div>

        {/* Coverage Summary */}
        <section aria-labelledby="coverage-summary" className="mb-[var(--g-space-7)]">
          <h2
            id="coverage-summary"
            className="text-sm font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider mb-[var(--g-space-4)]"
          >
            Coverage Summary
          </h2>
          <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-lg)] overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-[hsl(var(--g-surface-subtle))]">
                  <TableHead className="text-xs font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider">Metric</TableHead>
                  <TableHead className="text-xs font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider">Count</TableHead>
                  <TableHead className="text-xs font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider">Coverage</TableHead>
                  <TableHead className="text-xs font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {coverageMetrics.map((metric) => (
                  <TableRow key={metric.label}>
                    <TableCell className="text-sm text-[hsl(var(--g-text-primary))]">{metric.label}</TableCell>
                    <TableCell className="text-sm font-mono text-[hsl(var(--g-text-primary))]">{metric.value}</TableCell>
                    <TableCell className="text-sm font-mono text-[hsl(var(--g-text-secondary))]">
                      {Math.round((metric.value / metric.total) * 100)}%
                    </TableCell>
                    <TableCell>
                      <StatusIndicator status={metric.status} text={metric.status === "success" ? "Good" : metric.status === "warning" ? "Attention" : "Action Required"} />
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-[hsl(var(--g-surface-subtle))]">
                  <TableCell className="text-sm font-medium text-[hsl(var(--g-text-primary))]">Open Non-Conformities</TableCell>
                  <TableCell className="text-sm font-mono text-[hsl(var(--g-text-primary))]">{openNCs}</TableCell>
                  <TableCell className="text-sm text-[hsl(var(--g-text-secondary))]">—</TableCell>
                  <TableCell>
                    <StatusIndicator status={openNCs > 0 ? "warning" : "success"} text={openNCs > 0 ? "In Progress" : "Clear"} />
                  </TableCell>
                </TableRow>
                <TableRow className="bg-[hsl(var(--g-surface-subtle))]">
                  <TableCell className="text-sm font-medium text-[hsl(var(--g-text-primary))]">Major NCs Outstanding</TableCell>
                  <TableCell className="text-sm font-mono text-[hsl(var(--g-text-primary))]">{majorNCs}</TableCell>
                  <TableCell className="text-sm text-[hsl(var(--g-text-secondary))]">—</TableCell>
                  <TableCell>
                    <StatusIndicator status={majorNCs > 0 ? "critical" : "success"} text={majorNCs > 0 ? "Critical" : "Clear"} />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </section>

        {/* Tabs for Clause Checklist and Non-Conformity Register */}
        <Tabs defaultValue="clauses" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 bg-[hsl(var(--g-surface-subtle))] p-1 rounded-[var(--g-radius-md)]">
            <TabsTrigger
              value="clauses"
              className="text-sm data-[state=active]:bg-[hsl(var(--g-surface-card))] data-[state=active]:text-[hsl(var(--g-text-primary))] rounded-[var(--g-radius-sm)]"
            >
              <FileText className="h-4 w-4 mr-2" aria-hidden="true" />
              ISO 42001 Clauses
            </TabsTrigger>
            <TabsTrigger
              value="ncs"
              className="text-sm data-[state=active]:bg-[hsl(var(--g-surface-card))] data-[state=active]:text-[hsl(var(--g-text-primary))] rounded-[var(--g-radius-sm)]"
            >
              <AlertTriangle className="h-4 w-4 mr-2" aria-hidden="true" />
              Non-Conformities
              {openNCs > 0 && (
                <span className="ml-2 px-1.5 py-0.5 text-xs font-medium bg-[hsl(var(--g-status-warning)/0.15)] text-[hsl(var(--g-status-warning))] rounded">
                  {openNCs}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          {/* ISO 42001 Clause Checklist Tab */}
          <TabsContent value="clauses" className="mt-[var(--g-space-5)]">
            <div className="flex items-center gap-[var(--g-space-4)] mb-[var(--g-space-4)]">
              <Select value={clauseStatusFilter} onValueChange={setClauseStatusFilter}>
                <SelectTrigger className="w-[200px] bg-[hsl(var(--g-surface-card))] border-[hsl(var(--g-border-default))]">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {clauseStatusOptions.map((status) => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className="text-sm text-[hsl(var(--g-text-secondary))]">
                {filteredClauses.length} of {isoClauses.length} clauses
              </span>
            </div>

            <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-lg)] overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[hsl(var(--g-surface-subtle))]">
                    <TableHead className="text-xs font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider w-20">Clause</TableHead>
                    <TableHead className="text-xs font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider">Title</TableHead>
                    <TableHead className="text-xs font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider w-40">Status</TableHead>
                    <TableHead className="text-xs font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider w-24 text-center">Evidence</TableHead>
                    <TableHead className="text-xs font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider w-32">Last Audit</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClauses.map((clause) => {
                    const statusInfo = clauseStatusMapping[clause.status];
                    return (
                      <TableRow
                        key={clause.id}
                        onClick={() => handleClauseClick(clause)}
                        className="cursor-pointer hover:bg-[hsl(var(--g-surface-subtle))]"
                      >
                        <TableCell className="text-sm font-mono font-medium text-[hsl(var(--g-text-primary))]">
                          {clause.clause}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-[hsl(var(--g-text-primary))]">{clause.title}</div>
                        </TableCell>
                        <TableCell>
                          <StatusIndicator status={statusInfo.status} text={statusInfo.text} />
                        </TableCell>
                        <TableCell className="text-center">
                          <span className="inline-flex items-center gap-1 text-sm text-[hsl(var(--g-text-secondary))]">
                            <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                            {clause.evidenceCount}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm text-[hsl(var(--g-text-secondary))]">
                          {clause.lastAuditDate || "—"}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Non-Conformity Register Tab */}
          <TabsContent value="ncs" className="mt-[var(--g-space-5)]">
            <div className="flex items-center gap-[var(--g-space-4)] mb-[var(--g-space-4)]">
              <Select value={ncStatusFilter} onValueChange={setNCStatusFilter}>
                <SelectTrigger className="w-[160px] bg-[hsl(var(--g-surface-card))] border-[hsl(var(--g-border-default))]">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {ncStatusOptions.map((status) => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={ncSeverityFilter} onValueChange={setNCSeverityFilter}>
                <SelectTrigger className="w-[160px] bg-[hsl(var(--g-surface-card))] border-[hsl(var(--g-border-default))]">
                  <SelectValue placeholder="Filter by Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severities</SelectItem>
                  {ncSeverityOptions.map((severity) => (
                    <SelectItem key={severity} value={severity}>{severity}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className="text-sm text-[hsl(var(--g-text-secondary))]">
                {filteredNCs.length} of {nonConformities.length} non-conformities
              </span>
            </div>

            <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-lg)] overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[hsl(var(--g-surface-subtle))]">
                    <TableHead className="text-xs font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider w-24">NC ID</TableHead>
                    <TableHead className="text-xs font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider w-20">Clause</TableHead>
                    <TableHead className="text-xs font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider">Description</TableHead>
                    <TableHead className="text-xs font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider w-28">Severity</TableHead>
                    <TableHead className="text-xs font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider w-28">Status</TableHead>
                    <TableHead className="text-xs font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider w-28">Due Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredNCs.map((nc) => {
                    const statusInfo = ncStatusMapping[nc.status];
                    const severityInfo = ncSeverityMapping[nc.severity];
                    const isOverdue = new Date(nc.dueDate) < new Date() && nc.status !== "Closed" && nc.status !== "Verified";
                    return (
                      <TableRow
                        key={nc.id}
                        onClick={() => handleNCClick(nc)}
                        className="cursor-pointer hover:bg-[hsl(var(--g-surface-subtle))]"
                      >
                        <TableCell className="text-sm font-mono font-medium text-[hsl(var(--g-text-primary))]">
                          {nc.id}
                        </TableCell>
                        <TableCell className="text-sm font-mono text-[hsl(var(--g-text-secondary))]">
                          {nc.clauseId}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-[hsl(var(--g-text-primary))] line-clamp-2">{nc.description}</div>
                        </TableCell>
                        <TableCell>
                          <StatusIndicator status={severityInfo.status} text={severityInfo.text} />
                        </TableCell>
                        <TableCell>
                          <StatusIndicator status={statusInfo.status} text={statusInfo.text} />
                        </TableCell>
                        <TableCell>
                          <span className={`text-sm ${isOverdue ? "text-[hsl(var(--g-status-critical))] font-medium" : "text-[hsl(var(--g-text-secondary))]"}`}>
                            {isOverdue && <Clock className="inline h-3.5 w-3.5 mr-1" aria-hidden="true" />}
                            {nc.dueDate}
                          </span>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Clause Detail Sheet */}
      <Sheet open={isClauseDetailOpen} onOpenChange={setIsClauseDetailOpen}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto bg-[hsl(var(--g-surface-card))] border-l border-[hsl(var(--g-border-default))]">
          {selectedClause && (
            <>
              <SheetHeader className="pb-[var(--g-space-5)] border-b border-[hsl(var(--g-border-subtle))]">
                <div className="flex items-center gap-[var(--g-space-3)]">
                  <span className="text-lg font-mono font-medium text-[hsl(var(--g-text-primary))]">
                    Clause {selectedClause.clause}
                  </span>
                  <StatusIndicator
                    status={clauseStatusMapping[selectedClause.status].status}
                    text={clauseStatusMapping[selectedClause.status].text}
                  />
                </div>
                <SheetTitle className="text-lg font-semibold text-[hsl(var(--g-text-primary))] mt-[var(--g-space-2)]">
                  {selectedClause.title}
                </SheetTitle>
              </SheetHeader>

              <div className="py-[var(--g-space-5)] space-y-[var(--g-space-6)]">
                {/* Description */}
                <section>
                  <h3 className="text-xs font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider mb-[var(--g-space-2)]">
                    Requirement
                  </h3>
                  <p className="text-sm text-[hsl(var(--g-text-primary))]">{selectedClause.description}</p>
                </section>

                {/* Audit Details */}
                <section>
                  <h3 className="text-xs font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider mb-[var(--g-space-3)]">
                    Audit Details
                  </h3>
                  <div className="bg-[hsl(var(--g-surface-subtle))] rounded-[var(--g-radius-md)] p-[var(--g-space-4)] space-y-[var(--g-space-3)]">
                    <div className="flex justify-between">
                      <span className="text-sm text-[hsl(var(--g-text-secondary))]">Last Audit Date</span>
                      <span className="text-sm font-medium text-[hsl(var(--g-text-primary))]">{selectedClause.lastAuditDate || "Not audited"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-[hsl(var(--g-text-secondary))]">Auditor</span>
                      <span className="text-sm font-medium text-[hsl(var(--g-text-primary))]">{selectedClause.auditor || "—"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-[hsl(var(--g-text-secondary))]">Evidence Items</span>
                      <span className="text-sm font-medium text-[hsl(var(--g-text-primary))]">{selectedClause.evidenceCount}</span>
                    </div>
                  </div>
                </section>

                {/* Notes */}
                {selectedClause.notes && (
                  <section>
                    <h3 className="text-xs font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider mb-[var(--g-space-2)]">
                      Auditor Notes
                    </h3>
                    <div className="bg-[hsl(var(--g-status-warning)/0.1)] border border-[hsl(var(--g-status-warning)/0.3)] rounded-[var(--g-radius-md)] p-[var(--g-space-4)]">
                      <p className="text-sm text-[hsl(var(--g-text-primary))]">{selectedClause.notes}</p>
                    </div>
                  </section>
                )}

                {/* Related Non-Conformities */}
                <section>
                  <h3 className="text-xs font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider mb-[var(--g-space-3)]">
                    Related Non-Conformities
                  </h3>
                  {(() => {
                    const relatedNCs = nonConformities.filter(nc => nc.clauseId === selectedClause.clause);
                    if (relatedNCs.length === 0) {
                      return (
                        <div className="flex items-center gap-[var(--g-space-2)] text-sm text-[hsl(var(--g-text-secondary))]">
                          <CheckCircle2 className="h-4 w-4 text-[hsl(var(--g-status-success))]" aria-hidden="true" />
                          No non-conformities raised
                        </div>
                      );
                    }
                    return (
                      <div className="bg-[hsl(var(--g-surface-subtle))] rounded-[var(--g-radius-md)] overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="text-xs font-medium text-[hsl(var(--g-text-secondary))] uppercase">NC ID</TableHead>
                              <TableHead className="text-xs font-medium text-[hsl(var(--g-text-secondary))] uppercase">Severity</TableHead>
                              <TableHead className="text-xs font-medium text-[hsl(var(--g-text-secondary))] uppercase">Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {relatedNCs.map((nc) => (
                              <TableRow key={nc.id}>
                                <TableCell className="text-sm font-mono text-[hsl(var(--g-text-primary))]">{nc.id}</TableCell>
                                <TableCell>
                                  <StatusIndicator status={ncSeverityMapping[nc.severity].status} text={nc.severity} />
                                </TableCell>
                                <TableCell>
                                  <StatusIndicator status={ncStatusMapping[nc.status].status} text={nc.status} />
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    );
                  })()}
                </section>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Non-Conformity Detail Sheet */}
      <Sheet open={isNCDetailOpen} onOpenChange={setIsNCDetailOpen}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto bg-[hsl(var(--g-surface-card))] border-l border-[hsl(var(--g-border-default))]">
          {selectedNC && (
            <>
              <SheetHeader className="pb-[var(--g-space-5)] border-b border-[hsl(var(--g-border-subtle))]">
                <div className="flex items-center gap-[var(--g-space-3)]">
                  <span className="text-lg font-mono font-medium text-[hsl(var(--g-text-primary))]">
                    {selectedNC.id}
                  </span>
                  <StatusIndicator
                    status={ncSeverityMapping[selectedNC.severity].status}
                    text={selectedNC.severity}
                  />
                  <StatusIndicator
                    status={ncStatusMapping[selectedNC.status].status}
                    text={selectedNC.status}
                  />
                </div>
                <SheetTitle className="text-lg font-semibold text-[hsl(var(--g-text-primary))] mt-[var(--g-space-2)]">
                  Clause {selectedNC.clauseId}: {selectedNC.clauseTitle}
                </SheetTitle>
              </SheetHeader>

              <div className="py-[var(--g-space-5)] space-y-[var(--g-space-6)]">
                {/* Description */}
                <section>
                  <h3 className="text-xs font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider mb-[var(--g-space-2)]">
                    Finding Description
                  </h3>
                  <p className="text-sm text-[hsl(var(--g-text-primary))]">{selectedNC.description}</p>
                </section>

                {/* Root Cause */}
                <section>
                  <h3 className="text-xs font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider mb-[var(--g-space-2)]">
                    Root Cause Analysis
                  </h3>
                  <p className="text-sm text-[hsl(var(--g-text-primary))]">{selectedNC.rootCause}</p>
                </section>

                {/* Corrective Action */}
                <section>
                  <h3 className="text-xs font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider mb-[var(--g-space-2)]">
                    Corrective Action
                  </h3>
                  <div className="bg-[hsl(var(--g-surface-subtle))] rounded-[var(--g-radius-md)] p-[var(--g-space-4)]">
                    <p className="text-sm text-[hsl(var(--g-text-primary))]">{selectedNC.correctiveAction}</p>
                  </div>
                </section>

                {/* Timeline */}
                <section>
                  <h3 className="text-xs font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider mb-[var(--g-space-3)]">
                    Timeline & Ownership
                  </h3>
                  <div className="bg-[hsl(var(--g-surface-subtle))] rounded-[var(--g-radius-md)] p-[var(--g-space-4)] space-y-[var(--g-space-3)]">
                    <div className="flex justify-between">
                      <span className="text-sm text-[hsl(var(--g-text-secondary))]">Owner</span>
                      <span className="text-sm font-medium text-[hsl(var(--g-text-primary))]">{selectedNC.owner}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-[hsl(var(--g-text-secondary))]">Raised Date</span>
                      <span className="text-sm font-medium text-[hsl(var(--g-text-primary))]">{selectedNC.raisedDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-[hsl(var(--g-text-secondary))]">Due Date</span>
                      <span className={`text-sm font-medium ${new Date(selectedNC.dueDate) < new Date() && selectedNC.status !== "Closed" && selectedNC.status !== "Verified" ? "text-[hsl(var(--g-status-critical))]" : "text-[hsl(var(--g-text-primary))]"}`}>
                        {selectedNC.dueDate}
                      </span>
                    </div>
                    {selectedNC.closedDate && (
                      <div className="flex justify-between">
                        <span className="text-sm text-[hsl(var(--g-text-secondary))]">Closed Date</span>
                        <span className="text-sm font-medium text-[hsl(var(--g-status-success))]">{selectedNC.closedDate}</span>
                      </div>
                    )}
                  </div>
                </section>

                {/* Verification Notes */}
                {selectedNC.verificationNotes && (
                  <section>
                    <h3 className="text-xs font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider mb-[var(--g-space-2)]">
                      Verification Notes
                    </h3>
                    <div className="bg-[hsl(var(--g-status-success)/0.1)] border border-[hsl(var(--g-status-success)/0.3)] rounded-[var(--g-radius-md)] p-[var(--g-space-4)]">
                      <p className="text-sm text-[hsl(var(--g-text-primary))]">{selectedNC.verificationNotes}</p>
                    </div>
                  </section>
                )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </AppLayout>
  );
}
