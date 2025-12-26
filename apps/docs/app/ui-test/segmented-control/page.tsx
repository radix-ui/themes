'use client';

import React from 'react';
import { SegmentedControl, Text, Flex, Box, Heading, Code, Separator, Container } from '@kushagradhawan/kookie-ui';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Grid02Icon,
  Menu01Icon,
  LayoutIcon,
  LayoutBottomIcon,
  CodeIcon,
  Settings01Icon,
  ColorsIcon,
  Layers01Icon,
  SwatchIcon,
  Search01Icon,
  Copy01Icon,
  Download01Icon,
} from '@hugeicons/core-free-icons';

export default function SegmentedControlTest() {
  const [view, setView] = React.useState('grid');
  const [alignment, setAlignment] = React.useState('left');
  const [theme, setTheme] = React.useState('light');
  const [direction, setDirection] = React.useState('right');
  const [size1Value, setSize1Value] = React.useState('a');
  const [size2Value, setSize2Value] = React.useState('a');
  const [size3Value, setSize3Value] = React.useState('a');
  const [size4Value, setSize4Value] = React.useState('a');
  const [verticalView, setVerticalView] = React.useState('code');
  const [verticalTool, setVerticalTool] = React.useState('search');
  const [verticalText, setVerticalText] = React.useState('day');

  return (
    <Container size="2" px="8" py="8">
      <Flex direction="column" gap="8">
        {/* Header */}
        <Flex direction="column" gap="3">
          <Heading size="9" weight="medium">SegmentedControl</Heading>
          <Text size="2" color="gray">
            Testing icon-only mode and vertical orientation
          </Text>
        </Flex>

        <Separator size="4" />

        {/* Test 1: Basic Text vs Icon-Only Comparison */}
        <Flex direction="column" gap="5">
          <Box>
            <Heading size="6" weight="medium" mb="2">1. Text vs Icon-Only Comparison</Heading>
            <Text size="2" color="gray">
              Compare standard text segments with icon-only fixed-width segments
            </Text>
          </Box>
          
          <Flex direction="column" gap="4">
            <Box>
              <Text size="2" weight="medium" mb="2">Text Labels (default)</Text>
              <SegmentedControl.Root defaultValue="grid">
                <SegmentedControl.Item value="list">List</SegmentedControl.Item>
                <SegmentedControl.Item value="grid">Grid</SegmentedControl.Item>
                <SegmentedControl.Item value="board">Board</SegmentedControl.Item>
              </SegmentedControl.Root>
            </Box>

            <Box>
              <Text size="2" weight="medium" mb="2">Icon-Only (fixed width)</Text>
              <SegmentedControl.Root value={view} onValueChange={setView}>
                <SegmentedControl.Item value="list" iconOnly aria-label="List view">
                  <HugeiconsIcon icon={Menu01Icon} strokeWidth={1.75} />
                </SegmentedControl.Item>
                <SegmentedControl.Item value="grid" iconOnly aria-label="Grid view">
                  <HugeiconsIcon icon={Grid02Icon} strokeWidth={1.75} />
                </SegmentedControl.Item>
                <SegmentedControl.Item value="board" iconOnly aria-label="Board view">
                  <HugeiconsIcon icon={LayoutIcon} strokeWidth={1.75} />
                </SegmentedControl.Item>
              </SegmentedControl.Root>
            </Box>
          </Flex>

          <Box p="4" style={{ background: 'var(--gray-a2)', borderRadius: 'var(--radius-3)' }}>
            <Text size="2" color="gray">
              <Code variant="soft">iconOnly</Code> applies fixed square width = height, with no horizontal padding
            </Text>
          </Box>
        </Flex>

        <Separator size="4" />

        {/* Test 2: All Sizes Icon-Only */}
        <Flex direction="column" gap="5">
          <Box>
            <Heading size="6" weight="medium" mb="2">2. Icon-Only Across All Sizes</Heading>
            <Text size="2" color="gray">
              Each size maintains square aspect ratio
            </Text>
          </Box>
          
          <Flex direction="column" gap="4">
            <Flex align="center" gap="4">
              <Text size="2" style={{ width: 60 }}>Size 1</Text>
              <SegmentedControl.Root size="1" value={size1Value} onValueChange={setSize1Value}>
                <SegmentedControl.Item value="a" iconOnly aria-label="Option A">
                  <HugeiconsIcon icon={Menu01Icon} strokeWidth={1.75} />
                </SegmentedControl.Item>
                <SegmentedControl.Item value="b" iconOnly aria-label="Option B">
                  <HugeiconsIcon icon={Grid02Icon} strokeWidth={1.75} />
                </SegmentedControl.Item>
                <SegmentedControl.Item value="c" iconOnly aria-label="Option C">
                  <HugeiconsIcon icon={LayoutIcon} strokeWidth={1.75} />
                </SegmentedControl.Item>
              </SegmentedControl.Root>
              <Code size="1" variant="soft">24px × 24px</Code>
            </Flex>

            <Flex align="center" gap="4">
              <Text size="2" style={{ width: 60 }}>Size 2</Text>
              <SegmentedControl.Root size="2" value={size2Value} onValueChange={setSize2Value}>
                <SegmentedControl.Item value="a" iconOnly aria-label="Option A">
                  <HugeiconsIcon icon={Menu01Icon} strokeWidth={1.75} />
                </SegmentedControl.Item>
                <SegmentedControl.Item value="b" iconOnly aria-label="Option B">
                  <HugeiconsIcon icon={Grid02Icon} strokeWidth={1.75} />
                </SegmentedControl.Item>
                <SegmentedControl.Item value="c" iconOnly aria-label="Option C">
                  <HugeiconsIcon icon={LayoutIcon} strokeWidth={1.75} />
                </SegmentedControl.Item>
              </SegmentedControl.Root>
              <Code size="1" variant="soft">32px × 32px</Code>
            </Flex>

            <Flex align="center" gap="4">
              <Text size="2" style={{ width: 60 }}>Size 3</Text>
              <SegmentedControl.Root size="3" value={size3Value} onValueChange={setSize3Value}>
                <SegmentedControl.Item value="a" iconOnly aria-label="Option A">
                  <HugeiconsIcon icon={Menu01Icon} strokeWidth={1.75} />
                </SegmentedControl.Item>
                <SegmentedControl.Item value="b" iconOnly aria-label="Option B">
                  <HugeiconsIcon icon={Grid02Icon} strokeWidth={1.75} />
                </SegmentedControl.Item>
                <SegmentedControl.Item value="c" iconOnly aria-label="Option C">
                  <HugeiconsIcon icon={LayoutIcon} strokeWidth={1.75} />
                </SegmentedControl.Item>
              </SegmentedControl.Root>
              <Code size="1" variant="soft">40px × 40px</Code>
            </Flex>

            <Flex align="center" gap="4">
              <Text size="2" style={{ width: 60 }}>Size 4</Text>
              <SegmentedControl.Root size="4" value={size4Value} onValueChange={setSize4Value}>
                <SegmentedControl.Item value="a" iconOnly aria-label="Option A">
                  <HugeiconsIcon icon={Menu01Icon} strokeWidth={1.75} />
                </SegmentedControl.Item>
                <SegmentedControl.Item value="b" iconOnly aria-label="Option B">
                  <HugeiconsIcon icon={Grid02Icon} strokeWidth={1.75} />
                </SegmentedControl.Item>
                <SegmentedControl.Item value="c" iconOnly aria-label="Option C">
                  <HugeiconsIcon icon={LayoutIcon} strokeWidth={1.75} />
                </SegmentedControl.Item>
              </SegmentedControl.Root>
              <Code size="1" variant="soft">48px × 48px</Code>
            </Flex>
          </Flex>

          <Box p="4" style={{ background: 'var(--gray-a2)', borderRadius: 'var(--radius-3)' }}>
            <Text size="2" color="gray">
              Uses <Code variant="soft">--segmented-control-height</Code> for both width and height
            </Text>
          </Box>
        </Flex>

        <Separator size="4" />

        {/* Test 3: Real-World Use Cases */}
        <Flex direction="column" gap="5">
          <Box>
            <Heading size="6" weight="medium" mb="2">3. Real-World Use Cases</Heading>
            <Text size="2" color="gray">
              Common icon-only segmented control patterns
            </Text>
          </Box>
          
          <Flex direction="column" gap="4">
            <Box>
              <Text size="2" weight="medium" mb="2">View Mode</Text>
              <SegmentedControl.Root value={alignment} onValueChange={setAlignment}>
                <SegmentedControl.Item value="left" iconOnly aria-label="Code view">
                  <HugeiconsIcon icon={CodeIcon} strokeWidth={1.75} />
                </SegmentedControl.Item>
                <SegmentedControl.Item value="center" iconOnly aria-label="Layout view">
                  <HugeiconsIcon icon={LayoutIcon} strokeWidth={1.75} />
                </SegmentedControl.Item>
                <SegmentedControl.Item value="right" iconOnly aria-label="Layers view">
                  <HugeiconsIcon icon={Layers01Icon} strokeWidth={1.75} />
                </SegmentedControl.Item>
                <SegmentedControl.Item value="justify" iconOnly aria-label="Settings">
                  <HugeiconsIcon icon={Settings01Icon} strokeWidth={1.75} />
                </SegmentedControl.Item>
              </SegmentedControl.Root>
            </Box>

            <Box>
              <Text size="2" weight="medium" mb="2">Tool Picker</Text>
              <SegmentedControl.Root value={theme} onValueChange={setTheme}>
                <SegmentedControl.Item value="light" iconOnly aria-label="Search">
                  <HugeiconsIcon icon={Search01Icon} strokeWidth={1.75} />
                </SegmentedControl.Item>
                <SegmentedControl.Item value="dark" iconOnly aria-label="Copy">
                  <HugeiconsIcon icon={Copy01Icon} strokeWidth={1.75} />
                </SegmentedControl.Item>
                <SegmentedControl.Item value="system" iconOnly aria-label="Download">
                  <HugeiconsIcon icon={Download01Icon} strokeWidth={1.75} />
                </SegmentedControl.Item>
              </SegmentedControl.Root>
            </Box>

            <Box>
              <Text size="2" weight="medium" mb="2">Style Picker</Text>
              <SegmentedControl.Root value={direction} onValueChange={setDirection}>
                <SegmentedControl.Item value="left" iconOnly aria-label="Colors">
                  <HugeiconsIcon icon={ColorsIcon} strokeWidth={1.75} />
                </SegmentedControl.Item>
                <SegmentedControl.Item value="up" iconOnly aria-label="Swatch">
                  <HugeiconsIcon icon={SwatchIcon} strokeWidth={1.75} />
                </SegmentedControl.Item>
                <SegmentedControl.Item value="down" iconOnly aria-label="Layout bottom">
                  <HugeiconsIcon icon={LayoutBottomIcon} strokeWidth={1.75} />
                </SegmentedControl.Item>
                <SegmentedControl.Item value="right" iconOnly aria-label="Grid">
                  <HugeiconsIcon icon={Grid02Icon} strokeWidth={1.75} />
                </SegmentedControl.Item>
              </SegmentedControl.Root>
            </Box>
          </Flex>

          <Box p="4" style={{ background: 'var(--gray-a2)', borderRadius: 'var(--radius-3)' }}>
            <Text size="2" color="gray">
              Always include <Code variant="soft">aria-label</Code> for accessibility when using icon-only segments
            </Text>
          </Box>
        </Flex>

        <Separator size="4" />

        {/* Test 4: Visual Preview */}
        <Flex direction="column" gap="5">
          <Box>
            <Heading size="6" weight="medium" mb="2">4. Interactive Preview</Heading>
            <Text size="2" color="gray">
              See the selected values reflected in real-time
            </Text>
          </Box>
          
          <Box 
            p="6" 
            style={{ 
              background: 'var(--gray-a2)', 
              borderRadius: 'var(--radius-3)',
              minHeight: 120,
            }}
          >
            <Flex gap="4" wrap="wrap">
              <Code variant="soft">View: {view}</Code>
              <Code variant="soft">Mode: {alignment}</Code>
              <Code variant="soft">Tool: {theme}</Code>
              <Code variant="soft">Style: {direction}</Code>
            </Flex>
          </Box>
        </Flex>

        <Separator size="4" />

        {/* Test 5: Indicator Animation */}
        <Flex direction="column" gap="5">
          <Box>
            <Heading size="6" weight="medium" mb="2">5. Indicator Animation</Heading>
            <Text size="2" color="gray">
              The sliding indicator works correctly with equal-width icon-only items
            </Text>
          </Box>
          
          <Flex gap="4" wrap="wrap">
            <SegmentedControl.Root defaultValue="1" size="3">
              <SegmentedControl.Item value="1" iconOnly aria-label="Option 1">
                <Text size="3" weight="bold">1</Text>
              </SegmentedControl.Item>
              <SegmentedControl.Item value="2" iconOnly aria-label="Option 2">
                <Text size="3" weight="bold">2</Text>
              </SegmentedControl.Item>
              <SegmentedControl.Item value="3" iconOnly aria-label="Option 3">
                <Text size="3" weight="bold">3</Text>
              </SegmentedControl.Item>
              <SegmentedControl.Item value="4" iconOnly aria-label="Option 4">
                <Text size="3" weight="bold">4</Text>
              </SegmentedControl.Item>
              <SegmentedControl.Item value="5" iconOnly aria-label="Option 5">
                <Text size="3" weight="bold">5</Text>
              </SegmentedControl.Item>
            </SegmentedControl.Root>
          </Flex>

          <Box p="4" style={{ background: 'var(--gray-a2)', borderRadius: 'var(--radius-3)' }}>
            <Text size="2" color="gray">
              Click different segments to see the smooth sliding animation
            </Text>
          </Box>
        </Flex>

        <Separator size="4" />

        {/* Test 6: Full Width Icon-Only */}
        <Flex direction="column" gap="5">
          <Box>
            <Heading size="6" weight="medium" mb="2">6. Full Width Icon-Only</Heading>
            <Text size="2" color="gray">
              Icon-only items grow to fill available space while keeping icons centered
            </Text>
          </Box>
          
          <Flex direction="column" gap="4">
            <Box>
              <Text size="2" weight="medium" mb="2">Narrow container (default)</Text>
              <SegmentedControl.Root defaultValue="list" size="2">
                <SegmentedControl.Item value="list" iconOnly aria-label="List view">
                  <HugeiconsIcon icon={Menu01Icon} strokeWidth={1.75} />
                </SegmentedControl.Item>
                <SegmentedControl.Item value="grid" iconOnly aria-label="Grid view">
                  <HugeiconsIcon icon={Grid02Icon} strokeWidth={1.75} />
                </SegmentedControl.Item>
                <SegmentedControl.Item value="board" iconOnly aria-label="Board view">
                  <HugeiconsIcon icon={LayoutIcon} strokeWidth={1.75} />
                </SegmentedControl.Item>
              </SegmentedControl.Root>
            </Box>

            <Box>
              <Text size="2" weight="medium" mb="2">Full width container</Text>
              <Box style={{ width: '100%' }}>
                <SegmentedControl.Root defaultValue="list" size="2" style={{ width: '100%' }}>
                  <SegmentedControl.Item value="list" iconOnly aria-label="List view">
                    <HugeiconsIcon icon={Menu01Icon} strokeWidth={1.75} />
                  </SegmentedControl.Item>
                  <SegmentedControl.Item value="grid" iconOnly aria-label="Grid view">
                    <HugeiconsIcon icon={Grid02Icon} strokeWidth={1.75} />
                  </SegmentedControl.Item>
                  <SegmentedControl.Item value="board" iconOnly aria-label="Board view">
                    <HugeiconsIcon icon={LayoutIcon} strokeWidth={1.75} />
                  </SegmentedControl.Item>
                </SegmentedControl.Root>
              </Box>
            </Box>

            <Box>
              <Text size="2" weight="medium" mb="2">Wide container with 2 items</Text>
              <Box style={{ width: '400px', maxWidth: '100%' }}>
                <SegmentedControl.Root defaultValue="light" size="3" style={{ width: '100%' }}>
                  <SegmentedControl.Item value="light" iconOnly aria-label="Light mode">
                    <HugeiconsIcon icon={Search01Icon} strokeWidth={1.75} />
                  </SegmentedControl.Item>
                  <SegmentedControl.Item value="dark" iconOnly aria-label="Dark mode">
                    <HugeiconsIcon icon={Copy01Icon} strokeWidth={1.75} />
                  </SegmentedControl.Item>
                </SegmentedControl.Root>
              </Box>
            </Box>
          </Flex>

          <Box p="4" style={{ background: 'var(--gray-a2)', borderRadius: 'var(--radius-3)' }}>
            <Text size="2" color="gray">
              Items maintain minimum square dimensions but grow equally to fill container. Icons stay perfectly centered using <Code variant="soft">minmax(height, 1fr)</Code> grid columns.
            </Text>
          </Box>
        </Flex>

        <Separator size="4" />

        {/* Test 7: Vertical Orientation - Icon-Only (Recommended) */}
        <Flex direction="column" gap="5">
          <Box>
            <Heading size="6" weight="medium" mb="2">7. Vertical Orientation - Icon-Only (Recommended)</Heading>
            <Text size="2" color="gray">
              Vertical orientation works best with icon-only segments for compact toolbars and sidebars
            </Text>
          </Box>
          
          <Flex gap="6" wrap="wrap" align="start">
            <Box>
              <Text size="2" weight="medium" mb="2">Size 1</Text>
              <SegmentedControl.Root orientation="vertical" size="1" defaultValue="code">
                <SegmentedControl.Item value="code" iconOnly aria-label="Code view">
                  <HugeiconsIcon icon={CodeIcon} strokeWidth={1.75} />
                </SegmentedControl.Item>
                <SegmentedControl.Item value="layout" iconOnly aria-label="Layout view">
                  <HugeiconsIcon icon={LayoutIcon} strokeWidth={1.75} />
                </SegmentedControl.Item>
                <SegmentedControl.Item value="layers" iconOnly aria-label="Layers view">
                  <HugeiconsIcon icon={Layers01Icon} strokeWidth={1.75} />
                </SegmentedControl.Item>
              </SegmentedControl.Root>
            </Box>

            <Box>
              <Text size="2" weight="medium" mb="2">Size 2</Text>
              <SegmentedControl.Root orientation="vertical" size="2" defaultValue="code">
                <SegmentedControl.Item value="code" iconOnly aria-label="Code view">
                  <HugeiconsIcon icon={CodeIcon} strokeWidth={1.75} />
                </SegmentedControl.Item>
                <SegmentedControl.Item value="layout" iconOnly aria-label="Layout view">
                  <HugeiconsIcon icon={LayoutIcon} strokeWidth={1.75} />
                </SegmentedControl.Item>
                <SegmentedControl.Item value="layers" iconOnly aria-label="Layers view">
                  <HugeiconsIcon icon={Layers01Icon} strokeWidth={1.75} />
                </SegmentedControl.Item>
              </SegmentedControl.Root>
            </Box>

            <Box>
              <Text size="2" weight="medium" mb="2">Size 3</Text>
              <SegmentedControl.Root orientation="vertical" size="3" value={verticalView} onValueChange={setVerticalView}>
                <SegmentedControl.Item value="code" iconOnly aria-label="Code view">
                  <HugeiconsIcon icon={CodeIcon} strokeWidth={1.75} />
                </SegmentedControl.Item>
                <SegmentedControl.Item value="layout" iconOnly aria-label="Layout view">
                  <HugeiconsIcon icon={LayoutIcon} strokeWidth={1.75} />
                </SegmentedControl.Item>
                <SegmentedControl.Item value="layers" iconOnly aria-label="Layers view">
                  <HugeiconsIcon icon={Layers01Icon} strokeWidth={1.75} />
                </SegmentedControl.Item>
                <SegmentedControl.Item value="settings" iconOnly aria-label="Settings">
                  <HugeiconsIcon icon={Settings01Icon} strokeWidth={1.75} />
                </SegmentedControl.Item>
              </SegmentedControl.Root>
            </Box>

            <Box>
              <Text size="2" weight="medium" mb="2">Size 4</Text>
              <SegmentedControl.Root orientation="vertical" size="4" defaultValue="code">
                <SegmentedControl.Item value="code" iconOnly aria-label="Code view">
                  <HugeiconsIcon icon={CodeIcon} strokeWidth={1.75} />
                </SegmentedControl.Item>
                <SegmentedControl.Item value="layout" iconOnly aria-label="Layout view">
                  <HugeiconsIcon icon={LayoutIcon} strokeWidth={1.75} />
                </SegmentedControl.Item>
                <SegmentedControl.Item value="layers" iconOnly aria-label="Layers view">
                  <HugeiconsIcon icon={Layers01Icon} strokeWidth={1.75} />
                </SegmentedControl.Item>
              </SegmentedControl.Root>
            </Box>
          </Flex>

          <Box p="4" style={{ background: 'var(--gray-a2)', borderRadius: 'var(--radius-3)' }}>
            <Text size="2" color="gray">
              Selected: <Code variant="soft">{verticalView}</Code> - Perfect for sidebar tools and compact interfaces
            </Text>
          </Box>
        </Flex>

        <Separator size="4" />

        {/* Test 8: Vertical vs Horizontal Comparison */}
        <Flex direction="column" gap="5">
          <Box>
            <Heading size="6" weight="medium" mb="2">8. Orientation Comparison</Heading>
            <Text size="2" color="gray">
              Same control in both orientations
            </Text>
          </Box>
          
          <Flex gap="6" wrap="wrap" align="start">
            <Box>
              <Text size="2" weight="medium" mb="2">Horizontal (default)</Text>
              <SegmentedControl.Root size="3" value={verticalTool} onValueChange={setVerticalTool}>
                <SegmentedControl.Item value="search" iconOnly aria-label="Search">
                  <HugeiconsIcon icon={Search01Icon} strokeWidth={1.75} />
                </SegmentedControl.Item>
                <SegmentedControl.Item value="copy" iconOnly aria-label="Copy">
                  <HugeiconsIcon icon={Copy01Icon} strokeWidth={1.75} />
                </SegmentedControl.Item>
                <SegmentedControl.Item value="download" iconOnly aria-label="Download">
                  <HugeiconsIcon icon={Download01Icon} strokeWidth={1.75} />
                </SegmentedControl.Item>
              </SegmentedControl.Root>
            </Box>

            <Box>
              <Text size="2" weight="medium" mb="2">Vertical</Text>
              <SegmentedControl.Root orientation="vertical" size="3" value={verticalTool} onValueChange={setVerticalTool}>
                <SegmentedControl.Item value="search" iconOnly aria-label="Search">
                  <HugeiconsIcon icon={Search01Icon} strokeWidth={1.75} />
                </SegmentedControl.Item>
                <SegmentedControl.Item value="copy" iconOnly aria-label="Copy">
                  <HugeiconsIcon icon={Copy01Icon} strokeWidth={1.75} />
                </SegmentedControl.Item>
                <SegmentedControl.Item value="download" iconOnly aria-label="Download">
                  <HugeiconsIcon icon={Download01Icon} strokeWidth={1.75} />
                </SegmentedControl.Item>
              </SegmentedControl.Root>
            </Box>
          </Flex>

          <Box p="4" style={{ background: 'var(--gray-a2)', borderRadius: 'var(--radius-3)' }}>
            <Text size="2" color="gray">
              Both controls are synced: <Code variant="soft">{verticalTool}</Code>
            </Text>
          </Box>
        </Flex>

        <Separator size="4" />

        {/* Test 9: Vertical with Text (Less Ideal) */}
        <Flex direction="column" gap="5">
          <Box>
            <Heading size="6" weight="medium" mb="2">9. Vertical with Text (Less Ideal)</Heading>
            <Text size="2" color="gray">
              Text labels work but are less recommended. Best with very short labels.
            </Text>
          </Box>
          
          <Flex gap="6" wrap="wrap" align="start">
            <Box>
              <Text size="2" weight="medium" mb="2">Short labels (OK)</Text>
              <SegmentedControl.Root orientation="vertical" size="2" value={verticalText} onValueChange={setVerticalText}>
                <SegmentedControl.Item value="day">Day</SegmentedControl.Item>
                <SegmentedControl.Item value="week">Week</SegmentedControl.Item>
                <SegmentedControl.Item value="month">Month</SegmentedControl.Item>
              </SegmentedControl.Root>
            </Box>

            <Box>
              <Text size="2" weight="medium" mb="2">With icons (Better)</Text>
              <SegmentedControl.Root orientation="vertical" size="3" defaultValue="list">
                <SegmentedControl.Item value="list">
                  <HugeiconsIcon icon={Menu01Icon} strokeWidth={1.75} />
                  List
                </SegmentedControl.Item>
                <SegmentedControl.Item value="grid">
                  <HugeiconsIcon icon={Grid02Icon} strokeWidth={1.75} />
                  Grid
                </SegmentedControl.Item>
                <SegmentedControl.Item value="board">
                  <HugeiconsIcon icon={LayoutIcon} strokeWidth={1.75} />
                  Board
                </SegmentedControl.Item>
              </SegmentedControl.Root>
            </Box>
          </Flex>

          <Box p="4" style={{ background: 'var(--orange-a2)', borderRadius: 'var(--radius-3)' }}>
            <Text size="2" color="orange">
              ⚠️ For longer text labels, prefer horizontal orientation or consider using Radio Group or Tabs
            </Text>
          </Box>
        </Flex>

        <Separator size="4" />

        {/* Test 10: Real-World Vertical Use Cases */}
        <Flex direction="column" gap="5">
          <Box>
            <Heading size="6" weight="medium" mb="2">10. Real-World Vertical Use Cases</Heading>
            <Text size="2" color="gray">
              Common patterns for vertical segmented controls
            </Text>
          </Box>
          
          <Flex gap="6" wrap="wrap" align="start">
            <Box>
              <Text size="2" weight="medium" mb="2">Sidebar Tool Palette</Text>
              <SegmentedControl.Root orientation="vertical" size="2" defaultValue="colors">
                <SegmentedControl.Item value="colors" iconOnly aria-label="Colors">
                  <HugeiconsIcon icon={ColorsIcon} strokeWidth={1.75} />
                </SegmentedControl.Item>
                <SegmentedControl.Item value="swatch" iconOnly aria-label="Swatch">
                  <HugeiconsIcon icon={SwatchIcon} strokeWidth={1.75} />
                </SegmentedControl.Item>
                <SegmentedControl.Item value="layout" iconOnly aria-label="Layout">
                  <HugeiconsIcon icon={LayoutBottomIcon} strokeWidth={1.75} />
                </SegmentedControl.Item>
                <SegmentedControl.Item value="grid" iconOnly aria-label="Grid">
                  <HugeiconsIcon icon={Grid02Icon} strokeWidth={1.75} />
                </SegmentedControl.Item>
              </SegmentedControl.Root>
            </Box>

            <Box>
              <Text size="2" weight="medium" mb="2">Compact Navigation</Text>
              <SegmentedControl.Root orientation="vertical" size="3" defaultValue="code">
                <SegmentedControl.Item value="code" iconOnly aria-label="Code">
                  <HugeiconsIcon icon={CodeIcon} strokeWidth={1.75} />
                </SegmentedControl.Item>
                <SegmentedControl.Item value="layers" iconOnly aria-label="Layers">
                  <HugeiconsIcon icon={Layers01Icon} strokeWidth={1.75} />
                </SegmentedControl.Item>
                <SegmentedControl.Item value="settings" iconOnly aria-label="Settings">
                  <HugeiconsIcon icon={Settings01Icon} strokeWidth={1.75} />
                </SegmentedControl.Item>
              </SegmentedControl.Root>
            </Box>

            <Box>
              <Text size="2" weight="medium" mb="2">View Switcher</Text>
              <SegmentedControl.Root orientation="vertical" size="2" defaultValue="list">
                <SegmentedControl.Item value="list" iconOnly aria-label="List view">
                  <HugeiconsIcon icon={Menu01Icon} strokeWidth={1.75} />
                </SegmentedControl.Item>
                <SegmentedControl.Item value="grid" iconOnly aria-label="Grid view">
                  <HugeiconsIcon icon={Grid02Icon} strokeWidth={1.75} />
                </SegmentedControl.Item>
                <SegmentedControl.Item value="board" iconOnly aria-label="Board view">
                  <HugeiconsIcon icon={LayoutIcon} strokeWidth={1.75} />
                </SegmentedControl.Item>
              </SegmentedControl.Root>
            </Box>
          </Flex>

          <Box p="4" style={{ background: 'var(--gray-a2)', borderRadius: 'var(--radius-3)' }}>
            <Text size="2" color="gray">
              Vertical icon-only controls are perfect for sidebars, tool palettes, and compact navigation rails
            </Text>
          </Box>
        </Flex>

        <Separator size="4" />

        {/* Test 11: Vertical Indicator Animation */}
        <Flex direction="column" gap="5">
          <Box>
            <Heading size="6" weight="medium" mb="2">11. Vertical Indicator Animation</Heading>
            <Text size="2" color="gray">
              The sliding indicator animates smoothly in vertical orientation
            </Text>
          </Box>
          
          <Flex gap="6" wrap="wrap" align="start">
            <SegmentedControl.Root orientation="vertical" size="3" defaultValue="1">
              <SegmentedControl.Item value="1" iconOnly aria-label="Option 1">
                <Text size="3" weight="bold">1</Text>
              </SegmentedControl.Item>
              <SegmentedControl.Item value="2" iconOnly aria-label="Option 2">
                <Text size="3" weight="bold">2</Text>
              </SegmentedControl.Item>
              <SegmentedControl.Item value="3" iconOnly aria-label="Option 3">
                <Text size="3" weight="bold">3</Text>
              </SegmentedControl.Item>
              <SegmentedControl.Item value="4" iconOnly aria-label="Option 4">
                <Text size="3" weight="bold">4</Text>
              </SegmentedControl.Item>
              <SegmentedControl.Item value="5" iconOnly aria-label="Option 5">
                <Text size="3" weight="bold">5</Text>
              </SegmentedControl.Item>
            </SegmentedControl.Root>

            <SegmentedControl.Root orientation="vertical" size="2" defaultValue="a">
              <SegmentedControl.Item value="a" iconOnly aria-label="Option A">
                <Text size="2" weight="bold">A</Text>
              </SegmentedControl.Item>
              <SegmentedControl.Item value="b" iconOnly aria-label="Option B">
                <Text size="2" weight="bold">B</Text>
              </SegmentedControl.Item>
              <SegmentedControl.Item value="c" iconOnly aria-label="Option C">
                <Text size="2" weight="bold">C</Text>
              </SegmentedControl.Item>
            </SegmentedControl.Root>
          </Flex>

          <Box p="4" style={{ background: 'var(--gray-a2)', borderRadius: 'var(--radius-3)' }}>
            <Text size="2" color="gray">
              Click different segments to see the smooth vertical sliding animation with spring physics
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Container>
  );
}

