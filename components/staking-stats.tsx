"use client"

import { useWallet } from "@/providers/wallet-provider"
import { useStaking } from "@/providers/staking-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Coins, Wallet, TrendingUp, Award } from "lucide-react"

export function StakingStats() {
  const { balance, isConnected } = useWallet()
  const { apr, stakedAmount, earnedRewards } = useStaking()

  const stats = [
    {
      title: "APR",
      value: isConnected ? `${apr}%` : "—",
      description: "Annual Percentage Rate",
      icon: TrendingUp,
      color: "text-green-500",
    },
    {
      title: "Wallet Balance",
      value: isConnected ? `${balance} TOKENS` : "—",
      description: "Available to stake",
      icon: Wallet,
      color: "text-blue-500",
    },
    {
      title: "Staked Amount",
      value: isConnected ? `${stakedAmount} TOKENS` : "—",
      description: "Currently staked",
      icon: Coins,
      color: "text-purple-500",
    },
    {
      title: "Earned Rewards",
      value: isConnected ? `${earnedRewards} TOKENS` : "—",
      description: "Available to claim",
      icon: Award,
      color: "text-yellow-500",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

