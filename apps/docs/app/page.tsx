'use client';

import { Button, Flex, Text, Heading, Container, Badge, Card, Shell, Section, IconButton, Grid, Link as KUILink, Avatar } from '@kushagradhawan/kookie-ui';
import Link from 'next/link';
import { GripVertical, ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <Section size="4">
      <Flex gap="12" direction="column">
        <Container size="2" style={{ position: 'relative', zIndex: 1 }}>
          {/* Title and subtitle section */}
          <Flex direction="column" gap="8" p="6" align="start">
            <Flex direction="column" gap="6">
              {/* <Flex direction="row" align="center" gap="1">
                <Badge highContrast>Coming Soon</Badge>
              </Flex> */}
              <Avatar fallback="K" size="2" src="/kookie-ui-logo.png"></Avatar>
              <Flex direction="column" align="center" gap="4">
                <Heading size="8" weight="semibold">
                  A system to build consistent and scalable user interfaces.
                </Heading>
              </Flex>
              <Flex gap="4" direction="column">
                <Text size="4" color="gray">
                  Kookie UI is an open-source{' '}
                  <KUILink target="_blank" href="https://github.com/KushagraDhawan1997/kookie-ui" rel="noopener noreferrer">
                    fork
                  </KUILink>{' '}
                  of{' '}
                  <KUILink target="_blank" href="https://radix-ui.com/themes" rel="noopener noreferrer">
                    Radix Themes
                  </KUILink>
                  , focused on building scalable, consistent UI components with a fresh visual style and practical foundations.
                </Text>
                <Text size="4" color="gray">
                  Component documentation is coming soon.
                </Text>
              </Flex>
            </Flex>

            {/* Call-to-action buttons */}
            <Button highContrast color="gray" variant="solid" size="2" asChild>
              <Link href="/docs/installation">
                Installation
                <ArrowRight />
              </Link>
            </Button>
          </Flex>
        </Container>
      </Flex>
    </Section>
  );
}
