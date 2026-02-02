import { Flex, Text } from '@radix-ui/themes';
import { textPropDefs } from '@radix-ui/themes/props';
import { DocsSection, DocsSectionBody, DocsSectionHeading } from '../docs-section';
import { upperFirst } from '../_utils';

export default function TextPage() {
  return (
    <DocsSection>
      <DocsSectionHeading>Text</DocsSectionHeading>
      <DocsSectionBody>
        <Flex direction="column" gap="4">
          {textPropDefs.size.values
            .slice()
            .reverse()
            .map((size) => (
              <Text key={size} size={size}>
                The quick brown fox jumped{Number(size) < 9 && ' over the lazy dog'}
              </Text>
            ))}
        </Flex>

        <Flex direction="column" gap="5" mt="8">
          <Flex gap="5">
            {(['red', 'yellow', 'green', 'gray'] as const).map((color) => (
              <Flex key={color} direction="column" gap="1">
                <Text color={color}>{upperFirst(color)}</Text>
                <Text color={color} highContrast>
                  {upperFirst(color)}
                </Text>
              </Flex>
            ))}
          </Flex>

          <Text as="p" color="red" highContrast>
            This is some red text in high-contrast and this <Text color="blue">word</Text> should be
            blue.
          </Text>

          <Text as="p" color="red">
            This is some red text and this <Text highContrast>word</Text> should be in
            high-contrast.
          </Text>
        </Flex>
      </DocsSectionBody>
    </DocsSection>
  );
}
