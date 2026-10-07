import { AthleteSummary } from "@/components/AthleteSummary";
import { Header } from "@/components/Header";
import { PaceChart } from "@/components/PaceChart";
import { RacePredictions } from "@/components/RacePredictions";
import { RunForm } from "@/components/RunForm";
import { RunHistory } from "@/components/RunHistory";
import type { Run } from "@/lib/types/run";

interface DashboardProps {
  runs: Run[];
}

export function Dashboard({ runs }: DashboardProps) {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <Header />
      <AthleteSummary runs={runs} />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <RunForm />
        <RacePredictions runs={runs} />
      </div>
      <PaceChart runs={runs} />
      <RunHistory runs={runs} />
    </div>
  );
}
