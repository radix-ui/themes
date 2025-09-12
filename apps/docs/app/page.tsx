'use client';

import { Button, Flex, Text, Heading, Container, Badge, Theme, Link, Image, Inset, Box } from '@kushagradhawan/kookie-ui';
import { Github, Play } from 'lucide-react';

export default function HeroSection() {
  return (
    // The goal is to add the provided Unsplash image as a background image to the Section.
    // We'll use the `style` prop on Section to set the background image, ensuring it covers the area and is centered.
    <Theme appearance="dark" accentColor="gray">
      <Flex
        pt="12"
        gap="12"
        direction="column"
        style={{
          position: 'relative',
          backgroundImage:
            // 'url(/sample-2.png)',
            'url(https://images.unsplash.com/photo-1714547583415-6ab615e4be1c?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Box
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 10,
            background: 'linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 50%)',
            opacity: 1,
          }}
        />
        <Container size="2" style={{ position: 'relative', zIndex: 1 }}>
          {/* Title and subtitle section */}
          <Flex direction="column" gap="8" align="center">
            <Flex direction="column" gap="3" align="center">
              <Badge highContrast color="orange">
                Beta
              </Badge>
              <Heading size="9" weight="medium" align="center">
                A comprehensive design system. More than components.
              </Heading>
            </Flex>

            <Text size="4" color="gray" align="center">
              Built on Radix Themes. Components that work together, documentation for both designers and developers, and patterns that scale.
            </Text>

            {/* Call-to-action buttons */}
            <Link href="/docs/home">
              <Button variant="solid" size="3" highContrast>
                Get Started
              </Button>
            </Link>
          </Flex>
        </Container>

        <Container style={{ position: 'relative', zIndex: 1 }}>
          <Inset clip="padding-box">
            <Image src="/sample.png" alt="KookieUI" />
          </Inset>
        </Container>
      </Flex>
    </Theme>
  );
}
