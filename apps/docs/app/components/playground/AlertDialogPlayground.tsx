'use client';

import React from 'react';
import {
  AlertDialog,
  Button,
  Text,
  Flex,
  Box,
  Heading,
  Tabs,
  Table,
  IconButton,
} from '@kushagradhawan/kookie-ui';
import { Trash2, AlertTriangle, UserX } from 'lucide-react';

const sizes = ['1', '2', '3', '4'] as const;
const alignments = ['start', 'center'] as const;

export default function AlertDialogPlayground() {
  return (
    <Flex direction="column" gap="6">
      <Heading size="6" weight="bold">
        Alert Dialog
      </Heading>
      <Text size="3" color="gray" mt="2">
        A modal dialog that interrupts the user with important content and expects a response.
      </Text>

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
                      Alert Type
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
                      Delete Confirmation
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <AlertDialog.Root>
                      <AlertDialog.Trigger>
                        <Button variant="soft">
                          <Trash2 />
                          Delete
                        </Button>
                      </AlertDialog.Trigger>
                      <AlertDialog.Content>
                        <AlertDialog.Title>Delete Item</AlertDialog.Title>
                        <AlertDialog.Description>
                          Are you sure you want to delete this item? This action cannot be undone.
                        </AlertDialog.Description>
                        <Flex gap="3" mt="4" justify="end">
                          <AlertDialog.Cancel>
                            <Button variant="soft" color="gray">
                              Cancel
                            </Button>
                          </AlertDialog.Cancel>
                          <AlertDialog.Action>
                            <Button color="red">Delete</Button>
                          </AlertDialog.Action>
                        </Flex>
                      </AlertDialog.Content>
                    </AlertDialog.Root>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="2">Destructive action requiring user confirmation</Text>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Warning Alert
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <AlertDialog.Root>
                      <AlertDialog.Trigger>
                        <Button variant="soft">
                          <AlertTriangle />
                          Warning
                        </Button>
                      </AlertDialog.Trigger>
                      <AlertDialog.Content>
                        <AlertDialog.Title>Warning</AlertDialog.Title>
                        <AlertDialog.Description>
                          This action may have unintended consequences. Please review your changes
                          before proceeding.
                        </AlertDialog.Description>
                        <Flex gap="3" mt="4" justify="end">
                          <AlertDialog.Cancel>
                            <Button variant="ghost" color="gray">
                              Review
                            </Button>
                          </AlertDialog.Cancel>
                          <AlertDialog.Action>
                            <Button variant="solid" color="orange">
                              Proceed
                            </Button>
                          </AlertDialog.Action>
                        </Flex>
                      </AlertDialog.Content>
                    </AlertDialog.Root>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="2">Warning alert for potentially risky actions</Text>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Remove User
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <AlertDialog.Root>
                      <AlertDialog.Trigger>
                        <IconButton variant="soft">
                          <UserX />
                        </IconButton>
                      </AlertDialog.Trigger>
                      <AlertDialog.Content>
                        <AlertDialog.Title>Remove User</AlertDialog.Title>
                        <AlertDialog.Description>
                          Are you sure you want to remove this user from the project? They will lose
                          access immediately.
                        </AlertDialog.Description>
                        <Flex gap="3" mt="4" justify="end">
                          <AlertDialog.Cancel>
                            <Button variant="soft" color="gray">
                              Cancel
                            </Button>
                          </AlertDialog.Cancel>
                          <AlertDialog.Action>
                            <Button color="red">Remove User</Button>
                          </AlertDialog.Action>
                        </Flex>
                      </AlertDialog.Content>
                    </AlertDialog.Root>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="2">User management action with icon trigger</Text>
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
                      <AlertDialog.Root>
                        <AlertDialog.Trigger>
                          <Button variant="outline" size={size} color="red">
                            Delete {size}
                          </Button>
                        </AlertDialog.Trigger>
                        <AlertDialog.Content size={size}>
                          <AlertDialog.Title>Delete Confirmation</AlertDialog.Title>
                          <AlertDialog.Description>
                            This alert dialog demonstrates size {size} with appropriate padding and
                            spacing.
                          </AlertDialog.Description>
                          <Box mt="4">
                            <Text size="2">
                              Alert dialogs scale with size. Larger sizes provide more space for
                              detailed warnings.
                            </Text>
                          </Box>
                          <Flex gap="3" mt="4" justify="end">
                            <AlertDialog.Cancel>
                              <Button variant="soft" color="gray">
                                Cancel
                              </Button>
                            </AlertDialog.Cancel>
                            <AlertDialog.Action>
                              <Button color="red">Delete</Button>
                            </AlertDialog.Action>
                          </Flex>
                        </AlertDialog.Content>
                      </AlertDialog.Root>
                    </Table.Cell>
                    <Table.Cell>
                      <Text size="2">
                        {size === '1' && 'Compact alert for simple confirmations'}
                        {size === '2' && 'Standard alert for most use cases'}
                        {size === '3' && 'Larger alert for detailed warnings'}
                        {size === '4' && 'Maximum size for complex confirmations'}
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
                      <AlertDialog.Root>
                        <AlertDialog.Trigger>
                          <Button variant="soft" size="2" color="red">
                            {align === 'center' ? 'Center Alert' : 'Top Alert'}
                          </Button>
                        </AlertDialog.Trigger>
                        <AlertDialog.Content align={align}>
                          <AlertDialog.Title>
                            {align === 'center' ? 'Centered Alert' : 'Top Aligned Alert'}
                          </AlertDialog.Title>
                          <AlertDialog.Description>
                            This alert dialog is aligned to the {align} of the viewport.
                          </AlertDialog.Description>
                          <Box mt="4">
                            <Text size="2">
                              {align === 'center'
                                ? 'Centered alignment draws attention to critical actions.'
                                : 'Top alignment maintains reading flow for less critical alerts.'}
                            </Text>
                          </Box>
                          <Flex gap="3" mt="4" justify="end">
                            <AlertDialog.Cancel>
                              <Button variant="soft" color="gray">
                                Cancel
                              </Button>
                            </AlertDialog.Cancel>
                            <AlertDialog.Action>
                              <Button color="red">Confirm</Button>
                            </AlertDialog.Action>
                          </Flex>
                        </AlertDialog.Content>
                      </AlertDialog.Root>
                    </Table.Cell>
                    <Table.Cell>
                      <Text size="2">
                        {align === 'center' && 'Alert appears in the center of the viewport'}
                        {align === 'start' && 'Alert appears near the top of the viewport'}
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
