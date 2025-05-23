import type { Metadata } from 'next';
import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { createAsyncCaller } from '@server/routers';
import { BrandProducts } from '#widgets/product';
import { LikeButton } from '#entities/brand';
import {
  getSearchParam,
  isValidOrderType,
  isValidSortOrder,
} from '#shared/lib/utils/searchParamsUtils';

import * as styles from './styles.css';
import { getHydrationHelpers } from '@server/getHydrationHelpers';

export async function generateMetadata(props: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const params = await props.params;

  const { name } = params;

  const trpc = await createAsyncCaller();
  const brand = await trpc.brand.getBrandByName({
    name_eng: name,
  });

  return {
    title: brand.name,
    openGraph: {
      title: `${brand.name} - 버거위키`,
      description: `${brand.name}에 대해 자세히 알아보세요!`,
      url: `https://burger-wiki.vercel.app/brand/${brand}`,
      images: [
        {
          url: brand.logo_url ?? '/logo/product-wiki-both.svg',
          width: 800,
          height: 600,
          alt: '브랜드 로고 이미지',
        },
      ],
    },
  };
}

export default async function Brand(props: {
  params: Promise<{ name: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await props.params;
  const { name } = params;

  const orderParam = await getSearchParam(props.searchParams, 'order');
  const sortOrderParam = await getSearchParam(props.searchParams, 'sortOrder');

  const order = isValidOrderType(orderParam) ? orderParam : 'release';
  const sortOrder = isValidSortOrder(sortOrderParam) ? sortOrderParam : 'desc';

  const { trpc, HydrateClient } = await getHydrationHelpers();

  const brand = await trpc.brand.getBrandByName({
    name_eng: name,
  });

  const {
    id,
    name: name_kor,
    logo_url,
    website_url,
    likes_count,
    background_image_url,
  } = brand;

  void trpc.product.getFilteredProducts.prefetchInfinite({
    filters: {
      brands: [name_kor],
    },
    order,
    sortOrder,
    limit: 20,
  });

  return (
    <HydrateClient>
      <div>
        <div className={styles.background}>
          <Image
            src={
              background_image_url ?? '/images/default-brand-background.webp'
            }
            fill
            sizes="100vw"
            placeholder="blur"
            blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
            alt="매장 이미지"
            className={styles.backgroundImage}
          />
        </div>

        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.avatarContainer}>
              <Image
                src={logo_url ?? '/logo/burger-wiki-icon.svg'}
                width={0}
                height={0}
                alt="브랜드 로고 이미지"
                className={styles.avatar}
              />
            </div>

            <div className={styles.info}>
              <div className={styles.name}>{name_kor}</div>
              <div className={styles.likes}>
                <span className={styles.like}>관심</span>
                <span>{likes_count}</span>
              </div>

              <LikeButton brand_id={Number(id)} />
            </div>

            {website_url && (
              <div className={styles.action}>
                <Link href={website_url} className={styles.link}>
                  방문하기
                </Link>
              </div>
            )}
          </div>

          <Suspense>
            <BrandProducts brand_name_kor={name_kor} />
          </Suspense>
        </div>
      </div>
    </HydrateClient>
  );
}
