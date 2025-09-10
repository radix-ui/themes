'use client';

import {
  Button,
  Flex,
  Text,
  Heading,
  Container,
  Badge,
  Theme,
  Link,
  Image,
  Inset,
  Box,
} from '@kushagradhawan/kookie-ui';
import { Github, Play } from 'lucide-react';

export default function HeroSection() {
  return (
    // The goal is to add the provided Unsplash image as a background image to the Section.
    // We'll use the `style` prop on Section to set the background image, ensuring it covers the area and is centered.
    <Theme appearance="dark">
      <Flex
        pt="12"
        gap="8"
        direction="column"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1663275162414-64dba99065a2?q=80&w=2728&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Container size="2">
          {/* Title and subtitle section */}
          <Flex direction="column" gap="8" align="center">
            <Heading size="9" weight="medium" align="center">
              A comprehensive design system. More than components.
            </Heading>
            <Flex direction="column" gap="3" align="center">
              <Text size="4" color="gray" align="center">
                Built on Radix Themes. Components that work together, documentation for both
                designers and developers, and patterns that scale.
              </Text>
            </Flex>

            <Flex align="center" gap="2" direction="row">
              <Text size="2" color="gray">
                Currently being tested in production at{' '}
                <Link target="_blank" href="https://womp.com">
                  Womp 3D
                </Link>
              </Text>
              <Badge highContrast color="orange">
                Beta
              </Badge>
            </Flex>

            {/* Call-to-action buttons */}
            <Button asChild variant="solid" size="3" highContrast>
              <Link href="/docs/introduction">Get Started</Link>
            </Button>
          </Flex>
        </Container>

        <Container>
          <Inset clip="padding-box">
            <Image src="/sample.png" alt="KookieUI" />
          </Inset>
        </Container>
      </Flex>
    </Theme>
  );
}
