import { Fragment } from 'react';
import { Slider, Grid, Text, Flex, Code, Box, Table } from '@radix-ui/themes';
import { sliderPropDefs } from '@radix-ui/themes/props';
import { DocsSection, DocsSectionBody, DocsSectionHeading } from '../docs-section';
import { accentColorsGrouped } from '../_utils';

export default function SliderPage() {
  return (
    <DocsSection>
      <DocsSectionHeading>Slider</DocsSectionHeading>
      <DocsSectionBody>
        <Grid columns="2" gap="9">
          <div style={{ gridColumn: '1 / span 2' }}>
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell />
                  <Table.ColumnHeaderCell>color</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>+ high-contrast</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>gray</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>+ high-contrast</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>disabled</Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {sliderPropDefs.variant.values.map((variant, index) => (
                  <Table.Row key={variant}>
                    <Table.RowHeaderCell>{variant}</Table.RowHeaderCell>
                    <Table.Cell style={{ minWidth: 150 }}>
                      <Slider variant={variant} defaultValue={[33 + index * 10]} />
                    </Table.Cell>
                    <Table.Cell style={{ minWidth: 150 }}>
                      <Slider variant={variant} highContrast defaultValue={[33 + index * 10]} />
                    </Table.Cell>
                    <Table.Cell style={{ minWidth: 150 }}>
                      <Slider variant={variant} color="gray" defaultValue={[33 + index * 10]} />
                    </Table.Cell>
                    <Table.Cell style={{ minWidth: 150 }}>
                      <Slider
                        variant={variant}
                        color="gray"
                        highContrast
                        defaultValue={[33 + index * 10]}
                      />
                    </Table.Cell>
                    <Table.Cell style={{ minWidth: 150 }}>
                      <Slider variant={variant} defaultValue={[33 + index * 10]} disabled />
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </div>

          <div>
            <Table.Root>
              <Table.Body>
                {sliderPropDefs.size.values.map((size, index) => (
                  <Table.Row key={size}>
                    <Table.RowHeaderCell>size {size}</Table.RowHeaderCell>
                    <Table.Cell style={{ minWidth: 316 }}>
                      <Slider size={size} defaultValue={[33 + index * 10]} />
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </div>

          <div>
            <Flex gap="5" style={{ height: 160 }}>
              {sliderPropDefs.size.values.map((size, i, sizes) => {
                return (
                  <Fragment key={size}>
                    {[...sliderPropDefs.variant.values, ...sliderPropDefs.variant.values]
                      .sort()
                      .map((variant, j, variants) => {
                        const stepCount = variants.length * sizes.length - 1;
                        const step = i * variants.length + j;
                        const value = 25 + Math.round(Math.sin(Math.PI * (step / stepCount)) * 50);
                        return (
                          <Slider
                            key={step}
                            orientation="vertical"
                            defaultValue={[value]}
                            size={size}
                            variant={variant}
                            highContrast={step % 2 === 1 ? true : false}
                          />
                        );
                      })}
                  </Fragment>
                );
              })}
            </Flex>
          </div>

          <Box mb="6">
            <Slider defaultValue={[25, 75]} />
          </Box>
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
                  {sliderPropDefs.size.values.map((size) => (
                    <Table.ColumnHeaderCell key={size}>size {size}</Table.ColumnHeaderCell>
                  ))}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {sliderPropDefs.radius.values.map((radius) => (
                  <Table.Row key={radius}>
                    <Table.RowHeaderCell>{radius}</Table.RowHeaderCell>
                    {sliderPropDefs.size.values.map((size) => (
                      <Table.Cell key={size} style={{ minWidth: 150 }}>
                        <Slider size={size} radius={radius} defaultValue={[50]} />
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
                    {sliderPropDefs.variant.values.map((variant) => (
                      <Table.ColumnHeaderCell key={variant}>{variant}</Table.ColumnHeaderCell>
                    ))}
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {values.map((color) => (
                    <Table.Row key={color}>
                      <Table.RowHeaderCell>{color}</Table.RowHeaderCell>
                      {sliderPropDefs.variant.values.map((variant) => (
                        <Table.Cell key={variant} style={{ minWidth: 150 }}>
                          <Slider variant={variant} color={color} defaultValue={[50]} mt="3" />
                          <Slider
                            variant={variant}
                            color={color}
                            highContrast
                            defaultValue={[50]}
                            mt="5"
                            mb="3"
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
