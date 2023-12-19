'use client';

import * as React from 'react';
import {
  Theme,
  Container,
  Section,
  Card,
  Text,
  Box,
  Button,
  Flex,
  Link,
  ThemePanel,
  Heading,
  TextFieldInput,
  Skeleton,
} from '@radix-ui/themes';
import { NextThemeProvider } from '../next-theme-provider';

export default function Test() {
  const [isLoading, setIsLoading] = React.useState(true);
  const loadingTimeoutRef = React.useRef<ReturnType<typeof setTimeout>>();

  React.useEffect(() => {
    loadingTimeoutRef.current = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(loadingTimeoutRef.current);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <NextThemeProvider>
          <Theme asChild>
            <div id="root">
              <ThemePanel />

              <Container size="1">
                <Section>
                  <Card asChild variant="classic" size="4">
                    <form action="/">
                      <Box height="7" mb="4">
                        <Heading as="h3" size="6" mt="-1">
                          {isLoading ? <Skeleton>Sign up</Skeleton> : 'Sign up'}
                        </Heading>
                      </Box>

                      <Box mb="5">
                        <Flex direction="column">
                          <Text as="label" size="2" weight="medium" mb="2" htmlFor="email">
                            {isLoading ? <Skeleton>Email address</Skeleton> : 'Email address'}
                          </Text>
                          {isLoading ? (
                            <Skeleton>
                              <TextFieldInput
                                id="email"
                                type="email"
                                variant="classic"
                                placeholder="Enter your email"
                              />
                            </Skeleton>
                          ) : (
                            <TextFieldInput
                              id="email"
                              type="email"
                              variant="classic"
                              placeholder="Enter your email"
                            />
                          )}
                        </Flex>
                      </Box>

                      <Box mb="5" position="relative">
                        <Box position="absolute" top="0" right="0" style={{ marginTop: -2 }}>
                          <Link href="#" size="2">
                            {isLoading ? <Skeleton>Forgot password?</Skeleton> : 'Forgot password?'}
                          </Link>
                        </Box>

                        <Flex direction="column">
                          <Text as="label" size="2" weight="medium" mb="2" htmlFor="password">
                            {isLoading ? <Skeleton>Password</Skeleton> : 'Password'}
                          </Text>
                          {isLoading ? (
                            <Skeleton>
                              <TextFieldInput
                                id="password"
                                variant="classic"
                                type="password"
                                placeholder="Enter your password"
                              />
                            </Skeleton>
                          ) : (
                            <TextFieldInput
                              id="password"
                              variant="classic"
                              type="password"
                              placeholder="Enter your password"
                            />
                          )}
                        </Flex>
                      </Box>

                      {isLoading ? (
                        <Flex mt="6" justify="end" gap="3">
                          <Skeleton>
                            <Button variant="surface" highContrast color="gray">
                              Create an account
                            </Button>
                          </Skeleton>
                          <Skeleton>
                            <Button variant="solid" type="submit">
                              Sign in
                            </Button>
                          </Skeleton>
                        </Flex>
                      ) : (
                        <Flex mt="6" justify="end" gap="3">
                          <Button variant="surface" highContrast color="gray">
                            Create an account
                          </Button>
                          <Button variant="solid" type="submit">
                            Sign in
                          </Button>
                        </Flex>
                      )}
                    </form>
                  </Card>
                </Section>
              </Container>
            </div>
          </Theme>
        </NextThemeProvider>
      </body>
    </html>
  );
}
