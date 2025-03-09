import { initTRPC, TRPCError } from '@trpc/server';
import { ZodError } from 'zod';
import { type Session } from 'next-auth';

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

export const router = t.router;
export const publicProcedure = t.procedure;

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

export const privateProcedure = t.procedure.use(enforceUserIsAuthed); 