'use client';

import { Button, Container, Section, Link as KUILink, Avatar, Callout, Flex, Separator, Text, Box } from '@kushagradhawan/kookie-ui';
import { Hero, Footer } from '@kushagradhawan/kookie-blocks';
import Link from 'next/link';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowUpRight01Icon } from '@hugeicons/core-free-icons';

export default function HeroSection() {
  const currentYear = new Date().getFullYear();

  return (
    <>
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

      <Box mb="9">
        <Separator size="4" light />
        <Container size="4">
          <Footer.Root p="8" gap="8" px={{ initial: '4', sm: '6' }}>
            <Footer.Main>
              <Footer.Brand gap="6">
                <Avatar fallback="K" size="3" color="gray" src="/kookie-ui-logo.png" />
                <Flex direction="column" gap="4">
                  <Footer.Tagline>
                    Built with{' '}
                    <Footer.Link href="https://www.hellokookie.com/" target="_blank" underline="always">
                      Kookie UI
                    </Footer.Link>
                    {' + '}
                    <Footer.Link href="https://blocks.hellokookie.com/" target="_blank" underline="always">
                      Kookie Blocks
                    </Footer.Link>
                    .
                  </Footer.Tagline>
                  <Footer.Legal>
                    <Text size="2" color="gray">
                      © {currentYear} Kushagra Dhawan. Licensed under MIT.
                    </Text>
                    <Footer.Link href="https://github.com/KushagraDhawan1997/kookie-ui" target="_blank">
                      GitHub
                    </Footer.Link>
                    <Footer.Link href="/sitemap.xml">Sitemap</Footer.Link>
                  </Footer.Legal>
                </Flex>
              </Footer.Brand>
              <Footer.Links>
                <Footer.LinkGroup title="Projects">
                  <Footer.Link href="https://womp.com" target="_blank">
                    Womp 3D
                  </Footer.Link>
                  <Footer.Link href="https://www.hellokookie.com/" target="_blank">
                    Kookie UI
                  </Footer.Link>
                  <Footer.Link href="https://blocks.hellokookie.com/" target="_blank">
                    Kookie Blocks
                  </Footer.Link>
                </Footer.LinkGroup>
              </Footer.Links>
            </Footer.Main>
          </Footer.Root>
        </Container>
      </Box>
    </>
  );
}
