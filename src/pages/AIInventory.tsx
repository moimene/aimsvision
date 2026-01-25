import { useState, useMemo } from "react";
import { AppLayout, PageHeader } from "@/components/layout";
import { 
  RiskLevelIndicator, 
  StatusIndicator, 
  LifecycleIndicator,
  type RiskLevel,
  type LifecycleState,
} from "@/components/indicators";
import { aiSystemsData, type ComplianceStatus } from "@/data/aiSystems";
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

const statusToIndicator: Record<ComplianceStatus, { status: "success" | "warning" | "critical" | "neutral"; text: string }> = {
  "Compliant": { status: "success", text: "Compliant" },
  "At Risk": { status: "warning", text: "At Risk" },
  "Non-Compliant": { status: "critical", text: "Non-Compliant" },
  "Pending": { status: "neutral", text: "Pending" },
};

export default function AIInventory() {
  const [riskFilter, setRiskFilter] = useState<RiskLevel | "all">("all");
  const [statusFilter, setStatusFilter] = useState<ComplianceStatus | "all">("all");
  const [providerFilter, setProviderFilter] = useState<string>("all");
  const [lifecycleFilter, setLifecycleFilter] = useState<LifecycleState | "all">("all");

  const providers = useMemo(() => {
    const uniqueProviders = [...new Set(aiSystemsData.map(s => s.provider))];
    return uniqueProviders.sort();
  }, []);

  const filteredSystems = useMemo(() => {
    return aiSystemsData.filter(system => {
      if (riskFilter !== "all" && system.riskLevel !== riskFilter) return false;
      if (statusFilter !== "all" && system.status !== statusFilter) return false;
      if (providerFilter !== "all" && system.provider !== providerFilter) return false;
      if (lifecycleFilter !== "all" && system.lifecycleState !== lifecycleFilter) return false;
      return true;
    });
  }, [riskFilter, statusFilter, providerFilter, lifecycleFilter]);

  const clearFilters = () => {
    setRiskFilter("all");
    setStatusFilter("all");
    setProviderFilter("all");
    setLifecycleFilter("all");
  };

  const hasActiveFilters = riskFilter !== "all" || statusFilter !== "all" || providerFilter !== "all" || lifecycleFilter !== "all";

  return (
    <AppLayout>
      <PageHeader
        title="AI Inventory & Scope"
        subtitle="Single source of truth for all managed AI systems within the organization."
      />
      <div className="p-[var(--g-space-6)]">
        {/* Filters */}
        <section aria-labelledby="filters-heading" className="mb-[var(--g-space-5)]">
          <h2 id="filters-heading" className="sr-only">Filters</h2>
          <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-lg)] p-[var(--g-space-4)]">
            <div className="flex flex-wrap items-end gap-[var(--g-space-4)]">
              <div className="flex flex-col gap-[var(--g-space-2)]">
                <Label htmlFor="risk-filter" className="text-xs text-[hsl(var(--g-text-secondary))]">Risk Level</Label>
                <Select value={riskFilter} onValueChange={(v) => setRiskFilter(v as RiskLevel | "all")}>
                  <SelectTrigger id="risk-filter" className="w-[140px] h-9 text-sm bg-[hsl(var(--g-surface-base))] border-[hsl(var(--g-border-default))]">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-[var(--g-space-2)]">
                <Label htmlFor="status-filter" className="text-xs text-[hsl(var(--g-text-secondary))]">Status</Label>
                <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as ComplianceStatus | "all")}>
                  <SelectTrigger id="status-filter" className="w-[140px] h-9 text-sm bg-[hsl(var(--g-surface-base))] border-[hsl(var(--g-border-default))]">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="Compliant">Compliant</SelectItem>
                    <SelectItem value="At Risk">At Risk</SelectItem>
                    <SelectItem value="Non-Compliant">Non-Compliant</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-[var(--g-space-2)]">
                <Label htmlFor="provider-filter" className="text-xs text-[hsl(var(--g-text-secondary))]">Provider</Label>
                <Select value={providerFilter} onValueChange={setProviderFilter}>
                  <SelectTrigger id="provider-filter" className="w-[160px] h-9 text-sm bg-[hsl(var(--g-surface-base))] border-[hsl(var(--g-border-default))]">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    {providers.map(provider => (
                      <SelectItem key={provider} value={provider}>{provider}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-[var(--g-space-2)]">
                <Label htmlFor="lifecycle-filter" className="text-xs text-[hsl(var(--g-text-secondary))]">Lifecycle</Label>
                <Select value={lifecycleFilter} onValueChange={(v) => setLifecycleFilter(v as LifecycleState | "all")}>
                  <SelectTrigger id="lifecycle-filter" className="w-[140px] h-9 text-sm bg-[hsl(var(--g-surface-base))] border-[hsl(var(--g-border-default))]">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Production">Production</SelectItem>
                    <SelectItem value="Deprecated">Deprecated</SelectItem>
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

        {/* Asset Register Table */}
        <section aria-labelledby="asset-register">
          <div className="flex items-baseline justify-between mb-[var(--g-space-4)]">
            <h2 
              id="asset-register" 
              className="text-sm font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider"
            >
              AI Asset Register
            </h2>
            <span className="text-sm text-[hsl(var(--g-text-secondary))]">
              {filteredSystems.length} of {aiSystemsData.length} systems
            </span>
          </div>
          <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-lg)] overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-[hsl(var(--g-surface-subtle))] hover:bg-[hsl(var(--g-surface-subtle))]">
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium">System Name</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-28">Risk Level</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-36">Status</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-32">Provider</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-36">Business Unit</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-32">Lifecycle</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSystems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-[hsl(var(--g-text-secondary))]">
                      No AI systems match the selected filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSystems.map((system) => (
                    <TableRow key={system.id} className="hover:bg-[hsl(var(--g-surface-hover))]">
                      <TableCell>
                        <div>
                          <span className="text-[hsl(var(--g-text-primary))] font-medium">{system.name}</span>
                          <span className="text-xs text-[hsl(var(--g-text-secondary))] ml-2">{system.id}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <RiskLevelIndicator level={system.riskLevel} />
                      </TableCell>
                      <TableCell>
                        <StatusIndicator 
                          status={statusToIndicator[system.status].status} 
                          text={statusToIndicator[system.status].text} 
                        />
                      </TableCell>
                      <TableCell className="text-[hsl(var(--g-text-secondary))]">{system.provider}</TableCell>
                      <TableCell className="text-[hsl(var(--g-text-secondary))]">{system.businessUnit}</TableCell>
                      <TableCell>
                        <LifecycleIndicator state={system.lifecycleState} />
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
