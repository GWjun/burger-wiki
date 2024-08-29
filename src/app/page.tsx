import SignInButton from '#shared/ui/components/SignInButton';
import SignOutButton from '#shared/ui/components/SignOutButton';
import { auth } from '#shared/lib/utils/auth';

export default async function Home() {
  const session = await auth();

  return (
    <div>
      {session?.user?.name}
      <SignInButton />
      <SignOutButton />
    </div>
  );
}
