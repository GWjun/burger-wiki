import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect } from 'react';
import type { Product } from '@prisma/client';
import clsx from 'clsx';
import * as styles from './styles.css';

export function ProductCard({ product }: { product: Product }) {
  const router = useRouter();

  const { product_id, image_url, name, description, price, brand_name } =
    product;
  const localePrice = Number(price).toLocaleString();

  useEffect(() => {
    router.prefetch(`burger/${product_id}`);
  }, [product_id, router]);

  return (
    <div
      onClick={() => router.push(`burger/${product_id}`)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          router.push(`burger/${product_id}`);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`${name}버거`}
      className={styles.container}
    >
      <div className={styles.imageContainer}>
        <Image
          src={image_url || ''}
          alt="버거 이미지"
          fill
          sizes="(max-width: 768px) 150px, 233.59px"
          className={styles.image}
          priority
        />
      </div>

      <div className={styles.titleContainer}>
        <span className={styles.productName}>{name}</span>
        <span className={clsx(styles.brandName, styles.hidden)}>
          {brand_name}
        </span>
      </div>
      <p className={clsx(styles.description, styles.hidden)}>{description}</p>
      <p className={styles.price}>{localePrice} 원</p>
    </div>
  );
}
