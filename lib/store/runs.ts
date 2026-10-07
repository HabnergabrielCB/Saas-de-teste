import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { SEED_RUNS } from "@/lib/data/seed";
import type { CreateRunInput, Run } from "@/lib/types/run";
import { calculatePace } from "@/lib/utils/pace";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "runs.json");

async function ensureStore(): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });

  try {
    await readFile(DATA_FILE, "utf8");
  } catch {
    await writeFile(DATA_FILE, JSON.stringify(SEED_RUNS, null, 2), "utf8");
  }
}

async function writeRuns(runs: Run[]): Promise<void> {
  await ensureStore();
  await writeFile(DATA_FILE, JSON.stringify(runs, null, 2), "utf8");
}

export async function getRuns(): Promise<Run[]> {
  await ensureStore();
  const raw = await readFile(DATA_FILE, "utf8");
  const runs = JSON.parse(raw) as Run[];

  return [...runs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export async function addRun(input: CreateRunInput): Promise<Run> {
  const distance = Number(input.distance);
  const duration = Number(input.duration);

  if (!Number.isFinite(distance) || distance <= 0 || distance > 200) {
    throw new Error("Informe uma distância válida em km.");
  }

  if (!Number.isFinite(duration) || duration <= 0 || duration > 36 * 3600) {
    throw new Error("Informe um tempo total válido.");
  }

  const date = input.date ? new Date(input.date) : new Date();
  if (Number.isNaN(date.getTime())) {
    throw new Error("Informe uma data válida.");
  }

  const run: Run = {
    id: crypto.randomUUID(),
    distance: Number(distance.toFixed(2)),
    duration: Math.round(duration),
    date: date.toISOString(),
    pace: Number(calculatePace(distance, duration).toFixed(4)),
  };

  const runs = await getRuns();
  runs.unshift(run);
  await writeRuns(runs);

  return run;
}
