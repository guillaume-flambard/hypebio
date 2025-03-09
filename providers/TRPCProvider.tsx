'use client';

import React, { PropsWithChildren, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';

// Type simplifié pour l'AppRouter
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AppRouter = any;

// Création du client TRPC
export const trpc = createTRPCReact<AppRouter>();

// Fonction pour obtenir l'URL de base
function getBaseUrl() {
  if (typeof window !== 'undefined') {
    return '';
  }
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

// Provider TRPC pour l'application
export function TRPCProvider({ children }: PropsWithChildren) {
  // Création du QueryClient avec la config par défaut
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  }));
  
  // Création du client TRPC avec la config de lien
  const [trpcClient] = useState(() => 
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
    })
  );

  // Rendu du Provider 
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  );
} 