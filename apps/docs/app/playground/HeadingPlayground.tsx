'use client';

import React from 'react';
import { Heading, Flex, Box, Text, Tabs, Table, Badge } from '@kushagradhawan/kookie-ui';

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
const weights = [
  'thin',
  'extralight',
  'light',
  'regular',
  'medium',
  'semibold',
  'bold',
  'extrabold',
] as const;

export default function HeadingPlayground() {
  return (
    <Flex direction="column" gap="6">
      <Flex direction="column" gap="2">
        <Badge size="2" variant="soft" color="orange" style={{ alignSelf: 'flex-start' }}>
          Updated
        </Badge>
        <Heading size="6" weight="bold">
          Heading
        </Heading>
        <Text size="3" color="gray">
          A component for displaying headings with consistent typography and hierarchy.
        </Text>
      </Flex>

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
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Size 9
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Heading size="9">Welcome to Kookie UI</Heading>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Size 8
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Heading size="8">Design System</Heading>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Size 7
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Heading size="7">Getting Started</Heading>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Size 6
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Heading size="6">Components</Heading>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Size 5
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Heading size="5">Button Component</Heading>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Size 4
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Heading size="4">Props and Usage</Heading>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Size 3
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Heading size="3">Examples</Heading>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Size 2
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Heading size="2">Card Title</Heading>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Size 1
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Heading size="1">Label</Heading>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Size 0
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Heading size="0">Tag</Heading>
                  </Table.Cell>
                </Table.Row>
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
                    <Heading size="4">Default heading color</Heading>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Gray
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Heading size="4" color="gray">
                      Gray colored heading
                    </Heading>
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
                        <Heading size="4" color={color}>
                          {color.charAt(0).toUpperCase() + color.slice(1)} Heading
                        </Heading>
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
                        <Heading size="4" color={color} highContrast>
                          {color.charAt(0).toUpperCase() + color.slice(1)} High Contrast Heading
                        </Heading>
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
                      <Heading size="4" weight={weight as any}>
                        {weight.charAt(0).toUpperCase() + weight.slice(1)} Weight Heading
                      </Heading>
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
                      Scale Hierarchy
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Flex direction="column" gap="3">
                      <Heading size="9" weight="bold">
                        Kookie
                      </Heading>
                      <Heading size="8" weight="bold">
                        Fluffy
                      </Heading>
                      <Heading size="7" weight="bold">
                        Adorable
                      </Heading>
                      <Heading size="6" weight="bold">
                        Playful
                      </Heading>
                      <Heading size="5" weight="bold">
                        Smart
                      </Heading>
                      <Heading size="4" weight="bold">
                        Loyal
                      </Heading>
                      <Heading size="3" weight="bold">
                        Charming
                      </Heading>
                      <Heading size="2" weight="bold">
                        Sweet
                      </Heading>
                      <Heading size="1" weight="bold">
                        Tiny
                      </Heading>
                      <Heading size="0" weight="bold">
                        Paw
                      </Heading>
                    </Flex>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Weight Contrast
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Flex direction="column" gap="3">
                      <Heading size="7" weight="thin">
                        The Art of Being a Shih Tzu
                      </Heading>
                      <Heading size="7" weight="extralight">
                        The Art of Being a Shih Tzu
                      </Heading>
                      <Heading size="7" weight="light">
                        The Art of Being a Shih Tzu
                      </Heading>
                      <Heading size="7" weight="regular">
                        The Art of Being a Shih Tzu
                      </Heading>
                      <Heading size="7" weight="medium">
                        The Art of Being a Shih Tzu
                      </Heading>
                      <Heading size="7" weight="semibold">
                        The Art of Being a Shih Tzu
                      </Heading>
                      <Heading size="7" weight="bold">
                        The Art of Being a Shih Tzu
                      </Heading>
                      <Heading size="7" weight="extrabold">
                        The Art of Being a Shih Tzu
                      </Heading>
                    </Flex>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Modular Scale
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Flex direction="column" gap="4">
                      <Heading size="8" weight="bold">
                        Treats
                      </Heading>
                      <Heading size="6" weight="bold">
                        Belly Rubs
                      </Heading>
                      <Heading size="4" weight="bold">
                        Nap Time
                      </Heading>
                      <Heading size="2" weight="bold">
                        Zoomies
                      </Heading>
                    </Flex>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Proportional Harmony
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Flex direction="column" gap="3">
                      <Heading size="8" weight="bold">
                        Kookie UI Design Philosophy
                      </Heading>
                      <Heading size="5" weight="bold">
                        Small Dog, Big Personality
                      </Heading>
                      <Heading size="3" weight="bold">
                        Compact Yet Powerful
                      </Heading>
                    </Flex>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Editorial Hierarchy
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Flex direction="column" gap="4" style={{ maxWidth: '500px' }}>
                      <Heading size="7" weight="bold">
                        The Daily Life of Kookie
                      </Heading>
                      <Heading size="4" weight="bold">
                        Adventures in Fluff Management
                      </Heading>
                      <Heading size="3" weight="bold">
                        Morning Routine Mastery
                      </Heading>
                      <Heading size="2" weight="bold">
                        The Art of Strategic Napping
                      </Heading>
                    </Flex>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Typographic Rhythm
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Flex direction="column" gap="2">
                      <Heading size="6" weight="bold">
                        Wag
                      </Heading>
                      <Heading size="5" weight="bold">
                        Wiggle
                      </Heading>
                      <Heading size="4" weight="bold">
                        Bounce
                      </Heading>
                      <Heading size="3" weight="bold">
                        Pounce
                      </Heading>
                      <Heading size="2" weight="bold">
                        Zoom
                      </Heading>
                    </Flex>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Visual Weight
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Flex direction="column" gap="3" style={{ maxWidth: '450px' }}>
                      <Heading size="6" weight="thin" color="gray">
                        Gentle Snoring
                      </Heading>
                      <Heading size="6" weight="extralight" color="gray">
                        Quiet Whimpering
                      </Heading>
                      <Heading size="6" weight="light" color="gray">
                        Soft Barking
                      </Heading>
                      <Heading size="6" weight="regular">
                        Curious Sniffing
                      </Heading>
                      <Heading size="6" weight="medium">
                        Excited Barking
                      </Heading>
                      <Heading size="6" weight="semibold">
                        Playful Growling
                      </Heading>
                      <Heading size="6" weight="bold">
                        TREAT TIME!
                      </Heading>
                      <Heading size="6" weight="extrabold">
                        WALKIES NOW!
                      </Heading>
                    </Flex>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Geometric Precision
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Flex direction="column" gap="4">
                      <Heading size="8" weight="bold">
                        FLUFFINESS
                      </Heading>
                      <Heading size="5" weight="bold">
                        Shih Tzu Principles
                      </Heading>
                      <Heading size="3" weight="bold">
                        Maximum Cute
                      </Heading>
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
