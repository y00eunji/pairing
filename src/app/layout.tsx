import Providers from '@/provider/providers';
import type { Metadata } from 'next';
import { Noto_Sans_KR, Roboto } from 'next/font/google';
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${noto.variable} antialiased relative overscroll-y-none min-h-[100dvh] scrollbar-hide`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
