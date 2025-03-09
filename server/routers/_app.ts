import { router } from '@/lib/trpc';
import { bioRouter } from './bio';

export const appRouter = router({
  bio: bioRouter,
});

export type AppRouter = typeof appRouter; 