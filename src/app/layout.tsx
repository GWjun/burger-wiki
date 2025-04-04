import type { Metadata } from 'next';
import { ReactNode } from 'react';

import { Header } from '#widgets/header';
import { Footer } from '#widgets/footer';
import AuthProvider from '#shared/lib/providers/AuthProvider';
import ToastProvider from '#shared/lib/providers/ToastProvider';
import TrpcClientProvider from '#shared/lib/providers/TrpcClient';
import ThemeModeProvider from '#shared/lib/providers/ThemeProvider';

import '#shared/lib/styles/global.css';
import '#shared/lib/styles/font.css';

export const metadata: Metadata = {
  title: {
    template: '%s - 버거위키',
    default: '버거위키',
  },
  description:
    '버거위키에서 다양한 프랜차이즈 브랜드의 메뉴, 가격, 칼로리, 영양성분 정보를 확인하고 사용자들의 솔직한 리뷰를 공유하세요.',
  icons: {
    icon: '/logo/burger-wiki-icon.svg',
  },
  metadataBase: new URL('https://burger-wiki.vercel.app/'),
  openGraph: {
    title: '버거위키 - 버거 정보 공유',
    description: '햄버거에 대해 알아보세요!',
    url: 'https://burger-wiki.vercel.app/',
    siteName: '버거위키',
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
  applicationName: '버거위키',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
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
