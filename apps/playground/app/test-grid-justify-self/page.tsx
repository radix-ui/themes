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
              <Grid height="100vh" rows="repeat(4, 1fr)" gap="1">
                <BlueBox justifySelf="start">start</BlueBox>
                <BlueBox justifySelf="center">center</BlueBox>
                <BlueBox justifySelf="end">end</BlueBox>
                <BlueBox justifySelf="stretch">stretch</BlueBox>
              </Grid>
            </div>
          </Theme>
        </NextThemeProvider>
      </body>
    </html>
  );
}

const BlueBox = ({ children, ...props }: BoxProps) => (
  <Box p="3" asChild style={{ background: 'var(--blue-9)', minWidth: '50%' }} {...props}>
    <Text size="2" color="gray" highContrast>
      <Code variant="ghost">{children}</Code>
    </Text>
  </Box>
);
