import type { Metadata } from 'next';
import { Noto_Sans_KR, Roboto } from 'next/font/google';

import Providers from '@/provider/providers';
import './globals.css';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

const noto = Noto_Sans_KR({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-noto',
});

export const metadata: Metadata = {
  title: 'pAIring',
  description: 'pAIring',
  icons: {
    icon: '/images/favicon_pairing.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="format-detection"
          content="telephone=no, address=no, email=no"
        />
        <meta name="description" content="AI를 활용한 소개팅 서비스" />
        <meta name="keywords" content="pAIring,소개팅,AI" />
        <meta property="og:site_name" content="pAIring" />
        <meta
          property="og:title"
          content="pAIring | AI를 활용한 소개팅 서비스"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="웹 페이지 주소 들어갈 예정" />
        <meta property="og:image" content="/public/images/og-image.png" />
        <meta
          http-equiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
        <title>pAIring</title>
        <script
          defer
          src="https://cdn.swygbro.com/public/widget/swyg-widget.js"
        ></script>
      </head>
      <body
        className={`${roboto.variable} ${noto.variable} antialiased relative overscroll-y-none min-h-[100dvh] scrollbar-hide`}
      >
        <main className="layout flex flex-col overflow-hidden shadow-lg">
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
