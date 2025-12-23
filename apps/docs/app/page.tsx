'use client';

import { Button, Flex, Text, Heading, Container, Section, Link as KUILink, Image, Avatar, Callout } from '@kushagradhawan/kookie-ui';
import Link from 'next/link';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowUpRight01Icon } from '@hugeicons/core-free-icons';

export default function HeroSection() {
  return (
    <>
      <Section size="2">
        <Flex gap="12" direction="column">
          <Container size="2" style={{ position: 'relative', zIndex: 1 }}>
            {/* Title and subtitle section */}
            <Flex direction="column" gap="8" p="6" align="center">
              <Flex direction="column" gap="6">
                <Flex direction="column" align="center" gap="6">
                  <Avatar fallback="K" size="2" color="gray" src="/kookie-logo.png"></Avatar>
                  <Heading size="9" weight="medium" align="center">
                    A system to build consistent and scalable user interfaces.
                  </Heading>
                </Flex>
                <Flex gap="4" direction="column" align="center">
                  <Text size="4" align="center">
                    An open-source{' '}
                    <KUILink target="_blank" href="https://github.com/KushagraDhawan1997/kookie-ui" rel="noopener noreferrer">
                      fork
                    </KUILink>{' '}
                    of{' '}
                    <KUILink target="_blank" href="https://radix-ui.com/themes" rel="noopener noreferrer">
                      Radix Themes
                    </KUILink>
                    , focused on building scalable, consistent UI components with a fresh visual style and practical foundations. Component documentation is coming soon.
                  </Text>
                </Flex>
              </Flex>

              {/* Call-to-action buttons */}
              <Button highContrast color="gray" variant="solid" size="2" asChild>
                <Link href="/docs/installation">
                  Get Started with Kookie
                  <HugeiconsIcon icon={ArrowUpRight01Icon} strokeWidth={1.5} />
                </Link>
              </Button>

              <Flex justify="center">
                <Link href="https://www.kushagradhawan.com/articles/kookie-chatbar-update" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                  <Callout.Root highContrast variant="outline" color="gray" size="2" style={{ cursor: 'pointer' }}>
                    <Callout.Text align="center">
                      New component: <span style={{ textDecoration: 'underline' }}>Chatbar</span>. Read about the latest update.
                    </Callout.Text>
                  </Callout.Root>
                </Link>
              </Flex>
            </Flex>
          </Container>
        </Flex>
      </Section>

      {/* Image Section */}
      <Section size="2">
        <Container size="4">
          <Image
            src="/kookie-ui-hero.png"
            alt="Hero"
            width="100%"
            height="600px"
            radius="none"
            style={{
              backgroundPosition: 'top',
            }}
          />
        </Container>
      </Section>
    </>
  );
}
