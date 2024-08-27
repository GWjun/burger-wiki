'use client';

import { trpc } from '#utils/trpc';

export default function Home() {
  const usesQuery = trpc.test.getUsers.useQuery();
  const createUserMutation = trpc.test.createUser.useMutation();

  if (!usesQuery.data) return <div>Loading...</div>;

  return (
    <div>
      <h1>User: {usesQuery.data.length}</h1>
      <button
        onClick={() => {
          createUserMutation.mutate({
            name: 'New User',
            email: 'newuser@example.com',
          });
        }}
      >
        Create User
      </button>
    </div>
  );
}
