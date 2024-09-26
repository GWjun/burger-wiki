'use client';

import { useSession } from 'next-auth/react';
import { useOverlay } from '@toss/use-overlay';

import { useSign } from '#features/auth';
import Avatar from '#shared/ui/Avatar';
import Menu from '#shared/ui/Menu';
import MenuItem from '#shared/ui/MenuItem';
import LoadingSpinner from '#shared/ui/LoadingSpinner';
import * as styles from './styles.css';

export function UserMenu() {
  const session = useSession();
  const overlay = useOverlay();
  const { status, signOut } = useSign();

  function openModal() {
    return overlay.open(({ isOpen, close }) => (
      <Menu
        renderId="header-menu"
        isOpen={isOpen}
        onClose={close}
        className={styles.menu}
      >
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
