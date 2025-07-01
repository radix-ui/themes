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
              <Grid columns="repeat(6, 1fr)" gap="5" height="100dvh">
                <Grid
                  height="100%"
                  rows="repeat(3, min-content)"
                  gap="1"
                  alignContent="start"
                  style={{ background: 'var(--blue-a3)' }}
                >
                  <BlueBox>start</BlueBox>
                  <BlueBox />
                  <BlueBox />
                </Grid>

                <Grid
                  height="100%"
                  rows="repeat(3, min-content)"
                  gap="1"
                  alignContent="center"
                  style={{ background: 'var(--blue-a3)' }}
                >
                  <BlueBox>center</BlueBox>
                  <BlueBox />
                  <BlueBox />
                </Grid>

                <Grid
                  height="100%"
                  rows="repeat(3, min-content)"
                  gap="1"
                  alignContent="end"
                  style={{ background: 'var(--blue-a3)' }}
                >
                  <BlueBox>end</BlueBox>
                  <BlueBox />
                  <BlueBox />
                </Grid>

                <Grid
                  height="100%"
                  rows="repeat(3, min-content)"
                  gap="1"
                  alignContent="between"
                  style={{ background: 'var(--blue-a3)' }}
                >
                  <BlueBox>between</BlueBox>
                  <BlueBox />
                  <BlueBox />
                </Grid>

                <Grid
                  height="100%"
                  rows="repeat(3, min-content)"
                  gap="1"
                  alignContent="evenly"
                  style={{ background: 'var(--blue-a3)' }}
                >
                  <BlueBox>evenly</BlueBox>
                  <BlueBox />
                  <BlueBox />
                </Grid>

                <Grid
                  height="100%"
                  rows="repeat(3, min-content)"
                  gap="1"
                  alignContent="around"
                  style={{ background: 'var(--blue-a3)' }}
                >
                  <BlueBox>around</BlueBox>
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
  <Box p="3" asChild style={{ background: 'var(--blue-9)', minHeight: '20vh' }} {...props}>
    <Text size="2" color="gray" highContrast>
      {children && <Code variant="ghost">{children}</Code>}
    </Text>
  </Box>
);
