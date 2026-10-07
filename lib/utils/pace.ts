import type { AthleteStats, Run } from "@/lib/types/run";

export function calculatePace(distanceKm: number, durationSeconds: number): number {
  if (distanceKm <= 0) {
    throw new Error("A distância precisa ser maior que zero.");
  }

  if (durationSeconds <= 0) {
    throw new Error("A duração precisa ser maior que zero.");
  }

  return durationSeconds / 60 / distanceKm;
}

export function formatPace(paceMinPerKm: number): string {
  if (!Number.isFinite(paceMinPerKm) || paceMinPerKm <= 0) {
    return "--:--";
  }

  const totalSeconds = Math.round(paceMinPerKm * 60);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function computeAthleteStats(runs: Run[]): AthleteStats {
  if (runs.length === 0) {
    return {
      totalRuns: 0,
      totalDistance: 0,
      totalDuration: 0,
      averagePace: 0,
      lastRun: null,
    };
  }

  const totalDistance = runs.reduce((sum, run) => sum + run.distance, 0);
  const totalDuration = runs.reduce((sum, run) => sum + run.duration, 0);
  const sorted = [...runs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return {
    totalRuns: runs.length,
    totalDistance,
    totalDuration,
    averagePace: calculatePace(totalDistance, totalDuration),
    lastRun: sorted[0] ?? null,
  };
}

export function estimateRaceTimeSeconds(
  averagePaceMinPerKm: number,
  distanceKm: number,
): number {
  return Math.round(averagePaceMinPerKm * 60 * distanceKm);
}
