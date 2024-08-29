'use client';

import Image from 'next/image';
import Button from '#shared/ui/Button';
import { handleSignIn } from '../../model/handleSignIn';
import * as styles from './styles.css';

export function GoogleLoginButton() {
  return (
    <Button
      onClick={() => handleSignIn('google')}
      aria-label="구글로그인"
      className={styles.button}
    >
      <Image
        src="/icons/google-icon.svg"
        width={20}
        height={20}
        alt=""
        aria-hidden
      />
      <span>Google 계정으로 계속하기</span>
    </Button>
  );
}
