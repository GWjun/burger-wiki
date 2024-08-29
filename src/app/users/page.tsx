'use client';

import { trpc } from '#shared/lib/utils/trpc';

export default function Test() {
  const getUserQuery = trpc.user.getUsers.useQuery();

  if (getUserQuery.error) {
    console.error(getUserQuery.error);
    return null;
  }
  if (!getUserQuery.data) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <p>get by server</p>
      {getUserQuery.data.map((user) => (
        <div key={user.id}>{user.email}</div>
      ))}
    </div>
  );
}
