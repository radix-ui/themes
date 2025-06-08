import React from 'react';
import {
  Popover,
  Button,
  IconButton,
  Flex,
  Grid,
  Heading,
  Text,
  Tabs,
  Box,
} from '@kushagradhawan/kookie-ui';
import { Info, Settings, HelpCircle, User, Calendar, Bell, ChevronDown } from 'lucide-react';

export function PopoverExample() {
  const sizes = ['1', '2', '3', '4'] as const;
  const colors = ['gray', 'blue', 'green', 'orange', 'red', 'purple'] as const;

  return (
    <Flex direction="column" gap="6">
      <Flex direction="column" gap="1">
        <Heading size="5">Popover</Heading>
        <Text size="2" color="gray">
          Display rich content in a floating panel triggered by user interaction.
        </Text>
      </Flex>

      <Tabs.Root defaultValue="basic">
        <Tabs.List>
          <Tabs.Trigger value="basic">Basic usage</Tabs.Trigger>
          <Tabs.Trigger value="sizes">Sizes</Tabs.Trigger>
          <Tabs.Trigger value="positioning">Positioning</Tabs.Trigger>
          <Tabs.Trigger value="triggers">Trigger variations</Tabs.Trigger>
          <Tabs.Trigger value="content">Content examples</Tabs.Trigger>
        </Tabs.List>

        {/* Basic Usage Tab */}
        <Tabs.Content value="basic">
          <Flex pt="6" direction="column" gap="6">
            <Text size="3" weight="medium">
              Basic Examples
            </Text>

            <Grid
              columns="3"
              gap="6"
              style={{
                gridTemplateColumns: 'repeat(3, 1fr)',
                alignItems: 'start',
              }}
            >
              <Flex direction="column" gap="3">
                <Text size="2" color="gray" weight="medium">
                  Simple Popover
                </Text>
                <Popover.Root>
                  <Popover.Trigger>
                    <Button variant="outline">
                      Click me <ChevronDown />
                    </Button>
                  </Popover.Trigger>
                  <Popover.Content>
                    <Flex direction="column" gap="3">
                      <Heading size="3">Quick Actions</Heading>
                      <Text size="2" color="gray">
                        This is a simple popover with some content inside.
                      </Text>
                      <Flex gap="2">
                        <Button size="1" variant="solid">
                          Action
                        </Button>
                        <Popover.Close>
                          <Button size="1" variant="soft" color="gray">
                            Close
                          </Button>
                        </Popover.Close>
                      </Flex>
                    </Flex>
                  </Popover.Content>
                </Popover.Root>
              </Flex>

              <Flex direction="column" gap="3">
                <Text size="2" color="gray" weight="medium">
                  Info Popover
                </Text>
                <Popover.Root>
                  <Popover.Trigger>
                    <IconButton variant="ghost" aria-label="More info">
                      <Info />
                    </IconButton>
                  </Popover.Trigger>
                  <Popover.Content>
                    <Flex direction="column" gap="2">
                      <Heading size="2">Information</Heading>
                      <Text size="2">
                        This feature helps you manage your workflow more efficiently.
                      </Text>
                    </Flex>
                  </Popover.Content>
                </Popover.Root>
              </Flex>

              <Flex direction="column" gap="3">
                <Text size="2" color="gray" weight="medium">
                  Settings Popover
                </Text>
                <Popover.Root>
                  <Popover.Trigger>
                    <IconButton variant="soft" color="gray" aria-label="Settings">
                      <Settings />
                    </IconButton>
                  </Popover.Trigger>
                  <Popover.Content>
                    <Flex direction="column" gap="3">
                      <Heading size="3">Settings</Heading>
                      <Flex direction="column" gap="2">
                        <Button variant="ghost" size="2" style={{ justifyContent: 'flex-start' }}>
                          Account Settings
                        </Button>
                        <Button variant="ghost" size="2" style={{ justifyContent: 'flex-start' }}>
                          Privacy Settings
                        </Button>
                        <Button variant="ghost" size="2" style={{ justifyContent: 'flex-start' }}>
                          Notifications
                        </Button>
                      </Flex>
                    </Flex>
                  </Popover.Content>
                </Popover.Root>
              </Flex>
            </Grid>
          </Flex>
        </Tabs.Content>

        {/* Sizes Tab */}
        <Tabs.Content value="sizes">
          <Flex pt="6" direction="column" gap="4">
            <Text size="3" weight="medium">
              Popover Sizes
            </Text>
            <Grid
              columns="4"
              gap="6"
              style={{
                gridTemplateColumns: 'repeat(4, 1fr)',
                alignItems: 'start',
              }}
            >
              {sizes.map((size) => (
                <Flex key={size} direction="column" gap="3">
                  <Text size="2" color="gray" weight="medium">
                    Size {size}
                  </Text>
                  <Popover.Root>
                    <Popover.Trigger>
                      <Button variant="outline" size="2">
                        Size {size}
                      </Button>
                    </Popover.Trigger>
                    <Popover.Content size={size}>
                      <Flex direction="column" gap="2">
                        <Heading
                          size={size === '1' ? '2' : size === '2' ? '3' : size === '3' ? '4' : '5'}
                        >
                          Content
                        </Heading>
                        <Text size={size === '1' ? '1' : '2'}>
                          This popover uses size {size}. The padding and border radius adjust
                          accordingly.
                        </Text>
                        <Button
                          size={size === '1' ? '1' : '2'}
                          variant="solid"
                          style={{ alignSelf: 'flex-start' }}
                        >
                          Action
                        </Button>
                      </Flex>
                    </Popover.Content>
                  </Popover.Root>
                </Flex>
              ))}
            </Grid>
          </Flex>
        </Tabs.Content>

        {/* Positioning Tab */}
        <Tabs.Content value="positioning">
          <Flex pt="6" direction="column" gap="6">
            <Text size="3" weight="medium">
              Positioning Options
            </Text>

            <Flex direction="column" gap="4">
              <Text size="2" weight="medium">
                Side Positioning
              </Text>
              <Grid
                columns="4"
                gap="4"
                style={{
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  alignItems: 'center',
                  justifyItems: 'center',
                }}
              >
                <Popover.Root>
                  <Popover.Trigger>
                    <Button variant="outline">Top</Button>
                  </Popover.Trigger>
                  <Popover.Content side="top">
                    <Text size="2">Content on top</Text>
                  </Popover.Content>
                </Popover.Root>

                <Popover.Root>
                  <Popover.Trigger>
                    <Button variant="outline">Right</Button>
                  </Popover.Trigger>
                  <Popover.Content side="right">
                    <Text size="2">Content on right</Text>
                  </Popover.Content>
                </Popover.Root>

                <Popover.Root>
                  <Popover.Trigger>
                    <Button variant="outline">Bottom</Button>
                  </Popover.Trigger>
                  <Popover.Content side="bottom">
                    <Text size="2">Content on bottom</Text>
                  </Popover.Content>
                </Popover.Root>

                <Popover.Root>
                  <Popover.Trigger>
                    <Button variant="outline">Left</Button>
                  </Popover.Trigger>
                  <Popover.Content side="left">
                    <Text size="2">Content on left</Text>
                  </Popover.Content>
                </Popover.Root>
              </Grid>
            </Flex>

            <Flex direction="column" gap="4">
              <Text size="2" weight="medium">
                Alignment Options
              </Text>
              <Grid
                columns="3"
                gap="4"
                style={{
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  alignItems: 'center',
                  justifyItems: 'center',
                }}
              >
                <Popover.Root>
                  <Popover.Trigger>
                    <Button variant="outline">Start</Button>
                  </Popover.Trigger>
                  <Popover.Content align="start">
                    <Text size="2">Aligned to start</Text>
                  </Popover.Content>
                </Popover.Root>

                <Popover.Root>
                  <Popover.Trigger>
                    <Button variant="outline">Center</Button>
                  </Popover.Trigger>
                  <Popover.Content align="center">
                    <Text size="2">Aligned to center</Text>
                  </Popover.Content>
                </Popover.Root>

                <Popover.Root>
                  <Popover.Trigger>
                    <Button variant="outline">End</Button>
                  </Popover.Trigger>
                  <Popover.Content align="end">
                    <Text size="2">Aligned to end</Text>
                  </Popover.Content>
                </Popover.Root>
              </Grid>
            </Flex>
          </Flex>
        </Tabs.Content>

        {/* Trigger Variations Tab */}
        <Tabs.Content value="triggers">
          <Flex pt="6" direction="column" gap="6">
            <Text size="3" weight="medium">
              Different Trigger Types
            </Text>

            <Grid
              columns="3"
              gap="6"
              style={{
                gridTemplateColumns: 'repeat(3, 1fr)',
                alignItems: 'start',
              }}
            >
              <Flex direction="column" gap="3">
                <Text size="2" color="gray" weight="medium">
                  Button Triggers
                </Text>
                <Flex direction="column" gap="3">
                  {colors.slice(0, 3).map((color) => (
                    <Popover.Root key={color}>
                      <Popover.Trigger>
                        <Button variant="soft" color={color}>
                          {color} button
                        </Button>
                      </Popover.Trigger>
                      <Popover.Content>
                        <Flex direction="column" gap="2">
                          <Heading size="3">
                            {color.charAt(0).toUpperCase() + color.slice(1)} Content
                          </Heading>
                          <Text size="2">This popover was triggered by a {color} button.</Text>
                        </Flex>
                      </Popover.Content>
                    </Popover.Root>
                  ))}
                </Flex>
              </Flex>

              <Flex direction="column" gap="3">
                <Text size="2" color="gray" weight="medium">
                  Icon Button Triggers
                </Text>
                <Flex gap="2">
                  <Popover.Root>
                    <Popover.Trigger>
                      <IconButton variant="soft" color="blue" aria-label="User">
                        <User />
                      </IconButton>
                    </Popover.Trigger>
                    <Popover.Content>
                      <Flex direction="column" gap="2">
                        <Heading size="3">User Profile</Heading>
                        <Text size="2">Quick access to your profile settings.</Text>
                      </Flex>
                    </Popover.Content>
                  </Popover.Root>

                  <Popover.Root>
                    <Popover.Trigger>
                      <IconButton variant="soft" color="green" aria-label="Calendar">
                        <Calendar />
                      </IconButton>
                    </Popover.Trigger>
                    <Popover.Content>
                      <Flex direction="column" gap="2">
                        <Heading size="3">Calendar</Heading>
                        <Text size="2">View your upcoming events.</Text>
                      </Flex>
                    </Popover.Content>
                  </Popover.Root>

                  <Popover.Root>
                    <Popover.Trigger>
                      <IconButton variant="soft" color="orange" aria-label="Notifications">
                        <Bell />
                      </IconButton>
                    </Popover.Trigger>
                    <Popover.Content>
                      <Flex direction="column" gap="2">
                        <Heading size="3">Notifications</Heading>
                        <Text size="2">You have 3 new notifications.</Text>
                      </Flex>
                    </Popover.Content>
                  </Popover.Root>
                </Flex>
              </Flex>

              <Flex direction="column" gap="3">
                <Text size="2" color="gray" weight="medium">
                  Text Triggers
                </Text>
                <Flex direction="column" gap="3">
                  <Popover.Root>
                    <Popover.Trigger>
                      <Text size="2" style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                        Click for help
                      </Text>
                    </Popover.Trigger>
                    <Popover.Content>
                      <Flex direction="column" gap="2">
                        <Heading size="3">Help Information</Heading>
                        <Text size="2">
                          This is helpful information triggered by clicking text.
                        </Text>
                      </Flex>
                    </Popover.Content>
                  </Popover.Root>

                  <Popover.Root>
                    <Popover.Trigger>
                      <Flex gap="1" align="center" style={{ cursor: 'pointer' }}>
                        <Text size="2">More info</Text>
                        <HelpCircle size={14} />
                      </Flex>
                    </Popover.Trigger>
                    <Popover.Content>
                      <Flex direction="column" gap="2">
                        <Heading size="3">Additional Details</Heading>
                        <Text size="2">Here are some additional details about this feature.</Text>
                      </Flex>
                    </Popover.Content>
                  </Popover.Root>
                </Flex>
              </Flex>
            </Grid>
          </Flex>
        </Tabs.Content>

        {/* Content Examples Tab */}
        <Tabs.Content value="content">
          <Flex pt="6" direction="column" gap="6">
            <Text size="3" weight="medium">
              Rich Content Examples
            </Text>

            <Grid
              columns="2"
              gap="6"
              style={{
                gridTemplateColumns: 'repeat(2, 1fr)',
                alignItems: 'start',
              }}
            >
              <Flex direction="column" gap="3">
                <Text size="2" color="gray" weight="medium">
                  Form in Popover
                </Text>
                <Popover.Root>
                  <Popover.Trigger>
                    <Button variant="outline">Quick Form</Button>
                  </Popover.Trigger>
                  <Popover.Content size="3">
                    <Flex direction="column" gap="4">
                      <Heading size="3">Quick Sign Up</Heading>
                      <Flex direction="column" gap="3">
                        <Flex direction="column" gap="2">
                          <Text size="2" weight="medium">
                            Name
                          </Text>
                          <Box
                            style={{
                              padding: '8px',
                              border: '1px solid var(--gray-6)',
                              borderRadius: '4px',
                            }}
                          >
                            <Text size="2" color="gray">
                              Enter your name
                            </Text>
                          </Box>
                        </Flex>
                        <Flex direction="column" gap="2">
                          <Text size="2" weight="medium">
                            Email
                          </Text>
                          <Box
                            style={{
                              padding: '8px',
                              border: '1px solid var(--gray-6)',
                              borderRadius: '4px',
                            }}
                          >
                            <Text size="2" color="gray">
                              Enter your email
                            </Text>
                          </Box>
                        </Flex>
                        <Flex gap="2" justify="end">
                          <Popover.Close>
                            <Button variant="soft" color="gray" size="2">
                              Cancel
                            </Button>
                          </Popover.Close>
                          <Button variant="solid" size="2">
                            Sign Up
                          </Button>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Popover.Content>
                </Popover.Root>
              </Flex>

              <Flex direction="column" gap="3">
                <Text size="2" color="gray" weight="medium">
                  Menu in Popover
                </Text>
                <Popover.Root>
                  <Popover.Trigger>
                    <Button variant="outline">Actions Menu</Button>
                  </Popover.Trigger>
                  <Popover.Content>
                    <Flex direction="column" gap="1">
                      <Button variant="ghost" size="2" style={{ justifyContent: 'flex-start' }}>
                        Edit Item
                      </Button>
                      <Button variant="ghost" size="2" style={{ justifyContent: 'flex-start' }}>
                        Duplicate Item
                      </Button>
                      <Button variant="ghost" size="2" style={{ justifyContent: 'flex-start' }}>
                        Share Item
                      </Button>
                      <Box
                        style={{ height: '1px', background: 'var(--gray-6)', margin: '4px 0' }}
                      />
                      <Button
                        variant="ghost"
                        size="2"
                        color="red"
                        style={{ justifyContent: 'flex-start' }}
                      >
                        Delete Item
                      </Button>
                    </Flex>
                  </Popover.Content>
                </Popover.Root>
              </Flex>

              <Flex direction="column" gap="3">
                <Text size="2" color="gray" weight="medium">
                  Rich Content
                </Text>
                <Popover.Root>
                  <Popover.Trigger>
                    <Button variant="outline">Product Info</Button>
                  </Popover.Trigger>
                  <Popover.Content size="4" maxWidth="320px">
                    <Flex direction="column" gap="3">
                      <Box
                        style={{
                          height: '120px',
                          background: 'var(--gray-3)',
                          borderRadius: '6px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Text size="2" color="gray">
                          Product Image
                        </Text>
                      </Box>
                      <Flex direction="column" gap="2">
                        <Heading size="3">Amazing Product</Heading>
                        <Text size="2" color="gray">
                          This is a wonderful product that will solve all your problems and make
                          your life better.
                        </Text>
                        <Flex justify="between" align="center">
                          <Text size="3" weight="bold">
                            $99.99
                          </Text>
                          <Button size="2" variant="solid">
                            Add to Cart
                          </Button>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Popover.Content>
                </Popover.Root>
              </Flex>

              <Flex direction="column" gap="3">
                <Text size="2" color="gray" weight="medium">
                  List Content
                </Text>
                <Popover.Root>
                  <Popover.Trigger>
                    <Button variant="outline">Recent Items</Button>
                  </Popover.Trigger>
                  <Popover.Content>
                    <Flex direction="column" gap="3">
                      <Heading size="3">Recent Files</Heading>
                      <Flex direction="column" gap="2">
                        {['Document.pdf', 'Presentation.pptx', 'Spreadsheet.xlsx', 'Notes.txt'].map(
                          (file) => (
                            <Flex
                              key={file}
                              justify="between"
                              align="center"
                              style={{ padding: '4px 0' }}
                            >
                              <Text size="2">{file}</Text>
                              <Button variant="ghost" size="1">
                                Open
                              </Button>
                            </Flex>
                          ),
                        )}
                      </Flex>
                      <Button variant="soft" size="2" style={{ alignSelf: 'flex-start' }}>
                        View All Files
                      </Button>
                    </Flex>
                  </Popover.Content>
                </Popover.Root>
              </Flex>
            </Grid>
          </Flex>
        </Tabs.Content>
      </Tabs.Root>
    </Flex>
  );
}
