'use client';

import React from 'react';
import { Avatar, Text, Flex, Box, Heading, Tabs, Table } from '@kushagradhawan/kookie-ui';

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

const variants = ['solid', 'soft', 'surface', 'outline'] as const;
const sizes = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
const radiusOptions = ['none', 'small', 'medium', 'large', 'full'] as const;

// Sample avatar images
const avatarImages = [
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
];

const fallbackOptions = ['JD', 'A', 'KD', 'M', 'R'];

export default function AvatarPlayground() {
  return (
    <Flex direction="column" gap="6">
      <Heading size="6" weight="bold">
        Avatar
      </Heading>

      <Tabs.Root defaultValue="theme-colors">
        <Tabs.List size="2">
          <Tabs.Trigger value="theme-colors">Theme colors</Tabs.Trigger>
          <Tabs.Trigger value="interactive">Interactive</Tabs.Trigger>
          <Tabs.Trigger value="all-colors">All colors</Tabs.Trigger>
          <Tabs.Trigger value="all-sizes">All sizes</Tabs.Trigger>
          <Tabs.Trigger value="all-radius">All radius</Tabs.Trigger>
          <Tabs.Trigger value="with-images">With images</Tabs.Trigger>
          <Tabs.Trigger value="fallbacks">Fallbacks</Tabs.Trigger>
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
                      <Avatar
                        size="3"
                        panelBackground="translucent"
                        variant={variant}
                        fallback="JD"
                      />
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
                      <Avatar size="3" variant={variant} color="gray" fallback="JD" />
                    </Table.Cell>
                  ))}
                </Table.Row>
              </Table.Body>
            </Table.Root>
          </Box>
        </Tabs.Content>

        {/* Interactive Tab */}
        <Tabs.Content value="interactive">
          <Box pt="4">
            <Flex direction="column" gap="6">
              {/* Button Avatars */}
              <Box>
                <Table.Root>
                  <Table.Header>
                    <Table.Row>
                      <Table.ColumnHeaderCell style={{ width: '120px' }}>
                        <Text size="1" color="gray">
                          Variant
                        </Text>
                      </Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell style={{ width: '120px' }}>
                        <Text size="1" color="gray">
                          Button Avatar
                        </Text>
                      </Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell style={{ width: '120px' }}>
                        <Text size="1" color="gray">
                          Link Avatar
                        </Text>
                      </Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell style={{ width: '120px' }}>
                        <Text size="1" color="gray">
                          Disabled
                        </Text>
                      </Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell style={{ width: '120px' }}>
                        <Text size="1" color="gray">
                          Static Avatar
                        </Text>
                      </Table.ColumnHeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {variants.map((variant, idx) => (
                      <Table.Row key={variant}>
                        <Table.RowHeaderCell>
                          <Text size="1" color="gray" style={{ textTransform: 'capitalize' }}>
                            {variant}
                          </Text>
                        </Table.RowHeaderCell>
                        <Table.Cell>
                          <Avatar
                            asChild
                            size="3"
                            variant={variant}
                            src={avatarImages[idx]}
                            fallback="BT"
                            style={{ cursor: 'pointer' }}
                          >
                            <button
                              onClick={() => alert(`Clicked ${variant} button avatar!`)}
                              style={{ border: 'none', padding: 0 }}
                            />
                          </Avatar>
                        </Table.Cell>
                        <Table.Cell>
                          <Avatar
                            asChild
                            size="3"
                            variant={variant}
                            src={avatarImages[idx]}
                            fallback="LK"
                          >
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                alert(`Clicked ${variant} link avatar!`);
                              }}
                              style={{ textDecoration: 'none' }}
                            />
                          </Avatar>
                        </Table.Cell>
                        <Table.Cell>
                          <Avatar
                            asChild
                            size="3"
                            variant={variant}
                            src={avatarImages[idx]}
                            fallback="DS"
                          >
                            <button disabled style={{ border: 'none', padding: 0 }} />
                          </Avatar>
                        </Table.Cell>
                        <Table.Cell>
                          <Avatar
                            size="3"
                            variant={variant}
                            src={avatarImages[idx % avatarImages.length]}
                            fallback="ST"
                          />
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table.Root>
              </Box>
            </Flex>
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
                          <Avatar size="3" variant={variant} color={color} fallback="JD" />
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
                          <Avatar
                            size="3"
                            variant={variant}
                            color={color}
                            highContrast
                            fallback="JD"
                          />
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
                {sizes.map((size) => (
                  <Table.Row key={size}>
                    <Table.RowHeaderCell>
                      <Text size="1" color="gray">
                        Size {size}
                      </Text>
                    </Table.RowHeaderCell>
                    {variants.map((variant) => (
                      <Table.Cell key={variant}>
                        <Avatar size={size as any} variant={variant} fallback="JD" />
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
                        <Avatar size="3" variant={variant} radius={radius as any} fallback="JD" />
                      </Table.Cell>
                    ))}
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </Tabs.Content>

        {/* With Images Tab */}
        <Tabs.Content value="with-images">
          <Box pt="4">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell style={{ width: '120px' }}>
                    <Text size="1" color="gray">
                      Image
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '80px' }}>
                    <Text size="1" color="gray">
                      Size 2
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '80px' }}>
                    <Text size="1" color="gray">
                      Size 3
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '80px' }}>
                    <Text size="1" color="gray">
                      Size 4
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '80px' }}>
                    <Text size="1" color="gray">
                      Size 5
                    </Text>
                  </Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {avatarImages.map((src, idx) => (
                  <Table.Row key={idx}>
                    <Table.RowHeaderCell>
                      <Text size="1" color="gray">
                        Avatar {idx + 1}
                      </Text>
                    </Table.RowHeaderCell>
                    <Table.Cell>
                      <Avatar size="2" src={src} fallback={fallbackOptions[idx]} />
                    </Table.Cell>
                    <Table.Cell>
                      <Avatar size="3" src={src} fallback={fallbackOptions[idx]} />
                    </Table.Cell>
                    <Table.Cell>
                      <Avatar size="4" src={src} fallback={fallbackOptions[idx]} />
                    </Table.Cell>
                    <Table.Cell>
                      <Avatar size="5" src={src} fallback={fallbackOptions[idx]} />
                    </Table.Cell>
                  </Table.Row>
                ))}
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Broken URL
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Avatar size="2" src="https://broken-url.com/image.jpg" fallback="BR" />
                  </Table.Cell>
                  <Table.Cell>
                    <Avatar size="3" src="https://broken-url.com/image.jpg" fallback="BR" />
                  </Table.Cell>
                  <Table.Cell>
                    <Avatar size="4" src="https://broken-url.com/image.jpg" fallback="BR" />
                  </Table.Cell>
                  <Table.Cell>
                    <Avatar size="5" src="https://broken-url.com/image.jpg" fallback="BR" />
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table.Root>
          </Box>
        </Tabs.Content>

        {/* Fallbacks Tab */}
        <Tabs.Content value="fallbacks">
          <Box pt="4">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell style={{ width: '120px' }}>
                    <Text size="1" color="gray">
                      Fallback Type
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
                      Single Letter
                    </Text>
                  </Table.RowHeaderCell>
                  {variants.map((variant) => (
                    <Table.Cell key={variant}>
                      <Flex gap="2" align="start">
                        <Avatar size="2" variant={variant} fallback="A" />
                        <Avatar size="3" variant={variant} fallback="B" />
                        <Avatar size="4" variant={variant} fallback="C" />
                      </Flex>
                    </Table.Cell>
                  ))}
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Two Letters
                    </Text>
                  </Table.RowHeaderCell>
                  {variants.map((variant) => (
                    <Table.Cell key={variant}>
                      <Flex gap="2" align="start">
                        <Avatar size="2" variant={variant} fallback="AB" />
                        <Avatar size="3" variant={variant} fallback="CD" />
                        <Avatar size="4" variant={variant} fallback="EF" />
                      </Flex>
                    </Table.Cell>
                  ))}
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Custom Element
                    </Text>
                  </Table.RowHeaderCell>
                  {variants.map((variant) => (
                    <Table.Cell key={variant}>
                      <Flex gap="2" align="start">
                        <Avatar size="2" variant={variant} fallback={<Text size="1">👤</Text>} />
                        <Avatar size="3" variant={variant} fallback={<Text size="2">🎭</Text>} />
                        <Avatar size="4" variant={variant} fallback={<Text size="3">🦄</Text>} />
                      </Flex>
                    </Table.Cell>
                  ))}
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Gray Color
                    </Text>
                  </Table.RowHeaderCell>
                  {variants.map((variant) => (
                    <Table.Cell key={variant}>
                      <Flex gap="2" align="start">
                        <Avatar size="2" variant={variant} color="gray" fallback="GR" />
                        <Avatar size="3" variant={variant} color="gray" fallback="AY" />
                        <Avatar size="4" variant={variant} color="gray" fallback="CO" />
                      </Flex>
                    </Table.Cell>
                  ))}
                </Table.Row>
              </Table.Body>
            </Table.Root>
          </Box>
        </Tabs.Content>
      </Tabs.Root>
    </Flex>
  );
}
