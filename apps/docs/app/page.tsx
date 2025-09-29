'use client';

import { Button, Flex, Text, Heading, Container, Badge, Card, Shell, Section, IconButton, Grid, Link as KUILink } from '@kushagradhawan/kookie-ui';
import Link from 'next/link';
import { GripVertical, ArrowDownToLine } from 'lucide-react';

export default function HeroSection() {
  return (
    <Section size="4">
      <Flex gap="12" direction="column">
        <Container size="2" style={{ position: 'relative', zIndex: 1 }}>
          {/* Title and subtitle section */}
          <Flex direction="column" gap="8" p="6" align="start">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="var(--gray-9)" viewBox="0 0 256 256" aria-label="Kushagra Dhawan Logo">
              <path d="M82.34,69.66a8,8,0,0,1,0-11.32l40-40a8,8,0,0,1,11.32,0l40,40a8,8,0,0,1,0,11.32l-40,40a8,8,0,0,1-11.32,0Zm51.32,76.68a8,8,0,0,0-11.32,0l-40,40a8,8,0,0,0,0,11.32l40,40a8,8,0,0,0,11.32,0l40-40a8,8,0,0,0,0-11.32Zm104-24-40-40a8,8,0,0,0-11.32,0l-40,40a8,8,0,0,0,0,11.32l40,40a8,8,0,0,0,11.32,0l40-40A8,8,0,0,0,237.66,122.34Zm-128,0-40-40a8,8,0,0,0-11.32,0l-40,40a8,8,0,0,0,0,11.32l40,40a8,8,0,0,0,11.32,0l40-40A8,8,0,0,0,109.66,122.34Z"></path>
            </svg>

            <Flex direction="column" gap="4">
              <Flex direction="row" align="center" gap="1">
                <Badge highContrast>Coming Soon</Badge>
                <Badge highContrast color="amber">
                  Preview
                </Badge>
              </Flex>
              <Flex direction="column" align="center" gap="4">
                <Heading size="8" weight="medium">
                  A system to build consistent and scalable user interfaces.
                </Heading>
              </Flex>
            </Flex>

            <Flex gap="2" direction="column">
              <Text size="4" color="gray">
                Built on{' '}
                <KUILink target="_blank" href="https://radix-ui.com/themes" rel="noopener noreferrer">
                  Radix Themes.
                </KUILink>
              </Text>
              <Text size="4" color="gray">
                Kookie UI provides UI components and focuses on defining where they live, establishing contract patterns, and delivering scalable layout infrastructure.
              </Text>
            </Flex>

            {/* Call-to-action buttons */}
            <Flex gap="2">
              <Link href="/docs/installation">
                <Button highContrast color="gray" variant="solid" size="3">
                  <ArrowDownToLine />
                  Installation
                </Button>
              </Link>
              {/* <Link href="/docs/home">
                <Button variant="classic" color="gray" highContrast size="3">
                  Learn More
                </Button>
              </Link> */}
            </Flex>
          </Flex>
        </Container>

        <Container style={{ display: 'none' }}>
          <Grid columns="repeat(auto-fill, minmax(320px, 1fr))" gap="4">
            <Card size="3" variant="soft">
              <Flex align="center" justify="center" p="3">
                <Button size="3">Button</Button>
              </Flex>
            </Card>
          </Grid>
        </Container>

        {/* Fallback */}
        <Container style={{ display: 'none' }}>
          <Card size="5" variant="classic">
            <Shell.Root height="600px">
              {/*  */}
              <Shell.Header>
                <Card asChild size="2" variant="outline">
                  <Flex align="center" justify="center" height="100%" width="100%"></Flex>
                </Card>
              </Shell.Header>

              {/*  */}
              <Shell.Rail defaultOpen presentation="fixed" expandedSize={64}>
                <Card asChild size="2" variant="outline">
                  <Flex align="center" justify="center" height="100%"></Flex>
                </Card>
              </Shell.Rail>

              {/*  */}
              <Shell.Panel resizable defaultOpen={true} expandedSize={280}>
                <Card asChild size="2" variant="outline">
                  <Flex align="center" justify="center" height="100%"></Flex>
                </Card>
                <Shell.Panel.Handle>
                  <IconButton variant="classic" size="1" highContrast color="gray">
                    <GripVertical />
                  </IconButton>
                </Shell.Panel.Handle>
              </Shell.Panel>

              {/*  */}
              <Shell.Content>
                <Card asChild size="2" variant="outline">
                  <Flex align="center" justify="center" height="100%"></Flex>
                </Card>
              </Shell.Content>

              {/*  */}
              <Shell.Inspector presentation="fixed" resizable defaultOpen={true} expandedSize={280}>
                <Card asChild size="2" variant="outline">
                  <Flex align="center" justify="center" height="100%"></Flex>
                </Card>
                <Shell.Inspector.Handle>
                  <IconButton variant="classic" size="1" highContrast color="gray">
                    <GripVertical />
                  </IconButton>
                </Shell.Inspector.Handle>
              </Shell.Inspector>

              {/*  */}
              <Shell.Bottom presentation="fixed" defaultOpen resizable expandedSize={100}>
                <Card asChild size="2" variant="outline">
                  <Flex align="center" justify="center" height="100%" width="100%"></Flex>
                </Card>
                <Shell.Bottom.Handle>
                  <IconButton variant="classic" size="1" highContrast color="gray">
                    <GripVertical />
                  </IconButton>
                </Shell.Bottom.Handle>
              </Shell.Bottom>
            </Shell.Root>
          </Card>
        </Container>
      </Flex>
    </Section>
  );
}
