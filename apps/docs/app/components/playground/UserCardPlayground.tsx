'use client';

import React from 'react';
import { UserCard, Text, Flex, Box, Heading, Tabs, Table, Badge } from '@kushagradhawan/kookie-ui';
import { User } from 'lucide-react';

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

const variants = ['ghost', 'surface', 'classic'] as const;
const sizes = ['1', '2', '3', '4'] as const;
const avatarVariants = ['solid', 'soft', 'surface', 'outline'] as const;
const radiusOptions = ['none', 'small', 'medium', 'large', 'full'] as const;

// Sample avatar images
const avatarImages = [
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
];

const sampleUsers = [
  {
    name: 'John Doe',
    description: 'Product Designer',
    fallback: 'JD',
    src: avatarImages[0],
  },
  {
    name: 'Jane Smith',
    description: 'Software Engineer',
    fallback: 'JS',
    src: avatarImages[1],
  },
  {
    name: 'Mike Johnson',
    description: 'UX Researcher',
    fallback: 'MJ',
    src: avatarImages[2],
  },
  {
    name: 'Sarah Wilson',
    description: 'Design Lead',
    fallback: 'SW',
  },
  {
    name: 'Alex Chen',
    description: 'Frontend Developer',
    fallback: 'AC',
  },
];

export default function UserCardPlayground() {
  return (
    <Flex direction="column" gap="6">
      <Flex direction="column" gap="2">
        <Badge size="2" variant="soft" color="green" style={{ alignSelf: 'flex-start' }}>
          New
        </Badge>
        <Heading size="6" weight="bold">
          User Card
        </Heading>
        <Text size="3" color="gray">
          Display user information with avatar, name, and optional description.
        </Text>
      </Flex>

      <Tabs.Root defaultValue="theme-colors">
        <Tabs.List size="2">
          <Tabs.Trigger value="theme-colors">Theme colors</Tabs.Trigger>
          <Tabs.Trigger value="all-colors">All colors</Tabs.Trigger>
          <Tabs.Trigger value="all-sizes">All sizes</Tabs.Trigger>
          <Tabs.Trigger value="avatar-variants">Avatar variants</Tabs.Trigger>
          <Tabs.Trigger value="avatar-radius">Avatar radius</Tabs.Trigger>
          <Tabs.Trigger value="flush">Flush</Tabs.Trigger>
          <Tabs.Trigger value="interactive">Interactive</Tabs.Trigger>
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
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Accent
                    </Text>
                  </Table.RowHeaderCell>
                  {variants.map((variant) => (
                    <Table.Cell key={variant}>
                      <UserCard
                        size="2"
                        variant={variant}
                        name={sampleUsers[0].name}
                        description={sampleUsers[0].description}
                        src={sampleUsers[0].src}
                        fallback={sampleUsers[0].fallback}
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
                      <UserCard
                        size="2"
                        variant={variant}
                        color="gray"
                        name={sampleUsers[1].name}
                        description={sampleUsers[1].description}
                        src={sampleUsers[1].src}
                        fallback={sampleUsers[1].fallback}
                      />
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
                {accentColors.map((color, idx) => (
                  <React.Fragment key={color}>
                    <Table.Row>
                      <Table.RowHeaderCell>
                        <Text size="1" color="gray" style={{ textTransform: 'capitalize' }}>
                          {color}
                        </Text>
                      </Table.RowHeaderCell>
                      {variants.map((variant) => (
                        <Table.Cell key={variant}>
                          <UserCard
                            size="2"
                            variant={variant}
                            color={color}
                            name={sampleUsers[idx % sampleUsers.length].name}
                            description={sampleUsers[idx % sampleUsers.length].description}
                            src={sampleUsers[idx % sampleUsers.length].src}
                            fallback={sampleUsers[idx % sampleUsers.length].fallback}
                          />
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
                          <UserCard
                            size="2"
                            variant={variant}
                            color={color}
                            highContrast
                            name={sampleUsers[idx % sampleUsers.length].name}
                            description={sampleUsers[idx % sampleUsers.length].description}
                            src={sampleUsers[idx % sampleUsers.length].src}
                            fallback={sampleUsers[idx % sampleUsers.length].fallback}
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
                {sizes.map((size, idx) => (
                  <Table.Row key={size}>
                    <Table.RowHeaderCell>
                      <Text size="1" color="gray">
                        Size {size}
                      </Text>
                    </Table.RowHeaderCell>
                    {variants.map((variant) => (
                      <Table.Cell key={variant}>
                        <UserCard
                          size={size as any}
                          variant={variant}
                          name={sampleUsers[idx].name}
                          description={sampleUsers[idx].description}
                          src={sampleUsers[idx].src}
                          fallback={sampleUsers[idx].fallback}
                        />
                      </Table.Cell>
                    ))}
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </Tabs.Content>

        {/* Avatar Variants Tab */}
        <Tabs.Content value="avatar-variants">
          <Box pt="4">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell style={{ width: '120px' }}>
                    <Text size="1" color="gray">
                      Avatar Variant
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
                {avatarVariants.map((avatarVariant, idx) => (
                  <Table.Row key={avatarVariant}>
                    <Table.RowHeaderCell>
                      <Text size="1" color="gray" style={{ textTransform: 'capitalize' }}>
                        {avatarVariant}
                      </Text>
                    </Table.RowHeaderCell>
                    {variants.map((variant) => (
                      <Table.Cell key={variant}>
                        <UserCard
                          size="2"
                          variant={variant}
                          avatarVariant={avatarVariant}
                          name={sampleUsers[idx].name}
                          description={sampleUsers[idx].description}
                          src={sampleUsers[idx].src}
                          fallback={sampleUsers[idx].fallback}
                        />
                      </Table.Cell>
                    ))}
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </Tabs.Content>

        {/* Avatar Radius Tab */}
        <Tabs.Content value="avatar-radius">
          <Box pt="4">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell style={{ width: '120px' }}>
                    <Text size="1" color="gray">
                      Avatar Radius
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
                {radiusOptions.map((radius, idx) => (
                  <Table.Row key={radius}>
                    <Table.RowHeaderCell>
                      <Text size="1" color="gray" style={{ textTransform: 'capitalize' }}>
                        {radius === 'none' ? 'No radius' : radius}
                      </Text>
                    </Table.RowHeaderCell>
                    {variants.map((variant) => (
                      <Table.Cell key={variant}>
                        <UserCard
                          size="2"
                          variant={variant}
                          radius={radius as any}
                          name={sampleUsers[idx % sampleUsers.length].name}
                          description={sampleUsers[idx % sampleUsers.length].description}
                          src={sampleUsers[idx % sampleUsers.length].src}
                          fallback={sampleUsers[idx % sampleUsers.length].fallback}
                        />
                      </Table.Cell>
                    ))}
                  </Table.Row>
                ))}
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
                      Flush
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
                <Table.Row>
                  <Table.RowHeaderCell style={{ verticalAlign: 'middle' }}>
                    <Text size="1" color="gray">
                      Default
                    </Text>
                  </Table.RowHeaderCell>
                  {variants.map((variant) => (
                    <Table.Cell key={variant} style={{ verticalAlign: 'middle' }}>
                      <UserCard
                        size="2"
                        variant={variant}
                        name={sampleUsers[0].name}
                        description={sampleUsers[0].description}
                        src={sampleUsers[0].src}
                        fallback={sampleUsers[0].fallback}
                        style={{
                          ...(variant === 'ghost' && {
                            border: '1px dashed var(--gray-a6)',
                          }),
                        }}
                      />
                    </Table.Cell>
                  ))}
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell style={{ verticalAlign: 'middle' }}>
                    <Text size="1" color="gray">
                      Flush
                    </Text>
                  </Table.RowHeaderCell>
                  {variants.map((variant) => (
                    <Table.Cell key={variant} style={{ verticalAlign: 'middle' }}>
                      <UserCard
                        size="2"
                        variant={variant}
                        flush
                        name={sampleUsers[1].name}
                        description={sampleUsers[1].description}
                        src={sampleUsers[1].src}
                        fallback={sampleUsers[1].fallback}
                        style={{
                          ...(variant === 'ghost' && {
                            border: '1px dashed var(--gray-a6)',
                          }),
                        }}
                      />
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
              <Box>
                <Table.Root>
                  <Table.Header>
                    <Table.Row>
                      <Table.ColumnHeaderCell style={{ width: '120px' }}>
                        <Text size="1" color="gray">
                          Type
                        </Text>
                      </Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell style={{ width: '300px' }}>
                        <Text size="1" color="gray">
                          Example
                        </Text>
                      </Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell style={{ width: '200px' }}>
                        <Text size="1" color="gray">
                          Description
                        </Text>
                      </Table.ColumnHeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    <Table.Row>
                      <Table.RowHeaderCell>
                        <Text size="1" color="gray">
                          Button
                        </Text>
                      </Table.RowHeaderCell>
                      <Table.Cell>
                        <UserCard
                          size="2"
                          variant="surface"
                          name="John Doe"
                          description="Click to view profile"
                          src={sampleUsers[0].src}
                          fallback="JD"
                          asChild
                        >
                          <button
                            onClick={() => alert('Clicked John Doe!')}
                            style={{
                              border: 'none',
                              cursor: 'pointer',
                            }}
                          />
                        </UserCard>
                      </Table.Cell>
                      <Table.Cell>
                        <Text size="1" color="gray">
                          Entire card is clickable
                        </Text>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.RowHeaderCell>
                        <Text size="1" color="gray">
                          Link
                        </Text>
                      </Table.RowHeaderCell>
                      <Table.Cell>
                        <UserCard
                          size="2"
                          variant="surface"
                          name="Jane Smith"
                          description="Software Engineer"
                          src={sampleUsers[1].src}
                          fallback="JS"
                          asChild
                        >
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              alert('Navigating to Jane Smith!');
                            }}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                          />
                        </UserCard>
                      </Table.Cell>
                      <Table.Cell>
                        <Text size="1" color="gray">
                          Card as navigation link
                        </Text>
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.RowHeaderCell>
                        <Text size="1" color="gray">
                          Icon Fallback
                        </Text>
                      </Table.RowHeaderCell>
                      <Table.Cell>
                        <UserCard
                          size="2"
                          variant="surface"
                          name="Alex Chen"
                          description="Frontend Developer"
                          fallback={<User size={16} />}
                        />
                      </Table.Cell>
                      <Table.Cell>
                        <Text size="1" color="gray">
                          Using icon as fallback
                        </Text>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.RowHeaderCell>
                        <Text size="1" color="gray">
                          Ghost Flush Button
                        </Text>
                      </Table.RowHeaderCell>
                      <Table.Cell>
                        <UserCard
                          size="2"
                          variant="ghost"
                          flush
                          name="Taylor Swift"
                          description="Click for seamless interaction"
                          fallback="TS"
                          asChild
                          style={{
                            border: '1px dashed var(--gray-a6)',
                          }}
                        >
                          <button
                            onClick={() => alert('Clicked Taylor Swift!')}
                            style={{
                              border: 'none',
                              cursor: 'pointer',
                            }}
                          />
                        </UserCard>
                      </Table.Cell>
                      <Table.Cell>
                        <Text size="1" color="gray">
                          Ghost variant with flush for seamless blending
                        </Text>
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.RowHeaderCell>
                        <Text size="1" color="gray">
                          Ghost Button
                        </Text>
                      </Table.RowHeaderCell>
                      <Table.Cell>
                        <UserCard
                          size="2"
                          variant="ghost"
                          name="Emma Davis"
                          description="UI Designer"
                          fallback="ED"
                          asChild
                        >
                          <button
                            onClick={() => alert('Clicked Emma Davis!')}
                            style={{
                              border: 'none',
                              cursor: 'pointer',
                            }}
                          />
                        </UserCard>
                      </Table.Cell>
                      <Table.Cell>
                        <Text size="1" color="gray">
                          Ghost variant with button
                        </Text>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table.Root>
              </Box>
            </Flex>
          </Box>
        </Tabs.Content>
      </Tabs.Root>
    </Flex>
  );
}
