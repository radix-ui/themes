import { Fragment } from 'react';
import { Switch, Grid, Text, Flex, Separator, Code, Box, Table } from '@radix-ui/themes';
import { switchPropDefs } from '@radix-ui/themes/props';
import { DocsSection, DocsSectionBody, DocsSectionHeading } from '../docs-section';
import { accentColorsGrouped } from '../_utils';

export default function SwitchPage() {
  return (
    <DocsSection>
      <DocsSectionHeading>Switch</DocsSectionHeading>
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
                {switchPropDefs.variant.values.map((variant) => (
                  <Fragment key={variant}>
                    {[variant, '+ high-contrast'].map((label) => (
                      <Table.Row key={label}>
                        <Table.RowHeaderCell>{label}</Table.RowHeaderCell>
                        <Table.Cell>
                          <Switch variant={variant} highContrast={label === '+ high-contrast'} />
                        </Table.Cell>
                        <Table.Cell>
                          <Switch
                            variant={variant}
                            highContrast={label === '+ high-contrast'}
                            defaultChecked
                          />
                        </Table.Cell>
                        <Table.Cell>
                          <Switch
                            variant={variant}
                            highContrast={label === '+ high-contrast'}
                            disabled
                          />
                        </Table.Cell>
                        <Table.Cell>
                          <Switch
                            variant={variant}
                            highContrast={label === '+ high-contrast'}
                            disabled
                            defaultChecked
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
                {switchPropDefs.size.values.map((size) => (
                  <Table.Row key={size}>
                    <Table.RowHeaderCell>size {size}</Table.RowHeaderCell>
                    <Table.Cell>
                      <Switch size={size} defaultChecked={size === '2'} />
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

              <Text size="1" asChild>
                <label>
                  <Flex gap="2">
                    <Switch size="1" />
                    <Text>Agree to Terms and Conditions</Text>
                  </Flex>
                </label>
              </Text>

              <Separator size="4" />

              <Text size="2" asChild>
                <label>
                  <Flex gap="2">
                    <Switch size="1" />
                    <Text>Agree to Terms and Conditions</Text>
                  </Flex>
                </label>
              </Text>

              <Separator size="4" />

              <Text size="2" asChild>
                <label>
                  <Flex gap="2">
                    <Switch size="2" />
                    <Text>Agree to Terms and Conditions</Text>
                  </Flex>
                </label>
              </Text>

              <Separator size="4" />

              <Text size="3" asChild>
                <label>
                  <Flex gap="2">
                    <Switch size="2" />
                    <Text>Agree to Terms and Conditions</Text>
                  </Flex>
                </label>
              </Text>

              <Separator size="4" />

              <Text size="3" asChild>
                <label>
                  <Flex gap="2">
                    <Switch size="3" />
                    <Text>Agree to Terms and Conditions</Text>
                  </Flex>
                </label>
              </Text>

              <Separator size="4" />

              <Text size="4" asChild>
                <label>
                  <Flex gap="2">
                    <Switch size="3" />
                    <Text>Agree to Terms and Conditions</Text>
                  </Flex>
                </label>
              </Text>

              <Separator size="4" />
            </Flex>
          </div>
        </Grid>

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
                  {switchPropDefs.size.values.map((size) => (
                    <Table.ColumnHeaderCell key={size}>size {size}</Table.ColumnHeaderCell>
                  ))}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {switchPropDefs.radius.values.map((radius) => (
                  <Table.Row key={radius}>
                    <Table.RowHeaderCell>{radius}</Table.RowHeaderCell>
                    {switchPropDefs.size.values.map((size) => (
                      <Table.Cell key={size}>
                        <Switch size={size} radius={radius} />
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
              See colors
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
                    {switchPropDefs.variant.values.map((variant) => (
                      <Table.ColumnHeaderCell key={variant}>{variant}</Table.ColumnHeaderCell>
                    ))}
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {values.map((color) => (
                    <Table.Row key={color}>
                      <Table.RowHeaderCell>{color}</Table.RowHeaderCell>
                      {switchPropDefs.variant.values.map((variant) => (
                        <Table.Cell key={variant}>
                          <Switch variant={variant} color={color} />
                          <Switch variant={variant} color={color} defaultChecked ml="2" />
                          <Switch
                            variant={variant}
                            color={color}
                            highContrast
                            defaultChecked
                            ml="2"
                          />
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
