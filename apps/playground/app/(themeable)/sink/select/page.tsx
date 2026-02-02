import { Fragment } from 'react';
import { Select, Text, Code, Box, Table } from '@radix-ui/themes';
import {
  selectRootPropDefs,
  selectTriggerPropDefs,
  selectContentPropDefs,
} from '@radix-ui/themes/props';
import { DocsSection, DocsSectionBody, DocsSectionHeading } from '../docs-section';
import { SelectItemsDemo } from '../_components';
import { accentColorsGrouped } from '../_utils';

export default function SelectPage() {
  return (
    <DocsSection>
      <DocsSectionHeading>Select</DocsSectionHeading>
      <DocsSectionBody>
        <Text as="p" my="5">
          Trigger variants:
        </Text>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell />
              {selectRootPropDefs.size.values.map((size) => (
                <Table.ColumnHeaderCell key={size}>size {size}</Table.ColumnHeaderCell>
              ))}
              <Table.ColumnHeaderCell>+ placeholder</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell />
              <Table.ColumnHeaderCell>gray</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>+ placeholder</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell />
              <Table.ColumnHeaderCell>disabled</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {selectTriggerPropDefs.variant.values.map((variant) => (
              <Table.Row key={variant}>
                <Table.RowHeaderCell>{variant}</Table.RowHeaderCell>
                {selectRootPropDefs.size.values.map((size) => (
                  <Table.Cell key={size}>
                    <Select.Root defaultValue="apple" size={size}>
                      <Select.Trigger variant={variant} />
                      <Select.Content>
                        <SelectItemsDemo />
                      </Select.Content>
                    </Select.Root>
                  </Table.Cell>
                ))}
                <Table.Cell>
                  <Select.Root size="2">
                    <Select.Trigger variant={variant} placeholder="Choose a fruit" />
                    <Select.Content>
                      <SelectItemsDemo />
                    </Select.Content>
                  </Select.Root>
                </Table.Cell>
                <Table.Cell />
                <Table.Cell>
                  <Select.Root defaultValue="apple" size="2">
                    <Select.Trigger variant={variant} color="gray" />
                    <Select.Content>
                      <SelectItemsDemo />
                    </Select.Content>
                  </Select.Root>
                </Table.Cell>
                <Table.Cell>
                  <Select.Root size="2">
                    <Select.Trigger variant={variant} color="gray" placeholder="Choose a fruit" />
                    <Select.Content>
                      <SelectItemsDemo />
                    </Select.Content>
                  </Select.Root>
                </Table.Cell>
                <Table.Cell />
                <Table.Cell>
                  <Select.Root defaultValue="apple" size="2" disabled>
                    <Select.Trigger variant={variant} />
                    <Select.Content>
                      <SelectItemsDemo />
                    </Select.Content>
                  </Select.Root>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>

        <Text as="p" my="5">
          Content variants:
        </Text>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell />
              <Table.ColumnHeaderCell>color</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>+ high-contrast</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>gray</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>+ high-contrast</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {selectContentPropDefs.variant.values.map((variant) => (
              <Table.Row key={variant}>
                <Table.RowHeaderCell>{variant}</Table.RowHeaderCell>
                <Table.Cell>
                  <Select.Root defaultValue="apple" size="1">
                    <Select.Trigger />
                    <Select.Content variant={variant} position="popper">
                      <SelectItemsDemo />
                    </Select.Content>
                  </Select.Root>
                </Table.Cell>
                <Table.Cell>
                  <Select.Root defaultValue="apple" size="1">
                    <Select.Trigger />
                    <Select.Content variant={variant} highContrast position="popper">
                      <SelectItemsDemo />
                    </Select.Content>
                  </Select.Root>
                </Table.Cell>
                <Table.Cell>
                  <Select.Root defaultValue="apple" size="1">
                    <Select.Trigger />
                    <Select.Content variant={variant} color="gray" position="popper">
                      <SelectItemsDemo />
                    </Select.Content>
                  </Select.Root>
                </Table.Cell>
                <Table.Cell>
                  <Select.Root defaultValue="apple" size="1">
                    <Select.Trigger />
                    <Select.Content variant={variant} color="gray" highContrast position="popper">
                      <SelectItemsDemo />
                    </Select.Content>
                  </Select.Root>
                </Table.Cell>
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
                  {selectRootPropDefs.size.values.map((size) => (
                    <Table.ColumnHeaderCell key={size}>size {size}</Table.ColumnHeaderCell>
                  ))}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {selectTriggerPropDefs.radius.values.map((radius) => (
                  <Table.Row key={radius}>
                    <Table.RowHeaderCell>{radius}</Table.RowHeaderCell>
                    {selectRootPropDefs.size.values.map((size) => (
                      <Table.Cell key={size}>
                        <Select.Root defaultValue="apple" size={size}>
                          <Select.Trigger radius={radius} />
                          <Select.Content>
                            <SelectItemsDemo />
                          </Select.Content>
                        </Select.Root>
                      </Table.Cell>
                    ))}
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </details>

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
                    {selectTriggerPropDefs.variant.values.map((variant) => (
                      <Table.ColumnHeaderCell key={variant}>{variant}</Table.ColumnHeaderCell>
                    ))}
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {values.map((color) => (
                    <Table.Row key={color}>
                      <Table.RowHeaderCell>{color}</Table.RowHeaderCell>
                      {selectTriggerPropDefs.variant.values.map((variant) => (
                        <Table.Cell key={variant}>
                          <Select.Root defaultValue="apple" size="1">
                            <Select.Trigger variant={variant} color={color} />
                            <Select.Content variant="soft" color={color}>
                              <SelectItemsDemo />
                            </Select.Content>
                          </Select.Root>
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
