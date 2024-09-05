import Link from 'next/link';
import { ThemeChangeButton } from '#features/theme';
import { UserMenu } from '#features/menu';
import { auth } from '#shared/lib/utils/auth';
import LogoIcon from '#shared/ui/LogoIcon';
import LogoText from '#shared/ui/LogoText';
import * as styles from './styles.css';

export async function Header() {
  const session = await auth();

  return (
    <header className={styles.header}>
      <div className={styles.leftContainer}>
        <Link href="/" className={styles.logo}>
          <LogoIcon size={30} />
          <LogoText size={30} className={styles.title} />
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
          <UserMenu />
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
