import type { Metadata } from 'next';
import { Theme, ThemePanel } from '@kushagradhawan/kookie-ui';
import './globals.css';
import { AppShell } from './components/app-shell';

export const metadata: Metadata = {
  title: 'Kookie User Interface',
  description:
    'The Foundation for your Design System - A set of beautifully designed components that you can customize, extend, and build on.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Theme accentColor="blue" grayColor="gray" material="solid" radius="medium">
          <AppShell>{children}</AppShell>
          <ThemePanel defaultOpen={false} />
        </Theme>
      </body>
    </html>
  );
}
