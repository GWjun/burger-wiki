import type { ComponentPropsWithRef, ForwardedRef, KeyboardEvent } from 'react';
import { forwardRef, useCallback } from 'react';
import * as styles from './styles.css';

interface MenuItemProps extends ComponentPropsWithRef<'li'> {
  onClick: () => void;
}

const MenuItem = (
  { children, onClick, ...attributes }: MenuItemProps,
  ref: ForwardedRef<HTMLLIElement>,
) => {
  const handleEnterKeyPress = useCallback(
    (event: KeyboardEvent<HTMLLIElement>) => {
      if (event.key === 'Enter') {
        onClick();
      }
    },
    [onClick],
  );

  return (
    <li
      ref={ref}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={handleEnterKeyPress}
      className={styles.item}
      {...attributes}
    >
      {children}
    </li>
  );
};

export default forwardRef(MenuItem);
