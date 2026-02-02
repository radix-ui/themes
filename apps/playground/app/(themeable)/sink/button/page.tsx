import { Fragment } from 'react';
import { ArrowRightIcon, Pencil2Icon } from '@radix-ui/react-icons';
import { Button, Box, Text, Table, Code } from '@radix-ui/themes';
import { buttonPropDefs } from '@radix-ui/themes/props';
import { DocsSection, DocsSectionBody, DocsSectionHeading } from '../docs-section';
import { accentColorsGrouped } from '../_utils';

export default function ButtonPage() {
  return (
    <DocsSection>
      <DocsSectionHeading>Button</DocsSectionHeading>
      <DocsSectionBody>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell />
              {buttonPropDefs.size.values.map((size) => (
                <Table.ColumnHeaderCell key={size}>size {size}</Table.ColumnHeaderCell>
              ))}
              <Table.ColumnHeaderCell>+ high-contrast</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell />
              <Table.ColumnHeaderCell>gray</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>+ high-contrast</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell />
              <Table.ColumnHeaderCell>disabled</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {buttonPropDefs.variant.values.map((variant) => (
              <Table.Row key={variant}>
                <Table.RowHeaderCell>{variant}</Table.RowHeaderCell>
                {buttonPropDefs.size.values.map((size) => (
                  <Table.Cell key={size}>
                    <Button size={size} variant={variant}>
                      Next <ArrowRightIcon />
                    </Button>
                  </Table.Cell>
                ))}
                <Table.Cell>
                  <Button variant={variant} highContrast>
                    Next <ArrowRightIcon />
                  </Button>
                </Table.Cell>
                <Table.Cell />
                <Table.Cell>
                  <Button variant={variant} color="gray">
                    Next <ArrowRightIcon />
                  </Button>
                </Table.Cell>
                <Table.Cell>
                  <Button variant={variant} color="gray" highContrast>
                    Next <ArrowRightIcon />
                  </Button>
                </Table.Cell>
                <Table.Cell />
                <Table.Cell>
                  <Button variant={variant} disabled>
                    Next <ArrowRightIcon />
                  </Button>
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
                  {buttonPropDefs.size.values.map((size) => (
                    <Table.ColumnHeaderCell key={size}>size {size}</Table.ColumnHeaderCell>
                  ))}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {buttonPropDefs.radius.values.map((radius) => (
                  <Table.Row key={radius}>
                    <Table.RowHeaderCell>{radius}</Table.RowHeaderCell>
                    {buttonPropDefs.size.values.map((size) => (
                      <Table.Cell key={size}>
                        <Button size={size} radius={radius}>
                          Next <ArrowRightIcon />
                        </Button>
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
                    {buttonPropDefs.variant.values.map((variant) => (
                      <Table.ColumnHeaderCell key={variant}>{variant}</Table.ColumnHeaderCell>
                    ))}
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {values.map((color) => (
                    <Table.Row key={color}>
                      <Table.RowHeaderCell>{color}</Table.RowHeaderCell>
                      {buttonPropDefs.variant.values.map((variant) => (
                        <Table.Cell key={variant}>
                          <Button variant={variant} color={color}>
                            <Pencil2Icon />
                            Edit
                          </Button>
                          <Button variant={variant} color={color} highContrast ml="2">
                            <Pencil2Icon />
                            Edit
                          </Button>
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
