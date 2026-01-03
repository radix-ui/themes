'use client';

import { Button, Container, Section, Link as KUILink, Avatar, Callout, Flex } from '@kushagradhawan/kookie-ui';
import { Hero } from '@kushagradhawan/kookie-blocks';
import Link from 'next/link';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowUpRight01Icon } from '@hugeicons/core-free-icons';

export default function HeroSection() {
  return (
    <Section size="2">
      <Container size="2">
        <Hero.Root gap="8" p="6">
          <Hero.Meta>
            <Avatar fallback="K" size="2" color="gray" src="/kookie-ui-logo.png" />
          </Hero.Meta>

          <Hero.Title>A system to build consistent and scalable user interfaces.</Hero.Title>

          <Hero.Description color="gray">
            An open-source{' '}
            <KUILink target="_blank" href="https://github.com/KushagraDhawan1997/kookie-ui" rel="noopener noreferrer">
              fork
            </KUILink>{' '}
            of{' '}
            <KUILink target="_blank" href="https://radix-ui.com/themes" rel="noopener noreferrer">
              Radix Themes
            </KUILink>
            , focused on building scalable, consistent UI components with a fresh visual style and practical foundations. Component documentation is coming soon.
          </Hero.Description>

          <Hero.Actions>
            <Button highContrast color="gray" variant="solid" size="2" asChild>
              <Link href="/docs/installation">
                Get Started with UI
                <HugeiconsIcon icon={ArrowUpRight01Icon} strokeWidth={1.5} />
              </Link>
            </Button>
          </Hero.Actions>

          <Flex justify="center">
            <Link href="https://www.kushagradhawan.com/articles/kookie-chatbar-update" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <Callout.Root highContrast variant="outline" color="gray" size="2" style={{ cursor: 'pointer' }}>
                <Callout.Text align="center">
                  New component: <span style={{ textDecoration: 'underline' }}>Chatbar</span>. Read about the latest update.
                </Callout.Text>
              </Callout.Root>
            </Link>
          </Flex>
        </Hero.Root>
      </Container>
    </Section>
  );
}
