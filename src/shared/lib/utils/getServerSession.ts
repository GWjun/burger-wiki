'use server';

import { auth } from '#shared/lib/utils/auth';

export async function getServerSession() {
  return auth();
}
