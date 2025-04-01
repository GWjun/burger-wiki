import { sprinkles } from '#shared/lib/styles/sprinkles.css';
import Button from '#shared/ui/Button';
import Link from 'next/link';

export default function NotFound({}: {}) {
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
        요청하신 페이지를 찾을 수 없습니다.
      </h2>
      <p className={sprinkles({ color: 'description', marginBottom: 8 })}>
        주소를 올바르게 입력하였는지 확인해 주세요.
      </p>
      <Link href="/">
        <Button>홈으로 가기</Button>
      </Link>
    </div>
  );
}
