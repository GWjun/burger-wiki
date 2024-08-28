'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
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
      {children}
    </ThemeProvider>
  );
}
