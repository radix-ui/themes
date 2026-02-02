import { Flex, Box, Text } from '@radix-ui/themes';
import { DocsSection, DocsSectionBody, DocsSectionHeading } from '../docs-section';

export default function ShadowTokens() {
  return (
    <DocsSection>
      <DocsSectionHeading>Shadow tokens</DocsSectionHeading>
      <DocsSectionBody>
        <Flex direction="column" gap="3" mt="6" mb="5">
          <Flex
            style={{
              flex: 1,
              background: 'var(--gray-1)',
              boxShadow: 'inset 0 0 0 1px var(--gray-a4)',
              borderRadius: 'var(--radius-3)',
            }}
            p="9"
            gap="5"
          >
            {[...new Array(6)].map((_, i) => (
              <Flex flexGrow="1" align="center" justify="center" key={i}>
                <Box
                  flexGrow="1"
                  style={{
                    backgroundColor: 'var(--color-panel-solid)',
                    boxShadow: `var(--shadow-${i + 1})`,
                    borderRadius: 'var(--radius-2)',
                    height: 80,
                  }}
                  key={i}
                />
              </Flex>
            ))}
          </Flex>

          <Flex align="center" gap="1" px="9">
            {[...new Array(6)].map((_, i) => (
              <Flex align="center" justify="center" height="100%" width="100%" key={i}>
                <Text size="1" color="gray">
                  {i + 1}
                </Text>
              </Flex>
            ))}
          </Flex>
        </Flex>
      </DocsSectionBody>
    </DocsSection>
  );
}
