'use client';

import React from 'react';
import { Container, Heading, Text, Link, Flex, Section } from '@kushagradhawan/kookie-ui';

export default function LandingPage() {
  return (
    <Section size="4">
      <Container size="4">
        {/* Hero Section */}
        <Flex direction="column" align="center">
          <Flex direction="row" gap="9" align="center">
            <Heading size="9" weight="medium" style={{ flex: 1 }}>
              Kookie
            </Heading>
            <Text size="4" color="gray" style={{ flex: 1 }}>
              A pattern-first design system. Built on Radix. Proven in production at{' '}
              <Link href="https://www.womp.com" target="_blank">
                Womp
              </Link>
            </Text>
          </Flex>
          {/* <Button size="3" variant="solid">
            Coming Soon
          </Button> */}
        </Flex>
      </Container>
    </Section>
  );
}
