import { auth } from '#shared/lib/utils/auth';
import { LogoutButton } from '#features/auth';

export default async function Home() {
  const session = await auth();

  if (!session) return null;

  return (
    <div>
      {session.user?.name}
      <LogoutButton />
    </div>
  );
}
