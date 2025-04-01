'use client';

import { useRouter } from 'next/navigation';
import { sprinkles } from '#shared/lib/styles/sprinkles.css';
import Button from '#shared/ui/Button';
import { useEffect } from 'react';
import { captureException } from '@sentry/nextjs';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      captureException(error);
    }
  }, [error]);

  return (
    <div
      className={sprinkles({
        display: 'flex',
        flexDirection: 'column',
        placeItems: 'center',
      })}
      style={{ width: '100vw', height: '100vh' }}
    >
      <h2 className={sprinkles({ marginBottom: 2 })}>
        서비스에 접속할 수 없습니다.
      </h2>
      <p className={sprinkles({ color: 'description', marginBottom: 8 })}>
        오류가 발생했습니다.
      </p>
      <Button onClick={() => router.back()}>뒤로가기</Button>
    </div>
  );
}
