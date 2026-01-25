import { useState, useMemo } from "react";
import { AppLayout, PageHeader } from "@/components/layout";
import { StatusIndicator } from "@/components/indicators";
import { 
  roleAssignments, 
  approvalHistory, 
  oversightRules,
  type DecisionOutcome,
} from "@/data/governance";
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
import { CheckCircle, XCircle } from "lucide-react";

const outcomeMapping: Record<DecisionOutcome, { status: "success" | "critical" | "warning" | "neutral"; text: string }> = {
  "Approved": { status: "success", text: "Approved" },
  "Rejected": { status: "critical", text: "Rejected" },
  "Deferred": { status: "warning", text: "Deferred" },
  "Escalated": { status: "neutral", text: "Escalated" },
};

function BooleanIndicator({ value, trueText, falseText }: { value: boolean; trueText: string; falseText: string }) {
  return (
    <span className={`inline-flex items-center gap-[var(--g-space-2)] ${value ? "text-[hsl(var(--g-status-success))]" : "text-[hsl(var(--g-text-secondary))]"}`}>
      {value ? (
        <CheckCircle className="h-4 w-4" aria-hidden="true" />
      ) : (
        <XCircle className="h-4 w-4" aria-hidden="true" />
      )}
      <span className="text-sm">{value ? trueText : falseText}</span>
    </span>
  );
}

export default function Governance() {
  const [systemFilter, setSystemFilter] = useState<string>("all");

  const systems = useMemo(() => {
    return roleAssignments.map(r => ({ id: r.aiSystemId, name: r.aiSystemName }));
  }, []);

  const filteredRoles = useMemo(() => {
    if (systemFilter === "all") return roleAssignments;
    return roleAssignments.filter(r => r.aiSystemId === systemFilter);
  }, [systemFilter]);

  const filteredApprovals = useMemo(() => {
    if (systemFilter === "all") return approvalHistory;
    return approvalHistory.filter(a => a.aiSystemId === systemFilter);
  }, [systemFilter]);

  const filteredOversight = useMemo(() => {
    if (systemFilter === "all") return oversightRules;
    return oversightRules.filter(o => o.aiSystemId === systemFilter);
  }, [systemFilter]);

  return (
    <AppLayout>
      <PageHeader
        title="Governance & Accountability"
        subtitle="Roles, approvals and human oversight"
      />
      <div className="p-[var(--g-space-6)]">
        {/* Filter */}
        <section aria-labelledby="filter-heading" className="mb-[var(--g-space-5)]">
          <h2 id="filter-heading" className="sr-only">Filters</h2>
          <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-lg)] p-[var(--g-space-4)]">
            <div className="flex items-end gap-[var(--g-space-4)]">
              <div className="flex flex-col gap-[var(--g-space-2)]">
                <Label htmlFor="system-filter" className="text-xs text-[hsl(var(--g-text-secondary))]">AI System</Label>
                <Select value={systemFilter} onValueChange={setSystemFilter}>
                  <SelectTrigger id="system-filter" className="w-[280px] h-9 text-sm bg-[hsl(var(--g-surface-base))] border-[hsl(var(--g-border-default))]">
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
              {systemFilter !== "all" && (
                <button
                  onClick={() => setSystemFilter("all")}
                  className="text-sm text-[hsl(var(--g-link))] hover:text-[hsl(var(--g-link-hover))] hover:underline focus:outline-none focus:ring-2 focus:ring-[hsl(var(--g-border-strong))] rounded px-2 py-1"
                >
                  Clear filter
                </button>
              )}
            </div>
          </div>
        </section>

        {/* RACI Table */}
        <section aria-labelledby="raci-matrix">
          <div className="flex items-baseline justify-between mb-[var(--g-space-4)]">
            <h2 
              id="raci-matrix" 
              className="text-sm font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider"
            >
              Role Assignments
            </h2>
            <span className="text-sm text-[hsl(var(--g-text-secondary))]">
              {filteredRoles.length} systems
            </span>
          </div>
          <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-lg)] overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-[hsl(var(--g-surface-subtle))] hover:bg-[hsl(var(--g-surface-subtle))]">
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium">AI System</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium">Use Case Owner</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium">Legal Owner</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium">Risk Owner</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium">Technical Owner</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium">Evidence Owner</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRoles.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-[hsl(var(--g-text-secondary))]">
                      No role assignments found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRoles.map((role) => (
                    <TableRow key={role.aiSystemId} className="hover:bg-[hsl(var(--g-surface-hover))]">
                      <TableCell>
                        <div>
                          <span className="text-[hsl(var(--g-text-primary))] font-medium">{role.aiSystemName}</span>
                          <span className="text-xs text-[hsl(var(--g-text-secondary))] ml-2">{role.aiSystemId}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-[hsl(var(--g-text-secondary))]">{role.useCaseOwner}</TableCell>
                      <TableCell className="text-[hsl(var(--g-text-secondary))]">{role.legalOwner}</TableCell>
                      <TableCell className="text-[hsl(var(--g-text-secondary))]">{role.riskOwner}</TableCell>
                      <TableCell className="text-[hsl(var(--g-text-secondary))]">{role.technicalOwner}</TableCell>
                      <TableCell className="text-[hsl(var(--g-text-secondary))]">{role.evidenceOwner}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </section>

        {/* Approval History */}
        <section aria-labelledby="approval-history" className="mt-[var(--g-space-7)]">
          <div className="flex items-baseline justify-between mb-[var(--g-space-4)]">
            <h2 
              id="approval-history" 
              className="text-sm font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider"
            >
              Approval History
            </h2>
            <span className="text-sm text-[hsl(var(--g-text-secondary))]">
              {filteredApprovals.length} decisions
            </span>
          </div>
          <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-lg)] overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-[hsl(var(--g-surface-subtle))] hover:bg-[hsl(var(--g-surface-subtle))]">
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-48">AI System</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-36">Decision Type</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium">Decision Maker</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-28">Date</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-28">Outcome</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApprovals.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-[hsl(var(--g-text-secondary))]">
                      No approval records found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredApprovals.map((approval) => (
                    <TableRow key={approval.id} className="hover:bg-[hsl(var(--g-surface-hover))]">
                      <TableCell>
                        <span className="text-[hsl(var(--g-text-primary))]">{approval.aiSystemName}</span>
                      </TableCell>
                      <TableCell className="text-[hsl(var(--g-text-secondary))]">{approval.decisionType}</TableCell>
                      <TableCell className="text-[hsl(var(--g-text-secondary))]">{approval.decisionMaker}</TableCell>
                      <TableCell className="text-[hsl(var(--g-text-secondary))]">{approval.date}</TableCell>
                      <TableCell>
                        <StatusIndicator 
                          status={outcomeMapping[approval.outcome].status} 
                          text={outcomeMapping[approval.outcome].text} 
                        />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </section>

        {/* Oversight Rules */}
        <section aria-labelledby="oversight-rules" className="mt-[var(--g-space-7)]">
          <div className="flex items-baseline justify-between mb-[var(--g-space-4)]">
            <h2 
              id="oversight-rules" 
              className="text-sm font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider"
            >
              Oversight Rules
            </h2>
            <span className="text-xs text-[hsl(var(--g-text-secondary))] uppercase tracking-wider">
              Read-only
            </span>
          </div>
          <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-lg)] overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-[hsl(var(--g-surface-subtle))] hover:bg-[hsl(var(--g-surface-subtle))]">
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium">AI System</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-40">Human-in-the-Loop</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium">Escalation Threshold</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-44">Committee Involved</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOversight.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-[hsl(var(--g-text-secondary))]">
                      No oversight rules found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOversight.map((rule) => (
                    <TableRow key={rule.aiSystemId} className="hover:bg-[hsl(var(--g-surface-hover))]">
                      <TableCell>
                        <div>
                          <span className="text-[hsl(var(--g-text-primary))] font-medium">{rule.aiSystemName}</span>
                          <span className="text-xs text-[hsl(var(--g-text-secondary))] ml-2">{rule.aiSystemId}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <BooleanIndicator 
                          value={rule.humanInTheLoop} 
                          trueText="Required" 
                          falseText="Not Required" 
                        />
                      </TableCell>
                      <TableCell className="text-[hsl(var(--g-text-secondary))]">{rule.escalationThreshold}</TableCell>
                      <TableCell className="text-[hsl(var(--g-text-secondary))]">
                        {rule.committeeInvolved || "—"}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
