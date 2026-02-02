import { Fragment } from 'react';
import { Text, Code, Grid, Flex, Table } from '@radix-ui/themes';
import { tabsListPropDefs } from '@radix-ui/themes/props';
import { DocsSection, DocsSectionBody, DocsSectionHeading } from '../docs-section';
import { TabNavDemo } from '../tab-nav-demo';

export default function TabNavPage() {
  return (
    <DocsSection>
      <DocsSectionHeading>Tab Nav</DocsSectionHeading>
      <DocsSectionBody>
        <Table.Root>
          <Table.Body>
            {tabsListPropDefs.size.values.map((size) => (
              <Table.Row key={size}>
                <Table.RowHeaderCell>size {size}</Table.RowHeaderCell>
                <Table.Cell>
                  <TabNavDemo size={size} />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
        <Text as="p" my="5">
          <Code>color</Code> can be set per instance:
        </Text>
        <details>
          <summary>
            <Text size="2" color="gray">
              See color combinations
            </Text>
          </summary>
          <Grid gap="5" columns="3" align="center">
            {tabsListPropDefs.color.values.map((color) => (
              <Fragment key={color}>
                <Text>{color}</Text>
                <Flex>
                  <TabNavDemo size="1" color={color} />
                </Flex>
                <Flex>
                  <TabNavDemo size="1" color={color} highContrast />
                </Flex>
              </Fragment>
            ))}
          </Grid>
        </details>
      </DocsSectionBody>
    </DocsSection>
  );
}
