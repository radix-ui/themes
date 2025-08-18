'use client';

import React from 'react';
import {
  Container,
  Heading,
  Text,
  Button,
  Flex,
  Card,
  Link as KookieLink,
  Box,
  Grid,
  Badge,
  Shell,
} from '@kushagradhawan/kookie-ui';
import { PanelLeft } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <Shell.Root>
      <Shell.Header>
        <Container size="4">
          <Flex align="center" justify="between" py="4">
            <Shell.Trigger side="start">
              <PanelLeft />
            </Shell.Trigger>

            <KookieLink asChild>
              <Link href="/">
                <Text size="2" weight="medium">
                  KookieUI
                </Text>
              </Link>
            </KookieLink>
          </Flex>
        </Container>
      </Shell.Header>

      <Shell.Sidebar side="start">
        <Shell.Sidebar.Rail />
        <Shell.Sidebar.Panel />
      </Shell.Sidebar>

      <Shell.Content>
        <Container size="3">
          <Flex direction="column" py="9" gap="9">
            {/* Hero Section */}
            <Flex direction="column" gap="6" py="16" align="center">
              <Heading size="9" weight="semibold" align="center">
                Kookie User Inteface
              </Heading>
              <Text size="5" color="gray" align="center">
                A pattern-first design system. Built on Radix. Proven in production at Womp.
              </Text>
              <Button size="3" variant="solid">
                Coming Soon
              </Button>
            </Flex>
            <Grid columns="2" gap="2" py="16" align="center">
              <Card size="4" variant="classic">
                <Flex direction="column" gap="2">
                  <Flex align="center" gap="2">
                    <Heading size="3" weight="medium">
                      Foundations
                    </Heading>
                    <Badge variant="soft" color="gray">
                      Coming Soon
                    </Badge>
                  </Flex>
                  <Text size="3" color="gray">
                    Tokens, density, motion
                  </Text>
                </Flex>
              </Card>
              <Card size="4" variant="classic">
                <Flex direction="column" gap="2">
                  <Flex align="center" gap="2">
                    <Heading size="3" weight="medium">
                      Patterns
                    </Heading>
                    <Badge variant="soft" color="gray">
                      Coming Soon
                    </Badge>
                  </Flex>
                  <Text size="3" color="gray">
                    Actions, overlays, layout…
                  </Text>
                </Flex>
              </Card>
              <Card size="4" variant="classic">
                <Flex direction="column" gap="2">
                  <Flex align="center" gap="2">
                    <Heading size="3" weight="medium">
                      Reference
                    </Heading>
                    <Badge variant="soft" color="gray">
                      Coming Soon
                    </Badge>
                  </Flex>
                  <Text size="3" color="gray">
                    APIs, theming hooks
                  </Text>
                </Flex>
              </Card>
              <Card size="4" variant="classic">
                <Flex direction="column" gap="2">
                  <Flex align="center" gap="2">
                    <Heading size="3" weight="medium">
                      Examples
                    </Heading>
                    <Badge variant="soft" color="gray">
                      Coming Soon
                    </Badge>
                  </Flex>
                  <Text size="3" color="gray">
                    Womp editor slice, dashboards
                  </Text>
                </Flex>
              </Card>
            </Grid>
            <Text size="3" color="gray" align="center">
              Design systems should be boring. KookieUI codifies the boring parts so design leads,
              and developers just consume.
            </Text>
          </Flex>
        </Container>
      </Shell.Content>

      <Shell.Footer>
        <Flex align="center" justify="center" py="6">
          <Text size="2" color="gray">
            © 2025 Kushagra Dhawan
          </Text>
        </Flex>
      </Shell.Footer>
    </Shell.Root>
  );
}
