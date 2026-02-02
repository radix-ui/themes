import { Container, Box, Text, Code } from '@radix-ui/themes';
import { DocsSection, DocsSectionBody, DocsSectionHeading } from '../docs-section';

export default function ContainerPage() {
  return (
    <DocsSection>
      <DocsSectionHeading>Container</DocsSectionHeading>
      <DocsSectionBody>
        <Text as="p" my="5">
          <Code>size</Code> can be set on nested <Code>Container</Code> instances:
        </Text>

        <Container size="4">
          <Box
            style={{
              backgroundColor: 'var(--color-panel-solid)',
              borderRadius: 'var(--radius-2)',
              boxShadow: 'inset 0 0 0 1px var(--gray-a4)',
            }}
            p="2"
          >
            <Text>This should be size 4</Text>
          </Box>
          <Container size="1">
            <Box
              style={{
                backgroundColor: 'var(--color-panel-solid)',
                borderRadius: 'var(--radius-2)',
                boxShadow: 'inset 0 0 0 1px var(--gray-a4)',
              }}
              p="2"
            >
              <Text>This should be size 1</Text>
            </Box>
          </Container>
        </Container>
      </DocsSectionBody>
    </DocsSection>
  );
}
