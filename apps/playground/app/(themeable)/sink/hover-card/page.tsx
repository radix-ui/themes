import { HoverCard, Link, Text } from '@radix-ui/themes';
import { DocsSection, DocsSectionBody, DocsSectionHeading } from '../docs-section';

export default function HoverCardPage() {
  return (
    <DocsSection>
      <DocsSectionHeading>HoverCard</DocsSectionHeading>
      <DocsSectionBody>
        <HoverCard.Root>
          <HoverCard.Trigger>
            <Link>A fancy link</Link>
          </HoverCard.Trigger>
          <HoverCard.Content width="200px">
            <Text as="p" size="2">
              Jan Tschichold was a German calligrapher, typographer and book designer.
              He played a significant role in the development of graphic design in the
              20th century.
            </Text>
          </HoverCard.Content>
        </HoverCard.Root>
      </DocsSectionBody>
    </DocsSection>
  );
}
