'use client';

import {
  Theme,
  Box,
  Flex,
  Heading,
  Button,
  TextField,
  TextArea,
  Select,
  Card,
  Tabs,
  Avatar,
  Dialog,
  Popover,
  DropdownMenu,
  Container,
  Image,
  Text,
  Separator,
  Badge,
  Grid,
} from '@kushagradhawan/kookie-ui';

export default function NestedBackdropFilterTest() {
  return (
    <Theme>
      {/* Background Image */}
      <Box position="fixed" top="0" left="0" style={{ zIndex: -1 }} height="100vh" width="100vw">
        <Image
          src="https://images.unsplash.com/photo-1741145018917-216c9275bc3a?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="3D Render Background"
          width="100%"
          height="100%"
          variant="blur"
          style={{ opacity: 0.6 }}
          wrapperStyle={{ width: '100%', height: '100%', display: 'block' }}
          fit="cover"
        />
      </Box>

      <Container size="4" py="8">
        <Flex direction="column" gap="8">
          {/* Header */}
          <Box>
            <Flex align="center" gap="3" mb="4">
              <Heading size="8">Backdrop Filter Tests</Heading>
              <Badge variant="soft" color="blue">
                No Flicker Zone
              </Badge>
            </Flex>
            <Text size="4" color="gray" style={{ maxWidth: 600 }}>
              Testing components that transition from transparent to background inside translucent
              containers. All interactions should be smooth without visual glitches.
            </Text>
          </Box>

          {/* Test Grid */}
          <Grid columns={{ initial: '1', md: '2' }} gap="6">
            {/* Dialog Test */}
            <Card size="3" style={{ height: 'fit-content' }}>
              <Flex direction="column" gap="4">
                <Box>
                  <Flex align="center" gap="2" mb="2">
                    <Heading size="5">Dialog Context</Heading>
                    <Badge variant="outline" size="1">
                      Ghost Buttons
                    </Badge>
                  </Flex>
                  <Text size="2" color="gray">
                    Ghost buttons inside translucent dialogs
                  </Text>
                </Box>

                <Dialog.Root>
                  <Dialog.Trigger>
                    <Button variant="solid" size="2">
                      Test Dialog
                    </Button>
                  </Dialog.Trigger>
                  <Dialog.Content style={{ maxWidth: 400 }}>
                    <Dialog.Title size="5">Dialog Test</Dialog.Title>
                    <Dialog.Description size="2" mb="4" color="gray">
                      Hover these buttons - they should not flicker
                    </Dialog.Description>

                    <Flex direction="column" gap="2">
                      <Button variant="ghost" size="2">
                        Primary Ghost
                      </Button>
                      <Button variant="ghost" size="2" color="red">
                        Danger Ghost
                      </Button>
                      <Button variant="ghost" size="2" color="green">
                        Success Ghost
                      </Button>
                    </Flex>

                    <Flex gap="3" mt="5" justify="end">
                      <Dialog.Close>
                        <Button variant="soft" color="gray" size="2">
                          Cancel
                        </Button>
                      </Dialog.Close>
                      <Dialog.Close>
                        <Button size="2">Confirm</Button>
                      </Dialog.Close>
                    </Flex>
                  </Dialog.Content>
                </Dialog.Root>
              </Flex>
            </Card>

            {/* Popover Test */}
            <Card size="3" style={{ height: 'fit-content' }}>
              <Flex direction="column" gap="4">
                <Box>
                  <Flex align="center" gap="2" mb="2">
                    <Heading size="5">Popover Context</Heading>
                    <Badge variant="outline" size="1">
                      Form Elements
                    </Badge>
                  </Flex>
                  <Text size="2" color="gray">
                    Form inputs with ghost/surface variants
                  </Text>
                </Box>

                <Popover.Root>
                  <Popover.Trigger>
                    <Button variant="outline" size="2">
                      Test Popover
                    </Button>
                  </Popover.Trigger>
                  <Popover.Content style={{ width: 320 }}>
                    <Flex direction="column" gap="3">
                      <Box>
                        <Heading size="4" mb="1">
                          Form Test
                        </Heading>
                        <Text size="1" color="gray">
                          Hover inputs to test backdrop-filter
                        </Text>
                      </Box>

                      <TextField.Root placeholder="Ghost variant" variant="ghost" size="2" />
                      <TextField.Root placeholder="Surface variant" variant="surface" size="2" />
                      <TextArea placeholder="Ghost textarea" variant="ghost" size="2" />

                      <Select.Root>
                        <Select.Trigger variant="ghost" placeholder="Ghost select" />
                        <Select.Content>
                          <Select.Item value="option1">Option 1</Select.Item>
                          <Select.Item value="option2">Option 2</Select.Item>
                        </Select.Content>
                      </Select.Root>

                      <Flex align="center" gap="2">
                        <Avatar size="2" variant="outline" fallback="T" />
                        <Button variant="ghost" size="1">
                          Ghost Action
                        </Button>
                      </Flex>
                    </Flex>
                  </Popover.Content>
                </Popover.Root>
              </Flex>
            </Card>

            {/* Dropdown Test */}
            <Card size="3" style={{ height: 'fit-content' }}>
              <Flex direction="column" gap="4">
                <Box>
                  <Flex align="center" gap="2" mb="2">
                    <Heading size="5">Dropdown Context</Heading>
                    <Badge variant="outline" size="1">
                      Nested Components
                    </Badge>
                  </Flex>
                  <Text size="2" color="gray">
                    Components nested inside dropdown menus
                  </Text>
                </Box>

                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <Button variant="outline" size="2">
                      Test Dropdown
                    </Button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content>
                    <DropdownMenu.Label>Menu with Components</DropdownMenu.Label>
                    <DropdownMenu.Separator />

                    <Box p="3">
                      <Flex direction="column" gap="2">
                        <Button variant="ghost" size="1">
                          Menu Ghost Button
                        </Button>
                        <TextField.Root size="1" placeholder="Ghost field" variant="ghost" />
                        <Flex align="center" gap="2">
                          <Avatar size="1" variant="outline" fallback="M" />
                          <Text size="1">Menu Avatar</Text>
                        </Flex>
                      </Flex>
                    </Box>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </Flex>
            </Card>

            {/* Card Test */}
            <Card size="3" style={{ height: 'fit-content' }}>
              <Flex direction="column" gap="4">
                <Box>
                  <Flex align="center" gap="2" mb="2">
                    <Heading size="5">Card Context</Heading>
                    <Badge variant="outline" size="1">
                      Translucent
                    </Badge>
                  </Flex>
                  <Text size="2" color="gray">
                    Components inside translucent cards
                  </Text>
                </Box>

                <Card panelBackground="translucent">
                  <Box p="4">
                    <Flex direction="column" gap="3">
                      <Box>
                        <Text weight="bold" size="3">
                          Translucent Card
                        </Text>
                        <Text size="1" color="gray">
                          Test backdrop-filter behavior
                        </Text>
                      </Box>

                      <Button variant="ghost" size="2">
                        Ghost in Card
                      </Button>
                      <TextField.Root placeholder="Ghost field" variant="ghost" size="2" />
                      <TextArea placeholder="Surface textarea" variant="surface" size="2" />

                      <Flex align="center" gap="2">
                        <Avatar size="2" variant="outline" fallback="C" />
                        <Text size="2">Outline Avatar</Text>
                      </Flex>
                    </Flex>
                  </Box>
                </Card>
              </Flex>
            </Card>

            {/* Nested Cards Test */}
            <Card size="3" style={{ height: 'fit-content' }}>
              <Flex direction="column" gap="4">
                <Box>
                  <Flex align="center" gap="2" mb="2">
                    <Heading size="5">Nested Cards</Heading>
                    <Badge variant="outline" size="1">
                      Deep Nesting
                    </Badge>
                  </Flex>
                  <Text size="2" color="gray">
                    Cards nested inside other translucent cards
                  </Text>
                </Box>

                <Card panelBackground="translucent">
                  <Box p="3">
                    <Flex direction="column" gap="3">
                      <Text weight="bold" size="2">
                        Outer Card
                      </Text>

                      <Card panelBackground="translucent">
                        <Box p="3">
                          <Flex direction="column" gap="2">
                            <Text weight="bold" size="1">
                              Inner Card
                            </Text>
                            <Button variant="ghost" size="1">
                              Nested Ghost
                            </Button>
                            <TextField.Root size="1" placeholder="Nested field" variant="ghost" />
                          </Flex>
                        </Box>
                      </Card>

                      <Button variant="ghost" size="2">
                        Outer Ghost
                      </Button>
                    </Flex>
                  </Box>
                </Card>
              </Flex>
            </Card>

            {/* Tabs Test */}
            <Card size="3" style={{ height: 'fit-content' }}>
              <Flex direction="column" gap="4">
                <Box>
                  <Flex align="center" gap="2" mb="2">
                    <Heading size="5">Tab Context</Heading>
                    <Badge variant="outline" size="1">
                      Hover States
                    </Badge>
                  </Flex>
                  <Text size="2" color="gray">
                    Tab triggers and content with components
                  </Text>
                </Box>

                <Tabs.Root defaultValue="tab1">
                  <Tabs.List>
                    <Tabs.Trigger value="tab1">Tab One</Tabs.Trigger>
                    <Tabs.Trigger value="tab2">Tab Two</Tabs.Trigger>
                    <Tabs.Trigger value="tab3">Tab Three</Tabs.Trigger>
                  </Tabs.List>

                  <Box pt="4">
                    <Tabs.Content value="tab1">
                      <Flex direction="column" gap="2">
                        <Text size="2" weight="bold">
                          Tab Content
                        </Text>
                        <Button variant="ghost" size="2">
                          Ghost in Tab
                        </Button>
                        <TextField.Root placeholder="Ghost field" variant="ghost" size="2" />
                      </Flex>
                    </Tabs.Content>

                    <Tabs.Content value="tab2">
                      <Text size="2">Second tab content</Text>
                    </Tabs.Content>

                    <Tabs.Content value="tab3">
                      <Text size="2">Third tab content</Text>
                    </Tabs.Content>
                  </Box>
                </Tabs.Root>
              </Flex>
            </Card>
          </Grid>

          {/* Interactive Cards Section */}
          <Box>
            <Flex align="center" gap="2" mb="4">
              <Heading size="6">Interactive Ghost Cards</Heading>
              <Badge variant="soft" color="green">
                Clickable
              </Badge>
            </Flex>
            <Text size="2" color="gray" mb="4">
              These cards use the ghost variant and are interactive buttons. Hover should show
              smooth backdrop-filter.
            </Text>

            <Grid columns={{ initial: '1', sm: '2', md: '3' }} gap="4">
              <Card asChild variant="ghost" style={{ cursor: 'pointer', padding: '16px' }}>
                <button>
                  <Flex direction="column" gap="2" align="start">
                    <Text weight="bold" size="3">
                      Interactive Card 1
                    </Text>
                    <Text size="2" color="gray">
                      Click me after hovering
                    </Text>
                    <Badge variant="soft" size="1">
                      Ghost Variant
                    </Badge>
                  </Flex>
                </button>
              </Card>

              <Card asChild variant="ghost" style={{ cursor: 'pointer', padding: '16px' }}>
                <button>
                  <Flex direction="column" gap="2" align="start">
                    <Text weight="bold" size="3">
                      Interactive Card 2
                    </Text>
                    <Text size="2" color="gray">
                      Smooth transitions
                    </Text>
                    <Badge variant="soft" size="1" color="blue">
                      No Flicker
                    </Badge>
                  </Flex>
                </button>
              </Card>

              <Card asChild variant="ghost" style={{ cursor: 'pointer', padding: '16px' }}>
                <button>
                  <Flex direction="column" gap="2" align="start">
                    <Text weight="bold" size="3">
                      Interactive Card 3
                    </Text>
                    <Text size="2" color="gray">
                      Perfect backdrop-filter
                    </Text>
                    <Badge variant="soft" size="1" color="green">
                      Working
                    </Badge>
                  </Flex>
                </button>
              </Card>
            </Grid>
          </Box>

          {/* Footer */}
          <Separator />

          <Card variant="soft">
            <Box p="4">
              <Flex direction="column" gap="2">
                <Text weight="bold" size="3">
                  Expected Behavior
                </Text>
                <Text size="2" color="gray" style={{ lineHeight: 1.6 }}>
                  All components should transition smoothly from transparent to background on
                  hover/focus without any flickering or visual glitches. The backdrop-filter is
                  automatically disabled when components are inside translucent containers to
                  prevent nested backdrop-filter conflicts.
                </Text>
              </Flex>
            </Box>
          </Card>
        </Flex>
      </Container>
    </Theme>
  );
}
