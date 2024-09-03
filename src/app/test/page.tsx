'use client';

import { useSession } from 'next-auth/react';
import { trpc } from '#shared/lib/utils/trpc';

export default function Test() {
  const session = useSession();
  const getUsersQuery = trpc.user.getUsers.useQuery();

  return (
    <div>
      <div>users</div>
      {getUsersQuery?.data?.length}
      {session.data?.user?.name}
      {session.data?.user?.email}
    </div>
  );
}
