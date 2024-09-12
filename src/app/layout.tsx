import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import { ReactNode } from 'react';

import { Header } from '#widgets/header';
import { Footer } from '#widgets/footer';
import AuthProvider from '#shared/lib/providers/AuthProvider';
import ToastProvider from '#shared/lib/providers/ToastProvider';
import TrpcClientProvider from '#shared/lib/providers/TrpcClient';
import ThemeModeProvider from '#shared/lib/providers/ThemeProvider';

import '#shared/lib/styles/global.css';

const NotoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Burger Wiki',
  description: '한국 버거 정보 공유 플랫폼',
  icons: {
    icon: '/logo/burger-wiki-icon.svg',
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
                <Footer />
              </ThemeModeProvider>
            </TrpcClientProvider>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
