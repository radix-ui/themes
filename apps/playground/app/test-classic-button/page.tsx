import * as React from 'react';
import {
  Theme,
  ThemePanel,
  Container,
  Section,
  Flex,
  Button,
  themeAccentScalesOrdered,
  Text,
} from '@radix-ui/themes';
import { Pencil2Icon } from '@radix-ui/react-icons';

export default function Test() {
  return (
    <Theme asChild backgroundColor="gray">
      <html lang="en">
        <body>
          <div id="root">
            <ThemePanel initiallyHidden />
            <Container px="5">
              <Section>
                <Flex direction="column" gap="2">
                  {themeAccentScalesOrdered.map((color) => (
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
        </body>
      </html>
    </Theme>
  );
}
