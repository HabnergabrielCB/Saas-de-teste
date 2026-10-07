"use client";

import type { Run } from "@/lib/types/run";
import { formatPace } from "@/lib/utils/pace";
import { formatChartDate } from "@/lib/utils/time";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface PaceChartProps {
  runs: Run[];
}

interface ChartPoint {
  dateLabel: string;
  pace: number;
  distance: number;
}

function ChartTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: ChartPoint }>;
}) {
  if (!active || !payload?.[0]) {
    return null;
  }

  const point = payload[0].payload;

  return (
    <div className="rounded-xl border border-border bg-card px-3 py-2 text-sm shadow-lg">
      <p className="font-medium">{point.dateLabel}</p>
      <p className="text-muted">{point.distance} km</p>
      <p className="mt-1 font-semibold text-accent">{formatPace(point.pace)} /km</p>
    </div>
  );
}

export function PaceChart({ runs }: PaceChartProps) {
  const data: ChartPoint[] = [...runs]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-12)
    .map((run) => ({
      dateLabel: formatChartDate(run.date),
      pace: run.pace,
      distance: run.distance,
    }));

  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Evolução do pace</h2>
        <p className="mt-1 text-sm text-muted">
          Minutos por quilômetro nos últimos treinos. Valores menores indicam ritmo mais rápido.
        </p>
      </div>

      <div className="h-72 w-full">
        {data.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-muted">
            Registre um treino para ver o gráfico.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="dateLabel"
                tick={{ fill: "var(--muted)", fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: "var(--border)" }}
              />
              <YAxis
                reversed
                domain={["dataMin - 0.2", "dataMax + 0.2"]}
                tickFormatter={(value: number) => formatPace(value)}
                tick={{ fill: "var(--muted)", fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: "var(--border)" }}
                width={48}
              />
              <Tooltip content={<ChartTooltip />} />
              <Line
                type="monotone"
                dataKey="pace"
                stroke="var(--accent)"
                strokeWidth={3}
                dot={{ r: 4, fill: "var(--accent)", strokeWidth: 0 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  );
}
