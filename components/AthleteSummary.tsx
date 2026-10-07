import { Gauge, Route, Timer, Trophy } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import type { Run } from "@/lib/types/run";
import { computeAthleteStats, formatPace } from "@/lib/utils/pace";
import { formatDateLabel, formatDuration } from "@/lib/utils/time";

interface AthleteSummaryProps {
  runs: Run[];
}

export function AthleteSummary({ runs }: AthleteSummaryProps) {
  const stats = computeAthleteStats(runs);

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        label="Volume total"
        value={`${stats.totalDistance.toFixed(1)} km`}
        hint={`${stats.totalRuns} treinos registrados`}
        icon={Route}
      />
      <StatCard
        label="Pace médio"
        value={`${formatPace(stats.averagePace)} /km`}
        hint="Baseado no tempo total ÷ distância"
        icon={Gauge}
      />
      <StatCard
        label="Tempo acumulado"
        value={formatDuration(stats.totalDuration)}
        hint="Soma de todos os treinos"
        icon={Timer}
      />
      <StatCard
        label="Último treino"
        value={stats.lastRun ? `${stats.lastRun.distance} km` : "—"}
        hint={
          stats.lastRun
            ? `${formatDuration(stats.lastRun.duration)} · ${formatDateLabel(stats.lastRun.date)}`
            : "Nenhum treino ainda"
        }
        icon={Trophy}
      />
    </section>
  );
}
