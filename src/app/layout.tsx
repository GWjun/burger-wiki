import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import { ReactNode } from 'react';
import { Header } from '#widgets/Header';
import TrpcClientProvider from '#shared/lib/providers/TrpcClient';
import AuthProvider from '#shared/lib/providers/AuthProvider';
import ThemeModeProvider from '#shared/lib/providers/ThemeProvider';
import '#shared/lib/styles/global.css';

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

const NotoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Burger Crew',
  description: '버거 크루',
  icons: {
    icon: '/icons/burger-crew-icon.svg',
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
        <TrpcClientProvider>
          <AuthProvider>
            <ThemeModeProvider>
              <Header />
              <main>{children}</main>
            </ThemeModeProvider>
          </AuthProvider>
        </TrpcClientProvider>
      </body>
    </html>
  );
}
