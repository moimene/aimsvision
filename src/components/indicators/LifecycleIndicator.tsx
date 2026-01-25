import { FileEdit, CheckCircle2, Rocket, Archive } from "lucide-react";

export type LifecycleState = "Draft" | "Approved" | "Production" | "Deprecated";

interface LifecycleIndicatorProps {
  state: LifecycleState;
}

const lifecycleConfig: Record<LifecycleState, { icon: typeof FileEdit; colorClass: string }> = {
  Draft: { 
    icon: FileEdit, 
    colorClass: "text-[hsl(var(--g-text-secondary))]" 
  },
  Approved: { 
    icon: CheckCircle2, 
    colorClass: "text-[hsl(var(--g-status-success))]" 
  },
  Production: { 
    icon: Rocket, 
    colorClass: "text-[hsl(var(--g-status-success))]" 
  },
  Deprecated: { 
    icon: Archive, 
    colorClass: "text-[hsl(var(--g-status-warning))]" 
  },
};

export function LifecycleIndicator({ state }: LifecycleIndicatorProps) {
  const { icon: Icon, colorClass } = lifecycleConfig[state];

  return (
    <span className={`inline-flex items-center gap-[var(--g-space-2)] ${colorClass}`}>
      <Icon className="h-4 w-4" aria-hidden="true" />
      <span className="text-sm">{state}</span>
    </span>
  );
}
