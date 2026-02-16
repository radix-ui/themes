import { Button, Flex, Tooltip } from '@radix-ui/themes';
import { DocsSection, DocsSectionBody, DocsSectionHeading } from '../docs-section';

export default function TooltipPage() {
  return (
    <DocsSection>
      <DocsSectionHeading>Tooltip</DocsSectionHeading>
      <DocsSectionBody>
        <Flex gap="5">
          <Tooltip content="The quick brown fox">
            <Button variant="solid" size="1">
              Singleline
            </Button>
          </Tooltip>

          <Tooltip content="The goal of typography is to relate font size, line height, and line width in a proportional way that maximizes beauty and makes reading easier and more pleasant.">
            <Button variant="solid" size="1">
              Multiline
            </Button>
          </Tooltip>

          <Tooltip content="This tooltip is disabled" disabled>
            <Button variant="solid" size="1">
              Disabled
            </Button>
          </Tooltip>
        </Flex>
      </DocsSectionBody>
    </DocsSection>
  );
}
