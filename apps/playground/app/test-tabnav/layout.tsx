import * as React from 'react';
import { Theme, Container, Section, Box } from '@radix-ui/themes';
import { NextThemeProvider } from '../next-theme-provider';
import { Nav } from './nav';

export default function Test({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <NextThemeProvider>
          <Theme asChild>
            <div id="root">
              <Container>
                <Section>
                  <Nav />
                  <Box my="9">{children}</Box>
                </Section>
              </Container>
            </div>
          </Theme>
        </NextThemeProvider>
      </body>
    </html>
  );
}
