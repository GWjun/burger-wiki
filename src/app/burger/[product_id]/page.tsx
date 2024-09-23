import Image from 'next/image';
import { Suspense } from 'react';
import { createAsyncCaller } from '#server/routers';

import { ProductReview } from '#widgets/review';
import { ProductLikes } from '#widgets/product';
import LoadingSpinner from '#shared/ui/LoadingSpinner';
import * as styles from './styles.css';

export default async function Burger({
  params: { product_id },
}: {
  params: { product_id: string };
}) {
  const trpc = await createAsyncCaller();
  const product = await trpc.product.getProductById({
    product_id: Number(product_id),
  });

  const { image_url, name, description_full, price, dev_comment } = product;
  const localPrice = Number(price).toLocaleString() + '원';

  return (
    <div className={styles.container}>
      <div className={styles.leftCol}>
        <div className={styles.imageContainer}>
          <Suspense fallback={<LoadingSpinner variant="inset" />}>
            <Image
              src={image_url || ''}
              alt="버거 이미지"
              fill
              sizes="(max-width: 768px) 100%, 560px"
              className={styles.image}
              priority
            />
          </Suspense>
        </div>
      </div>

      <div className={styles.rightCol}>
        <div className={styles.infoContainer}>
          <span className={styles.name}>{name}</span>
          <p className={styles.description}>{description_full}</p>
          <p className={styles.price}>{localPrice}</p>

          <ProductLikes product_id={parseInt(product_id)} />
          <p className={styles.devComment}>{dev_comment}</p>

          <ProductReview product_id={parseInt(product_id)} />
        </div>
      </div>
    </div>
  );
}
