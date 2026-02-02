import { Fragment } from 'react';
import { InfoCircledIcon, Cross1Icon } from '@radix-ui/react-icons';
import { Callout, Flex, IconButton, Link, Separator, Text, Code, Table } from '@radix-ui/themes';
import { calloutRootPropDefs } from '@radix-ui/themes/props';
import { DocsSection, DocsSectionBody, DocsSectionHeading } from '../docs-section';
import { accentColorsGrouped } from '../_utils';

export default function CalloutPage() {
  return (
    <DocsSection>
      <DocsSectionHeading>Callout</DocsSectionHeading>
      <DocsSectionBody>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell />
              <Table.ColumnHeaderCell>default</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>+ high-contrast</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {calloutRootPropDefs.variant.values.map((variant) => (
              <Table.Row key={variant}>
                <Table.RowHeaderCell>{variant}</Table.RowHeaderCell>
                <Table.Cell style={{ width: 450 }}>
                  <Callout.Root variant={variant}>
                    <Callout.Icon>
                      <InfoCircledIcon />
                    </Callout.Icon>
                    <Callout.Text>
                      We have detected multiple issues in your application configuration file.
                      Please read our <Link href="/">Configuration Guide</Link> for more details.
                    </Callout.Text>
                  </Callout.Root>
                </Table.Cell>
                <Table.Cell style={{ width: 450 }}>
                  <Callout.Root variant={variant} highContrast>
                    <Callout.Icon>
                      <InfoCircledIcon />
                    </Callout.Icon>
                    <Callout.Text>
                      We have detected multiple issues in your application configuration file.
                      Please read our <Link href="/">Configuration Guide</Link> for more details.
                    </Callout.Text>
                  </Callout.Root>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>

        <Table.Root>
          <Table.Body>
            {calloutRootPropDefs.size.values.map((size) => (
              <Table.Row key={size}>
                <Table.RowHeaderCell>size {size}</Table.RowHeaderCell>
                <Table.Cell style={{ width: 450 }}>
                  <Callout.Root size={size}>
                    <Callout.Icon>
                      <InfoCircledIcon
                        width={size === '3' ? 20 : 15}
                        height={size === '3' ? 20 : 15}
                      />
                    </Callout.Icon>
                    <Callout.Text>
                      We have detected multiple issues in your application configuration file.
                      Please read our <Link href="/">Configuration Guide</Link> for more details.
                    </Callout.Text>
                  </Callout.Root>
                </Table.Cell>
                <Table.Cell style={{ width: 450 }}>
                  <Callout.Root size={size}>
                    <Callout.Icon>
                      <InfoCircledIcon
                        width={size === '3' ? 20 : 15}
                        height={size === '3' ? 20 : 15}
                      />
                    </Callout.Icon>
                    <Callout.Text>There was an error in your configuration.</Callout.Text>
                  </Callout.Root>
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
                    {calloutRootPropDefs.variant.values.map((variant) => (
                      <Table.ColumnHeaderCell key={variant}>{variant}</Table.ColumnHeaderCell>
                    ))}
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {values.map((color) => (
                    <Table.Row key={color}>
                      <Table.RowHeaderCell>{color}</Table.RowHeaderCell>
                      {calloutRootPropDefs.variant.values.map((variant) => (
                        <Table.Cell key={variant}>
                          <Flex direction="column" align="start" gap="2">
                            <Callout.Root variant={variant} color={color}>
                              <Callout.Icon>
                                <InfoCircledIcon />
                              </Callout.Icon>
                              <Flex gap="3">
                                <Callout.Text>
                                  We have detected multiple issues in your application configuration
                                  file. Please read our <Link href="/">Configuration Guide</Link>{' '}
                                  for more details.
                                </Callout.Text>
                                <IconButton size="1" variant="soft">
                                  <Cross1Icon />
                                </IconButton>
                              </Flex>
                            </Callout.Root>
                            <Callout.Root variant={variant} color={color} highContrast>
                              <Callout.Icon>
                                <InfoCircledIcon />
                              </Callout.Icon>
                              <Callout.Text>
                                We have detected multiple issues in your application configuration
                                file. Please read our <Link href="/">Configuration Guide</Link> for
                                more details.
                              </Callout.Text>
                            </Callout.Root>
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

        <details>
          <summary>
            <Text size="2" color="gray">
              See layout & size combinations
            </Text>
          </summary>

          <Flex direction="column" my="5" gap="5" style={{ maxWidth: 500 }}>
            {calloutRootPropDefs.size.values.map((size) => (
              <Fragment key={size}>
                <Callout.Root size={size}>
                  <Callout.Text trim="both">
                    We have detected multiple issues in your application configuration file. Please
                    read our <Link href="/">Configuration Guide</Link> for more details.
                  </Callout.Text>
                </Callout.Root>

                <Callout.Root size={size}>
                  <Callout.Text trim="start">
                    There was an error in your configuration.
                  </Callout.Text>
                  <Callout.Text trim="end">
                    We have detected multiple issues in your application configuration file. Please
                    read our <Link href="/">Configuration Guide</Link> for more details.
                  </Callout.Text>
                </Callout.Root>

                <Callout.Root size={size}>
                  <Callout.Icon>
                    <InfoCircledIcon
                      width={size === '3' ? 20 : 15}
                      height={size === '3' ? 20 : 15}
                    />
                  </Callout.Icon>
                  <Callout.Text>
                    We have detected multiple issues in your application configuration file. Please
                    read our <Link href="/">Configuration Guide</Link> for more details.
                  </Callout.Text>
                </Callout.Root>

                <Callout.Root size={size}>
                  <Callout.Icon>
                    <InfoCircledIcon
                      width={size === '3' ? 20 : 15}
                      height={size === '3' ? 20 : 15}
                    />
                  </Callout.Icon>
                  <Callout.Text>There was an error in your configuration.</Callout.Text>
                  <Callout.Text>
                    We have detected multiple issues in your application configuration file. Please
                    read our <Link href="/">Configuration Guide</Link> for more details.
                  </Callout.Text>
                </Callout.Root>

                <Separator />
              </Fragment>
            ))}
          </Flex>
        </details>
      </DocsSectionBody>
    </DocsSection>
  );
}
