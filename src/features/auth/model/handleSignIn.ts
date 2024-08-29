'use server';

import { signIn } from '#shared/lib/utils/auth';

/** add more soon */
type Provider = 'google';

export async function handleSignIn(provider: Provider) {
  await signIn(provider);
}
