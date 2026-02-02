import { Button, Popover, Text } from '@radix-ui/themes';
import { DocsSection, DocsSectionBody, DocsSectionHeading } from '../docs-section';
import { Share2Icon } from '@radix-ui/react-icons';

export default function PopoverPage() {
  return (
    <DocsSection>
      <DocsSectionHeading>Popover</DocsSectionHeading>
      <DocsSectionBody>
        <Popover.Root>
          <Popover.Trigger>
            <Button variant="solid">Popover</Button>
          </Popover.Trigger>
          <Popover.Content width="200px">
            <Text as="p" size="2" mb="2">
              Jan Tschichold was a German calligrapher, typographer and book designer.
              He played a significant role in the development of graphic design in the
              20th century.
            </Text>
            <Button variant="solid" size="1">
              Share <Share2Icon />
            </Button>
          </Popover.Content>
        </Popover.Root>
      </DocsSectionBody>
    </DocsSection>
  );
}
