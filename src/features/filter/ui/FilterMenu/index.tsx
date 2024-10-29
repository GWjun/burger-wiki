import { type ComponentPropsWithoutRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { useOverlay } from '@toss/use-overlay';
import clsx from 'clsx';

import Button from '#shared/ui/Button';
import Menu from '#shared/ui/Menu';
import MenuItem from '#shared/ui/MenuItem';
import * as styles from './styles.css';

interface FilterMenuButtonProps<T> extends ComponentPropsWithoutRef<'button'> {
  filter: T;
  setFilter: (value: T) => void;
  options: Record<string, string> | { label: string; value: T }[];
}

export function FilterMenuButton<T extends string | number>({
  filter,
  setFilter,
  options,
  className,
  ...props
}: FilterMenuButtonProps<T>) {
  const overlay = useOverlay();

  function openFilterModal() {
    return overlay.open(({ isOpen, close }) => {
      return (
        <Menu
          renderId="filter-menu"
          isOpen={isOpen}
          onClose={close}
          className={styles.menu}
        >
          {Array.isArray(options)
            ? options.map((option) => (
                <MenuItem
                  key={option.value}
                  onClick={() => {
                    setFilter(option.value);
                    close();
                  }}
                  className={styles.menuItem}
                >
                  {option.label}
                </MenuItem>
              ))
            : Object.entries(options).map(([key, label]) => (
                <MenuItem
                  key={key}
                  onClick={() => {
                    setFilter(key as T);
                    close();
                  }}
                  className={styles.menuItem}
                >
                  {label}
                </MenuItem>
              ))}
        </Menu>
      );
    });
  }

  const selectedLabel = Array.isArray(options)
    ? options.find((option) => option.value === filter)?.label
    : options[filter as keyof typeof options];

  return (
    <Button
      id="filter-menu"
      onClick={openFilterModal}
      variant="outline"
      className={clsx(styles.dropdownButton, className)}
      {...props}
    >
      {selectedLabel}
      <ChevronDown size={18} aria-label="열기" />
    </Button>
  );
}
