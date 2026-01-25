import { CheckCircle, AlertTriangle, XCircle, Clock } from "lucide-react";

export type StatusType = "success" | "warning" | "critical" | "neutral";

interface StatusIndicatorProps {
  status: StatusType;
  text: string;
}

const statusConfig = {
  success: { 
    icon: CheckCircle, 
    colorClass: "text-[hsl(var(--g-status-success))]",
    bgClass: "bg-[hsl(var(--g-status-success)/0.1)]"
  },
  warning: { 
    icon: AlertTriangle, 
    colorClass: "text-[hsl(var(--g-status-warning))]",
    bgClass: "bg-[hsl(var(--g-status-warning)/0.1)]"
  },
  critical: { 
    icon: XCircle, 
    colorClass: "text-[hsl(var(--g-status-critical))]",
    bgClass: "bg-[hsl(var(--g-status-critical)/0.1)]"
  },
  neutral: { 
    icon: Clock, 
    colorClass: "text-[hsl(var(--g-text-secondary))]",
    bgClass: "bg-[hsl(var(--g-surface-subtle))]"
  },
};

export function StatusIndicator({ status, text }: StatusIndicatorProps) {
  const { icon: Icon, colorClass, bgClass } = statusConfig[status];

  return (
    <span className={`inline-flex items-center gap-[var(--g-space-1\.5)] px-2 py-1 rounded-full ${bgClass}`}>
      <Icon className={`h-3.5 w-3.5 ${colorClass}`} aria-hidden="true" />
      <span className={`text-xs font-medium ${colorClass}`}>{text}</span>
    </span>
  );
}
