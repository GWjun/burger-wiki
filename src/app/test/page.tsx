'use client';

import { useSession } from 'next-auth/react';
import { useOverlay } from '@toss/use-overlay';
import { useToast } from '#shared/hooks/useToast';
import { trpc } from '#shared/lib/utils/trpc';
import Modal from '#shared/ui/Modal';

export default function Test() {
  const session = useSession();
  const overlay = useOverlay();
  const getUsersQuery = trpc.user.getUsers.useQuery();

  const { toasts, addToast, removeToast } = useToast();

  function openModal() {
    return overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen} onClose={close}>
        모달
      </Modal>
    ));
  }

  return (
    <div>
      <div>users</div>
      {getUsersQuery?.data?.length}
      {session.data?.user?.name}
      {session.data?.user?.email}
      <button
        onClick={() =>
          addToast({
            message: '안녕하세요',
            variant: 'error',
          })
        }
      >
        addToast
      </button>
      <button onClick={() => removeToast(toasts[0].id)}>removeToast</button>

      <button onClick={openModal}>openModal</button>
    </div>
  );
}
