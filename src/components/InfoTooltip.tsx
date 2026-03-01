import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface InfoTooltipProps {
  content: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  className?: string;
  iconClassName?: string;
}

export function InfoTooltip({
  content,
  side = "top",
  className,
  iconClassName,
}: InfoTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          className={cn(
            "inline-flex items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-[hsl(var(--g-border-strong))] focus:ring-offset-1",
            className
          )}
          aria-label="Más información"
        >
          <HelpCircle
            className={cn(
              "h-3.5 w-3.5 text-[hsl(var(--g-text-secondary))] hover:text-[hsl(var(--g-text-primary))] transition-colors",
              iconClassName
            )}
          />
        </button>
      </TooltipTrigger>
      <TooltipContent
        side={side}
        className="max-w-[280px] text-xs leading-relaxed bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] text-[hsl(var(--g-text-primary))] shadow-lg p-3"
      >
        {content}
      </TooltipContent>
    </Tooltip>
  );
}

// Predefined tooltip content for common concepts
export const tooltips = {
  // Risk fields
  riskLevel: (
    <span>
      <strong>Nivel de riesgo residual</strong> tras aplicar controles. Escala: Crítico → Alto → Medio → Bajo. Conforme al AI Act, los sistemas de alto riesgo (Anexo III) requieren evaluación de conformidad antes del despliegue.
    </span>
  ),
  riskLikelihood: (
    <span>
      <strong>Probabilidad</strong> de que el riesgo se materialice en los próximos 12 meses, en escala 1–5. Se evalúa considerando controles existentes, historial de incidentes y exposición del sistema.
    </span>
  ),
  riskImpact: (
    <span>
      <strong>Impacto</strong> potencial si el riesgo se materializa, en escala 1–5. Incluye impacto regulatorio (multas), reputacional, operacional y sobre derechos de los afectados.
    </span>
  ),
  riskOwner: (
    <span>
      <strong>Risk Owner:</strong> responsable de monitorizar este riesgo, definir controles y reportar su estado al Comité de Riesgos. Conforme a ISO/IEC 42001 cláusula 6.1.
    </span>
  ),
  riskTreatment: (
    <span>
      <strong>Tratamiento del riesgo:</strong> estrategia seleccionada. <em>Mitigate</em> = reducir probabilidad/impacto; <em>Accept</em> = asumir dentro del apetito de riesgo; <em>Transfer</em> = externalizar (seguro, proveedor); <em>Avoid</em> = eliminar la actividad.
    </span>
  ),
  // Guardrail fields
  guardrailAction: (
    <span>
      <strong>Acción del guardrail:</strong> <em>Block</em> = detiene el flujo hasta intervención humana; <em>Escalate</em> = deriva a un especialista antes de continuar; <em>Filter</em> = redacta información sensible; <em>Alert</em> = notifica sin detener el flujo.
    </span>
  ),
  guardrailCategory: (
    <span>
      <strong>Categoría:</strong> <em>Compliance</em> = obligación regulatoria directa; <em>Privacy</em> = protección de datos personales (RGPD); <em>Security</em> = robustez y ciberseguridad (AI Act art. 15); <em>Quality</em> = rendimiento y fiabilidad del modelo.
    </span>
  ),
  humanOversight: (
    <span>
      <strong>Supervisión humana requerida</strong> conforme al AI Act art. 14. Indica que ninguna decisión puede ejecutarse sin validación de un profesional cualificado. El SLA define el plazo máximo de respuesta.
    </span>
  ),
  guardrailVersion: (
    <span>
      <strong>Versión del guardrail</strong> (semver). Cada cambio en la lógica de activación, umbrales o base legal genera una nueva versión. El historial completo es auditable en el panel de detalle.
    </span>
  ),
  legalBasis: (
    <span>
      <strong>Base legal:</strong> normativa EU/ES que fundamenta este control. Clic en la fila para ver la justificación completa del equipo legal, condición de activación y consecuencias de incumplimiento.
    </span>
  ),
  // Monitoring fields
  eventType: (
    <span>
      <strong>Tipo de evento:</strong> clasificación del log de interacción. <em>guardrail_triggered</em> = control activado; <em>human_escalation</em> = derivación a humano; <em>model_drift_alert</em> = deriva estadística detectada; <em>audit_log</em> = registro de auditoría.
    </span>
  ),
  kpiAccuracy: (
    <span>
      <strong>Accuracy:</strong> proporción de predicciones correctas sobre el total. Umbral mínimo definido en el TRA (Technical Risk Assessment) del sistema. Caídas &gt;2pp activan revisión del modelo.
    </span>
  ),
  kpiFalsePositive: (
    <span>
      <strong>Tasa de falsos positivos:</strong> alertas generadas incorrectamente. En sistemas AML/fraude, una tasa alta sobrecarga al equipo de revisión; una tasa baja puede indicar subdetección. Se monitoriza semanalmente.
    </span>
  ),
  // Incident fields
  incidentSeverity: (
    <span>
      <strong>Severidad del incidente:</strong> <em>Critical</em> = impacto en derechos fundamentales o riesgo sistémico; <em>High</em> = impacto significativo en clientes o regulatorio; <em>Medium</em> = degradación de servicio; <em>Low</em> = anomalía sin impacto directo.
    </span>
  ),
  capaAction: (
    <span>
      <strong>Acción CAPA</strong> (Corrective and Preventive Action): medida correctiva o preventiva derivada del análisis de causa raíz del incidente. Cada acción tiene propietario, fecha límite y estado de seguimiento.
    </span>
  ),
  rootCause: (
    <span>
      <strong>Causa raíz:</strong> análisis post-mortem que identifica el origen del incidente. Metodología: 5 Whys + Fishbone. El análisis completo está disponible en el documento de postmortem vinculado.
    </span>
  ),
  // Governance fields
  raciMatrix: (
    <span>
      <strong>Matriz RACI:</strong> <em>Responsible</em> = ejecuta la tarea; <em>Accountable</em> = responde del resultado; <em>Consulted</em> = aporta criterio; <em>Informed</em> = recibe información. Conforme a ISO/IEC 42001 cláusula 5.3.
    </span>
  ),
  approvalStatus: (
    <span>
      <strong>Estado de aprobación:</strong> <em>Approved</em> = sistema autorizado para producción; <em>Conditional</em> = aprobado con condiciones pendientes; <em>Pending</em> = en revisión; <em>Rejected</em> = no autorizado. Requiere firma del Comité de Ética de IA.
    </span>
  ),
  // AI System fields
  aiActRisk: (
    <span>
      <strong>Clasificación AI Act:</strong> <em>High Risk</em> (Anexo III) = evaluación de conformidad obligatoria antes del despliegue; <em>Limited Risk</em> = obligaciones de transparencia; <em>Minimal Risk</em> = sin obligaciones específicas. Vigente desde agosto 2026.
    </span>
  ),
  systemStatus: (
    <span>
      <strong>Estado operativo:</strong> <em>Production</em> = en producción y monitorizando; <em>Pilot</em> = despliegue controlado; <em>Development</em> = en desarrollo; <em>Suspended</em> = suspendido por incidente o revisión regulatoria.
    </span>
  ),
  explainabilityMethod: (
    <span>
      <strong>Método de explicabilidad:</strong> técnica usada para generar explicaciones de las decisiones del modelo. <em>SHAP</em> = valores de Shapley (global + local); <em>LIME</em> = aproximación local; <em>Attention</em> = mapas de atención en transformers.
    </span>
  ),
  // Evidence / QTSP fields
  tstToken: (
    <span>
      <strong>Token de Sello de Tiempo (TST)</strong> conforme a RFC 3161 y eIDAS. Garantiza que el artefacto existía en el momento indicado y no ha sido modificado. Emitido por una QTSP (Qualified Trust Service Provider) acreditada.
    </span>
  ),
  evidenceBundle: (
    <span>
      <strong>Expediente de evidencia:</strong> conjunto inmutable de eventos sellados que documenta el ciclo de vida completo de una interacción de IA. Constituye evidencia válida ante autoridades supervisoras (CNMV, Banco de España, AEPD).
    </span>
  ),
  policyDecision: (
    <span>
      <strong>Decisión de política:</strong> resultado de evaluar el evento contra el conjunto de guardrails activos. <em>ALLOW</em> = el flujo continúa; <em>BLOCK</em> = el flujo se detiene; <em>ESCALATE</em> = se deriva a supervisión humana.
    </span>
  ),
  // Audit fields
  isoClause: (
    <span>
      <strong>Cláusula ISO/IEC 42001:2023:</strong> requisito específico del estándar de gestión de sistemas de IA. El nivel de madurez va de 0 (no implementado) a 5 (optimizado). Las no conformidades mayores bloquean la certificación.
    </span>
  ),
  auditFinding: (
    <span>
      <strong>Hallazgo de auditoría:</strong> <em>Major NC</em> = no conformidad mayor, requiere acción correctiva antes de la certificación; <em>Minor NC</em> = no conformidad menor, plan de mejora en 90 días; <em>OFI</em> = oportunidad de mejora.
    </span>
  ),
};
