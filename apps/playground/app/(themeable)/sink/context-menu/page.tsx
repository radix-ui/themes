import { ContextMenu, Table } from '@radix-ui/themes';
import { contextMenuContentPropDefs } from '@radix-ui/themes/props';
import { DocsSection, DocsSectionBody, DocsSectionHeading } from '../docs-section';
import { ContextMenuContentDemo, RightClickArea } from '../_components';

export default function ContextMenuPage() {
  return (
    <DocsSection>
      <DocsSectionHeading>ContextMenu</DocsSectionHeading>
      <DocsSectionBody>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              {contextMenuContentPropDefs.size.values.map((size) => (
                <Table.ColumnHeaderCell key={size}>size {size}</Table.ColumnHeaderCell>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {contextMenuContentPropDefs.variant.values.map((variant) => (
              <Table.Row key={variant}>
                {contextMenuContentPropDefs.size.values.map((size) => (
                  <Table.Cell key={size}>
                    <ContextMenu.Root>
                      <ContextMenu.Trigger>
                        <RightClickArea size={size} />
                      </ContextMenu.Trigger>
                      <ContextMenuContentDemo size={size} variant={variant} />
                    </ContextMenu.Root>
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
