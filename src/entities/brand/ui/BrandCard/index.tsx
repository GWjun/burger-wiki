'use client';

import type { Brand } from '@prisma/client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect } from 'react';
import * as styles from './styles.css';

export function BrandCard({ brand }: { brand: Brand }) {
  const router = useRouter();

  const { name, name_eng, logo_url } = brand;

  useEffect(() => {
    router.prefetch(`/brand/${name_eng}`);
  }, [name_eng, router]);

  return (
    <div
      onClick={() => router.push(`/brand/${name_eng}`)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          router.push(`/brand/${name_eng}`);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`${name} 브랜드`}
      className={styles.container}
    >
      <div className={styles.imageContainer}>
        <Image
          src={logo_url || '/logo/burger-wiki-icon.svg'}
          alt="브랜드 로고 이미지"
          fill
          sizes="(max-width: 768px) 150px, 233.59px"
          className={styles.image}
          priority
        />
      </div>
    </div>
  );
}
