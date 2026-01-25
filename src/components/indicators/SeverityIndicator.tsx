import { XCircle, AlertTriangle, AlertCircle, Clock } from "lucide-react";

export type SeverityLevel = "Critical" | "High" | "Medium" | "Low";

interface SeverityIndicatorProps {
  severity: SeverityLevel;
}

const severityConfig: Record<SeverityLevel, { icon: typeof XCircle; colorClass: string }> = {
  Critical: { 
    icon: XCircle, 
    colorClass: "text-[hsl(var(--g-status-critical))]" 
  },
  High: { 
    icon: AlertTriangle, 
    colorClass: "text-[hsl(var(--g-status-critical))]" 
  },
  Medium: { 
    icon: AlertCircle, 
    colorClass: "text-[hsl(var(--g-status-warning))]" 
  },
  Low: { 
    icon: Clock, 
    colorClass: "text-[hsl(var(--g-text-secondary))]" 
  },
};

export function SeverityIndicator({ severity }: SeverityIndicatorProps) {
  const { icon: Icon, colorClass } = severityConfig[severity];

  return (
    <span className={`inline-flex items-center gap-[var(--g-space-2)] ${colorClass}`}>
      <Icon className="h-4 w-4" aria-hidden="true" />
      <span className="text-sm">{severity}</span>
    </span>
  );
}
