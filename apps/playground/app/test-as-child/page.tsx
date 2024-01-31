import * as React from 'react';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Code,
  Container,
  DropdownMenu,
  DropdownMenuRoot,
  DropdownMenuTrigger,
  Flex,
  Section,
  TabNavLink,
  TabNavRoot,
  Text,
  Theme,
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
                  <Flex direction="column" gap="6">
                    <Flex align="center" gap="3">
                      <Avatar fallback="A" />

                      <Avatar asChild fallback="A">
                        <button aria-label="Avatar button">some child</button>
                      </Avatar>

                      <Avatar
                        fallback="A"
                        src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=160&h=160&dpr=2&q=80"
                      />

                      <Avatar
                        asChild
                        fallback="A"
                        src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=160&h=160&dpr=2&q=80"
                      >
                        <button aria-label="Avatar button" />
                      </Avatar>

                      <Badge asChild>
                        <button>Badge as child</button>
                      </Badge>

                      <Card>Normal card</Card>

                      <Card asChild>
                        <button>Card as child</button>
                      </Card>

                      <Code asChild>
                        <button>Code as child</button>
                      </Code>
                    </Flex>

                    <Flex gap="5">
                      <TabNavRoot>
                        <TabNavLink href="#">Tab 1</TabNavLink>
                        <TabNavLink href="#">Tab 2</TabNavLink>
                        <TabNavLink href="#">Tab 3</TabNavLink>
                      </TabNavRoot>

                      <TabNavRoot>
                        <TabNavLink asChild>
                          <NextLink href="#">Next Link 1</NextLink>
                        </TabNavLink>
                        <TabNavLink asChild>
                          <NextLink href="#">Next Link 2</NextLink>
                        </TabNavLink>
                        <TabNavLink asChild>
                          <NextLink href="#">Next Link 3</NextLink>
                        </TabNavLink>
                      </TabNavRoot>
                    </Flex>

                    <Flex gap="5">
                      <Box asChild>
                        <Text>Box as child</Text>
                      </Box>
                      <Box as="span">Box as span</Box>
                      <Box>Box default</Box>
                    </Flex>

                    <Container asChild>
                      <section>Container as child</section>
                    </Container>
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
