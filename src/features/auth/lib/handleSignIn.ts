'use server';

import { signIn } from '#shared/lib/utils/auth';
import { AuthProvider } from '../model/AuthProvider';

export async function handleSignIn(provider: AuthProvider) {
  await signIn(provider);
}

// 'use client';
//
// import { AuthProvider } from '../model/AuthProvider';
// import { signIn } from 'next-auth/react';
//
// export function handleSignIn(provider: AuthProvider) {
//   return signIn(provider);
// }
