'use client';

import React from 'react';
import { SegmentedControl, Text, Flex, Box, Heading, Tabs, Table } from '@kushagradhawan/kookie-ui';

const variants = ['surface', 'classic'] as const;
const sizes = ['1', '2', '3'] as const;
const radiusOptions = ['none', 'small', 'medium', 'large', 'full'] as const;

export default function SegmentedControlPlayground() {
  return (
    <Flex direction="column" gap="6">
      <Heading size="6" weight="bold">
        Segmented Control
      </Heading>
      <Text size="3" color="gray">
        A control for switching between multiple segments or views.
      </Text>

      <Tabs.Root defaultValue="variants">
        <Tabs.List size="2">
          <Tabs.Trigger value="variants">Variants</Tabs.Trigger>
          <Tabs.Trigger value="sizes">Sizes</Tabs.Trigger>
          <Tabs.Trigger value="radius">Radius</Tabs.Trigger>
          <Tabs.Trigger value="disabled">Disabled</Tabs.Trigger>
          <Tabs.Trigger value="examples">Examples</Tabs.Trigger>
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
                      Example
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
                      <SegmentedControl.Root defaultValue="view" variant={variant}>
                        <SegmentedControl.Item value="view">View</SegmentedControl.Item>
                        <SegmentedControl.Item value="edit">Edit</SegmentedControl.Item>
                        <SegmentedControl.Item value="preview">Preview</SegmentedControl.Item>
                      </SegmentedControl.Root>
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
                        <SegmentedControl.Root
                          defaultValue="home"
                          size={size as any}
                          variant={variant}
                        >
                          <SegmentedControl.Item value="home">Home</SegmentedControl.Item>
                          <SegmentedControl.Item value="about">About</SegmentedControl.Item>
                          <SegmentedControl.Item value="contact">Contact</SegmentedControl.Item>
                        </SegmentedControl.Root>
                      </Table.Cell>
                    ))}
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </Tabs.Content>

        {/* Radius Tab */}
        <Tabs.Content value="radius">
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
                {radiusOptions.map((radius) => (
                  <Table.Row key={radius}>
                    <Table.RowHeaderCell>
                      <Text size="1" color="gray" style={{ textTransform: 'capitalize' }}>
                        {radius === 'none' ? 'No radius' : radius}
                      </Text>
                    </Table.RowHeaderCell>
                    {variants.map((variant) => (
                      <Table.Cell key={variant}>
                        <SegmentedControl.Root
                          defaultValue="list"
                          variant={variant}
                          radius={radius as any}
                        >
                          <SegmentedControl.Item value="list">List</SegmentedControl.Item>
                          <SegmentedControl.Item value="grid">Grid</SegmentedControl.Item>
                          <SegmentedControl.Item value="card">Card</SegmentedControl.Item>
                        </SegmentedControl.Root>
                      </Table.Cell>
                    ))}
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </Tabs.Content>

        {/* Disabled Tab */}
        <Tabs.Content value="disabled">
          <Box pt="4">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell style={{ width: '120px' }}>
                    <Text size="1" color="gray">
                      State
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
                      Normal
                    </Text>
                  </Table.RowHeaderCell>
                  {variants.map((variant) => (
                    <Table.Cell key={variant}>
                      <SegmentedControl.Root defaultValue="day" variant={variant}>
                        <SegmentedControl.Item value="day">Day</SegmentedControl.Item>
                        <SegmentedControl.Item value="week">Week</SegmentedControl.Item>
                        <SegmentedControl.Item value="month">Month</SegmentedControl.Item>
                      </SegmentedControl.Root>
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
                      <SegmentedControl.Root defaultValue="day" variant={variant} disabled>
                        <SegmentedControl.Item value="day">Day</SegmentedControl.Item>
                        <SegmentedControl.Item value="week">Week</SegmentedControl.Item>
                        <SegmentedControl.Item value="month">Month</SegmentedControl.Item>
                      </SegmentedControl.Root>
                    </Table.Cell>
                  ))}
                </Table.Row>
              </Table.Body>
            </Table.Root>
          </Box>
        </Tabs.Content>

        {/* Examples Tab */}
        <Tabs.Content value="examples">
          <Box pt="4">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell style={{ width: '200px' }}>
                    <Text size="1" color="gray">
                      Use Case
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '400px' }}>
                    <Text size="1" color="gray">
                      Example
                    </Text>
                  </Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      View Mode Selector
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <SegmentedControl.Root defaultValue="table" size="2">
                      <SegmentedControl.Item value="table">Table</SegmentedControl.Item>
                      <SegmentedControl.Item value="kanban">Kanban</SegmentedControl.Item>
                      <SegmentedControl.Item value="calendar">Calendar</SegmentedControl.Item>
                    </SegmentedControl.Root>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Time Range Selector
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <SegmentedControl.Root defaultValue="7d" size="2">
                      <SegmentedControl.Item value="1d">1D</SegmentedControl.Item>
                      <SegmentedControl.Item value="7d">7D</SegmentedControl.Item>
                      <SegmentedControl.Item value="30d">30D</SegmentedControl.Item>
                      <SegmentedControl.Item value="90d">90D</SegmentedControl.Item>
                      <SegmentedControl.Item value="1y">1Y</SegmentedControl.Item>
                    </SegmentedControl.Root>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Editor Mode
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <SegmentedControl.Root defaultValue="visual" size="2">
                      <SegmentedControl.Item value="visual">Visual</SegmentedControl.Item>
                      <SegmentedControl.Item value="code">Code</SegmentedControl.Item>
                    </SegmentedControl.Root>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Chart Type
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <SegmentedControl.Root defaultValue="line" size="2">
                      <SegmentedControl.Item value="line">Line</SegmentedControl.Item>
                      <SegmentedControl.Item value="bar">Bar</SegmentedControl.Item>
                      <SegmentedControl.Item value="pie">Pie</SegmentedControl.Item>
                      <SegmentedControl.Item value="area">Area</SegmentedControl.Item>
                    </SegmentedControl.Root>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      File Format
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <SegmentedControl.Root defaultValue="pdf" size="2">
                      <SegmentedControl.Item value="pdf">PDF</SegmentedControl.Item>
                      <SegmentedControl.Item value="docx">DOCX</SegmentedControl.Item>
                      <SegmentedControl.Item value="xlsx">XLSX</SegmentedControl.Item>
                      <SegmentedControl.Item value="pptx">PPTX</SegmentedControl.Item>
                    </SegmentedControl.Root>
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
