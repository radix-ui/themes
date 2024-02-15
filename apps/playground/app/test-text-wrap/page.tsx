import * as React from 'react';
import {
  Theme,
  Grid,
  Text,
  Container,
  Section,
  Card,
  Heading,
  Code,
  ScrollArea,
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
                  <Grid columns="3" gap="5">
                    <Card size="3">
                      <ScrollArea>
                        <Heading size="3" mb="2">
                          Default
                        </Heading>
                        <Text size="3" as="p">
                          Under a sky as clear as a sapphire, the audacious wind embarked on yet
                          another sojourn.
                        </Text>
                      </ScrollArea>
                    </Card>

                    <Card size="3">
                      <Heading size="3" mb="2">
                        <Code variant="ghost" color="gray" highContrast>
                          {'wrap="wrap"'}
                        </Code>
                      </Heading>
                      <Text size="3" as="p" wrap="wrap">
                        Under a sky as clear as a sapphire, the audacious wind embarked on yet
                        another sojourn.
                      </Text>
                    </Card>

                    <Card size="3">
                      <Heading size="3" mb="2">
                        <Code variant="ghost" color="gray" highContrast>
                          {'wrap="nowrap"'}
                        </Code>
                      </Heading>
                      <Text size="3" as="p" wrap="nowrap">
                        Under a sky as clear as a sapphire, the audacious wind embarked on yet
                        another sojourn.
                      </Text>
                    </Card>

                    <Card size="3">
                      <Heading size="3" mb="2">
                        <Code variant="ghost" color="gray" highContrast>
                          {'wrap="balance"'}
                        </Code>
                      </Heading>
                      <Text size="3" as="p" wrap="balance">
                        Under a sky as clear as a sapphire, the audacious wind embarked on yet
                        another sojourn.
                      </Text>
                    </Card>

                    <Card size="3">
                      <Heading size="3" mb="2">
                        <Code variant="ghost" color="gray" highContrast>
                          {'wrap="pretty"'}
                        </Code>
                      </Heading>
                      <Text size="3" as="p" wrap="pretty">
                        Under a sky as clear as a sapphire, the audacious wind embarked on yet
                        another sojourn.
                      </Text>
                    </Card>

                    <Card size="3">
                      <Heading size="3" mb="2">
                        <Code variant="ghost" color="gray" highContrast>
                          {'truncate'}
                        </Code>
                      </Heading>
                      <Text size="3" as="p" truncate>
                        Under a sky as clear as a sapphire, the audacious wind embarked on yet
                        another sojourn.
                      </Text>
                    </Card>
                  </Grid>
                </Section>
              </Container>
            </div>
          </Theme>
        </NextThemeProvider>
      </body>
    </html>
  );
}
