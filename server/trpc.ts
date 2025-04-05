import { initTRPC } from '@trpc/server';
import { type Context } from '@server/context';
import superjson from 'superjson';

import { throwTRPCError } from '@error/throwTRPCError';

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const middleware = t.middleware;
export const createCallerFactory = t.createCallerFactory;
export const mergeRouters = t.mergeRouters;

export const router = t.router;
export const baseProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(
  async function isAuthed(opts) {
    const { ctx } = opts;
    const { session } = ctx;

    if (!session || !session.user || !session.user.id) {
      throwTRPCError({ code: 'UNAUTHORIZED' });
    }

    return opts.next({
      ctx: {
        user: session.user,
        userId: session.user.id,
      },
    });
  },
);

export const commonProcedure = t.procedure.use(async function isAuthed(opts) {
  const { ctx } = opts;
  const { session } = ctx;

  return opts.next({
    ctx: {
      user: session?.user,
    },
  });
});
