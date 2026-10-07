import { addRun, getRuns } from "@/lib/store/runs";
import type { CreateRunInput } from "@/lib/types/run";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const runs = await getRuns();
  return NextResponse.json(runs);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<CreateRunInput>;
    const run = await addRun({
      distance: Number(body.distance),
      duration: Number(body.duration),
      date: body.date,
    });

    return NextResponse.json(run, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Não foi possível salvar a corrida.";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
