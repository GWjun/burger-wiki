import { auth } from '#shared/lib/utils/auth';

export default async function Home() {
  const session = await auth();

  if (!session) return null;

  return <div>{session.user?.name}</div>;
}
