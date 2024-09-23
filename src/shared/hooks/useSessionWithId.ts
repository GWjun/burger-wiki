import { useState, useEffect } from 'react';
import { getServerSession } from '#shared/lib/utils/getServerSession';
import { Session } from 'next-auth';

export function useSessionWithId() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    async function fetchSession() {
      const sessionData = await getServerSession();
      setSession(sessionData);
    }

    fetchSession();
  }, []);

  return session;
}
