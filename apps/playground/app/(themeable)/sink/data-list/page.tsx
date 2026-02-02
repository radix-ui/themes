import { Box, Button, Code, DataList, Flex, Link, Table, Tabs, Text } from '@radix-ui/themes';
import { dataListLabelPropDefs, dataListRootPropDefs } from '@radix-ui/themes/props';
import { DocsSection, DocsSectionBody, DocsSectionHeading } from '../docs-section';
import { upperFirst } from '../_utils';

export default function DataListPage() {
  return (
    <DocsSection>
      <DocsSectionHeading>DataList</DocsSectionHeading>
      <DocsSectionBody>
        <Flex gap="4" align="center">
          <Tabs.Root defaultValue="specimen">
            <Tabs.List size="2">
              <Tabs.Trigger value="specimen">Specimen</Tabs.Trigger>
              <Tabs.Trigger value="all-orientations">All orientations</Tabs.Trigger>
              <Tabs.Trigger value="all-sizes">All sizes</Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="specimen">
              <Box my="6" style={{ maxWidth: '688px' }}>
                <DataList.Root>
                  <DataList.Item>
                    <DataList.Label width="200px">Name</DataList.Label>
                    <DataList.Value>Susan Kare</DataList.Value>
                  </DataList.Item>
                  <DataList.Item>
                    <DataList.Label>Email</DataList.Label>
                    <DataList.Value>susan.kare@apple.com</DataList.Value>
                  </DataList.Item>
                  <DataList.Item>
                    <DataList.Label>Status</DataList.Label>
                    <DataList.Value>
                      <Button color="green" size="1">
                        Active
                      </Button>
                    </DataList.Value>
                  </DataList.Item>
                  <DataList.Item>
                    <DataList.Label>Bio</DataList.Label>
                    <DataList.Value>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac nisl et
                      libero ultricies viverra quis vitae quam. Proin a feugiat metus.
                    </DataList.Value>
                  </DataList.Item>
                  <DataList.Item>
                    <DataList.Label>Organization</DataList.Label>
                    <DataList.Value>
                      <Link href="https://workos.com">WorkOS</Link>
                    </DataList.Value>
                  </DataList.Item>
                </DataList.Root>
              </Box>
            </Tabs.Content>

            <Tabs.Content value="all-orientations">
              <Box my="6">
                <Table.Root>
                  <Table.Body>
                    {dataListRootPropDefs.orientation.values.map((orientation) => (
                      <Table.Row key={orientation}>
                        <Table.RowHeaderCell>{upperFirst(orientation)}</Table.RowHeaderCell>
                        <Table.Cell style={{ textAlign: 'left' }}>
                          <DataList.Root orientation={orientation} my="3">
                            <DataList.Item>
                              <DataList.Label>Name</DataList.Label>
                              <DataList.Value>Susan Kare</DataList.Value>
                            </DataList.Item>
                            <DataList.Item>
                              <DataList.Label>Email</DataList.Label>
                              <DataList.Value>susan.kare@apple.com</DataList.Value>
                            </DataList.Item>
                          </DataList.Root>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table.Root>
              </Box>
            </Tabs.Content>

            <Tabs.Content value="all-sizes">
              <Box my="6">
                <Table.Root>
                  <Table.Body>
                    {dataListRootPropDefs.size.values.map((size) => (
                      <Table.Row key={size}>
                        <Table.RowHeaderCell>{`Size ${size}`}</Table.RowHeaderCell>
                        <Table.Cell style={{ textAlign: 'left' }}>
                          <DataList.Root size={size} my="3">
                            <DataList.Item>
                              <DataList.Label>Name</DataList.Label>
                              <DataList.Value>Susan Kare</DataList.Value>
                            </DataList.Item>
                            <DataList.Item>
                              <DataList.Label>Email</DataList.Label>
                              <DataList.Value>susan.kare@apple.com</DataList.Value>
                            </DataList.Item>
                          </DataList.Root>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table.Root>
              </Box>
            </Tabs.Content>
          </Tabs.Root>
        </Flex>

        <Text as="p" my="5">
          <Code>color</Code> can be set per <Code>DataListLabel</Code> instance:
        </Text>

        <details>
          <summary>
            <Text size="2" color="gray">
              See color combinations
            </Text>
          </summary>
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell />
                <Table.ColumnHeaderCell>Color</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>High Contrast</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {dataListLabelPropDefs.color.values.map((color) => (
                <Table.Row key={color}>
                  <Table.RowHeaderCell style={{ whiteSpace: 'nowrap' }}>
                    {color}
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <DataList.Root my="3">
                      <DataList.Item>
                        <DataList.Label color={color}>Name</DataList.Label>
                        <DataList.Value>Susan Kare</DataList.Value>
                      </DataList.Item>
                      <DataList.Item>
                        <DataList.Label color={color}>Email</DataList.Label>
                        <DataList.Value>susan.kare@apple.com</DataList.Value>
                      </DataList.Item>
                    </DataList.Root>
                  </Table.Cell>
                  <Table.Cell>
                    <DataList.Root my="3" ml="6">
                      <DataList.Item>
                        <DataList.Label highContrast color={color}>
                          Name
                        </DataList.Label>
                        <DataList.Value>Susan Kare</DataList.Value>
                      </DataList.Item>
                      <DataList.Item>
                        <DataList.Label highContrast color={color}>
                          Email
                        </DataList.Label>
                        <DataList.Value>susan.kare@apple.com</DataList.Value>
                      </DataList.Item>
                    </DataList.Root>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </details>

        <Text as="p" my="5">
          <Code>width</Code> can be set per <Code>DataListLabel</Code> instance:
        </Text>

        <details>
          <summary>
            <Text size="2" color="gray">
              See width examples
            </Text>
          </summary>
          <Table.Root>
            <Table.Body>
              {['64px', '80px', '128px'].map((width) => {
                return (
                  <Table.Row key={width}>
                    <Table.RowHeaderCell>{`${width}`}</Table.RowHeaderCell>
                    <Table.Cell>
                      <DataList.Root my="3">
                        <DataList.Item>
                          <DataList.Label width={width}>Name</DataList.Label>
                          <DataList.Value>Susan Kare</DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                          <DataList.Label width={width}>Email</DataList.Label>
                          <DataList.Value>susan.kare@apple.com</DataList.Value>
                        </DataList.Item>
                      </DataList.Root>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Root>
        </details>
      </DocsSectionBody>
    </DocsSection>
  );
}
