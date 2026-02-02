import { Fragment } from 'react';
import { InfoCircledIcon, Share2Icon, StarIcon } from '@radix-ui/react-icons';
import {
  TextField,
  IconButton,
  Button,
  Box,
  Flex,
  Text,
  Code,
  Separator,
  Table,
} from '@radix-ui/themes';
import { textFieldRootPropDefs } from '@radix-ui/themes/props';
import { DocsSection, DocsSectionBody, DocsSectionHeading } from '../docs-section';
import { accentColorsGrouped } from '../_utils';

export default function TextFieldPage() {
  return (
    <DocsSection>
      <DocsSectionHeading>TextField</DocsSectionHeading>
      <DocsSectionBody>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell />
              {textFieldRootPropDefs.size.values.map((size) => (
                <Table.ColumnHeaderCell key={size}>size {size}</Table.ColumnHeaderCell>
              ))}
              <Table.ColumnHeaderCell>disabled</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>read-only</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {textFieldRootPropDefs.variant.values.map((variant) => (
              <Fragment key={variant}>
                {[variant, '+ gray'].map((label) => (
                  <Table.Row key={label}>
                    <Table.RowHeaderCell>{label}</Table.RowHeaderCell>
                    {textFieldRootPropDefs.size.values.map((size) => (
                      <Table.Cell key={size}>
                        <Flex direction="column" gap="2">
                          <TextField.Root
                            size={size}
                            variant={variant}
                            color={label === '+ gray' ? 'gray' : undefined}
                            placeholder="Your name"
                          />

                          <TextField.Root
                            size={size}
                            variant={variant}
                            color={label === '+ gray' ? 'gray' : undefined}
                            placeholder="Your name"
                          >
                            <TextField.Slot>
                              <InfoCircledIcon />
                            </TextField.Slot>
                            <TextField.Slot>
                              <IconButton
                                size={size === '3' ? '2' : '1'}
                                variant="ghost"
                                color="gray"
                              >
                                <Share2Icon />
                              </IconButton>
                              <IconButton
                                size={size === '3' ? '2' : '1'}
                                variant="ghost"
                                color="gray"
                              >
                                <StarIcon />
                              </IconButton>
                            </TextField.Slot>
                          </TextField.Root>

                          <TextField.Root
                            size={size}
                            variant={variant}
                            color={label === '+ gray' ? 'gray' : undefined}
                            placeholder="Your name"
                            defaultValue="The quick brown fox jumped over the lazy dog"
                          />
                        </Flex>
                      </Table.Cell>
                    ))}
                    <Table.Cell>
                      <Flex direction="column" gap="2">
                        <TextField.Root
                          variant={variant}
                          color={label === '+ gray' ? 'gray' : undefined}
                          placeholder="Your name"
                          disabled
                        />

                        <TextField.Root
                          disabled
                          placeholder="Your name"
                          variant={variant}
                          color={label === '+ gray' ? 'gray' : undefined}
                        >
                          <TextField.Slot>
                            <InfoCircledIcon />
                          </TextField.Slot>
                          <TextField.Slot>
                            <IconButton size="1" variant="ghost" color="gray">
                              <StarIcon />
                            </IconButton>
                          </TextField.Slot>
                        </TextField.Root>

                        <TextField.Root
                          variant={variant}
                          color={label === '+ gray' ? 'gray' : undefined}
                          placeholder="Your name"
                          disabled
                          defaultValue="The quick brown fox jumped over the lazy dog"
                        />
                      </Flex>
                    </Table.Cell>
                    <Table.Cell>
                      <Flex direction="column" gap="2">
                        <TextField.Root
                          variant={variant}
                          color={label === '+ gray' ? 'gray' : undefined}
                          placeholder="Your name"
                          readOnly
                        />

                        <TextField.Root
                          readOnly
                          placeholder="Your name"
                          variant={variant}
                          color={label === '+ gray' ? 'gray' : undefined}
                        >
                          <TextField.Slot>
                            <InfoCircledIcon />
                          </TextField.Slot>
                          <TextField.Slot>
                            <IconButton size="1" variant="ghost" color="gray">
                              <StarIcon />
                            </IconButton>
                          </TextField.Slot>
                        </TextField.Root>

                        <TextField.Root
                          variant={variant}
                          color={label === '+ gray' ? 'gray' : undefined}
                          placeholder="Your name"
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

        <Separator my="8" />
        <Flex align="center" gap="4" mb="9">
          <Box>
            <form action="/">
              <TextField.Root
                mb="2"
                variant="classic"
                autoComplete="email"
                placeholder="Autofill (Email)"
                size="2"
                type="email"
              />
              <TextField.Root
                mb="2"
                variant="classic"
                autoComplete="current-password"
                placeholder="Autofill (Password)"
                size="2"
                type="password"
              />
              <Button type="submit">Submit</Button>
            </form>
          </Box>
          <Box>
            <form action="/">
              <TextField.Root
                mb="2"
                variant="surface"
                autoComplete="email"
                placeholder="Autofill (Email)"
                size="2"
                type="email"
              />
              <TextField.Root
                mb="2"
                variant="surface"
                autoComplete="current-password"
                placeholder="Autofill (Password)"
                size="2"
                type="password"
              />
              <Button type="submit">Submit</Button>
            </form>
          </Box>
          <Box>
            <form action="/">
              <TextField.Root
                mb="2"
                variant="soft"
                autoComplete="email"
                placeholder="Autofill (Email)"
                size="2"
                type="email"
              />
              <TextField.Root
                mb="2"
                variant="soft"
                autoComplete="current-password"
                placeholder="Autofill (Password)"
                size="2"
                type="password"
              />
              <Button type="submit">Submit</Button>
            </form>
          </Box>
          <Box>
            <form action="/">
              <TextField.Root
                mb="2"
                variant="soft"
                color="gray"
                autoComplete="email"
                placeholder="Autofill (Email)"
                size="2"
                type="email"
              />
              <TextField.Root
                mb="2"
                variant="soft"
                color="gray"
                autoComplete="current-password"
                placeholder="Autofill (Password)"
                size="2"
                type="password"
              />
              <Button type="submit">Submit</Button>
            </form>
          </Box>
        </Flex>

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
                  {textFieldRootPropDefs.size.values.map((size) => (
                    <Table.ColumnHeaderCell key={size}>size {size}</Table.ColumnHeaderCell>
                  ))}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {textFieldRootPropDefs.radius.values.map((radius) => (
                  <Table.Row key={radius}>
                    <Table.RowHeaderCell>{radius}</Table.RowHeaderCell>
                    {textFieldRootPropDefs.size.values.map((size) => (
                      <Table.Cell key={size}>
                        <TextField.Root size={size} radius={radius} placeholder="Your name" />
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
                    {textFieldRootPropDefs.variant.values.map((variant) => (
                      <Table.ColumnHeaderCell key={variant}>{variant}</Table.ColumnHeaderCell>
                    ))}
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {values.map((color) => (
                    <Table.Row key={color}>
                      <Table.RowHeaderCell>{color}</Table.RowHeaderCell>
                      {textFieldRootPropDefs.variant.values.map((variant) => (
                        <Table.Cell key={variant}>
                          <TextField.Root variant={variant} color={color} placeholder="Your name" />
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
