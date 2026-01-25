import { FileWarning, AlertCircle, ClipboardCheck } from "lucide-react";

export type AlertType = "Risk" | "Incident" | "Audit";

interface AlertTypeIndicatorProps {
  type: AlertType;
}

const alertTypeConfig: Record<AlertType, { icon: typeof FileWarning; colorClass: string }> = {
  Risk: { 
    icon: FileWarning, 
    colorClass: "text-[hsl(var(--g-status-warning))]" 
  },
  Incident: { 
    icon: AlertCircle, 
    colorClass: "text-[hsl(var(--g-status-critical))]" 
  },
  Audit: { 
    icon: ClipboardCheck, 
    colorClass: "text-[hsl(var(--g-text-secondary))]" 
  },
};

export function AlertTypeIndicator({ type }: AlertTypeIndicatorProps) {
  const { icon: Icon, colorClass } = alertTypeConfig[type];

  return (
    <span className={`inline-flex items-center gap-[var(--g-space-2)] ${colorClass}`}>
      <Icon className="h-4 w-4" aria-hidden="true" />
      <span className="text-sm">{type}</span>
    </span>
  );
}
