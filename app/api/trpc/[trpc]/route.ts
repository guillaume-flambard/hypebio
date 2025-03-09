import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter, createTRPCContext } from '@/server/trpc';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';

const handler = async (req: Request) => {
  const session = await getServerSession(authOptions);
  
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: async () => createTRPCContext({
      headers: req.headers,
      session,
    }),
    onError:
      process.env.NODE_ENV === 'development'
        ? ({ path, error }) => {
            console.error(`❌ tRPC error on '${path}':`, error);
          }
        : undefined,
  });
};

export { handler as GET, handler as POST }; 