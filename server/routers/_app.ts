import { router } from '@/lib/trpc';
import { bioRouter } from './bio';
import { userRouter } from './user';

export const appRouter = router({
  bio: bioRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter; 