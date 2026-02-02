import { Box, Flex, Heading } from '@radix-ui/themes';

export function DocsSectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <Heading size="6" as="h2">
      {children}
    </Heading>
  );
}

export function DocsSection({ children }: { children: React.ReactNode }) {
  return (
    <Flex asChild direction="column" gap="4">
      <section>{children}</section>
    </Flex>
  );
}

export function DocsSectionBody({ children }: { children: React.ReactNode }) {
  return <Box>{children}</Box>;
}
