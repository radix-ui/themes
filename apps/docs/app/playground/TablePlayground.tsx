'use client';

import React from 'react';
import {
  Table,
  Text,
  Flex,
  Box,
  Heading,
  Tabs,
  Badge,
  Avatar,
  Button,
  IconButton,
  Checkbox,
  Switch,
} from '@kushagradhawan/kookie-ui';

const sizes = ['1', '2', '3'] as const;
const variants = ['surface', 'ghost'] as const;
const layouts = ['auto', 'fixed'] as const;
const alignments = ['start', 'center', 'end', 'baseline'] as const;
const justifications = ['start', 'center', 'end'] as const;

// Sample data for mini table examples
const sampleData = [
  { name: 'Alice', role: 'Admin', status: 'Active' },
  { name: 'Bob', role: 'User', status: 'Inactive' },
];

// Mini table component for showcasing
const MiniTable = ({
  size,
  variant,
  layout,
  alignment,
  justification,
}: {
  size?: (typeof sizes)[number];
  variant?: (typeof variants)[number];
  layout?: (typeof layouts)[number];
  alignment?: (typeof alignments)[number];
  justification?: (typeof justifications)[number];
}) => (
  <Table.Root size={size} variant={variant} layout={layout} style={{ minWidth: '200px' }}>
    <Table.Header>
      <Table.Row align={alignment}>
        <Table.ColumnHeaderCell justify={justification}>Name</Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell justify={justification}>Role</Table.ColumnHeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {sampleData.map((item, index) => (
        <Table.Row key={index} align={alignment}>
          <Table.RowHeaderCell justify={justification}>{item.name}</Table.RowHeaderCell>
          <Table.Cell justify={justification}>{item.role}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table.Root>
);

export default function TablePlayground() {
  const [selectedRows, setSelectedRows] = React.useState<number[]>([]);

  const handleRowSelect = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id],
    );
  };

  const handleSelectAll = () => {
    setSelectedRows((prev) =>
      prev.length === sampleData.length ? [] : sampleData.map((_, index) => index),
    );
  };

  return (
    <Flex direction="column" gap="6">
      <Flex direction="column" gap="2">
        <Badge size="2" variant="soft" color="orange" style={{ alignSelf: 'flex-start' }}>
          Updated
        </Badge>
        <Heading size="6" weight="bold">
          Table
        </Heading>
        <Text size="3" color="gray">
          A flexible table component for displaying structured data with various styling options.
        </Text>
      </Flex>

      <Tabs.Root defaultValue="variants">
        <Tabs.List size="2">
          <Tabs.Trigger value="variants">Variants</Tabs.Trigger>
          <Tabs.Trigger value="sizes">Sizes</Tabs.Trigger>
          <Tabs.Trigger value="layouts">Layouts</Tabs.Trigger>
          <Tabs.Trigger value="alignment">Alignment</Tabs.Trigger>
          <Tabs.Trigger value="justification">Justification</Tabs.Trigger>
          <Tabs.Trigger value="interactive">Interactive</Tabs.Trigger>
        </Tabs.List>

        {/* Variants Tab */}
        <Tabs.Content value="variants">
          <Box pt="4">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell style={{ width: '120px' }}>
                    <Text size="1" color="gray">
                      Variant
                    </Text>
                  </Table.ColumnHeaderCell>
                  {sizes.map((size) => (
                    <Table.ColumnHeaderCell key={size} style={{ width: '250px' }}>
                      <Text size="1" color="gray">
                        Size {size}
                      </Text>
                    </Table.ColumnHeaderCell>
                  ))}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {variants.map((variant) => (
                  <Table.Row key={variant}>
                    <Table.RowHeaderCell>
                      <Text size="1" color="gray" style={{ textTransform: 'capitalize' }}>
                        {variant}
                      </Text>
                    </Table.RowHeaderCell>
                    {sizes.map((size) => (
                      <Table.Cell key={size}>
                        <MiniTable size={size} variant={variant} />
                      </Table.Cell>
                    ))}
                  </Table.Row>
                ))}
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
                  {variants.map((variant) => (
                    <Table.ColumnHeaderCell key={variant} style={{ width: '250px' }}>
                      <Text size="1" color="gray" style={{ textTransform: 'capitalize' }}>
                        {variant}
                      </Text>
                    </Table.ColumnHeaderCell>
                  ))}
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
                    {variants.map((variant) => (
                      <Table.Cell key={variant}>
                        <MiniTable size={size} variant={variant} />
                      </Table.Cell>
                    ))}
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </Tabs.Content>

        {/* Layouts Tab */}
        <Tabs.Content value="layouts">
          <Box pt="4">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell style={{ width: '120px' }}>
                    <Text size="1" color="gray">
                      Layout
                    </Text>
                  </Table.ColumnHeaderCell>
                  {variants.map((variant) => (
                    <Table.ColumnHeaderCell key={variant} style={{ width: '300px' }}>
                      <Text size="1" color="gray" style={{ textTransform: 'capitalize' }}>
                        {variant}
                      </Text>
                    </Table.ColumnHeaderCell>
                  ))}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {layouts.map((layout) => (
                  <Table.Row key={layout}>
                    <Table.RowHeaderCell>
                      <Text size="1" color="gray" style={{ textTransform: 'capitalize' }}>
                        {layout}
                      </Text>
                    </Table.RowHeaderCell>
                    {variants.map((variant) => (
                      <Table.Cell key={variant}>
                        <Table.Root variant={variant} layout={layout} style={{ minWidth: '250px' }}>
                          <Table.Header>
                            <Table.Row>
                              <Table.ColumnHeaderCell width="100px">Short</Table.ColumnHeaderCell>
                              <Table.ColumnHeaderCell>
                                Variable Length Content
                              </Table.ColumnHeaderCell>
                            </Table.Row>
                          </Table.Header>
                          <Table.Body>
                            <Table.Row>
                              <Table.RowHeaderCell>Item</Table.RowHeaderCell>
                              <Table.Cell>Short text</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.RowHeaderCell>Product</Table.RowHeaderCell>
                              <Table.Cell>
                                This is a much longer description that shows layout behavior
                              </Table.Cell>
                            </Table.Row>
                          </Table.Body>
                        </Table.Root>
                      </Table.Cell>
                    ))}
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </Tabs.Content>

        {/* Alignment Tab */}
        <Tabs.Content value="alignment">
          <Box pt="4">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell style={{ width: '120px' }}>
                    <Text size="1" color="gray">
                      Alignment
                    </Text>
                  </Table.ColumnHeaderCell>
                  {variants.map((variant) => (
                    <Table.ColumnHeaderCell key={variant} style={{ width: '280px' }}>
                      <Text size="1" color="gray" style={{ textTransform: 'capitalize' }}>
                        {variant}
                      </Text>
                    </Table.ColumnHeaderCell>
                  ))}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {alignments.map((alignment) => (
                  <Table.Row key={alignment}>
                    <Table.RowHeaderCell>
                      <Text size="1" color="gray" style={{ textTransform: 'capitalize' }}>
                        {alignment}
                      </Text>
                    </Table.RowHeaderCell>
                    {variants.map((variant) => (
                      <Table.Cell key={variant}>
                        <Table.Root variant={variant} style={{ minWidth: '220px' }}>
                          <Table.Header>
                            <Table.Row align={alignment}>
                              <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
                              <Table.ColumnHeaderCell>Content</Table.ColumnHeaderCell>
                            </Table.Row>
                          </Table.Header>
                          <Table.Body>
                            <Table.Row align={alignment}>
                              <Table.RowHeaderCell>Item</Table.RowHeaderCell>
                              <Table.Cell>
                                <Flex direction="column" gap="1">
                                  <Text size="2" weight="medium">
                                    Multi-line
                                  </Text>
                                  <Text size="1" color="gray">
                                    content
                                  </Text>
                                </Flex>
                              </Table.Cell>
                            </Table.Row>
                            <Table.Row align={alignment}>
                              <Table.RowHeaderCell>Product</Table.RowHeaderCell>
                              <Table.Cell>Single line</Table.Cell>
                            </Table.Row>
                          </Table.Body>
                        </Table.Root>
                      </Table.Cell>
                    ))}
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </Tabs.Content>

        {/* Justification Tab */}
        <Tabs.Content value="justification">
          <Box pt="4">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell style={{ width: '120px' }}>
                    <Text size="1" color="gray">
                      Justification
                    </Text>
                  </Table.ColumnHeaderCell>
                  {variants.map((variant) => (
                    <Table.ColumnHeaderCell key={variant} style={{ width: '280px' }}>
                      <Text size="1" color="gray" style={{ textTransform: 'capitalize' }}>
                        {variant}
                      </Text>
                    </Table.ColumnHeaderCell>
                  ))}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {justifications.map((justification) => (
                  <Table.Row key={justification}>
                    <Table.RowHeaderCell>
                      <Text size="1" color="gray" style={{ textTransform: 'capitalize' }}>
                        {justification}
                      </Text>
                    </Table.RowHeaderCell>
                    {variants.map((variant) => (
                      <Table.Cell key={variant}>
                        <Table.Root variant={variant} style={{ minWidth: '220px' }}>
                          <Table.Header>
                            <Table.Row>
                              <Table.ColumnHeaderCell justify={justification}>
                                Name
                              </Table.ColumnHeaderCell>
                              <Table.ColumnHeaderCell justify={justification}>
                                Value
                              </Table.ColumnHeaderCell>
                            </Table.Row>
                          </Table.Header>
                          <Table.Body>
                            <Table.Row>
                              <Table.RowHeaderCell justify={justification}>
                                Text
                              </Table.RowHeaderCell>
                              <Table.Cell justify={justification}>Content</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.RowHeaderCell justify={justification}>
                                Number
                              </Table.RowHeaderCell>
                              <Table.Cell justify={justification}>123.45</Table.Cell>
                            </Table.Row>
                          </Table.Body>
                        </Table.Root>
                      </Table.Cell>
                    ))}
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </Tabs.Content>

        {/* Interactive Tab */}
        <Tabs.Content value="interactive">
          <Box pt="4">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell style={{ width: '120px' }}>
                    <Text size="1" color="gray">
                      Feature
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '400px' }}>
                    <Text size="1" color="gray">
                      Example
                    </Text>
                  </Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Basic Table
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Table.Root size="1" variant="surface" style={{ minWidth: '300px' }}>
                      <Table.Header>
                        <Table.Row>
                          <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
                          <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        <Table.Row>
                          <Table.RowHeaderCell>Alice</Table.RowHeaderCell>
                          <Table.Cell>
                            <Badge size="1" variant="soft" color="green">
                              Active
                            </Badge>
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.RowHeaderCell>Bob</Table.RowHeaderCell>
                          <Table.Cell>
                            <Badge size="1" variant="soft" color="gray">
                              Inactive
                            </Badge>
                          </Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    </Table.Root>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      With Selection
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Table.Root size="1" variant="surface" style={{ minWidth: '350px' }}>
                      <Table.Header>
                        <Table.Row>
                          <Table.ColumnHeaderCell width="50px">
                            <Checkbox
                              checked={selectedRows.length === sampleData.length}
                              onCheckedChange={handleSelectAll}
                            />
                          </Table.ColumnHeaderCell>
                          <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
                          <Table.ColumnHeaderCell>Role</Table.ColumnHeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {sampleData.map((item, index) => (
                          <Table.Row key={index}>
                            <Table.Cell>
                              <Checkbox
                                checked={selectedRows.includes(index)}
                                onCheckedChange={() => handleRowSelect(index)}
                              />
                            </Table.Cell>
                            <Table.RowHeaderCell>{item.name}</Table.RowHeaderCell>
                            <Table.Cell>{item.role}</Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table.Root>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      With Actions
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Table.Root size="1" variant="surface" style={{ minWidth: '400px' }}>
                      <Table.Header>
                        <Table.Row>
                          <Table.ColumnHeaderCell>User</Table.ColumnHeaderCell>
                          <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                          <Table.ColumnHeaderCell justify="end">Actions</Table.ColumnHeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {sampleData.map((item, index) => (
                          <Table.Row key={index}>
                            <Table.Cell>
                              <Flex align="center" gap="2">
                                <Avatar size="1" fallback={item.name.charAt(0)} />
                                <Text size="1">{item.name}</Text>
                              </Flex>
                            </Table.Cell>
                            <Table.Cell>
                              <Switch size="1" checked={item.status === 'Active'} />
                            </Table.Cell>
                            <Table.Cell justify="end">
                              <Flex gap="1">
                                <IconButton size="1" variant="soft" color="gray">
                                  <svg width="12" height="12" viewBox="0 0 15 15" fill="none">
                                    <path
                                      d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1464 1.14645L3.71396 8.57889C3.62858 8.66427 3.55881 8.76768 3.51078 8.88117L2.49334 11.8132C2.42471 12.0094 2.45201 12.2271 2.56292 12.3949C2.67382 12.5627 2.85943 12.6597 3.06334 12.6597C3.11352 12.6597 3.16371 12.6518 3.21334 12.6357L6.14533 11.6183C6.25882 11.5703 6.36223 11.5005 6.44761 11.4151L13.8536 4.00901C14.0488 3.81375 14.0488 3.49716 13.8536 3.3019L11.8536 1.14645Z"
                                      fill="currentColor"
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                    ></path>
                                  </svg>
                                </IconButton>
                                <IconButton size="1" variant="soft" color="red">
                                  <svg width="12" height="12" viewBox="0 0 15 15" fill="none">
                                    <path
                                      d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4H3.5C3.22386 4 3 3.77614 3 3.5ZM5 4V12H10V4H5Z"
                                      fill="currentColor"
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                    ></path>
                                  </svg>
                                </IconButton>
                              </Flex>
                            </Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table.Root>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table.Root>
          </Box>
        </Tabs.Content>
      </Tabs.Root>
    </Flex>
  );
}
