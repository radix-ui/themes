import * as React from 'react';
import './globals.css';
import '@radix-ui/themes/styles.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Radix Themes playground',
  description: 'A playground of Radix Themes components',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
