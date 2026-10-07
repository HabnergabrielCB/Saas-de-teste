import { Dashboard } from "@/components/Dashboard";
import { getRuns } from "@/lib/store/runs";

export const dynamic = "force-dynamic";

export default async function Home() {
  const runs = await getRuns();

  return <Dashboard runs={runs} />;
}
