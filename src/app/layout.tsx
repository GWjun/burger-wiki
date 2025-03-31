import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { ReactNode } from 'react';

import { Header } from '#widgets/header';
import { Footer } from '#widgets/footer';
import AuthProvider from '#shared/lib/providers/AuthProvider';
import ToastProvider from '#shared/lib/providers/ToastProvider';
import TrpcClientProvider from '#shared/lib/providers/TrpcClient';
import ThemeModeProvider from '#shared/lib/providers/ThemeProvider';

import '#shared/lib/styles/global.css';

const pretendard = localFont({
  src: '../shared/assets/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
});

export const metadata: Metadata = {
  title: {
    template: '%s - 버거위키',
    default: '버거위키',
  },
  description: '햄버거 정보 제공 플랫폼',
  icons: {
    icon: '/logo/burger-wiki-icon.svg',
  },
  metadataBase: new URL('https://burger-wiki.vercel.app/'),
  openGraph: {
    title: '버거위키 - 버거 정보 공유',
    description: '햄버거에 대해 알아보세요!',
    url: 'https://burger-wiki.vercel.app/',
    images: [
      {
        url: '/logo/burger-wiki-both.svg',
        width: 58,
        height: 15,
        alt: 'Burger Wiki 메인 이미지',
      },
    ],
  },
  verification: {
    google: 'F-hAA-H6D0Gog0pmewxCE4WZBQR_Z6trKasxv9my7Sk',
    other: {
      'naver-site-verification': 'a555c1bd87bc2faccbbc732e03a76b930196fe1b',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={pretendard.className}>
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
