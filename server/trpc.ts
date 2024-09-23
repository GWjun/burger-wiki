import { initTRPC } from '@trpc/server';
import { Context } from '#server/context';
import superjson from 'superjson';
import { getErrorCode } from '#error/error';

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
      throw new Error(getErrorCode('UNAUTHORIZED'));
    }

    return opts.next({
      ctx: {
        user: session.user,
        userId: session.user.id,
      },
    });
  },
);
