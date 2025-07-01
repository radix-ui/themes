import * as React from 'react';
import { Theme, Grid, Text, Box, BoxProps, Code } from '@radix-ui/themes';
import { NextThemeProvider } from '../next-theme-provider';

export default function Test() {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <NextThemeProvider>
          <Theme asChild>
            <div id="root">
              <Grid rows="repeat(4, 1fr)" gap="5" height="100dvh">
                <Grid
                  height="100%"
                  rows="repeat(3, 1fr)"
                  gap="1"
                  justifyItems="start"
                  style={{ background: 'var(--blue-a3)' }}
                >
                  <BlueBox>start</BlueBox>
                  <BlueBox />
                  <BlueBox />
                </Grid>

                <Grid
                  height="100%"
                  rows="repeat(3, 1fr)"
                  gap="1"
                  justifyItems="center"
                  style={{ background: 'var(--blue-a3)' }}
                >
                  <BlueBox>center</BlueBox>
                  <BlueBox />
                  <BlueBox />
                </Grid>

                <Grid
                  height="100%"
                  rows="repeat(3, 1fr)"
                  gap="1"
                  justifyItems="end"
                  style={{ background: 'var(--blue-a3)' }}
                >
                  <BlueBox>end</BlueBox>
                  <BlueBox />
                  <BlueBox />
                </Grid>
                <Grid
                  height="100%"
                  rows="repeat(3, 1fr)"
                  gap="1"
                  justifyItems="stretch"
                  style={{ background: 'var(--blue-a3)' }}
                >
                  <BlueBox>stretch</BlueBox>
                  <BlueBox />
                  <BlueBox />
                </Grid>
              </Grid>
            </div>
          </Theme>
        </NextThemeProvider>
      </body>
    </html>
  );
}

const BlueBox = ({ children, ...props }: BoxProps) => (
  <Box p="3" asChild style={{ background: 'var(--blue-9)', minWidth: '50dvw' }} {...props}>
    <Text size="2" color="gray" highContrast>
      {children && <Code variant="ghost">{children}</Code>}
    </Text>
  </Box>
);
