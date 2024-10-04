import { Dispatch, SetStateAction, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useOverlay } from '@toss/use-overlay';

import { ReviewOrderEnum, type ReviewOrderType } from '#entities/review';
import Button from '#shared/ui/Button';
import Menu from '#shared/ui/Menu';
import MenuItem from '#shared/ui/MenuItem';
import Label from '#shared/ui/Label';
import * as styles from './styles.css';

interface FilterMenuProps {
  filter: ReviewOrderType;
  setFilter: Dispatch<SetStateAction<ReviewOrderType>>;
  withImage: boolean;
  setWithImage: Dispatch<SetStateAction<boolean>>;
}

export function FilterMenu({
  filter,
  setFilter,
  withImage,
  setWithImage,
}: FilterMenuProps) {
  const overlay = useOverlay();
  const [isOpen, setIsOpen] = useState(false);

  function openFilterModal() {
    return overlay.open(({ isOpen, close }) => {
      setIsOpen(isOpen);
      return (
        <Menu
          renderId="review-filter"
          isOpen={isOpen}
          onClose={close}
          className={styles.menu}
        >
          {(Object.keys(ReviewOrderEnum) as ReviewOrderType[]).map((key) => (
            <MenuItem
              key={key}
              onClick={() => {
                setFilter(key);
                close();
              }}
              className={styles.menuItem}
            >
              {ReviewOrderEnum[key]}
            </MenuItem>
          ))}
        </Menu>
      );
    });
  }
  return (
    <div className={styles.filter}>
      <Button
        id="review-filter"
        onClick={openFilterModal}
        variant="outline"
        className={styles.dropdownButton}
      >
        {ReviewOrderEnum[filter]}
        {isOpen ? (
          <ChevronUp size={18} aria-label="닫기" />
        ) : (
          <ChevronDown size={18} aria-label="열기" />
        )}
      </Button>
      <input
        id="withImage"
        type="checkbox"
        checked={withImage}
        onChange={(e) => setWithImage(e.target.checked)}
      />
      <Label id="withImage" className={styles.label}>
        포토리뷰
      </Label>
    </div>
  );
}
