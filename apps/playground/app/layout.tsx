import type { Metadata } from 'next';
import { Theme } from '@kushagradhawan/kookie-ui';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kookie UI Playground',
  description: 'Testing ground for Kookie UI components',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Theme>{children}</Theme>
      </body>
    </html>
  );
}
