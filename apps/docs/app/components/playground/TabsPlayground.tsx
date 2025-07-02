'use client';

import React from 'react';
import { Tabs, Text, Flex, Box, Heading, Table } from '@kushagradhawan/kookie-ui';

const accentColors = [
  'gray',
  'gold',
  'bronze',
  'brown',
  'yellow',
  'amber',
  'orange',
  'tomato',
  'red',
  'ruby',
  'crimson',
  'pink',
  'plum',
  'purple',
  'violet',
  'iris',
  'indigo',
  'blue',
  'cyan',
  'teal',
  'jade',
  'green',
  'grass',
  'lime',
  'mint',
  'sky',
] as const;

const sizes = ['1', '2'] as const;
const justifyOptions = ['start', 'center', 'end'] as const;
const wrapOptions = ['nowrap', 'wrap', 'wrap-reverse'] as const;

export default function TabsPlayground() {
  return (
    <Flex direction="column" gap="6">
      <Heading size="6" weight="bold">
        Tabs
      </Heading>

      <Tabs.Root defaultValue="theme-colors">
        <Tabs.List size="2">
          <Tabs.Trigger value="theme-colors">Theme colors</Tabs.Trigger>
          <Tabs.Trigger value="all-colors">All colors</Tabs.Trigger>
          <Tabs.Trigger value="sizes">Sizes</Tabs.Trigger>
          <Tabs.Trigger value="justify">Justify</Tabs.Trigger>
          <Tabs.Trigger value="wrap">Wrap</Tabs.Trigger>
          <Tabs.Trigger value="content-examples">Content examples</Tabs.Trigger>
        </Tabs.List>

        {/* Theme Colors Tab */}
        <Tabs.Content value="theme-colors">
          <Box pt="4">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell style={{ width: '120px' }}>
                    <Text size="1" color="gray">
                      Color
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '300px' }}>
                    <Text size="1" color="gray">
                      Tabs Example
                    </Text>
                  </Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Accent
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Tabs.Root defaultValue="tab1">
                      <Tabs.List size="2">
                        <Tabs.Trigger value="tab1">General</Tabs.Trigger>
                        <Tabs.Trigger value="tab2">Security</Tabs.Trigger>
                        <Tabs.Trigger value="tab3">Billing</Tabs.Trigger>
                      </Tabs.List>
                    </Tabs.Root>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Gray
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Tabs.Root defaultValue="tab1">
                      <Tabs.List size="2" color="gray">
                        <Tabs.Trigger value="tab1">General</Tabs.Trigger>
                        <Tabs.Trigger value="tab2">Security</Tabs.Trigger>
                        <Tabs.Trigger value="tab3">Billing</Tabs.Trigger>
                      </Tabs.List>
                    </Tabs.Root>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table.Root>
          </Box>
        </Tabs.Content>

        {/* All Colors Tab */}
        <Tabs.Content value="all-colors">
          <Box pt="4">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell style={{ width: '120px' }}>
                    <Text size="1" color="gray">
                      Color
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '300px' }}>
                    <Text size="1" color="gray">
                      Tabs Example
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '300px' }}>
                    <Text size="1" color="gray">
                      High Contrast
                    </Text>
                  </Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {accentColors.map((color) => (
                  <Table.Row key={color}>
                    <Table.RowHeaderCell>
                      <Text size="1" color="gray" style={{ textTransform: 'capitalize' }}>
                        {color}
                      </Text>
                    </Table.RowHeaderCell>
                    <Table.Cell>
                      <Tabs.Root defaultValue="tab1">
                        <Tabs.List size="2" color={color}>
                          <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
                          <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
                          <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
                        </Tabs.List>
                      </Tabs.Root>
                    </Table.Cell>
                    <Table.Cell>
                      <Tabs.Root defaultValue="tab1">
                        <Tabs.List size="2" color={color} highContrast>
                          <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
                          <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
                          <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
                        </Tabs.List>
                      </Tabs.Root>
                    </Table.Cell>
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
                  <Table.ColumnHeaderCell style={{ width: '300px' }}>
                    <Text size="1" color="gray">
                      Tabs Example
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
                      <Tabs.Root defaultValue="tab1">
                        <Tabs.List size={size as any}>
                          <Tabs.Trigger value="tab1">General</Tabs.Trigger>
                          <Tabs.Trigger value="tab2">Security</Tabs.Trigger>
                          <Tabs.Trigger value="tab3">Billing</Tabs.Trigger>
                          <Tabs.Trigger value="tab4">Advanced</Tabs.Trigger>
                        </Tabs.List>
                      </Tabs.Root>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </Tabs.Content>

        {/* Justify Tab */}
        <Tabs.Content value="justify">
          <Box pt="4">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell style={{ width: '120px' }}>
                    <Text size="1" color="gray">
                      Justify
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '400px' }}>
                    <Text size="1" color="gray">
                      Tabs Example (in container)
                    </Text>
                  </Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {justifyOptions.map((justify) => (
                  <Table.Row key={justify}>
                    <Table.RowHeaderCell>
                      <Text size="1" color="gray" style={{ textTransform: 'capitalize' }}>
                        {justify}
                      </Text>
                    </Table.RowHeaderCell>
                    <Table.Cell>
                      <Box
                        style={{
                          backgroundColor: 'var(--gray-a2)',
                          borderRadius: 'var(--radius-3)',
                          padding: 'var(--space-3)',
                          width: '380px',
                        }}
                      >
                        <Tabs.Root defaultValue="tab1">
                          <Tabs.List size="2" justify={justify as any}>
                            <Tabs.Trigger value="tab1">Home</Tabs.Trigger>
                            <Tabs.Trigger value="tab2">About</Tabs.Trigger>
                            <Tabs.Trigger value="tab3">Contact</Tabs.Trigger>
                          </Tabs.List>
                        </Tabs.Root>
                      </Box>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </Tabs.Content>

        {/* Wrap Tab */}
        <Tabs.Content value="wrap">
          <Box pt="4">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell style={{ width: '120px' }}>
                    <Text size="1" color="gray">
                      Wrap
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '300px' }}>
                    <Text size="1" color="gray">
                      Tabs Example (narrow container)
                    </Text>
                  </Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {wrapOptions.map((wrap) => (
                  <Table.Row key={wrap}>
                    <Table.RowHeaderCell>
                      <Text size="1" color="gray" style={{ textTransform: 'capitalize' }}>
                        {wrap}
                      </Text>
                    </Table.RowHeaderCell>
                    <Table.Cell>
                      <Box
                        style={{
                          backgroundColor: 'var(--gray-a2)',
                          borderRadius: 'var(--radius-3)',
                          padding: 'var(--space-3)',
                          width: '200px',
                        }}
                      >
                        <Tabs.Root defaultValue="tab1">
                          <Tabs.List size="2" wrap={wrap as any}>
                            <Tabs.Trigger value="tab1">Dashboard</Tabs.Trigger>
                            <Tabs.Trigger value="tab2">Analytics</Tabs.Trigger>
                            <Tabs.Trigger value="tab3">Settings</Tabs.Trigger>
                            <Tabs.Trigger value="tab4">Profile</Tabs.Trigger>
                            <Tabs.Trigger value="tab5">Help</Tabs.Trigger>
                          </Tabs.List>
                        </Tabs.Root>
                      </Box>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </Tabs.Content>

        {/* Content Examples Tab */}
        <Tabs.Content value="content-examples">
          <Box pt="4">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell style={{ width: '120px' }}>
                    <Text size="1" color="gray">
                      Example
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '500px' }}>
                    <Text size="1" color="gray">
                      Complete Tabs with Content
                    </Text>
                  </Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Settings
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Tabs.Root defaultValue="general" style={{ width: '480px' }}>
                      <Tabs.List size="2">
                        <Tabs.Trigger value="general">General</Tabs.Trigger>
                        <Tabs.Trigger value="privacy">Privacy</Tabs.Trigger>
                        <Tabs.Trigger value="notifications">Notifications</Tabs.Trigger>
                      </Tabs.List>
                      <Tabs.Content value="general">
                        <Box pt="3">
                          <Text size="2" color="gray">
                            Configure your general account settings here.
                          </Text>
                        </Box>
                      </Tabs.Content>
                      <Tabs.Content value="privacy">
                        <Box pt="3">
                          <Text size="2" color="gray">
                            Manage your privacy preferences and data sharing options.
                          </Text>
                        </Box>
                      </Tabs.Content>
                      <Tabs.Content value="notifications">
                        <Box pt="3">
                          <Text size="2" color="gray">
                            Control when and how you receive notifications.
                          </Text>
                        </Box>
                      </Tabs.Content>
                    </Tabs.Root>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Dashboard
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Tabs.Root defaultValue="overview" style={{ width: '480px' }}>
                      <Tabs.List size="2" color="blue">
                        <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
                        <Tabs.Trigger value="analytics">Analytics</Tabs.Trigger>
                        <Tabs.Trigger value="reports">Reports</Tabs.Trigger>
                      </Tabs.List>
                      <Tabs.Content value="overview">
                        <Box pt="3">
                          <Text size="2" color="gray">
                            View your dashboard overview with key metrics and recent activity.
                          </Text>
                        </Box>
                      </Tabs.Content>
                      <Tabs.Content value="analytics">
                        <Box pt="3">
                          <Text size="2" color="gray">
                            Detailed analytics and performance insights for your account.
                          </Text>
                        </Box>
                      </Tabs.Content>
                      <Tabs.Content value="reports">
                        <Box pt="3">
                          <Text size="2" color="gray">
                            Generate and download comprehensive reports.
                          </Text>
                        </Box>
                      </Tabs.Content>
                    </Tabs.Root>
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
