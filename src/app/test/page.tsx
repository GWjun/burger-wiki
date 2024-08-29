'use client';

import { useSession } from 'next-auth/react';

export default function Test() {
  const session = useSession();

  return (
    <div>
      {session.data?.user?.name}
      {session.data?.user?.email}
    </div>
  );
}
