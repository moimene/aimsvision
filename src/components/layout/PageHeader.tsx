interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="px-[var(--g-space-6)] py-[var(--g-space-5)] border-b border-[hsl(var(--g-border-subtle))] bg-[hsl(var(--g-surface-card))]">
      <div className="flex items-center gap-[var(--g-space-3)]">
        {/* Garrigues accent bar */}
        <div className="w-1 h-10 rounded-full bg-gradient-to-b from-[hsl(var(--g-brand-primary))] to-[hsl(var(--g-brand-bright))]" />
        <div>
          <h1 className="text-xl font-bold text-[hsl(var(--g-text-primary))] tracking-tight">
            {title}
          </h1>
          <p className="mt-[var(--g-space-0\.5)] text-sm text-[hsl(var(--g-text-secondary))]">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}
