import type { Metadata } from 'next';
import localFont from 'next/font/local';
import type { ReactNode } from 'react';

import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { Starfield } from '@/components/layout/starfield';
import { site } from '@/content/site';

import './globals.css';

const geist = localFont({
  src: '../assets/fonts/geist-latin.woff2',
  weight: '400 700',
  variable: '--font-geist',
  display: 'swap',
});

const instrumentSerif = localFont({
  src: '../assets/fonts/instrument-serif-italic-latin.woff2',
  weight: '400',
  style: 'italic',
  variable: '--font-instrument',
  display: 'swap',
});

export const metadata: Metadata = {
  title: `${site.name} · Portfolio`,
  description: site.introduction,
  openGraph: {
    type: 'website',
    title: `${site.name} · Portfolio`,
    description: site.introduction,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${instrumentSerif.variable}`} data-scroll-behavior="smooth">
      <body>
        <Starfield />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
