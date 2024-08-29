import Link from 'next/link';
import Image from 'next/image';

import { ThemeChangeButton } from '#features/theme';
import { auth } from '#shared/lib/utils/auth';
import * as styles from './styles.css';

export async function Header() {
  const session = await auth();

  return (
    <header className={styles.header}>
      <div className={styles.leftContainer}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/icons/burger-crew-icon.svg"
            width={30}
            height={30}
            alt="버거크루 아이콘"
          />
          <h1 className={styles.title}>버거크루</h1>
        </Link>
        <nav>
          <ul className={styles.navList}>
            <li>
              <Link href="/test" className={styles.navLink}>
                메뉴목록
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className={styles.rightContainer}>
        {session?.user ? (
          <p>{session.user.name}</p>
        ) : (
          <Link href="/login" className={styles.login}>
            로그인
          </Link>
        )}

        <ThemeChangeButton />
      </div>
    </header>
  );
}
