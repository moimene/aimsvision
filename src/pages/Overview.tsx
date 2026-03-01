import { AppLayout, PageHeader } from "@/components/layout";
import { 
  StatusIndicator, 
  SeverityIndicator, 
  AlertTypeIndicator,
  type SeverityLevel,
  type AlertType,
} from "@/components/indicators";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { aiSystemsData } from "@/data/aiSystems";
import { riskData } from "@/data/risks";
import { incidentsData } from "@/data/incidents";
import { isoClauses } from "@/data/audit";

// Compute summary metrics dynamically from synthetic data
const totalSystems = aiSystemsData.length;
const productionSystems = aiSystemsData.filter(s => s.lifecycleState === "Production").length;
const highRiskSystems = aiSystemsData.filter(s => s.riskLevel === "High").length;
const nonCompliantSystems = aiSystemsData.filter(s => s.status === "Non-Compliant").length;
const atRiskSystems = aiSystemsData.filter(s => s.status === "At Risk").length;
const developmentSystems = aiSystemsData.filter(s => s.lifecycleState === "Development").length;

const summaryData = [
  { metric: "Total Sistemas de IA en Alcance", value: totalSystems },
  { metric: "Sistemas en Producción", value: productionSystems },
  { metric: "Sistemas en Desarrollo / Piloto", value: developmentSystems },
  { metric: "Sistemas de Alto Riesgo (AI Act)", value: highRiskSystems },
  { metric: "Sistemas No Conformes", value: nonCompliantSystems },
  { metric: "Sistemas en Riesgo", value: atRiskSystems },
];

// Compute compliance indicators
const openRisks = riskData.filter(r => r.status === "Open").length;
const criticalRisks = riskData.filter(r => r.status === "Open" && r.score >= 15).length;
const openIncidents = incidentsData.filter(i => i.status === "Open" || i.status === "Investigating").length;
const criticalIncidents = incidentsData.filter(i => i.severity === "Critical" && (i.status === "Open" || i.status === "Investigating")).length;
const compliantClauses = isoClauses.filter(c => c.status === "Compliant").length;
const totalClauses = isoClauses.length;
const clauseCoverage = Math.round((compliantClauses / totalClauses) * 100);
const pendingReviews = aiSystemsData.filter(s => s.status === "Pending").length + 2; // +2 scheduled audits

const complianceIndicators = [
  { 
    indicator: "Cobertura de Cláusulas ISO 42001", 
    value: `${clauseCoverage}%`, 
    status: clauseCoverage >= 80 ? "success" as const : clauseCoverage >= 60 ? "warning" as const : "critical" as const,
    statusText: clauseCoverage >= 80 ? "Conforme" : clauseCoverage >= 60 ? "En Progreso" : "Acción Requerida"
  },
  { 
    indicator: "Riesgos Abiertos por Encima del Umbral", 
    value: `${openRisks} (${criticalRisks} críticos)`, 
    status: criticalRisks > 0 ? "critical" as const : openRisks > 3 ? "warning" as const : "success" as const,
    statusText: criticalRisks > 0 ? "Acción Requerida" : "En Revisión"
  },
  { 
    indicator: "Incidentes Activos", 
    value: `${openIncidents} (${criticalIncidents} crítico)`, 
    status: criticalIncidents > 0 ? "critical" as const : openIncidents > 0 ? "warning" as const : "success" as const,
    statusText: criticalIncidents > 0 ? "Crítico – Acción Inmediata" : openIncidents > 0 ? "En Investigación" : "Sin Incidentes"
  },
  { 
    indicator: "Revisiones / Auditorías Pendientes", 
    value: `${pendingReviews}`, 
    status: "neutral" as const,
    statusText: "Programadas"
  },
  { 
    indicator: "Sistemas con Guardrails Inefectivos", 
    value: "2", 
    status: "critical" as const,
    statusText: "Acción Requerida"
  },
  { 
    indicator: "Conformidad con AI Act (Alto Riesgo)", 
    value: `${productionSystems - nonCompliantSystems - atRiskSystems}/${highRiskSystems} sistemas`, 
    status: "warning" as const,
    statusText: "En Progreso"
  },
];

// Active alerts derived from real data
const alertsData: {
  id: string;
  type: AlertType;
  aiSystem: string;
  severity: SeverityLevel;
  dueDate: string;
}[] = [
  {
    id: "ALT-001",
    type: "Incident",
    aiSystem: "Motor de Optimización de Precios de Seguros",
    severity: "Critical",
    dueDate: "2026-03-05",
  },
  {
    id: "ALT-002",
    type: "Risk",
    aiSystem: "Motor de Optimización de Precios de Seguros",
    severity: "Critical",
    dueDate: "2026-03-01",
  },
  {
    id: "ALT-003",
    type: "Incident",
    aiSystem: "Modelo de Scoring de Crédito para Pymes",
    severity: "High",
    dueDate: "2026-03-05",
  },
  {
    id: "ALT-004",
    type: "Risk",
    aiSystem: "Copiloto para Gestores de Banca Privada",
    severity: "High",
    dueDate: "2026-03-01",
  },
  {
    id: "ALT-005",
    type: "Risk",
    aiSystem: "Modelo de Scoring de Crédito para Pymes",
    severity: "High",
    dueDate: "2026-03-15",
  },
  {
    id: "ALT-006",
    type: "Audit",
    aiSystem: "Simulador de Idoneidad de Inversiones (MiFID II)",
    severity: "Medium",
    dueDate: "2026-03-15",
  },
  {
    id: "ALT-007",
    type: "Risk",
    aiSystem: "Asistente de Verificación KYC/AML",
    severity: "Medium",
    dueDate: "2026-04-01",
  },
  {
    id: "ALT-008",
    type: "Audit",
    aiSystem: "Motor de Detección de Fraude en Tarjetas v3",
    severity: "Low",
    dueDate: "2026-04-15",
  },
];

// KPI summary for the period
const kpiSummary = [
  { metric: "Interacciones mensuales totales (todos los sistemas)", value: "3.284.200+" },
  { metric: "Tasa media de escalado a humano", value: "8,4%" },
  { metric: "Tasa media de bloqueo por guardrail", value: "1,2%" },
  { metric: "Guardrails activos desplegados", value: "22" },
  { metric: "Decisiones con explicabilidad SHAP/LIME", value: "100%" },
  { metric: "Cobertura de auditoría Galtea (sistemas activos)", value: "14 / 17" },
];

export default function Overview() {
  return (
    <AppLayout>
      <PageHeader
        title="Visión General del AIMS"
        subtitle="Estado actual del Sistema de Gestión de IA (ISO/IEC 42001) · Período: Febrero 2026"
      />
      <div className="p-[var(--g-space-6)]">
        {/* Summary Table */}
        <section aria-labelledby="summary-heading">
          <h2 
            id="summary-heading" 
            className="text-sm font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider mb-[var(--g-space-4)]"
          >
            Resumen del Sistema
          </h2>
          <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-lg)] overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-[hsl(var(--g-surface-subtle))] hover:bg-[hsl(var(--g-surface-subtle))]">
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium">Métrica</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium text-right w-32">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {summaryData.map((row) => (
                  <TableRow key={row.metric} className="hover:bg-[hsl(var(--g-surface-hover))]">
                    <TableCell className="text-[hsl(var(--g-text-secondary))]">{row.metric}</TableCell>
                    <TableCell className="text-[hsl(var(--g-text-primary))] font-semibold text-right">{row.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        {/* Compliance Indicators Table */}
        <section aria-labelledby="compliance-heading" className="mt-[var(--g-space-7)]">
          <h2 
            id="compliance-heading" 
            className="text-sm font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider mb-[var(--g-space-4)]"
          >
            Indicadores de Conformidad
          </h2>
          <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-lg)] overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-[hsl(var(--g-surface-subtle))] hover:bg-[hsl(var(--g-surface-subtle))]">
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium">Indicador</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium text-right w-48">Valor</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-52">Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {complianceIndicators.map((row) => (
                  <TableRow key={row.indicator} className="hover:bg-[hsl(var(--g-surface-hover))]">
                    <TableCell className="text-[hsl(var(--g-text-secondary))]">{row.indicator}</TableCell>
                    <TableCell className="text-[hsl(var(--g-text-primary))] font-semibold text-right">{row.value}</TableCell>
                    <TableCell>
                      <StatusIndicator status={row.status} text={row.statusText} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        {/* KPI Summary */}
        <section aria-labelledby="kpi-heading" className="mt-[var(--g-space-7)]">
          <h2 
            id="kpi-heading" 
            className="text-sm font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider mb-[var(--g-space-4)]"
          >
            KPIs Operacionales – Febrero 2026
          </h2>
          <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-lg)] overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-[hsl(var(--g-surface-subtle))] hover:bg-[hsl(var(--g-surface-subtle))]">
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium">Métrica</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium text-right w-48">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {kpiSummary.map((row) => (
                  <TableRow key={row.metric} className="hover:bg-[hsl(var(--g-surface-hover))]">
                    <TableCell className="text-[hsl(var(--g-text-secondary))]">{row.metric}</TableCell>
                    <TableCell className="text-[hsl(var(--g-text-primary))] font-semibold text-right">{row.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        {/* Alerts Table */}
        <section aria-labelledby="alerts-heading" className="mt-[var(--g-space-7)]">
          <h2 
            id="alerts-heading" 
            className="text-sm font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider mb-[var(--g-space-4)]"
          >
            Alertas Activas
          </h2>
          <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-lg)] overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-[hsl(var(--g-surface-subtle))] hover:bg-[hsl(var(--g-surface-subtle))]">
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-28">Tipo</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium">Sistema de IA</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-32">Severidad</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-32">Fecha Límite</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {alertsData.map((alert) => (
                  <TableRow key={alert.id} className="hover:bg-[hsl(var(--g-surface-hover))]">
                    <TableCell>
                      <AlertTypeIndicator type={alert.type} />
                    </TableCell>
                    <TableCell className="text-[hsl(var(--g-text-primary))]">{alert.aiSystem}</TableCell>
                    <TableCell>
                      <SeverityIndicator severity={alert.severity} />
                    </TableCell>
                    <TableCell className="text-[hsl(var(--g-text-secondary))]">{alert.dueDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
