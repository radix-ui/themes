import { Fragment } from 'react';
import { Radio, Grid, Flex, Text, Code, Box, Separator, Table } from '@radix-ui/themes';
import { radioPropDefs } from '@radix-ui/themes/props';
import { DocsSection, DocsSectionBody, DocsSectionHeading } from '../docs-section';
import { accentColorsGrouped } from '../_utils';

export default function RadioPage() {
  return (
    <DocsSection>
      <DocsSectionHeading>Radio</DocsSectionHeading>
      <DocsSectionBody>
        <Grid columns="2" gap="9">
          <div>
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell />
                  <Table.ColumnHeaderCell>not checked</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>checked</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>disabled</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>disabled checked</Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {radioPropDefs.variant.values.map((variant) => (
                  <Fragment key={variant}>
                    {[variant, '+ high-contrast'].map((label) => (
                      <Table.Row key={label}>
                        <Table.RowHeaderCell>{label}</Table.RowHeaderCell>
                        <Table.Cell>
                          <Radio
                            variant={variant}
                            highContrast={label === '+ high-contrast'}
                            value="value"
                          />
                        </Table.Cell>
                        <Table.Cell>
                          <Radio
                            checked
                            variant={variant}
                            highContrast={label === '+ high-contrast'}
                            value="value"
                          />
                        </Table.Cell>
                        <Table.Cell>
                          <Radio
                            variant={variant}
                            highContrast={label === '+ high-contrast'}
                            value="value"
                            disabled
                          />
                        </Table.Cell>
                        <Table.Cell>
                          <Radio
                            checked
                            variant={variant}
                            highContrast={label === '+ high-contrast'}
                            disabled
                            value="value"
                          />
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Fragment>
                ))}
              </Table.Body>
            </Table.Root>

            <Table.Root>
              <Table.Body>
                {radioPropDefs.size.values.map((size) => (
                  <Table.Row key={size}>
                    <Table.RowHeaderCell>size {size}</Table.RowHeaderCell>
                    <Table.Cell>
                      <Flex gap="2">
                        <Radio name={`radio-size-${size}`} size={size} value="value" />
                        <Radio
                          name={`radio-size-${size}`}
                          size={size}
                          value="value"
                          defaultChecked
                        />
                      </Flex>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </div>

          <div>
            <Box py="4">
              <Text as="p" size="2">
                Alignment
              </Text>
            </Box>

            <Flex direction="column" gap="5" style={{ maxWidth: 320 }}>
              <Separator size="4" />

              <Flex direction="column" gap="1">
                <Text as="label" size="1">
                  <Flex gap="2">
                    <Radio name="radio-alignment-1" size="1" value="1" defaultChecked />
                    <Text>Agree to Terms and Conditions</Text>
                  </Flex>
                </Text>
                <Text as="label" size="1">
                  <Flex gap="2">
                    <Radio name="radio-alignment-1" size="1" value="2" />
                    <Text>Disagree with Terms and Conditions</Text>
                  </Flex>
                </Text>
              </Flex>

              <Separator size="4" />

              <Flex direction="column" gap="1">
                <Text as="label" size="2">
                  <Flex gap="2">
                    <Radio name="radio-alignment-2" size="1" value="1" defaultChecked />
                    <Text>Agree to Terms and Conditions</Text>
                  </Flex>
                </Text>
                <Text as="label" size="2">
                  <Flex gap="2">
                    <Radio name="radio-alignment-2" size="1" value="2" />
                    <Text>Disagree with Terms and Conditions</Text>
                  </Flex>
                </Text>
              </Flex>

              <Separator size="4" />

              <Flex direction="column" gap="1">
                <Text as="label" size="2">
                  <Flex gap="2">
                    <Radio name="radio-alignment-3" size="2" value="1" defaultChecked />
                    <Text>Agree to Terms and Conditions</Text>
                  </Flex>
                </Text>
                <Text as="label" size="2">
                  <Flex gap="2">
                    <Radio name="radio-alignment-3" size="2" value="2" />
                    <Text>Disagree with Terms and Conditions</Text>
                  </Flex>
                </Text>
              </Flex>

              <Separator size="4" />

              <Flex direction="column" gap="1">
                <Text as="label" size="3">
                  <Flex gap="2">
                    <Radio name="radio-alignment-4" size="2" value="1" defaultChecked />
                    <Text>Agree to Terms and Conditions</Text>
                  </Flex>
                </Text>
                <Text as="label" size="3">
                  <Flex gap="2">
                    <Radio name="radio-alignment-4" size="2" value="2" />
                    <Text>Disagree with Terms and Conditions</Text>
                  </Flex>
                </Text>
              </Flex>

              <Separator size="4" />

              <Flex direction="column" gap="1">
                <Text as="label" size="3">
                  <Flex gap="2">
                    <Radio name="radio-alignment-5" size="3" value="1" defaultChecked />
                    <Text>Agree to Terms and Conditions</Text>
                  </Flex>
                </Text>
                <Text as="label" size="3">
                  <Flex gap="2">
                    <Radio name="radio-alignment-5" size="3" value="2" />
                    <Text>Disagree with Terms and Conditions</Text>
                  </Flex>
                </Text>
              </Flex>

              <Separator size="4" />

              <Flex direction="column" gap="1">
                <Text as="label" size="4">
                  <Flex gap="2">
                    <Radio name="radio-alignment-6" size="3" value="1" defaultChecked />
                    <Text>Agree to Terms and Conditions</Text>
                  </Flex>
                </Text>
                <Text as="label" size="4">
                  <Flex gap="2">
                    <Radio name="radio-alignment-6" size="3" value="2" />
                    <Text>Disagree with Terms and Conditions</Text>
                  </Flex>
                </Text>
              </Flex>

              <Separator size="4" />
            </Flex>
          </div>
        </Grid>

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
                    {radioPropDefs.variant.values.map((variant) => (
                      <Table.ColumnHeaderCell key={variant}>{variant}</Table.ColumnHeaderCell>
                    ))}
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {values.map((color) => (
                    <Table.Row key={color}>
                      <Table.RowHeaderCell>{color}</Table.RowHeaderCell>
                      {radioPropDefs.variant.values.map((variant) => (
                        <Table.Cell key={variant}>
                          <Flex gap="2">
                            <Radio
                              color={color}
                              variant={variant}
                              name={`radio-${variant}-${color}`}
                              value="1"
                            />
                            <Radio
                              color={color}
                              variant={variant}
                              name={`radio-${variant}-${color}`}
                              value="2"
                              defaultChecked
                            />
                            <Radio
                              color={color}
                              variant={variant}
                              name={`radio-${variant}-${color}-high-contrast`}
                              highContrast
                              value="1"
                            />
                            <Radio
                              color={color}
                              variant={variant}
                              name={`radio-${variant}-${color}-high-contrast`}
                              highContrast
                              value="2"
                              defaultChecked
                            />
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

        <Separator size="3" my="5" />
      </DocsSectionBody>
    </DocsSection>
  );
}
