'use client';

import { useRouter } from 'next/navigation';
import { AppError, getErrorCode } from '#error/error';
import { sprinkles } from '#shared/lib/styles/sprinkles.css';
import Button from '#shared/ui/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  let message;

  if (error instanceof AppError) {
    message = getErrorCode(error.code);
  } else {
    message = error?.message;
  }

  return (
    <div
      className={sprinkles({
        display: 'flex',
        flexDirection: 'column',
        placeItems: 'center',
      })}
      style={{ width: '100vw', height: '100vh' }}
    >
      <h2 className={sprinkles({ marginBottom: 0 })}>
        서비스에 접속할 수 없습니다.
      </h2>
      <p className={sprinkles({ color: 'gray_400', marginBottom: 8 })}>
        {message || '오류가 발생했습니다.'}
      </p>
      <Button onClick={() => router.back()}>뒤로가기</Button>
    </div>
  );
}
