"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type WalletContextType = {
  address: string | null
  balance: string
  isConnected: boolean
  isConnecting: boolean
  connect: () => Promise<void>
  disconnect: () => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

// Update the WalletProvider component to fix the TypeScript error

// Change the WalletProvider interface to explicitly define the props type
type WalletProviderProps = {
  children: React.ReactNode
}

// Update the WalletProvider component definition
export function WalletProvider({ children }: WalletProviderProps) {
  const [address, setAddress] = useState<string | null>(null)
  const [balance, setBalance] = useState<string>("0.0")
  const [isConnecting, setIsConnecting] = useState(false)

  // Check if wallet was previously connected
  useEffect(() => {
    const savedAddress = localStorage.getItem("walletAddress")
    if (savedAddress) {
      setAddress(savedAddress)
      // In a real app, you would verify the connection is still valid
      // and fetch the current balance
      setBalance("125.45")
    }
  }, [])

  const connect = async () => {
    setIsConnecting(true)
    try {
      // Simulate connection delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real app, you would use a wallet library like ethers.js
      // or web3.js to connect to the wallet
      const mockAddress = "0x" + Math.random().toString(16).slice(2, 12) + "..."
      setAddress(mockAddress)
      setBalance("125.45")
      localStorage.setItem("walletAddress", mockAddress)
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnect = () => {
    setAddress(null)
    setBalance("0.0")
    localStorage.removeItem("walletAddress")
  }

  return (
    <WalletContext.Provider
      value={{
        address,
        balance,
        isConnected: !!address,
        isConnecting,
        connect,
        disconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}

