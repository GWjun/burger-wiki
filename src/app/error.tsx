'use client';

import { useRouter } from 'next/navigation';
import { sprinkles } from '#shared/lib/styles/sprinkles.css';
import Button from '#shared/ui/Button';

export default function Error({}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

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
