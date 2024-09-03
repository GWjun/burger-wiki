import type { ComponentPropsWithoutRef } from 'react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import CloseButton from '#shared/ui/CloseButton';
import clsx from 'clsx';
import * as styles from './styles.css';

export interface ModalProps extends ComponentPropsWithoutRef<'dialog'> {
  isOpen: boolean;
  onClose: () => void;
  isBackdropClosable?: boolean;
}

const Modal = ({
  onClose,
  isOpen = false,
  isBackdropClosable = true,
  children,
  className,
  ...props
}: ModalProps) => {
  useEffect(() => {
    const handleEscKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isBackdropClosable) onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscKeyPress);
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleEscKeyPress);
    };
  }, [isBackdropClosable, isOpen, onClose]);

  return createPortal(
    <>
      {isOpen && (
        <>
          <div
            className={styles.backdrop}
            onClick={isBackdropClosable ? onClose : () => {}}
          />
          <dialog
            aria-modal={isOpen}
            className={clsx(styles.modal, className)}
            {...props}
          >
            <CloseButton onClick={onClose} />
            {children}
          </dialog>
        </>
      )}
    </>,
    document.body,
  );
};

export default Modal;
