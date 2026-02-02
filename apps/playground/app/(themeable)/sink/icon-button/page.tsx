import { Fragment } from 'react';
import { Share2Icon } from '@radix-ui/react-icons';
import { IconButton, Box, Text, Code, Table } from '@radix-ui/themes';
import { iconButtonPropDefs } from '@radix-ui/themes/props';
import { DocsSection, DocsSectionBody, DocsSectionHeading } from '../docs-section';
import { accentColorsGrouped } from '../_utils';

export default function IconButtonPage() {
  return (
    <DocsSection>
      <DocsSectionHeading>IconButton</DocsSectionHeading>
      <DocsSectionBody>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell />
              {iconButtonPropDefs.size.values.map((size) => (
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
            {iconButtonPropDefs.variant.values.map((variant) => (
              <Table.Row key={variant}>
                <Table.RowHeaderCell>{variant}</Table.RowHeaderCell>
                {iconButtonPropDefs.size.values.map((size) => (
                  <Table.Cell key={size}>
                    <IconButton size={size} variant={variant}>
                      <Share2Icon />
                    </IconButton>
                  </Table.Cell>
                ))}
                <Table.Cell>
                  <IconButton variant={variant} highContrast>
                    <Share2Icon />
                  </IconButton>
                </Table.Cell>
                <Table.Cell />
                <Table.Cell>
                  <IconButton variant={variant} color="gray">
                    <Share2Icon />
                  </IconButton>
                </Table.Cell>
                <Table.Cell>
                  <IconButton variant={variant} color="gray" highContrast>
                    <Share2Icon />
                  </IconButton>
                </Table.Cell>
                <Table.Cell />
                <Table.Cell>
                  <IconButton variant={variant} disabled>
                    <Share2Icon />
                  </IconButton>
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
                  {iconButtonPropDefs.size.values.map((size) => (
                    <Table.ColumnHeaderCell key={size}>size {size}</Table.ColumnHeaderCell>
                  ))}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {iconButtonPropDefs.radius.values.map((radius) => (
                  <Table.Row key={radius}>
                    <Table.RowHeaderCell>{radius}</Table.RowHeaderCell>
                    {iconButtonPropDefs.size.values.map((size) => (
                      <Table.Cell key={size}>
                        <IconButton size={size} radius={radius}>
                          <Share2Icon />
                        </IconButton>
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
                    {iconButtonPropDefs.variant.values.map((variant) => (
                      <Table.ColumnHeaderCell key={variant}>{variant}</Table.ColumnHeaderCell>
                    ))}
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {values.map((color) => (
                    <Table.Row key={color}>
                      <Table.RowHeaderCell>{color}</Table.RowHeaderCell>
                      {iconButtonPropDefs.variant.values.map((variant) => (
                        <Table.Cell key={variant}>
                          <IconButton variant={variant} color={color}>
                            <Share2Icon />
                          </IconButton>
                          <IconButton variant={variant} color={color} highContrast ml="2">
                            <Share2Icon />
                          </IconButton>
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
