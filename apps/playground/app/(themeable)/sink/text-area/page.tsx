import { Fragment } from 'react';
import { TextArea, Box, Flex, Text, Code, Table } from '@radix-ui/themes';
import { textAreaPropDefs } from '@radix-ui/themes/props';
import { DocsSection, DocsSectionBody, DocsSectionHeading } from '../docs-section';
import { accentColorsGrouped } from '../_utils';

export default function TextAreaPage() {
  return (
    <DocsSection>
      <DocsSectionHeading>TextArea</DocsSectionHeading>
      <DocsSectionBody>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell />
              {textAreaPropDefs.size.values.map((size) => (
                <Table.ColumnHeaderCell key={size}>size {size}</Table.ColumnHeaderCell>
              ))}
              <Table.ColumnHeaderCell>disabled</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>read-only</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {textAreaPropDefs.variant.values.map((variant) => (
              <Fragment key={variant}>
                {[variant, '+ gray'].map((label) => (
                  <Table.Row key={label}>
                    <Table.RowHeaderCell>{label}</Table.RowHeaderCell>
                    {textAreaPropDefs.size.values.map((size) => (
                      <Table.Cell key={size}>
                        <Flex direction="column" gap="2">
                          <TextArea
                            size={size}
                            variant={variant}
                            color={label === '+ gray' ? 'gray' : undefined}
                            placeholder="Your feedback"
                          />

                          <TextArea
                            size={size}
                            variant={variant}
                            color={label === '+ gray' ? 'gray' : undefined}
                            placeholder="Your feedback"
                            defaultValue="The quick brown fox jumped over the lazy dog"
                          />
                        </Flex>
                      </Table.Cell>
                    ))}
                    <Table.Cell>
                      <Flex direction="column" gap="2">
                        <TextArea
                          variant={variant}
                          color={label === '+ gray' ? 'gray' : undefined}
                          placeholder="Your feedback"
                          disabled
                        />

                        <TextArea
                          variant={variant}
                          color={label === '+ gray' ? 'gray' : undefined}
                          placeholder="Your feedback"
                          disabled
                          defaultValue="The quick brown fox jumped over the lazy dog"
                        />
                      </Flex>
                    </Table.Cell>
                    <Table.Cell>
                      <Flex direction="column" gap="2">
                        <TextArea
                          variant={variant}
                          color={label === '+ gray' ? 'gray' : undefined}
                          placeholder="Your feedback"
                          readOnly
                        />

                        <TextArea
                          variant={variant}
                          color={label === '+ gray' ? 'gray' : undefined}
                          placeholder="Your feedback"
                          readOnly
                          defaultValue="The quick brown fox jumped over the lazy dog"
                        />
                      </Flex>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Fragment>
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
                  {textAreaPropDefs.size.values.map((size) => (
                    <Table.ColumnHeaderCell key={size}>size {size}</Table.ColumnHeaderCell>
                  ))}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {textAreaPropDefs.radius.values.map((radius) => (
                  <Table.Row key={radius}>
                    <Table.RowHeaderCell>{radius}</Table.RowHeaderCell>
                    {textAreaPropDefs.size.values.map((size) => (
                      <Table.Cell key={size}>
                        <TextArea size={size} radius={radius} placeholder="Your feedback" />
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
                    {textAreaPropDefs.variant.values.map((variant) => (
                      <Table.ColumnHeaderCell key={variant}>{variant}</Table.ColumnHeaderCell>
                    ))}
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {values.map((color) => (
                    <Table.Row key={color}>
                      <Table.RowHeaderCell>{color}</Table.RowHeaderCell>
                      {textAreaPropDefs.variant.values.map((variant) => (
                        <Table.Cell key={variant}>
                          <TextArea variant={variant} color={color} placeholder="Your feedback" />
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
