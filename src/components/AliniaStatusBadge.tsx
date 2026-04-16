import { ShieldCheck, ShieldAlert, ShieldOff, Stamp } from "lucide-react";
import type { AliniaVerdict } from "@/data/mockAlinia";

const config = {
  allowed: {
    icon: ShieldCheck,
    label: "Alinia: OK",
    colorClass: "text-[hsl(var(--g-status-success))]",
    bgClass: "bg-[hsl(var(--g-status-success)/0.1)]",
    borderClass: "border-[hsl(var(--g-status-success)/0.25)]",
  },
  flagged: {
    icon: ShieldAlert,
    label: "Alinia: Revisión",
    colorClass: "text-[hsl(var(--g-status-warning))]",
    bgClass: "bg-[hsl(var(--g-status-warning)/0.1)]",
    borderClass: "border-[hsl(var(--g-status-warning)/0.25)]",
  },
  blocked: {
    icon: ShieldOff,
    label: "Alinia: Bloqueado",
    colorClass: "text-[hsl(var(--g-status-critical))]",
    bgClass: "bg-[hsl(var(--g-status-critical)/0.1)]",
    borderClass: "border-[hsl(var(--g-status-critical)/0.25)]",
  },
};

export function AliniaStatusBadge({ verdict }: { verdict: AliniaVerdict }) {
  const { icon: Icon, label, colorClass, bgClass, borderClass } = config[verdict.status];

  return (
    <span
      className={`inline-flex items-center gap-[var(--g-space-1)] px-2 py-0.5 rounded-full border text-[10px] font-medium ${bgClass} ${borderClass} ${colorClass}`}
    >
      <Icon className="h-3 w-3" aria-hidden="true" />
      <span>{label}</span>
      {verdict.regulation && (
        <span className="opacity-70">· {verdict.regulation}</span>
      )}
      <span className="opacity-60 inline-flex items-center gap-0.5 ml-0.5" title="Sellado con Sello de Tiempo Cualificado (eIDAS / RFC 3161)">
        <Stamp className="h-2.5 w-2.5" aria-hidden="true" />
        <span>eIDAS</span>
      </span>
    </span>
  );
}
