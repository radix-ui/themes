import * as React from 'react';
import {
  Theme,
  ThemePanel,
  Container,
  Section,
  Flex,
  Button,
  themeAccentColorsOrdered,
  Text,
} from '@radix-ui/themes';
import { Pencil2Icon } from '@radix-ui/react-icons';

export default function Test() {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Theme asChild>
          <div id="root">
            <ThemePanel defaultOpen={false} />
            <Container px="5">
              <Section>
                <Flex direction="column" gap="2">
                  {themeAccentColorsOrdered.map((color) => (
                    <Flex key={color} gap="2">
                      <Button variant="classic" color={color}>
                        <Pencil2Icon />
                        Edit
                      </Button>
                      <Button variant="classic" color={color} highContrast>
                        <Pencil2Icon />
                        Edit
                      </Button>
                      <Button variant="solid" color={color} ml="4">
                        <Pencil2Icon />
                        Edit
                      </Button>
                      <Button variant="solid" color={color} highContrast>
                        <Pencil2Icon />
                        Edit
                      </Button>
                      <Button variant="soft" color={color} ml="4">
                        <Pencil2Icon />
                        Edit
                      </Button>
                      <Button variant="soft" color={color} highContrast>
                        <Pencil2Icon />
                        Edit
                      </Button>
                    </Flex>
                  ))}
                </Flex>
              </Section>
            </Container>
          </div>
        </Theme>
      </body>
    </html>
  );
}
