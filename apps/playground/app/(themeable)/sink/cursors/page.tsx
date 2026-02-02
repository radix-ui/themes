import { Button, Card, DropdownMenu, Flex, Link, Text } from '@radix-ui/themes';
import { DocsSection, DocsSectionBody, DocsSectionHeading } from '../docs-section';
import { PointerCursorsCheckbox } from '../pointer-cursors-checkbox';
import { DropdownMenuContentDemo } from '../_components';

export default function CursorsPage() {
  return (
    <DocsSection>
      <DocsSectionHeading>Cursors</DocsSectionHeading>
      <DocsSectionBody>
        <Flex align="center" gap="5" wrap="wrap" my="5">
          <Card asChild>
            <button>
              <Text as="p" size="2" weight="bold" trim="start">
                Button
              </Text>
              <Text as="p" color="gray" size="2" trim="end">
                That looks like card
              </Text>
            </button>
          </Card>

          <Card asChild>
            <a href="#Cursors">
              <Text as="p" size="2" weight="bold" trim="start">
                Link
              </Text>
              <Text as="p" color="gray" size="2" trim="end">
                That looks like card
              </Text>
            </a>
          </Card>

          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button>
                Dropdown Menu <DropdownMenu.TriggerIcon />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenuContentDemo />
          </DropdownMenu.Root>

          <Button>Button</Button>

          <Button asChild>
            <a href="#Cursors">Link</a>
          </Button>

          <Link href="#Cursors">Link</Link>

          <Link asChild>
            <button>Button</button>
          </Link>
        </Flex>

        <PointerCursorsCheckbox />
      </DocsSectionBody>
    </DocsSection>
  );
}
