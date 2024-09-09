'use client';

import { useSession } from 'next-auth/react';
import { useOverlay } from '@toss/use-overlay';

import { useSign } from '#features/auth';
import Avatar from '#shared/ui/Avatar';
import Menu from '#shared/ui/Menu';
import MenuItem from '#shared/ui/MenuItem';
import LoadingSpinner from '#shared/ui/LoadingSpinner';

export function UserMenu() {
  const session = useSession();
  const overlay = useOverlay();
  const { status, signOut } = useSign();

  function openModal() {
    return overlay.open(({ isOpen, close }) => (
      <Menu isOpen={isOpen} onClose={close}>
        <MenuItem onClick={signOut}>
          {status === 'loading' ? (
            <LoadingSpinner variant="inset" />
          ) : (
            '로그아웃'
          )}
        </MenuItem>
      </Menu>
    ));
  }

  return (
    <Avatar onClick={openModal} src={session.data?.user?.image} size={30} />
  );
}
