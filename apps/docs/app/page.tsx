'use client';

import {
  Button,
  Flex,
  Text,
  Heading,
  Container,
  Badge,
  Section,
  Link,
  Card,
  Code,
} from '@kushagradhawan/kookie-ui';
import { Github, Play } from 'lucide-react';

export default function HeroSection() {
  return (
    <Section>
      <Container size="4">
        <Flex direction="column" gap="9" p="6">
          {/* Title and subtitle section */}
          <Flex direction="column" gap="8">
            <Heading size="9" weight="medium">
              Kookie UI
            </Heading>
            <Flex direction="column" gap="3">
              <Text size="5" color="gray">
                A comprehensive design system built on Radix Themes. Components that work together,
                documentation for both designers and developers, and patterns that scale.
              </Text>
              <Flex align="center" gap="2">
                <Badge highContrast color="orange">
                  Beta
                </Badge>
                <Text size="3" color="gray">
                  Currently in production at{' '}
                  <Link target="_blank" href="https://womp.com">
                    Womp 3D
                  </Link>
                </Text>
              </Flex>
            </Flex>
          </Flex>

          {/* Call-to-action buttons */}
          <Flex direction="row" gap="3">
            <Button asChild variant="solid" size="3" highContrast>
              <Link href="/docs/introduction">
                <Play />
                Get Started
              </Link>
            </Button>
            <Button asChild variant="outline" size="3">
              <Link target="_blank" href="https://github.com/kushagradhawan/kookie-ui">
                <Github />
                GitHub
              </Link>
            </Button>
          </Flex>
        </Flex>
      </Container>
    </Section>
  );
}
