import { Navbar } from "@/components/navbar";
import { StakingStats } from "@/components/staking-stats";
import { StakingForm } from "@/components/staking-form";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Staking Dashboard</h1>

        <div className="space-y-8">
          <StakingStats />

          <div className="grid gap-8 md:grid-cols-2">
            <StakingForm />

            <div className="space-y-4">
              <div className="rounded-lg border bg-card p-6">
                <h3 className="text-lg font-semibold mb-4">About Staking</h3>
                <div className="space-y-4 text-sm">
                  <p>
                    Staking is the process of actively participating in
                    transaction validation on a proof-of-stake blockchain.
                  </p>
                  <p>
                    When you stake your tokens, you help secure the network and
                    earn rewards in return.
                  </p>
                  <p>
                    The current Annual Percentage Rate (APR) is 12.5%, which
                    means you can earn approximately 12.5% of your staked amount
                    over a year.
                  </p>
                  <p>
                    You can unstake your tokens at any time, but rewards are
                    calculated based on the duration and amount of your stake.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
