import Link from 'next/link';
import ThemeButton from '#shared/ui/components/ThemeButton';
import * as styles from './styles.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>무제</h1>
      <nav>
        <ul className={styles.navList}>
          <li>
            <Link href="/" className={styles.navLink}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/" className={styles.navLink}>
              About
            </Link>
          </li>
          <li>
            <Link href="/users" className={styles.navLink}>
              Contact
            </Link>
          </li>
          <li>
            <ThemeButton />
          </li>
        </ul>
      </nav>
    </header>
  );
}
