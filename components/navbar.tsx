"use client";

import { useState } from "react";
import Link from "next/link";
import { Wallet, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/providers/wallet-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const { address, connect, disconnect } = useWallet();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getFirstCharacters = () => address?.slice(0, 10);

  return (
    <nav className="border-b bg-background">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Wallet className="h-6 w-6" />
            <span>DeFi Staking</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {address ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="hidden md:flex">
                  <Wallet className="mr-2 h-4 w-4" />
                  {getFirstCharacters()}...
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={disconnect}>
                  Disconnect
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              onClick={connect}
              disabled={!!address}
              className="hidden md:flex"
            >
              Connect Wallet
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="container md:hidden px-4 pb-4">
          <div className="flex flex-col space-y-4">
            <Link
              href="/"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/stake"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Stake
            </Link>
            <Link
              href="/rewards"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Rewards
            </Link>

            {address ? (
              <div className="flex flex-col gap-2">
                <div className="text-sm font-medium">
                  {getFirstCharacters()}...
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    disconnect();
                    setIsMenuOpen(false);
                  }}
                >
                  Disconnect
                </Button>
              </div>
            ) : (
              <Button
                size="sm"
                onClick={() => {
                  connect();
                  setIsMenuOpen(false);
                }}
                disabled={!!address}
              >
                Connect Wallet
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
