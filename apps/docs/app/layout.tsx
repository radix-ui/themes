import type { Metadata } from 'next';
import { Theme, ThemePanel } from '@kushagradhawan/kookie-ui';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kookie UI',
  description: 'A beautiful React component library based on Radix UI',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Theme accentColor="indigo" grayColor="mauve">
          {children}
          <ThemePanel defaultOpen={false} />
        </Theme>
      </body>
    </html>
  );
}
