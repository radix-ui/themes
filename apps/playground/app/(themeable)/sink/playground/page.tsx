import { Card, Flex, Text } from '@radix-ui/themes';
import { textFieldRootPropDefs } from '@radix-ui/themes/props';
import { DocsSection, DocsSectionBody, DocsSectionHeading } from '../docs-section';
import { PlaygroundForm } from '../_components';

export default function PlaygroundPage() {
  return (
    <DocsSection>
      <DocsSectionHeading>Playground</DocsSectionHeading>
      <DocsSectionBody>
        <Text as="p" mb="5">
          In this section, I am just throwing together some of the components to get a sense of how
          harmonious they are.
        </Text>
        <Flex gap="9">
          {textFieldRootPropDefs.size.values.map((size) => (
            <PlaygroundForm key={size} size={size} style={{ width: (Number(size) + 1) * 100 }} />
          ))}
        </Flex>

        <Card size="4" style={{ width: 400 }} mt="3">
          <PlaygroundForm size="2" />
        </Card>
      </DocsSectionBody>
    </DocsSection>
  );
}
