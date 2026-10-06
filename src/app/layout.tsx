import type { Metadata, Viewport } from 'next';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';

export const metadata: Metadata = {
  title: 'Mơ Village | A gentle dream on Hòa Bình Lake',
  description:
    'Mid-to-premium lakeside retreat in Đà Bắc, Vietnam. Traditional Mường stilt houses, calm waters, and forest tranquility.',
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="256x256" type="image/x-icon" />
      </head>
      <body className="fraunces_af90467a-module__VgXOuq__variable be_vietnam_pro_51239f6-module__6gIpmG__variable antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
