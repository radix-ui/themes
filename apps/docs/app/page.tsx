'use client';

import { Button, Flex, Text, Heading, Container, Section, Link as KUILink, Image, Avatar } from '@kushagradhawan/kookie-ui';
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
                  <Text size="2" color="gray">
                    Kookie UI
                  </Text>
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
                  Enter the Kingdom
                  <HugeiconsIcon icon={ArrowUpRight01Icon} strokeWidth={1.5} />
                </Link>
              </Button>
            </Flex>
          </Container>
        </Flex>
      </Section>

      {/* Image Section */}
      <Section size="2">
        <Container size="4">
          <Image
            src="https://xlsxjlbxvnhdubuzkjoz.supabase.co/storage/v1/object/public/generated-images/img_ab26cc85-8970-4552-b3cd-c051914cc681_context.jpg"
            alt="Hero"
            width="100%"
            height="360px"
            radius="none"
          />
        </Container>
      </Section>
    </>
  );
}
