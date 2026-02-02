'use client';
import { Fragment } from 'react';
import { DropdownMenu, Button, IconButton, Text, Code, Table } from '@radix-ui/themes';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { dropdownMenuContentPropDefs } from '@radix-ui/themes/props';
import { DocsSection, DocsSectionBody, DocsSectionHeading } from '../docs-section';
import { DropdownMenuContentDemo } from '../_components';
import { accentColorsGrouped } from '../_utils';

export default function DropdownMenuPage() {
  return (
    <DocsSection>
      <DocsSectionHeading>DropdownMenu</DocsSectionHeading>
      <DocsSectionBody>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell />
              {dropdownMenuContentPropDefs.size.values.map((size) => (
                <Table.ColumnHeaderCell key={size}>size {size}</Table.ColumnHeaderCell>
              ))}
              <Table.ColumnHeaderCell>+ high-contrast</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>gray</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>+ high-contrast</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {dropdownMenuContentPropDefs.variant.values.map((variant) => (
              <Table.Row key={variant}>
                <Table.RowHeaderCell>{variant}</Table.RowHeaderCell>
                {dropdownMenuContentPropDefs.size.values.map((size) => (
                  <Table.Cell key={size}>
                    <DropdownMenu.Root>
                      <DropdownMenu.Trigger>
                        <Button size={size} variant="soft" color="gray">
                          More <DropdownMenu.TriggerIcon />
                        </Button>
                      </DropdownMenu.Trigger>
                      <DropdownMenuContentDemo size={size} variant={variant} />
                    </DropdownMenu.Root>
                  </Table.Cell>
                ))}
                <Table.Cell>
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                      <Button variant="soft" color="gray">
                        More <DropdownMenu.TriggerIcon />
                      </Button>
                    </DropdownMenu.Trigger>
                    <DropdownMenuContentDemo variant={variant} highContrast />
                  </DropdownMenu.Root>
                </Table.Cell>
                <Table.Cell>
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                      <Button variant="soft" color="gray">
                        More <DropdownMenu.TriggerIcon />
                      </Button>
                    </DropdownMenu.Trigger>
                    <DropdownMenuContentDemo variant={variant} color="gray" />
                  </DropdownMenu.Root>
                </Table.Cell>
                <Table.Cell>
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                      <Button variant="soft" color="gray">
                        More <DropdownMenu.TriggerIcon />
                      </Button>
                    </DropdownMenu.Trigger>
                    <DropdownMenuContentDemo variant={variant} color="gray" highContrast />
                  </DropdownMenu.Root>
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
                    {dropdownMenuContentPropDefs.variant.values.map((variant) => (
                      <Table.ColumnHeaderCell key={variant}>{variant}</Table.ColumnHeaderCell>
                    ))}
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {values.map((color) => (
                    <Table.Row key={color}>
                      <Table.RowHeaderCell>{color}</Table.RowHeaderCell>
                      {dropdownMenuContentPropDefs.variant.values.map((variant) => (
                        <Table.Cell key={variant}>
                          <DropdownMenu.Root>
                            <DropdownMenu.Trigger>
                              <IconButton variant="soft" color="gray">
                                <DotsHorizontalIcon />
                              </IconButton>
                            </DropdownMenu.Trigger>
                            <DropdownMenuContentDemo variant={variant} color={color} />
                          </DropdownMenu.Root>
                          <DropdownMenu.Root>
                            <DropdownMenu.Trigger>
                              <IconButton variant="soft" color="gray" ml="2">
                                <DotsHorizontalIcon />
                              </IconButton>
                            </DropdownMenu.Trigger>
                            <DropdownMenuContentDemo variant={variant} color={color} highContrast />
                          </DropdownMenu.Root>
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
