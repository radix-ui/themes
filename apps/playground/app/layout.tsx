import * as React from 'react';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import '@kushagradhawan/kookie-ui/styles.css';
import { NextThemeProvider } from './next-theme-provider';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kookie UI Playground',
  description: 'A playground of Kookie UI components',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <NextThemeProvider>{children}</NextThemeProvider>
      </body>
    </html>
  );
}
