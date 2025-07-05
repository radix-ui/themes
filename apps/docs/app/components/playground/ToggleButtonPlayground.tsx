'use client';

import React, { useState } from 'react';
import { ToggleButton, Text, Flex, Box, Heading, Tabs, Table } from '@kushagradhawan/kookie-ui';
import { Heart, Star, Bookmark, ThumbsUp, Play, Pause } from 'lucide-react';

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

const variants = ['classic', 'solid', 'soft', 'surface', 'outline', 'ghost'] as const;
const sizes = ['1', '2', '3', '4'] as const;
const radiusOptions = ['none', 'small', 'medium', 'large', 'full'] as const;

export default function ToggleButtonPlayground() {
  const [toggleStates, setToggleStates] = useState<Record<string, boolean>>({});

  const handleToggle = (key: string, pressed: boolean) => {
    setToggleStates((prev) => ({ ...prev, [key]: pressed }));
  };

  return (
    <Flex direction="column" gap="6">
      <Heading size="6" weight="bold">
        Toggle Button
      </Heading>
      <Text size="3" color="gray">
        A button that toggles between selected and unselected states.
      </Text>

      <Tabs.Root defaultValue="theme-colors">
        <Tabs.List size="2">
          <Tabs.Trigger value="theme-colors">Theme colors</Tabs.Trigger>
          <Tabs.Trigger value="all-colors">All colors</Tabs.Trigger>
          <Tabs.Trigger value="all-sizes">All sizes</Tabs.Trigger>
          <Tabs.Trigger value="all-radius">All radius</Tabs.Trigger>
          <Tabs.Trigger value="with-icons">With icons</Tabs.Trigger>
          <Tabs.Trigger value="states">States</Tabs.Trigger>
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
                      style={{ width: '100px', textAlign: 'left' }}
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
                      <ToggleButton
                        size="2"
                        variant={variant}
                        pressed={toggleStates[`accent-${variant}`]}
                        onPressedChange={(pressed: boolean) =>
                          handleToggle(`accent-${variant}`, pressed)
                        }
                      >
                        Toggle
                      </ToggleButton>
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
                      <ToggleButton
                        size="2"
                        variant={variant}
                        color="gray"
                        pressed={toggleStates[`gray-${variant}`]}
                        onPressedChange={(pressed: boolean) =>
                          handleToggle(`gray-${variant}`, pressed)
                        }
                      >
                        Toggle
                      </ToggleButton>
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
                      style={{ width: '100px', textAlign: 'left' }}
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
                  <React.Fragment key={color}>
                    <Table.Row>
                      <Table.RowHeaderCell>
                        <Text size="1" color="gray" style={{ textTransform: 'capitalize' }}>
                          {color}
                        </Text>
                      </Table.RowHeaderCell>
                      {variants.map((variant) => (
                        <Table.Cell key={variant}>
                          <ToggleButton
                            size="2"
                            variant={variant}
                            color={color}
                            pressed={toggleStates[`${color}-${variant}`]}
                            onPressedChange={(pressed: boolean) =>
                              handleToggle(`${color}-${variant}`, pressed)
                            }
                          >
                            Toggle
                          </ToggleButton>
                        </Table.Cell>
                      ))}
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
                      {variants.map((variant) => (
                        <Table.Cell key={variant}>
                          <ToggleButton
                            size="2"
                            variant={variant}
                            color={color}
                            highContrast
                            pressed={toggleStates[`${color}-${variant}-hc`]}
                            onPressedChange={(pressed: boolean) =>
                              handleToggle(`${color}-${variant}-hc`, pressed)
                            }
                          >
                            Toggle
                          </ToggleButton>
                        </Table.Cell>
                      ))}
                    </Table.Row>
                  </React.Fragment>
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
                      style={{ width: '100px', textAlign: 'left' }}
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
                        <ToggleButton
                          size={size as any}
                          variant={variant}
                          pressed={toggleStates[`size-${size}-${variant}`]}
                          onPressedChange={(pressed) =>
                            handleToggle(`size-${size}-${variant}`, pressed)
                          }
                        >
                          Toggle
                        </ToggleButton>
                      </Table.Cell>
                    ))}
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </Tabs.Content>

        {/* All Radius Tab */}
        <Tabs.Content value="all-radius">
          <Box pt="4">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell style={{ width: '120px' }}>
                    <Text size="1" color="gray">
                      Radius
                    </Text>
                  </Table.ColumnHeaderCell>
                  {variants.map((variant) => (
                    <Table.ColumnHeaderCell
                      key={variant}
                      style={{ width: '100px', textAlign: 'left' }}
                    >
                      <Text size="1" color="gray" style={{ textTransform: 'capitalize' }}>
                        {variant}
                      </Text>
                    </Table.ColumnHeaderCell>
                  ))}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {radiusOptions.map((radius) => (
                  <Table.Row key={radius}>
                    <Table.RowHeaderCell>
                      <Text size="1" color="gray" style={{ textTransform: 'capitalize' }}>
                        {radius === 'none' ? 'No radius' : radius}
                      </Text>
                    </Table.RowHeaderCell>
                    {variants.map((variant) => (
                      <Table.Cell key={variant}>
                        <ToggleButton
                          size="2"
                          variant={variant}
                          radius={radius as any}
                          pressed={toggleStates[`radius-${radius}-${variant}`]}
                          onPressedChange={(pressed) =>
                            handleToggle(`radius-${radius}-${variant}`, pressed)
                          }
                        >
                          Toggle
                        </ToggleButton>
                      </Table.Cell>
                    ))}
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </Tabs.Content>

        {/* With Icons Tab */}
        <Tabs.Content value="with-icons">
          <Box pt="4">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell style={{ width: '120px' }}>
                    <Text size="1" color="gray">
                      Icon Type
                    </Text>
                  </Table.ColumnHeaderCell>
                  {variants.map((variant) => (
                    <Table.ColumnHeaderCell
                      key={variant}
                      style={{ width: '120px', textAlign: 'left' }}
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
                      Left icon
                    </Text>
                  </Table.RowHeaderCell>
                  {variants.map((variant) => (
                    <Table.Cell key={variant}>
                      <ToggleButton
                        size="2"
                        variant={variant}
                        pressed={toggleStates[`left-${variant}`]}
                        onPressedChange={(pressed) => handleToggle(`left-${variant}`, pressed)}
                      >
                        <Heart />
                        Like
                      </ToggleButton>
                    </Table.Cell>
                  ))}
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Right icon
                    </Text>
                  </Table.RowHeaderCell>
                  {variants.map((variant) => (
                    <Table.Cell key={variant}>
                      <ToggleButton
                        size="2"
                        variant={variant}
                        pressed={toggleStates[`right-${variant}`]}
                        onPressedChange={(pressed) => handleToggle(`right-${variant}`, pressed)}
                      >
                        Bookmark
                        <Bookmark />
                      </ToggleButton>
                    </Table.Cell>
                  ))}
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Icon only
                    </Text>
                  </Table.RowHeaderCell>
                  {variants.map((variant) => (
                    <Table.Cell key={variant}>
                      <ToggleButton
                        size="2"
                        variant={variant}
                        pressed={toggleStates[`icon-${variant}`]}
                        onPressedChange={(pressed) => handleToggle(`icon-${variant}`, pressed)}
                      >
                        <Star />
                      </ToggleButton>
                    </Table.Cell>
                  ))}
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Play/Pause
                    </Text>
                  </Table.RowHeaderCell>
                  {variants.map((variant) => (
                    <Table.Cell key={variant}>
                      <ToggleButton
                        size="2"
                        variant={variant}
                        pressed={toggleStates[`play-${variant}`]}
                        onPressedChange={(pressed) => handleToggle(`play-${variant}`, pressed)}
                      >
                        {toggleStates[`play-${variant}`] ? <Pause /> : <Play />}
                        {toggleStates[`play-${variant}`] ? 'Pause' : 'Play'}
                      </ToggleButton>
                    </Table.Cell>
                  ))}
                </Table.Row>
              </Table.Body>
            </Table.Root>
          </Box>
        </Tabs.Content>

        {/* States Tab */}
        <Tabs.Content value="states">
          <Box pt="4">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell style={{ width: '120px' }}>
                    <Text size="1" color="gray">
                      State
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '120px' }}>
                    <Text size="1" color="gray">
                      Solid
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '120px' }}>
                    <Text size="1" color="gray">
                      Soft
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '120px' }}>
                    <Text size="1" color="gray">
                      Outline
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '120px' }}>
                    <Text size="1" color="gray">
                      Ghost
                    </Text>
                  </Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Unpressed
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <ToggleButton size="2" variant="solid" pressed={false}>
                      <ThumbsUp />
                      Like
                    </ToggleButton>
                  </Table.Cell>
                  <Table.Cell>
                    <ToggleButton size="2" variant="soft" pressed={false}>
                      <ThumbsUp />
                      Like
                    </ToggleButton>
                  </Table.Cell>
                  <Table.Cell>
                    <ToggleButton size="2" variant="outline" pressed={false}>
                      <ThumbsUp />
                      Like
                    </ToggleButton>
                  </Table.Cell>
                  <Table.Cell>
                    <ToggleButton size="2" variant="ghost" pressed={false}>
                      <ThumbsUp />
                      Like
                    </ToggleButton>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Pressed
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <ToggleButton size="2" variant="solid" pressed={true}>
                      <ThumbsUp />
                      Like
                    </ToggleButton>
                  </Table.Cell>
                  <Table.Cell>
                    <ToggleButton size="2" variant="soft" pressed={true}>
                      <ThumbsUp />
                      Like
                    </ToggleButton>
                  </Table.Cell>
                  <Table.Cell>
                    <ToggleButton size="2" variant="outline" pressed={true}>
                      <ThumbsUp />
                      Like
                    </ToggleButton>
                  </Table.Cell>
                  <Table.Cell>
                    <ToggleButton size="2" variant="ghost" pressed={true}>
                      <ThumbsUp />
                      Like
                    </ToggleButton>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Disabled
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <ToggleButton size="2" variant="solid" disabled>
                      <ThumbsUp />
                      Like
                    </ToggleButton>
                  </Table.Cell>
                  <Table.Cell>
                    <ToggleButton size="2" variant="soft" disabled>
                      <ThumbsUp />
                      Like
                    </ToggleButton>
                  </Table.Cell>
                  <Table.Cell>
                    <ToggleButton size="2" variant="outline" disabled>
                      <ThumbsUp />
                      Like
                    </ToggleButton>
                  </Table.Cell>
                  <Table.Cell>
                    <ToggleButton size="2" variant="ghost" disabled>
                      <ThumbsUp />
                      Like
                    </ToggleButton>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Loading
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <ToggleButton size="2" variant="solid" loading>
                      <ThumbsUp />
                      Like
                    </ToggleButton>
                  </Table.Cell>
                  <Table.Cell>
                    <ToggleButton size="2" variant="soft" loading>
                      <ThumbsUp />
                      Like
                    </ToggleButton>
                  </Table.Cell>
                  <Table.Cell>
                    <ToggleButton size="2" variant="outline" loading>
                      <ThumbsUp />
                      Like
                    </ToggleButton>
                  </Table.Cell>
                  <Table.Cell>
                    <ToggleButton size="2" variant="ghost" loading>
                      <ThumbsUp />
                      Like
                    </ToggleButton>
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
