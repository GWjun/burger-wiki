import Skeleton from '#shared/ui/Skeleton';

import * as styles from './styles.css';

export function BrandCardSkeleton({ count }: { count: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div className={styles.container} key={index}>
          <Skeleton className={styles.imageContainer} />
        </div>
      ))}
    </>
  );
}
