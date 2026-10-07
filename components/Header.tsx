import { Activity } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  return (
    <header className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent text-white">
          <Activity className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
            Micro-SaaS
          </p>
          <h1 className="text-xl font-semibold tracking-tight">RunAnalytics</h1>
        </div>
      </div>
      <ThemeToggle />
    </header>
  );
}
