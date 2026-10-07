import type { Run } from "@/lib/types/run";
import { formatPace } from "@/lib/utils/pace";
import { formatDateLabel, formatDuration } from "@/lib/utils/time";

interface RunHistoryProps {
  runs: Run[];
}

export function RunHistory({ runs }: RunHistoryProps) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-semibold">Histórico de treinos</h2>
        <p className="mt-1 text-sm text-muted">
          Pace calculado automaticamente a cada registro.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="text-muted">
            <tr className="border-b border-border">
              <th className="pb-3 font-medium">Data</th>
              <th className="pb-3 font-medium">Distância</th>
              <th className="pb-3 font-medium">Tempo</th>
              <th className="pb-3 font-medium">Pace</th>
            </tr>
          </thead>
          <tbody>
            {runs.map((run) => (
              <tr key={run.id} className="border-b border-border last:border-0">
                <td className="py-3">{formatDateLabel(run.date)}</td>
                <td className="py-3">{run.distance.toFixed(1)} km</td>
                <td className="py-3 font-mono">{formatDuration(run.duration)}</td>
                <td className="py-3 font-medium text-accent">{formatPace(run.pace)} /km</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
