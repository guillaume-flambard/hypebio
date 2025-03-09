'use client';

import { SessionProvider } from "next-auth/react";
import { TRPCProvider } from "@/providers/trpc-provider";
import { Toaster } from "@/components/ui/sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <TRPCProvider>
        {children}
        <Toaster position="bottom-right" />
      </TRPCProvider>
    </SessionProvider>
  );
} 