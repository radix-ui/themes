import * as React from 'react';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import '@radix-ui/themes/styles.css';
import { NextThemeProvider } from './next-theme-provider';

export const metadata = {
  title: 'Radix Themes playground',
  description: 'A playground of Radix Themes components',
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
