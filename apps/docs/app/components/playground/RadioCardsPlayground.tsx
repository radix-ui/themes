'use client';

import React from 'react';
import { RadioCards, Text, Flex, Box, Heading, Tabs, Table } from '@kushagradhawan/kookie-ui';
import { Star, Heart, Bookmark, Home, Settings, User } from 'lucide-react';

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

const variants = ['surface', 'classic'] as const;
const sizes = ['1', '2', '3'] as const;

const planOptions = [
  { value: 'free', label: 'Free', description: 'Perfect for personal use' },
  { value: 'pro', label: 'Pro', description: 'Best for professionals' },
  { value: 'enterprise', label: 'Enterprise', description: 'For large teams' },
];

const iconOptions = [
  { value: 'star', label: 'Favorites', icon: Star },
  { value: 'heart', label: 'Liked', icon: Heart },
  { value: 'bookmark', label: 'Saved', icon: Bookmark },
];

const navigationOptions = [
  { value: 'home', label: 'Home', icon: Home },
  { value: 'settings', label: 'Settings', icon: Settings },
  { value: 'profile', label: 'Profile', icon: User },
];

export default function RadioCardsPlayground() {
  return (
    <Flex direction="column" gap="6">
      <Heading size="6" weight="bold">
        Radio Cards
      </Heading>
      <Text size="3" color="gray">
        A group of card-style radio buttons for selecting one option with enhanced visual
        presentation.
      </Text>

      <Tabs.Root defaultValue="theme-colors">
        <Tabs.List size="2">
          <Tabs.Trigger value="theme-colors">Theme colors</Tabs.Trigger>
          <Tabs.Trigger value="all-colors">All colors</Tabs.Trigger>
          <Tabs.Trigger value="all-sizes">All sizes</Tabs.Trigger>
          <Tabs.Trigger value="with-content">With content</Tabs.Trigger>
          <Tabs.Trigger value="layouts">Layouts</Tabs.Trigger>
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
                  {variants.map((variant) => (
                    <Table.ColumnHeaderCell
                      key={variant}
                      style={{ width: '300px', textAlign: 'left' }}
                    >
                      <Text size="1" color="gray" style={{ textTransform: 'capitalize' }}>
                        {variant}
                      </Text>
                    </Table.ColumnHeaderCell>
                  ))}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Accent
                    </Text>
                  </Table.RowHeaderCell>
                  {variants.map((variant) => (
                    <Table.Cell key={variant}>
                      <RadioCards.Root size="2" variant={variant} defaultValue="pro" columns="2">
                        {planOptions.slice(0, 2).map((option) => (
                          <RadioCards.Item key={option.value} value={option.value}>
                            <Flex direction="column" align="center" gap="1">
                              <Text size="2" weight="medium">
                                {option.label}
                              </Text>
                              <Text size="1" color="gray">
                                {option.description}
                              </Text>
                            </Flex>
                          </RadioCards.Item>
                        ))}
                      </RadioCards.Root>
                    </Table.Cell>
                  ))}
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Gray
                    </Text>
                  </Table.RowHeaderCell>
                  {variants.map((variant) => (
                    <Table.Cell key={variant}>
                      <RadioCards.Root
                        size="2"
                        variant={variant}
                        color="gray"
                        defaultValue="pro"
                        columns="2"
                      >
                        {planOptions.slice(0, 2).map((option) => (
                          <RadioCards.Item key={option.value} value={option.value}>
                            <Flex direction="column" align="center" gap="1">
                              <Text size="2" weight="medium">
                                {option.label}
                              </Text>
                              <Text size="1" color="gray">
                                {option.description}
                              </Text>
                            </Flex>
                          </RadioCards.Item>
                        ))}
                      </RadioCards.Root>
                    </Table.Cell>
                  ))}
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
                  {variants.map((variant) => (
                    <Table.ColumnHeaderCell
                      key={variant}
                      style={{ width: '250px', textAlign: 'left' }}
                    >
                      <Text size="1" color="gray" style={{ textTransform: 'capitalize' }}>
                        {variant}
                      </Text>
                    </Table.ColumnHeaderCell>
                  ))}
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
                    {variants.map((variant) => (
                      <Table.Cell key={variant}>
                        <RadioCards.Root
                          size="2"
                          variant={variant}
                          color={color}
                          defaultValue="star"
                          columns="3"
                        >
                          {iconOptions.map((option) => (
                            <RadioCards.Item key={option.value} value={option.value}>
                              <Flex align="center" gap="2">
                                <option.icon size={16} />
                                <Text size="2">{option.label}</Text>
                              </Flex>
                            </RadioCards.Item>
                          ))}
                        </RadioCards.Root>
                      </Table.Cell>
                    ))}
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </Tabs.Content>

        {/* All Sizes Tab */}
        <Tabs.Content value="all-sizes">
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
                    <Table.ColumnHeaderCell
                      key={variant}
                      style={{ width: '300px', textAlign: 'left' }}
                    >
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
                        <RadioCards.Root
                          size={size as any}
                          variant={variant}
                          defaultValue="home"
                          columns="3"
                        >
                          {navigationOptions.map((option) => (
                            <RadioCards.Item key={option.value} value={option.value}>
                              <Flex align="center" gap="2">
                                <option.icon size={16} />
                                <Text size={size}>{option.label}</Text>
                              </Flex>
                            </RadioCards.Item>
                          ))}
                        </RadioCards.Root>
                      </Table.Cell>
                    ))}
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </Tabs.Content>

        {/* With Content Tab */}
        <Tabs.Content value="with-content">
          <Box pt="4">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell style={{ width: '120px' }}>
                    <Text size="1" color="gray">
                      Content Type
                    </Text>
                  </Table.ColumnHeaderCell>
                  {variants.map((variant) => (
                    <Table.ColumnHeaderCell
                      key={variant}
                      style={{ width: '350px', textAlign: 'left' }}
                    >
                      <Text size="1" color="gray" style={{ textTransform: 'capitalize' }}>
                        {variant}
                      </Text>
                    </Table.ColumnHeaderCell>
                  ))}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Text Only
                    </Text>
                  </Table.RowHeaderCell>
                  {variants.map((variant) => (
                    <Table.Cell key={variant}>
                      <RadioCards.Root size="2" variant={variant} defaultValue="pro" columns="2">
                        {planOptions.slice(0, 2).map((option) => (
                          <RadioCards.Item key={option.value} value={option.value}>
                            <Text size="2" weight="medium">
                              {option.label}
                            </Text>
                          </RadioCards.Item>
                        ))}
                      </RadioCards.Root>
                    </Table.Cell>
                  ))}
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      With Icons
                    </Text>
                  </Table.RowHeaderCell>
                  {variants.map((variant) => (
                    <Table.Cell key={variant}>
                      <RadioCards.Root size="2" variant={variant} defaultValue="star" columns="2">
                        {iconOptions.slice(0, 2).map((option) => (
                          <RadioCards.Item key={option.value} value={option.value}>
                            <Flex align="center" gap="2">
                              <option.icon size={16} />
                              <Text size="2">{option.label}</Text>
                            </Flex>
                          </RadioCards.Item>
                        ))}
                      </RadioCards.Root>
                    </Table.Cell>
                  ))}
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      With Descriptions
                    </Text>
                  </Table.RowHeaderCell>
                  {variants.map((variant) => (
                    <Table.Cell key={variant}>
                      <RadioCards.Root size="3" variant={variant} defaultValue="pro" columns="2">
                        {planOptions.slice(0, 2).map((option) => (
                          <RadioCards.Item key={option.value} value={option.value}>
                            <Flex direction="column" align="center" gap="1">
                              <Text size="3" weight="medium">
                                {option.label}
                              </Text>
                              <Text size="1" color="gray">
                                {option.description}
                              </Text>
                            </Flex>
                          </RadioCards.Item>
                        ))}
                      </RadioCards.Root>
                    </Table.Cell>
                  ))}
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Disabled State
                    </Text>
                  </Table.RowHeaderCell>
                  {variants.map((variant) => (
                    <Table.Cell key={variant}>
                      <RadioCards.Root
                        size="2"
                        variant={variant}
                        defaultValue="pro"
                        disabled
                        columns="2"
                      >
                        {planOptions.slice(0, 2).map((option) => (
                          <RadioCards.Item key={option.value} value={option.value}>
                            <Text size="2" weight="medium">
                              {option.label}
                            </Text>
                          </RadioCards.Item>
                        ))}
                      </RadioCards.Root>
                    </Table.Cell>
                  ))}
                </Table.Row>
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
                    <Table.ColumnHeaderCell
                      key={variant}
                      style={{ width: '350px', textAlign: 'left' }}
                    >
                      <Text size="1" color="gray" style={{ textTransform: 'capitalize' }}>
                        {variant}
                      </Text>
                    </Table.ColumnHeaderCell>
                  ))}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Single Column
                    </Text>
                  </Table.RowHeaderCell>
                  {variants.map((variant) => (
                    <Table.Cell key={variant}>
                      <RadioCards.Root size="2" variant={variant} defaultValue="pro" columns="1">
                        {planOptions.map((option) => (
                          <RadioCards.Item key={option.value} value={option.value}>
                            <Flex justify="between" align="center" width="100%">
                              <Flex direction="column" align="start">
                                <Text size="2" weight="medium">
                                  {option.label}
                                </Text>
                                <Text size="1" color="gray">
                                  {option.description}
                                </Text>
                              </Flex>
                            </Flex>
                          </RadioCards.Item>
                        ))}
                      </RadioCards.Root>
                    </Table.Cell>
                  ))}
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Two Columns
                    </Text>
                  </Table.RowHeaderCell>
                  {variants.map((variant) => (
                    <Table.Cell key={variant}>
                      <RadioCards.Root size="2" variant={variant} defaultValue="star" columns="2">
                        {iconOptions.slice(0, 2).map((option) => (
                          <RadioCards.Item key={option.value} value={option.value}>
                            <Flex align="center" gap="2">
                              <option.icon size={16} />
                              <Text size="2">{option.label}</Text>
                            </Flex>
                          </RadioCards.Item>
                        ))}
                      </RadioCards.Root>
                    </Table.Cell>
                  ))}
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Three Columns
                    </Text>
                  </Table.RowHeaderCell>
                  {variants.map((variant) => (
                    <Table.Cell key={variant}>
                      <RadioCards.Root size="2" variant={variant} defaultValue="home" columns="3">
                        {navigationOptions.map((option) => (
                          <RadioCards.Item key={option.value} value={option.value}>
                            <Flex align="center" gap="2">
                              <option.icon size={16} />
                              <Text size="2">{option.label}</Text>
                            </Flex>
                          </RadioCards.Item>
                        ))}
                      </RadioCards.Root>
                    </Table.Cell>
                  ))}
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Custom Gap/Mixed Selection
                    </Text>
                  </Table.RowHeaderCell>
                  {variants.map((variant) => (
                    <Table.Cell key={variant}>
                      <RadioCards.Root
                        size="2"
                        variant={variant}
                        defaultValue="star"
                        columns="2"
                        gap="2"
                      >
                        {iconOptions.slice(0, 2).map((option) => (
                          <RadioCards.Item key={option.value} value={option.value}>
                            <Flex align="center" gap="2">
                              <option.icon size={16} />
                              <Text size="2">{option.label}</Text>
                            </Flex>
                          </RadioCards.Item>
                        ))}
                      </RadioCards.Root>
                    </Table.Cell>
                  ))}
                </Table.Row>
              </Table.Body>
            </Table.Root>
          </Box>
        </Tabs.Content>
      </Tabs.Root>
    </Flex>
  );
}
