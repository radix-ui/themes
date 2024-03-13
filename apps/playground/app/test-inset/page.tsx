import * as React from 'react';
import {
  Theme,
  Container,
  Section,
  Grid,
  Card,
  Text,
  AspectRatio,
  Box,
  Inset,
  Popover,
  Button,
  Flex,
  HoverCard,
  Dialog,
  Table,
  AlertDialog,
  Separator,
  ThemePanel,
  RadioCards,
  CheckboxCards,
} from '@radix-ui/themes';
import { NextThemeProvider } from '../next-theme-provider';

export default function Test() {
  const image = (
    <img
      src="https://images.unsplash.com/photo-1479030160180-b1860951d696?&auto=format&fit=crop&w=1200&q=80"
      alt="A house in a forest"
      style={{ objectFit: 'cover', width: '100%', height: '100%' }}
    />
  );
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <NextThemeProvider>
          <Theme asChild>
            <div id="root">
              <ThemePanel />

              <Container>
                <Section>
                  <Grid columns="3" gap="9">
                    <Box>
                      <Card size="3">
                        <Text as="p" size="5" weight="bold" trim="start">
                          Title
                        </Text>
                        <Text as="p" size="2" color="gray" mb="2">
                          Subtitle
                        </Text>

                        <Text as="p" trim="end">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.
                          Praesent libero. Sed cursus ante dapibus diam. Sed nisi.
                        </Text>

                        <Inset side="bottom" clip="padding-box" pt="current">
                          <AspectRatio ratio={16 / 9}>{image}</AspectRatio>
                        </Inset>
                      </Card>

                      <Box my="5">
                        <CheckboxCards.Root columns="1" defaultValue={['1']} size="3">
                          <CheckboxCards.Item value="1">
                            <Box asChild width="64px">
                              <Inset clip="padding-box" side="left">
                                <AspectRatio ratio={1}>{image}</AspectRatio>
                              </Inset>
                            </Box>
                            <Box as="span">Checkbox Card 1</Box>
                          </CheckboxCards.Item>

                          <CheckboxCards.Item value="2">
                            <Box asChild width="64px">
                              <Inset clip="padding-box" side="left">
                                <AspectRatio ratio={1}>{image}</AspectRatio>
                              </Inset>
                            </Box>
                            <Box as="span">Checkbox Card 2</Box>
                          </CheckboxCards.Item>
                        </CheckboxCards.Root>
                      </Box>
                    </Box>

                    <Box>
                      <Card size="3">
                        <Text as="p" size="5" weight="bold" trim="start">
                          Title
                        </Text>
                        <Text as="p" size="2" color="gray" mb="2">
                          Subtitle
                        </Text>

                        <Text as="p" trim="end">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.
                          Praesent libero. Sed cursus ante dapibus diam. Sed nisi.
                        </Text>

                        <Inset side="x" py="current">
                          <Separator size="4" />
                        </Inset>

                        <Flex justify="end" gap="4">
                          <Button color="gray" variant="surface">
                            Cancel
                          </Button>
                          <Button>Save</Button>
                        </Flex>
                      </Card>

                      <Box my="5">
                        <RadioCards.Root columns="1" defaultValue="1" size="3">
                          <RadioCards.Item value="1">
                            <Box flexGrow="1">Radio Card 1</Box>
                            <Box asChild width="64px">
                              <Inset clip="padding-box" side="right">
                                <AspectRatio ratio={1}>{image}</AspectRatio>
                              </Inset>
                            </Box>
                          </RadioCards.Item>

                          <RadioCards.Item value="2">
                            <Box flexGrow="1">Radio Card 2</Box>
                            <Box asChild width="64px">
                              <Inset clip="padding-box" side="right">
                                <AspectRatio ratio={1}>{image}</AspectRatio>
                              </Inset>
                            </Box>
                          </RadioCards.Item>
                        </RadioCards.Root>
                      </Box>
                    </Box>

                    <Flex direction="column" gap="3">
                      <div>
                        <Popover.Root>
                          <Popover.Trigger>
                            <Button variant="solid">Popover</Button>
                          </Popover.Trigger>
                          <Popover.Content>
                            <Grid columns="1fr 1fr" style={{ width: 400 }}>
                              <div>
                                <Text as="p" size="3">
                                  Jan Tschichold was a German calligrapher, typographer and book
                                  designer. He played a significant role in the development of
                                  graphic design in the 20th century.
                                </Text>
                              </div>
                              <Inset side="right" pl="current">
                                {image}
                              </Inset>
                            </Grid>
                          </Popover.Content>
                        </Popover.Root>
                      </div>

                      <div>
                        <HoverCard.Root>
                          <HoverCard.Trigger>
                            <Button variant="solid">Hover Card</Button>
                          </HoverCard.Trigger>
                          <HoverCard.Content style={{ width: 400 }}>
                            <Flex>
                              <Inset side="left" pr="current">
                                {image}
                              </Inset>
                              <div>
                                <Text as="p" size="2">
                                  Jan Tschichold was a German calligrapher, typographer and book
                                  designer. He played a significant role in the development of
                                  graphic design in the 20th century.
                                </Text>
                              </div>
                            </Flex>
                          </HoverCard.Content>
                        </HoverCard.Root>
                      </div>

                      <div>
                        <Dialog.Root>
                          <Dialog.Trigger>
                            <Button variant="solid">Dialog</Button>
                          </Dialog.Trigger>
                          <Dialog.Content>
                            <Dialog.Title>Users</Dialog.Title>
                            <Dialog.Description>
                              Here are the users that have access to this project.
                            </Dialog.Description>

                            <Inset side="x" my="5">
                              <TableExample />
                            </Inset>

                            <Flex gap="3" justify="end">
                              <Dialog.Close>
                                <Button variant="soft" color="gray">
                                  Cancel
                                </Button>
                              </Dialog.Close>
                              <Dialog.Close>
                                <Button variant="solid">Share</Button>
                              </Dialog.Close>
                            </Flex>
                          </Dialog.Content>
                        </Dialog.Root>
                      </div>

                      <div>
                        <AlertDialog.Root>
                          <AlertDialog.Trigger>
                            <Button variant="solid">Alert Dialog.</Button>
                          </AlertDialog.Trigger>
                          <AlertDialog.Content style={{ maxWidth: 450 }}>
                            <AlertDialog.Title>Delete Users</AlertDialog.Title>
                            <AlertDialog.Description>
                              Are you sure you want to delete the following users? This action
                              cannot be undone.
                            </AlertDialog.Description>

                            <Inset side="x" my="5">
                              <TableExample />
                            </Inset>

                            <Flex gap="3" justify="end">
                              <AlertDialog.Cancel>
                                <Button variant="soft" color="gray">
                                  Cancel
                                </Button>
                              </AlertDialog.Cancel>
                              <AlertDialog.Action>
                                <Button variant="solid" color="red">
                                  Revoke link
                                </Button>
                              </AlertDialog.Action>
                            </Flex>
                          </AlertDialog.Content>
                        </AlertDialog.Root>
                      </div>
                    </Flex>
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

function TableExample() {
  return (
    <Table.Root style={{ backgroundColor: 'var(--gray-a1)' }}>
      <Table.Header
        style={{ backgroundColor: 'var(--gray-a2)', borderTop: '1px solid var(--gray-a5)' }}
      >
        <Table.Row>
          <Table.ColumnHeaderCell>Full name</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Group</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.RowHeaderCell>Andy</Table.RowHeaderCell>
          <Table.Cell>andy@workos.com</Table.Cell>
          <Table.Cell>Developer</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.RowHeaderCell>Benoit</Table.RowHeaderCell>
          <Table.Cell>benoit@workos.com</Table.Cell>
          <Table.Cell>Admin</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.RowHeaderCell>Lucas</Table.RowHeaderCell>
          <Table.Cell>lucas@workos.com</Table.Cell>
          <Table.Cell>Developer</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.RowHeaderCell>Vlad</Table.RowHeaderCell>
          <Table.Cell>vlad@workos.com</Table.Cell>
          <Table.Cell>Designer</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Root>
  );
}
