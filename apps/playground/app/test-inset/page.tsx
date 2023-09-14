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
  PopoverRoot,
  PopoverTrigger,
  Button,
  PopoverContent,
  Flex,
  HoverCardRoot,
  HoverCardTrigger,
  HoverCardContent,
  Link,
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
  TableRoot,
  TableHeader,
  TableRow,
  TableColumnHeaderCell,
  TableBody,
  TableRowHeaderCell,
  TableCell,
  AlertDialogRoot,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  Separator,
  ThemePanel,
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
                    </Box>

                    <Grid rows="3" gap="3">
                      <div>
                        <PopoverRoot>
                          <PopoverTrigger>
                            <Button variant="solid">Popover</Button>
                          </PopoverTrigger>
                          <PopoverContent>
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
                          </PopoverContent>
                        </PopoverRoot>
                      </div>

                      <div>
                        <HoverCardRoot>
                          <HoverCardTrigger>
                            <Link>Hover Card</Link>
                          </HoverCardTrigger>
                          <HoverCardContent style={{ width: 400 }}>
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
                          </HoverCardContent>
                        </HoverCardRoot>
                      </div>

                      <div>
                        <DialogRoot>
                          <DialogTrigger>
                            <Button variant="solid">Dialog</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogTitle>Users</DialogTitle>
                            <DialogDescription>
                              Here are the users that have access to this project.
                            </DialogDescription>

                            <Inset side="x" my="5">
                              <TableExample />
                            </Inset>

                            <Flex gap="3" justify="end">
                              <DialogClose>
                                <Button variant="soft" color="gray">
                                  Cancel
                                </Button>
                              </DialogClose>
                              <DialogClose>
                                <Button variant="solid">Share</Button>
                              </DialogClose>
                            </Flex>
                          </DialogContent>
                        </DialogRoot>
                      </div>

                      <div>
                        <AlertDialogRoot>
                          <AlertDialogTrigger>
                            <Button variant="solid">Alert Dialog</Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent style={{ maxWidth: 450 }}>
                            <AlertDialogTitle>Delete Users</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete the following users? This action
                              cannot be undone.
                            </AlertDialogDescription>

                            <Inset side="x" my="5">
                              <TableExample />
                            </Inset>

                            <Flex gap="3" justify="end">
                              <AlertDialogCancel>
                                <Button variant="soft" color="gray">
                                  Cancel
                                </Button>
                              </AlertDialogCancel>
                              <AlertDialogAction>
                                <Button variant="solid" color="red">
                                  Revoke link
                                </Button>
                              </AlertDialogAction>
                            </Flex>
                          </AlertDialogContent>
                        </AlertDialogRoot>
                      </div>
                    </Grid>
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
    <TableRoot style={{ backgroundColor: 'var(--gray-a1)' }}>
      <TableHeader
        style={{ backgroundColor: 'var(--gray-a2)', borderTop: '1px solid var(--gray-a5)' }}
      >
        <TableRow>
          <TableColumnHeaderCell>Full name</TableColumnHeaderCell>
          <TableColumnHeaderCell>Email</TableColumnHeaderCell>
          <TableColumnHeaderCell>Group</TableColumnHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableRowHeaderCell>Andy</TableRowHeaderCell>
          <TableCell>andy@workos.com</TableCell>
          <TableCell>Developer</TableCell>
        </TableRow>
        <TableRow>
          <TableRowHeaderCell>Benoit</TableRowHeaderCell>
          <TableCell>benoit@workos.com</TableCell>
          <TableCell>Admin</TableCell>
        </TableRow>
        <TableRow>
          <TableRowHeaderCell>Lucas</TableRowHeaderCell>
          <TableCell>lucas@workos.com</TableCell>
          <TableCell>Developer</TableCell>
        </TableRow>
        <TableRow>
          <TableRowHeaderCell>Vlad</TableRowHeaderCell>
          <TableCell>vlad@workos.com</TableCell>
          <TableCell>Designer</TableCell>
        </TableRow>
      </TableBody>
    </TableRoot>
  );
}
