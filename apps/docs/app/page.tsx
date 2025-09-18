'use client';

import { Button, Flex, Text, Heading, Container, Badge, Image, Card, Link, Shell, Section, IconButton } from '@kushagradhawan/kookie-ui';
import { GripVertical, Layers } from 'lucide-react';

export default function HeroSection() {
  return (
    // The goal is to add the provided Unsplash image as a background image to the Section.
    // We'll use the `style` prop on Section to set the background image, ensuring it covers the area and is centered.
    <Section size="4">
      <Flex gap="12" direction="column">
        <Container size="2" style={{ position: 'relative', zIndex: 1 }}>
          {/* Title and subtitle section */}
          <Flex direction="column" gap="6" align="center">
            <Image width="112px" alt="SDK" src="/foundation.png"></Image>

            <Flex direction="column" align="center" gap="4">
              <Badge size="2" color="orange" highContrast>
                Coming Soon
              </Badge>

              <Heading size="9" weight="medium" align="center">
                A UI SDK. More than components.
              </Heading>
            </Flex>

            <Text size="4" color="gray" align="center">
              Built on Radix Themes. Kookie UI is a UI SDK that defines where components live, establishes contract patterns, and provides layout infrastructure that scales. From shell architectures
              to navigation patterns.
            </Text>

            {/* Call-to-action buttons */}
            <Link href="/docs/home">
              <Button variant="solid" size="3">
                Get Started
              </Button>
            </Link>
          </Flex>
        </Container>

        <Container>
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
                  <IconButton variant="soft" size="1" highContrast color="gray">
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
                  <IconButton variant="soft" size="1" highContrast color="gray">
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
                  <IconButton variant="soft" size="1" highContrast color="gray">
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
