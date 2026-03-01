import { useState } from "react";
import { AppLayout, PageHeader } from "@/components/layout";
import { StatusIndicator } from "@/components/indicators";
import {
  evidenceBundles,
  bundleStatusLabels,
  eventTypeLabels,
  type EvidenceBundle,
  type TimelineEvent,
} from "@/data/evidenceCertificates";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Shield,
  CheckCircle,
  Clock,
  FileText,
  ChevronDown,
  ChevronUp,
  Lock,
  Hash,
  User,
  AlertTriangle,
  Scale,
} from "lucide-react";
import { cn } from "@/lib/utils";

function PolicyDecisionBadge({ decision }: { decision: "allow" | "block" | "escalate" }) {
  const map = {
    allow: { color: "text-green-400 bg-green-400/10 border-green-400/30", label: "ALLOW" },
    block: { color: "text-red-400 bg-red-400/10 border-red-400/30", label: "BLOCK" },
    escalate: { color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30", label: "ESCALATE" },
  };
  const { color, label } = map[decision];
  return (
    <span className={cn("inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-semibold border", color)}>
      {label}
    </span>
  );
}

function TstBadge({ valid }: { valid: boolean }) {
  return (
    <span className={cn(
      "inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded border font-mono",
      valid
        ? "text-green-400 bg-green-400/10 border-green-400/30"
        : "text-red-400 bg-red-400/10 border-red-400/30"
    )}>
      {valid ? <CheckCircle className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
      {valid ? "TST VÁLIDO" : "TST INVÁLIDO"}
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
        {open ? <ChevronUp className="h-4 w-4 text-[hsl(var(--g-text-secondary))]" /> : <ChevronDown className="h-4 w-4 text-[hsl(var(--g-text-secondary))]" />}
      </button>
      {open && (
        <div className="bg-[hsl(var(--g-surface-card))] p-[var(--g-space-4)]">
          {children}
        </div>
      )}
    </section>
  );
}

function TimelineEventRow({ event }: { event: TimelineEvent }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-md)] overflow-hidden mb-2">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-start gap-3 px-4 py-3 bg-[hsl(var(--g-surface-subtle))] hover:bg-[hsl(var(--g-surface-hover))] transition-colors text-left"
      >
        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] flex items-center justify-center mt-0.5">
          <span className="text-xs font-mono text-[hsl(var(--g-text-secondary))]">{event.seq}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-sm font-medium text-[hsl(var(--g-text-primary))]">
              {eventTypeLabels[event.eventType] || event.eventType}
            </span>
            <PolicyDecisionBadge decision={event.policyDecision.decision} />
            <TstBadge valid={event.tstValid} />
          </div>
          <p className="text-xs text-[hsl(var(--g-text-secondary))]">{event.description}</p>
          <div className="flex items-center gap-4 mt-1">
            <span className="text-xs text-[hsl(var(--g-text-secondary))] font-mono">{event.occurredAt}</span>
            <span className="text-xs text-[hsl(var(--g-text-secondary))]">Actor: {event.actor}</span>
          </div>
        </div>
        {expanded ? <ChevronUp className="h-4 w-4 text-[hsl(var(--g-text-secondary))] flex-shrink-0 mt-1" /> : <ChevronDown className="h-4 w-4 text-[hsl(var(--g-text-secondary))] flex-shrink-0 mt-1" />}
      </button>
      {expanded && (
        <div className="bg-[hsl(var(--g-surface-card))] px-4 py-3 space-y-3 border-t border-[hsl(var(--g-border-default))]">
          {/* Policy decision detail */}
          <div>
            <p className="text-xs text-[hsl(var(--g-text-secondary))] mb-1 uppercase tracking-wider">Decisión de política</p>
            <div className="flex flex-wrap items-center gap-2">
              <PolicyDecisionBadge decision={event.policyDecision.decision} />
              <span className="text-xs text-[hsl(var(--g-text-secondary))]">{event.policyDecision.reason}</span>
              {event.policyDecision.guardrailId && (
                <span className="text-xs font-mono text-[hsl(var(--g-text-secondary))] bg-[hsl(var(--g-surface-subtle))] px-2 py-0.5 rounded">
                  {event.policyDecision.guardrailId}
                </span>
              )}
            </div>
            {event.policyDecision.obligations && event.policyDecision.obligations.length > 0 && (
              <div className="mt-2">
                <p className="text-xs text-[hsl(var(--g-text-secondary))] mb-1">Obligaciones:</p>
                {event.policyDecision.obligations.map((ob, i) => (
                  <pre key={i} className="text-xs font-mono text-[hsl(var(--g-text-secondary))] bg-[hsl(var(--g-surface-subtle))] rounded p-2 overflow-x-auto">
                    {JSON.stringify(ob, null, 2)}
                  </pre>
                ))}
              </div>
            )}
          </div>
          {/* Artifact */}
          <div>
            <p className="text-xs text-[hsl(var(--g-text-secondary))] mb-1 uppercase tracking-wider">Artefacto sellado</p>
            <div className="bg-[hsl(var(--g-surface-subtle))] rounded p-2 space-y-1">
              <div className="flex items-center gap-2">
                <FileText className="h-3 w-3 text-[hsl(var(--g-text-secondary))]" />
                <span className="text-xs text-[hsl(var(--g-text-secondary))]">Tipo: <span className="font-mono text-[hsl(var(--g-text-primary))]">{event.artifactType}</span></span>
              </div>
              <div className="flex items-start gap-2">
                <Hash className="h-3 w-3 text-[hsl(var(--g-text-secondary))] mt-0.5" />
                <span className="text-xs font-mono text-[hsl(var(--g-text-secondary))] break-all">SHA-256: {event.artifactSha256}</span>
              </div>
            </div>
          </div>
          {/* TST Token (truncated) */}
          <div>
            <p className="text-xs text-[hsl(var(--g-text-secondary))] mb-1 uppercase tracking-wider">Token de Sello de Tiempo (RFC 3161)</p>
            <pre className="text-xs font-mono text-[hsl(var(--g-text-secondary))] bg-[hsl(var(--g-surface-subtle))] rounded p-2 overflow-x-auto whitespace-pre-wrap break-all">
              {event.tstToken}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

function BundleDetailPanel({ bundle, onClose }: { bundle: EvidenceBundle; onClose: () => void }) {
  const statusInfo = bundleStatusLabels[bundle.finalStatus];
  return (
    <Sheet open={true} onOpenChange={onClose}>
      <SheetContent className="w-[600px] sm:w-[760px] bg-[hsl(var(--g-surface-base))] border-l border-[hsl(var(--g-border-default))] overflow-y-auto">
        <SheetHeader className="border-b border-[hsl(var(--g-border-default))] pb-[var(--g-space-4)]">
          <div className="flex items-center gap-[var(--g-space-2)]">
            <Shield className="h-4 w-4 text-green-400" />
            <span className="text-xs text-[hsl(var(--g-text-secondary))] uppercase tracking-wider">Certificado de Evidencia · QTSP / RFC 3161</span>
          </div>
          <SheetTitle className="text-[hsl(var(--g-text-primary))] leading-tight">{bundle.certificateName}</SheetTitle>
          <SheetDescription className="text-[hsl(var(--g-text-secondary))]">
            {bundle.id} · {bundle.evidenceBundleId} · Schema v{bundle.schemaVersion}
          </SheetDescription>
          <div className="flex flex-wrap gap-2 pt-1">
            <span className={cn("text-xs font-semibold", statusInfo.color)}>{statusInfo.label}</span>
            <span className="text-xs text-[hsl(var(--g-text-secondary))] font-mono">{bundle.finalStatusAt}</span>
          </div>
        </SheetHeader>

        <div className="mt-[var(--g-space-5)] space-y-[var(--g-space-4)]">

          {/* Journey Context */}
          <SectionBlock icon={<FileText className="h-4 w-4" />} title="Contexto del Expediente">
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                ["Sistema de IA", `${bundle.aiSystemName} (${bundle.aiSystemId})`],
                ["Journey ID", bundle.journeyId],
                ["Offer ID", bundle.offerId || "—"],
                ["Cliente (pseudónimo)", bundle.customerPseudonymId],
                ["Canal", bundle.channelId],
                ["Jurisdicción", bundle.jurisdiction],
                ["Familia de producto", bundle.productFamily],
                ["Versión de política", bundle.policyPackVersion],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-xs text-[hsl(var(--g-text-secondary))] mb-0.5">{label}</p>
                  <p className="text-sm text-[hsl(var(--g-text-primary))] font-mono break-all">{value}</p>
                </div>
              ))}
            </div>
          </SectionBlock>

          {/* Technical Stack */}
          <SectionBlock icon={<Lock className="h-4 w-4" />} title="Stack Técnico" defaultOpen={false}>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                ["Agent ID", bundle.agentId],
                ["Versión del modelo", bundle.modelVersion],
                ["Versión del toolchain", bundle.toolchainVersion],
                ["Algoritmo de hash", bundle.hashAlgorithm],
                ["Precisión de sellos", bundle.timestampsPrecision],
                ["TSA Policy OID", bundle.tsaPolicyOid],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-xs text-[hsl(var(--g-text-secondary))] mb-0.5">{label}</p>
                  <p className="text-sm text-[hsl(var(--g-text-primary))] font-mono">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-3">
              <p className="text-xs text-[hsl(var(--g-text-secondary))] mb-0.5">Canonicalización</p>
              <p className="text-xs text-[hsl(var(--g-text-primary))] font-mono bg-[hsl(var(--g-surface-subtle))] rounded p-2">{bundle.canonicalization}</p>
            </div>
          </SectionBlock>

          {/* Timeline */}
          <SectionBlock icon={<Clock className="h-4 w-4" />} title={`Línea de Tiempo (${bundle.timeline.length} eventos sellados)`}>
            <div className="space-y-2">
              {bundle.timeline.map((event) => (
                <TimelineEventRow key={event.eventId} event={event} />
              ))}
            </div>
          </SectionBlock>

          {/* Manifest JSON preview */}
          <SectionBlock icon={<Hash className="h-4 w-4" />} title="Manifest JSON (extracto)" defaultOpen={false}>
            <pre className="text-xs font-mono text-[hsl(var(--g-text-secondary))] bg-[hsl(var(--g-surface-subtle))] rounded p-3 overflow-x-auto whitespace-pre-wrap">
{JSON.stringify({
  schemaVersion: bundle.schemaVersion,
  evidenceBundleId: bundle.evidenceBundleId,
  issuedAt: bundle.issuedAt,
  aiSystemId: bundle.aiSystemId,
  journeyId: bundle.journeyId,
  customerPseudonymId: bundle.customerPseudonymId,
  jurisdiction: bundle.jurisdiction,
  policyPackVersion: bundle.policyPackVersion,
  finalStatus: bundle.finalStatus,
  finalStatusAt: bundle.finalStatusAt,
  eventCount: bundle.timeline.length,
  hashAlgorithm: bundle.hashAlgorithm,
  tsaPolicyOid: bundle.tsaPolicyOid,
  "// Note": "Full manifest includes all timeline events with TST tokens. Redacted for display."
}, null, 2)}
            </pre>
          </SectionBlock>

        </div>
      </SheetContent>
    </Sheet>
  );
}

export default function EvidenceCertificates() {
  const [selectedBundle, setSelectedBundle] = useState<EvidenceBundle | null>(null);

  const signedCount = evidenceBundles.filter(b => b.finalStatus === "signed").length;
  const withdrawnCount = evidenceBundles.filter(b => b.finalStatus === "withdrawn").length;
  const totalEvents = evidenceBundles.reduce((acc, b) => acc + b.timeline.length, 0);

  return (
    <AppLayout>
      <PageHeader
        title="Certificados de Evidencia"
        subtitle="Expedientes sellados QTSP / RFC 3161 · Trazabilidad inmutable de interacciones de IA"
      />
      <div className="p-[var(--g-space-6)]">

        {/* Stats */}
        <section className="mb-[var(--g-space-5)]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-[var(--g-space-4)]">
            {[
              { label: "Expedientes Totales", value: evidenceBundles.length, icon: <Shield className="h-4 w-4" />, color: "text-[hsl(var(--g-text-primary))]" },
              { label: "Firmados y Sellados", value: signedCount, icon: <CheckCircle className="h-4 w-4" />, color: "text-green-400" },
              { label: "Desistimientos", value: withdrawnCount, icon: <AlertTriangle className="h-4 w-4" />, color: "text-yellow-400" },
              { label: "Eventos Sellados (total)", value: totalEvents, icon: <Clock className="h-4 w-4" />, color: "text-blue-400" },
            ].map((stat) => (
              <div key={stat.label} className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-lg)] p-[var(--g-space-4)]">
                <div className={cn("mb-1", stat.color)}>{stat.icon}</div>
                <p className="text-xs text-[hsl(var(--g-text-secondary))] mb-1">{stat.label}</p>
                <p className={cn("text-2xl font-semibold", stat.color)}>{stat.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Info banner */}
        <div className="mb-[var(--g-space-5)] bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-lg)] p-[var(--g-space-4)] flex items-start gap-3">
          <Scale className="h-5 w-5 text-[hsl(var(--g-text-secondary))] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-[hsl(var(--g-text-primary))] mb-1">Expedientes de evidencia sellados con QTSP (RFC 3161)</p>
            <p className="text-xs text-[hsl(var(--g-text-secondary))] leading-relaxed">
              Cada expediente registra la secuencia completa de eventos de una interacción de IA: oferta mostrada, SECCI presentado, consentimientos capturados, guardrails activados, decisiones de política y resultado final. Cada evento incluye un Token de Sello de Tiempo (TST) conforme a RFC 3161 y eIDAS, garantizando la inmutabilidad y la trazabilidad legal del expediente. Los expedientes son inmutables una vez cerrados y constituyen evidencia válida ante autoridades supervisoras.
            </p>
          </div>
        </div>

        {/* Bundles table */}
        <section aria-labelledby="bundles-heading">
          <div className="flex items-baseline justify-between mb-[var(--g-space-4)]">
            <h2 id="bundles-heading" className="text-sm font-medium text-[hsl(var(--g-text-secondary))] uppercase tracking-wider">
              Expedientes de Evidencia
            </h2>
            <span className="text-sm text-[hsl(var(--g-text-secondary))]">
              {evidenceBundles.length} expedientes · Clic en fila para ver detalle
            </span>
          </div>
          <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-lg)] overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-[hsl(var(--g-surface-subtle))] hover:bg-[hsl(var(--g-surface-subtle))]">
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium">Certificado</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-48">Sistema de IA</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-32">Producto</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-20 text-center">Eventos</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-36">Estado final</TableHead>
                  <TableHead className="text-[hsl(var(--g-text-primary))] font-medium w-36">Sellado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {evidenceBundles.map((bundle) => {
                  const statusInfo = bundleStatusLabels[bundle.finalStatus];
                  return (
                    <TableRow
                      key={bundle.id}
                      className={cn(
                        "hover:bg-[hsl(var(--g-surface-hover))] cursor-pointer",
                        selectedBundle?.id === bundle.id && "bg-[hsl(var(--g-surface-hover))]"
                      )}
                      onClick={() => setSelectedBundle(bundle)}
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === 'Enter') setSelectedBundle(bundle); }}
                      role="button"
                      aria-label={`Ver expediente ${bundle.id}`}
                    >
                      <TableCell>
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <Shield className="h-3.5 w-3.5 text-green-400 flex-shrink-0" />
                            <span className="text-[hsl(var(--g-text-primary))] font-medium text-sm">{bundle.id}</span>
                          </div>
                          <p className="text-xs text-[hsl(var(--g-text-secondary))] leading-tight">{bundle.certificateName}</p>
                          <p className="text-xs font-mono text-[hsl(var(--g-text-secondary))] mt-0.5">{bundle.evidenceBundleId}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs text-[hsl(var(--g-text-secondary))]">{bundle.aiSystemName}</TableCell>
                      <TableCell className="text-xs text-[hsl(var(--g-text-secondary))]">{bundle.productFamily}</TableCell>
                      <TableCell className="text-center">
                        <span className="text-sm font-semibold text-[hsl(var(--g-text-primary))]">{bundle.timeline.length}</span>
                      </TableCell>
                      <TableCell>
                        <span className={cn("text-xs font-semibold", statusInfo.color)}>{statusInfo.label}</span>
                      </TableCell>
                      <TableCell className="text-xs font-mono text-[hsl(var(--g-text-secondary))]">
                        {bundle.finalStatusAt.replace("T", " ").replace("Z", " UTC")}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </section>
      </div>

      {selectedBundle && (
        <BundleDetailPanel bundle={selectedBundle} onClose={() => setSelectedBundle(null)} />
      )}
    </AppLayout>
  );
}
