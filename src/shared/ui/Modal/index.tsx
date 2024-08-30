import type { ComponentPropsWithoutRef } from 'react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
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
            <button
              onClick={onClose}
              className={styles.closeButton}
              aria-label="모달창 닫기 버튼"
            >
              <X size={15} aria-label="X" className={styles.icon} />
            </button>

            {children}
          </dialog>
        </>
      )}
    </>,
    document.body,
  );
};

export default Modal;
