'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import * as styles from '#shared/ui/components/ThemeButton/styles.css';

export default function ThemeButton() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className={styles.skeleton} />;

  return (
    <button
      onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
      aria-label="테마 변경 버튼"
      className={styles.button}
    >
      {resolvedTheme === 'light' ? (
        <Sun width={20} height={20} aria-label="라이트모드" />
      ) : (
        <Moon size={20} aria-label="다크모드" />
      )}
    </button>
  );
}
