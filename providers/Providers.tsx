'use client';

import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import { TRPCProvider } from "./TRPCProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider>
        <TRPCProvider>
          <Toaster position="top-right" richColors closeButton />
          {children}
        </TRPCProvider>
      </SessionProvider>
    </ThemeProvider>
  );
} 