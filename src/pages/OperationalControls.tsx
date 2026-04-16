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
import {
  CheckCircle,
  XCircle,
  Lock,
  Scale,
  AlertTriangle,
  UserCheck,
  RefreshCw,
  Zap,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { InfoTooltip, tooltips } from "@/components/InfoTooltip";
import { cn } from "@/lib/utils";

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

function SectionBlock({
  icon,
  title,
  children,
  defaultOpen = true,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section className="border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-md)] overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-[var(--g-space-4)] py-[var(--g-space-3)] bg-[hsl(var(--g-surface-subtle))] hover:bg-[hsl(var(--g-surface-hover))] transition-colors"
      >
        <div className="flex items-center gap-[var(--g-space-2)]">
          <span className="text-[hsl(var(--g-text-secondary))]">{icon}</span>
          <span className="text-xs font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider">{title}</span>
        </div>
        {open ? (
          <ChevronUp className="h-4 w-4 text-[hsl(var(--g-text-secondary))]" />
        ) : (
          <ChevronDown className="h-4 w-4 text-[hsl(var(--g-text-secondary))]" />
        )}
      </button>
      {open && (
        <div className="bg-[hsl(var(--g-surface-card))] p-[var(--g-space-4)]">
          {children}
        </div>
      )}
    </section>
  );
}

function GuardrailDetailPanel({ guardrail, onClose }: { guardrail: Guardrail; onClose: () => void }) {
  const linkedRisks = riskData.filter(r => guardrail.linkedRiskIds.includes(r.id));

  return (
    <Sheet open={true} onOpenChange={onClose}>
      <SheetContent className="w-[540px] sm:w-[680px] bg-[hsl(var(--g-surface-base))] border-l border-[hsl(var(--g-border-default))] overflow-y-auto">
        <SheetHeader className="border-b border-[hsl(var(--g-border-default))] pb-[var(--g-space-4)]">
          <div className="flex items-center gap-[var(--g-space-2)]">
            <Lock className="h-4 w-4 text-[hsl(var(--g-text-secondary))]" aria-hidden="true" />
            <span className="text-xs text-[hsl(var(--g-text-secondary))] uppercase tracking-wider">Ficha de Guardrail · Read-only</span>
          </div>
          <SheetTitle className="text-[hsl(var(--g-text-primary))]">{guardrail.name}</SheetTitle>
          <SheetDescription className="text-[hsl(var(--g-text-secondary))]">
            {guardrail.id} · v{guardrail.version} · {guardrail.aiSystemName}
          </SheetDescription>
          {/* Quick status badges */}
          <div className="flex flex-wrap gap-2 pt-1">
            <StatusIndicator status={guardrailActionMapping[guardrail.action].status} text={guardrail.action} />
            <StatusIndicator status={guardrailStatusMapping[guardrail.status].status} text={guardrail.status} />
            {guardrail.humanOversightRequired && (
              <StatusIndicator status="warning" text="Supervisión humana requerida" />
            )}
          </div>
        </SheetHeader>

        <div className="mt-[var(--g-space-5)] space-y-[var(--g-space-4)]">

          {/* 1. Descripción técnica */}
          <SectionBlock icon={<Lock className="h-4 w-4" />} title="Descripción del Control">
            <p className="text-sm text-[hsl(var(--g-text-primary))] leading-relaxed">{guardrail.description}</p>
          </SectionBlock>

          {/* 2. Base legal */}
          {guardrail.legalBasis && (
            <SectionBlock icon={<Scale className="h-4 w-4" />} title="Base Legal">
              <p className="text-sm font-mono text-[hsl(var(--g-text-primary))] leading-relaxed bg-[hsl(var(--g-surface-subtle))] rounded p-3">
                {guardrail.legalBasis}
              </p>
            </SectionBlock>
          )}

          {/* 3. Justificación legal */}
          {guardrail.legalJustification && (
            <SectionBlock icon={<Scale className="h-4 w-4" />} title="Justificación Legal">
              <p className="text-sm text-[hsl(var(--g-text-primary))] leading-relaxed">{guardrail.legalJustification}</p>
            </SectionBlock>
          )}

          {/* 4. Condición de activación */}
          {guardrail.activationCondition && (
            <SectionBlock icon={<Zap className="h-4 w-4" />} title="Condición de Activación">
              <p className="text-sm text-[hsl(var(--g-text-primary))] leading-relaxed">{guardrail.activationCondition}</p>
            </SectionBlock>
          )}

          {/* 5. Consecuencia de incumplimiento */}
          {guardrail.nonComplianceConsequence && (
            <SectionBlock icon={<AlertTriangle className="h-4 w-4" />} title="Consecuencia de Incumplimiento" defaultOpen={false}>
              <p className="text-sm text-[hsl(var(--g-status-critical))] leading-relaxed">{guardrail.nonComplianceConsequence}</p>
            </SectionBlock>
          )}

          {/* 6. Supervisión humana */}
          {guardrail.humanOversightSpec && (
            <SectionBlock icon={<UserCheck className="h-4 w-4" />} title="Supervisión Humana">
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-[hsl(var(--g-text-secondary))] mb-1">Requerida</p>
                    <BooleanIndicator
                      value={guardrail.humanOversightSpec.required}
                      trueText="Sí"
                      falseText="No"
                    />
                  </div>
                  {guardrail.humanOversightSpec.profile && (
                    <div>
                      <p className="text-xs text-[hsl(var(--g-text-secondary))] mb-1">Perfil requerido</p>
                      <p className="text-sm text-[hsl(var(--g-text-primary))]">{guardrail.humanOversightSpec.profile}</p>
                    </div>
                  )}
                </div>
                {guardrail.humanOversightSpec.sla && (
                  <div>
                    <p className="text-xs text-[hsl(var(--g-text-secondary))] mb-1">SLA de respuesta</p>
                    <p className="text-sm text-[hsl(var(--g-text-primary))] font-medium">{guardrail.humanOversightSpec.sla}</p>
                  </div>
                )}
                {guardrail.humanOversightSpec.notes && (
                  <div>
                    <p className="text-xs text-[hsl(var(--g-text-secondary))] mb-1">Notas</p>
                    <p className="text-sm text-[hsl(var(--g-text-secondary))] italic">{guardrail.humanOversightSpec.notes}</p>
                  </div>
                )}
              </div>
            </SectionBlock>
          )}

          {/* 7. Frecuencia de revisión y disparadores */}
          {(guardrail.reviewFrequency || (guardrail.updateTriggers && guardrail.updateTriggers.length > 0)) && (
            <SectionBlock icon={<RefreshCw className="h-4 w-4" />} title="Revisión y Actualización" defaultOpen={false}>
              {guardrail.reviewFrequency && (
                <div className="mb-3">
                  <p className="text-xs text-[hsl(var(--g-text-secondary))] mb-1">Frecuencia de revisión</p>
                  <p className="text-sm text-[hsl(var(--g-text-primary))]">{guardrail.reviewFrequency}</p>
                </div>
              )}
              {guardrail.updateTriggers && guardrail.updateTriggers.length > 0 && (
                <div>
                  <p className="text-xs text-[hsl(var(--g-text-secondary))] mb-2">Disparadores de actualización</p>
                  <ul className="space-y-1">
                    {guardrail.updateTriggers.map((trigger, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[hsl(var(--g-text-primary))]">
                        <span className="text-[hsl(var(--g-text-secondary))] mt-0.5">·</span>
                        <span>{trigger}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </SectionBlock>
          )}

          {/* 8. Configuración técnica */}
          <SectionBlock icon={<Lock className="h-4 w-4" />} title="Configuración Técnica" defaultOpen={false}>
            <div className="overflow-hidden rounded-[var(--g-radius-md)] border border-[hsl(var(--g-border-default))]">
              <Table>
                <TableBody>
                  <TableRow className="hover:bg-[hsl(var(--g-surface-hover))]">
                    <TableCell className="text-[hsl(var(--g-text-secondary))] w-40 text-xs">Categoría</TableCell>
                    <TableCell className="text-[hsl(var(--g-text-primary))] text-sm">{guardrail.category}</TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-[hsl(var(--g-surface-hover))]">
                    <TableCell className="text-[hsl(var(--g-text-secondary))] text-xs">Sistema de IA</TableCell>
                    <TableCell className="text-[hsl(var(--g-text-primary))] text-sm">{guardrail.aiSystemName} ({guardrail.aiSystemId})</TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-[hsl(var(--g-surface-hover))]">
                    <TableCell className="text-[hsl(var(--g-text-secondary))] text-xs">Acción</TableCell>
                    <TableCell>
                      <StatusIndicator status={guardrailActionMapping[guardrail.action].status} text={guardrail.action} />
                    </TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-[hsl(var(--g-surface-hover))]">
                    <TableCell className="text-[hsl(var(--g-text-secondary))] text-xs">Estado</TableCell>
                    <TableCell>
                      <StatusIndicator status={guardrailStatusMapping[guardrail.status].status} text={guardrail.status} />
                    </TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-[hsl(var(--g-surface-hover))]">
                    <TableCell className="text-[hsl(var(--g-text-secondary))] text-xs">Versión</TableCell>
                    <TableCell className="text-[hsl(var(--g-text-primary))] font-mono text-sm">{guardrail.version}</TableCell>
                  </TableRow>
                  {guardrail.provider && (
                    <TableRow className="hover:bg-[hsl(var(--g-surface-hover))]">
                      <TableCell className="text-[hsl(var(--g-text-secondary))] text-xs">Proveedor</TableCell>
                      <TableCell className="text-[hsl(var(--g-text-primary))] text-sm font-medium">{guardrail.provider}</TableCell>
                    </TableRow>
                  )}
                  <TableRow className="hover:bg-[hsl(var(--g-surface-hover))]">
                    <TableCell className="text-[hsl(var(--g-text-secondary))] text-xs">Última revisión</TableCell>
                    <TableCell className="text-[hsl(var(--g-text-primary))] text-sm">{guardrail.lastReviewedDate} · {guardrail.lastReviewedBy}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </SectionBlock>

          {/* 9. Riesgos vinculados */}
          {linkedRisks.length > 0 && (
            <SectionBlock icon={<AlertTriangle className="h-4 w-4" />} title="Riesgos Vinculados" defaultOpen={false}>
              <div className="overflow-hidden rounded-[var(--g-radius-md)] border border-[hsl(var(--g-border-default))]">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[hsl(var(--g-surface-subtle))] hover:bg-[hsl(var(--g-surface-subtle))]">
                      <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-24 text-xs">Risk ID</TableHead>
                      <TableHead className="text-[hsl(var(--g-text-primary))] font-medium text-xs">Descripción</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {linkedRisks.map((risk) => (
                      <TableRow key={risk.id} className="hover:bg-[hsl(var(--g-surface-hover))]">
                        <TableCell className="text-[hsl(var(--g-text-primary))] font-medium text-sm">{risk.id}</TableCell>
                        <TableCell className="text-[hsl(var(--g-text-secondary))] text-sm">{risk.description}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </SectionBlock>
          )}

          {/* 10. Historial de cambios */}
          <SectionBlock icon={<RefreshCw className="h-4 w-4" />} title="Historial de Cambios" defaultOpen={false}>
            <div className="overflow-hidden rounded-[var(--g-radius-md)] border border-[hsl(var(--g-border-default))]">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[hsl(var(--g-surface-subtle))] hover:bg-[hsl(var(--g-surface-subtle))]">
                    <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-20 text-xs">Versión</TableHead>
                    <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-28 text-xs">Fecha</TableHead>
                    <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-32 text-xs">Autor</TableHead>
                    <TableHead className="text-[hsl(var(--g-text-primary))] font-medium text-xs">Descripción</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {guardrail.changeHistory.map((entry, idx) => (
                    <TableRow key={idx} className="hover:bg-[hsl(var(--g-surface-hover))]">
                      <TableCell className="text-[hsl(var(--g-text-primary))] font-mono text-sm">{entry.version}</TableCell>
                      <TableCell className="text-[hsl(var(--g-text-secondary))] text-sm">{entry.date}</TableCell>
                      <TableCell className="text-[hsl(var(--g-text-secondary))] text-sm">{entry.changedBy}</TableCell>
                      <TableCell className="text-[hsl(var(--g-text-secondary))] text-sm">{entry.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </SectionBlock>

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

  const activeGuardrails = guardrailsData.filter(g => g.status === "Active").length;
  const humanOversightCount = guardrailsData.filter(g => g.humanOversightRequired && g.status === "Active").length;
  const blockCount = guardrailsData.filter(g => g.action === "Block" && g.status === "Active").length;
  const escalateCount = guardrailsData.filter(g => g.action === "Escalate" && g.status === "Active").length;

  return (
    <AppLayout>
      <PageHeader
        title="Controles Operacionales & Guardrails"
        subtitle="Aplicación en tiempo real de la gobernanza de IA · Fichas normativas del equipo legal"
      />
      <div className="p-[var(--g-space-6)]">
        {/* Summary Stats */}
        <section aria-labelledby="guardrail-summary" className="mb-[var(--g-space-5)]">
          <h2 id="guardrail-summary" className="sr-only">Resumen de Guardrails</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-[var(--g-space-4)] mb-[var(--g-space-5)]">
            {[
              { label: "Guardrails Configurados", value: guardrailsData.length, status: "neutral" as const, sub: "Versionados" },
              { label: "Activos", value: activeGuardrails, status: "success" as const, sub: "Aplicando" },
              { label: "Bloqueo", value: blockCount, status: "critical" as const, sub: "Acción Block" },
              { label: "Escalado c/ Supervisión", value: humanOversightCount, status: "warning" as const, sub: "Human-in-the-loop" },
            ].map((stat) => (
              <div key={stat.label} className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-lg)] p-[var(--g-space-4)]">
                <p className="text-xs text-[hsl(var(--g-text-secondary))] mb-1">{stat.label}</p>
                <p className="text-2xl font-semibold text-[hsl(var(--g-text-primary))]">{stat.value}</p>
                <StatusIndicator status={stat.status} text={stat.sub} />
              </div>
            ))}
          </div>
        </section>

        {/* Filters */}
        <section aria-labelledby="filters-heading" className="mb-[var(--g-space-5)]">
          <h2 id="filters-heading" className="sr-only">Filtros</h2>
          <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-lg)] p-[var(--g-space-4)]">
            <div className="flex flex-wrap items-end gap-[var(--g-space-4)]">
              <div className="flex flex-col gap-[var(--g-space-2)]">
                <Label htmlFor="category-filter" className="text-xs text-[hsl(var(--g-text-secondary))]">Categoría</Label>
                <Select value={categoryFilter} onValueChange={(v) => setCategoryFilter(v as GuardrailCategory | "all")}>
                  <SelectTrigger id="category-filter" className="w-[130px] h-9 text-sm bg-[hsl(var(--g-surface-base))] border-[hsl(var(--g-border-default))]">
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    {guardrailCategories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-[var(--g-space-2)]">
                <Label htmlFor="action-filter" className="text-xs text-[hsl(var(--g-text-secondary))]">Acción</Label>
                <Select value={actionFilter} onValueChange={(v) => setActionFilter(v as GuardrailAction | "all")}>
                  <SelectTrigger id="action-filter" className="w-[120px] h-9 text-sm bg-[hsl(var(--g-surface-base))] border-[hsl(var(--g-border-default))]">
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="Proceed">Proceed</SelectItem>
                    <SelectItem value="Block">Block</SelectItem>
                    <SelectItem value="Escalate">Escalate</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-[var(--g-space-2)]">
                <Label htmlFor="status-filter" className="text-xs text-[hsl(var(--g-text-secondary))]">Estado</Label>
                <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as GuardrailStatus | "all")}>
                  <SelectTrigger id="status-filter" className="w-[120px] h-9 text-sm bg-[hsl(var(--g-surface-base))] border-[hsl(var(--g-border-default))]">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Testing">Testing</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Deprecated">Deprecated</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-[var(--g-space-2)]">
                <Label htmlFor="system-filter" className="text-xs text-[hsl(var(--g-text-secondary))]">Sistema de IA</Label>
                <Select value={systemFilter} onValueChange={setSystemFilter}>
                  <SelectTrigger id="system-filter" className="w-[240px] h-9 text-sm bg-[hsl(var(--g-surface-base))] border-[hsl(var(--g-border-default))]">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los sistemas</SelectItem>
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
                  Limpiar filtros
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Guardrails Table */}
        <section aria-labelledby="guardrails">
          <div className="flex items-baseline justify-between mb-[var(--g-space-4)]">
            <h2
              id="guardrails"
              className="text-sm font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider"
            >
              Configuración de Guardrails
            </h2>
            <span className="text-sm text-[hsl(var(--g-text-secondary))]">
              {filteredGuardrails.length} de {guardrailsData.length} guardrails · Clic en fila para ver ficha normativa
            </span>
          </div>
          <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-lg)] overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-[hsl(var(--g-surface-subtle))] hover:bg-[hsl(var(--g-surface-subtle))]">
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium">Guardrail</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-28"><span className="inline-flex items-center gap-1">Categoría <InfoTooltip content={tooltips.guardrailCategory} /></span></TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-52">Sistema de IA</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-28"><span className="inline-flex items-center gap-1">Acción <InfoTooltip content={tooltips.guardrailAction} /></span></TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-36"><span className="inline-flex items-center gap-1">Supervisión <InfoTooltip content={tooltips.humanOversight} /></span></TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-24">Estado</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-20"><span className="inline-flex items-center gap-1">Versión <InfoTooltip content={tooltips.guardrailVersion} /></span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGuardrails.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-[hsl(var(--g-text-secondary))]">
                      No hay guardrails que coincidan con los filtros seleccionados.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredGuardrails.map((guardrail) => (
                    <TableRow
                      key={guardrail.id}
                      className={cn(
                        "hover:bg-[hsl(var(--g-surface-hover))] cursor-pointer",
                        selectedGuardrail?.id === guardrail.id && "bg-[hsl(var(--g-surface-hover))]"
                      )}
                      onClick={() => setSelectedGuardrail(guardrail)}
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === 'Enter') setSelectedGuardrail(guardrail); }}
                      role="button"
                      aria-label={`Ver ficha normativa de ${guardrail.name}`}
                    >
                      <TableCell>
                        <div>
                          <span className="text-[hsl(var(--g-text-primary))] font-medium">{guardrail.name}</span>
                          <span className="text-xs text-[hsl(var(--g-text-secondary))] ml-2">{guardrail.id}</span>
                          {guardrail.legalBasis && (
                            <div className="flex items-center gap-1 mt-0.5">
                              <Scale className="h-3 w-3 text-[hsl(var(--g-text-secondary))]" />
                              <span className="text-xs text-[hsl(var(--g-text-secondary))] truncate max-w-[300px]">{guardrail.legalBasis.split(";")[0]}</span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-[hsl(var(--g-text-secondary))]">{guardrail.category}</TableCell>
                      <TableCell className="text-[hsl(var(--g-text-secondary))] text-xs">{guardrail.aiSystemName}</TableCell>
                      <TableCell>
                        <StatusIndicator
                          status={guardrailActionMapping[guardrail.action].status}
                          text={guardrail.action}
                        />
                      </TableCell>
                      <TableCell>
                        <BooleanIndicator
                          value={guardrail.humanOversightRequired}
                          trueText="Requerida"
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
