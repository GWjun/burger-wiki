'use client';

import Button from '#shared/ui/Button';
import { handleSignOut } from '../../model/handleSignOut';

export function LogoutButton() {
  return <Button onClick={() => handleSignOut()}>로그아웃</Button>;
}
