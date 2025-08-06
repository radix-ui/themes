'use client';

import React from 'react';
import {
  CheckboxCards,
  Text,
  Flex,
  Box,
  Heading,
  Tabs,
  Table,
  Badge,
} from '@kushagradhawan/kookie-ui';
import { Star, Heart, Bookmark, Home, Settings, User, Mail, Phone, Globe } from 'lucide-react';

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

const variants = ['outline', 'classic', 'ghost', 'soft', 'surface'] as const;
const sizes = ['1', '2', '3', '4', '5'] as const;

const featureOptions = [
  { value: 'email', label: 'Email notifications', description: 'Get notified via email' },
  { value: 'sms', label: 'SMS alerts', description: 'Receive text messages' },
  { value: 'push', label: 'Push notifications', description: 'Browser notifications' },
];

const socialOptions = [
  { value: 'twitter', label: 'Twitter', icon: Star },
  { value: 'linkedin', label: 'LinkedIn', icon: Heart },
  { value: 'github', label: 'GitHub', icon: Bookmark },
];

const contactOptions = [
  { value: 'email', label: 'Email', icon: Mail },
  { value: 'phone', label: 'Phone', icon: Phone },
  { value: 'website', label: 'Website', icon: Globe },
];

export default function CheckboxCardsPlayground() {
  return (
    <Flex direction="column" gap="6">
      <Flex direction="column" gap="2">
        <Badge size="2" variant="soft" color="orange" style={{ alignSelf: 'flex-start' }}>
          Updated
        </Badge>
        <Heading size="6" weight="bold">
          Checkbox Cards
        </Heading>
        <Text size="3" color="gray">
          A set of cards with checkboxes for multi-select options.
        </Text>
      </Flex>

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
                      Variant
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '350px', textAlign: 'left' }}>
                    <Text size="1" color="gray">
                      Accent
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '350px', textAlign: 'left' }}>
                    <Text size="1" color="gray">
                      Gray
                    </Text>
                  </Table.ColumnHeaderCell>
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
                    <Table.Cell>
                      <CheckboxCards.Root
                        size="2"
                        variant={variant}
                        defaultValue={['email', 'push']}
                        columns="2"
                      >
                        {featureOptions.slice(0, 2).map((option) => (
                          <CheckboxCards.Item key={option.value} value={option.value}>
                            <Flex direction="column" align="start" gap="1">
                              <Text size="2" weight="medium">
                                {option.label}
                              </Text>
                              <Text size="1" color="gray">
                                {option.description}
                              </Text>
                            </Flex>
                          </CheckboxCards.Item>
                        ))}
                      </CheckboxCards.Root>
                    </Table.Cell>
                    <Table.Cell>
                      <CheckboxCards.Root
                        size="2"
                        variant={variant}
                        color="gray"
                        defaultValue={['email', 'push']}
                        columns="2"
                      >
                        {featureOptions.slice(0, 2).map((option) => (
                          <CheckboxCards.Item key={option.value} value={option.value}>
                            <Flex direction="column" align="start" gap="1">
                              <Text size="2" weight="medium">
                                {option.label}
                              </Text>
                              <Text size="1" color="gray">
                                {option.description}
                              </Text>
                            </Flex>
                          </CheckboxCards.Item>
                        ))}
                      </CheckboxCards.Root>
                    </Table.Cell>
                  </Table.Row>
                ))}
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
                      Variant
                    </Text>
                  </Table.ColumnHeaderCell>
                  {accentColors.slice(0, 8).map((color) => (
                    <Table.ColumnHeaderCell
                      key={color}
                      style={{ width: '200px', textAlign: 'left' }}
                    >
                      <Text size="1" color="gray" style={{ textTransform: 'capitalize' }}>
                        {color}
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
                    {accentColors.slice(0, 8).map((color) => (
                      <Table.Cell key={color}>
                        <CheckboxCards.Root
                          size="2"
                          variant={variant}
                          color={color}
                          defaultValue={['twitter', 'github']}
                          columns="2"
                        >
                          {socialOptions.slice(0, 2).map((option) => (
                            <CheckboxCards.Item key={option.value} value={option.value}>
                              <Flex align="center" gap="2">
                                <option.icon size={16} />
                                <Text size="2">{option.label}</Text>
                              </Flex>
                            </CheckboxCards.Item>
                          ))}
                        </CheckboxCards.Root>
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
                      Variant
                    </Text>
                  </Table.ColumnHeaderCell>
                  {sizes.map((size) => (
                    <Table.ColumnHeaderCell
                      key={size}
                      style={{ width: '280px', textAlign: 'left' }}
                    >
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
                        <CheckboxCards.Root
                          size={size as any}
                          variant={variant}
                          defaultValue={['notifications', 'analytics']}
                          columns="2"
                        >
                          <CheckboxCards.Item value="notifications">
                            <Flex direction="column" align="start" gap="1">
                              <Text size="2" weight="medium">
                                Notifications
                              </Text>
                              <Text size="1" color="gray">
                                Email alerts
                              </Text>
                            </Flex>
                          </CheckboxCards.Item>
                          <CheckboxCards.Item value="analytics">
                            <Flex direction="column" align="start" gap="1">
                              <Text size="2" weight="medium">
                                Analytics
                              </Text>
                              <Text size="1" color="gray">
                                Usage tracking
                              </Text>
                            </Flex>
                          </CheckboxCards.Item>
                        </CheckboxCards.Root>
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
                      <CheckboxCards.Root
                        size="2"
                        variant={variant}
                        defaultValue={['email']}
                        columns="2"
                      >
                        {featureOptions.slice(0, 2).map((option) => (
                          <CheckboxCards.Item key={option.value} value={option.value}>
                            <Text size="2" weight="medium">
                              {option.label}
                            </Text>
                          </CheckboxCards.Item>
                        ))}
                      </CheckboxCards.Root>
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
                      <CheckboxCards.Root
                        size="2"
                        variant={variant}
                        panelBackground="solid"
                        defaultValue={['twitter']}
                        columns="2"
                      >
                        {socialOptions.slice(0, 2).map((option) => (
                          <CheckboxCards.Item key={option.value} value={option.value}>
                            <Flex align="center" gap="2">
                              <option.icon size={16} />
                              <Text size="2">{option.label}</Text>
                            </Flex>
                          </CheckboxCards.Item>
                        ))}
                      </CheckboxCards.Root>
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
                      <CheckboxCards.Root
                        size="3"
                        variant={variant}
                        defaultValue={['email', 'push']}
                        columns="2"
                      >
                        {featureOptions.slice(0, 2).map((option) => (
                          <CheckboxCards.Item key={option.value} value={option.value}>
                            <Flex direction="column" align="start" gap="1">
                              <Text size="3" weight="medium">
                                {option.label}
                              </Text>
                              <Text size="1" color="gray">
                                {option.description}
                              </Text>
                            </Flex>
                          </CheckboxCards.Item>
                        ))}
                      </CheckboxCards.Root>
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
                      <CheckboxCards.Root
                        size="2"
                        variant={variant}
                        defaultValue={['email']}
                        disabled
                        columns="2"
                      >
                        {featureOptions.slice(0, 2).map((option) => (
                          <CheckboxCards.Item key={option.value} value={option.value}>
                            <Text size="2" weight="medium">
                              {option.label}
                            </Text>
                          </CheckboxCards.Item>
                        ))}
                      </CheckboxCards.Root>
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
                      <CheckboxCards.Root
                        size="2"
                        variant={variant}
                        defaultValue={['email', 'sms']}
                        columns="1"
                      >
                        {featureOptions.map((option) => (
                          <CheckboxCards.Item key={option.value} value={option.value}>
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
                          </CheckboxCards.Item>
                        ))}
                      </CheckboxCards.Root>
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
                      <CheckboxCards.Root
                        size="2"
                        variant={variant}
                        defaultValue={['twitter']}
                        columns="2"
                      >
                        {socialOptions.map((option) => (
                          <CheckboxCards.Item key={option.value} value={option.value}>
                            <Flex align="center" gap="2">
                              <option.icon size={16} />
                              <Text size="2">{option.label}</Text>
                            </Flex>
                          </CheckboxCards.Item>
                        ))}
                      </CheckboxCards.Root>
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
                      <CheckboxCards.Root
                        size="2"
                        variant={variant}
                        defaultValue={['email']}
                        columns="3"
                      >
                        {contactOptions.map((option) => (
                          <CheckboxCards.Item key={option.value} value={option.value}>
                            <Flex align="center" gap="2">
                              <option.icon size={16} />
                              <Text size="2">{option.label}</Text>
                            </Flex>
                          </CheckboxCards.Item>
                        ))}
                      </CheckboxCards.Root>
                    </Table.Cell>
                  ))}
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Mixed Selection
                    </Text>
                  </Table.RowHeaderCell>
                  {variants.map((variant) => (
                    <Table.Cell key={variant}>
                      <CheckboxCards.Root
                        size="2"
                        variant={variant}
                        defaultValue={['email', 'sms', 'push']}
                        columns="3"
                      >
                        {featureOptions.map((option) => (
                          <CheckboxCards.Item key={option.value} value={option.value}>
                            <Flex direction="column" align="start" gap="1">
                              <Text size="2" weight="medium">
                                {option.label}
                              </Text>
                              <Text size="1" color="gray">
                                {option.description}
                              </Text>
                            </Flex>
                          </CheckboxCards.Item>
                        ))}
                      </CheckboxCards.Root>
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
