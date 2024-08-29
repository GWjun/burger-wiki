import { signOut } from '#shared/lib/utils/auth';

export default function SignOutButton() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <button type="submit">SignOut</button>
    </form>
  );
}
