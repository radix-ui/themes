'use client';

import * as React from 'react';
import { PreviewBlock, CodeBlock, SectionHeader } from '@kushagradhawan/kookie-blocks';
import { Flex, Card, Text, Heading, Button, Inset, Separator, Image } from '@kushagradhawan/kookie-ui';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowRight01Icon, Book02Icon } from '@hugeicons/core-free-icons';

const IMAGE_URL = 'https://images.unsplash.com/photo-1745613944320-1f14580bb0db?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDQ5fHx8ZW58MHx8fHx8';

export function CardExamples() {
  return (
    <Flex direction="column" gap="9">
      {/* Example 1: Content Card with Media */}
      <Flex direction="column" gap="4">
        <SectionHeader.Root>
          <SectionHeader.Content>
            <SectionHeader.Title>Content Card</SectionHeader.Title>
            <SectionHeader.Description>
              Use Inset for edge-to-edge media placement within cards. The classic variant provides subtle elevation, with solid buttons for clear hierarchy.
            </SectionHeader.Description>
          </SectionHeader.Content>
        </SectionHeader.Root>
        <PreviewBlock background="dots" height="40rem">
          <Card variant="classic" size="2" style={{ maxWidth: 320 }}>
            <Flex direction="column">
              <Inset clip="padding-box" side="top" pb="current">
                <Image
                  src={IMAGE_URL}
                  alt="Abstract gradient"
                  radius="none"
                  style={{
                    height: 320,
                    objectFit: 'cover',
                  }}
                />
              </Inset>
              <Flex direction="column" gap="4" p="2">
                <Flex direction="column" gap="2">
                  <Heading size="6" weight="medium">
                    Getting Started
                  </Heading>
                  <Text size="3" color="gray">
                    Learn the fundamentals of building modern interfaces with our comprehensive guide.
                  </Text>
                </Flex>
                <Button variant="solid" size="2" color="gray" highContrast>
                  Read More
                  <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={1.75} />
                </Button>
              </Flex>
            </Flex>
          </Card>
        </PreviewBlock>
        <CodeBlock
          code={`<Card variant="classic" size="2" style={{ maxWidth: 320 }}>
  <Flex direction="column">
    <Inset clip="padding-box" side="top" pb="current">
      <Image
        src="/path/to/image.jpg"
        alt="Card media"
        radius="none"
        style={{ height: 320, objectFit: 'cover' }}
      />
    </Inset>
    <Flex direction="column" gap="4" p="2">
      <Flex direction="column" gap="2">
        <Heading size="6" weight="medium">Getting Started</Heading>
        <Text size="3" color="gray">
          Learn the fundamentals of building modern interfaces
          with our comprehensive guide.
        </Text>
      </Flex>
      <Button variant="solid" size="2" color="gray" highContrast>
        Read More
        <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={1.75} />
      </Button>
    </Flex>
  </Flex>
</Card>`}
          language="tsx"
          showLineNumbers={true}
          collapsible={false}
        />
      </Flex>

      <Separator size="4" />

      {/* Example 2: Translucent Material */}
      <Flex direction="column" gap="4">
        <SectionHeader.Root>
          <SectionHeader.Content>
            <SectionHeader.Title>Translucent Material</SectionHeader.Title>
            <SectionHeader.Description>
              The translucent material creates depth over images and dynamic backgrounds. Use soft variant buttons with highContrast for readability on complex surfaces.
            </SectionHeader.Description>
          </SectionHeader.Content>
        </SectionHeader.Root>
        <PreviewBlock
          height="40rem"
          showThemeToggle={false}
          appearance="dark"
          variant="ghost"
          background={{
            backgroundImage: `url(${IMAGE_URL})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <Card variant="classic" material="translucent" size="3" style={{ maxWidth: 320 }}>
            <Flex direction="column" gap="8">
              <Flex direction="column" gap="4">
                <HugeiconsIcon icon={Book02Icon} size={24} strokeWidth={1.75} />
                <Heading size="6" weight="medium">
                  Getting Started
                </Heading>
                <Text size="3" color="gray">
                  Learn the fundamentals of building modern interfaces with our comprehensive guide. This tutorial covers components, layouts, and best practices for creating beautiful user
                  experiences.
                </Text>
                <Text size="3" color="gray">
                  Whether you're new to design systems or looking to refine your skills, this guide has everything you need.
                </Text>
              </Flex>
              <Button variant="solid" size="2" color="gray" highContrast>
                Read More
                <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={1.75} />
              </Button>
            </Flex>
          </Card>
        </PreviewBlock>
        <CodeBlock
          code={`<Card variant="classic" material="translucent" size="3" style={{ maxWidth: 320 }}>
  <Flex direction="column" gap="8">
    <Flex direction="column" gap="4">
      <HugeiconsIcon icon={Book02Icon} size={24} strokeWidth={1.75} />
      <Heading size="6" weight="medium">Getting Started</Heading>
      <Text size="3" color="gray">
        Learn the fundamentals of building modern interfaces
        with our comprehensive guide. This tutorial covers
        components, layouts, and best practices for creating
        beautiful user experiences.
      </Text>
      <Text size="3" color="gray">
        Whether you're new to design systems or looking to
        refine your skills, this guide has everything you need.
      </Text>
    </Flex>
    <Button variant="solid" size="2" color="gray" highContrast>
      Read More
      <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={1.75} />
    </Button>
  </Flex>
</Card>`}
          language="tsx"
          showLineNumbers={true}
          collapsible={false}
        />
      </Flex>
    </Flex>
  );
}
