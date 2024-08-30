'use client';

import { useSession } from 'next-auth/react';
import { useOverlay } from '@toss/use-overlay';

import { handleSignOut } from '#features/auth';
import Avatar from '#shared/ui/Avatar';
import Menu from '#shared/ui/Menu';
import MenuItem from '#shared/ui/MenuItem';

export function UserMenu() {
  const session = useSession();
  const overlay = useOverlay();

  async function handleClick() {
    await handleSignOut();
  }

  const openModal = () => {
    return overlay.open(({ isOpen, close }) => (
      <Menu isOpen={isOpen} onClose={close}>
        <MenuItem onClick={handleClick}>로그아웃</MenuItem>
      </Menu>
    ));
  };

  return (
    <Avatar onClick={openModal} src={session.data?.user?.image} size={30} />
  );
}
