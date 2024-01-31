import * as React from 'react';
import {
  Theme,
  Flex,
  Container,
  Section,
  Badge,
  Card,
  Code,
  Avatar,
  TabNavLink,
  TabNavRoot,
} from '@radix-ui/themes';
import { NextThemeProvider } from '../next-theme-provider';
import NextLink from 'next/link';

export default function Test() {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <NextThemeProvider>
          <Theme asChild>
            <div id="root">
              <Container px="8">
                <Section size="3">
                  <Flex align="center" gap="3">
                    <Avatar fallback="A" />

                    <Avatar
                      fallback="A"
                      src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=160&h=160&dpr=2&q=80"
                    />

                    <Avatar asChild fallback="A">
                      <button aria-label="Avatar button">some child</button>
                    </Avatar>

                    <Avatar
                      asChild
                      fallback="A"
                      src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=160&h=160&dpr=2&q=80"
                    >
                      <button aria-label="Avatar button" />
                    </Avatar>

                    <Badge asChild>
                      <button>Badge as button</button>
                    </Badge>

                    <Card>Normal card</Card>

                    <Card asChild>
                      <button>Card as button</button>
                    </Card>

                    <Code asChild>
                      <button>Code as button</button>
                    </Code>
                  </Flex>

                  <Flex>
                    <TabNavRoot>
                      <TabNavLink href="#">Tab 1</TabNavLink>
                      <TabNavLink href="#">Tab 2</TabNavLink>
                      <TabNavLink href="#">Tab 3</TabNavLink>
                    </TabNavRoot>

                    <TabNavRoot>
                      <TabNavLink asChild>
                        <NextLink href="#">Tab 1</NextLink>
                      </TabNavLink>
                      <TabNavLink asChild>
                        <NextLink href="#">Tab 2</NextLink>
                      </TabNavLink>
                      <TabNavLink asChild>
                        <NextLink href="#">Tab 3</NextLink>
                      </TabNavLink>
                    </TabNavRoot>
                  </Flex>
                </Section>
              </Container>
            </div>
          </Theme>
        </NextThemeProvider>
      </body>
    </html>
  );
}
