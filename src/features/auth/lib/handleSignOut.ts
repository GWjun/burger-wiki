'use server';

import { signOut } from '#shared/lib/utils/auth';

export async function handleSignOut() {
  await signOut();
}
