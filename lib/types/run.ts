export interface Run {
  id: string;
  distance: number;
  duration: number;
  date: string;
  pace: number;
}

export interface CreateRunInput {
  distance: number;
  duration: number;
  date?: string;
}

export interface AthleteStats {
  totalRuns: number;
  totalDistance: number;
  totalDuration: number;
  averagePace: number;
  lastRun: Run | null;
}
