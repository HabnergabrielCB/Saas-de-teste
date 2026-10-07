"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { durationFromParts, todayIsoDate } from "@/lib/utils/time";

export function RunForm() {
  const router = useRouter();
  const [distance, setDistance] = useState("4");
  const [hours, setHours] = useState("0");
  const [minutes, setMinutes] = useState("19");
  const [seconds, setSeconds] = useState("32");
  const [date, setDate] = useState(todayIsoDate());
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const duration = durationFromParts(
        Number(hours),
        Number(minutes),
        Number(seconds),
      );

      const response = await fetch("/api/runs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          distance: Number(distance),
          duration,
          date: new Date(`${date}T07:00:00`).toISOString(),
        }),
      });

      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(payload.error ?? "Falha ao registrar o treino.");
      }

      setHours("0");
      setMinutes("");
      setSeconds("");
      router.refresh();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Falha ao registrar o treino.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-semibold">Registrar treino</h2>
        <p className="mt-1 text-sm text-muted">
          Informe a distância em km e o tempo total da sessão.
        </p>
      </div>

      <form className="grid gap-4" onSubmit={handleSubmit}>
        <label className="grid gap-2 text-sm">
          Distância (km)
          <input
            required
            min={0.1}
            step={0.1}
            type="number"
            value={distance}
            onChange={(event) => setDistance(event.target.value)}
            className="h-11 rounded-xl border border-border bg-background px-3 outline-none ring-accent focus:ring-2"
          />
        </label>

        <div className="grid grid-cols-3 gap-3">
          <label className="grid gap-2 text-sm">
            Horas
            <input
              min={0}
              max={12}
              type="number"
              value={hours}
              onChange={(event) => setHours(event.target.value)}
              className="h-11 rounded-xl border border-border bg-background px-3 outline-none ring-accent focus:ring-2"
            />
          </label>
          <label className="grid gap-2 text-sm">
            Minutos
            <input
              required
              min={0}
              max={59}
              type="number"
              value={minutes}
              onChange={(event) => setMinutes(event.target.value)}
              className="h-11 rounded-xl border border-border bg-background px-3 outline-none ring-accent focus:ring-2"
            />
          </label>
          <label className="grid gap-2 text-sm">
            Segundos
            <input
              required
              min={0}
              max={59}
              type="number"
              value={seconds}
              onChange={(event) => setSeconds(event.target.value)}
              className="h-11 rounded-xl border border-border bg-background px-3 outline-none ring-accent focus:ring-2"
            />
          </label>
        </div>

        <label className="grid gap-2 text-sm">
          Data
          <input
            required
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className="h-11 rounded-xl border border-border bg-background px-3 outline-none ring-accent focus:ring-2"
          />
        </label>

        {error ? (
          <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-accent px-4 font-medium text-white transition hover:opacity-90 disabled:opacity-60"
        >
          <Plus className="h-4 w-4" />
          {isSubmitting ? "Salvando..." : "Adicionar corrida"}
        </button>
      </form>
    </section>
  );
}
