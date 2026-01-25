import { CheckCircle, AlertTriangle, XCircle, Clock } from "lucide-react";

export type StatusType = "success" | "warning" | "critical" | "neutral";

interface StatusIndicatorProps {
  status: StatusType;
  text: string;
}

const statusConfig = {
  success: { 
    icon: CheckCircle, 
    colorClass: "text-[hsl(var(--g-status-success))]" 
  },
  warning: { 
    icon: AlertTriangle, 
    colorClass: "text-[hsl(var(--g-status-warning))]" 
  },
  critical: { 
    icon: XCircle, 
    colorClass: "text-[hsl(var(--g-status-critical))]" 
  },
  neutral: { 
    icon: Clock, 
    colorClass: "text-[hsl(var(--g-text-secondary))]" 
  },
};

export function StatusIndicator({ status, text }: StatusIndicatorProps) {
  const { icon: Icon, colorClass } = statusConfig[status];

  return (
    <span className={`inline-flex items-center gap-[var(--g-space-2)] ${colorClass}`}>
      <Icon className="h-4 w-4" aria-hidden="true" />
      <span className="text-sm">{text}</span>
    </span>
  );
}
