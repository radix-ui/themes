import { Kbd, Flex, Table } from '@radix-ui/themes';
import { kbdPropDefs } from '@radix-ui/themes/props';
import { DocsSection, DocsSectionBody, DocsSectionHeading } from '../docs-section';

export default function KbdPage() {
  return (
    <DocsSection>
      <DocsSectionHeading>Kbd</DocsSectionHeading>
      <DocsSectionBody>
        <Flex gap="4">
          <Kbd asChild>
            <button>Enter</button>
          </Kbd>
          <Kbd asChild>
            <button>Tab</button>
          </Kbd>
          <Kbd asChild>
            <button>Shift + Tab</button>
          </Kbd>
        </Flex>

        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell />
              {kbdPropDefs.variant.values.map((variant) => (
                <Table.ColumnHeaderCell key={variant}>{variant}</Table.ColumnHeaderCell>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {kbdPropDefs.size.values
              .slice()
              .reverse()
              .map((size) => (
                <Table.Row key={size}>
                  <Table.RowHeaderCell>size {size}</Table.RowHeaderCell>
                  {kbdPropDefs.variant.values.map((variant) => (
                    <Table.Cell key={variant} style={{ paddingRight: 'var(--space-6)' }}>
                      <Flex gap="2">
                        <Kbd size={size} variant={variant}>
                          /
                        </Kbd>
                        <Kbd size={size} variant={variant}>
                          X
                        </Kbd>
                        <Kbd size={size} variant={variant}>
                          ⇧ ⌘ V
                        </Kbd>
                      </Flex>
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))}
          </Table.Body>
        </Table.Root>
      </DocsSectionBody>
    </DocsSection>
  );
}
