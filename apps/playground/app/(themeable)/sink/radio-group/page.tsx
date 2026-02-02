import { Fragment } from 'react';
import { RadioGroup, Grid, Flex, Text, Code, Box, Separator, Table } from '@radix-ui/themes';
import { radioGroupRootPropDefs } from '@radix-ui/themes/props';
import { DocsSection, DocsSectionBody, DocsSectionHeading } from '../docs-section';
import { accentColorsGrouped } from '../_utils';

export default function RadioGroupPage() {
  return (
    <DocsSection>
      <DocsSectionHeading>RadioGroup</DocsSectionHeading>
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
                {radioGroupRootPropDefs.variant.values.map((variant) => (
                  <Fragment key={variant}>
                    {[variant, '+ high-contrast'].map((label) => (
                      <Table.Row key={label}>
                        <Table.RowHeaderCell>{label}</Table.RowHeaderCell>
                        <Table.Cell>
                          <RadioGroup.Root
                            variant={variant}
                            highContrast={label === '+ high-contrast'}
                          >
                            <RadioGroup.Item value="value" />
                          </RadioGroup.Root>
                        </Table.Cell>
                        <Table.Cell>
                          <RadioGroup.Root
                            variant={variant}
                            defaultValue="value"
                            highContrast={label === '+ high-contrast'}
                          >
                            <RadioGroup.Item value="value" />
                          </RadioGroup.Root>
                        </Table.Cell>
                        <Table.Cell>
                          <RadioGroup.Root
                            variant={variant}
                            highContrast={label === '+ high-contrast'}
                          >
                            <RadioGroup.Item value="value" disabled />
                          </RadioGroup.Root>
                        </Table.Cell>
                        <Table.Cell>
                          <RadioGroup.Root
                            variant={variant}
                            highContrast={label === '+ high-contrast'}
                            disabled
                            defaultValue="value"
                          >
                            <RadioGroup.Item value="value" />
                          </RadioGroup.Root>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Fragment>
                ))}
              </Table.Body>
            </Table.Root>

            <Table.Root>
              <Table.Body>
                {radioGroupRootPropDefs.size.values.map((size) => (
                  <Table.Row key={size}>
                    <Table.RowHeaderCell>size {size}</Table.RowHeaderCell>
                    <Table.Cell style={{ width: '100%' }}>
                      <RadioGroup.Root size={size} defaultValue="red">
                        <RadioGroup.Item value="red">Red</RadioGroup.Item>
                        <RadioGroup.Item value="green">Green</RadioGroup.Item>
                        <RadioGroup.Item value="blue">Blue</RadioGroup.Item>
                        <RadioGroup.Item value="violet">Violet</RadioGroup.Item>
                      </RadioGroup.Root>
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

              <RadioGroup.Root defaultValue="1" size="1">
                <Flex direction="column" gap="1">
                  <Text as="label" size="1">
                    <Flex gap="2">
                      <RadioGroup.Item value="1" />
                      <Text>Agree to Terms and Conditions</Text>
                    </Flex>
                  </Text>
                  <Text as="label" size="1">
                    <Flex gap="2">
                      <RadioGroup.Item value="2" />
                      <Text>Disagree with Terms and Conditions</Text>
                    </Flex>
                  </Text>
                </Flex>
              </RadioGroup.Root>

              <Separator size="4" />

              <RadioGroup.Root defaultValue="1" size="1">
                <Flex direction="column" gap="1">
                  <Text as="label" size="2">
                    <Flex gap="2">
                      <RadioGroup.Item value="1" />
                      <Text>Agree to Terms and Conditions</Text>
                    </Flex>
                  </Text>
                  <Text as="label" size="2">
                    <Flex gap="2">
                      <RadioGroup.Item value="2" />
                      <Text>Disagree with Terms and Conditions</Text>
                    </Flex>
                  </Text>
                </Flex>
              </RadioGroup.Root>

              <Separator size="4" />

              <RadioGroup.Root defaultValue="1" size="2">
                <Flex direction="column" gap="1">
                  <Text as="label" size="2">
                    <Flex gap="2">
                      <RadioGroup.Item value="1" />
                      <Text>Agree to Terms and Conditions</Text>
                    </Flex>
                  </Text>
                  <Text as="label" size="2">
                    <Flex gap="2">
                      <RadioGroup.Item value="2" />
                      <Text>Disagree with Terms and Conditions</Text>
                    </Flex>
                  </Text>
                </Flex>
              </RadioGroup.Root>

              <Separator size="4" />

              <RadioGroup.Root defaultValue="1" size="2">
                <Flex direction="column" gap="1">
                  <Text as="label" size="3">
                    <Flex gap="2">
                      <RadioGroup.Item value="1" />
                      <Text>Agree to Terms and Conditions</Text>
                    </Flex>
                  </Text>
                  <Text as="label" size="3">
                    <Flex gap="2">
                      <RadioGroup.Item value="2" />
                      <Text>Disagree with Terms and Conditions</Text>
                    </Flex>
                  </Text>
                </Flex>
              </RadioGroup.Root>

              <Separator size="4" />

              <RadioGroup.Root defaultValue="1" size="3">
                <Flex direction="column" gap="1">
                  <Text as="label" size="3">
                    <Flex gap="2">
                      <RadioGroup.Item value="1" />
                      <Text>Agree to Terms and Conditions</Text>
                    </Flex>
                  </Text>
                  <Text as="label" size="3">
                    <Flex gap="2">
                      <RadioGroup.Item value="2" />
                      <Text>Disagree with Terms and Conditions</Text>
                    </Flex>
                  </Text>
                </Flex>
              </RadioGroup.Root>

              <Separator size="4" />

              <RadioGroup.Root defaultValue="1" size="3">
                <Flex direction="column" gap="1">
                  <Text as="label" size="4">
                    <Flex gap="2">
                      <RadioGroup.Item value="1" />
                      <Text>Agree to Terms and Conditions</Text>
                    </Flex>
                  </Text>
                  <Text as="label" size="4">
                    <Flex gap="2">
                      <RadioGroup.Item value="2" />
                      <Text>Disagree with Terms and Conditions</Text>
                    </Flex>
                  </Text>
                </Flex>
              </RadioGroup.Root>

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
                    {radioGroupRootPropDefs.variant.values.map((variant) => (
                      <Table.ColumnHeaderCell key={variant}>{variant}</Table.ColumnHeaderCell>
                    ))}
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {values.map((color) => (
                    <Table.Row key={color}>
                      <Table.RowHeaderCell>{color}</Table.RowHeaderCell>
                      {radioGroupRootPropDefs.variant.values.map((variant) => (
                        <Table.Cell key={variant}>
                          <Flex gap="2">
                            <RadioGroup.Root variant={variant} color={color} defaultValue="value">
                              <RadioGroup.Item value="value" />
                            </RadioGroup.Root>
                            <RadioGroup.Root
                              variant={variant}
                              color={color}
                              defaultValue="value"
                              highContrast
                            >
                              <RadioGroup.Item value="value" />
                            </RadioGroup.Root>
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
