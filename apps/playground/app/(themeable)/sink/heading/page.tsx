import { Flex, Heading, Text } from '@radix-ui/themes';
import { headingPropDefs } from '@radix-ui/themes/props';
import { DocsSection, DocsSectionBody, DocsSectionHeading } from '../docs-section';
import { upperFirst } from '../_utils';

export default function HeadingPage() {
  return (
    <DocsSection>
      <DocsSectionHeading>Heading</DocsSectionHeading>
      <DocsSectionBody>
        <Flex direction="column" gap="4">
          {headingPropDefs.size.values
            .slice()
            .reverse()
            .map((size) => (
              <Heading key={size} size={size}>
                The quick brown fox jumped{Number(size) < 9 && ' over the lazy dog'}
              </Heading>
            ))}

          <Flex direction="column" gap="6" mt="5">
            <Heading size="9" style={{ width: '50%' }}>
              Principles of the Typographic Craft
            </Heading>
            <Heading size="8" style={{ width: '40%' }}>
              Principles of the Typographic Craft
            </Heading>
            <Heading size="7" style={{ width: '30%' }}>
              Principles of the Typographic Craft
            </Heading>
            <Heading size="6" style={{ width: '25%' }}>
              Principles of the Typographic Craft
            </Heading>
            <Heading size="5" style={{ width: '20%' }}>
              Principles of the Typographic Craft
            </Heading>
            <Heading size="4" style={{ width: '15%' }}>
              Principles of the Typographic Craft
            </Heading>
            <Heading size="3" style={{ width: '15%' }}>
              Principles of the Typographic Craft
            </Heading>
            <Heading size="2" style={{ width: '15%' }}>
              Principles of the Typographic Craft
            </Heading>
            <Heading size="1" style={{ width: '10%' }}>
              Principles of the Typographic Craft
            </Heading>
          </Flex>
        </Flex>

        <Flex direction="column" gap="5" mt="8">
          <Flex gap="5">
            {(['red', 'yellow', 'green', 'gray'] as const).map((color) => (
              <Flex key={color} direction="column" gap="1">
                <Heading color={color}>{upperFirst(color)}</Heading>
                <Heading color={color} highContrast>
                  {upperFirst(color)}
                </Heading>
              </Flex>
            ))}
          </Flex>

          <Heading color="red" highContrast>
            This is some red text in high-contrast and this <Text color="blue">word</Text> should be
            blue.
          </Heading>

          <Heading color="red">
            This is some red text and this <Text highContrast>word</Text> should be in
            high-contrast.
          </Heading>
        </Flex>
      </DocsSectionBody>
    </DocsSection>
  );
}
