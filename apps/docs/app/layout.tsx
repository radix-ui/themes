import type { Metadata } from 'next';
import { Theme, ThemePanel } from '@kushagradhawan/kookie-ui';
import { AppShell } from './components/app-shell';
import './globals.css';
import Script from 'next/script';

export const metadata: Metadata = {
  metadataBase: new URL('https://kookie-ui.vercel.app'),
  title: {
    default: 'Kookie UI – Modern React UI for Design Systems',
    template: '%s – Kookie UI',
  },
  description: 'The Foundation for your Design System — beautifully designed, accessible React components you can customize, extend, and ship fast.',
  keywords: ['Kookie UI', 'React UI components', 'Design system', 'Radix Themes', 'Accessible components', 'TypeScript UI library'],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Kookie UI – Modern React UI for Design Systems',
    description: 'Beautiful, accessible React components for building design systems. Customize, extend, and ship fast.',
    url: 'https://kookie-ui.vercel.app',
    siteName: 'Kookie UI',
    images: [
      {
        url: '/logo.svg',
        width: 1200,
        height: 630,
        alt: 'Kookie UI',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kookie UI – Modern React UI for Design Systems',
    description: 'Beautiful, accessible React components for building design systems. Customize, extend, and ship fast.',
    images: ['/logo.svg'],
    site: '@kookieui',
    creator: '@kushagradhawan',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Theme accentColor="blue" grayColor="gray" material="solid" radius="medium" fontFamily="sans">
          <AppShell>{children}</AppShell>
          <ThemePanel defaultOpen={false} />
        </Theme>
        <Script id="ld-org" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Kookie UI',
            url: 'https://kookie-ui.vercel.app',
            logo: 'https://kookie-ui.vercel.app/logo.svg',
            sameAs: ['https://github.com/KushagraDhawan1997/kookie-ui'],
          })}
        </Script>
      </body>
    </html>
  );
}
