import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import { ReactNode } from 'react';
import { Header } from 'src/widgets/header';

import AuthProvider from '#shared/lib/providers/AuthProvider';
import ToastProvider from '#shared/lib/providers/ToastProvider';
import TrpcClientProvider from '#shared/lib/providers/TrpcClient';
import ThemeModeProvider from '#shared/lib/providers/ThemeProvider';

import '#shared/lib/styles/global.css';

const NotoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Burger Crew',
  description: '버거 크루',
  icons: {
    icon: '/logo/burger-crew-icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={NotoSansKr.className}>
        <AuthProvider>
          <ToastProvider>
            <TrpcClientProvider>
              <ThemeModeProvider>
                <Header />
                <main>{children}</main>
              </ThemeModeProvider>
            </TrpcClientProvider>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
