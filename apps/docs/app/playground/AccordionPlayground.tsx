'use client';

import React from 'react';
import { Accordion, Text, Flex, Box, Heading, Tabs, Table, Badge } from '@kushagradhawan/kookie-ui';
import { ChevronDownIcon } from 'lucide-react';

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

const variants = ['classic', 'soft', 'surface', 'outline', 'ghost'] as const;
const sizes = ['1', '2', '3', '4'] as const;
const radiusOptions = ['none', 'small', 'medium', 'large', 'full'] as const;

export default function AccordionPlayground() {
  return (
    <Flex direction="column" gap="6">
      <Flex direction="column" gap="2">
        <Badge size="2" variant="soft" color="green" style={{ alignSelf: 'flex-start' }}>
          New
        </Badge>
        <Heading size="6" weight="bold">
          Accordion
        </Heading>
        <Text size="3" color="gray">
          A vertically stacked set of interactive headings that each reveal an associated section of
          content.
        </Text>
      </Flex>

      <Tabs.Root defaultValue="theme-colors">
        <Tabs.List size="2">
          <Tabs.Trigger value="theme-colors">Theme colors</Tabs.Trigger>
          <Tabs.Trigger value="all-colors">All colors</Tabs.Trigger>
          <Tabs.Trigger value="all-sizes">All sizes</Tabs.Trigger>
          <Tabs.Trigger value="all-radius">All radius</Tabs.Trigger>
          <Tabs.Trigger value="flush-examples">Flush examples</Tabs.Trigger>
          <Tabs.Trigger value="component-overrides">Component overrides</Tabs.Trigger>
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
                      <Accordion.Root type="single" size="2" variant={variant}>
                        <Accordion.Item value="item-1">
                          <Accordion.Header>
                            <Accordion.Trigger>
                              <Text size="2">Is it accessible?</Text>
                              <ChevronDownIcon size={16} />
                            </Accordion.Trigger>
                          </Accordion.Header>
                          <Accordion.Content>
                            <Text size="2">Yes. It adheres to the WAI-ARIA design pattern.</Text>
                          </Accordion.Content>
                        </Accordion.Item>
                      </Accordion.Root>
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
                      <Accordion.Root type="single" size="2" variant={variant} color="gray">
                        <Accordion.Item value="item-1">
                          <Accordion.Header>
                            <Accordion.Trigger>
                              <Text size="2">Is it accessible?</Text>
                              <ChevronDownIcon size={16} />
                            </Accordion.Trigger>
                          </Accordion.Header>
                          <Accordion.Content>
                            <Text size="2">Yes. It adheres to the WAI-ARIA design pattern.</Text>
                          </Accordion.Content>
                        </Accordion.Item>
                      </Accordion.Root>
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
                          <Accordion.Root type="single" size="2" variant={variant} color={color}>
                            <Accordion.Item value="item-1">
                              <Accordion.Header>
                                <Accordion.Trigger>
                                  <Text size="2">Question</Text>
                                  <ChevronDownIcon size={16} />
                                </Accordion.Trigger>
                              </Accordion.Header>
                              <Accordion.Content>
                                <Text size="2">Answer content here.</Text>
                              </Accordion.Content>
                            </Accordion.Item>
                          </Accordion.Root>
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
                          <Accordion.Root
                            type="single"
                            size="2"
                            variant={variant}
                            color={color}
                            highContrast
                          >
                            <Accordion.Item value="item-1">
                              <Accordion.Header>
                                <Accordion.Trigger>
                                  <Text size="2">Question</Text>
                                  <ChevronDownIcon size={16} />
                                </Accordion.Trigger>
                              </Accordion.Header>
                              <Accordion.Content>
                                <Text size="2">Answer content here.</Text>
                              </Accordion.Content>
                            </Accordion.Item>
                          </Accordion.Root>
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
                        <Accordion.Root type="single" size={size} variant={variant}>
                          <Accordion.Item value="item-1">
                            <Accordion.Header>
                              <Accordion.Trigger>
                                <Text
                                  size={
                                    size === '1'
                                      ? '1'
                                      : size === '2'
                                        ? '2'
                                        : size === '3'
                                          ? '3'
                                          : '4'
                                  }
                                >
                                  Question
                                </Text>
                                <ChevronDownIcon
                                  size={
                                    size === '1' ? 14 : size === '2' ? 16 : size === '3' ? 18 : 20
                                  }
                                />
                              </Accordion.Trigger>
                            </Accordion.Header>
                            <Accordion.Content>
                              <Text
                                size={
                                  size === '1' ? '1' : size === '2' ? '2' : size === '3' ? '3' : '4'
                                }
                              >
                                Answer content here.
                              </Text>
                            </Accordion.Content>
                          </Accordion.Item>
                        </Accordion.Root>
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
                {radiusOptions.map((radius) => (
                  <Table.Row key={radius}>
                    <Table.RowHeaderCell>
                      <Text size="1" color="gray" style={{ textTransform: 'capitalize' }}>
                        {radius}
                      </Text>
                    </Table.RowHeaderCell>
                    {variants.map((variant) => (
                      <Table.Cell key={variant}>
                        <Accordion.Root type="single" size="2" variant={variant} radius={radius}>
                          <Accordion.Item value="item-1">
                            <Accordion.Header>
                              <Accordion.Trigger>
                                <Text size="2">Question</Text>
                                <ChevronDownIcon size={16} />
                              </Accordion.Trigger>
                            </Accordion.Header>
                            <Accordion.Content>
                              <Text size="2">Answer content here.</Text>
                            </Accordion.Content>
                          </Accordion.Item>
                        </Accordion.Root>
                      </Table.Cell>
                    ))}
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </Tabs.Content>

        {/* Flush Examples Tab */}
        <Tabs.Content value="flush-examples">
          <Box pt="4">
            <Flex direction="column" gap="6">
              <Flex direction="column" gap="3">
                <Text size="3" weight="bold">
                  Ghost variant with flush
                </Text>
                <Accordion.Root type="single" size="2" variant="ghost" flush>
                  <Accordion.Item value="item-1">
                    <Accordion.Header>
                      <Accordion.Trigger>
                        <Text size="2">What is Kookie User Interface?</Text>
                        <ChevronDownIcon size={16} />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content>
                      <Text size="2">
                        Kookie User Interface is a comprehensive design system that provides
                        accessible, customizable components for building modern web applications.
                      </Text>
                    </Accordion.Content>
                  </Accordion.Item>
                  <Accordion.Item value="item-2">
                    <Accordion.Header>
                      <Accordion.Trigger>
                        <Text size="2">How do I get started?</Text>
                        <ChevronDownIcon size={16} />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content>
                      <Text size="2">
                        Install the package, import components, and start building with our
                        comprehensive documentation and examples.
                      </Text>
                    </Accordion.Content>
                  </Accordion.Item>
                  <Accordion.Item value="item-3">
                    <Accordion.Header>
                      <Accordion.Trigger>
                        <Text size="2">Is it accessible?</Text>
                        <ChevronDownIcon size={16} />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content>
                      <Text size="2">
                        Yes. It adheres to the WAI-ARIA design pattern and follows accessibility
                        best practices.
                      </Text>
                    </Accordion.Content>
                  </Accordion.Item>
                </Accordion.Root>
              </Flex>

              <Flex direction="column" gap="3">
                <Text size="3" weight="bold">
                  Ghost variant with flush and accent color
                </Text>
                <Accordion.Root type="single" size="2" variant="ghost" flush color="blue">
                  <Accordion.Item value="item-1">
                    <Accordion.Header>
                      <Accordion.Trigger>
                        <Text size="2">What is Kookie User Interface?</Text>
                        <ChevronDownIcon size={16} />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content>
                      <Text size="2">
                        Kookie User Interface is a comprehensive design system that provides
                        accessible, customizable components for building modern web applications.
                      </Text>
                    </Accordion.Content>
                  </Accordion.Item>
                  <Accordion.Item value="item-2">
                    <Accordion.Header>
                      <Accordion.Trigger>
                        <Text size="2">How do I get started?</Text>
                        <ChevronDownIcon size={16} />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content>
                      <Text size="2">
                        Install the package, import components, and start building with our
                        comprehensive documentation and examples.
                      </Text>
                    </Accordion.Content>
                  </Accordion.Item>
                  <Accordion.Item value="item-3">
                    <Accordion.Header>
                      <Accordion.Trigger>
                        <Text size="2">Is it accessible?</Text>
                        <ChevronDownIcon size={16} />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content>
                      <Text size="2">
                        Yes. It adheres to the WAI-ARIA design pattern and follows accessibility
                        best practices.
                      </Text>
                    </Accordion.Content>
                  </Accordion.Item>
                </Accordion.Root>
              </Flex>

              <Flex direction="column" gap="3">
                <Text size="3" weight="bold">
                  Ghost variant with flush and high contrast
                </Text>
                <Accordion.Root
                  type="single"
                  size="2"
                  variant="ghost"
                  flush
                  color="green"
                  highContrast
                >
                  <Accordion.Item value="item-1">
                    <Accordion.Header>
                      <Accordion.Trigger>
                        <Text size="2">What is Kookie User Interface?</Text>
                        <ChevronDownIcon size={16} />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content>
                      <Text size="2">
                        Kookie User Interface is a comprehensive design system that provides
                        accessible, customizable components for building modern web applications.
                      </Text>
                    </Accordion.Content>
                  </Accordion.Item>
                  <Accordion.Item value="item-2">
                    <Accordion.Header>
                      <Accordion.Trigger>
                        <Text size="2">How do I get started?</Text>
                        <ChevronDownIcon size={16} />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content>
                      <Text size="2">
                        Install the package, import components, and start building with our
                        comprehensive documentation and examples.
                      </Text>
                    </Accordion.Content>
                  </Accordion.Item>
                  <Accordion.Item value="item-3">
                    <Accordion.Header>
                      <Accordion.Trigger>
                        <Text size="2">Is it accessible?</Text>
                        <ChevronDownIcon size={16} />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content>
                      <Text size="2">
                        Yes. It adheres to the WAI-ARIA design pattern and follows accessibility
                        best practices.
                      </Text>
                    </Accordion.Content>
                  </Accordion.Item>
                </Accordion.Root>
              </Flex>
            </Flex>
          </Box>
        </Tabs.Content>

        {/* Component Overrides Tab */}
        <Tabs.Content value="component-overrides">
          <Box pt="4">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell style={{ width: '120px' }}>
                    <Text size="1" color="gray">
                      Material
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
                {(['solid', 'translucent'] as const).map((material) => (
                  <Table.Row key={material}>
                    <Table.RowHeaderCell>
                      <Text size="1" color="gray" style={{ textTransform: 'capitalize' }}>
                        {material}
                      </Text>
                    </Table.RowHeaderCell>
                    {variants.map((variant) => (
                      <Table.Cell key={variant}>
                        <Accordion.Root
                          type="single"
                          size="2"
                          variant={variant}
                          material={material}
                        >
                          <Accordion.Item value="item-1">
                            <Accordion.Header>
                              <Accordion.Trigger>
                                <Text size="2">Content</Text>
                                <ChevronDownIcon size={16} />
                              </Accordion.Trigger>
                            </Accordion.Header>
                            <Accordion.Content>
                              <Text size="2">Content</Text>
                            </Accordion.Content>
                          </Accordion.Item>
                        </Accordion.Root>
                      </Table.Cell>
                    ))}
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </Tabs.Content>
      </Tabs.Root>
    </Flex>
  );
}
