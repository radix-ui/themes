'use client';

import React from 'react';
import { Card, Text, Flex, Box, Heading, Tabs, Table } from '@kushagradhawan/kookie-ui';

const variants = ['classic', 'surface', 'soft', 'outline', 'ghost'] as const;
const sizes = ['1', '2', '3', '4', '5'] as const;

// Sample content for cards
const sampleContent = {
  short: 'Card content',
  medium:
    'This is a sample card with some content to demonstrate how text flows within different card variants and sizes.',
  long: 'This is a longer sample card content that demonstrates how cards handle more substantial amounts of text. Cards should maintain proper spacing and readability regardless of content length.',
};

export default function CardPlayground() {
  return (
    <Flex direction="column" gap="6">
      <Heading size="6" weight="bold">
        Card
      </Heading>
      <Text size="3" color="gray" mt="2">
        A flexible container component for grouping related content with consistent styling.
      </Text>

      <Tabs.Root defaultValue="variants">
        <Tabs.List size="2">
          <Tabs.Trigger value="variants">Variants</Tabs.Trigger>
          <Tabs.Trigger value="sizes">Sizes</Tabs.Trigger>
          <Tabs.Trigger value="interactive">Interactive</Tabs.Trigger>
          <Tabs.Trigger value="content-examples">Content examples</Tabs.Trigger>
          <Tabs.Trigger value="flush">Flush Ghost</Tabs.Trigger>
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
                  <Table.ColumnHeaderCell style={{ width: '200px' }}>
                    <Text size="1" color="gray">
                      Empty Card
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '300px' }}>
                    <Text size="1" color="gray">
                      With Content
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
                      <Card
                        variant={variant}
                        size="3"
                        style={{
                          width: '180px',
                          height: '100px',
                          ...(variant === 'ghost' && {
                            border: '1px dashed var(--gray-a6)',
                          }),
                        }}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Card
                        variant={variant}
                        size="3"
                        style={{
                          width: '280px',
                          ...(variant === 'ghost' && {
                            border: '1px dashed var(--gray-a6)',
                          }),
                        }}
                      >
                        <Flex direction="column" gap="2">
                          <Heading size="3">Card Title</Heading>
                          <Text size="2" color="gray">
                            {sampleContent.medium}
                          </Text>
                        </Flex>
                      </Card>
                    </Table.Cell>
                  </Table.Row>
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
                      style={{ width: '160px', textAlign: 'left' }}
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
                        <Card variant={variant} size={size as any} style={{ width: '140px' }}>
                          <Text size="1">Size {size}</Text>
                        </Card>
                      </Table.Cell>
                    ))}
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </Tabs.Content>

        {/* Interactive Tab */}
        <Tabs.Content value="interactive">
          <Box pt="4">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell style={{ width: '120px' }}>
                    <Text size="1" color="gray">
                      Variant
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '200px' }}>
                    <Text size="1" color="gray">
                      Button Card
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '200px' }}>
                    <Text size="1" color="gray">
                      Link Card
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '200px' }}>
                    <Text size="1" color="gray">
                      Label Card
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
                      <Card
                        asChild
                        variant={variant}
                        size="3"
                        style={{ width: '180px', cursor: 'pointer' }}
                      >
                        <button
                          onClick={() => alert(`Clicked ${variant} button card!`)}
                          style={{ border: 'none', textAlign: 'left' }}
                        >
                          <Flex direction="column" gap="1">
                            <Text size="2" weight="medium">
                              Button Card
                            </Text>
                            <Text size="1" color="gray">
                              Click me!
                            </Text>
                          </Flex>
                        </button>
                      </Card>
                    </Table.Cell>
                    <Table.Cell>
                      <Card asChild variant={variant} size="3" style={{ width: '180px' }}>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            alert(`Clicked ${variant} link card!`);
                          }}
                          style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                          <Flex direction="column" gap="1">
                            <Text size="2" weight="medium">
                              Link Card
                            </Text>
                            <Text size="1" color="gray">
                              Navigate somewhere
                            </Text>
                          </Flex>
                        </a>
                      </Card>
                    </Table.Cell>
                    <Table.Cell>
                      <Card
                        asChild
                        variant={variant}
                        size="3"
                        style={{ width: '180px', cursor: 'pointer' }}
                      >
                        <label>
                          <Flex direction="column" gap="1">
                            <Text size="2" weight="medium">
                              Label Card
                            </Text>
                            <Text size="1" color="gray">
                              With checkbox
                            </Text>
                          </Flex>
                          <input
                            type="checkbox"
                            style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
                          />
                        </label>
                      </Card>
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
                  <Table.ColumnHeaderCell style={{ width: '120px' }}>
                    <Text size="1" color="gray">
                      Content Type
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
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Simple
                    </Text>
                  </Table.RowHeaderCell>
                  {variants.map((variant) => (
                    <Table.Cell key={variant}>
                      <Card variant={variant} size="3" style={{ width: '230px' }}>
                        <Flex direction="column" gap="2">
                          <Text size="2" weight="medium" style={{ textTransform: 'capitalize' }}>
                            {variant} Card
                          </Text>
                          <Text size="1" color="gray">
                            {sampleContent.short}
                          </Text>
                        </Flex>
                      </Card>
                    </Table.Cell>
                  ))}
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Rich Content
                    </Text>
                  </Table.RowHeaderCell>
                  {variants.map((variant) => (
                    <Table.Cell key={variant}>
                      <Card variant={variant} size="4" style={{ width: '230px' }}>
                        <Flex direction="column" gap="3">
                          <Heading size="4">Product Card</Heading>
                          <Text size="2" color="gray">
                            {sampleContent.medium}
                          </Text>
                          <Flex justify="between" align="center">
                            <Text size="3" weight="bold">
                              $29.99
                            </Text>
                            <Text size="1" color="gray" style={{ textTransform: 'capitalize' }}>
                              {variant}
                            </Text>
                          </Flex>
                        </Flex>
                      </Card>
                    </Table.Cell>
                  ))}
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Nested Cards
                    </Text>
                  </Table.RowHeaderCell>
                  {variants.map((variant) => (
                    <Table.Cell key={variant}>
                      <Card variant={variant} size="4" style={{ width: '230px' }}>
                        <Flex direction="column" gap="3">
                          <Heading size="4">Container</Heading>
                          <Text size="2" color="gray">
                            Card with nested content
                          </Text>
                          <Flex direction="column" gap="2">
                            <Card variant="soft" size="1">
                              <Text size="1">Nested soft</Text>
                            </Card>
                            <Card variant="ghost" size="1">
                              <Text size="1">Nested ghost</Text>
                            </Card>
                          </Flex>
                        </Flex>
                      </Card>
                    </Table.Cell>
                  ))}
                </Table.Row>
              </Table.Body>
            </Table.Root>
          </Box>
        </Tabs.Content>

        {/* Flush Tab */}
        <Tabs.Content value="flush">
          <Box pt="4">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell style={{ width: '120px' }}>
                    <Text size="1" color="gray">
                      Flush State
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '400px' }}>
                    <Text size="1" color="gray">
                      Ghost Card
                    </Text>
                  </Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Standard
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Flex direction="column" gap="3" style={{ width: '360px' }}>
                      <Text size="2">Container content above</Text>
                      <Card
                        variant="ghost"
                        size="3"
                        style={{ border: '1px dashed var(--gray-a6)' }}
                      >
                        <Text size="2">Standard ghost card content</Text>
                      </Card>
                      <Text size="2">Container content below</Text>
                    </Flex>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Flush
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Flex direction="column" gap="3" style={{ width: '360px' }}>
                      <Text size="2">Container content above</Text>
                      <Card
                        variant="ghost"
                        size="3"
                        flush
                        style={{ border: '1px dashed var(--gray-a6)' }}
                      >
                        <Text size="2">Flush ghost card content</Text>
                      </Card>
                      <Text size="2">Container content below</Text>
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
