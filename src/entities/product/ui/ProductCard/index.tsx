'use client';

import Image from 'next/image';
import type { Product } from '@prisma/client';
import Skeleton from '#shared/ui/Skeleton';
import * as styles from './styles.css';
import clsx from 'clsx';

export function ProductCard({ product }: { product: Product | null }) {
  if (!product) return <ProductCardSkeleton />;

  const { image_url, name, description, price, brand_name } = product;
  const localePrice = Number(price).toLocaleString();

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          src={image_url || ''}
          alt="버거 이미지"
          fill
          sizes="(max-width: 640px) 233.59px, 150px"
          style={{ objectFit: 'contain' }}
        />
      </div>

      <div className={styles.titleContainer}>
        <span className={styles.productName}>{name}</span>
        <span className={styles.brandName}>{brand_name}</span>
      </div>
      <p className={clsx(styles.description, styles.hidden)}>{description}</p>
      <p className={styles.price}>{localePrice} 원</p>
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className={styles.container}>
      <Skeleton className={styles.imageContainer} />
      <div className={styles.contentSkeletonContainer}>
        <Skeleton className={styles.contentSkeleton} />
        <Skeleton className={clsx(styles.contentSkeleton, styles.hidden)} />
        <Skeleton className={clsx(styles.contentSkeleton, styles.hidden)} />
      </div>
      <Skeleton className={styles.priceSkeleton} />
    </div>
  );
}
