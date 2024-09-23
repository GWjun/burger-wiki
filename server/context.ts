import { auth } from '#shared/lib/utils/auth';

export const createContext = async () => {
  const session = await auth();
  const ctx = {
    session,
  };

  return ctx;
};

export type Context = typeof createContext;
