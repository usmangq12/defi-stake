"use client";

import { useEffect, useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { WalletProvider } from "@/providers/wallet-provider";
import { StakingProvider } from "@/providers/staking-provider";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Avoid hydration mismatch by not rendering until mounted
    return <></>;
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <WalletProvider>
        <StakingProvider>{children}</StakingProvider>
      </WalletProvider>
    </ThemeProvider>
  );
}
