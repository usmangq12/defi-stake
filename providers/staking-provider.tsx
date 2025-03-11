"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useWallet } from "./wallet-provider"

type StakingContextType = {
  apr: number
  stakedAmount: string
  earnedRewards: string
  isStaking: boolean
  isUnstaking: boolean
  isClaiming: boolean
  stake: (amount: string) => Promise<void>
  unstake: (amount: string) => Promise<void>
  claimRewards: () => Promise<void>
}

const StakingContext = createContext<StakingContextType | undefined>(undefined)

// Define the props type explicitly
type StakingProviderProps = {
  children: React.ReactNode
}

// Update the StakingProvider component definition
export function StakingProvider({ children }: StakingProviderProps) {
  const { isConnected } = useWallet()
  const [apr, setApr] = useState(12.5)
  const [stakedAmount, setStakedAmount] = useState("0.0")
  const [earnedRewards, setEarnedRewards] = useState("0.0")
  const [isStaking, setIsStaking] = useState(false)
  const [isUnstaking, setIsUnstaking] = useState(false)
  const [isClaiming, setIsClaiming] = useState(false)

  // Load staking data when wallet is connected
  useEffect(() => {
    if (isConnected) {
      // In a real app, you would fetch this data from the blockchain
      setStakedAmount("45.75")
      setEarnedRewards("2.34")
    } else {
      setStakedAmount("0.0")
      setEarnedRewards("0.0")
    }
  }, [isConnected])

  // Simulate rewards accrual
  useEffect(() => {
    if (!isConnected || Number.parseFloat(stakedAmount) <= 0) return

    const interval = setInterval(() => {
      setEarnedRewards((prev) => {
        const current = Number.parseFloat(prev)
        const newAmount = current + (Number.parseFloat(stakedAmount) * apr) / 100 / 365 / 24
        return newAmount.toFixed(4)
      })
    }, 10000) // Update every 10 seconds for demo purposes

    return () => clearInterval(interval)
  }, [isConnected, stakedAmount, apr])

  const stake = async (amount: string) => {
    if (!amount || Number.parseFloat(amount) <= 0) return

    setIsStaking(true)
    try {
      // Simulate staking delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real app, you would call a smart contract method
      setStakedAmount((prev) => {
        const newAmount = Number.parseFloat(prev) + Number.parseFloat(amount)
        return newAmount.toFixed(2)
      })
    } catch (error) {
      console.error("Failed to stake:", error)
    } finally {
      setIsStaking(false)
    }
  }

  const unstake = async (amount: string) => {
    if (!amount || Number.parseFloat(amount) <= 0 || Number.parseFloat(amount) > Number.parseFloat(stakedAmount)) return

    setIsUnstaking(true)
    try {
      // Simulate unstaking delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real app, you would call a smart contract method
      setStakedAmount((prev) => {
        const newAmount = Number.parseFloat(prev) - Number.parseFloat(amount)
        return newAmount.toFixed(2)
      })
    } catch (error) {
      console.error("Failed to unstake:", error)
    } finally {
      setIsUnstaking(false)
    }
  }

  const claimRewards = async () => {
    if (Number.parseFloat(earnedRewards) <= 0) return

    setIsClaiming(true)
    try {
      // Simulate claiming delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real app, you would call a smart contract method
      setEarnedRewards("0.0")
    } catch (error) {
      console.error("Failed to claim rewards:", error)
    } finally {
      setIsClaiming(false)
    }
  }

  return (
    <StakingContext.Provider
      value={{
        apr,
        stakedAmount,
        earnedRewards,
        isStaking,
        isUnstaking,
        isClaiming,
        stake,
        unstake,
        claimRewards,
      }}
    >
      {children}
    </StakingContext.Provider>
  )
}

export function useStaking() {
  const context = useContext(StakingContext)
  if (context === undefined) {
    throw new Error("useStaking must be used within a StakingProvider")
  }
  return context
}

