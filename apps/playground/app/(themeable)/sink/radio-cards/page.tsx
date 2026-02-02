import { Fragment } from 'react';
import { RadioCards, Flex, Text, Code, Box, Table } from '@radix-ui/themes';
import { CodeIcon } from '@radix-ui/react-icons';
import { radioCardsRootPropDefs } from '@radix-ui/themes/props';
import { DocsSection, DocsSectionBody, DocsSectionHeading } from '../docs-section';
import { accentColorsGrouped } from '../_utils';

export default function RadioCardsPage() {
  return (
    <DocsSection>
      <DocsSectionHeading>RadioCards</DocsSectionHeading>
      <DocsSectionBody>
        <Table.Root>
          <Table.Body>
            {radioCardsRootPropDefs.variant.values.map((variant, index) => (
              <Table.Row key={variant}>
                <Table.RowHeaderCell>{variant}</Table.RowHeaderCell>
                <Table.Cell>
                  <RadioCards.Root columns="3" defaultValue={String(index)} variant={variant}>
                    <RadioCards.Item value="0">
                      <CodeIcon />
                      <Text truncate>Node.js</Text>
                    </RadioCards.Item>
                    <RadioCards.Item value="1" disabled>
                      Ruby
                    </RadioCards.Item>
                    <RadioCards.Item value="2">Go</RadioCards.Item>
                  </RadioCards.Root>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>

        <Box mb="7" />

        <Table.Root>
          <Table.Body>
            {radioCardsRootPropDefs.size.values.map((size, index) => (
              <Table.Row key={size}>
                <Table.RowHeaderCell>size {size}</Table.RowHeaderCell>
                <Table.Cell>
                  <RadioCards.Root
                    size={size}
                    columns="3"
                    defaultValue={String(index)}
                    style={{ width: 400 + Number(size) * 100 }}
                  >
                    <RadioCards.Item value="0">Node.js</RadioCards.Item>
                    <RadioCards.Item value="1" disabled>
                      Ruby
                    </RadioCards.Item>
                    <RadioCards.Item value="2">Go</RadioCards.Item>
                  </RadioCards.Root>
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
              See colors & variants combinations
            </Text>
          </summary>
          {accentColorsGrouped.map(({ label, values }) => (
            <Fragment key={label}>
              <Text as="p" weight="bold" mt="6" mb="4">
                {label}
              </Text>
              <Table.Root>
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeaderCell />
                    {radioCardsRootPropDefs.variant.values.map((variant) => (
                      <Table.ColumnHeaderCell key={variant}>{variant}</Table.ColumnHeaderCell>
                    ))}
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {values.map((color) => (
                    <Table.Row key={color}>
                      <Table.RowHeaderCell>{color}</Table.RowHeaderCell>
                      {radioCardsRootPropDefs.variant.values.map((variant) => (
                        <Table.Cell key={variant}>
                          <Flex direction="column" gap="2">
                            <RadioCards.Root
                              size="1"
                              gap="2"
                              columns="3"
                              defaultValue="0"
                              variant={variant}
                              color={color}
                              style={{ width: 400 }}
                            >
                              <RadioCards.Item value="0">Node.js</RadioCards.Item>
                              <RadioCards.Item value="1" disabled>
                                Ruby
                              </RadioCards.Item>
                              <RadioCards.Item value="2">Go</RadioCards.Item>
                            </RadioCards.Root>

                            <RadioCards.Root
                              size="1"
                              gap="2"
                              columns="3"
                              defaultValue="1"
                              variant={variant}
                              color={color}
                              highContrast
                              style={{ width: 400 }}
                            >
                              <RadioCards.Item value="0">Node.js</RadioCards.Item>
                              <RadioCards.Item value="1" disabled>
                                Ruby
                              </RadioCards.Item>
                              <RadioCards.Item value="2">Go</RadioCards.Item>
                            </RadioCards.Root>
                          </Flex>
                        </Table.Cell>
                      ))}
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </Fragment>
          ))}
        </details>
      </DocsSectionBody>
    </DocsSection>
  );
}
