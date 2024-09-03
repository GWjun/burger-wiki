'use client';

import Image from 'next/image';
import { useSign } from '#features/auth';
import Button from '#shared/ui/Button';
import LoadingSpinner from '#shared/ui/LoadingSpinner';
import * as styles from './styles.css';

export function GoogleLoginButton() {
  const { status, signIn } = useSign();

  return (
    <Button
      onClick={() => signIn('google')}
      aria-label="구글로그인"
      className={styles.button}
    >
      {status === 'loading' ? (
        <LoadingSpinner variant="inset" />
      ) : (
        <>
          <Image
            src="/icons/google-icon.svg"
            width={20}
            height={20}
            alt=""
            aria-hidden
          />
          <span>Google 계정으로 계속하기</span>
        </>
      )}
    </Button>
  );
}
