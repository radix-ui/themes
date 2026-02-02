import { Flex, Separator } from '@radix-ui/themes';
import { accentColors } from '@radix-ui/themes/props';
import { DocsSection, DocsSectionBody, DocsSectionHeading } from '../docs-section';

export default function SeparatorPage() {
  return (
    <DocsSection>
      <DocsSectionHeading>Separator</DocsSectionHeading>
      <DocsSectionBody>
        <Flex direction="column" gap="5" my="5">
          {accentColors.map((color) => (
            <Separator key={color} size="4" color={color} />
          ))}
        </Flex>
        <Flex direction="row" gap="5" my="5" height="300px" justify="between">
          {accentColors.map((color) => (
            <Separator key={color} orientation="vertical" size="4" color={color} />
          ))}
        </Flex>
      </DocsSectionBody>
    </DocsSection>
  );
}
