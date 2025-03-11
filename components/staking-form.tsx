"use client"

import type React from "react"

import { useState } from "react"
import { useWallet } from "@/providers/wallet-provider"
import { useStaking } from "@/providers/staking-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Award } from "lucide-react"

export function StakingForm() {
  const { balance, isConnected } = useWallet()
  const { stakedAmount, earnedRewards, isStaking, isUnstaking, isClaiming, stake, unstake, claimRewards } = useStaking()
  const [stakeAmount, setStakeAmount] = useState("")
  const [unstakeAmount, setUnstakeAmount] = useState("")

  const handleStake = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isConnected || !stakeAmount) return
    await stake(stakeAmount)
    setStakeAmount("")
  }

  const handleUnstake = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isConnected || !unstakeAmount) return
    await unstake(unstakeAmount)
    setUnstakeAmount("")
  }

  const handleClaim = async () => {
    if (!isConnected || Number.parseFloat(earnedRewards) <= 0) return
    await claimRewards()
  }

  const setMaxStake = () => {
    setStakeAmount(balance)
  }

  const setMaxUnstake = () => {
    setUnstakeAmount(stakedAmount)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Manage Your Stake</CardTitle>
        <CardDescription>Stake, unstake, or claim your rewards</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="stake" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="stake">Stake</TabsTrigger>
            <TabsTrigger value="unstake">Unstake</TabsTrigger>
          </TabsList>
          <TabsContent value="stake">
            <form onSubmit={handleStake} className="space-y-4 pt-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="stake-amount" className="text-sm font-medium">
                    Amount to Stake
                  </label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={setMaxStake}
                    disabled={!isConnected}
                    className="h-auto text-xs px-2 py-1"
                  >
                    MAX
                  </Button>
                </div>
                <div className="flex space-x-2">
                  <Input
                    id="stake-amount"
                    type="number"
                    placeholder="0.0"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    disabled={!isConnected || isStaking}
                    min="0"
                    step="0.01"
                  />
                  <Button
                    type="submit"
                    disabled={
                      !isConnected ||
                      isStaking ||
                      !stakeAmount ||
                      Number.parseFloat(stakeAmount) <= 0 ||
                      Number.parseFloat(stakeAmount) > Number.parseFloat(balance)
                    }
                    className="min-w-[100px]"
                  >
                    {isStaking ? "Staking..." : "Stake"}
                  </Button>
                </div>
                {isConnected && <p className="text-xs text-muted-foreground">Available: {balance} TOKENS</p>}
              </div>
            </form>
          </TabsContent>
          <TabsContent value="unstake">
            <form onSubmit={handleUnstake} className="space-y-4 pt-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="unstake-amount" className="text-sm font-medium">
                    Amount to Unstake
                  </label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={setMaxUnstake}
                    disabled={!isConnected}
                    className="h-auto text-xs px-2 py-1"
                  >
                    MAX
                  </Button>
                </div>
                <div className="flex space-x-2">
                  <Input
                    id="unstake-amount"
                    type="number"
                    placeholder="0.0"
                    value={unstakeAmount}
                    onChange={(e) => setUnstakeAmount(e.target.value)}
                    disabled={!isConnected || isUnstaking}
                    min="0"
                    step="0.01"
                  />
                  <Button
                    type="submit"
                    disabled={
                      !isConnected ||
                      isUnstaking ||
                      !unstakeAmount ||
                      Number.parseFloat(unstakeAmount) <= 0 ||
                      Number.parseFloat(unstakeAmount) > Number.parseFloat(stakedAmount)
                    }
                    className="min-w-[100px]"
                  >
                    {isUnstaking ? "Unstaking..." : "Unstake"}
                  </Button>
                </div>
                {isConnected && <p className="text-xs text-muted-foreground">Staked: {stakedAmount} TOKENS</p>}
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex flex-col items-start space-y-4">
        <div className="w-full">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Award className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium">Rewards</span>
            </div>
            <span className="text-sm font-medium">{earnedRewards} TOKENS</span>
          </div>
          <Button
            onClick={handleClaim}
            disabled={!isConnected || isClaiming || Number.parseFloat(earnedRewards) <= 0}
            variant="outline"
            className="w-full"
          >
            {isClaiming ? "Claiming..." : "Claim Rewards"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

