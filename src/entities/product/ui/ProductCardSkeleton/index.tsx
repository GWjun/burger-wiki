import Skeleton from '#shared/ui/Skeleton';
import clsx from 'clsx';
import * as styles from './styles.css';
import { container, imageContainer, hidden } from '../ProductCard/styles.css';

export function ProductCardSkeleton({ count }: { count: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div className={container} key={index}>
          <Skeleton className={imageContainer} />
          <div className={styles.contentContainer}>
            <Skeleton className={styles.content} />
            <Skeleton className={clsx(styles.content, hidden)} />
            <Skeleton className={clsx(styles.content, hidden)} />
          </div>
          <Skeleton className={styles.price} />
        </div>
      ))}
    </>
  );
}
