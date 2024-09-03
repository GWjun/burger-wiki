// 'use server';
//
// import { signOut } from '#shared/lib/utils/auth';
//
// export async function handleSignOut() {
//   await signOut();
// }

'use client';

import { signOut } from 'next-auth/react';

export function handleSignOut() {
  return signOut();
}
