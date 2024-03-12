import * as React from 'react';
import {
  Theme,
  Flex,
  Grid,
  TextField,
  Text,
  Select,
  TextArea,
  Button,
  Container,
  Section,
  Card,
  IconButton,
} from '@radix-ui/themes';
import { NextThemeProvider } from '../next-theme-provider';
import { SunIcon } from '@radix-ui/react-icons';

export default function Test() {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <NextThemeProvider>
          <Theme asChild>
            <div id="root">
              <Container px="8">
                <Section size="3">
                  <Card
                    size={{ initial: '3', sm: '4', lg: '5' }}
                    style={{ maxWidth: 500 }}
                    mx="auto"
                  >
                    <Flex direction="column" gap={{ initial: '3', sm: '4', lg: '5' }}>
                      <Grid gap={{ initial: '1', sm: '2', lg: '3' }}>
                        <Text size={{ initial: '1', sm: '2', lg: '3' }} weight="bold">
                          Email
                        </Text>
                        <TextField.Root
                          size={{ initial: '1', sm: '2', lg: '3' }}
                          variant="classic"
                          placeholder="Your email"
                        />
                      </Grid>
                      <Grid gap={{ initial: '1', sm: '2', lg: '3' }}>
                        <Text size={{ initial: '1', sm: '2', lg: '3' }} weight="bold">
                          Subject
                        </Text>
                        <Select.Root
                          defaultValue="customer"
                          size={{ initial: '1', sm: '2', lg: '3' }}
                        >
                          <Select.Trigger variant="classic" />
                          <Select.Content>
                            <Select.Item value="customer">Customer feedback</Select.Item>
                            <Select.Item value="help">Help</Select.Item>
                          </Select.Content>
                        </Select.Root>
                      </Grid>
                      <Grid gap={{ initial: '1', sm: '2', lg: '3' }}>
                        <Text size={{ initial: '1', sm: '2', lg: '3' }} weight="bold">
                          Feedback
                        </Text>
                        <TextArea
                          size={{ initial: '1', sm: '2', lg: '3' }}
                          variant="classic"
                          placeholder="Your feedback"
                        />
                      </Grid>
                      <Grid columns="2" gap="2">
                        <Button size={{ initial: '1', sm: '2', lg: '3' }} variant="surface">
                          Back
                        </Button>
                        <Button size={{ initial: '1', sm: '2', lg: '3' }} variant="classic">
                          Submit
                        </Button>
                      </Grid>
                    </Flex>
                  </Card>
                </Section>

                <Section size="3">
                  <Flex align="center" gap={{ initial: '3', sm: '4', lg: '5' }}>
                    <IconButton variant="ghost" size={{ initial: '1', sm: '2', lg: '3' }}>
                      <SunIcon />
                    </IconButton>
                    <Button variant="ghost" size={{ initial: '1', sm: '2', lg: '3' }}>
                      Change theme
                    </Button>
                    <Button size={{ initial: '1', sm: '2', lg: '3' }}>Change theme</Button>
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
