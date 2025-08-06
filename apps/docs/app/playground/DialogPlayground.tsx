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
  Badge,
} from '@kushagradhawan/kookie-ui';
import { Info } from 'lucide-react';

const sizes = ['1', '2', '3', '4'] as const;
const alignments = ['start', 'center'] as const;

// Helper function to get appropriate text size based on dialog size
const getTextSize = (dialogSize: string): '1' | '2' | '3' => {
  const sizeMap = { '1': '1', '2': '2', '3': '2', '4': '3' } as const;
  return sizeMap[dialogSize as keyof typeof sizeMap];
};

// Helper function to get appropriate heading size based on dialog size
const getHeadingSize = (dialogSize: string): '2' | '3' | '4' | '5' => {
  const sizeMap = { '1': '2', '2': '3', '3': '4', '4': '5' } as const;
  return sizeMap[dialogSize as keyof typeof sizeMap];
};

export default function DialogPlayground() {
  return (
    <Flex direction="column" gap="6">
      <Flex direction="column" gap="2">
        <Badge size="2" variant="soft" color="orange" style={{ alignSelf: 'flex-start' }}>
          Updated
        </Badge>
        <Heading size="6" weight="bold">
          Dialog
        </Heading>
        <Text size="3" color="gray">
          A modal dialog that overlays the page content for focused tasks or messages.
        </Text>
      </Flex>

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
                            <Button variant="ghost" color="gray">
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
                      Confirmation Dialog
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Dialog.Root>
                      <Dialog.Trigger>
                        <Button variant="soft">Confirm Action</Button>
                      </Dialog.Trigger>
                      <Dialog.Content>
                        <Dialog.Title>Confirm Changes</Dialog.Title>
                        <Dialog.Description>
                          Are you sure you want to save these changes? This will update your
                          preferences.
                        </Dialog.Description>
                        <Flex gap="3" mt="4" justify="end">
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
                    <Text size="2">Confirmation dialog for user actions</Text>
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
                          <Dialog.Title size={getHeadingSize(size)}>
                            Dialog Size {size}
                          </Dialog.Title>
                          <Dialog.Description size={getTextSize(size)}>
                            This dialog demonstrates size {size} with appropriate content scaling.
                          </Dialog.Description>
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
