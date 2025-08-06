'use client';

import React from 'react';
import {
  AspectRatio,
  Image,
  Text,
  Flex,
  Box,
  Heading,
  Tabs,
  Table,
  Skeleton,
  Badge,
} from '@kushagradhawan/kookie-ui';
import { demoImages } from '../../lib/demo-images';

const variants = ['surface'] as const;
const fitOptions = ['cover', 'contain', 'fill', 'scale-down', 'none'] as const;

export default function ImagePlayground() {
  return (
    <Flex direction="column" gap="6">
      <Flex direction="column" gap="2">
        <Badge size="2" variant="soft" color="green" style={{ alignSelf: 'flex-start' }}>
          New
        </Badge>
        <Heading size="6" weight="bold">
          Image
        </Heading>
        <Text size="3" color="gray">
          Displays images with support for aspect ratio, fit, and fallback.
        </Text>
      </Flex>

      <Tabs.Root defaultValue="variants">
        <Tabs.List size="2">
          <Tabs.Trigger value="variants">Variants</Tabs.Trigger>
          <Tabs.Trigger value="fit">Object Fit</Tabs.Trigger>
          <Tabs.Trigger value="radius">Radius</Tabs.Trigger>
          <Tabs.Trigger value="caption">Caption</Tabs.Trigger>
          <Tabs.Trigger value="aspect-ratio">Aspect Ratio</Tabs.Trigger>
          <Tabs.Trigger value="interactive">Interactive</Tabs.Trigger>
          <Tabs.Trigger value="states">States</Tabs.Trigger>
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
                      Example
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>
                    <Text size="1" color="gray">
                      Description
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
                      <Image
                        src={demoImages.square}
                        alt="Demo image"
                        variant={variant}
                        width="120px"
                        height="80px"
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Text size="1" color="gray">
                        Standard image display
                      </Text>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </Tabs.Content>

        {/* Object Fit Tab */}
        <Tabs.Content value="fit">
          <Box pt="4">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell style={{ width: '120px' }}>
                    <Text size="1" color="gray">
                      Object Fit
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '200px' }}>
                    <Text size="1" color="gray">
                      Square Container
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '200px' }}>
                    <Text size="1" color="gray">
                      Wide Container
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>
                    <Text size="1" color="gray">
                      Description
                    </Text>
                  </Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {fitOptions.map((fit) => (
                  <Table.Row key={fit}>
                    <Table.RowHeaderCell>
                      <Text size="1" color="gray" style={{ textTransform: 'capitalize' }}>
                        {fit}
                      </Text>
                    </Table.RowHeaderCell>
                    <Table.Cell>
                      {fit === 'contain' || fit === 'fill' || fit === 'scale-down' ? (
                        <Box
                          style={{
                            border: '1px dashed var(--gray-a6)',
                            borderRadius: 'var(--radius-3)',
                            display: 'inline-block',
                          }}
                        >
                          <Image
                            src={demoImages.landscape}
                            alt="Demo image"
                            variant="surface"
                            width="120px"
                            height="120px"
                            fit={fit}
                          />
                        </Box>
                      ) : (
                        <Image
                          src={demoImages.landscape}
                          alt="Demo image"
                          variant="surface"
                          width="120px"
                          height="120px"
                          fit={fit}
                        />
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      {fit === 'contain' || fit === 'fill' || fit === 'scale-down' ? (
                        <Box
                          style={{
                            border: '1px dashed var(--gray-a6)',
                            borderRadius: 'var(--radius-3)',
                            display: 'inline-block',
                          }}
                        >
                          <Image
                            src={demoImages.portrait}
                            alt="Demo image"
                            variant="surface"
                            width="160px"
                            height="120px"
                            fit={fit}
                          />
                        </Box>
                      ) : (
                        <Image
                          src={demoImages.portrait}
                          alt="Demo image"
                          variant="surface"
                          width="160px"
                          height="120px"
                          fit={fit}
                        />
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      <Text size="1" color="gray">
                        {fit === 'cover' && 'Scales to fill container, may crop'}
                        {fit === 'contain' && 'Scales to fit within container'}
                        {fit === 'fill' && 'Stretches to fill container exactly'}
                        {fit === 'scale-down' && 'Acts like contain or none, whichever is smaller'}
                        {fit === 'none' && 'No scaling, shows original size'}
                      </Text>
                    </Table.Cell>
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
                  <Table.ColumnHeaderCell style={{ width: '200px' }}>
                    <Text size="1" color="gray">
                      Example
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>
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
                      None
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Image
                      src={demoImages.square}
                      alt="Demo image"
                      variant="surface"
                      width="120px"
                      height="80px"
                      radius="none"
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="1" color="gray">
                      No border radius
                    </Text>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Small
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Image
                      src={demoImages.square}
                      alt="Demo image"
                      variant="surface"
                      width="120px"
                      height="80px"
                      radius="small"
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="1" color="gray">
                      Small border radius
                    </Text>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Medium
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Image
                      src={demoImages.square}
                      alt="Demo image"
                      variant="surface"
                      width="120px"
                      height="80px"
                      radius="medium"
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="1" color="gray">
                      Medium border radius (default)
                    </Text>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Large
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Image
                      src={demoImages.square}
                      alt="Demo image"
                      variant="surface"
                      width="120px"
                      height="80px"
                      radius="large"
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="1" color="gray">
                      Large border radius
                    </Text>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Full
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Image
                      src={demoImages.square}
                      alt="Demo image"
                      variant="surface"
                      width="120px"
                      height="80px"
                      radius="full"
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="1" color="gray">
                      Fully rounded corners
                    </Text>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table.Root>
          </Box>
        </Tabs.Content>

        {/* Caption Tab */}
        <Tabs.Content value="caption">
          <Box pt="4">
            <Flex direction="column" gap="6">
              <Box>
                <Text size="2" weight="medium" style={{ marginBottom: 'var(--space-3)' }}>
                  With Caption
                </Text>
                <Box width="200px">
                  <Image
                    src={demoImages.square}
                    alt="Demo image"
                    variant="surface"
                    width="100%"
                    height="120px"
                    caption="Beautiful landscape photo with a longer caption to demonstrate text wrapping"
                  />
                </Box>
              </Box>

              <Box>
                <Text size="2" weight="medium" style={{ marginBottom: 'var(--space-3)' }}>
                  With Radius & Caption
                </Text>
                <Box width="200px">
                  <Image
                    src={demoImages.square}
                    alt="Demo image"
                    variant="surface"
                    width="100%"
                    height="120px"
                    radius="large"
                    caption="Rounded image with caption that wraps properly"
                  />
                </Box>
              </Box>

              <Box>
                <Text size="2" weight="medium" style={{ marginBottom: 'var(--space-3)' }}>
                  No Caption
                </Text>
                <Box width="200px">
                  <Image
                    src={demoImages.square}
                    alt="Demo image"
                    variant="surface"
                    width="100%"
                    height="120px"
                  />
                </Box>
              </Box>
            </Flex>
          </Box>
        </Tabs.Content>

        {/* Aspect Ratio Tab */}
        <Tabs.Content value="aspect-ratio">
          <Box pt="4">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell style={{ width: '120px' }}>
                    <Text size="1" color="gray">
                      Ratio
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '200px' }}>
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
                      16:9
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Box width="160px">
                      <AspectRatio ratio={16 / 9}>
                        <Image
                          src={demoImages.landscape}
                          alt="Surface variant in 16:9"
                          variant="surface"
                          width="100%"
                          height="100%"
                          fit="cover"
                        />
                      </AspectRatio>
                    </Box>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      1:1
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Box width="120px">
                      <AspectRatio ratio={1}>
                        <Image
                          src={demoImages.square}
                          alt="Surface variant in 1:1"
                          variant="surface"
                          width="100%"
                          height="100%"
                          fit="cover"
                        />
                      </AspectRatio>
                    </Box>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      4:3
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Box width="140px">
                      <AspectRatio ratio={4 / 3}>
                        <Image
                          src={demoImages.landscape}
                          alt="Surface variant in 4:3"
                          variant="surface"
                          width="100%"
                          height="100%"
                          fit="cover"
                        />
                      </AspectRatio>
                    </Box>
                  </Table.Cell>
                </Table.Row>
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
                      Usage
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '200px' }}>
                    <Text size="1" color="gray">
                      Example
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>
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
                      As Button
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Image
                      asChild
                      src={demoImages.square}
                      alt="Clickable image"
                      variant="surface"
                      width="120px"
                      height="80px"
                    >
                      <button onClick={() => alert('Image button clicked!')} />
                    </Image>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="1" color="gray">
                      Image wrapped in button element with hover effects
                    </Text>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      As Link
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Image
                      asChild
                      src={demoImages.square}
                      alt="Linked image"
                      variant="surface"
                      width="120px"
                      height="80px"
                    >
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          alert('Image link clicked!');
                        }}
                      />
                    </Image>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="1" color="gray">
                      Image wrapped in anchor element with hover effects
                    </Text>
                  </Table.Cell>
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
                  <Table.ColumnHeaderCell style={{ width: '200px' }}>
                    <Text size="1" color="gray">
                      Example
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>
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
                      Normal
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Image
                      src={demoImages.square}
                      alt="Demo image"
                      variant="surface"
                      width="120px"
                      height="80px"
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="1" color="gray">
                      Standard image display
                    </Text>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      With Skeleton
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Image
                      src={demoImages.square}
                      alt="Demo image"
                      variant="surface"
                      width="120px"
                      height="80px"
                      showSkeleton
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="1" color="gray">
                      Shows skeleton while loading
                    </Text>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      No Fade In
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Image
                      src={demoImages.square}
                      alt="Demo image"
                      variant="surface"
                      width="120px"
                      height="80px"
                      fadeIn={false}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="1" color="gray">
                      Immediate visibility without fade effect
                    </Text>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Lazy Loading
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Image
                      src={demoImages.square}
                      alt="Demo image"
                      variant="surface"
                      width="120px"
                      height="80px"
                      loading="lazy"
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="1" color="gray">
                      Loads when scrolled into view
                    </Text>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Eager Loading
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Image
                      src={demoImages.square}
                      alt="Demo image"
                      variant="surface"
                      width="120px"
                      height="80px"
                      loading="eager"
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="1" color="gray">
                      Loads immediately
                    </Text>
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
