import { useState, useMemo } from "react";
import { AppLayout, PageHeader } from "@/components/layout";
import { 
  RiskLevelIndicator, 
  StatusIndicator, 
  LifecycleIndicator,
  type RiskLevel,
  type LifecycleState,
} from "@/components/indicators";
import { aiSystemsData, type ComplianceStatus, type AISystem } from "@/data/aiSystems";
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

function SystemDetailPanel({ system, onClose }: { system: AISystem; onClose: () => void }) {
  const si = statusToIndicator[system.status];
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end" role="dialog" aria-modal="true" aria-label={`Ficha técnica: ${system.name}`}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Panel */}
      <div className="relative z-10 h-full w-full max-w-2xl bg-[hsl(var(--g-surface-base))] border-l border-[hsl(var(--g-border-default))] overflow-y-auto shadow-xl flex flex-col">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[hsl(var(--g-surface-card))] border-b border-[hsl(var(--g-border-default))] px-6 py-4 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-[hsl(var(--g-text-secondary))] bg-[hsl(var(--g-surface-subtle))] px-2 py-0.5 rounded">{system.id}</span>
              <LifecycleIndicator state={system.lifecycleState} />
            </div>
            <h2 className="text-base font-semibold text-[hsl(var(--g-text-primary))] leading-tight">{system.name}</h2>
            <p className="text-xs text-[hsl(var(--g-text-secondary))] mt-0.5">{system.businessUnit} · {system.provider}</p>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 text-[hsl(var(--g-text-secondary))] hover:text-[hsl(var(--g-text-primary))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--g-border-strong))] rounded p-1"
            aria-label="Cerrar ficha técnica"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="flex-1 p-6 space-y-6">
          {/* Status Row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-md)] p-3">
              <p className="text-xs text-[hsl(var(--g-text-secondary))] mb-1">Nivel de Riesgo</p>
              <RiskLevelIndicator level={system.riskLevel} />
            </div>
            <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-md)] p-3">
              <p className="text-xs text-[hsl(var(--g-text-secondary))] mb-1">Estado de Conformidad</p>
              <StatusIndicator status={si.status} text={si.text} />
            </div>
            <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-md)] p-3">
              <p className="text-xs text-[hsl(var(--g-text-secondary))] mb-1">Versión</p>
              <span className="text-sm font-mono text-[hsl(var(--g-text-primary))]">{system.version ?? "—"}</span>
            </div>
            <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-md)] p-3">
              <p className="text-xs text-[hsl(var(--g-text-secondary))] mb-1">Interacciones / mes</p>
              <span className="text-sm font-medium text-[hsl(var(--g-text-primary))]">
                {system.interactionsMonthly != null ? system.interactionsMonthly.toLocaleString("es-ES") : "—"}
              </span>
            </div>
          </div>

          {/* Description */}
          <section>
            <h3 className="text-xs font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider mb-2">Descripción</h3>
            <p className="text-sm text-[hsl(var(--g-text-primary))] leading-relaxed">{system.description}</p>
          </section>

          {/* AI Act */}
          {system.aiActCategory && (
            <section>
              <h3 className="text-xs font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider mb-2">Clasificación AI Act</h3>
              <div className="bg-[hsl(var(--g-surface-subtle))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-md)] px-3 py-2">
                <span className="text-sm text-[hsl(var(--g-text-primary))]">{system.aiActCategory}</span>
              </div>
            </section>
          )}

          {/* Technical Sheet */}
          <section>
            <h3 className="text-xs font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider mb-3">Ficha Técnica</h3>
            <div className="space-y-3">
              <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-md)] p-4">
                <p className="text-xs text-[hsl(var(--g-text-secondary))] mb-1">Tipología del Sistema</p>
                <p className="text-sm font-medium text-[hsl(var(--g-text-primary))]">{system.technicalSheet.typology}</p>
              </div>
              <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-md)] p-4">
                <p className="text-xs text-[hsl(var(--g-text-secondary))] mb-2">Arquitectura Técnica</p>
                <p className="text-sm text-[hsl(var(--g-text-primary))] leading-relaxed">{system.technicalSheet.architecture}</p>
              </div>
            </div>
          </section>

          {/* Guardrails */}
          <section>
            <h3 className="text-xs font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider mb-3">
              Guardrails Vinculados
              <span className="ml-2 text-[hsl(var(--g-text-secondary))] font-normal normal-case tracking-normal">
                ({system.technicalSheet.keyGuardrails.length})
              </span>
            </h3>
            {system.technicalSheet.keyGuardrails.length === 0 ? (
              <div className="bg-[hsl(var(--g-surface-subtle))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-md)] px-3 py-2">
                <span className="text-sm text-[hsl(var(--g-text-secondary))]">Sin guardrails específicos configurados</span>
              </div>
            ) : (
              <div className="space-y-2">
                {system.technicalSheet.keyGuardrails.map((g) => (
                  <div
                    key={g.id}
                    className="flex items-center gap-3 bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-md)] px-3 py-2"
                  >
                    <span className="text-xs font-mono text-[hsl(var(--g-text-secondary))] bg-[hsl(var(--g-surface-subtle))] px-1.5 py-0.5 rounded shrink-0">{g.id}</span>
                    <span className="text-sm text-[hsl(var(--g-text-primary))]">{g.name}</span>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Technical Contact */}
          <section>
            <h3 className="text-xs font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider mb-3">Contacto Técnico Responsable</h3>
            <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-md)] p-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[hsl(var(--g-surface-subtle))] border border-[hsl(var(--g-border-default))] flex items-center justify-center shrink-0">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M2 14c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <p className="text-xs text-[hsl(var(--g-text-secondary))]">Technical Owner</p>
                <p className="text-sm font-medium text-[hsl(var(--g-text-primary))]">{system.technicalSheet.technicalContact}</p>
              </div>
            </div>
          </section>

          {/* Dates */}
          <section>
            <h3 className="text-xs font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider mb-3">Fechas Clave</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-md)] p-3">
                <p className="text-xs text-[hsl(var(--g-text-secondary))] mb-1">Fecha de Despliegue</p>
                <p className="text-sm text-[hsl(var(--g-text-primary))]">{system.deployedDate ?? "Pendiente"}</p>
              </div>
              <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-md)] p-3">
                <p className="text-xs text-[hsl(var(--g-text-secondary))] mb-1">Última Revisión</p>
                <p className="text-sm text-[hsl(var(--g-text-primary))]">{system.lastReviewDate ?? "—"}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default function AIInventory() {
  const [riskFilter, setRiskFilter] = useState<RiskLevel | "all">("all");
  const [statusFilter, setStatusFilter] = useState<ComplianceStatus | "all">("all");
  const [providerFilter, setProviderFilter] = useState<string>("all");
  const [lifecycleFilter, setLifecycleFilter] = useState<LifecycleState | "all">("all");
  const [selectedSystem, setSelectedSystem] = useState<AISystem | null>(null);

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
        subtitle="Registro único de todos los sistemas de IA gestionados. Haz clic en un sistema para ver su ficha técnica completa."
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
              {filteredSystems.length} of {aiSystemsData.length} systems · <span className="text-[hsl(var(--g-text-secondary))] italic">Click row for technical sheet</span>
            </span>
          </div>
          <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-lg)] overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-[hsl(var(--g-surface-subtle))] hover:bg-[hsl(var(--g-surface-subtle))]">
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium">System Name</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-52">Typology</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-28">Risk Level</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-36">Status</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-32">Provider</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-36">Business Unit</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-32">Lifecycle</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-20 text-center">Guardrails</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSystems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-[hsl(var(--g-text-secondary))]">
                      No AI systems match the selected filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSystems.map((system) => (
                    <TableRow
                      key={system.id}
                      className="hover:bg-[hsl(var(--g-surface-hover))] cursor-pointer"
                      onClick={() => setSelectedSystem(system)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setSelectedSystem(system); }}
                      aria-label={`Ver ficha técnica de ${system.name}`}
                    >
                      <TableCell>
                        <div>
                          <span className="text-[hsl(var(--g-text-primary))] font-medium">{system.name}</span>
                          <span className="text-xs text-[hsl(var(--g-text-secondary))] ml-2">{system.id}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-xs text-[hsl(var(--g-text-secondary))]">{system.technicalSheet.typology}</span>
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
                      <TableCell className="text-center">
                        {system.technicalSheet.keyGuardrails.length > 0 ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium bg-[hsl(var(--g-surface-subtle))] border border-[hsl(var(--g-border-default))] text-[hsl(var(--g-text-primary))]">
                            {system.technicalSheet.keyGuardrails.length}
                          </span>
                        ) : (
                          <span className="text-xs text-[hsl(var(--g-text-secondary))]">—</span>
                        )}
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
      {selectedSystem && (
        <SystemDetailPanel
          system={selectedSystem}
          onClose={() => setSelectedSystem(null)}
        />
      )}
    </AppLayout>
  );
}
