'use client';

import React, { useState } from 'react';
import { ToggleIconButton, Text, Flex, Box, Heading, Tabs, Table } from '@kushagradhawan/kookie-ui';
import {
  Heart,
  Star,
  Bookmark,
  ThumbsUp,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  Sun,
  Moon,
  Mic,
  MicOff,
} from 'lucide-react';

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

export default function ToggleIconButtonPlayground() {
  const [toggleStates, setToggleStates] = useState<Record<string, boolean>>({});

  const handleToggle = (key: string, pressed: boolean) => {
    setToggleStates((prev) => ({ ...prev, [key]: pressed }));
  };

  return (
    <Flex direction="column" gap="6">
      <Heading size="6" weight="bold">
        Toggle Icon Button
      </Heading>
      <Text size="3" color="gray">
        An icon-only button that toggles between selected and unselected states.
      </Text>

      <Tabs.Root defaultValue="theme-colors">
        <Tabs.List size="2">
          <Tabs.Trigger value="theme-colors">Theme colors</Tabs.Trigger>
          <Tabs.Trigger value="all-colors">All colors</Tabs.Trigger>
          <Tabs.Trigger value="all-sizes">All sizes</Tabs.Trigger>
          <Tabs.Trigger value="all-radius">All radius</Tabs.Trigger>
          <Tabs.Trigger value="icon-types">Icon types</Tabs.Trigger>
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
                      style={{ width: '80px', textAlign: 'left' }}
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
                      <ToggleIconButton
                        size="2"
                        variant={variant}
                        pressed={toggleStates[`accent-${variant}`]}
                        onPressedChange={(pressed) => handleToggle(`accent-${variant}`, pressed)}
                        aria-label="Toggle favorite"
                      >
                        <Heart />
                      </ToggleIconButton>
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
                      <ToggleIconButton
                        size="2"
                        variant={variant}
                        color="gray"
                        pressed={toggleStates[`gray-${variant}`]}
                        onPressedChange={(pressed) => handleToggle(`gray-${variant}`, pressed)}
                        aria-label="Toggle favorite"
                      >
                        <Heart />
                      </ToggleIconButton>
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
                      style={{ width: '80px', textAlign: 'left' }}
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
                          <ToggleIconButton
                            size="2"
                            variant={variant}
                            color={color}
                            pressed={toggleStates[`${color}-${variant}`]}
                            onPressedChange={(pressed) =>
                              handleToggle(`${color}-${variant}`, pressed)
                            }
                            aria-label="Toggle favorite"
                          >
                            <Heart />
                          </ToggleIconButton>
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
                          <ToggleIconButton
                            size="2"
                            variant={variant}
                            color={color}
                            highContrast
                            pressed={toggleStates[`${color}-${variant}-hc`]}
                            onPressedChange={(pressed) =>
                              handleToggle(`${color}-${variant}-hc`, pressed)
                            }
                            aria-label="Toggle favorite"
                          >
                            <Heart />
                          </ToggleIconButton>
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
                      style={{ width: '80px', textAlign: 'left' }}
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
                        <ToggleIconButton
                          size={size as any}
                          variant={variant}
                          pressed={toggleStates[`size-${size}-${variant}`]}
                          onPressedChange={(pressed) =>
                            handleToggle(`size-${size}-${variant}`, pressed)
                          }
                          aria-label="Toggle favorite"
                        >
                          <Heart />
                        </ToggleIconButton>
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
                      style={{ width: '80px', textAlign: 'left' }}
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
                        <ToggleIconButton
                          size="2"
                          variant={variant}
                          radius={radius as any}
                          pressed={toggleStates[`radius-${radius}-${variant}`]}
                          onPressedChange={(pressed) =>
                            handleToggle(`radius-${radius}-${variant}`, pressed)
                          }
                          aria-label="Toggle favorite"
                        >
                          <Heart />
                        </ToggleIconButton>
                      </Table.Cell>
                    ))}
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </Tabs.Content>

        {/* Icon Types Tab */}
        <Tabs.Content value="icon-types">
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
                      style={{ width: '80px', textAlign: 'left' }}
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
                      Heart
                    </Text>
                  </Table.RowHeaderCell>
                  {variants.map((variant) => (
                    <Table.Cell key={variant}>
                      <ToggleIconButton
                        size="2"
                        variant={variant}
                        pressed={toggleStates[`heart-${variant}`]}
                        onPressedChange={(pressed) => handleToggle(`heart-${variant}`, pressed)}
                        aria-label="Toggle favorite"
                      >
                        <Heart />
                      </ToggleIconButton>
                    </Table.Cell>
                  ))}
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Star
                    </Text>
                  </Table.RowHeaderCell>
                  {variants.map((variant) => (
                    <Table.Cell key={variant}>
                      <ToggleIconButton
                        size="2"
                        variant={variant}
                        pressed={toggleStates[`star-${variant}`]}
                        onPressedChange={(pressed) => handleToggle(`star-${variant}`, pressed)}
                        aria-label="Toggle star"
                      >
                        <Star />
                      </ToggleIconButton>
                    </Table.Cell>
                  ))}
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Bookmark
                    </Text>
                  </Table.RowHeaderCell>
                  {variants.map((variant) => (
                    <Table.Cell key={variant}>
                      <ToggleIconButton
                        size="2"
                        variant={variant}
                        pressed={toggleStates[`bookmark-${variant}`]}
                        onPressedChange={(pressed) => handleToggle(`bookmark-${variant}`, pressed)}
                        aria-label="Toggle bookmark"
                      >
                        <Bookmark />
                      </ToggleIconButton>
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
                      <ToggleIconButton
                        size="2"
                        variant={variant}
                        pressed={toggleStates[`play-${variant}`]}
                        onPressedChange={(pressed) => handleToggle(`play-${variant}`, pressed)}
                        aria-label={toggleStates[`play-${variant}`] ? 'Pause' : 'Play'}
                      >
                        {toggleStates[`play-${variant}`] ? <Pause /> : <Play />}
                      </ToggleIconButton>
                    </Table.Cell>
                  ))}
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Volume
                    </Text>
                  </Table.RowHeaderCell>
                  {variants.map((variant) => (
                    <Table.Cell key={variant}>
                      <ToggleIconButton
                        size="2"
                        variant={variant}
                        pressed={toggleStates[`volume-${variant}`]}
                        onPressedChange={(pressed) => handleToggle(`volume-${variant}`, pressed)}
                        aria-label={toggleStates[`volume-${variant}`] ? 'Unmute' : 'Mute'}
                      >
                        {toggleStates[`volume-${variant}`] ? <VolumeX /> : <Volume2 />}
                      </ToggleIconButton>
                    </Table.Cell>
                  ))}
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Visibility
                    </Text>
                  </Table.RowHeaderCell>
                  {variants.map((variant) => (
                    <Table.Cell key={variant}>
                      <ToggleIconButton
                        size="2"
                        variant={variant}
                        pressed={toggleStates[`visibility-${variant}`]}
                        onPressedChange={(pressed) =>
                          handleToggle(`visibility-${variant}`, pressed)
                        }
                        aria-label={toggleStates[`visibility-${variant}`] ? 'Hide' : 'Show'}
                      >
                        {toggleStates[`visibility-${variant}`] ? <EyeOff /> : <Eye />}
                      </ToggleIconButton>
                    </Table.Cell>
                  ))}
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Theme
                    </Text>
                  </Table.RowHeaderCell>
                  {variants.map((variant) => (
                    <Table.Cell key={variant}>
                      <ToggleIconButton
                        size="2"
                        variant={variant}
                        pressed={toggleStates[`theme-${variant}`]}
                        onPressedChange={(pressed) => handleToggle(`theme-${variant}`, pressed)}
                        aria-label={toggleStates[`theme-${variant}`] ? 'Dark mode' : 'Light mode'}
                      >
                        {toggleStates[`theme-${variant}`] ? <Moon /> : <Sun />}
                      </ToggleIconButton>
                    </Table.Cell>
                  ))}
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Microphone
                    </Text>
                  </Table.RowHeaderCell>
                  {variants.map((variant) => (
                    <Table.Cell key={variant}>
                      <ToggleIconButton
                        size="2"
                        variant={variant}
                        pressed={toggleStates[`mic-${variant}`]}
                        onPressedChange={(pressed) => handleToggle(`mic-${variant}`, pressed)}
                        aria-label={
                          toggleStates[`mic-${variant}`] ? 'Unmute microphone' : 'Mute microphone'
                        }
                      >
                        {toggleStates[`mic-${variant}`] ? <MicOff /> : <Mic />}
                      </ToggleIconButton>
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
                  <Table.ColumnHeaderCell style={{ width: '80px' }}>
                    <Text size="1" color="gray">
                      Solid
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '80px' }}>
                    <Text size="1" color="gray">
                      Soft
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '80px' }}>
                    <Text size="1" color="gray">
                      Outline
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '80px' }}>
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
                    <ToggleIconButton
                      size="2"
                      variant="solid"
                      pressed={false}
                      aria-label="Toggle like"
                    >
                      <ThumbsUp />
                    </ToggleIconButton>
                  </Table.Cell>
                  <Table.Cell>
                    <ToggleIconButton
                      size="2"
                      variant="soft"
                      pressed={false}
                      aria-label="Toggle like"
                    >
                      <ThumbsUp />
                    </ToggleIconButton>
                  </Table.Cell>
                  <Table.Cell>
                    <ToggleIconButton
                      size="2"
                      variant="outline"
                      pressed={false}
                      aria-label="Toggle like"
                    >
                      <ThumbsUp />
                    </ToggleIconButton>
                  </Table.Cell>
                  <Table.Cell>
                    <ToggleIconButton
                      size="2"
                      variant="ghost"
                      pressed={false}
                      aria-label="Toggle like"
                    >
                      <ThumbsUp />
                    </ToggleIconButton>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Pressed
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <ToggleIconButton
                      size="2"
                      variant="solid"
                      pressed={true}
                      aria-label="Toggle like"
                    >
                      <ThumbsUp />
                    </ToggleIconButton>
                  </Table.Cell>
                  <Table.Cell>
                    <ToggleIconButton
                      size="2"
                      variant="soft"
                      pressed={true}
                      aria-label="Toggle like"
                    >
                      <ThumbsUp />
                    </ToggleIconButton>
                  </Table.Cell>
                  <Table.Cell>
                    <ToggleIconButton
                      size="2"
                      variant="outline"
                      pressed={true}
                      aria-label="Toggle like"
                    >
                      <ThumbsUp />
                    </ToggleIconButton>
                  </Table.Cell>
                  <Table.Cell>
                    <ToggleIconButton
                      size="2"
                      variant="ghost"
                      pressed={true}
                      aria-label="Toggle like"
                    >
                      <ThumbsUp />
                    </ToggleIconButton>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Disabled
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <ToggleIconButton size="2" variant="solid" disabled aria-label="Toggle like">
                      <ThumbsUp />
                    </ToggleIconButton>
                  </Table.Cell>
                  <Table.Cell>
                    <ToggleIconButton size="2" variant="soft" disabled aria-label="Toggle like">
                      <ThumbsUp />
                    </ToggleIconButton>
                  </Table.Cell>
                  <Table.Cell>
                    <ToggleIconButton size="2" variant="outline" disabled aria-label="Toggle like">
                      <ThumbsUp />
                    </ToggleIconButton>
                  </Table.Cell>
                  <Table.Cell>
                    <ToggleIconButton size="2" variant="ghost" disabled aria-label="Toggle like">
                      <ThumbsUp />
                    </ToggleIconButton>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Loading
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <ToggleIconButton size="2" variant="solid" loading aria-label="Toggle like">
                      <ThumbsUp />
                    </ToggleIconButton>
                  </Table.Cell>
                  <Table.Cell>
                    <ToggleIconButton size="2" variant="soft" loading aria-label="Toggle like">
                      <ThumbsUp />
                    </ToggleIconButton>
                  </Table.Cell>
                  <Table.Cell>
                    <ToggleIconButton size="2" variant="outline" loading aria-label="Toggle like">
                      <ThumbsUp />
                    </ToggleIconButton>
                  </Table.Cell>
                  <Table.Cell>
                    <ToggleIconButton size="2" variant="ghost" loading aria-label="Toggle like">
                      <ThumbsUp />
                    </ToggleIconButton>
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
