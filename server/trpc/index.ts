import { initTRPC, TRPCError } from '@trpc/server';
import { ZodError } from 'zod';
import { type Session } from 'next-auth';
import { bioRouter } from './routers/bio';
import { publicProcedure, privateProcedure, router } from '../trpc';

type Context = {
  session: Session | null;
};

const createInnerTRPCContext = (opts: { session: Session | null }) => {
  return {
    session: opts.session,
  };
};

export const createTRPCContext = async (opts: { 
  headers: Headers; 
  session: Session | null;
}) => {
  return createInnerTRPCContext({
    session: opts.session,
  });
};

const t = initTRPC.context<Context>().create({
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

const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

export const appRouter = router({
  bio: bioRouter,
});

export type AppRouter = typeof appRouter;

export { publicProcedure, privateProcedure, router }; 