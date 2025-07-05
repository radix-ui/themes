'use client';

import React from 'react';
import { Text, Flex, Box, Heading, Tabs, Table } from '@kushagradhawan/kookie-ui';

const sizes = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
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
const weights = ['light', 'regular', 'medium', 'bold'] as const;

export default function TextPlayground() {
  return (
    <Flex direction="column" gap="6">
      <Heading size="6" weight="bold">
        Text
      </Heading>
      <Text size="3" color="gray">
        A component for displaying text content with consistent typography and styling.
      </Text>

      <Tabs.Root defaultValue="sizes">
        <Tabs.List size="2">
          <Tabs.Trigger value="sizes">Sizes</Tabs.Trigger>
          <Tabs.Trigger value="theme-colors">Theme Colors</Tabs.Trigger>
          <Tabs.Trigger value="all-colors">All Colors</Tabs.Trigger>
          <Tabs.Trigger value="weights">Weights</Tabs.Trigger>
          <Tabs.Trigger value="content-examples">Content Examples</Tabs.Trigger>
        </Tabs.List>

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
                  <Table.ColumnHeaderCell style={{ width: '400px' }}>
                    <Text size="1" color="gray">
                      Preview
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
                      <Text size={size as any}>The quick brown fox jumps over the lazy dog</Text>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </Tabs.Content>

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
                  <Table.ColumnHeaderCell style={{ width: '400px' }}>
                    <Text size="1" color="gray">
                      Preview
                    </Text>
                  </Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Default
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Text size="3">This is default text color</Text>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Gray
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Text size="3" color="gray">
                      This is gray colored text
                    </Text>
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
                  <Table.ColumnHeaderCell style={{ width: '400px' }}>
                    <Text size="1" color="gray">
                      Preview
                    </Text>
                  </Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {accentColors.map((color) => (
                  <React.Fragment key={color}>
                    <Table.Row>
                      <Table.RowHeaderCell>
                        <Text size="1" color="gray" style={{ textTransform: 'capitalize' }}>
                          {color}
                        </Text>
                      </Table.RowHeaderCell>
                      <Table.Cell>
                        <Text size="3" color={color}>
                          This is {color} colored text
                        </Text>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.RowHeaderCell>
                        <Text
                          size="1"
                          color="gray"
                          style={{ textTransform: 'capitalize', opacity: 0.7 }}
                        >
                          {color} HC
                        </Text>
                      </Table.RowHeaderCell>
                      <Table.Cell>
                        <Text size="3" color={color} highContrast>
                          This is {color} high contrast text
                        </Text>
                      </Table.Cell>
                    </Table.Row>
                  </React.Fragment>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </Tabs.Content>

        {/* Weights Tab */}
        <Tabs.Content value="weights">
          <Box pt="4">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell style={{ width: '120px' }}>
                    <Text size="1" color="gray">
                      Weight
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '400px' }}>
                    <Text size="1" color="gray">
                      Preview
                    </Text>
                  </Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {weights.map((weight) => (
                  <Table.Row key={weight}>
                    <Table.RowHeaderCell>
                      <Text size="1" color="gray" style={{ textTransform: 'capitalize' }}>
                        {weight}
                      </Text>
                    </Table.RowHeaderCell>
                    <Table.Cell>
                      <Text size="3" weight={weight as any}>
                        The quick brown fox jumps over the lazy dog
                      </Text>
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
                  <Table.ColumnHeaderCell style={{ width: '150px' }}>
                    <Text size="1" color="gray">
                      Typography
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '600px' }}>
                    <Text size="1" color="gray">
                      Specimen
                    </Text>
                  </Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Character Set
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Flex direction="column" gap="2">
                      <Text size="4" weight="regular">
                        ABCDEFGHIJKLMNOPQRSTUVWXYZ
                      </Text>
                      <Text size="4" weight="regular">
                        abcdefghijklmnopqrstuvwxyz
                      </Text>
                      <Text size="4" weight="regular">
                        1234567890 !@#$%^&*()
                      </Text>
                    </Flex>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Pangram
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Flex direction="column" gap="3">
                      <Text size="5" weight="light">
                        The quick brown fox jumps over the lazy dog
                      </Text>
                      <Text size="4" weight="regular">
                        The quick brown fox jumps over the lazy dog
                      </Text>
                      <Text size="3" weight="medium">
                        The quick brown fox jumps over the lazy dog
                      </Text>
                      <Text size="2" weight="bold">
                        The quick brown fox jumps over the lazy dog
                      </Text>
                    </Flex>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Scale & Rhythm
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Flex direction="column" gap="2">
                      <Text size="9" weight="light">
                        Typography
                      </Text>
                      <Text size="7" weight="regular">
                        Typography
                      </Text>
                      <Text size="5" weight="medium">
                        Typography
                      </Text>
                      <Text size="3" weight="bold">
                        Typography
                      </Text>
                      <Text size="1" weight="bold">
                        Typography
                      </Text>
                    </Flex>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Weight Spectrum
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Flex direction="column" gap="2">
                      <Text size="6" weight="light">
                        Simplicity is the ultimate sophistication
                      </Text>
                      <Text size="6" weight="regular">
                        Simplicity is the ultimate sophistication
                      </Text>
                      <Text size="6" weight="medium">
                        Simplicity is the ultimate sophistication
                      </Text>
                      <Text size="6" weight="bold">
                        Simplicity is the ultimate sophistication
                      </Text>
                    </Flex>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Proportional Beauty
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Flex direction="column" gap="4" style={{ maxWidth: '500px' }}>
                      <Text size="4" weight="regular">
                        The goal of typography is to relate font size, line height, and line width
                        in a proportional way that maximizes beauty and makes reading easier and
                        more pleasant.
                      </Text>
                      <Text size="3" weight="regular" color="gray">
                        Just like how Kookie's fluffy coat has perfect proportions, typography
                        achieves harmony through the golden ratio and careful spacing relationships.
                      </Text>
                    </Flex>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Contrast & Harmony
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Flex direction="column" gap="3" style={{ maxWidth: '450px' }}>
                      <Text size="5" weight="light">
                        Kookie UI Design System
                      </Text>
                      <Text size="3" weight="regular">
                        At the heart of Kookie UI lies the same attention to detail that makes a
                        Shih Tzu's <Text weight="bold">expressive eyes</Text> and{' '}
                        <Text weight="bold">playful personality</Text> so endearing. We've crafted
                        each component with the care and precision of a master groomer.
                      </Text>
                      <Text size="2" weight="medium" color="gray">
                        Like Kookie's perfectly balanced temperament, our design system embodies
                        elegance and functionality.
                      </Text>
                    </Flex>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Typographic Color
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Flex direction="column" gap="2" style={{ maxWidth: '400px' }}>
                      <Text size="3" weight="regular">
                        Typography is like a Shih Tzu's coat – it sets the tone and personality of
                        everything it touches.
                      </Text>
                      <Text size="3" weight="regular" color="gray">
                        Typography is like a Shih Tzu's coat – it sets the tone and personality of
                        everything it touches.
                      </Text>
                      <Text size="3" weight="light">
                        Typography is like a Shih Tzu's coat – it sets the tone and personality of
                        everything it touches.
                      </Text>
                      <Text size="3" weight="medium">
                        Typography is like a Shih Tzu's coat – it sets the tone and personality of
                        everything it touches.
                      </Text>
                    </Flex>
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
