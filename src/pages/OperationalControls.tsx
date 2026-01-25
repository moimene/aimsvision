import { useState, useMemo } from "react";
import { AppLayout, PageHeader } from "@/components/layout";
import { StatusIndicator } from "@/components/indicators";
import {
  guardrailsData,
  guardrailStatusMapping,
  guardrailActionMapping,
  guardrailCategories,
  type GuardrailCategory,
  type GuardrailStatus,
  type GuardrailAction,
  type Guardrail,
} from "@/data/guardrails";
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
import { CheckCircle, XCircle, Lock } from "lucide-react";

function BooleanIndicator({ value, trueText, falseText }: { value: boolean; trueText: string; falseText: string }) {
  return (
    <span className={`inline-flex items-center gap-[var(--g-space-2)] ${value ? "text-[hsl(var(--g-status-warning))]" : "text-[hsl(var(--g-text-secondary))]"}`}>
      {value ? (
        <CheckCircle className="h-4 w-4" aria-hidden="true" />
      ) : (
        <XCircle className="h-4 w-4" aria-hidden="true" />
      )}
      <span className="text-sm">{value ? trueText : falseText}</span>
    </span>
  );
}

function GuardrailDetailPanel({ guardrail, onClose }: { guardrail: Guardrail; onClose: () => void }) {
  const linkedRisks = riskData.filter(r => guardrail.linkedRiskIds.includes(r.id));

  return (
    <Sheet open={true} onOpenChange={onClose}>
      <SheetContent className="w-[500px] sm:w-[600px] bg-[hsl(var(--g-surface-base))] border-l border-[hsl(var(--g-border-default))] overflow-y-auto">
        <SheetHeader className="border-b border-[hsl(var(--g-border-default))] pb-[var(--g-space-4)]">
          <div className="flex items-center gap-[var(--g-space-2)]">
            <Lock className="h-4 w-4 text-[hsl(var(--g-text-secondary))]" aria-hidden="true" />
            <span className="text-xs text-[hsl(var(--g-text-secondary))] uppercase tracking-wider">Read-only Configuration</span>
          </div>
          <SheetTitle className="text-[hsl(var(--g-text-primary))]">{guardrail.name}</SheetTitle>
          <SheetDescription className="text-[hsl(var(--g-text-secondary))]">
            {guardrail.id} · Version {guardrail.version}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-[var(--g-space-5)] space-y-[var(--g-space-6)]">
          {/* Rule Description */}
          <section>
            <h3 className="text-xs font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider mb-[var(--g-space-3)]">
              Rule Description
            </h3>
            <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-md)] p-[var(--g-space-4)]">
              <p className="text-sm text-[hsl(var(--g-text-primary))] leading-relaxed">{guardrail.description}</p>
            </div>
          </section>

          {/* Configuration Summary */}
          <section>
            <h3 className="text-xs font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider mb-[var(--g-space-3)]">
              Configuration
            </h3>
            <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-md)] overflow-hidden">
              <Table>
                <TableBody>
                  <TableRow className="hover:bg-[hsl(var(--g-surface-hover))]">
                    <TableCell className="text-[hsl(var(--g-text-secondary))] w-40">Category</TableCell>
                    <TableCell className="text-[hsl(var(--g-text-primary))]">{guardrail.category}</TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-[hsl(var(--g-surface-hover))]">
                    <TableCell className="text-[hsl(var(--g-text-secondary))]">AI System</TableCell>
                    <TableCell className="text-[hsl(var(--g-text-primary))]">{guardrail.aiSystemName}</TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-[hsl(var(--g-surface-hover))]">
                    <TableCell className="text-[hsl(var(--g-text-secondary))]">Action</TableCell>
                    <TableCell>
                      <StatusIndicator 
                        status={guardrailActionMapping[guardrail.action].status} 
                        text={guardrail.action} 
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-[hsl(var(--g-surface-hover))]">
                    <TableCell className="text-[hsl(var(--g-text-secondary))]">Human Oversight</TableCell>
                    <TableCell>
                      <BooleanIndicator 
                        value={guardrail.humanOversightRequired} 
                        trueText="Required" 
                        falseText="Not Required" 
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-[hsl(var(--g-surface-hover))]">
                    <TableCell className="text-[hsl(var(--g-text-secondary))]">Status</TableCell>
                    <TableCell>
                      <StatusIndicator 
                        status={guardrailStatusMapping[guardrail.status].status} 
                        text={guardrail.status} 
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-[hsl(var(--g-surface-hover))]">
                    <TableCell className="text-[hsl(var(--g-text-secondary))]">Version</TableCell>
                    <TableCell className="text-[hsl(var(--g-text-primary))] font-mono">{guardrail.version}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </section>

          {/* Linked Risks */}
          <section>
            <h3 className="text-xs font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider mb-[var(--g-space-3)]">
              Linked Risks
            </h3>
            {linkedRisks.length === 0 ? (
              <p className="text-sm text-[hsl(var(--g-text-secondary))] bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-md)] p-[var(--g-space-4)]">
                No risks linked to this guardrail.
              </p>
            ) : (
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
            )}
          </section>

          {/* Change History */}
          <section>
            <h3 className="text-xs font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider mb-[var(--g-space-3)]">
              Change History
            </h3>
            <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-md)] overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[hsl(var(--g-surface-subtle))] hover:bg-[hsl(var(--g-surface-subtle))]">
                    <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-20">Version</TableHead>
                    <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-28">Date</TableHead>
                    <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-32">Changed By</TableHead>
                    <TableHead className="text-[hsl(var(--g-text-primary))] font-medium">Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {guardrail.changeHistory.map((entry, idx) => (
                    <TableRow key={idx} className="hover:bg-[hsl(var(--g-surface-hover))]">
                      <TableCell className="text-[hsl(var(--g-text-primary))] font-mono">{entry.version}</TableCell>
                      <TableCell className="text-[hsl(var(--g-text-secondary))]">{entry.date}</TableCell>
                      <TableCell className="text-[hsl(var(--g-text-secondary))]">{entry.changedBy}</TableCell>
                      <TableCell className="text-[hsl(var(--g-text-secondary))]">{entry.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </section>

          {/* Last Reviewed */}
          <section>
            <h3 className="text-xs font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider mb-[var(--g-space-3)]">
              Review Information
            </h3>
            <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-md)] overflow-hidden">
              <Table>
                <TableBody>
                  <TableRow className="hover:bg-[hsl(var(--g-surface-hover))]">
                    <TableCell className="text-[hsl(var(--g-text-secondary))] w-40">Last Reviewed</TableCell>
                    <TableCell className="text-[hsl(var(--g-text-primary))]">{guardrail.lastReviewedDate}</TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-[hsl(var(--g-surface-hover))]">
                    <TableCell className="text-[hsl(var(--g-text-secondary))]">Reviewed By</TableCell>
                    <TableCell className="text-[hsl(var(--g-text-primary))]">{guardrail.lastReviewedBy}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default function OperationalControls() {
  const [categoryFilter, setCategoryFilter] = useState<GuardrailCategory | "all">("all");
  const [statusFilter, setStatusFilter] = useState<GuardrailStatus | "all">("all");
  const [actionFilter, setActionFilter] = useState<GuardrailAction | "all">("all");
  const [systemFilter, setSystemFilter] = useState<string>("all");
  const [selectedGuardrail, setSelectedGuardrail] = useState<Guardrail | null>(null);

  const systems = useMemo(() => {
    const uniqueSystems = [...new Map(guardrailsData.map(g => [g.aiSystemId, g.aiSystemName])).entries()];
    return uniqueSystems.sort((a, b) => a[1].localeCompare(b[1]));
  }, []);

  const filteredGuardrails = useMemo(() => {
    return guardrailsData.filter(g => {
      if (categoryFilter !== "all" && g.category !== categoryFilter) return false;
      if (statusFilter !== "all" && g.status !== statusFilter) return false;
      if (actionFilter !== "all" && g.action !== actionFilter) return false;
      if (systemFilter !== "all" && g.aiSystemId !== systemFilter) return false;
      return true;
    });
  }, [categoryFilter, statusFilter, actionFilter, systemFilter]);

  const clearFilters = () => {
    setCategoryFilter("all");
    setStatusFilter("all");
    setActionFilter("all");
    setSystemFilter("all");
  };

  const hasActiveFilters = categoryFilter !== "all" || statusFilter !== "all" || actionFilter !== "all" || systemFilter !== "all";

  // Summary stats
  const activeGuardrails = guardrailsData.filter(g => g.status === "Active").length;
  const humanOversightCount = guardrailsData.filter(g => g.humanOversightRequired && g.status === "Active").length;

  return (
    <AppLayout>
      <PageHeader
        title="Operational Controls & Guardrails"
        subtitle="Real-time enforcement of AI governance"
      />
      <div className="p-[var(--g-space-6)]">
        {/* Summary Stats */}
        <section aria-labelledby="guardrail-summary" className="mb-[var(--g-space-5)]">
          <h2 id="guardrail-summary" className="sr-only">Guardrail Summary</h2>
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
                  <TableCell className="text-[hsl(var(--g-text-secondary))]">Total Guardrails Configured</TableCell>
                  <TableCell className="text-[hsl(var(--g-text-primary))] font-semibold text-right">{guardrailsData.length}</TableCell>
                  <TableCell>
                    <StatusIndicator status="neutral" text="Versioned" />
                  </TableCell>
                </TableRow>
                <TableRow className="hover:bg-[hsl(var(--g-surface-hover))]">
                  <TableCell className="text-[hsl(var(--g-text-secondary))]">Active Guardrails</TableCell>
                  <TableCell className="text-[hsl(var(--g-text-primary))] font-semibold text-right">{activeGuardrails}</TableCell>
                  <TableCell>
                    <StatusIndicator status="success" text="Enforcing" />
                  </TableCell>
                </TableRow>
                <TableRow className="hover:bg-[hsl(var(--g-surface-hover))]">
                  <TableCell className="text-[hsl(var(--g-text-secondary))]">Human Oversight Required</TableCell>
                  <TableCell className="text-[hsl(var(--g-text-primary))] font-semibold text-right">{humanOversightCount}</TableCell>
                  <TableCell>
                    <StatusIndicator status="warning" text="Escalation" />
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
                <Select value={categoryFilter} onValueChange={(v) => setCategoryFilter(v as GuardrailCategory | "all")}>
                  <SelectTrigger id="category-filter" className="w-[130px] h-9 text-sm bg-[hsl(var(--g-surface-base))] border-[hsl(var(--g-border-default))]">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    {guardrailCategories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-[var(--g-space-2)]">
                <Label htmlFor="action-filter" className="text-xs text-[hsl(var(--g-text-secondary))]">Action</Label>
                <Select value={actionFilter} onValueChange={(v) => setActionFilter(v as GuardrailAction | "all")}>
                  <SelectTrigger id="action-filter" className="w-[120px] h-9 text-sm bg-[hsl(var(--g-surface-base))] border-[hsl(var(--g-border-default))]">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="Proceed">Proceed</SelectItem>
                    <SelectItem value="Block">Block</SelectItem>
                    <SelectItem value="Escalate">Escalate</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-[var(--g-space-2)]">
                <Label htmlFor="status-filter" className="text-xs text-[hsl(var(--g-text-secondary))]">Status</Label>
                <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as GuardrailStatus | "all")}>
                  <SelectTrigger id="status-filter" className="w-[120px] h-9 text-sm bg-[hsl(var(--g-surface-base))] border-[hsl(var(--g-border-default))]">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Testing">Testing</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Deprecated">Deprecated</SelectItem>
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

        {/* Guardrails Configuration Table */}
        <section aria-labelledby="guardrails">
          <div className="flex items-baseline justify-between mb-[var(--g-space-4)]">
            <h2 
              id="guardrails" 
              className="text-sm font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider"
            >
              Guardrails Configuration
            </h2>
            <span className="text-sm text-[hsl(var(--g-text-secondary))]">
              {filteredGuardrails.length} of {guardrailsData.length} guardrails · Click row for details
            </span>
          </div>
          <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-lg)] overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-[hsl(var(--g-surface-subtle))] hover:bg-[hsl(var(--g-surface-subtle))]">
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium">Guardrail Name</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-28">Category</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-44">Applies to</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-28">Action</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-36">Human Oversight</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-24">Status</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-20">Version</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGuardrails.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-[hsl(var(--g-text-secondary))]">
                      No guardrails match the selected filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredGuardrails.map((guardrail) => (
                    <TableRow 
                      key={guardrail.id} 
                      className="hover:bg-[hsl(var(--g-surface-hover))] cursor-pointer"
                      onClick={() => setSelectedGuardrail(guardrail)}
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === 'Enter') setSelectedGuardrail(guardrail); }}
                      role="button"
                      aria-label={`View details for ${guardrail.name}`}
                    >
                      <TableCell>
                        <div>
                          <span className="text-[hsl(var(--g-text-primary))] font-medium">{guardrail.name}</span>
                          <span className="text-xs text-[hsl(var(--g-text-secondary))] ml-2">{guardrail.id}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-[hsl(var(--g-text-secondary))]">{guardrail.category}</TableCell>
                      <TableCell className="text-[hsl(var(--g-text-secondary))]">{guardrail.aiSystemName}</TableCell>
                      <TableCell>
                        <StatusIndicator 
                          status={guardrailActionMapping[guardrail.action].status} 
                          text={guardrail.action} 
                        />
                      </TableCell>
                      <TableCell>
                        <BooleanIndicator 
                          value={guardrail.humanOversightRequired} 
                          trueText="Required" 
                          falseText="No" 
                        />
                      </TableCell>
                      <TableCell>
                        <StatusIndicator 
                          status={guardrailStatusMapping[guardrail.status].status} 
                          text={guardrail.status} 
                        />
                      </TableCell>
                      <TableCell className="text-[hsl(var(--g-text-secondary))] font-mono">{guardrail.version}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </section>
      </div>

      {/* Detail Panel */}
      {selectedGuardrail && (
        <GuardrailDetailPanel guardrail={selectedGuardrail} onClose={() => setSelectedGuardrail(null)} />
      )}
    </AppLayout>
  );
}
