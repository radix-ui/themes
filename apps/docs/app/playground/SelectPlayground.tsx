'use client';

import React from 'react';
import { Select, Text, Flex, Box, Heading, Tabs, Table, Badge } from '@kushagradhawan/kookie-ui';

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

const triggerVariants = ['classic', 'soft', 'surface', 'outline', 'ghost'] as const;
const contentVariants = ['solid', 'soft'] as const;
const sizes = ['1', '2', '3'] as const;
const radiusOptions = ['none', 'small', 'medium', 'large', 'full'] as const;

const sampleItems = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
  { value: 'grape', label: 'Grape' },
];

export default function SelectPlayground() {
  return (
    <Flex direction="column" gap="6">
      <Flex direction="column" gap="2">
        <Badge size="2" variant="soft" color="orange" style={{ alignSelf: 'flex-start' }}>
          Updated
        </Badge>
        <Heading size="6" weight="bold">
          Select
        </Heading>
        <Text size="2" color="gray">
          Displays a list of options for the user to pick from—triggered by a button. Now supports rich content for complex data like chats, users, and files.
        </Text>
      </Flex>

      <Tabs.Root defaultValue="theme-colors">
        <Tabs.List size="2">
          <Tabs.Trigger value="theme-colors">Theme colors</Tabs.Trigger>
          <Tabs.Trigger value="all-colors">All colors</Tabs.Trigger>
          <Tabs.Trigger value="all-sizes">All sizes</Tabs.Trigger>
          <Tabs.Trigger value="all-radius">All radius</Tabs.Trigger>
          <Tabs.Trigger value="content-variants">Content variants</Tabs.Trigger>
          <Tabs.Trigger value="rich-content">Rich Content</Tabs.Trigger>
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
                  {triggerVariants.map((variant) => (
                    <Table.ColumnHeaderCell
                      key={variant}
                      style={{ width: '140px', textAlign: 'left' }}
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
                  {triggerVariants.map((variant) => (
                    <Table.Cell key={variant} style={{ verticalAlign: 'middle' }}>
                      <Select.Root size="2">
                        <Select.Trigger
                          variant={variant}
                          placeholder="Select fruit"
                        ></Select.Trigger>
                        <Select.Content>
                          {sampleItems.map((item) => (
                            <Select.Item key={item.value} value={item.value}>
                              {item.label}
                            </Select.Item>
                          ))}
                        </Select.Content>
                      </Select.Root>
                    </Table.Cell>
                  ))}
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Gray
                    </Text>
                  </Table.RowHeaderCell>
                  {triggerVariants.map((variant) => (
                    <Table.Cell key={variant} style={{ verticalAlign: 'middle' }}>
                      <Select.Root size="2">
                        <Select.Trigger
                          variant={variant}
                          color="gray"
                          placeholder="Select fruit"
                        ></Select.Trigger>
                        <Select.Content color="gray">
                          {sampleItems.map((item) => (
                            <Select.Item key={item.value} value={item.value}>
                              {item.label}
                            </Select.Item>
                          ))}
                        </Select.Content>
                      </Select.Root>
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
                  {triggerVariants.map((variant) => (
                    <Table.ColumnHeaderCell
                      key={variant}
                      style={{ width: '140px', textAlign: 'left' }}
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
                      {triggerVariants.map((variant) => (
                        <Table.Cell key={variant} style={{ verticalAlign: 'middle' }}>
                          <Select.Root size="2">
                            <Select.Trigger
                              variant={variant}
                              color={color}
                              placeholder="Select fruit"
                            ></Select.Trigger>
                            <Select.Content color={color}>
                              {sampleItems.map((item) => (
                                <Select.Item key={item.value} value={item.value}>
                                  {item.label}
                                </Select.Item>
                              ))}
                            </Select.Content>
                          </Select.Root>
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
                      {triggerVariants.map((variant) => (
                        <Table.Cell key={variant} style={{ verticalAlign: 'middle' }}>
                          <Select.Root size="2">
                            <Select.Trigger
                              variant={variant}
                              color={color}
                              placeholder="Select fruit"
                            ></Select.Trigger>
                            <Select.Content color={color} highContrast>
                              {sampleItems.map((item) => (
                                <Select.Item key={item.value} value={item.value}>
                                  {item.label}
                                </Select.Item>
                              ))}
                            </Select.Content>
                          </Select.Root>
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
                  {triggerVariants.map((variant) => (
                    <Table.ColumnHeaderCell
                      key={variant}
                      style={{ width: '140px', textAlign: 'left' }}
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
                    {triggerVariants.map((variant) => (
                      <Table.Cell key={variant} style={{ verticalAlign: 'middle' }}>
                        <Select.Root size={size as any}>
                          <Select.Trigger
                            variant={variant}
                            placeholder="Select fruit"
                          ></Select.Trigger>
                          <Select.Content>
                            {sampleItems.map((item) => (
                              <Select.Item key={item.value} value={item.value}>
                                {item.label}
                              </Select.Item>
                            ))}
                          </Select.Content>
                        </Select.Root>
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
                  {triggerVariants.map((variant) => (
                    <Table.ColumnHeaderCell
                      key={variant}
                      style={{ width: '140px', textAlign: 'left' }}
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
                    {triggerVariants.map((variant) => (
                      <Table.Cell key={variant} style={{ verticalAlign: 'middle' }}>
                        <Select.Root size="2">
                          <Select.Trigger
                            variant={variant}
                            radius={radius as any}
                            placeholder="Select fruit"
                          ></Select.Trigger>
                          <Select.Content>
                            {sampleItems.map((item) => (
                              <Select.Item key={item.value} value={item.value}>
                                {item.label}
                              </Select.Item>
                            ))}
                          </Select.Content>
                        </Select.Root>
                      </Table.Cell>
                    ))}
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </Tabs.Content>

        {/* Content Variants Tab */}
        <Tabs.Content value="content-variants">
          <Box pt="4">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell style={{ width: '120px' }}>
                    <Text size="1" color="gray">
                      Content Variant
                    </Text>
                  </Table.ColumnHeaderCell>
                  {triggerVariants.map((variant) => (
                    <Table.ColumnHeaderCell
                      key={variant}
                      style={{ width: '140px', textAlign: 'left' }}
                    >
                      <Text size="1" color="gray" style={{ textTransform: 'capitalize' }}>
                        {variant}
                      </Text>
                    </Table.ColumnHeaderCell>
                  ))}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {contentVariants.map((contentVariant) => (
                  <Table.Row key={contentVariant}>
                    <Table.RowHeaderCell>
                      <Text size="1" color="gray" style={{ textTransform: 'capitalize' }}>
                        {contentVariant}
                      </Text>
                    </Table.RowHeaderCell>
                    {triggerVariants.map((triggerVariant) => (
                      <Table.Cell key={triggerVariant} style={{ verticalAlign: 'middle' }}>
                        <Select.Root size="2">
                          <Select.Trigger
                            variant={triggerVariant}
                            placeholder="Select fruit"
                          ></Select.Trigger>
                          <Select.Content variant={contentVariant}>
                            {sampleItems.map((item) => (
                              <Select.Item key={item.value} value={item.value}>
                                {item.label}
                              </Select.Item>
                            ))}
                          </Select.Content>
                        </Select.Root>
                      </Table.Cell>
                    ))}
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </Tabs.Content>

        {/* Rich Content Tab */}
        <Tabs.Content value="rich-content">
          <Box pt="4">
            <Flex direction="column" gap="4">
              <Text size="2" color="gray">
                Select now supports rich content! Perfect for chat selection, user lists, and complex data.
              </Text>
              
              <Flex direction="column" gap="3">
                <Text size="3" weight="medium">Chat Selection</Text>
                <Select.Root size="3">
                  <Select.Trigger placeholder="Select a chat" />
                  <Select.Content>
                    <Select.Item value="chat-1">
                      <Flex align="center" gap="3">
                        <Box
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--color-blue-9)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '14px',
                            fontWeight: '600'
                          }}
                        >
                          JD
                        </Box>
                        <Flex direction="column" gap="1" style={{ flex: 1, minWidth: 0 }}>
                          <Text weight="medium" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            John Doe
                          </Text>
                          <Text size="1" color="gray" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            Hey, how's the project going?
                          </Text>
                        </Flex>
                        <Text size="1" color="gray" style={{ whiteSpace: 'nowrap' }}>
                          2h
                        </Text>
                      </Flex>
                    </Select.Item>
                    
                    <Select.Item value="chat-2">
                      <Flex align="center" gap="3">
                        <Box
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--color-green-9)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '14px',
                            fontWeight: '600'
                          }}
                        >
                          JS
                        </Box>
                        <Flex direction="column" gap="1" style={{ flex: 1, minWidth: 0 }}>
                          <Text weight="medium" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            Jane Smith
                          </Text>
                          <Text size="1" color="gray" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            Can you review the latest changes?
                          </Text>
                        </Flex>
                        <Text size="1" color="gray" style={{ whiteSpace: 'nowrap' }}>
                          1d
                        </Text>
                      </Flex>
                    </Select.Item>
                    
                    <Select.Item value="chat-3">
                      <Flex align="center" gap="3">
                        <Box
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--color-purple-9)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '14px',
                            fontWeight: '600'
                          }}
                        >
                          MJ
                        </Box>
                        <Flex direction="column" gap="1" style={{ flex: 1, minWidth: 0 }}>
                          <Text weight="medium" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            Mike Johnson
                          </Text>
                          <Text size="1" color="gray" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            Meeting scheduled for tomorrow at 10 AM
                          </Text>
                        </Flex>
                        <Text size="1" color="gray" style={{ whiteSpace: 'nowrap' }}>
                          3d
                        </Text>
                      </Flex>
                    </Select.Item>
                  </Select.Content>
                </Select.Root>
              </Flex>

              <Flex direction="column" gap="3">
                <Text size="3" weight="medium">User Selection with Status</Text>
                <Select.Root size="2">
                  <Select.Trigger placeholder="Select a user" />
                  <Select.Content>
                    <Select.Item value="user-1">
                      <Flex align="center" gap="2">
                        <Box
                          style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--color-green-9)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '12px',
                            fontWeight: '600'
                          }}
                        >
                          A
                        </Box>
                        <Text weight="medium">Alice Cooper</Text>
                        <Badge size="1" variant="soft" color="green">Online</Badge>
                      </Flex>
                    </Select.Item>
                    
                    <Select.Item value="user-2">
                      <Flex align="center" gap="2">
                        <Box
                          style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--color-blue-9)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '12px',
                            fontWeight: '600'
                          }}
                        >
                          B
                        </Box>
                        <Text weight="medium">Bob Wilson</Text>
                        <Badge size="1" variant="soft" color="gray">Away</Badge>
                      </Flex>
                    </Select.Item>
                    
                    <Select.Item value="user-3">
                      <Flex align="center" gap="2">
                        <Box
                          style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--color-red-9)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '12px',
                            fontWeight: '600'
                          }}
                        >
                          C
                        </Box>
                        <Text weight="medium">Carol Davis</Text>
                        <Badge size="1" variant="soft" color="red">Busy</Badge>
                      </Flex>
                    </Select.Item>
                  </Select.Content>
                </Select.Root>
              </Flex>

              <Flex direction="column" gap="3">
                <Text size="3" weight="medium">File Selection with Metadata</Text>
                <Select.Root size="2">
                  <Select.Trigger placeholder="Select a file" />
                  <Select.Content>
                    <Select.Item value="file-1">
                      <Flex align="center" gap="2">
                        <Box
                          style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '4px',
                            backgroundColor: 'var(--color-blue-9)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '12px'
                          }}
                        >
                          📄
                        </Box>
                        <Flex direction="column" gap="0" style={{ flex: 1, minWidth: 0 }}>
                          <Text weight="medium" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            project-proposal.pdf
                          </Text>
                          <Text size="1" color="gray">2.4 MB • Updated 2 hours ago</Text>
                        </Flex>
                      </Flex>
                    </Select.Item>
                    
                    <Select.Item value="file-2">
                      <Flex align="center" gap="2">
                        <Box
                          style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '4px',
                            backgroundColor: 'var(--color-green-9)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '12px'
                          }}
                        >
                          📊
                        </Box>
                        <Flex direction="column" gap="0" style={{ flex: 1, minWidth: 0 }}>
                          <Text weight="medium" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            quarterly-report.xlsx
                          </Text>
                          <Text size="1" color="gray">1.8 MB • Updated 1 day ago</Text>
                        </Flex>
                      </Flex>
                    </Select.Item>
                  </Select.Content>
                </Select.Root>
              </Flex>
            </Flex>
          </Box>
        </Tabs.Content>
      </Tabs.Root>
    </Flex>
  );
}
