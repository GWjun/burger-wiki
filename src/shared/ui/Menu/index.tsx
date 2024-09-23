import { useEffect, useRef } from 'react';
import type { ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import * as styles from './styles.css';
import { createPortal } from 'react-dom';

export interface MenuProps extends ComponentPropsWithoutRef<'div'> {
  isOpen: boolean;
  onClose: () => void;
}

const Menu = ({
  isOpen,
  onClose,
  children,
  className,
  ...props
}: MenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const renderElement = document.getElementById('header-menu') ?? document.body;

  useEffect(() => {
    const handleBackdropClick = (event: globalThis.MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscClick = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('click', handleBackdropClick);
    window.addEventListener('keydown', handleEscClick);

    return () => {
      window.removeEventListener('click', handleBackdropClick);
      window.removeEventListener('keydown', handleEscClick);
    };
  }, [onClose]);

  return createPortal(
    <>
      {isOpen && (
        <div ref={menuRef} className={clsx(styles.menu, className)} {...props}>
          <ul>{children}</ul>
        </div>
      )}
    </>,
    renderElement,
  );
};

export default Menu;
