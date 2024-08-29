import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { auth } from '#shared/lib/utils/auth';

export default async function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  return <SessionProvider session={session}>{children}</SessionProvider>;
}
