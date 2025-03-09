import { initTRPC } from '@trpc/server';
import { ZodError } from 'zod';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';

// Create context based on request
export const createTRPCContext = async () => {
  const session = await getServerSession(authOptions);
  return {
    session,
  };
};

// Create tRPC instance
const t = initTRPC.context<typeof createTRPCContext>().create({
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

// Export procedures
export const router = t.router;
export const publicProcedure = t.procedure;
export const middleware = t.middleware;

// Create protected procedure middleware
const isAuthed = middleware(async ({ next, ctx }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new Error('Not authenticated');
  }
  
  return next({
    ctx: {
      session: ctx.session,
      user: ctx.session.user,
    },
  });
});

export const protectedProcedure = t.procedure.use(isAuthed); 