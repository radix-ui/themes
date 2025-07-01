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
              <Grid height="100vh" columns="repeat(4, 1fr)" gap="1">
                <BlueBox alignSelf="start">start</BlueBox>
                <BlueBox alignSelf="center">center</BlueBox>
                <BlueBox alignSelf="end">end</BlueBox>
                <BlueBox alignSelf="stretch">stretch</BlueBox>
              </Grid>
            </div>
          </Theme>
        </NextThemeProvider>
      </body>
    </html>
  );
}

const BlueBox = ({ children, ...props }: BoxProps) => (
  <Box p="3" asChild style={{ background: 'var(--blue-9)', minHeight: '50%' }} {...props}>
    <Text size="2" color="gray" highContrast>
      <Code variant="ghost">{children}</Code>
    </Text>
  </Box>
);
