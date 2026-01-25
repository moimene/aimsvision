import { useState, useMemo } from "react";
import { AppLayout, PageHeader } from "@/components/layout";
import { StatusIndicator } from "@/components/indicators";
import { 
  riskData, 
  riskStatusMapping, 
  impactLabels, 
  probabilityLabels,
  riskCategories,
  type RiskStatus,
  type RiskCategory,
  type RiskEntry,
} from "@/data/risks";
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
import { AlertTriangle, XCircle, AlertCircle, CheckCircle, Clock, X } from "lucide-react";

type ScoreThreshold = "all" | "critical" | "high" | "medium" | "low";

function ScoreIndicator({ score, showLabel = true }: { score: number; showLabel?: boolean }) {
  let Icon = AlertCircle;
  let colorClass = "text-[hsl(var(--g-text-secondary))]";
  let label = "Low";

  if (score >= 15) {
    Icon = XCircle;
    colorClass = "text-[hsl(var(--g-status-critical))]";
    label = "Critical";
  } else if (score >= 10) {
    Icon = AlertTriangle;
    colorClass = "text-[hsl(var(--g-status-critical))]";
    label = "High";
  } else if (score >= 6) {
    Icon = AlertCircle;
    colorClass = "text-[hsl(var(--g-status-warning))]";
    label = "Medium";
  }

  return (
    <span className={`inline-flex items-center gap-[var(--g-space-2)] ${colorClass}`}>
      <Icon className="h-4 w-4" aria-hidden="true" />
      <span className="text-sm font-medium">{score}</span>
      {showLabel && <span className="text-xs">({label})</span>}
    </span>
  );
}

function EffectivenessIndicator({ effectiveness }: { effectiveness: string }) {
  const config: Record<string, { icon: typeof CheckCircle; colorClass: string }> = {
    "Effective": { icon: CheckCircle, colorClass: "text-[hsl(var(--g-status-success))]" },
    "Partially Effective": { icon: AlertCircle, colorClass: "text-[hsl(var(--g-status-warning))]" },
    "Ineffective": { icon: XCircle, colorClass: "text-[hsl(var(--g-status-critical))]" },
    "Not Tested": { icon: Clock, colorClass: "text-[hsl(var(--g-text-secondary))]" },
  };
  const { icon: Icon, colorClass } = config[effectiveness] || config["Not Tested"];

  return (
    <span className={`inline-flex items-center gap-[var(--g-space-2)] ${colorClass}`}>
      <Icon className="h-4 w-4" aria-hidden="true" />
      <span className="text-sm">{effectiveness}</span>
    </span>
  );
}

function TestResultIndicator({ result }: { result: string }) {
  const config: Record<string, { icon: typeof CheckCircle; colorClass: string }> = {
    "Pass": { icon: CheckCircle, colorClass: "text-[hsl(var(--g-status-success))]" },
    "Warning": { icon: AlertTriangle, colorClass: "text-[hsl(var(--g-status-warning))]" },
    "Fail": { icon: XCircle, colorClass: "text-[hsl(var(--g-status-critical))]" },
  };
  const { icon: Icon, colorClass } = config[result] || config["Warning"];

  return (
    <span className={`inline-flex items-center gap-[var(--g-space-2)] ${colorClass}`}>
      <Icon className="h-4 w-4" aria-hidden="true" />
      <span className="text-sm">{result}</span>
    </span>
  );
}

function RiskDetailPanel({ risk, onClose }: { risk: RiskEntry; onClose: () => void }) {
  return (
    <Sheet open={true} onOpenChange={onClose}>
      <SheetContent className="w-[500px] sm:w-[600px] bg-[hsl(var(--g-surface-base))] border-l border-[hsl(var(--g-border-default))] overflow-y-auto">
        <SheetHeader className="border-b border-[hsl(var(--g-border-default))] pb-[var(--g-space-4)]">
          <SheetTitle className="text-[hsl(var(--g-text-primary))]">{risk.id}: {risk.description}</SheetTitle>
          <SheetDescription className="text-[hsl(var(--g-text-secondary))]">
            {risk.aiSystemName} · {risk.category}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-[var(--g-space-5)] space-y-[var(--g-space-6)]">
          {/* Risk Summary */}
          <section>
            <h3 className="text-xs font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider mb-[var(--g-space-3)]">
              Risk Summary
            </h3>
            <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-md)] overflow-hidden">
              <Table>
                <TableBody>
                  <TableRow className="hover:bg-[hsl(var(--g-surface-hover))]">
                    <TableCell className="text-[hsl(var(--g-text-secondary))] w-36">Impact</TableCell>
                    <TableCell className="text-[hsl(var(--g-text-primary))]">{risk.impact} - {impactLabels[risk.impact]}</TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-[hsl(var(--g-surface-hover))]">
                    <TableCell className="text-[hsl(var(--g-text-secondary))]">Probability</TableCell>
                    <TableCell className="text-[hsl(var(--g-text-primary))]">{risk.probability} - {probabilityLabels[risk.probability]}</TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-[hsl(var(--g-surface-hover))]">
                    <TableCell className="text-[hsl(var(--g-text-secondary))]">Inherent Risk</TableCell>
                    <TableCell><ScoreIndicator score={risk.score} /></TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-[hsl(var(--g-surface-hover))]">
                    <TableCell className="text-[hsl(var(--g-text-secondary))]">Residual Risk</TableCell>
                    <TableCell><ScoreIndicator score={risk.residualRisk} /></TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-[hsl(var(--g-surface-hover))]">
                    <TableCell className="text-[hsl(var(--g-text-secondary))]">Status</TableCell>
                    <TableCell><StatusIndicator status={riskStatusMapping[risk.status].status} text={risk.status} /></TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-[hsl(var(--g-surface-hover))]">
                    <TableCell className="text-[hsl(var(--g-text-secondary))]">Owner</TableCell>
                    <TableCell className="text-[hsl(var(--g-text-primary))]">{risk.owner}</TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-[hsl(var(--g-surface-hover))]">
                    <TableCell className="text-[hsl(var(--g-text-secondary))]">Review Date</TableCell>
                    <TableCell className="text-[hsl(var(--g-text-primary))]">{risk.reviewDate}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </section>

          {/* Linked Controls */}
          <section>
            <h3 className="text-xs font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider mb-[var(--g-space-3)]">
              Linked Controls
            </h3>
            {risk.linkedControls.length === 0 ? (
              <p className="text-sm text-[hsl(var(--g-text-secondary))] bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-md)] p-[var(--g-space-4)]">
                No controls linked to this risk.
              </p>
            ) : (
              <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-md)] overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[hsl(var(--g-surface-subtle))] hover:bg-[hsl(var(--g-surface-subtle))]">
                      <TableHead className="text-[hsl(var(--g-text-primary))] font-medium">Control</TableHead>
                      <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-40">Effectiveness</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {risk.linkedControls.map((control) => (
                      <TableRow key={control.id} className="hover:bg-[hsl(var(--g-surface-hover))]">
                        <TableCell>
                          <span className="text-[hsl(var(--g-text-primary))]">{control.name}</span>
                          <span className="text-xs text-[hsl(var(--g-text-secondary))] ml-2">{control.id}</span>
                        </TableCell>
                        <TableCell>
                          <EffectivenessIndicator effectiveness={control.effectiveness} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </section>

          {/* Test Evidence */}
          <section>
            <h3 className="text-xs font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider mb-[var(--g-space-3)]">
              Test Evidence
            </h3>
            {risk.testEvidence.length === 0 ? (
              <p className="text-sm text-[hsl(var(--g-text-secondary))] bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-md)] p-[var(--g-space-4)]">
                No test evidence available.
              </p>
            ) : (
              <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-md)] overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[hsl(var(--g-surface-subtle))] hover:bg-[hsl(var(--g-surface-subtle))]">
                      <TableHead className="text-[hsl(var(--g-text-primary))] font-medium">Test</TableHead>
                      <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-24">Date</TableHead>
                      <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-24">Result</TableHead>
                      <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-20">Source</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {risk.testEvidence.map((test) => (
                      <TableRow key={test.id} className="hover:bg-[hsl(var(--g-surface-hover))]">
                        <TableCell className="text-[hsl(var(--g-text-primary))]">{test.testName}</TableCell>
                        <TableCell className="text-[hsl(var(--g-text-secondary))]">{test.testDate}</TableCell>
                        <TableCell>
                          <TestResultIndicator result={test.result} />
                        </TableCell>
                        <TableCell className="text-[hsl(var(--g-text-secondary))]">{test.source}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </section>

          {/* Galtea Metrics */}
          {risk.galteaMetrics && (
            <section>
              <h3 className="text-xs font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider mb-[var(--g-space-3)]">
                Galtea Metrics <span className="text-[hsl(var(--g-text-secondary))] font-normal">(Read-only)</span>
              </h3>
              <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-md)] overflow-hidden">
                <Table>
                  <TableBody>
                    {risk.galteaMetrics.fairnessScore !== undefined && (
                      <TableRow className="hover:bg-[hsl(var(--g-surface-hover))]">
                        <TableCell className="text-[hsl(var(--g-text-secondary))] w-36">Fairness Score</TableCell>
                        <TableCell className="text-[hsl(var(--g-text-primary))]">{risk.galteaMetrics.fairnessScore}%</TableCell>
                      </TableRow>
                    )}
                    {risk.galteaMetrics.accuracyScore !== undefined && (
                      <TableRow className="hover:bg-[hsl(var(--g-surface-hover))]">
                        <TableCell className="text-[hsl(var(--g-text-secondary))]">Accuracy Score</TableCell>
                        <TableCell className="text-[hsl(var(--g-text-primary))]">{risk.galteaMetrics.accuracyScore}%</TableCell>
                      </TableRow>
                    )}
                    {risk.galteaMetrics.driftScore !== undefined && (
                      <TableRow className="hover:bg-[hsl(var(--g-surface-hover))]">
                        <TableCell className="text-[hsl(var(--g-text-secondary))]">Drift Score</TableCell>
                        <TableCell className="text-[hsl(var(--g-text-primary))]">{risk.galteaMetrics.driftScore}%</TableCell>
                      </TableRow>
                    )}
                    {risk.galteaMetrics.lastUpdated && (
                      <TableRow className="hover:bg-[hsl(var(--g-surface-hover))]">
                        <TableCell className="text-[hsl(var(--g-text-secondary))]">Last Updated</TableCell>
                        <TableCell className="text-[hsl(var(--g-text-secondary))]">{risk.galteaMetrics.lastUpdated}</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </section>
          )}

          {/* Acceptance Record */}
          {risk.acceptanceRecord && (
            <section>
              <h3 className="text-xs font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider mb-[var(--g-space-3)]">
                Acceptance Record
              </h3>
              <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-md)] overflow-hidden">
                <Table>
                  <TableBody>
                    <TableRow className="hover:bg-[hsl(var(--g-surface-hover))]">
                      <TableCell className="text-[hsl(var(--g-text-secondary))] w-36">Accepted By</TableCell>
                      <TableCell className="text-[hsl(var(--g-text-primary))]">{risk.acceptanceRecord.acceptedBy}</TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-[hsl(var(--g-surface-hover))]">
                      <TableCell className="text-[hsl(var(--g-text-secondary))]">Accepted Date</TableCell>
                      <TableCell className="text-[hsl(var(--g-text-primary))]">{risk.acceptanceRecord.acceptedDate}</TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-[hsl(var(--g-surface-hover))]">
                      <TableCell className="text-[hsl(var(--g-text-secondary))]">Expiry Date</TableCell>
                      <TableCell className="text-[hsl(var(--g-text-primary))]">{risk.acceptanceRecord.expiryDate}</TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-[hsl(var(--g-surface-hover))]">
                      <TableCell className="text-[hsl(var(--g-text-secondary))] align-top">Rationale</TableCell>
                      <TableCell className="text-[hsl(var(--g-text-primary))]">{risk.acceptanceRecord.rationale}</TableCell>
                    </TableRow>
                    {risk.acceptanceRecord.conditions && (
                      <TableRow className="hover:bg-[hsl(var(--g-surface-hover))]">
                        <TableCell className="text-[hsl(var(--g-text-secondary))] align-top">Conditions</TableCell>
                        <TableCell className="text-[hsl(var(--g-text-primary))]">{risk.acceptanceRecord.conditions}</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </section>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default function RiskManagement() {
  const [statusFilter, setStatusFilter] = useState<RiskStatus | "all">("all");
  const [scoreFilter, setScoreFilter] = useState<ScoreThreshold>("all");
  const [systemFilter, setSystemFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<RiskCategory | "all">("all");
  const [selectedRisk, setSelectedRisk] = useState<RiskEntry | null>(null);

  const systems = useMemo(() => {
    const uniqueSystems = [...new Map(riskData.map(r => [r.aiSystemId, r.aiSystemName])).entries()];
    return uniqueSystems.sort((a, b) => a[1].localeCompare(b[1]));
  }, []);

  const filteredRisks = useMemo(() => {
    return riskData.filter(risk => {
      if (statusFilter !== "all" && risk.status !== statusFilter) return false;
      if (systemFilter !== "all" && risk.aiSystemId !== systemFilter) return false;
      if (categoryFilter !== "all" && risk.category !== categoryFilter) return false;
      if (scoreFilter === "critical" && risk.score < 15) return false;
      if (scoreFilter === "high" && (risk.score < 10 || risk.score >= 15)) return false;
      if (scoreFilter === "medium" && (risk.score < 6 || risk.score >= 10)) return false;
      if (scoreFilter === "low" && risk.score >= 6) return false;
      return true;
    });
  }, [statusFilter, scoreFilter, systemFilter, categoryFilter]);

  const clearFilters = () => {
    setStatusFilter("all");
    setScoreFilter("all");
    setSystemFilter("all");
    setCategoryFilter("all");
  };

  const hasActiveFilters = statusFilter !== "all" || scoreFilter !== "all" || systemFilter !== "all" || categoryFilter !== "all";

  // Summary stats
  const openRisks = riskData.filter(r => r.status === "Open").length;
  const acceptedRisks = riskData.filter(r => r.status === "Accepted").length;
  const criticalOpenRisks = riskData.filter(r => r.status === "Open" && r.score >= 15).length;

  return (
    <AppLayout>
      <PageHeader
        title="AI Risk Management"
        subtitle="Identification, assessment and acceptance of AI risks"
      />
      <div className="p-[var(--g-space-6)]">
        {/* Summary Stats */}
        <section aria-labelledby="risk-summary" className="mb-[var(--g-space-5)]">
          <h2 id="risk-summary" className="sr-only">Risk Summary</h2>
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
                  <TableCell className="text-[hsl(var(--g-text-secondary))]">Total Risks Registered</TableCell>
                  <TableCell className="text-[hsl(var(--g-text-primary))] font-semibold text-right">{riskData.length}</TableCell>
                  <TableCell>
                    <StatusIndicator status="neutral" text="Tracked" />
                  </TableCell>
                </TableRow>
                <TableRow className="hover:bg-[hsl(var(--g-surface-hover))]">
                  <TableCell className="text-[hsl(var(--g-text-secondary))]">Open Risks</TableCell>
                  <TableCell className="text-[hsl(var(--g-text-primary))] font-semibold text-right">{openRisks}</TableCell>
                  <TableCell>
                    <StatusIndicator status={openRisks > 5 ? "warning" : "success"} text={openRisks > 5 ? "Review Needed" : "Manageable"} />
                  </TableCell>
                </TableRow>
                <TableRow className="hover:bg-[hsl(var(--g-surface-hover))]">
                  <TableCell className="text-[hsl(var(--g-text-secondary))]">Critical Open Risks (Score ≥15)</TableCell>
                  <TableCell className="text-[hsl(var(--g-text-primary))] font-semibold text-right">{criticalOpenRisks}</TableCell>
                  <TableCell>
                    <StatusIndicator status={criticalOpenRisks > 0 ? "critical" : "success"} text={criticalOpenRisks > 0 ? "Action Required" : "None"} />
                  </TableCell>
                </TableRow>
                <TableRow className="hover:bg-[hsl(var(--g-surface-hover))]">
                  <TableCell className="text-[hsl(var(--g-text-secondary))]">Accepted Risks</TableCell>
                  <TableCell className="text-[hsl(var(--g-text-primary))] font-semibold text-right">{acceptedRisks}</TableCell>
                  <TableCell>
                    <StatusIndicator status="warning" text="Monitored" />
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
                <Label htmlFor="category-filter" className="text-xs text-[hsl(var(--g-text-secondary))]">Category</Label>
                <Select value={categoryFilter} onValueChange={(v) => setCategoryFilter(v as RiskCategory | "all")}>
                  <SelectTrigger id="category-filter" className="w-[140px] h-9 text-sm bg-[hsl(var(--g-surface-base))] border-[hsl(var(--g-border-default))]">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    {riskCategories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-[var(--g-space-2)]">
                <Label htmlFor="score-filter" className="text-xs text-[hsl(var(--g-text-secondary))]">Severity</Label>
                <Select value={scoreFilter} onValueChange={(v) => setScoreFilter(v as ScoreThreshold)}>
                  <SelectTrigger id="score-filter" className="w-[150px] h-9 text-sm bg-[hsl(var(--g-surface-base))] border-[hsl(var(--g-border-default))]">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severities</SelectItem>
                    <SelectItem value="critical">Critical (≥15)</SelectItem>
                    <SelectItem value="high">High (10-14)</SelectItem>
                    <SelectItem value="medium">Medium (6-9)</SelectItem>
                    <SelectItem value="low">Low (&lt;6)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-[var(--g-space-2)]">
                <Label htmlFor="status-filter" className="text-xs text-[hsl(var(--g-text-secondary))]">Status</Label>
                <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as RiskStatus | "all")}>
                  <SelectTrigger id="status-filter" className="w-[140px] h-9 text-sm bg-[hsl(var(--g-surface-base))] border-[hsl(var(--g-border-default))]">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="Open">Open</SelectItem>
                    <SelectItem value="Mitigated">Mitigated</SelectItem>
                    <SelectItem value="Accepted">Accepted</SelectItem>
                    <SelectItem value="Transferred">Transferred</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-[var(--g-space-2)]">
                <Label htmlFor="system-filter" className="text-xs text-[hsl(var(--g-text-secondary))]">AI System</Label>
                <Select value={systemFilter} onValueChange={setSystemFilter}>
                  <SelectTrigger id="system-filter" className="w-[220px] h-9 text-sm bg-[hsl(var(--g-surface-base))] border-[hsl(var(--g-border-default))]">
                    <SelectValue placeholder="All" />
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

        {/* Risk Register Table */}
        <section aria-labelledby="risk-register">
          <div className="flex items-baseline justify-between mb-[var(--g-space-4)]">
            <h2 
              id="risk-register" 
              className="text-sm font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider"
            >
              AI Risk Register
            </h2>
            <span className="text-sm text-[hsl(var(--g-text-secondary))]">
              {filteredRisks.length} of {riskData.length} risks · Click row for details
            </span>
          </div>
          <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-lg)] overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-[hsl(var(--g-surface-subtle))] hover:bg-[hsl(var(--g-surface-subtle))]">
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-24">Risk ID</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-44">AI System</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-28">Category</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium">Description</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-24">Impact</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-24">Prob.</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-24">Score</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-24">Residual</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-28">Status</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-32">Owner</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-28">Review</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRisks.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={11} className="text-center py-8 text-[hsl(var(--g-text-secondary))]">
                      No risks match the selected filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRisks.map((risk) => (
                    <TableRow 
                      key={risk.id} 
                      className="hover:bg-[hsl(var(--g-surface-hover))] cursor-pointer"
                      onClick={() => setSelectedRisk(risk)}
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === 'Enter') setSelectedRisk(risk); }}
                      role="button"
                      aria-label={`View details for ${risk.id}`}
                    >
                      <TableCell className="text-[hsl(var(--g-text-primary))] font-medium">{risk.id}</TableCell>
                      <TableCell className="text-[hsl(var(--g-text-primary))]">{risk.aiSystemName}</TableCell>
                      <TableCell className="text-[hsl(var(--g-text-secondary))]">{risk.category}</TableCell>
                      <TableCell className="text-[hsl(var(--g-text-secondary))] truncate max-w-[200px]" title={risk.description}>
                        {risk.description}
                      </TableCell>
                      <TableCell className="text-[hsl(var(--g-text-secondary))]">{risk.impact}</TableCell>
                      <TableCell className="text-[hsl(var(--g-text-secondary))]">{risk.probability}</TableCell>
                      <TableCell>
                        <ScoreIndicator score={risk.score} showLabel={false} />
                      </TableCell>
                      <TableCell>
                        <ScoreIndicator score={risk.residualRisk} showLabel={false} />
                      </TableCell>
                      <TableCell>
                        <StatusIndicator 
                          status={riskStatusMapping[risk.status].status} 
                          text={riskStatusMapping[risk.status].text} 
                        />
                      </TableCell>
                      <TableCell className="text-[hsl(var(--g-text-secondary))]">{risk.owner}</TableCell>
                      <TableCell className="text-[hsl(var(--g-text-secondary))]">{risk.reviewDate}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </section>
      </div>

      {/* Detail Panel */}
      {selectedRisk && (
        <RiskDetailPanel risk={selectedRisk} onClose={() => setSelectedRisk(null)} />
      )}
    </AppLayout>
  );
}
