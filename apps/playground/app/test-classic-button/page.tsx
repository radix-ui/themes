import * as React from 'react';
import {
  Theme,
  ThemePanel,
  Container,
  Section,
  Flex,
  Button,
  themeAccentScalesGrouped,
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
                  {themeAccentScalesGrouped.map(({ label, values }) => (
                    <React.Fragment key={label}>
                      <Text as="p" weight="bold" mt="6" mb="4">
                        {label}
                      </Text>
                      {values.map((color) => (
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
                    </React.Fragment>
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
