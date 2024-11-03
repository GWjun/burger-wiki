import type { Metadata } from 'next';
import Image from 'next/image';
import React, { Suspense } from 'react';
import { createAsyncCaller } from '#server/routers';

import { ProductReview } from '#widgets/review';
import { ProductLikes } from '#widgets/product';
import { NutritionTable } from '#entities/nutrition';
import LoadingSpinner from '#shared/ui/LoadingSpinner';
import RatingStar from '#shared/ui/RatingStar';
import * as styles from './styles.css';

export async function generateMetadata({
  params: { product_id },
}: {
  params: { product_id: string };
}): Promise<Metadata> {
  const trpc = await createAsyncCaller();
  const product = await trpc.product.getProductById({
    product_id: Number(product_id),
  });

  return {
    title: product.name,
    openGraph: {
      title: `${product.name} - 버거위키`,
      description: `${product.name}에 대해 자세히 알아보세요!`,
      url: `https://burger-wiki.vercel.app/burger/${product_id}`,
      images: [
        {
          url: product.image_url ?? '/logo/product-wiki-both.svg',
          width: 800,
          height: 600,
          alt: '버거 이미지',
        },
      ],
    },
  };
}

export default async function Burger({
  params: { product_id },
}: {
  params: { product_id: string };
}) {
  const trpc = await createAsyncCaller();
  const product = await trpc.product.getProductById({
    product_id: Number(product_id),
  });
  const nutrition_info = await trpc.nutrition.getInfoByProductId({
    product_id: Number(product_id),
  });

  const { image_url, name, score_avg, description_full, price, dev_comment } =
    product;
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
          <div className={styles.topInfo}>
            <span className={styles.name}>{name}</span>
            <RatingStar size={24} initialValue={score_avg} />
          </div>

          <p className={styles.description}>{description_full}</p>
          <p className={styles.price}>{localPrice}</p>

          <ProductLikes product_id={parseInt(product_id)} />
          <p className={styles.devComment}>{dev_comment}</p>

          <NutritionTable nutrition_info={nutrition_info} />

          <ProductReview product_id={parseInt(product_id)} />
        </div>
      </div>
    </div>
  );
}
