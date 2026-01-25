import { ShieldAlert, ShieldCheck, Shield } from "lucide-react";

export type RiskLevel = "High" | "Medium" | "Low";

interface RiskLevelIndicatorProps {
  level: RiskLevel;
}

const riskLevelConfig: Record<RiskLevel, { icon: typeof ShieldAlert; colorClass: string }> = {
  High: { 
    icon: ShieldAlert, 
    colorClass: "text-[hsl(var(--g-status-critical))]" 
  },
  Medium: { 
    icon: Shield, 
    colorClass: "text-[hsl(var(--g-status-warning))]" 
  },
  Low: { 
    icon: ShieldCheck, 
    colorClass: "text-[hsl(var(--g-status-success))]" 
  },
};

export function RiskLevelIndicator({ level }: RiskLevelIndicatorProps) {
  const { icon: Icon, colorClass } = riskLevelConfig[level];

  return (
    <span className={`inline-flex items-center gap-[var(--g-space-2)] ${colorClass}`}>
      <Icon className="h-4 w-4" aria-hidden="true" />
      <span className="text-sm">{level}</span>
    </span>
  );
}
