"use client";

import type React from "react";

// Extend the Window interface to include the ethereum property
declare global {
  interface Window {
    ethereum: any;
  }
}

import { createContext, useContext, useState, useEffect } from "react";
import { ethers, formatEther } from "ethers";

type WalletContextType = {
  address: string | null;
  balance: string;
  isConnected: boolean;
  isConnecting: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

// Change the WalletProvider interface to explicitly define the props type
type WalletProviderProps = {
  children: React.ReactNode;
};

const alchemyAPIKey = process.env.NEXT_PUBLIC_API_KEY;
const sepoliaRpcUrl = process.env.NEXT_PUBLIC_ETH_TESTNET_URL;

// Used API_Key from Alchemy to create an ethereum provider
const provider = new ethers.JsonRpcProvider(sepoliaRpcUrl);

// Update the WalletProvider component definition
export function WalletProvider({ children }: WalletProviderProps) {
  const [balance, setBalance] = useState<string>("0.0");
  const [isConnecting, setIsConnecting] = useState(false);
  const [address, setAddress] = useState<string | null>(null);

  // Check if wallet was previously connected
  useEffect(() => {
    const savedAddress = localStorage.getItem("walletAddress");
    if (savedAddress) {
      setAddress(savedAddress);
      // In a real app, you would verify the connection is still valid
      // and fetch the current balance
      fetchBalance(savedAddress);
    }
  }, []);

  const fetchBalance = async (userAddress: string) => {
    await provider.getBalance(userAddress).then((balance) => {
      setBalance(formatEther(balance));
      console.log("actual balance**** ", formatEther(balance));
    });
  };

  console.log("user balance** ", balance);

  const connect = async () => {
    if (window.ethereum) {
      try {
        const accountAddresses = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAddress(accountAddresses[0]);
        localStorage.setItem("walletAddress", accountAddresses[0]);
      } catch (error) {
        console.error("Failed to connect wallet:", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  const disconnect = () => {
    setAddress(null);
    setBalance("0.0");
    localStorage.removeItem("walletAddress");
  };

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
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}
