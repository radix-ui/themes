import type { Metadata } from 'next';
import { Providers } from '../components/providers';
import { DocsLayout } from '../components/docs-layout';
import './globals.css';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  metadataBase: new URL('https://hellokookie.com'),
  title: {
    default: 'Kookie UI – Modern React UI for Design Systems',
    template: '%s – Kookie UI',
  },
  description: 'The Foundation for your Design System — beautifully designed, accessible React components you can customize, extend, and ship fast.',
  keywords: ['Kookie UI', 'React UI components', 'Design system', 'Radix Themes', 'Accessible components', 'TypeScript UI library'],
  authors: [{ name: 'Kushagra Dhawan' }],
  creator: 'Kushagra Dhawan',
  publisher: 'Kushagra Dhawan',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Kookie UI – Modern React UI for Design Systems',
    description: 'Beautiful, accessible React components for building design systems. Customize, extend, and ship fast.',
    url: 'https://hellokookie.com',
    siteName: 'Kookie UI',
    images: [
      {
        url: '/kookie-ui-logo.png',
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
    images: ['/kookie-ui-logo.png'],
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
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <DocsLayout>{children}</DocsLayout>
        </Providers>
        <Script id="ld-org" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareSourceCode',
            name: 'Kookie UI',
            description: 'The Foundation for your Design System — beautifully designed, accessible React components.',
            url: 'https://hellokookie.com',
            codeRepository: 'https://github.com/KushagraDhawan1997/kookie-ui',
            programmingLanguage: ['TypeScript', 'React'],
            author: {
              '@type': 'Person',
              name: 'Kushagra Dhawan',
              url: 'https://kushagradhawan.com',
            },
            license: 'https://opensource.org/licenses/MIT',
          })}
        </Script>
        <Analytics />
      </body>
    </html>
  );
}
