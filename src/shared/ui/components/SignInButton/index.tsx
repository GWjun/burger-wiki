import { signIn } from '#shared/lib/utils/auth';

export default function SignInButton() {
  return (
    <form
      action={async () => {
        'use server';
        await signIn('google');
      }}
    >
      <button type="submit">Signin with Google</button>
    </form>
  );
}
