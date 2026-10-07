import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  hint: string;
  icon: LucideIcon;
}

export function StatCard({ label, value, hint, icon: Icon }: StatCardProps) {
  return (
    <article className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted">{label}</p>
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-soft text-accent">
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <p className="text-2xl font-semibold tracking-tight">{value}</p>
      <p className="mt-1 text-sm text-muted">{hint}</p>
    </article>
  );
}
