'use client';

import React from 'react';
import { Callout, Text, Flex, Box, Heading, Tabs, Table } from '@kushagradhawan/kookie-ui';
import { Info, AlertTriangle, CheckCircle, XCircle, AlertCircle, Lightbulb } from 'lucide-react';

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

const variants = ['soft', 'surface', 'outline'] as const;
const sizes = ['1', '2', '3'] as const;

// Sample content for callouts
const sampleContent = {
  short: 'This is a callout message.',
  medium:
    'This is a sample callout with some content to demonstrate how text flows within different callout variants and sizes.',
  long: 'This is a longer callout message that demonstrates how callouts handle more substantial amounts of text. Callouts should maintain proper spacing and readability regardless of content length.',
};

export default function CalloutPlayground() {
  return (
    <Flex direction="column" gap="6">
      <Heading size="6" weight="bold">
        Callout
      </Heading>

      <Tabs.Root defaultValue="variants">
        <Tabs.List size="2">
          <Tabs.Trigger value="variants">Variants</Tabs.Trigger>
          <Tabs.Trigger value="theme-colors">Theme colors</Tabs.Trigger>
          <Tabs.Trigger value="all-colors">All colors</Tabs.Trigger>
          <Tabs.Trigger value="sizes">Sizes</Tabs.Trigger>
          <Tabs.Trigger value="with-icons">With icons</Tabs.Trigger>
          <Tabs.Trigger value="content-examples">Content examples</Tabs.Trigger>
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
                  <Table.ColumnHeaderCell style={{ width: '300px' }}>
                    <Text size="1" color="gray">
                      Default Color
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '300px' }}>
                    <Text size="1" color="gray">
                      Blue Color
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '300px' }}>
                    <Text size="1" color="gray">
                      Red Color
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
                      <Callout.Root variant={variant} size="2">
                        <Callout.Icon>
                          <Info />
                        </Callout.Icon>
                        <Callout.Text>{sampleContent.short}</Callout.Text>
                      </Callout.Root>
                    </Table.Cell>
                    <Table.Cell>
                      <Callout.Root variant={variant} size="2" color="blue">
                        <Callout.Icon>
                          <Info />
                        </Callout.Icon>
                        <Callout.Text>{sampleContent.short}</Callout.Text>
                      </Callout.Root>
                    </Table.Cell>
                    <Table.Cell>
                      <Callout.Root variant={variant} size="2" color="red">
                        <Callout.Icon>
                          <AlertTriangle />
                        </Callout.Icon>
                        <Callout.Text>{sampleContent.short}</Callout.Text>
                      </Callout.Root>
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
                      <Callout.Root variant={variant} size="2">
                        <Callout.Icon>
                          <Info />
                        </Callout.Icon>
                        <Callout.Text>Accent color callout message</Callout.Text>
                      </Callout.Root>
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
                      <Callout.Root variant={variant} size="2" color="gray">
                        <Callout.Icon>
                          <Info />
                        </Callout.Icon>
                        <Callout.Text>Gray color callout message</Callout.Text>
                      </Callout.Root>
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
                      style={{ width: '280px', textAlign: 'left' }}
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
                          <Callout.Root variant={variant} size="2" color={color}>
                            <Callout.Icon>
                              <Info />
                            </Callout.Icon>
                            <Callout.Text>
                              {color === 'red' ||
                              color === 'ruby' ||
                              color === 'crimson' ||
                              color === 'tomato'
                                ? 'Warning callout'
                                : color === 'green' ||
                                    color === 'jade' ||
                                    color === 'grass' ||
                                    color === 'mint'
                                  ? 'Success callout'
                                  : color === 'blue' ||
                                      color === 'cyan' ||
                                      color === 'sky' ||
                                      color === 'indigo'
                                    ? 'Info callout'
                                    : color === 'yellow' || color === 'amber' || color === 'orange'
                                      ? 'Caution callout'
                                      : 'Note callout'}
                            </Callout.Text>
                          </Callout.Root>
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
                          <Callout.Root variant={variant} size="2" color={color} highContrast>
                            <Callout.Icon>
                              <Info />
                            </Callout.Icon>
                            <Callout.Text>
                              {color === 'red' ||
                              color === 'ruby' ||
                              color === 'crimson' ||
                              color === 'tomato'
                                ? 'Warning callout'
                                : color === 'green' ||
                                    color === 'jade' ||
                                    color === 'grass' ||
                                    color === 'mint'
                                  ? 'Success callout'
                                  : color === 'blue' ||
                                      color === 'cyan' ||
                                      color === 'sky' ||
                                      color === 'indigo'
                                    ? 'Info callout'
                                    : color === 'yellow' || color === 'amber' || color === 'orange'
                                      ? 'Caution callout'
                                      : 'Note callout'}
                            </Callout.Text>
                          </Callout.Root>
                        </Table.Cell>
                      ))}
                    </Table.Row>
                  </React.Fragment>
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
                        <Callout.Root variant={variant} size={size as any}>
                          <Callout.Icon>
                            <Info />
                          </Callout.Icon>
                          <Callout.Text>
                            Size {size} callout with some sample text content
                          </Callout.Text>
                        </Callout.Root>
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
                  <Table.ColumnHeaderCell style={{ width: '300px' }}>
                    <Text size="1" color="gray">
                      Blue (Info)
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '300px' }}>
                    <Text size="1" color="gray">
                      Green (Success)
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '300px' }}>
                    <Text size="1" color="gray">
                      Red (Error)
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '300px' }}>
                    <Text size="1" color="gray">
                      Yellow (Warning)
                    </Text>
                  </Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      With Icon
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Callout.Root variant="soft" size="2" color="blue">
                      <Callout.Icon>
                        <Info />
                      </Callout.Icon>
                      <Callout.Text>This is an informational message</Callout.Text>
                    </Callout.Root>
                  </Table.Cell>
                  <Table.Cell>
                    <Callout.Root variant="soft" size="2" color="green">
                      <Callout.Icon>
                        <CheckCircle />
                      </Callout.Icon>
                      <Callout.Text>This is a success message</Callout.Text>
                    </Callout.Root>
                  </Table.Cell>
                  <Table.Cell>
                    <Callout.Root variant="soft" size="2" color="red">
                      <Callout.Icon>
                        <XCircle />
                      </Callout.Icon>
                      <Callout.Text>This is an error message</Callout.Text>
                    </Callout.Root>
                  </Table.Cell>
                  <Table.Cell>
                    <Callout.Root variant="soft" size="2" color="yellow">
                      <Callout.Icon>
                        <AlertTriangle />
                      </Callout.Icon>
                      <Callout.Text>This is a warning message</Callout.Text>
                    </Callout.Root>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Alternative Icons
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Callout.Root variant="surface" size="2" color="blue">
                      <Callout.Icon>
                        <AlertCircle />
                      </Callout.Icon>
                      <Callout.Text>Alternative info icon style</Callout.Text>
                    </Callout.Root>
                  </Table.Cell>
                  <Table.Cell>
                    <Callout.Root variant="surface" size="2" color="green">
                      <Callout.Icon>
                        <CheckCircle />
                      </Callout.Icon>
                      <Callout.Text>Task completed successfully</Callout.Text>
                    </Callout.Root>
                  </Table.Cell>
                  <Table.Cell>
                    <Callout.Root variant="surface" size="2" color="red">
                      <Callout.Icon>
                        <AlertTriangle />
                      </Callout.Icon>
                      <Callout.Text>Critical error occurred</Callout.Text>
                    </Callout.Root>
                  </Table.Cell>
                  <Table.Cell>
                    <Callout.Root variant="surface" size="2" color="yellow">
                      <Callout.Icon>
                        <Lightbulb />
                      </Callout.Icon>
                      <Callout.Text>Helpful tip or suggestion</Callout.Text>
                    </Callout.Root>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Without Icon
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Callout.Root variant="outline" size="2" color="blue">
                      <Callout.Text>Info callout without icon</Callout.Text>
                    </Callout.Root>
                  </Table.Cell>
                  <Table.Cell>
                    <Callout.Root variant="outline" size="2" color="green">
                      <Callout.Text>Success callout without icon</Callout.Text>
                    </Callout.Root>
                  </Table.Cell>
                  <Table.Cell>
                    <Callout.Root variant="outline" size="2" color="red">
                      <Callout.Text>Error callout without icon</Callout.Text>
                    </Callout.Root>
                  </Table.Cell>
                  <Table.Cell>
                    <Callout.Root variant="outline" size="2" color="yellow">
                      <Callout.Text>Warning callout without icon</Callout.Text>
                    </Callout.Root>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table.Root>
          </Box>
        </Tabs.Content>

        {/* Content Examples Tab */}
        <Tabs.Content value="content-examples">
          <Box pt="4">
            <Flex direction="column" gap="6">
              {/* Short Content Callouts */}
              <Box>
                <Heading size="4" mb="3">
                  Short Content
                </Heading>
                <Flex direction="column" gap="3">
                  {variants.map((variant) => (
                    <Callout.Root key={variant} variant={variant} size="2">
                      <Callout.Icon>
                        <Info />
                      </Callout.Icon>
                      <Callout.Text>
                        {variant.charAt(0).toUpperCase() + variant.slice(1)} variant:{' '}
                        {sampleContent.short}
                      </Callout.Text>
                    </Callout.Root>
                  ))}
                </Flex>
              </Box>

              {/* Medium Content Callouts */}
              <Box>
                <Heading size="4" mb="3">
                  Medium Content
                </Heading>
                <Flex direction="column" gap="3">
                  <Callout.Root variant="soft" size="2" color="blue">
                    <Callout.Icon>
                      <Info />
                    </Callout.Icon>
                    <Callout.Text>{sampleContent.medium}</Callout.Text>
                  </Callout.Root>
                  <Callout.Root variant="surface" size="2" color="green">
                    <Callout.Icon>
                      <CheckCircle />
                    </Callout.Icon>
                    <Callout.Text>{sampleContent.medium}</Callout.Text>
                  </Callout.Root>
                  <Callout.Root variant="outline" size="2" color="red">
                    <Callout.Icon>
                      <AlertTriangle />
                    </Callout.Icon>
                    <Callout.Text>{sampleContent.medium}</Callout.Text>
                  </Callout.Root>
                </Flex>
              </Box>

              {/* Long Content Callouts */}
              <Box>
                <Heading size="4" mb="3">
                  Long Content
                </Heading>
                <Flex direction="column" gap="3">
                  <Callout.Root variant="soft" size="3" color="yellow">
                    <Callout.Icon>
                      <Lightbulb />
                    </Callout.Icon>
                    <Callout.Text>{sampleContent.long}</Callout.Text>
                  </Callout.Root>
                  <Callout.Root variant="surface" size="3" color="purple">
                    <Callout.Icon>
                      <AlertCircle />
                    </Callout.Icon>
                    <Callout.Text>{sampleContent.long}</Callout.Text>
                  </Callout.Root>
                </Flex>
              </Box>

              {/* High Contrast Examples */}
              <Box>
                <Heading size="4" mb="3">
                  High Contrast
                </Heading>
                <Flex direction="column" gap="3">
                  <Callout.Root variant="soft" size="2" color="blue" highContrast>
                    <Callout.Icon>
                      <Info />
                    </Callout.Icon>
                    <Callout.Text>High contrast blue callout for better accessibility</Callout.Text>
                  </Callout.Root>
                  <Callout.Root variant="surface" size="2" color="red" highContrast>
                    <Callout.Icon>
                      <XCircle />
                    </Callout.Icon>
                    <Callout.Text>High contrast red callout for critical messages</Callout.Text>
                  </Callout.Root>
                  <Callout.Root variant="outline" size="2" color="green" highContrast>
                    <Callout.Icon>
                      <CheckCircle />
                    </Callout.Icon>
                    <Callout.Text>High contrast green callout for success messages</Callout.Text>
                  </Callout.Root>
                </Flex>
              </Box>
            </Flex>
          </Box>
        </Tabs.Content>
      </Tabs.Root>
    </Flex>
  );
}
