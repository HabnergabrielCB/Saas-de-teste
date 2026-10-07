import type { Run } from "@/lib/types/run";
import { calculatePace } from "@/lib/utils/pace";

interface SeedRun {
  id: string;
  distance: number;
  duration: number;
  date: string;
}

const SEED_INPUT: SeedRun[] = [
  { id: "run-001", distance: 4, duration: 1240, date: "2026-08-18T07:10:00.000Z" },
  { id: "run-002", distance: 2.4, duration: 756, date: "2026-08-22T07:05:00.000Z" },
  { id: "run-003", distance: 10, duration: 3310, date: "2026-08-26T06:40:00.000Z" },
  { id: "run-004", distance: 21, duration: 7110, date: "2026-08-30T06:15:00.000Z" },
  { id: "run-005", distance: 4, duration: 1230, date: "2026-09-03T07:00:00.000Z" },
  { id: "run-006", distance: 2.4, duration: 738, date: "2026-09-07T07:20:00.000Z" },
  { id: "run-007", distance: 10, duration: 3260, date: "2026-09-11T06:45:00.000Z" },
  { id: "run-008", distance: 4, duration: 1215, date: "2026-09-16T07:05:00.000Z" },
  { id: "run-009", distance: 21, duration: 6720, date: "2026-09-21T06:10:00.000Z" },
  { id: "run-010", distance: 2.4, duration: 720, date: "2026-09-25T07:15:00.000Z" },
  { id: "run-011", distance: 10, duration: 3160, date: "2026-09-28T06:50:00.000Z" },
  { id: "run-012", distance: 2.4, duration: 710, date: "2026-10-02T07:00:00.000Z" },
  {
    id: "run-013",
    distance: 4,
    duration: 19 * 60 + 32,
    date: "2026-10-04T07:12:00.000Z",
  },
];

export const SEED_RUNS: Run[] = SEED_INPUT.map((run) => ({
  ...run,
  pace: Number(calculatePace(run.distance, run.duration).toFixed(4)),
}));
