import * as React from 'react';
import {
  Theme,
  Text,
  Container,
  Section,
  RadioCardGroupRoot,
  RadioCardGroupItem,
  Heading,
  Box,
  Separator,
} from '@radix-ui/themes';
import { radioCardGroupPropDefs } from '@radix-ui/themes/props';
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
                {radioCardGroupPropDefs.size.values.map((size) => (
                  <React.Fragment key={size}>
                    <Section size="3">
                      <Heading mb="5">Size {size}</Heading>

                      <Box mb="7">
                        <Text as="div" color="gray" size="2" mb="3">
                          Plain text
                        </Text>
                        <RadioCardGroupRoot size={size} defaultValue="1">
                          <RadioCardGroupItem value="1">Next.js</RadioCardGroupItem>
                          <RadioCardGroupItem value="2">Remix</RadioCardGroupItem>
                          <RadioCardGroupItem value="3">Astro</RadioCardGroupItem>
                          <RadioCardGroupItem value="4">HTMX</RadioCardGroupItem>
                        </RadioCardGroupRoot>
                      </Box>

                      <Box>
                        <Text as="div" color="gray" size="2" mb="3">
                          With icons
                        </Text>
                        <RadioCardGroupRoot size={size} defaultValue="1">
                          <RadioCardGroupItem value="1">
                            <VercelLogoIcon />
                            Next.js
                          </RadioCardGroupItem>
                          <RadioCardGroupItem value="2">
                            <CubeIcon />
                            Remix
                          </RadioCardGroupItem>
                          <RadioCardGroupItem value="3">
                            <GlobeIcon />
                            Astro
                          </RadioCardGroupItem>
                          <RadioCardGroupItem value="4">
                            <CrumpledPaperIcon />
                            HTMX
                          </RadioCardGroupItem>
                        </RadioCardGroupRoot>
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
