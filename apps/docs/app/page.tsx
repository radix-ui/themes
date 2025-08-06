'use client';

import React from 'react';
import { Container, Heading, Text, Button, Flex, Badge } from '@kushagradhawan/kookie-ui';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <Flex direction="column" gap="9" align="center" justify="center">
      <Container size="3">
        <Flex direction="column" gap="6" align="center" justify="center" minHeight="100vh">
          <Heading size="9" align="center" weight="medium">
            Kookie User Interface
          </Heading>
          <Text size="4" color="gray" align="center" style={{ maxWidth: '600px' }}>
            A principled design system — expressing invisible design decisions through a composable,
            code-backed UI Toolkit.
          </Text>
          <Button size="4" asChild variant="solid">
            <Link href="/docs">Start</Link>
          </Button>
        </Flex>
      </Container>
    </Flex>
  );
}
