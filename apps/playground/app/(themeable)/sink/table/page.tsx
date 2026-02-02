import { Flex, Grid, Text } from '@radix-ui/themes';
import { tableRootPropDefs } from '@radix-ui/themes/props';
import { DocsSection, DocsSectionBody, DocsSectionHeading } from '../docs-section';
import { TableExample } from '../_components';

export default function TablePage() {
  return (
    <DocsSection>
      <DocsSectionHeading>Table</DocsSectionHeading>
      <DocsSectionBody>
        <Grid columns="2" gap="5" mb="3">
          <Flex direction="column" gap="3">
            <Text color="gray" size="2">
              surface
            </Text>
            <TableExample variant="surface" />
          </Flex>

          <Flex direction="column" gap="3">
            <Text color="gray" size="2">
              ghost
            </Text>
            <TableExample />
          </Flex>
        </Grid>

        <Grid columns="3" gap="5" mt="5">
          {tableRootPropDefs.size.values.map((size) => (
            <div key={size}>
              <Text as="p" color="gray" size="2" mb="3">
                size {size}
              </Text>
              <TableExample size={size} variant="surface" noEmail />
            </div>
          ))}
        </Grid>
      </DocsSectionBody>
    </DocsSection>
  );
}
