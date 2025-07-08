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
import { demoImages } from '../../../lib/demo-images';

const commonRatios = [
  { ratio: 16 / 9, label: '16:9 (Widescreen)' },
  { ratio: 4 / 3, label: '4:3 (Standard)' },
  { ratio: 3 / 2, label: '3:2 (Photography)' },
  { ratio: 1, label: '1:1 (Square)' },
  { ratio: 9 / 16, label: '9:16 (Portrait)' },
  { ratio: 21 / 9, label: '21:9 (Ultrawide)' },
] as const;

const variants = ['surface', 'blur'] as const;
const fitOptions = ['cover', 'contain', 'fill'] as const;

export default function AspectRatioPlayground() {
  return (
    <Flex direction="column" gap="6">
      <Flex direction="column" gap="2">
        <Badge size="2" variant="soft" color="orange" style={{ alignSelf: 'flex-start' }}>
          Updated
        </Badge>
        <Heading size="6" weight="bold">
          Aspect Ratio
        </Heading>
        <Text size="3" color="gray">
          Maintains a consistent aspect ratio for its child content.
        </Text>
      </Flex>

      <Tabs.Root defaultValue="common-ratios">
        <Tabs.List size="2">
          <Tabs.Trigger value="common-ratios">Common Ratios</Tabs.Trigger>
          <Tabs.Trigger value="with-variants">With Variants</Tabs.Trigger>
        </Tabs.List>

        {/* Common Ratios Tab */}
        <Tabs.Content value="common-ratios">
          <Box pt="4">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell style={{ width: '150px' }}>
                    <Text size="1" color="gray">
                      Aspect Ratio
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '300px' }}>
                    <Text size="1" color="gray">
                      Preview
                    </Text>
                  </Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {commonRatios.map(({ ratio, label }) => (
                  <Table.Row key={label}>
                    <Table.RowHeaderCell>
                      <Text size="1" color="gray">
                        {label}
                      </Text>
                    </Table.RowHeaderCell>
                    <Table.Cell>
                      <Box width="200px">
                        <AspectRatio ratio={ratio}>
                          <Image
                            src={demoImages.landscape}
                            alt="Aspect ratio demo"
                            variant="surface"
                            width="100%"
                            height="100%"
                            radius="medium"
                            fit="cover"
                          />
                        </AspectRatio>
                      </Box>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </Tabs.Content>

        {/* With Variants Tab */}
        <Tabs.Content value="with-variants">
          <Box pt="4">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell style={{ width: '120px' }}>
                    <Text size="1" color="gray">
                      Image Variant
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '200px' }}>
                    <Text size="1" color="gray">
                      16:9 (Widescreen)
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '200px' }}>
                    <Text size="1" color="gray">
                      1:1 (Square)
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '200px' }}>
                    <Text size="1" color="gray">
                      9:16 (Portrait)
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
                      <Box width="150px">
                        <AspectRatio ratio={16 / 9}>
                          <Image
                            src={demoImages.landscape}
                            alt="Widescreen demo"
                            variant={variant}
                            width="100%"
                            height="100%"
                            radius="medium"
                            fit="cover"
                          />
                        </AspectRatio>
                      </Box>
                    </Table.Cell>
                    <Table.Cell>
                      <Box width="150px">
                        <AspectRatio ratio={1}>
                          <Image
                            src={demoImages.square}
                            alt="Square demo"
                            variant={variant}
                            width="100%"
                            height="100%"
                            radius="medium"
                            fit="cover"
                          />
                        </AspectRatio>
                      </Box>
                    </Table.Cell>
                    <Table.Cell>
                      <Box width="150px">
                        <AspectRatio ratio={9 / 16}>
                          <Image
                            src={demoImages.portrait}
                            alt="Portrait demo"
                            variant={variant}
                            width="100%"
                            height="100%"
                            radius="medium"
                            fit="cover"
                          />
                        </AspectRatio>
                      </Box>
                    </Table.Cell>
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
