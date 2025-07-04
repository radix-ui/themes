'use client';

import React from 'react';
import { CheckboxGroup, Text, Flex, Box, Heading, Tabs, Table } from '@kushagradhawan/kookie-ui';

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

const variants = ['classic', 'solid', 'soft'] as const;
const sizes = ['1', '2', '3'] as const;

export default function CheckboxGroupPlayground() {
  return (
    <Flex direction="column" gap="6">
      <Heading size="6" weight="bold">
        Checkbox Group
      </Heading>
      <Text size="2" color="gray">
        A set of checkboxes that are bound together.
      </Text>

      <Tabs.Root defaultValue="theme-colors">
        <Tabs.List size="2">
          <Tabs.Trigger value="theme-colors">Theme colors</Tabs.Trigger>
          <Tabs.Trigger value="all-colors">All colors</Tabs.Trigger>
          <Tabs.Trigger value="all-sizes">All sizes</Tabs.Trigger>
          <Tabs.Trigger value="orientation">Orientation</Tabs.Trigger>
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
                      style={{ width: '200px', textAlign: 'left' }}
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
                      <CheckboxGroup.Root
                        size="2"
                        variant={variant}
                        defaultValue={['apple', 'orange']}
                      >
                        <CheckboxGroup.Item value="apple">Apple</CheckboxGroup.Item>
                        <CheckboxGroup.Item value="orange">Orange</CheckboxGroup.Item>
                        <CheckboxGroup.Item value="banana">Banana</CheckboxGroup.Item>
                      </CheckboxGroup.Root>
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
                      <CheckboxGroup.Root
                        size="2"
                        variant={variant}
                        color="gray"
                        defaultValue={['apple', 'orange']}
                      >
                        <CheckboxGroup.Item value="apple">Apple</CheckboxGroup.Item>
                        <CheckboxGroup.Item value="orange">Orange</CheckboxGroup.Item>
                        <CheckboxGroup.Item value="banana">Banana</CheckboxGroup.Item>
                      </CheckboxGroup.Root>
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
            <Flex direction="column" gap="4">
              {accentColors.slice(0, 6).map((color) => (
                <Box key={color}>
                  <Text size="2" weight="medium" mb="3" style={{ textTransform: 'capitalize' }}>
                    {color}
                  </Text>
                  <Flex gap="6">
                    {variants.map((variant) => (
                      <Box key={variant}>
                        <Text size="1" color="gray" mb="2" style={{ textTransform: 'capitalize' }}>
                          {variant}
                        </Text>
                        <CheckboxGroup.Root
                          size="2"
                          variant={variant}
                          color={color}
                          defaultValue={['option1']}
                        >
                          <CheckboxGroup.Item value="option1">Option 1</CheckboxGroup.Item>
                          <CheckboxGroup.Item value="option2">Option 2</CheckboxGroup.Item>
                          <CheckboxGroup.Item value="option3">Option 3</CheckboxGroup.Item>
                        </CheckboxGroup.Root>
                      </Box>
                    ))}
                  </Flex>
                </Box>
              ))}
            </Flex>
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
                      style={{ width: '200px', textAlign: 'left' }}
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
                        <CheckboxGroup.Root
                          size={size as any}
                          variant={variant}
                          defaultValue={['small', 'medium']}
                        >
                          <CheckboxGroup.Item value="small">Small</CheckboxGroup.Item>
                          <CheckboxGroup.Item value="medium">Medium</CheckboxGroup.Item>
                          <CheckboxGroup.Item value="large">Large</CheckboxGroup.Item>
                        </CheckboxGroup.Root>
                      </Table.Cell>
                    ))}
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </Tabs.Content>

        {/* Orientation Tab */}
        <Tabs.Content value="orientation">
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
                      style={{ width: '200px', textAlign: 'left' }}
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
                      Vertical
                    </Text>
                  </Table.RowHeaderCell>
                  {variants.map((variant) => (
                    <Table.Cell key={variant}>
                      <CheckboxGroup.Root
                        size="2"
                        variant={variant}
                        orientation="vertical"
                        defaultValue={['red', 'blue']}
                      >
                        <CheckboxGroup.Item value="red">Red</CheckboxGroup.Item>
                        <CheckboxGroup.Item value="blue">Blue</CheckboxGroup.Item>
                        <CheckboxGroup.Item value="green">Green</CheckboxGroup.Item>
                      </CheckboxGroup.Root>
                    </Table.Cell>
                  ))}
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Horizontal
                    </Text>
                  </Table.RowHeaderCell>
                  {variants.map((variant) => (
                    <Table.Cell key={variant}>
                      <CheckboxGroup.Root
                        size="2"
                        variant={variant}
                        orientation="horizontal"
                        defaultValue={['red', 'blue']}
                      >
                        <CheckboxGroup.Item value="red">Red</CheckboxGroup.Item>
                        <CheckboxGroup.Item value="blue">Blue</CheckboxGroup.Item>
                        <CheckboxGroup.Item value="green">Green</CheckboxGroup.Item>
                      </CheckboxGroup.Root>
                    </Table.Cell>
                  ))}
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Disabled
                    </Text>
                  </Table.RowHeaderCell>
                  {variants.map((variant) => (
                    <Table.Cell key={variant}>
                      <CheckboxGroup.Root
                        size="2"
                        variant={variant}
                        disabled
                        defaultValue={['option1']}
                      >
                        <CheckboxGroup.Item value="option1">Option 1</CheckboxGroup.Item>
                        <CheckboxGroup.Item value="option2">Option 2</CheckboxGroup.Item>
                        <CheckboxGroup.Item value="option3">Option 3</CheckboxGroup.Item>
                      </CheckboxGroup.Root>
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
