import Image from 'next/image';
import type { Product } from '@prisma/client';
import * as styles from './styles.css';
import clsx from 'clsx';

export function ProductCard({ product }: { product: Product }) {
  const { image_url, name, description, price, brand_name } = product;
  const localePrice = Number(price).toLocaleString();

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          src={image_url || ''}
          alt="버거 이미지"
          fill
          sizes="(max-width: 640px) 150px, 233.59px"
          className={styles.image}
          priority
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
