import { Fragment } from 'react';
import { Code, Text, Grid, Flex, Strong, Em, Kbd, Quote, Link, Table } from '@radix-ui/themes';
import { codePropDefs } from '@radix-ui/themes/props';
import { DocsSection, DocsSectionBody, DocsSectionHeading } from '../docs-section';
import { accentColorsGrouped } from '../_utils';

export default function CodePage() {
  return (
    <DocsSection>
      <DocsSectionHeading>Code</DocsSectionHeading>
      <DocsSectionBody>
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
            {codePropDefs.variant.values.map((variant) => (
              <Table.Row key={variant}>
                <Table.RowHeaderCell>{variant}</Table.RowHeaderCell>
                <Table.Cell>
                  <Code variant={variant}>console.log()</Code>
                </Table.Cell>
                <Table.Cell>
                  <Code variant={variant} highContrast>
                    console.log()
                  </Code>
                </Table.Cell>
                <Table.Cell>
                  <Code variant={variant} color="gray">
                    console.log()
                  </Code>
                </Table.Cell>
                <Table.Cell>
                  <Code variant={variant} color="gray" highContrast>
                    console.log()
                  </Code>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>

        <Grid columns="400px 400px" gap="5" my="7">
          {codePropDefs.variant.values.map((variant) => (
            <Text as="p" size="3" key={variant}>
              The CSS rule <Code variant={variant}>antialiased</Code> has been applied to all
              fonts.google.com pages where fonts are rendered. This results in browsers using the{' '}
              <Strong>greyscale antialiasing method</Strong> rather than default{' '}
              <Em>subpixel rendering</Em> of fonts. Press <Kbd>⌘ Q</Kbd> to quit.{' '}
              <Quote>
                I believe this was probably introduced to get around inconsistencies in rendering
                between browsers
              </Quote>
              , particular between Chrome and Safari on MacOS.
            </Text>
          ))}
        </Grid>

        <Grid columns="400px 400px" gap="5" my="7">
          {codePropDefs.variant.values.map((variant) => (
            <Text as="p" size="3" key={variant}>
              The{' '}
              <Link href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/code">
                <Code variant={variant}>
                  {'<'}code{'>'}
                </Code>
              </Link>{' '}
              HTML element displays its contents styled in a fashion intended to indicate that the
              text is a short fragment of computer code.
            </Text>
          ))}
        </Grid>

        <Flex direction="column" gap="4" mt="7">
          {codePropDefs.size.values
            .slice()
            .reverse()
            .map((size) => (
              <Code key={size} size={size} variant="ghost">
                The quick brown fox jumped{Number(size) < 9 && ' over the lazy dog'}
              </Code>
            ))}
        </Flex>

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
                    {codePropDefs.variant.values.map((variant) => (
                      <Table.ColumnHeaderCell key={variant}>{variant}</Table.ColumnHeaderCell>
                    ))}
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {values.map((color) => (
                    <Table.Row key={color}>
                      <Table.RowHeaderCell>{color}</Table.RowHeaderCell>
                      {codePropDefs.variant.values.map((variant) => (
                        <Table.Cell key={variant}>
                          <Code variant={variant} color={color}>
                            console.log()
                          </Code>
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
