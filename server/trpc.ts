import { initTRPC } from '@trpc/server';
import { Context } from '#server/context';
import superjson from 'superjson';

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const middleware = t.middleware;
export const createCallerFactory = t.createCallerFactory;
export const mergeRouters = t.mergeRouters;

export const router = t.router;
export const baseProcedure = t.procedure;
