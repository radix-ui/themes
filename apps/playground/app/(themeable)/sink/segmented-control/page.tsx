import { SegmentedControl, Code, Flex, Text, Box, Separator, Table } from '@radix-ui/themes';
import { segmentedControlRootPropDefs } from '@radix-ui/themes/props';
import { DocsSection, DocsSectionBody, DocsSectionHeading } from '../docs-section';

export default function SegmentedControlPage() {
  return (
    <DocsSection>
      <DocsSectionHeading>Segmented Control</DocsSectionHeading>
      <DocsSectionBody>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell />
              <Table.ColumnHeaderCell>disabled</Table.ColumnHeaderCell>
              {segmentedControlRootPropDefs.size.values.map((size) => (
                <Table.ColumnHeaderCell key={size}>size {size}</Table.ColumnHeaderCell>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {segmentedControlRootPropDefs.variant.values.map((variant) => (
              <Table.Row key={variant}>
                <Table.RowHeaderCell>{variant}</Table.RowHeaderCell>
                <Table.Cell>
                  <SegmentedControl.Root
                    size="1"
                    variant={variant}
                    defaultValue="1"
                    disabled={true}
                  >
                    <SegmentedControl.Item value="1">One</SegmentedControl.Item>
                    <SegmentedControl.Item value="2">Two</SegmentedControl.Item>
                    <SegmentedControl.Item value="3">Three</SegmentedControl.Item>
                  </SegmentedControl.Root>
                </Table.Cell>
                {segmentedControlRootPropDefs.size.values.map((size) => (
                  <Table.Cell key={size}>
                    <SegmentedControl.Root size={size} variant={variant} defaultValue="1">
                      <SegmentedControl.Item value="1">One</SegmentedControl.Item>
                      <SegmentedControl.Item value="2">Two</SegmentedControl.Item>
                      <SegmentedControl.Item value="3">Three</SegmentedControl.Item>
                    </SegmentedControl.Root>
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>

        <Text as="p" my="5">
          <Code>radius</Code> can be set per instance:
        </Text>

        <details>
          <summary>
            <Text size="2" color="gray">
              See specific radius examples
            </Text>
          </summary>
          <Box mt="3">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell />
                  {segmentedControlRootPropDefs.size.values.map((size) => (
                    <Table.ColumnHeaderCell key={size}>size {size}</Table.ColumnHeaderCell>
                  ))}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {segmentedControlRootPropDefs.radius.values.map((radius) => (
                  <Table.Row key={radius}>
                    <Table.RowHeaderCell>{radius}</Table.RowHeaderCell>
                    {segmentedControlRootPropDefs.size.values.map((size) => (
                      <Table.Cell key={size}>
                        <SegmentedControl.Root size={size} radius={radius} defaultValue="1">
                          <SegmentedControl.Item value="1">One</SegmentedControl.Item>
                          <SegmentedControl.Item value="2">Two</SegmentedControl.Item>
                          <SegmentedControl.Item value="3">Three</SegmentedControl.Item>
                        </SegmentedControl.Root>
                      </Table.Cell>
                    ))}
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </details>

        <Separator size="4" my="9" />

        <Flex direction="column" gap="4" my="7">
          <Flex gap="4" align="center">
            <SegmentedControl.Root>
              <SegmentedControl.Item value="1">One</SegmentedControl.Item>
            </SegmentedControl.Root>

            <SegmentedControl.Root>
              <SegmentedControl.Item value="1">One</SegmentedControl.Item>
              <SegmentedControl.Item value="2">Two</SegmentedControl.Item>
            </SegmentedControl.Root>

            <SegmentedControl.Root>
              <SegmentedControl.Item value="1">One</SegmentedControl.Item>
              <SegmentedControl.Item value="2">Two</SegmentedControl.Item>
              <SegmentedControl.Item value="3">Three</SegmentedControl.Item>
            </SegmentedControl.Root>

            <SegmentedControl.Root>
              <SegmentedControl.Item value="1">One</SegmentedControl.Item>
              <SegmentedControl.Item value="2">Two</SegmentedControl.Item>
              <SegmentedControl.Item value="3">Three</SegmentedControl.Item>
              <SegmentedControl.Item value="4">Four</SegmentedControl.Item>
            </SegmentedControl.Root>

            <SegmentedControl.Root>
              <SegmentedControl.Item value="1">One</SegmentedControl.Item>
              <SegmentedControl.Item value="2">Two</SegmentedControl.Item>
              <SegmentedControl.Item value="3">Three</SegmentedControl.Item>
              <SegmentedControl.Item value="4">Four</SegmentedControl.Item>
              <SegmentedControl.Item value="5">Five</SegmentedControl.Item>
            </SegmentedControl.Root>
          </Flex>

          <Flex gap="4" align="center">
            <SegmentedControl.Root defaultValue="1">
              <SegmentedControl.Item value="1">One</SegmentedControl.Item>
            </SegmentedControl.Root>

            <SegmentedControl.Root defaultValue="1">
              <SegmentedControl.Item value="1">One</SegmentedControl.Item>
              <SegmentedControl.Item value="2">Two</SegmentedControl.Item>
            </SegmentedControl.Root>

            <SegmentedControl.Root defaultValue="1">
              <SegmentedControl.Item value="1">One</SegmentedControl.Item>
              <SegmentedControl.Item value="2">Two</SegmentedControl.Item>
              <SegmentedControl.Item value="3">Three</SegmentedControl.Item>
            </SegmentedControl.Root>

            <SegmentedControl.Root defaultValue="1">
              <SegmentedControl.Item value="1">One</SegmentedControl.Item>
              <SegmentedControl.Item value="2">Two</SegmentedControl.Item>
              <SegmentedControl.Item value="3">Three</SegmentedControl.Item>
              <SegmentedControl.Item value="4">Four</SegmentedControl.Item>
            </SegmentedControl.Root>

            <SegmentedControl.Root defaultValue="1">
              <SegmentedControl.Item value="1">One</SegmentedControl.Item>
              <SegmentedControl.Item value="2">Two</SegmentedControl.Item>
              <SegmentedControl.Item value="3">Three</SegmentedControl.Item>
              <SegmentedControl.Item value="4">Four</SegmentedControl.Item>
              <SegmentedControl.Item value="5">Five</SegmentedControl.Item>
            </SegmentedControl.Root>
          </Flex>

          <Flex gap="4" align="center">
            <SegmentedControl.Root variant="classic" defaultValue="1">
              <SegmentedControl.Item value="1">One</SegmentedControl.Item>
            </SegmentedControl.Root>

            <SegmentedControl.Root variant="classic" defaultValue="1">
              <SegmentedControl.Item value="1">One</SegmentedControl.Item>
              <SegmentedControl.Item value="2">Two</SegmentedControl.Item>
            </SegmentedControl.Root>

            <SegmentedControl.Root variant="classic" defaultValue="1">
              <SegmentedControl.Item value="1">One</SegmentedControl.Item>
              <SegmentedControl.Item value="2">Two</SegmentedControl.Item>
              <SegmentedControl.Item value="3">Three</SegmentedControl.Item>
            </SegmentedControl.Root>

            <SegmentedControl.Root variant="classic" defaultValue="1">
              <SegmentedControl.Item value="1">One</SegmentedControl.Item>
              <SegmentedControl.Item value="2">Two</SegmentedControl.Item>
              <SegmentedControl.Item value="3">Three</SegmentedControl.Item>
              <SegmentedControl.Item value="4">Four</SegmentedControl.Item>
            </SegmentedControl.Root>

            <SegmentedControl.Root variant="classic" defaultValue="1">
              <SegmentedControl.Item value="1">One</SegmentedControl.Item>
              <SegmentedControl.Item value="2">Two</SegmentedControl.Item>
              <SegmentedControl.Item value="3">Three</SegmentedControl.Item>
              <SegmentedControl.Item value="4">Four</SegmentedControl.Item>
              <SegmentedControl.Item value="5">Five</SegmentedControl.Item>
            </SegmentedControl.Root>
          </Flex>
        </Flex>
      </DocsSectionBody>
    </DocsSection>
  );
}
