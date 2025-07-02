'use client';

import React from 'react';
import {
  Dialog,
  Button,
  Text,
  Flex,
  Box,
  Heading,
  Tabs,
  Table,
  IconButton,
} from '@kushagradhawan/kookie-ui';
import { Settings, Info } from 'lucide-react';

const sizes = ['1', '2', '3', '4'] as const;
const alignments = ['start', 'center'] as const;

export default function DialogPlayground() {
  return (
    <Flex direction="column" gap="6">
      <Heading size="6" weight="bold">
        Dialog
      </Heading>

      <Tabs.Root defaultValue="basic">
        <Tabs.List size="2">
          <Tabs.Trigger value="basic">Basic Examples</Tabs.Trigger>
          <Tabs.Trigger value="sizes">Sizes</Tabs.Trigger>
          <Tabs.Trigger value="alignments">Alignments</Tabs.Trigger>
        </Tabs.List>

        {/* Basic Examples Tab */}
        <Tabs.Content value="basic">
          <Box pt="4">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell style={{ width: '200px' }}>
                    <Text size="1" color="gray">
                      Dialog Type
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '200px' }}>
                    <Text size="1" color="gray">
                      Trigger
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '300px' }}>
                    <Text size="1" color="gray">
                      Description
                    </Text>
                  </Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Simple Dialog
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Dialog.Root>
                      <Dialog.Trigger>
                        <Button variant="soft">
                          <Info />
                          Open Dialog
                        </Button>
                      </Dialog.Trigger>
                      <Dialog.Content>
                        <Dialog.Title>Welcome to Kookie UI</Dialog.Title>
                        <Dialog.Description>
                          This is a simple dialog with a title and description. You can put any
                          content here.
                        </Dialog.Description>
                        <Flex gap="3" mt="4" justify="end">
                          <Dialog.Close>
                            <Button variant="soft" color="gray">
                              Cancel
                            </Button>
                          </Dialog.Close>
                          <Dialog.Close>
                            <Button>Got it</Button>
                          </Dialog.Close>
                        </Flex>
                      </Dialog.Content>
                    </Dialog.Root>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="2">Basic dialog with title, description, and action buttons</Text>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Settings Dialog
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Dialog.Root>
                      <Dialog.Trigger>
                        <IconButton variant="ghost">
                          <Settings />
                        </IconButton>
                      </Dialog.Trigger>
                      <Dialog.Content>
                        <Dialog.Title>Settings</Dialog.Title>
                        <Dialog.Description>
                          Manage your account settings and preferences.
                        </Dialog.Description>
                        <Box mt="4">
                          <Flex direction="column" gap="3">
                            <Box>
                              <Text size="2" weight="medium">
                                Notifications
                              </Text>
                              <Text size="1" color="gray">
                                Manage how you receive notifications
                              </Text>
                            </Box>
                            <Box>
                              <Text size="2" weight="medium">
                                Privacy
                              </Text>
                              <Text size="1" color="gray">
                                Control your privacy settings
                              </Text>
                            </Box>
                            <Box>
                              <Text size="2" weight="medium">
                                Account
                              </Text>
                              <Text size="1" color="gray">
                                Update your account information
                              </Text>
                            </Box>
                          </Flex>
                        </Box>
                        <Flex gap="3" mt="6" justify="end">
                          <Dialog.Close>
                            <Button variant="soft" color="gray">
                              Cancel
                            </Button>
                          </Dialog.Close>
                          <Dialog.Close>
                            <Button>Save Changes</Button>
                          </Dialog.Close>
                        </Flex>
                      </Dialog.Content>
                    </Dialog.Root>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="2">Settings dialog with structured content and icon trigger</Text>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table.Root>
          </Box>
        </Tabs.Content>

        {/* Sizes Tab */}
        <Tabs.Content value="sizes">
          <Box pt="4">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell style={{ width: '120px' }}>
                    <Text size="1" color="gray">
                      Size
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '200px' }}>
                    <Text size="1" color="gray">
                      Trigger
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '300px' }}>
                    <Text size="1" color="gray">
                      Description
                    </Text>
                  </Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {sizes.map((size) => (
                  <Table.Row key={size}>
                    <Table.RowHeaderCell>
                      <Text size="1" color="gray">
                        Size {size}
                      </Text>
                    </Table.RowHeaderCell>
                    <Table.Cell>
                      <Dialog.Root>
                        <Dialog.Trigger>
                          <Button variant="soft" size={size}>
                            Open {size}
                          </Button>
                        </Dialog.Trigger>
                        <Dialog.Content size={size}>
                          <Dialog.Title>Dialog Size {size}</Dialog.Title>
                          <Dialog.Description>
                            This dialog demonstrates size {size} with appropriate padding and
                            spacing.
                          </Dialog.Description>
                          <Box mt="4">
                            <Text size="2">
                              Content area scales with the dialog size. Larger sizes provide more
                              space for complex content.
                            </Text>
                          </Box>
                          <Flex gap="3" mt="4" justify="end">
                            <Dialog.Close>
                              <Button variant="soft" color="gray">
                                Close
                              </Button>
                            </Dialog.Close>
                          </Flex>
                        </Dialog.Content>
                      </Dialog.Root>
                    </Table.Cell>
                    <Table.Cell>
                      <Text size="2">
                        {size === '1' && 'Compact dialog for simple messages'}
                        {size === '2' && 'Standard dialog for most use cases'}
                        {size === '3' && 'Larger dialog for detailed content'}
                        {size === '4' && 'Maximum size for complex layouts'}
                      </Text>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </Tabs.Content>

        {/* Alignments Tab */}
        <Tabs.Content value="alignments">
          <Box pt="4">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell style={{ width: '120px' }}>
                    <Text size="1" color="gray">
                      Alignment
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '200px' }}>
                    <Text size="1" color="gray">
                      Trigger
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '300px' }}>
                    <Text size="1" color="gray">
                      Description
                    </Text>
                  </Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {alignments.map((align) => (
                  <Table.Row key={align}>
                    <Table.RowHeaderCell>
                      <Text size="1" color="gray" style={{ textTransform: 'capitalize' }}>
                        {align}
                      </Text>
                    </Table.RowHeaderCell>
                    <Table.Cell>
                      <Dialog.Root>
                        <Dialog.Trigger>
                          <Button variant="soft" size="2">
                            {align === 'center' ? 'Center Aligned' : 'Top Aligned'}
                          </Button>
                        </Dialog.Trigger>
                        <Dialog.Content align={align}>
                          <Dialog.Title>
                            {align === 'center' ? 'Centered Dialog' : 'Top Aligned Dialog'}
                          </Dialog.Title>
                          <Dialog.Description>
                            This dialog is aligned to the {align} of the viewport.
                          </Dialog.Description>
                          <Box mt="4">
                            <Text size="2">
                              {align === 'center'
                                ? 'Centered alignment is ideal for most dialogs as it provides balanced visual weight.'
                                : 'Top alignment is useful for dialogs that might expand or when you want to preserve reading flow.'}
                            </Text>
                          </Box>
                          <Flex gap="3" mt="4" justify="end">
                            <Dialog.Close>
                              <Button variant="soft" color="gray">
                                Close
                              </Button>
                            </Dialog.Close>
                          </Flex>
                        </Dialog.Content>
                      </Dialog.Root>
                    </Table.Cell>
                    <Table.Cell>
                      <Text size="2">
                        {align === 'center' && 'Dialog appears in the center of the viewport'}
                        {align === 'start' && 'Dialog appears near the top of the viewport'}
                      </Text>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </Tabs.Content>
      </Tabs.Root>
    </Flex>
  );
}
