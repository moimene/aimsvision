import { useState, useMemo } from "react";
import { AppLayout, PageHeader } from "@/components/layout";
import { StatusIndicator } from "@/components/indicators";
import { riskData, riskStatusMapping, impactLabels, probabilityLabels, type RiskStatus } from "@/data/risks";
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
import { AlertTriangle, XCircle, AlertCircle } from "lucide-react";

type ScoreThreshold = "all" | "high" | "medium" | "low";

function ScoreIndicator({ score }: { score: number }) {
  let Icon = AlertCircle;
  let colorClass = "text-[hsl(var(--g-text-secondary))]";
  let label = "Low";

  if (score >= 15) {
    Icon = XCircle;
    colorClass = "text-[hsl(var(--g-status-critical))]";
    label = "Critical";
  } else if (score >= 10) {
    Icon = AlertTriangle;
    colorClass = "text-[hsl(var(--g-status-warning))]";
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
      <span className="text-xs">({label})</span>
    </span>
  );
}

export default function RiskManagement() {
  const [statusFilter, setStatusFilter] = useState<RiskStatus | "all">("all");
  const [scoreFilter, setScoreFilter] = useState<ScoreThreshold>("all");
  const [systemFilter, setSystemFilter] = useState<string>("all");

  const systems = useMemo(() => {
    const uniqueSystems = [...new Map(riskData.map(r => [r.aiSystemId, r.aiSystemName])).entries()];
    return uniqueSystems.sort((a, b) => a[1].localeCompare(b[1]));
  }, []);

  const filteredRisks = useMemo(() => {
    return riskData.filter(risk => {
      if (statusFilter !== "all" && risk.status !== statusFilter) return false;
      if (systemFilter !== "all" && risk.aiSystemId !== systemFilter) return false;
      if (scoreFilter === "high" && risk.score < 15) return false;
      if (scoreFilter === "medium" && (risk.score < 6 || risk.score >= 15)) return false;
      if (scoreFilter === "low" && risk.score >= 6) return false;
      return true;
    });
  }, [statusFilter, scoreFilter, systemFilter]);

  const clearFilters = () => {
    setStatusFilter("all");
    setScoreFilter("all");
    setSystemFilter("all");
  };

  const hasActiveFilters = statusFilter !== "all" || scoreFilter !== "all" || systemFilter !== "all";

  // Summary stats
  const openHighRisks = riskData.filter(r => r.status === "Open" && r.score >= 15).length;
  const totalOpenRisks = riskData.filter(r => r.status === "Open").length;

  return (
    <AppLayout>
      <PageHeader
        title="AI Risk Management"
        subtitle="Operate a living AI risk register with impact assessment, control mapping, and acceptance tracking."
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
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-36">Status</TableHead>
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
                  <TableCell className="text-[hsl(var(--g-text-primary))] font-semibold text-right">{totalOpenRisks}</TableCell>
                  <TableCell>
                    <StatusIndicator status={totalOpenRisks > 5 ? "warning" : "success"} text={totalOpenRisks > 5 ? "Review Needed" : "Manageable"} />
                  </TableCell>
                </TableRow>
                <TableRow className="hover:bg-[hsl(var(--g-surface-hover))]">
                  <TableCell className="text-[hsl(var(--g-text-secondary))]">Critical Open Risks (Score ≥15)</TableCell>
                  <TableCell className="text-[hsl(var(--g-text-primary))] font-semibold text-right">{openHighRisks}</TableCell>
                  <TableCell>
                    <StatusIndicator status={openHighRisks > 0 ? "critical" : "success"} text={openHighRisks > 0 ? "Action Required" : "None"} />
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
                <Label htmlFor="score-filter" className="text-xs text-[hsl(var(--g-text-secondary))]">Risk Score</Label>
                <Select value={scoreFilter} onValueChange={(v) => setScoreFilter(v as ScoreThreshold)}>
                  <SelectTrigger id="score-filter" className="w-[160px] h-9 text-sm bg-[hsl(var(--g-surface-base))] border-[hsl(var(--g-border-default))]">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Scores</SelectItem>
                    <SelectItem value="high">Critical (≥15)</SelectItem>
                    <SelectItem value="medium">Medium (6-14)</SelectItem>
                    <SelectItem value="low">Low (&lt;6)</SelectItem>
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
              Risk Register
            </h2>
            <span className="text-sm text-[hsl(var(--g-text-secondary))]">
              {filteredRisks.length} of {riskData.length} risks
            </span>
          </div>
          <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-lg)] overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-[hsl(var(--g-surface-subtle))] hover:bg-[hsl(var(--g-surface-subtle))]">
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-24">Risk ID</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium">Description</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-28">Impact</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-28">Probability</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-28">Score</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-28">Status</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-36">Owner</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRisks.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-[hsl(var(--g-text-secondary))]">
                      No risks match the selected filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRisks.map((risk) => (
                    <TableRow key={risk.id} className="hover:bg-[hsl(var(--g-surface-hover))]">
                      <TableCell className="text-[hsl(var(--g-text-primary))] font-medium">{risk.id}</TableCell>
                      <TableCell>
                        <div>
                          <span className="text-[hsl(var(--g-text-primary))]">{risk.description}</span>
                          <div className="text-xs text-[hsl(var(--g-text-secondary))] mt-1">{risk.aiSystemName}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-[hsl(var(--g-text-secondary))]">
                        <span title={impactLabels[risk.impact]}>{risk.impact} - {impactLabels[risk.impact]?.split(' ')[0]}</span>
                      </TableCell>
                      <TableCell className="text-[hsl(var(--g-text-secondary))]">
                        <span title={probabilityLabels[risk.probability]}>{risk.probability} - {probabilityLabels[risk.probability]?.split(' ')[0]}</span>
                      </TableCell>
                      <TableCell>
                        <ScoreIndicator score={risk.score} />
                      </TableCell>
                      <TableCell>
                        <StatusIndicator 
                          status={riskStatusMapping[risk.status].status} 
                          text={riskStatusMapping[risk.status].text} 
                        />
                      </TableCell>
                      <TableCell className="text-[hsl(var(--g-text-secondary))]">{risk.owner}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
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
              Mapping of risks to mitigating controls will be implemented in Phase 5.
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
              Sign-off tracking for accepted residual risks will be implemented in Phase 5.
            </p>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
