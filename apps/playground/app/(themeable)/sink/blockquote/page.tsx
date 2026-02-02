import { Blockquote, Flex, Text } from '@radix-ui/themes';
import { DocsSection, DocsSectionBody, DocsSectionHeading } from '../docs-section';

export default function BlockquotePage() {
  return (
    <DocsSection>
      <DocsSectionHeading>Blockquote</DocsSectionHeading>
      <DocsSectionBody>
        <Flex direction="column" align="start" gap="5">
          <Blockquote size="6" style={{ maxWidth: '50ch' }}>
            The goal of typography is to relate font size, line height, and line width in a
            proportional way that maximizes beauty and makes reading easier and more pleasant. The
            question is: What proportion(s) will give us the best results?
          </Blockquote>

          <Blockquote size="4" style={{ maxWidth: '50ch' }} color="gray" highContrast>
            The goal of typography is to relate font size, line height, and line width in a
            proportional way that maximizes <Text color="pink">beauty</Text> and makes reading
            easier and more pleasant. The question is: What proportion(s) will give us the best
            results?
          </Blockquote>

          <Blockquote size="2" style={{ maxWidth: '50ch' }} color="blue">
            The goal of typography is to relate font size, line height, and line width in a
            proportional way that maximizes <Text highContrast>beauty</Text> and makes reading
            easier and more pleasant. The question is: What proportion(s) will give us the best
            results?
          </Blockquote>
        </Flex>
      </DocsSectionBody>
    </DocsSection>
  );
}
