'use server';

import { signIn } from '#shared/lib/utils/auth';
import { AuthProvider } from '../model/AuthProvider';

export async function handleSignIn(provider: AuthProvider) {
  await signIn(provider);
}
