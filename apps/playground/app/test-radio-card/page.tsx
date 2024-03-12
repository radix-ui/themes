import * as React from 'react';
import {
  Theme,
  Text,
  Container,
  Section,
  RadioCardGroup,
  Heading,
  Box,
  Separator,
} from '@radix-ui/themes';
import { radioCardGroupRootPropDefs } from '@radix-ui/themes/props';
import { NextThemeProvider } from '../next-theme-provider';
import { CrumpledPaperIcon, CubeIcon, GlobeIcon, VercelLogoIcon } from '@radix-ui/react-icons';

export default function Test() {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <NextThemeProvider>
          <Theme asChild>
            <div id="root">
              <Container px="8" size="3">
                {radioCardGroupRootPropDefs.size.values.map((size) => (
                  <React.Fragment key={size}>
                    <Section size="3">
                      <Heading mb="5">Size {size}</Heading>

                      <Box mb="7">
                        <Text as="div" color="gray" size="2" mb="3">
                          Plain text
                        </Text>
                        <RadioCardGroup.Root size={size} defaultValue="1">
                          <RadioCardGroup.Item value="1">Next.js</RadioCardGroup.Item>
                          <RadioCardGroup.Item value="2">Remix</RadioCardGroup.Item>
                          <RadioCardGroup.Item value="3">Astro</RadioCardGroup.Item>
                          <RadioCardGroup.Item value="4">HTMX</RadioCardGroup.Item>
                        </RadioCardGroup.Root>
                      </Box>

                      <Box>
                        <Text as="div" color="gray" size="2" mb="3">
                          With icons
                        </Text>
                        <RadioCardGroup.Root size={size} defaultValue="1">
                          <RadioCardGroup.Item value="1">
                            <VercelLogoIcon />
                            Next.js
                          </RadioCardGroup.Item>
                          <RadioCardGroup.Item value="2">
                            <CubeIcon />
                            Remix
                          </RadioCardGroup.Item>
                          <RadioCardGroup.Item value="3">
                            <GlobeIcon />
                            Astro
                          </RadioCardGroup.Item>
                          <RadioCardGroup.Item value="4">
                            <CrumpledPaperIcon />
                            HTMX
                          </RadioCardGroup.Item>
                        </RadioCardGroup.Root>
                      </Box>
                    </Section>

                    <Separator size="4" />
                  </React.Fragment>
                ))}
              </Container>
            </div>
          </Theme>
        </NextThemeProvider>
      </body>
    </html>
  );
}
