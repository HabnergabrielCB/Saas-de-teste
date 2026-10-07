import { Flag } from "lucide-react";
import { STANDARD_RACES } from "@/lib/races";
import type { Run } from "@/lib/types/run";
import { computeAthleteStats, estimateRaceTimeSeconds, formatPace } from "@/lib/utils/pace";
import { formatDuration } from "@/lib/utils/time";

interface RacePredictionsProps {
  runs: Run[];
}

export function RacePredictions({ runs }: RacePredictionsProps) {
  const { averagePace } = computeAthleteStats(runs);

  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Previsão de tempo</h2>
          <p className="mt-1 text-sm text-muted">
            Estimativa para provas padrão com base no pace médio atual.
          </p>
        </div>
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-soft text-accent">
          <Flag className="h-4 w-4" />
        </span>
      </div>

      <p className="mb-4 rounded-xl bg-accent-soft px-3 py-2 text-sm text-accent">
        Pace médio usado: {formatPace(averagePace)} /km
      </p>

      <ul className="grid gap-3">
        {STANDARD_RACES.map((race) => (
          <li
            key={race.id}
            className="flex items-center justify-between rounded-xl border border-border px-4 py-3"
          >
            <div>
              <p className="font-medium">{race.name}</p>
              <p className="text-sm text-muted">{race.distanceKm} km</p>
            </div>
            <p className="font-mono text-lg font-semibold">
              {averagePace > 0
                ? formatDuration(estimateRaceTimeSeconds(averagePace, race.distanceKm))
                : "--:--"}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
