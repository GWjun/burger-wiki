import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useCallback } from 'react';

export function useAuthRedirect() {
  const session = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const isRedirect = session.status === 'unauthenticated';

  const redirectToLogin = useCallback(
    (path?: string) => {
      router.push(`/login?callbackUrl=${path ?? pathname}`);
    },
    [pathname, router],
  );

  return { isRedirect, redirectToLogin };
}
