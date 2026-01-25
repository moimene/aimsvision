interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="px-[var(--g-space-6)] py-[var(--g-space-5)] border-b border-[hsl(var(--g-border-subtle))]">
      <h1 className="text-xl font-semibold text-[hsl(var(--g-text-primary))] tracking-tight">
        {title}
      </h1>
      <p className="mt-[var(--g-space-1)] text-sm text-[hsl(var(--g-text-secondary))]">
        {subtitle}
      </p>
    </div>
  );
}
