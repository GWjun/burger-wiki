'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import { OverlayProvider } from '@toss/use-overlay';
import { darkTheme, lightTheme } from '#shared/lib/styles/theme.css';

export default function ThemeModeProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      value={{
        light: lightTheme,
        dark: darkTheme,
      }}
    >
      <OverlayProvider>{children}</OverlayProvider>
    </ThemeProvider>
  );
}
