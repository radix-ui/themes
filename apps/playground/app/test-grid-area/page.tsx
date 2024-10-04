import * as React from 'react';
import {
  Theme,
  Flex,
  Grid,
  Text,
  Button,
  Container,
  Section,
  Card,
  IconButton,
  Box,
  Heading,
} from '@radix-ui/themes';
import { NextThemeProvider } from '../next-theme-provider';
import { GridIcon, SunIcon } from '@radix-ui/react-icons';

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
                    <Grid
                      align="center"
                      gap={{ initial: '3', sm: '4', lg: '5' }}
                      columns="auto 1fr"
                      rows="auto 1fr"
                      areas='"icon title" ". body"'
                    >
                      <Box asChild gridArea="icon">
                        <GridIcon />
                      </Box>
                      <Box asChild gridArea="title">
                        <Heading as="h4">Named Areas</Heading>
                      </Box>
                      <Box asChild gridArea="body">
                        <Text>
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, officiis
                          labore commodi maxime corporis expedita aliquid vero praesentium dolor id
                          numquam illo est, quod voluptatem mollitia inventore pariatur odit
                          delectus.
                        </Text>
                      </Box>
                    </Grid>
                  </Card>
                </Section>

                <Section size="3">
                  <Card
                    size={{ initial: '3', sm: '4', lg: '5' }}
                    style={{ maxWidth: 500 }}
                    mx="auto"
                  >
                    <Grid
                      align="center"
                      gap={{ initial: '3', sm: '4', lg: '5' }}
                      columns={{
                        initial: 'auto repeat(2, 1fr)',
                        sm: 'auto repeat(3, 1fr)',
                        lg: 'auto repeat(4, 1fr)',
                      }}
                      rows="auto 1fr"
                    >
                      <Box asChild gridArea="'1 / 1 / span 1 / span 1'">
                        <GridIcon />
                      </Box>
                      <Box
                        asChild
                        gridArea={{
                          initial: '1 / 2 / span 1 / span 2',
                          sm: '1 / 2 / span 1 / span 3',
                          lg: '1 / 2 / span 1 / span 4',
                        }}
                      >
                        <Heading as="h4">Placed Areas</Heading>
                      </Box>
                      <Box
                        asChild
                        gridArea={{
                          initial: '2 / 2 / span 1 / span 2',
                          sm: '2 / 2 / span 1 / span 3',
                          lg: '2 / 2 / span 1 / span 4',
                        }}
                      >
                        <Text>
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, officiis
                          labore commodi maxime corporis expedita aliquid vero praesentium dolor id
                          numquam illo est, quod voluptatem mollitia inventore pariatur odit
                          delectus.
                        </Text>
                      </Box>
                    </Grid>
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
