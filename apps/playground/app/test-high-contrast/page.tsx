import * as React from 'react';
import {
  Text,
  Theme,
  Container,
  Section,
  Flex,
  Heading,
  Callout,
  Link,
  Code,
  Blockquote,
} from '@radix-ui/themes';
import { NextThemeProvider } from '../next-theme-provider';

export default function Test() {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <NextThemeProvider>
          <Theme asChild>
            <div id="root">
              <Container px="8">
                <Section size="3">
                  <Flex direction="column" gap="9">
                    <Flex direction="column" align="start" gap="4">
                      <Text color="gray" size="2">
                        No color
                      </Text>

                      <Heading>
                        Ambiguous voice of a heart which prefers{' '}
                        <Code variant="ghost">kiwi bowls</Code> to a <Link href="#">zephyr</Link>.
                      </Heading>

                      <Text>
                        Ambiguous voice of a heart which prefers{' '}
                        <Code variant="ghost">kiwi bowls</Code> to a <Link href="#">zephyr</Link>.
                      </Text>

                      <Text>
                        Ambiguous voice of a heart which prefers{' '}
                        <Link href="#">
                          <Code variant="ghost">kiwi bowls</Code>
                        </Link>{' '}
                        to a <Link href="#">zephyr</Link>.
                      </Text>

                      <Text>
                        Ambiguous voice of a heart which{' '}
                        <Link href="#">
                          prefers <Code variant="ghost">kiwi bowls</Code>
                        </Link>{' '}
                        to a <Link href="#">zephyr</Link>.
                      </Text>

                      <Blockquote>
                        Ambiguous voice of a heart which prefers{' '}
                        <Code variant="ghost">kiwi bowls</Code> to a <Link href="#">zephyr</Link>.
                      </Blockquote>

                      <Blockquote>
                        Ambiguous voice of a heart which prefers{' '}
                        <Link href="#">
                          <Code variant="ghost">kiwi bowls</Code>
                        </Link>{' '}
                        to a <Link href="#">zephyr</Link>.
                      </Blockquote>

                      <Blockquote>
                        Ambiguous voice of a heart which{' '}
                        <Link href="#">
                          prefers <Code variant="ghost">kiwi bowls</Code>
                        </Link>{' '}
                        to a <Link href="#">zephyr</Link>.
                      </Blockquote>

                      <Code size="2">
                        Ambiguous voice of a heart which{' '}
                        <Link href="#">
                          prefers <Code variant="ghost">kiwi bowls</Code>
                        </Link>{' '}
                        to a <Link href="#">zephyr</Link>.
                      </Code>

                      <Callout.Root>
                        <Callout.Text>
                          Ambiguous voice of a heart which prefers{' '}
                          <Code variant="ghost">kiwi bowls</Code> to a <Link href="#">zephyr</Link>.
                        </Callout.Text>
                      </Callout.Root>
                    </Flex>

                    <Flex direction="column" align="start" gap="4">
                      <Text color="gray" size="2">
                        No color, high contrast
                      </Text>

                      <Heading highContrast>
                        Ambiguous voice of a heart which prefers{' '}
                        <Code variant="ghost">kiwi bowls</Code> to a <Link href="#">zephyr</Link>.
                      </Heading>

                      <Text highContrast>
                        Ambiguous voice of a heart which prefers{' '}
                        <Code variant="ghost">kiwi bowls</Code> to a <Link href="#">zephyr</Link>.
                      </Text>

                      <Text highContrast>
                        Ambiguous voice of a heart which prefers{' '}
                        <Link href="#">
                          <Code variant="ghost">kiwi bowls</Code>
                        </Link>{' '}
                        to a <Link href="#">zephyr</Link>.
                      </Text>

                      <Text highContrast>
                        Ambiguous voice of a heart which{' '}
                        <Link href="#">
                          prefers <Code variant="ghost">kiwi bowls</Code>
                        </Link>{' '}
                        to a <Link href="#">zephyr</Link>.
                      </Text>

                      <Blockquote highContrast>
                        Ambiguous voice of a heart which prefers{' '}
                        <Code variant="ghost">kiwi bowls</Code> to a <Link href="#">zephyr</Link>.
                      </Blockquote>

                      <Blockquote highContrast>
                        Ambiguous voice of a heart which prefers{' '}
                        <Link href="#">
                          <Code variant="ghost">kiwi bowls</Code>
                        </Link>{' '}
                        to a <Link href="#">zephyr</Link>.
                      </Blockquote>

                      <Blockquote highContrast>
                        Ambiguous voice of a heart which{' '}
                        <Link href="#">
                          prefers <Code variant="ghost">kiwi bowls</Code>
                        </Link>{' '}
                        to a <Link href="#">zephyr</Link>.
                      </Blockquote>

                      <Code highContrast size="2">
                        Ambiguous voice of a heart which{' '}
                        <Link href="#">
                          prefers <Code variant="ghost">kiwi bowls</Code>
                        </Link>{' '}
                        to a <Link href="#">zephyr</Link>.
                      </Code>

                      <Callout.Root highContrast>
                        <Callout.Text>
                          Ambiguous voice of a heart which prefers{' '}
                          <Code variant="ghost">kiwi bowls</Code> to a <Link href="#">zephyr</Link>.
                        </Callout.Text>
                      </Callout.Root>
                    </Flex>

                    <Flex direction="column" align="start" gap="4">
                      <Text color="gray" size="2">
                        All inline components with {'color="indigo"'}
                      </Text>

                      <Heading>
                        Ambiguous voice of a heart which prefers{' '}
                        <Code color="indigo" variant="ghost">
                          kiwi bowls
                        </Code>{' '}
                        to a{' '}
                        <Link color="indigo" href="#">
                          zephyr
                        </Link>
                        .
                      </Heading>

                      <Text>
                        Ambiguous voice of a heart which prefers{' '}
                        <Code color="indigo" variant="ghost">
                          kiwi bowls
                        </Code>{' '}
                        to a{' '}
                        <Link color="indigo" href="#">
                          zephyr
                        </Link>
                        .
                      </Text>

                      <Text>
                        Ambiguous voice of a heart which prefers{' '}
                        <Link color="indigo" href="#">
                          <Code color="indigo" variant="ghost">
                            kiwi bowls
                          </Code>
                        </Link>{' '}
                        to a{' '}
                        <Link color="indigo" href="#">
                          zephyr
                        </Link>
                        .
                      </Text>

                      <Text>
                        Ambiguous voice of a heart which{' '}
                        <Link color="indigo" href="#">
                          prefers{' '}
                          <Code color="indigo" variant="ghost">
                            kiwi bowls
                          </Code>
                        </Link>{' '}
                        to a{' '}
                        <Link color="indigo" href="#">
                          zephyr
                        </Link>
                        .
                      </Text>

                      <Blockquote>
                        Ambiguous voice of a heart which prefers{' '}
                        <Code color="indigo" variant="ghost">
                          kiwi bowls
                        </Code>{' '}
                        to a{' '}
                        <Link color="indigo" href="#">
                          zephyr
                        </Link>
                        .
                      </Blockquote>

                      <Blockquote>
                        Ambiguous voice of a heart which prefers{' '}
                        <Link color="indigo" href="#">
                          <Code color="indigo" variant="ghost">
                            kiwi bowls
                          </Code>
                        </Link>{' '}
                        to a{' '}
                        <Link color="indigo" href="#">
                          zephyr
                        </Link>
                        .
                      </Blockquote>

                      <Blockquote>
                        Ambiguous voice of a heart which{' '}
                        <Link color="indigo" href="#">
                          prefers{' '}
                          <Code color="indigo" variant="ghost">
                            kiwi bowls
                          </Code>
                        </Link>{' '}
                        to a{' '}
                        <Link color="indigo" href="#">
                          zephyr
                        </Link>
                        .
                      </Blockquote>

                      <Code size="2">
                        Ambiguous voice of a heart which{' '}
                        <Link color="indigo" href="#">
                          prefers{' '}
                          <Code color="indigo" variant="ghost">
                            kiwi bowls
                          </Code>
                        </Link>{' '}
                        to a{' '}
                        <Link color="indigo" href="#">
                          zephyr
                        </Link>
                        .
                      </Code>

                      <Callout.Root>
                        <Callout.Text>
                          Ambiguous voice of a heart which prefers{' '}
                          <Code color="indigo" variant="ghost">
                            kiwi bowls
                          </Code>{' '}
                          to a{' '}
                          <Link color="indigo" href="#">
                            zephyr
                          </Link>
                          .
                        </Callout.Text>
                      </Callout.Root>
                    </Flex>

                    <Flex direction="column" align="start" gap="4">
                      <Text color="gray" size="2">
                        All inline components with high contrast
                      </Text>

                      <Heading>
                        Ambiguous voice of a heart which prefers{' '}
                        <Code highContrast variant="ghost">
                          kiwi bowls
                        </Code>{' '}
                        to a{' '}
                        <Link highContrast href="#">
                          zephyr
                        </Link>
                        .
                      </Heading>

                      <Text>
                        Ambiguous voice of a heart which prefers{' '}
                        <Code highContrast variant="ghost">
                          kiwi bowls
                        </Code>{' '}
                        to a{' '}
                        <Link highContrast href="#">
                          zephyr
                        </Link>
                        .
                      </Text>

                      <Text>
                        Ambiguous voice of a heart which prefers{' '}
                        <Link highContrast href="#">
                          <Code highContrast variant="ghost">
                            kiwi bowls
                          </Code>
                        </Link>{' '}
                        to a{' '}
                        <Link highContrast href="#">
                          zephyr
                        </Link>
                        .
                      </Text>

                      <Text>
                        Ambiguous voice of a heart which{' '}
                        <Link highContrast href="#">
                          prefers{' '}
                          <Code highContrast variant="ghost">
                            kiwi bowls
                          </Code>
                        </Link>{' '}
                        to a{' '}
                        <Link highContrast href="#">
                          zephyr
                        </Link>
                        .
                      </Text>

                      <Blockquote>
                        Ambiguous voice of a heart which prefers{' '}
                        <Code highContrast variant="ghost">
                          kiwi bowls
                        </Code>{' '}
                        to a{' '}
                        <Link highContrast href="#">
                          zephyr
                        </Link>
                        .
                      </Blockquote>

                      <Blockquote>
                        Ambiguous voice of a heart which prefers{' '}
                        <Link highContrast href="#">
                          <Code highContrast variant="ghost">
                            kiwi bowls
                          </Code>
                        </Link>{' '}
                        to a{' '}
                        <Link highContrast href="#">
                          zephyr
                        </Link>
                        .
                      </Blockquote>

                      <Blockquote>
                        Ambiguous voice of a heart which{' '}
                        <Link highContrast href="#">
                          prefers{' '}
                          <Code highContrast variant="ghost">
                            kiwi bowls
                          </Code>
                        </Link>{' '}
                        to a{' '}
                        <Link highContrast href="#">
                          zephyr
                        </Link>
                        .
                      </Blockquote>

                      <Code size="2">
                        Ambiguous voice of a heart which{' '}
                        <Link highContrast href="#">
                          prefers{' '}
                          <Code highContrast variant="ghost">
                            kiwi bowls
                          </Code>
                        </Link>{' '}
                        to a{' '}
                        <Link highContrast href="#">
                          zephyr
                        </Link>
                        .
                      </Code>

                      <Callout.Root>
                        <Callout.Text>
                          Ambiguous voice of a heart which prefers{' '}
                          <Code highContrast variant="ghost">
                            kiwi bowls
                          </Code>{' '}
                          to a{' '}
                          <Link highContrast href="#">
                            zephyr
                          </Link>
                          .
                        </Callout.Text>
                      </Callout.Root>
                    </Flex>

                    <Flex direction="column" align="start" gap="4">
                      <Text color="gray" size="2">
                        All inline components with {'color="indigo"'} and high contrast
                      </Text>

                      <Heading>
                        Ambiguous voice of a heart which prefers{' '}
                        <Code color="indigo" highContrast variant="ghost">
                          kiwi bowls
                        </Code>{' '}
                        to a{' '}
                        <Link color="indigo" highContrast href="#">
                          zephyr
                        </Link>
                        .
                      </Heading>

                      <Text>
                        Ambiguous voice of a heart which prefers{' '}
                        <Code color="indigo" highContrast variant="ghost">
                          kiwi bowls
                        </Code>{' '}
                        to a{' '}
                        <Link color="indigo" highContrast href="#">
                          zephyr
                        </Link>
                        .
                      </Text>

                      <Text>
                        Ambiguous voice of a heart which prefers{' '}
                        <Link color="indigo" highContrast href="#">
                          <Code color="indigo" highContrast variant="ghost">
                            kiwi bowls
                          </Code>
                        </Link>{' '}
                        to a{' '}
                        <Link color="indigo" highContrast href="#">
                          zephyr
                        </Link>
                        .
                      </Text>

                      <Text>
                        Ambiguous voice of a heart which{' '}
                        <Link color="indigo" highContrast href="#">
                          prefers{' '}
                          <Code color="indigo" highContrast variant="ghost">
                            kiwi bowls
                          </Code>
                        </Link>{' '}
                        to a{' '}
                        <Link color="indigo" highContrast href="#">
                          zephyr
                        </Link>
                        .
                      </Text>

                      <Blockquote>
                        Ambiguous voice of a heart which prefers{' '}
                        <Code color="indigo" highContrast variant="ghost">
                          kiwi bowls
                        </Code>{' '}
                        to a{' '}
                        <Link color="indigo" highContrast href="#">
                          zephyr
                        </Link>
                        .
                      </Blockquote>

                      <Blockquote>
                        Ambiguous voice of a heart which prefers{' '}
                        <Link color="indigo" highContrast href="#">
                          <Code color="indigo" highContrast variant="ghost">
                            kiwi bowls
                          </Code>
                        </Link>{' '}
                        to a{' '}
                        <Link color="indigo" highContrast href="#">
                          zephyr
                        </Link>
                        .
                      </Blockquote>

                      <Blockquote>
                        Ambiguous voice of a heart which{' '}
                        <Link color="indigo" highContrast href="#">
                          prefers{' '}
                          <Code color="indigo" highContrast variant="ghost">
                            kiwi bowls
                          </Code>
                        </Link>{' '}
                        to a{' '}
                        <Link color="indigo" highContrast href="#">
                          zephyr
                        </Link>
                        .
                      </Blockquote>

                      <Code size="2">
                        Ambiguous voice of a heart which{' '}
                        <Link color="indigo" highContrast href="#">
                          prefers{' '}
                          <Code color="indigo" highContrast variant="ghost">
                            kiwi bowls
                          </Code>
                        </Link>{' '}
                        to a{' '}
                        <Link color="indigo" highContrast href="#">
                          zephyr
                        </Link>
                        .
                      </Code>

                      <Callout.Root>
                        <Callout.Text>
                          Ambiguous voice of a heart which prefers{' '}
                          <Code color="indigo" highContrast variant="ghost">
                            kiwi bowls
                          </Code>{' '}
                          to a{' '}
                          <Link color="indigo" highContrast href="#">
                            zephyr
                          </Link>
                          .
                        </Callout.Text>
                      </Callout.Root>
                    </Flex>

                    <Flex direction="column" align="start" gap="4">
                      <Text color="gray" size="2">
                        All wrapping components with {'color="indigo"'}
                      </Text>

                      <Heading color="indigo">
                        Ambiguous voice of a heart which prefers{' '}
                        <Code variant="ghost">kiwi bowls</Code> to a <Link href="#">zephyr</Link>.
                      </Heading>

                      <Text color="indigo">
                        Ambiguous voice of a heart which prefers{' '}
                        <Code variant="ghost">kiwi bowls</Code> to a <Link href="#">zephyr</Link>.
                      </Text>

                      <Text color="indigo">
                        Ambiguous voice of a heart which prefers{' '}
                        <Link href="#">
                          <Code variant="ghost">kiwi bowls</Code>
                        </Link>{' '}
                        to a <Link href="#">zephyr</Link>.
                      </Text>

                      <Text color="indigo">
                        Ambiguous voice of a heart which{' '}
                        <Link href="#">
                          prefers <Code variant="ghost">kiwi bowls</Code>
                        </Link>{' '}
                        to a <Link href="#">zephyr</Link>.
                      </Text>

                      <Blockquote color="indigo">
                        Ambiguous voice of a heart which prefers{' '}
                        <Code variant="ghost">kiwi bowls</Code> to a <Link href="#">zephyr</Link>.
                      </Blockquote>

                      <Blockquote color="indigo">
                        Ambiguous voice of a heart which prefers{' '}
                        <Link href="#">
                          <Code variant="ghost">kiwi bowls</Code>
                        </Link>{' '}
                        to a <Link href="#">zephyr</Link>.
                      </Blockquote>

                      <Blockquote color="indigo">
                        Ambiguous voice of a heart which{' '}
                        <Link href="#">
                          prefers <Code variant="ghost">kiwi bowls</Code>
                        </Link>{' '}
                        to a <Link href="#">zephyr</Link>.
                      </Blockquote>

                      <Code size="2" color="indigo">
                        Ambiguous voice of a heart which{' '}
                        <Link href="#">
                          prefers <Code variant="ghost">kiwi bowls</Code>
                        </Link>{' '}
                        to a <Link href="#">zephyr</Link>.
                      </Code>

                      <Callout.Root color="indigo">
                        <Callout.Text>
                          Ambiguous voice of a heart which prefers{' '}
                          <Code variant="ghost">kiwi bowls</Code> to a <Link href="#">zephyr</Link>.
                        </Callout.Text>
                      </Callout.Root>
                    </Flex>

                    <Flex direction="column" align="start" gap="4">
                      <Text color="gray" size="2">
                        All wrapping components with {'color="indigo"'} and inline components with
                        high contrast
                      </Text>

                      <Heading color="indigo">
                        Ambiguous voice of a heart which prefers{' '}
                        <Code highContrast variant="ghost">
                          kiwi bowls
                        </Code>{' '}
                        to a{' '}
                        <Link highContrast href="#">
                          zephyr
                        </Link>
                        .
                      </Heading>

                      <Text color="indigo">
                        Ambiguous voice of a heart which prefers{' '}
                        <Code highContrast variant="ghost">
                          kiwi bowls
                        </Code>{' '}
                        to a{' '}
                        <Link highContrast href="#">
                          zephyr
                        </Link>
                        .
                      </Text>

                      <Text color="indigo">
                        Ambiguous voice of a heart which prefers{' '}
                        <Link highContrast href="#">
                          <Code highContrast variant="ghost">
                            kiwi bowls
                          </Code>
                        </Link>{' '}
                        to a{' '}
                        <Link highContrast href="#">
                          zephyr
                        </Link>
                        .
                      </Text>

                      <Text color="indigo">
                        Ambiguous voice of a heart which{' '}
                        <Link highContrast href="#">
                          prefers{' '}
                          <Code highContrast variant="ghost">
                            kiwi bowls
                          </Code>
                        </Link>{' '}
                        to a{' '}
                        <Link highContrast href="#">
                          zephyr
                        </Link>
                        .
                      </Text>

                      <Blockquote color="indigo">
                        Ambiguous voice of a heart which prefers{' '}
                        <Code highContrast variant="ghost">
                          kiwi bowls
                        </Code>{' '}
                        to a{' '}
                        <Link highContrast href="#">
                          zephyr
                        </Link>
                        .
                      </Blockquote>

                      <Blockquote color="indigo">
                        Ambiguous voice of a heart which prefers{' '}
                        <Link highContrast href="#">
                          <Code variant="ghost">kiwi bowls</Code>
                        </Link>{' '}
                        to a{' '}
                        <Link highContrast href="#">
                          zephyr
                        </Link>
                        .
                      </Blockquote>

                      <Blockquote color="indigo">
                        Ambiguous voice of a heart which{' '}
                        <Link highContrast href="#">
                          prefers{' '}
                          <Code highContrast variant="ghost">
                            kiwi bowls
                          </Code>
                        </Link>{' '}
                        to a{' '}
                        <Link highContrast href="#">
                          zephyr
                        </Link>
                        .
                      </Blockquote>

                      <Code size="2" color="indigo">
                        Ambiguous voice of a heart which{' '}
                        <Link highContrast href="#">
                          prefers{' '}
                          <Code highContrast variant="ghost">
                            kiwi bowls
                          </Code>
                        </Link>{' '}
                        to a{' '}
                        <Link highContrast href="#">
                          zephyr
                        </Link>
                        .
                      </Code>

                      <Callout.Root color="indigo">
                        <Callout.Text>
                          Ambiguous voice of a heart which prefers{' '}
                          <Code highContrast variant="ghost">
                            kiwi bowls
                          </Code>{' '}
                          to a{' '}
                          <Link highContrast href="#">
                            zephyr
                          </Link>
                          .
                        </Callout.Text>
                      </Callout.Root>
                    </Flex>

                    <Flex direction="column" align="start" gap="4">
                      <Text color="gray" size="2">
                        All wrapping components with {'color="indigo"'} and inline components with{' '}
                        {'color="indigo"'}
                      </Text>

                      <Heading color="indigo">
                        Ambiguous voice of a heart which prefers{' '}
                        <Code color="indigo" variant="ghost">
                          kiwi bowls
                        </Code>{' '}
                        to a{' '}
                        <Link color="indigo" href="#">
                          zephyr
                        </Link>
                        .
                      </Heading>

                      <Text color="indigo">
                        Ambiguous voice of a heart which prefers{' '}
                        <Code color="indigo" variant="ghost">
                          kiwi bowls
                        </Code>{' '}
                        to a{' '}
                        <Link color="indigo" href="#">
                          zephyr
                        </Link>
                        .
                      </Text>

                      <Text color="indigo">
                        Ambiguous voice of a heart which prefers{' '}
                        <Link color="indigo" href="#">
                          <Code color="indigo" variant="ghost">
                            kiwi bowls
                          </Code>
                        </Link>{' '}
                        to a{' '}
                        <Link color="indigo" href="#">
                          zephyr
                        </Link>
                        .
                      </Text>

                      <Text color="indigo">
                        Ambiguous voice of a heart which{' '}
                        <Link color="indigo" href="#">
                          prefers{' '}
                          <Code color="indigo" variant="ghost">
                            kiwi bowls
                          </Code>
                        </Link>{' '}
                        to a{' '}
                        <Link color="indigo" href="#">
                          zephyr
                        </Link>
                        .
                      </Text>

                      <Blockquote color="indigo">
                        Ambiguous voice of a heart which prefers{' '}
                        <Code color="indigo" variant="ghost">
                          kiwi bowls
                        </Code>{' '}
                        to a{' '}
                        <Link color="indigo" href="#">
                          zephyr
                        </Link>
                        .
                      </Blockquote>

                      <Blockquote color="indigo">
                        Ambiguous voice of a heart which prefers{' '}
                        <Link color="indigo" href="#">
                          <Code variant="ghost">kiwi bowls</Code>
                        </Link>{' '}
                        to a{' '}
                        <Link color="indigo" href="#">
                          zephyr
                        </Link>
                        .
                      </Blockquote>

                      <Blockquote color="indigo">
                        Ambiguous voice of a heart which{' '}
                        <Link color="indigo" href="#">
                          prefers{' '}
                          <Code color="indigo" variant="ghost">
                            kiwi bowls
                          </Code>
                        </Link>{' '}
                        to a{' '}
                        <Link color="indigo" href="#">
                          zephyr
                        </Link>
                        .
                      </Blockquote>

                      <Code size="2" color="indigo">
                        Ambiguous voice of a heart which{' '}
                        <Link color="indigo" href="#">
                          prefers{' '}
                          <Code color="indigo" variant="ghost">
                            kiwi bowls
                          </Code>
                        </Link>{' '}
                        to a{' '}
                        <Link color="indigo" href="#">
                          zephyr
                        </Link>
                        .
                      </Code>

                      <Callout.Root color="indigo">
                        <Callout.Text>
                          Ambiguous voice of a heart which prefers{' '}
                          <Code color="indigo" variant="ghost">
                            kiwi bowls
                          </Code>{' '}
                          to a{' '}
                          <Link color="indigo" href="#">
                            zephyr
                          </Link>
                          .
                        </Callout.Text>
                      </Callout.Root>
                    </Flex>

                    <Flex direction="column" align="start" gap="4">
                      <Text color="gray" size="2">
                        All wrapping components with high contrast
                      </Text>

                      <Heading highContrast>
                        Ambiguous voice of a heart which prefers{' '}
                        <Code variant="ghost">kiwi bowls</Code> to a <Link href="#">zephyr</Link>.
                      </Heading>

                      <Text highContrast>
                        Ambiguous voice of a heart which prefers{' '}
                        <Code variant="ghost">kiwi bowls</Code> to a <Link href="#">zephyr</Link>.
                      </Text>

                      <Text highContrast>
                        Ambiguous voice of a heart which prefers{' '}
                        <Link href="#">
                          <Code variant="ghost">kiwi bowls</Code>
                        </Link>{' '}
                        to a <Link href="#">zephyr</Link>.
                      </Text>

                      <Text highContrast>
                        Ambiguous voice of a heart which{' '}
                        <Link href="#">
                          prefers <Code variant="ghost">kiwi bowls</Code>
                        </Link>{' '}
                        to a <Link href="#">zephyr</Link>.
                      </Text>

                      <Blockquote highContrast>
                        Ambiguous voice of a heart which prefers{' '}
                        <Code variant="ghost">kiwi bowls</Code> to a <Link href="#">zephyr</Link>.
                      </Blockquote>

                      <Blockquote highContrast>
                        Ambiguous voice of a heart which prefers{' '}
                        <Link href="#">
                          <Code variant="ghost">kiwi bowls</Code>
                        </Link>{' '}
                        to a <Link href="#">zephyr</Link>.
                      </Blockquote>

                      <Blockquote highContrast>
                        Ambiguous voice of a heart which{' '}
                        <Link href="#">
                          prefers <Code variant="ghost">kiwi bowls</Code>
                        </Link>{' '}
                        to a <Link href="#">zephyr</Link>.
                      </Blockquote>

                      <Code size="2" highContrast>
                        Ambiguous voice of a heart which{' '}
                        <Link href="#">
                          prefers <Code variant="ghost">kiwi bowls</Code>
                        </Link>{' '}
                        to a <Link href="#">zephyr</Link>.
                      </Code>

                      <Callout.Root highContrast>
                        <Callout.Text>
                          Ambiguous voice of a heart which prefers{' '}
                          <Code variant="ghost">kiwi bowls</Code> to a <Link href="#">zephyr</Link>.
                        </Callout.Text>
                      </Callout.Root>
                    </Flex>

                    <Flex direction="column" align="start" gap="4">
                      <Text color="gray" size="2">
                        All wrapping components with {'color="indigo"'} and high contrast
                      </Text>

                      <Heading color="indigo" highContrast>
                        Ambiguous voice of a heart which prefers{' '}
                        <Code variant="ghost">kiwi bowls</Code> to a <Link href="#">zephyr</Link>.
                      </Heading>

                      <Text color="indigo" highContrast>
                        Ambiguous voice of a heart which prefers{' '}
                        <Code variant="ghost">kiwi bowls</Code> to a <Link href="#">zephyr</Link>.
                      </Text>

                      <Text color="indigo" highContrast>
                        Ambiguous voice of a heart which prefers{' '}
                        <Link href="#">
                          <Code variant="ghost">kiwi bowls</Code>
                        </Link>{' '}
                        to a <Link href="#">zephyr</Link>.
                      </Text>

                      <Text color="indigo" highContrast>
                        Ambiguous voice of a heart which{' '}
                        <Link href="#">
                          prefers <Code variant="ghost">kiwi bowls</Code>
                        </Link>{' '}
                        to a <Link href="#">zephyr</Link>.
                      </Text>

                      <Blockquote color="indigo" highContrast>
                        Ambiguous voice of a heart which prefers{' '}
                        <Code variant="ghost">kiwi bowls</Code> to a <Link href="#">zephyr</Link>.
                      </Blockquote>

                      <Blockquote color="indigo" highContrast>
                        Ambiguous voice of a heart which prefers{' '}
                        <Link href="#">
                          <Code variant="ghost">kiwi bowls</Code>
                        </Link>{' '}
                        to a <Link href="#">zephyr</Link>.
                      </Blockquote>

                      <Blockquote color="indigo" highContrast>
                        Ambiguous voice of a heart which{' '}
                        <Link href="#">
                          prefers <Code variant="ghost">kiwi bowls</Code>
                        </Link>{' '}
                        to a <Link href="#">zephyr</Link>.
                      </Blockquote>

                      <Code size="2" color="indigo" highContrast>
                        Ambiguous voice of a heart which{' '}
                        <Link href="#">
                          prefers <Code variant="ghost">kiwi bowls</Code>
                        </Link>{' '}
                        to a <Link href="#">zephyr</Link>.
                      </Code>

                      <Callout.Root color="indigo" highContrast>
                        <Callout.Text>
                          Ambiguous voice of a heart which prefers{' '}
                          <Code variant="ghost">kiwi bowls</Code> to a <Link href="#">zephyr</Link>.
                        </Callout.Text>
                      </Callout.Root>
                    </Flex>
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
