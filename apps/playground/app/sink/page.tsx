import * as React from 'react';
import { NextThemeProvider } from '../next-theme-provider';
import {
  ArrowTopRightIcon,
  ArrowRightIcon,
  DotsHorizontalIcon,
  Pencil2Icon,
  Share2Icon,
  InfoCircledIcon,
  StarIcon,
  Cross1Icon,
  CodeIcon,
  TrashIcon,
} from '@radix-ui/react-icons';
import {
  AlertDialog,
  AspectRatio,
  Avatar,
  Badge,
  Blockquote,
  Box,
  Button,
  Callout,
  Card,
  Checkbox,
  CheckboxCards,
  CheckboxGroup,
  Code,
  Container,
  ContextMenu,
  DataList,
  Dialog,
  DropdownMenu,
  Em,
  Flex,
  Grid,
  Heading,
  HoverCard,
  IconButton,
  Kbd,
  Link,
  Popover,
  Progress,
  Quote,
  Radio,
  RadioCards,
  RadioGroup,
  ScrollArea,
  Section,
  SegmentedControl,
  Select,
  Separator,
  Skeleton,
  Slider,
  Spinner,
  Strong,
  Switch,
  Table,
  Tabs,
  Text,
  TextArea,
  TextField,
  Theme,
  ThemePanel,
  Tooltip,
} from '@radix-ui/themes';
import {
  accentColors,
  avatarPropDefs,
  badgePropDefs,
  buttonPropDefs,
  calloutRootPropDefs,
  cardPropDefs,
  checkboxCardsRootPropDefs,
  checkboxGroupRootPropDefs,
  checkboxPropDefs,
  codePropDefs,
  contextMenuContentPropDefs,
  dataListLabelPropDefs,
  dataListRootPropDefs,
  dropdownMenuContentPropDefs,
  headingPropDefs,
  iconButtonPropDefs,
  kbdPropDefs,
  linkPropDefs,
  progressPropDefs,
  radioCardsRootPropDefs,
  radioGroupRootPropDefs,
  radioPropDefs,
  scrollAreaPropDefs,
  segmentedControlRootPropDefs,
  selectContentPropDefs,
  selectRootPropDefs,
  selectTriggerPropDefs,
  sliderPropDefs,
  switchPropDefs,
  tableRootPropDefs,
  tabsListPropDefs,
  textAreaPropDefs,
  textFieldRootPropDefs,
  textPropDefs,
} from '@radix-ui/themes/props';
// import { HideCursor } from './hide-cursor';
import styles from './page.module.css';

import { RadixLogo } from './radix-logo';
import { PointerCursorsCheckbox } from './pointer-cursors-checkbox';
import { LoadingButtons } from '../../components/loading-buttons';
import { TabNavDemo } from './tab-nav-demo';

export default function Sink() {
  return (
    <html lang="en" className={styles.root} suppressHydrationWarning>
      <body>
        <NextThemeProvider>
          <Theme asChild>
            <div id="root">
              <div
                style={{
                  display: 'none',
                  position: 'fixed',
                  backgroundAttachment: 'fixed',
                  inset: 0,
                  backgroundSize: '100% max(100%, 600px)',
                  backgroundImage: [
                    'radial-gradient(at 0% 0%, transparent, transparent)',
                    'radial-gradient(at 41% 18%, var(--blue-1) 0, hsla(212, 92%, 67%, 0) 50%)',
                    'radial-gradient(at 76% 14%, var(--purple-3) 0, hsla(239, 87%, 67%, 0) 50%)',
                    'radial-gradient(at 7% 83%, var(--green-2) 0, hsla(165, 92%, 67%, 0) 50%)',
                    'radial-gradient(at 72% 2%, var(--purple-4) 0, hsla(248, 95%, 67%, 0) 50%)',
                    'radial-gradient(at 38% 76%, var(--red-3) 0, hsla(23, 86%, 55%, 0) 50%)',
                    'radial-gradient(at 88% 24%, var(--green-1) 0, hsla(82, 92%, 68%, 0) 50%)',
                    'radial-gradient(at 4% 89%, var(--green-4) 0, hsla(95, 86%, 55%, 0) 50%)',
                    'radial-gradient(at 54% 17%, var(--red-3) 0, hsla(2, 93%, 63%, 0) 50%)',
                    'radial-gradient(at 65% 86%, var(--red-2) 0, hsla(328, 85%, 64%, 0) 50%)',
                    'radial-gradient(at 68% 5%, var(--green-1) 0, hsla(173, 87%, 55%, 0) 50%)',
                    'radial-gradient(at 0% 64%, var(--red-1) 0, hsla(8, 90%, 67%, 0) 50%)',
                  ].join(', '),
                }}
              />
              {/* <HideCursor /> */}
              <ThemePanel defaultOpen={false} />

              <Box position="relative">
                <header
                  style={{
                    backgroundColor: 'var(--black-a2)',
                    boxShadow: '0 0 0 1px var(--gray-a5)',
                  }}
                >
                  <Container mx="6">
                    {/* <nav>
                  <Flex p="6" gap="5" align="center">
                    <Link asChild>
                      <NextLink href= highContrast"sink">Kitchen sink</NextLink>
                    </Link>
                    <Separator orientation="vertical" />
                    <Link href="home-os" color="gray">
                      Home OS
                    </Link>
                    <Link href="snapshot" color="gray">
                      Snapshot
                    </Link>
                  </Flex>
                </nav> */}
                    <Flex py="6" align="center" gap="1">
                      <RadixLogo />
                      <Heading size="5">Radix Themes</Heading>
                    </Flex>
                  </Container>
                </header>

                <main
                // dir="rtl"
                >
                  <Container mx="6">
                    <Section>
                      <Grid columns="3" gapY="9">
                        <DocsGridSectionItem title="Dialog">
                          <Dialog.Root>
                            <Dialog.Trigger>
                              <Button variant="solid">Open</Button>
                            </Dialog.Trigger>
                            <Dialog.Content asChild maxWidth="450px">
                              <Flex direction="column" gap="3">
                                <InfoCircledIcon
                                  style={{ position: 'absolute', top: '24px', right: '20px' }}
                                />
                                <Dialog.Title>Share resource</Dialog.Title>
                                <Dialog.Description>
                                  Jan Tschichold was a German calligrapher, typographer and book
                                  designer. He played a significant role in the development of
                                  graphic design in the 20th century.
                                </Dialog.Description>
                                <Flex gap="3" mt="4" justify="end">
                                  <Dialog.Close>
                                    <Button variant="soft" color="gray">
                                      Cancel
                                    </Button>
                                  </Dialog.Close>
                                  <Dialog.Close>
                                    <Button variant="solid">
                                      Share <Share2Icon />
                                    </Button>
                                  </Dialog.Close>
                                </Flex>
                              </Flex>
                            </Dialog.Content>
                          </Dialog.Root>
                        </DocsGridSectionItem>

                        <DocsGridSectionItem title="HoverCard">
                          <HoverCard.Root>
                            <HoverCard.Trigger>
                              <Link>A fancy link</Link>
                            </HoverCard.Trigger>
                            <HoverCard.Content width="200px">
                              <Text as="p" size="2">
                                Jan Tschichold was a German calligrapher, typographer and book
                                designer. He played a significant role in the development of graphic
                                design in the 20th century.
                              </Text>
                            </HoverCard.Content>
                          </HoverCard.Root>
                        </DocsGridSectionItem>

                        <DocsGridSectionItem title="Tooltip">
                          <Flex gap="5">
                            <Tooltip content="The quick brown fox">
                              <Button variant="solid" size="1">
                                Singleline
                              </Button>
                            </Tooltip>

                            <Tooltip content="The goal of typography is to relate font size, line height, and line width in a proportional way that maximizes beauty and makes reading easier and more pleasant.">
                              <Button variant="solid" size="1">
                                Multiline
                              </Button>
                            </Tooltip>
                          </Flex>
                        </DocsGridSectionItem>

                        <DocsGridSectionItem title="AlertDialog">
                          <AlertDialog.Root>
                            <AlertDialog.Trigger>
                              <Button variant="solid">Open</Button>
                            </AlertDialog.Trigger>
                            <AlertDialog.Content maxWidth="450px">
                              <Flex direction="column" gap="3">
                                <AlertDialog.Title>Revoke setup link</AlertDialog.Title>
                                <AlertDialog.Description>
                                  The setup link will no longer be accessible and any existing setup
                                  sessions will be revoked.
                                </AlertDialog.Description>
                                <Flex gap="3" mt="4" justify="end">
                                  <AlertDialog.Cancel>
                                    <Button variant="soft" color="gray">
                                      Cancel
                                    </Button>
                                  </AlertDialog.Cancel>
                                  <AlertDialog.Action>
                                    <Button variant="solid" color="red">
                                      Revoke link
                                    </Button>
                                  </AlertDialog.Action>
                                </Flex>
                              </Flex>
                            </AlertDialog.Content>
                          </AlertDialog.Root>
                        </DocsGridSectionItem>

                        <DocsGridSectionItem title="Popover">
                          <Popover.Root>
                            <Popover.Trigger>
                              <Button variant="solid">Popover</Button>
                            </Popover.Trigger>
                            <Popover.Content width="200px">
                              <Text as="p" size="2" mb="2">
                                Jan Tschichold was a German calligrapher, typographer and book
                                designer. He played a significant role in the development of graphic
                                design in the 20th century.
                              </Text>
                              <Button variant="solid" size="1">
                                Share <Share2Icon />
                              </Button>
                            </Popover.Content>
                          </Popover.Root>
                        </DocsGridSectionItem>
                      </Grid>
                    </Section>
                  </Container>
                  <Separator size="4" />

                  <Container mx="6">
                    <Section>
                      <Grid columns="3" gapY="9">
                        <div style={{ gridColumn: '1 / span 2' }}>
                          <DocsGridSectionItem title="DropdownMenu">
                            <table className={styles.table}>
                              <thead>
                                <tr>
                                  <ColumnHeaderCell />
                                  {dropdownMenuContentPropDefs.size.values.map((size) => (
                                    <ColumnHeaderCell key={size}>size {size}</ColumnHeaderCell>
                                  ))}
                                  <ColumnHeaderCell>+ high-contrast</ColumnHeaderCell>
                                  <ColumnHeaderCell>gray</ColumnHeaderCell>
                                  <ColumnHeaderCell>+ high-contrast</ColumnHeaderCell>
                                </tr>
                              </thead>
                              <tbody>
                                {dropdownMenuContentPropDefs.variant.values.map((variant) => (
                                  <tr key={variant}>
                                    <RowHeaderCell>{variant}</RowHeaderCell>
                                    {dropdownMenuContentPropDefs.size.values.map((size) => (
                                      <td key={size}>
                                        <DropdownMenu.Root>
                                          <DropdownMenu.Trigger>
                                            <Button size={size} variant="soft" color="gray">
                                              More <DropdownMenu.TriggerIcon />
                                            </Button>
                                          </DropdownMenu.Trigger>
                                          <DropdownMenuContentDemo size={size} variant={variant} />
                                        </DropdownMenu.Root>
                                      </td>
                                    ))}
                                    <td>
                                      <DropdownMenu.Root>
                                        <DropdownMenu.Trigger>
                                          <Button variant="soft" color="gray">
                                            More <DropdownMenu.TriggerIcon />
                                          </Button>
                                        </DropdownMenu.Trigger>
                                        <DropdownMenuContentDemo variant={variant} highContrast />
                                      </DropdownMenu.Root>
                                    </td>
                                    <td>
                                      <DropdownMenu.Root>
                                        <DropdownMenu.Trigger>
                                          <Button variant="soft" color="gray">
                                            More <DropdownMenu.TriggerIcon />
                                          </Button>
                                        </DropdownMenu.Trigger>
                                        <DropdownMenuContentDemo variant={variant} color="gray" />
                                      </DropdownMenu.Root>
                                    </td>
                                    <td>
                                      <DropdownMenu.Root>
                                        <DropdownMenu.Trigger>
                                          <Button variant="soft" color="gray">
                                            More <DropdownMenu.TriggerIcon />
                                          </Button>
                                        </DropdownMenu.Trigger>
                                        <DropdownMenuContentDemo
                                          variant={variant}
                                          color="gray"
                                          highContrast
                                        />
                                      </DropdownMenu.Root>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>

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
                                <React.Fragment key={label}>
                                  <Text as="p" weight="bold" mt="6" mb="4">
                                    {label}
                                  </Text>
                                  <table className={styles.table}>
                                    <thead>
                                      <tr>
                                        <ColumnHeaderCell />
                                        {dropdownMenuContentPropDefs.variant.values.map(
                                          (variant) => (
                                            <ColumnHeaderCell key={variant}>
                                              {variant}
                                            </ColumnHeaderCell>
                                          )
                                        )}
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {values.map((color) => (
                                        <tr key={color}>
                                          <RowHeaderCell>{color}</RowHeaderCell>
                                          {dropdownMenuContentPropDefs.variant.values.map(
                                            (variant) => (
                                              <td key={variant}>
                                                <DropdownMenu.Root>
                                                  <DropdownMenu.Trigger>
                                                    <IconButton variant="soft" color="gray">
                                                      <DotsHorizontalIcon />
                                                    </IconButton>
                                                  </DropdownMenu.Trigger>
                                                  <DropdownMenuContentDemo
                                                    variant={variant}
                                                    color={color}
                                                  />
                                                </DropdownMenu.Root>
                                                <DropdownMenu.Root>
                                                  <DropdownMenu.Trigger>
                                                    <IconButton variant="soft" color="gray" ml="2">
                                                      <DotsHorizontalIcon />
                                                    </IconButton>
                                                  </DropdownMenu.Trigger>
                                                  <DropdownMenuContentDemo
                                                    variant={variant}
                                                    color={color}
                                                    highContrast
                                                  />
                                                </DropdownMenu.Root>
                                              </td>
                                            )
                                          )}
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </React.Fragment>
                              ))}
                            </details>
                          </DocsGridSectionItem>
                        </div>

                        <DocsGridSectionItem title="ContextMenu">
                          <table className={styles.table}>
                            <thead>
                              <tr>
                                {contextMenuContentPropDefs.size.values.map((size) => (
                                  <ColumnHeaderCell key={size}>size {size}</ColumnHeaderCell>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {contextMenuContentPropDefs.variant.values.map((variant) => (
                                <tr key={variant}>
                                  {contextMenuContentPropDefs.size.values.map((size) => (
                                    <td key={size}>
                                      <ContextMenu.Root>
                                        <ContextMenu.Trigger>
                                          <RightClickArea size={size} />
                                        </ContextMenu.Trigger>
                                        <ContextMenuContentDemo size={size} variant={variant} />
                                      </ContextMenu.Root>
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </DocsGridSectionItem>
                      </Grid>
                    </Section>
                  </Container>
                  <Separator size="4" />

                  <DocsSection title="Select">
                    <Text as="p" my="5">
                      Trigger variants:
                    </Text>
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <ColumnHeaderCell />
                          {selectRootPropDefs.size.values.map((size) => (
                            <ColumnHeaderCell key={size}>size {size}</ColumnHeaderCell>
                          ))}
                          <ColumnHeaderCell>+ placeholder</ColumnHeaderCell>
                          <ColumnHeaderCell />
                          <ColumnHeaderCell>gray</ColumnHeaderCell>
                          <ColumnHeaderCell>+ placeholder</ColumnHeaderCell>
                          <ColumnHeaderCell />
                          <ColumnHeaderCell>disabled</ColumnHeaderCell>
                        </tr>
                      </thead>
                      <tbody>
                        {selectTriggerPropDefs.variant.values.map((variant) => (
                          <tr key={variant}>
                            <RowHeaderCell>{variant}</RowHeaderCell>
                            {selectRootPropDefs.size.values.map((size) => (
                              <td key={size}>
                                <Select.Root defaultValue="apple" size={size}>
                                  <Select.Trigger variant={variant} />
                                  <Select.Content>
                                    <SelectItemsDemo />
                                  </Select.Content>
                                </Select.Root>
                              </td>
                            ))}
                            <td>
                              <Select.Root size="2">
                                <Select.Trigger variant={variant} placeholder="Choose a fruit" />
                                <Select.Content>
                                  <SelectItemsDemo />
                                </Select.Content>
                              </Select.Root>
                            </td>
                            <td />
                            <td>
                              <Select.Root defaultValue="apple" size="2">
                                <Select.Trigger variant={variant} color="gray" />
                                <Select.Content>
                                  <SelectItemsDemo />
                                </Select.Content>
                              </Select.Root>
                            </td>
                            <td>
                              <Select.Root size="2">
                                <Select.Trigger
                                  variant={variant}
                                  color="gray"
                                  placeholder="Choose a fruit"
                                />
                                <Select.Content>
                                  <SelectItemsDemo />
                                </Select.Content>
                              </Select.Root>
                            </td>
                            <td />
                            <td>
                              <Select.Root defaultValue="apple" size="2" disabled>
                                <Select.Trigger variant={variant} />
                                <Select.Content>
                                  <SelectItemsDemo />
                                </Select.Content>
                              </Select.Root>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <Text as="p" my="5">
                      Content variants:
                    </Text>
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <ColumnHeaderCell />
                          <ColumnHeaderCell>color</ColumnHeaderCell>
                          <ColumnHeaderCell>+ high-contrast</ColumnHeaderCell>
                          <ColumnHeaderCell>gray</ColumnHeaderCell>
                          <ColumnHeaderCell>+ high-contrast</ColumnHeaderCell>
                        </tr>
                      </thead>
                      <tbody>
                        {selectContentPropDefs.variant.values.map((variant) => (
                          <tr key={variant}>
                            <RowHeaderCell>{variant}</RowHeaderCell>
                            <td>
                              <Select.Root defaultValue="apple" size="1">
                                <Select.Trigger />
                                <Select.Content variant={variant} position="popper">
                                  <SelectItemsDemo />
                                </Select.Content>
                              </Select.Root>
                            </td>
                            <td>
                              <Select.Root defaultValue="apple" size="1">
                                <Select.Trigger />
                                <Select.Content variant={variant} highContrast position="popper">
                                  <SelectItemsDemo />
                                </Select.Content>
                              </Select.Root>
                            </td>
                            <td>
                              <Select.Root defaultValue="apple" size="1">
                                <Select.Trigger />
                                <Select.Content variant={variant} color="gray" position="popper">
                                  <SelectItemsDemo />
                                </Select.Content>
                              </Select.Root>
                            </td>
                            <td>
                              <Select.Root defaultValue="apple" size="1">
                                <Select.Trigger />
                                <Select.Content
                                  variant={variant}
                                  color="gray"
                                  highContrast
                                  position="popper"
                                >
                                  <SelectItemsDemo />
                                </Select.Content>
                              </Select.Root>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

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
                        <table className={styles.table}>
                          <thead>
                            <tr>
                              <ColumnHeaderCell />
                              {selectRootPropDefs.size.values.map((size) => (
                                <ColumnHeaderCell key={size}>size {size}</ColumnHeaderCell>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {selectTriggerPropDefs.radius.values.map((radius) => (
                              <tr key={radius}>
                                <RowHeaderCell>{radius}</RowHeaderCell>
                                {selectRootPropDefs.size.values.map((size) => (
                                  <td key={size}>
                                    <Select.Root defaultValue="apple" size={size}>
                                      <Select.Trigger radius={radius} />
                                      <Select.Content>
                                        <SelectItemsDemo />
                                      </Select.Content>
                                    </Select.Root>
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
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
                        <React.Fragment key={label}>
                          <Text as="p" weight="bold" mt="6" mb="4">
                            {label}
                          </Text>
                          <table className={styles.table}>
                            <thead>
                              <tr>
                                <ColumnHeaderCell />
                                {selectTriggerPropDefs.variant.values.map((variant) => (
                                  <ColumnHeaderCell key={variant}>{variant}</ColumnHeaderCell>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {values.map((color) => (
                                <tr key={color}>
                                  <RowHeaderCell>{color}</RowHeaderCell>
                                  {selectTriggerPropDefs.variant.values.map((variant) => (
                                    <td key={variant}>
                                      <Select.Root defaultValue="apple" size="1">
                                        <Select.Trigger variant={variant} color={color} />
                                        <Select.Content variant="soft" color={color}>
                                          <SelectItemsDemo />
                                        </Select.Content>
                                      </Select.Root>
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </React.Fragment>
                      ))}
                    </details>
                  </DocsSection>

                  <DocsSection title="Switch">
                    <Grid columns="2" gap="9">
                      <div>
                        <table className={styles.table}>
                          <thead>
                            <tr>
                              <ColumnHeaderCell />
                              <ColumnHeaderCell>not checked</ColumnHeaderCell>
                              <ColumnHeaderCell>checked</ColumnHeaderCell>
                              <ColumnHeaderCell>disabled</ColumnHeaderCell>
                              <ColumnHeaderCell>disabled checked</ColumnHeaderCell>
                            </tr>
                          </thead>
                          <tbody>
                            {switchPropDefs.variant.values.map((variant) => (
                              <React.Fragment key={variant}>
                                {[variant, '+ high-contrast'].map((label) => (
                                  <tr key={label}>
                                    <RowHeaderCell>{label}</RowHeaderCell>
                                    <td>
                                      <Switch
                                        variant={variant}
                                        highContrast={label === '+ high-contrast'}
                                      />
                                    </td>
                                    <td>
                                      <Switch
                                        variant={variant}
                                        highContrast={label === '+ high-contrast'}
                                        defaultChecked
                                      />
                                    </td>
                                    <td>
                                      <Switch
                                        variant={variant}
                                        highContrast={label === '+ high-contrast'}
                                        disabled
                                      />
                                    </td>
                                    <td>
                                      <Switch
                                        variant={variant}
                                        highContrast={label === '+ high-contrast'}
                                        disabled
                                        defaultChecked
                                      />
                                    </td>
                                  </tr>
                                ))}
                              </React.Fragment>
                            ))}
                          </tbody>
                        </table>

                        <table className={styles.table}>
                          <tbody>
                            {switchPropDefs.size.values.map((size) => (
                              <tr key={size}>
                                <RowHeaderCell>size {size}</RowHeaderCell>
                                <td>
                                  <Switch size={size} defaultChecked={size === '2'} />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
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
                        <table className={styles.table}>
                          <thead>
                            <tr>
                              <ColumnHeaderCell />
                              {switchPropDefs.size.values.map((size) => (
                                <ColumnHeaderCell key={size}>size {size}</ColumnHeaderCell>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {switchPropDefs.radius.values.map((radius) => (
                              <tr key={radius}>
                                <RowHeaderCell>{radius}</RowHeaderCell>
                                {switchPropDefs.size.values.map((size) => (
                                  <td key={size}>
                                    <Switch size={size} radius={radius} />
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
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
                        <React.Fragment key={label}>
                          <Text as="p" weight="bold" mt="6" mb="4">
                            {label}
                          </Text>
                          <table className={styles.table}>
                            <thead>
                              <tr>
                                <ColumnHeaderCell />
                                {switchPropDefs.variant.values.map((variant) => (
                                  <RowHeaderCell key={variant}>{variant}</RowHeaderCell>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {values.map((color) => (
                                <tr key={color}>
                                  <RowHeaderCell>{color}</RowHeaderCell>
                                  {switchPropDefs.variant.values.map((variant) => (
                                    <td key={variant}>
                                      <Switch variant={variant} color={color} />
                                      <Switch
                                        variant={variant}
                                        color={color}
                                        defaultChecked
                                        ml="2"
                                      />
                                      <Switch
                                        variant={variant}
                                        color={color}
                                        highContrast
                                        defaultChecked
                                        ml="2"
                                      />
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </React.Fragment>
                      ))}
                    </details>
                  </DocsSection>

                  <DocsSection title="Slider">
                    <Grid columns="2" gap="9">
                      <div style={{ gridColumn: '1 / span 2' }}>
                        <table className={styles.table}>
                          <thead>
                            <tr>
                              <ColumnHeaderCell />
                              <ColumnHeaderCell>color</ColumnHeaderCell>
                              <ColumnHeaderCell>+ high-contrast</ColumnHeaderCell>
                              <ColumnHeaderCell>gray</ColumnHeaderCell>
                              <ColumnHeaderCell>+ high-contrast</ColumnHeaderCell>
                              <ColumnHeaderCell>disabled</ColumnHeaderCell>
                            </tr>
                          </thead>
                          <tbody>
                            {sliderPropDefs.variant.values.map((variant, index) => (
                              <tr key={variant}>
                                <RowHeaderCell>{variant}</RowHeaderCell>
                                <td style={{ minWidth: 150 }}>
                                  <Slider variant={variant} defaultValue={[33 + index * 10]} />
                                </td>
                                <td style={{ minWidth: 150 }}>
                                  <Slider
                                    variant={variant}
                                    highContrast
                                    defaultValue={[33 + index * 10]}
                                  />
                                </td>
                                <td style={{ minWidth: 150 }}>
                                  <Slider
                                    variant={variant}
                                    color="gray"
                                    defaultValue={[33 + index * 10]}
                                  />
                                </td>
                                <td style={{ minWidth: 150 }}>
                                  <Slider
                                    variant={variant}
                                    color="gray"
                                    highContrast
                                    defaultValue={[33 + index * 10]}
                                  />
                                </td>
                                <td style={{ minWidth: 150 }}>
                                  <Slider
                                    variant={variant}
                                    defaultValue={[33 + index * 10]}
                                    disabled
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div>
                        <table className={styles.table}>
                          <tbody>
                            {sliderPropDefs.size.values.map((size, index) => (
                              <tr key={size}>
                                <RowHeaderCell>size {size}</RowHeaderCell>
                                <td style={{ minWidth: 316 }}>
                                  <Slider size={size} defaultValue={[33 + index * 10]} />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div>
                        <Flex gap="5" style={{ height: 160 }}>
                          {sliderPropDefs.size.values.map((size, i, sizes) => {
                            return (
                              <React.Fragment key={size}>
                                {[
                                  ...sliderPropDefs.variant.values,
                                  ...sliderPropDefs.variant.values,
                                ]
                                  .sort()
                                  .map((variant, j, variants) => {
                                    const stepCount = variants.length * sizes.length - 1;
                                    const step = i * variants.length + j;
                                    const value =
                                      25 + Math.round(Math.sin(Math.PI * (step / stepCount)) * 50);
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
                              </React.Fragment>
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
                        <table className={styles.table}>
                          <thead>
                            <tr>
                              <ColumnHeaderCell />
                              {sliderPropDefs.size.values.map((size) => (
                                <ColumnHeaderCell key={size}>size {size}</ColumnHeaderCell>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {sliderPropDefs.radius.values.map((radius) => (
                              <tr key={radius}>
                                <RowHeaderCell>{radius}</RowHeaderCell>
                                {sliderPropDefs.size.values.map((size) => (
                                  <td key={size} style={{ minWidth: 150 }}>
                                    <Slider size={size} radius={radius} defaultValue={[50]} />
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
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
                        <React.Fragment key={label}>
                          <Text as="p" weight="bold" mt="6" mb="4">
                            {label}
                          </Text>
                          <table className={styles.table}>
                            <thead>
                              <tr>
                                <ColumnHeaderCell />
                                {sliderPropDefs.variant.values.map((variant) => (
                                  <RowHeaderCell key={variant}>{variant}</RowHeaderCell>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {values.map((color) => (
                                <tr key={color}>
                                  <RowHeaderCell>{color}</RowHeaderCell>
                                  {sliderPropDefs.variant.values.map((variant) => (
                                    <td key={variant} style={{ minWidth: 150 }}>
                                      <Slider
                                        variant={variant}
                                        color={color}
                                        defaultValue={[50]}
                                        mt="3"
                                      />
                                      <Slider
                                        variant={variant}
                                        color={color}
                                        highContrast
                                        defaultValue={[50]}
                                        mt="5"
                                        mb="3"
                                      />
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </React.Fragment>
                      ))}
                    </details>
                  </DocsSection>

                  <DocsSection title="Progress">
                    <Flex direction="column" gap="5">
                      <div>
                        <table className={styles.table}>
                          <thead>
                            <tr>
                              <ColumnHeaderCell />
                              <ColumnHeaderCell>color</ColumnHeaderCell>
                              <ColumnHeaderCell>+ high-contrast</ColumnHeaderCell>
                              <ColumnHeaderCell>gray</ColumnHeaderCell>
                              <ColumnHeaderCell>+ high-contrast</ColumnHeaderCell>
                            </tr>
                          </thead>
                          <tbody>
                            {progressPropDefs.variant.values.map((variant, index) => (
                              <tr key={variant}>
                                <RowHeaderCell>{variant}</RowHeaderCell>
                                <td style={{ minWidth: 220 }}>
                                  <Grid gap="3">
                                    <Progress variant={variant} />
                                    <Progress variant={variant} value={33 + index * 10} />
                                  </Grid>
                                </td>
                                <td style={{ minWidth: 220 }}>
                                  <Grid gap="3">
                                    <Progress variant={variant} highContrast />
                                    <Progress
                                      variant={variant}
                                      highContrast
                                      value={33 + index * 10}
                                    />
                                  </Grid>
                                </td>
                                <td style={{ minWidth: 220 }}>
                                  <Grid gap="3">
                                    <Progress variant={variant} color="gray" />
                                    <Progress
                                      variant={variant}
                                      color="gray"
                                      value={33 + index * 10}
                                    />
                                  </Grid>
                                </td>
                                <td style={{ minWidth: 220 }}>
                                  <Grid gap="3">
                                    <Progress variant={variant} color="gray" highContrast />
                                    <Progress
                                      variant={variant}
                                      color="gray"
                                      highContrast
                                      value={33 + index * 10}
                                    />
                                  </Grid>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div>
                        <table className={styles.table}>
                          <tbody>
                            {progressPropDefs.size.values.map((size, i) => (
                              <tr key={size}>
                                <RowHeaderCell>size {size}</RowHeaderCell>
                                <td style={{ width: 220 }}>
                                  <Progress size={size} />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
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
                        <table className={styles.table}>
                          <thead>
                            <tr>
                              <ColumnHeaderCell />
                              {progressPropDefs.size.values.map((size) => (
                                <ColumnHeaderCell key={size}>size {size}</ColumnHeaderCell>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {progressPropDefs.radius.values.map((radius) => (
                              <tr key={radius}>
                                <RowHeaderCell>{radius}</RowHeaderCell>
                                {progressPropDefs.size.values.map((size) => (
                                  <td key={size} style={{ minWidth: 150 }}>
                                    <Progress size={size} radius={radius} value={66} />
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
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
                        <React.Fragment key={label}>
                          <Text as="p" weight="bold" mt="6" mb="4">
                            {label}
                          </Text>
                          <table className={styles.table}>
                            <thead>
                              <tr>
                                <ColumnHeaderCell />
                                {progressPropDefs.variant.values.map((variant) => (
                                  <RowHeaderCell key={variant}>{variant}</RowHeaderCell>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {values.map((color) => (
                                <tr key={color}>
                                  <RowHeaderCell>{color}</RowHeaderCell>
                                  {progressPropDefs.variant.values.map((variant) => (
                                    <td key={variant} style={{ minWidth: 150 }}>
                                      <Progress variant={variant} color={color} mt="3" mb="3" />
                                      <Progress variant={variant} color={color} value={66} mt="5" />
                                      <Progress
                                        variant={variant}
                                        color={color}
                                        highContrast
                                        value={66}
                                        mt="5"
                                        mb="3"
                                      />
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </React.Fragment>
                      ))}
                    </details>
                  </DocsSection>

                  <DocsSection title="Spinner">
                    <Grid gap="4">
                      <Flex gap="4" align="center">
                        <Spinner size="1" />
                        <Spinner size="2" />
                        <Spinner size="3" />

                        <Spinner>
                          <Button>Hello</Button>
                        </Spinner>
                      </Flex>

                      <Flex gap="4" align="center">
                        <TextField.Root defaultValue="horsebatterystaple" type="password" size="1">
                          <TextField.Slot>
                            <Spinner size="1" />
                          </TextField.Slot>
                        </TextField.Root>

                        <TextField.Root defaultValue="horsebatterystaple" type="password" size="2">
                          <TextField.Slot>
                            <Spinner size="2" />
                          </TextField.Slot>
                        </TextField.Root>

                        <TextField.Root defaultValue="horsebatterystaple" type="password" size="3">
                          <TextField.Slot>
                            <Spinner size="3" />
                          </TextField.Slot>
                        </TextField.Root>
                      </Flex>

                      <LoadingButtons />
                    </Grid>
                  </DocsSection>

                  <DocsSection title="Checkbox">
                    <Grid columns="2" gap="9">
                      <div>
                        <table className={styles.table}>
                          <thead>
                            <tr>
                              <ColumnHeaderCell />
                              <ColumnHeaderCell>not checked</ColumnHeaderCell>
                              <ColumnHeaderCell>checked</ColumnHeaderCell>
                              <ColumnHeaderCell>indeterminate</ColumnHeaderCell>
                              <ColumnHeaderCell>disabled</ColumnHeaderCell>
                              <ColumnHeaderCell>disabled checked</ColumnHeaderCell>
                            </tr>
                          </thead>
                          <tbody>
                            {checkboxPropDefs.variant.values.map((variant) => (
                              <React.Fragment key={variant}>
                                {[variant, '+ high-contrast'].map((label) => (
                                  <tr key={label}>
                                    <RowHeaderCell>{label}</RowHeaderCell>
                                    <td>
                                      <Checkbox
                                        variant={variant}
                                        highContrast={label === '+ high-contrast'}
                                      />
                                    </td>
                                    <td>
                                      <Checkbox
                                        variant={variant}
                                        highContrast={label === '+ high-contrast'}
                                        defaultChecked
                                      />
                                    </td>
                                    <td>
                                      <Checkbox
                                        variant={variant}
                                        highContrast={label === '+ high-contrast'}
                                        defaultChecked="indeterminate"
                                      />
                                    </td>
                                    <td>
                                      <Checkbox
                                        variant={variant}
                                        highContrast={label === '+ high-contrast'}
                                        disabled
                                      />
                                    </td>
                                    <td>
                                      <Checkbox
                                        variant={variant}
                                        highContrast={label === '+ high-contrast'}
                                        disabled
                                        defaultChecked
                                      />
                                    </td>
                                  </tr>
                                ))}
                              </React.Fragment>
                            ))}
                          </tbody>
                        </table>

                        <table className={styles.table}>
                          <tbody>
                            {checkboxPropDefs.size.values.map((size) => (
                              <tr key={size}>
                                <RowHeaderCell>size {size}</RowHeaderCell>
                                <td>
                                  <Flex gap="2">
                                    <Checkbox size={size} />
                                    <Checkbox size={size} defaultChecked />
                                  </Flex>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
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
                                <Checkbox size="1" />
                                <Text>Agree to Terms and Conditions</Text>
                              </Flex>
                            </label>
                          </Text>

                          <Separator size="4" />

                          <Text size="2" asChild>
                            <label>
                              <Flex gap="2">
                                <Checkbox size="1" />
                                <Text>Agree to Terms and Conditions</Text>
                              </Flex>
                            </label>
                          </Text>

                          <Separator size="4" />

                          <Text size="2" asChild>
                            <label>
                              <Flex gap="2">
                                <Checkbox size="2" />
                                <Text>Agree to Terms and Conditions</Text>
                              </Flex>
                            </label>
                          </Text>

                          <Separator size="4" />

                          <Text size="3" asChild>
                            <label>
                              <Flex gap="2">
                                <Checkbox size="2" />
                                <Text>Agree to Terms and Conditions</Text>
                              </Flex>
                            </label>
                          </Text>

                          <Separator size="4" />

                          <Text size="3" asChild>
                            <label>
                              <Flex gap="2">
                                <Checkbox size="3" />
                                <Text>Agree to Terms and Conditions</Text>
                              </Flex>
                            </label>
                          </Text>

                          <Separator size="4" />

                          <Text size="4" asChild>
                            <label>
                              <Flex gap="2">
                                <Checkbox size="3" />
                                <Text>Agree to Terms and Conditions</Text>
                              </Flex>
                            </label>
                          </Text>

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
                        <React.Fragment key={label}>
                          <Text as="p" weight="bold" mt="6" mb="4">
                            {label}
                          </Text>
                          <table className={styles.table}>
                            <thead>
                              <tr>
                                <ColumnHeaderCell />
                                {checkboxPropDefs.variant.values.map((variant) => (
                                  <ColumnHeaderCell key={variant}>{variant}</ColumnHeaderCell>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {values.map((color) => (
                                <tr key={color}>
                                  <RowHeaderCell>{color}</RowHeaderCell>
                                  {checkboxPropDefs.variant.values.map((variant) => (
                                    <td key={variant}>
                                      <Checkbox variant={variant} color={color} defaultChecked />
                                      <Checkbox
                                        variant={variant}
                                        color={color}
                                        highContrast
                                        defaultChecked
                                        ml="2"
                                      />
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </React.Fragment>
                      ))}
                    </details>
                  </DocsSection>

                  <DocsSection title="CheckboxGroup">
                    <Grid columns="2" gap="9">
                      <div>
                        <table className={styles.table}>
                          <thead>
                            <tr>
                              <ColumnHeaderCell />
                              <ColumnHeaderCell>not checked</ColumnHeaderCell>
                              <ColumnHeaderCell>checked</ColumnHeaderCell>
                              <ColumnHeaderCell>disabled</ColumnHeaderCell>
                              <ColumnHeaderCell>disabled checked</ColumnHeaderCell>
                            </tr>
                          </thead>
                          <tbody>
                            {checkboxGroupRootPropDefs.variant.values.map((variant) => (
                              <React.Fragment key={variant}>
                                {[variant, '+ high-contrast'].map((label) => (
                                  <tr key={label}>
                                    <RowHeaderCell>{label}</RowHeaderCell>
                                    <td>
                                      <CheckboxGroup.Root
                                        variant={variant}
                                        highContrast={label === '+ high-contrast'}
                                      >
                                        <CheckboxGroup.Item value="value" />
                                      </CheckboxGroup.Root>
                                    </td>
                                    <td>
                                      <CheckboxGroup.Root
                                        variant={variant}
                                        defaultValue={['value']}
                                        highContrast={label === '+ high-contrast'}
                                      >
                                        <CheckboxGroup.Item value="value" />
                                      </CheckboxGroup.Root>
                                    </td>
                                    <td>
                                      <CheckboxGroup.Root
                                        variant={variant}
                                        highContrast={label === '+ high-contrast'}
                                      >
                                        <CheckboxGroup.Item value="value" disabled />
                                      </CheckboxGroup.Root>
                                    </td>
                                    <td>
                                      <CheckboxGroup.Root
                                        variant={variant}
                                        highContrast={label === '+ high-contrast'}
                                        disabled
                                        defaultValue={['value']}
                                      >
                                        <CheckboxGroup.Item value="value" />
                                      </CheckboxGroup.Root>
                                    </td>
                                  </tr>
                                ))}
                              </React.Fragment>
                            ))}
                          </tbody>
                        </table>

                        <table className={styles.table}>
                          <tbody>
                            {checkboxGroupRootPropDefs.size.values.map((size) => (
                              <tr key={size}>
                                <RowHeaderCell>size {size}</RowHeaderCell>
                                <td style={{ width: '100%' }}>
                                  <CheckboxGroup.Root size={size} defaultValue={['red']}>
                                    <CheckboxGroup.Item value="red">Red</CheckboxGroup.Item>
                                    <CheckboxGroup.Item value="green">Green</CheckboxGroup.Item>
                                    <CheckboxGroup.Item value="blue">Blue</CheckboxGroup.Item>
                                    <CheckboxGroup.Item value="violet">Violet</CheckboxGroup.Item>
                                  </CheckboxGroup.Root>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div>
                        <Box py="4">
                          <Text as="p" size="2">
                            Alignment
                          </Text>
                        </Box>

                        <Flex direction="column" gap="5" style={{ maxWidth: 320 }}>
                          <Separator size="4" />

                          <CheckboxGroup.Root defaultValue={['1']} size="1">
                            <Flex direction="column" gap="1">
                              <Text as="label" size="1">
                                <Flex gap="2">
                                  <CheckboxGroup.Item value="1" />
                                  <Text>Agree to Terms and Conditions</Text>
                                </Flex>
                              </Text>
                              <Text as="label" size="1">
                                <Flex gap="2">
                                  <CheckboxGroup.Item value="2" />
                                  <Text>Agree to Privacy Policy</Text>
                                </Flex>
                              </Text>
                            </Flex>
                          </CheckboxGroup.Root>

                          <Separator size="4" />

                          <CheckboxGroup.Root defaultValue={['1']} size="1">
                            <Flex direction="column" gap="1">
                              <Text as="label" size="2">
                                <Flex gap="2">
                                  <CheckboxGroup.Item value="1" />
                                  <Text>Agree to Terms and Conditions</Text>
                                </Flex>
                              </Text>
                              <Text as="label" size="2">
                                <Flex gap="2">
                                  <CheckboxGroup.Item value="2" />
                                  <Text>Agree to Privacy Policy</Text>
                                </Flex>
                              </Text>
                            </Flex>
                          </CheckboxGroup.Root>

                          <Separator size="4" />

                          <CheckboxGroup.Root defaultValue={['1']} size="2">
                            <Flex direction="column" gap="1">
                              <Text as="label" size="2">
                                <Flex gap="2">
                                  <CheckboxGroup.Item value="1" />
                                  <Text>Agree to Terms and Conditions</Text>
                                </Flex>
                              </Text>
                              <Text as="label" size="2">
                                <Flex gap="2">
                                  <CheckboxGroup.Item value="2" />
                                  <Text>Agree to Privacy Policy</Text>
                                </Flex>
                              </Text>
                            </Flex>
                          </CheckboxGroup.Root>

                          <Separator size="4" />

                          <CheckboxGroup.Root defaultValue={['1']} size="2">
                            <Flex direction="column" gap="1">
                              <Text as="label" size="3">
                                <Flex gap="2">
                                  <CheckboxGroup.Item value="1" />
                                  <Text>Agree to Terms and Conditions</Text>
                                </Flex>
                              </Text>
                              <Text as="label" size="3">
                                <Flex gap="2">
                                  <CheckboxGroup.Item value="2" />
                                  <Text>Agree to Privacy Policy</Text>
                                </Flex>
                              </Text>
                            </Flex>
                          </CheckboxGroup.Root>

                          <Separator size="4" />

                          <CheckboxGroup.Root defaultValue={['1']} size="3">
                            <Flex direction="column" gap="1">
                              <Text as="label" size="3">
                                <Flex gap="2">
                                  <CheckboxGroup.Item value="1" />
                                  <Text>Agree to Terms and Conditions</Text>
                                </Flex>
                              </Text>
                              <Text as="label" size="3">
                                <Flex gap="2">
                                  <CheckboxGroup.Item value="2" />
                                  <Text>Agree to Privacy Policy</Text>
                                </Flex>
                              </Text>
                            </Flex>
                          </CheckboxGroup.Root>

                          <Separator size="4" />

                          <CheckboxGroup.Root defaultValue={['1']} size="3">
                            <Flex direction="column" gap="1">
                              <Text as="label" size="4">
                                <Flex gap="2">
                                  <CheckboxGroup.Item value="1" />
                                  <Text>Agree to Terms and Conditions</Text>
                                </Flex>
                              </Text>
                              <Text as="label" size="4">
                                <Flex gap="2">
                                  <CheckboxGroup.Item value="2" />
                                  <Text>Agree to Privacy Policy</Text>
                                </Flex>
                              </Text>
                            </Flex>
                          </CheckboxGroup.Root>

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
                        <React.Fragment key={label}>
                          <Text as="p" weight="bold" mt="6" mb="4">
                            {label}
                          </Text>
                          <table className={styles.table}>
                            <thead>
                              <tr>
                                <ColumnHeaderCell />
                                {checkboxGroupRootPropDefs.variant.values.map((variant) => (
                                  <ColumnHeaderCell key={variant}>{variant}</ColumnHeaderCell>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {values.map((color) => (
                                <tr key={color}>
                                  <RowHeaderCell>{color}</RowHeaderCell>
                                  {checkboxGroupRootPropDefs.variant.values.map((variant) => (
                                    <td key={variant}>
                                      <Flex gap="2">
                                        <CheckboxGroup.Root
                                          variant={variant}
                                          color={color}
                                          defaultValue={['value']}
                                        >
                                          <CheckboxGroup.Item value="value" />
                                        </CheckboxGroup.Root>
                                        <CheckboxGroup.Root
                                          variant={variant}
                                          color={color}
                                          defaultValue={['value']}
                                          highContrast
                                        >
                                          <CheckboxGroup.Item value="value" />
                                        </CheckboxGroup.Root>
                                      </Flex>
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </React.Fragment>
                      ))}
                    </details>

                    <Separator size="3" my="5" />
                  </DocsSection>

                  <DocsSection title="CheckboxCards">
                    <table className={styles.table}>
                      <tbody>
                        {checkboxCardsRootPropDefs.variant.values.map((variant, index) => (
                          <tr key={variant}>
                            <RowHeaderCell>{variant}</RowHeaderCell>
                            <td>
                              <CheckboxCards.Root
                                defaultValue={[String(index)]}
                                columns="3"
                                variant={variant}
                              >
                                <CheckboxCards.Item value="0">
                                  <CodeIcon />
                                  <Text truncate>Node.js</Text>
                                </CheckboxCards.Item>
                                <CheckboxCards.Item value="1" disabled>
                                  Ruby
                                </CheckboxCards.Item>
                                <CheckboxCards.Item value="2">Go</CheckboxCards.Item>
                              </CheckboxCards.Root>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <Box mb="7" />

                    <table className={styles.table}>
                      <tbody>
                        {checkboxCardsRootPropDefs.size.values.map((size, index) => (
                          <tr key={size}>
                            <RowHeaderCell>size {size}</RowHeaderCell>
                            <td>
                              <CheckboxCards.Root
                                defaultValue={[String(index)]}
                                size={size}
                                columns="3"
                                style={{ width: 400 + Number(size) * 100 }}
                              >
                                <CheckboxCards.Item value="0">Node.js</CheckboxCards.Item>
                                <CheckboxCards.Item value="1" disabled>
                                  Ruby
                                </CheckboxCards.Item>
                                <CheckboxCards.Item value="2">Go</CheckboxCards.Item>
                              </CheckboxCards.Root>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

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
                        <React.Fragment key={label}>
                          <Text as="p" weight="bold" mt="6" mb="4">
                            {label}
                          </Text>
                          <table className={styles.table}>
                            <thead>
                              <tr>
                                <ColumnHeaderCell />
                                {checkboxCardsRootPropDefs.variant.values.map((variant) => (
                                  <ColumnHeaderCell key={variant}>{variant}</ColumnHeaderCell>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {values.map((color) => (
                                <tr key={color}>
                                  <RowHeaderCell>{color}</RowHeaderCell>
                                  {checkboxCardsRootPropDefs.variant.values.map((variant) => (
                                    <td key={variant}>
                                      <Flex direction="column" gap="2">
                                        <CheckboxCards.Root
                                          defaultValue={['0']}
                                          size="1"
                                          gap="2"
                                          columns="3"
                                          variant={variant}
                                          color={color}
                                          style={{ width: 400 }}
                                        >
                                          <CheckboxCards.Item value="0">Node.js</CheckboxCards.Item>
                                          <CheckboxCards.Item value="1" disabled>
                                            Ruby
                                          </CheckboxCards.Item>
                                          <CheckboxCards.Item value="2">Go</CheckboxCards.Item>
                                        </CheckboxCards.Root>

                                        <CheckboxCards.Root
                                          defaultValue={['0']}
                                          size="1"
                                          gap="2"
                                          columns="3"
                                          variant={variant}
                                          color={color}
                                          highContrast
                                          style={{ width: 400 }}
                                        >
                                          <CheckboxCards.Item value="0">Node.js</CheckboxCards.Item>
                                          <CheckboxCards.Item value="1" disabled>
                                            Ruby
                                          </CheckboxCards.Item>
                                          <CheckboxCards.Item value="2">Go</CheckboxCards.Item>
                                        </CheckboxCards.Root>
                                      </Flex>
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </React.Fragment>
                      ))}
                    </details>
                  </DocsSection>

                  <DocsSection title="Radio">
                    <Grid columns="2" gap="9">
                      <div>
                        <table className={styles.table}>
                          <thead>
                            <tr>
                              <ColumnHeaderCell />
                              <ColumnHeaderCell>not checked</ColumnHeaderCell>
                              <ColumnHeaderCell>checked</ColumnHeaderCell>
                              <ColumnHeaderCell>disabled</ColumnHeaderCell>
                              <ColumnHeaderCell>disabled checked</ColumnHeaderCell>
                            </tr>
                          </thead>
                          <tbody>
                            {radioPropDefs.variant.values.map((variant) => (
                              <React.Fragment key={variant}>
                                {[variant, '+ high-contrast'].map((label) => (
                                  <tr key={label}>
                                    <RowHeaderCell>{label}</RowHeaderCell>
                                    <td>
                                      <Radio
                                        variant={variant}
                                        highContrast={label === '+ high-contrast'}
                                        value="value"
                                      />
                                    </td>
                                    <td>
                                      <Radio
                                        checked
                                        variant={variant}
                                        highContrast={label === '+ high-contrast'}
                                        value="value"
                                      />
                                    </td>
                                    <td>
                                      <Radio
                                        variant={variant}
                                        highContrast={label === '+ high-contrast'}
                                        value="value"
                                        disabled
                                      />
                                    </td>
                                    <td>
                                      <Radio
                                        checked
                                        variant={variant}
                                        highContrast={label === '+ high-contrast'}
                                        disabled
                                        value="value"
                                      />
                                    </td>
                                  </tr>
                                ))}
                              </React.Fragment>
                            ))}
                          </tbody>
                        </table>

                        <table className={styles.table}>
                          <tbody>
                            {radioPropDefs.size.values.map((size) => (
                              <tr key={size}>
                                <RowHeaderCell>size {size}</RowHeaderCell>
                                <td>
                                  <Flex gap="2">
                                    <Radio name={`radio-size-${size}`} size={size} value="value" />
                                    <Radio
                                      name={`radio-size-${size}`}
                                      size={size}
                                      value="value"
                                      defaultChecked
                                    />
                                  </Flex>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
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
                        <React.Fragment key={label}>
                          <Text as="p" weight="bold" mt="6" mb="4">
                            {label}
                          </Text>
                          <table className={styles.table}>
                            <thead>
                              <tr>
                                <ColumnHeaderCell />
                                {radioPropDefs.variant.values.map((variant) => (
                                  <ColumnHeaderCell key={variant}>{variant}</ColumnHeaderCell>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {values.map((color) => (
                                <tr key={color}>
                                  <RowHeaderCell>{color}</RowHeaderCell>
                                  {radioPropDefs.variant.values.map((variant) => (
                                    <td key={variant}>
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
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </React.Fragment>
                      ))}
                    </details>

                    <Separator size="3" my="5" />
                  </DocsSection>

                  <DocsSection title="RadioGroup">
                    <Grid columns="2" gap="9">
                      <div>
                        <table className={styles.table}>
                          <thead>
                            <tr>
                              <ColumnHeaderCell />
                              <ColumnHeaderCell>not checked</ColumnHeaderCell>
                              <ColumnHeaderCell>checked</ColumnHeaderCell>
                              <ColumnHeaderCell>disabled</ColumnHeaderCell>
                              <ColumnHeaderCell>disabled checked</ColumnHeaderCell>
                            </tr>
                          </thead>
                          <tbody>
                            {radioGroupRootPropDefs.variant.values.map((variant) => (
                              <React.Fragment key={variant}>
                                {[variant, '+ high-contrast'].map((label) => (
                                  <tr key={label}>
                                    <RowHeaderCell>{label}</RowHeaderCell>
                                    <td>
                                      <RadioGroup.Root
                                        variant={variant}
                                        highContrast={label === '+ high-contrast'}
                                      >
                                        <RadioGroup.Item value="value" />
                                      </RadioGroup.Root>
                                    </td>
                                    <td>
                                      <RadioGroup.Root
                                        variant={variant}
                                        defaultValue="value"
                                        highContrast={label === '+ high-contrast'}
                                      >
                                        <RadioGroup.Item value="value" />
                                      </RadioGroup.Root>
                                    </td>
                                    <td>
                                      <RadioGroup.Root
                                        variant={variant}
                                        highContrast={label === '+ high-contrast'}
                                      >
                                        <RadioGroup.Item value="value" disabled />
                                      </RadioGroup.Root>
                                    </td>
                                    <td>
                                      <RadioGroup.Root
                                        variant={variant}
                                        highContrast={label === '+ high-contrast'}
                                        disabled
                                        defaultValue="value"
                                      >
                                        <RadioGroup.Item value="value" />
                                      </RadioGroup.Root>
                                    </td>
                                  </tr>
                                ))}
                              </React.Fragment>
                            ))}
                          </tbody>
                        </table>

                        <table className={styles.table}>
                          <tbody>
                            {radioGroupRootPropDefs.size.values.map((size) => (
                              <tr key={size}>
                                <RowHeaderCell>size {size}</RowHeaderCell>
                                <td style={{ width: '100%' }}>
                                  <RadioGroup.Root size={size} defaultValue="red">
                                    <RadioGroup.Item value="red">Red</RadioGroup.Item>
                                    <RadioGroup.Item value="green">Green</RadioGroup.Item>
                                    <RadioGroup.Item value="blue">Blue</RadioGroup.Item>
                                    <RadioGroup.Item value="violet">Violet</RadioGroup.Item>
                                  </RadioGroup.Root>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
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
                        <React.Fragment key={label}>
                          <Text as="p" weight="bold" mt="6" mb="4">
                            {label}
                          </Text>
                          <table className={styles.table}>
                            <thead>
                              <tr>
                                <ColumnHeaderCell />
                                {radioGroupRootPropDefs.variant.values.map((variant) => (
                                  <ColumnHeaderCell key={variant}>{variant}</ColumnHeaderCell>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {values.map((color) => (
                                <tr key={color}>
                                  <RowHeaderCell>{color}</RowHeaderCell>
                                  {radioGroupRootPropDefs.variant.values.map((variant) => (
                                    <td key={variant}>
                                      <Flex gap="2">
                                        <RadioGroup.Root
                                          variant={variant}
                                          color={color}
                                          defaultValue="value"
                                        >
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
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </React.Fragment>
                      ))}
                    </details>

                    <Separator size="3" my="5" />
                  </DocsSection>

                  <DocsSection title="RadioCards">
                    <table className={styles.table}>
                      <tbody>
                        {radioCardsRootPropDefs.variant.values.map((variant, index) => (
                          <tr key={variant}>
                            <RowHeaderCell>{variant}</RowHeaderCell>
                            <td>
                              <RadioCards.Root
                                columns="3"
                                defaultValue={String(index)}
                                variant={variant}
                              >
                                <RadioCards.Item value="0">
                                  <CodeIcon />
                                  <Text truncate>Node.js</Text>
                                </RadioCards.Item>
                                <RadioCards.Item value="1" disabled>
                                  Ruby
                                </RadioCards.Item>
                                <RadioCards.Item value="2">Go</RadioCards.Item>
                              </RadioCards.Root>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <Box mb="7" />

                    <table className={styles.table}>
                      <tbody>
                        {radioCardsRootPropDefs.size.values.map((size, index) => (
                          <tr key={size}>
                            <RowHeaderCell>size {size}</RowHeaderCell>
                            <td>
                              <RadioCards.Root
                                size={size}
                                columns="3"
                                defaultValue={String(index)}
                                style={{ width: 400 + Number(size) * 100 }}
                              >
                                <RadioCards.Item value="0">Node.js</RadioCards.Item>
                                <RadioCards.Item value="1" disabled>
                                  Ruby
                                </RadioCards.Item>
                                <RadioCards.Item value="2">Go</RadioCards.Item>
                              </RadioCards.Root>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

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
                        <React.Fragment key={label}>
                          <Text as="p" weight="bold" mt="6" mb="4">
                            {label}
                          </Text>
                          <table className={styles.table}>
                            <thead>
                              <tr>
                                <ColumnHeaderCell />
                                {radioCardsRootPropDefs.variant.values.map((variant) => (
                                  <ColumnHeaderCell key={variant}>{variant}</ColumnHeaderCell>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {values.map((color) => (
                                <tr key={color}>
                                  <RowHeaderCell>{color}</RowHeaderCell>
                                  {radioCardsRootPropDefs.variant.values.map((variant) => (
                                    <td key={variant}>
                                      <Flex direction="column" gap="2">
                                        <RadioCards.Root
                                          size="1"
                                          gap="2"
                                          columns="3"
                                          defaultValue="0"
                                          variant={variant}
                                          color={color}
                                          style={{ width: 400 }}
                                        >
                                          <RadioCards.Item value="0">Node.js</RadioCards.Item>
                                          <RadioCards.Item value="1" disabled>
                                            Ruby
                                          </RadioCards.Item>
                                          <RadioCards.Item value="2">Go</RadioCards.Item>
                                        </RadioCards.Root>

                                        <RadioCards.Root
                                          size="1"
                                          gap="2"
                                          columns="3"
                                          defaultValue="1"
                                          variant={variant}
                                          color={color}
                                          highContrast
                                          style={{ width: 400 }}
                                        >
                                          <RadioCards.Item value="0">Node.js</RadioCards.Item>
                                          <RadioCards.Item value="1" disabled>
                                            Ruby
                                          </RadioCards.Item>
                                          <RadioCards.Item value="2">Go</RadioCards.Item>
                                        </RadioCards.Root>
                                      </Flex>
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </React.Fragment>
                      ))}
                    </details>
                  </DocsSection>

                  <DocsSection title="Button">
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <ColumnHeaderCell />
                          {buttonPropDefs.size.values.map((size) => (
                            <ColumnHeaderCell key={size}>size {size}</ColumnHeaderCell>
                          ))}
                          <ColumnHeaderCell>+ high-contrast</ColumnHeaderCell>
                          <ColumnHeaderCell />
                          <ColumnHeaderCell>gray</ColumnHeaderCell>
                          <ColumnHeaderCell>+ high-contrast</ColumnHeaderCell>
                          <ColumnHeaderCell />
                          <ColumnHeaderCell>disabled</ColumnHeaderCell>
                        </tr>
                      </thead>
                      <tbody>
                        {buttonPropDefs.variant.values.map((variant) => (
                          <tr key={variant}>
                            <RowHeaderCell>{variant}</RowHeaderCell>
                            {buttonPropDefs.size.values.map((size) => (
                              <td key={size}>
                                <Button size={size} variant={variant}>
                                  Next <ArrowRightIcon />
                                </Button>
                              </td>
                            ))}
                            <td>
                              <Button variant={variant} highContrast>
                                Next <ArrowRightIcon />
                              </Button>
                            </td>
                            <td />
                            <td>
                              <Button variant={variant} color="gray">
                                Next <ArrowRightIcon />
                              </Button>
                            </td>
                            <td>
                              <Button variant={variant} color="gray" highContrast>
                                Next <ArrowRightIcon />
                              </Button>
                            </td>
                            <td />
                            <td>
                              <Button variant={variant} disabled>
                                Next <ArrowRightIcon />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

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
                        <table className={styles.table}>
                          <thead>
                            <tr>
                              <ColumnHeaderCell />
                              {buttonPropDefs.size.values.map((size) => (
                                <ColumnHeaderCell key={size}>size {size}</ColumnHeaderCell>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {buttonPropDefs.radius.values.map((radius) => (
                              <tr key={radius}>
                                <RowHeaderCell>{radius}</RowHeaderCell>
                                {buttonPropDefs.size.values.map((size) => (
                                  <td key={size}>
                                    <Button size={size} radius={radius}>
                                      Next <ArrowRightIcon />
                                    </Button>
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
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
                        <React.Fragment key={label}>
                          <Text as="p" weight="bold" mt="6" mb="4">
                            {label}
                          </Text>
                          <table className={styles.table}>
                            <thead>
                              <tr>
                                <ColumnHeaderCell />
                                {buttonPropDefs.variant.values.map((variant) => (
                                  <ColumnHeaderCell key={variant}>{variant}</ColumnHeaderCell>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {values.map((color) => (
                                <tr key={color}>
                                  <RowHeaderCell>{color}</RowHeaderCell>
                                  {buttonPropDefs.variant.values.map((variant) => (
                                    <td key={variant}>
                                      <Button variant={variant} color={color}>
                                        <Pencil2Icon />
                                        Edit
                                      </Button>
                                      <Button variant={variant} color={color} highContrast ml="2">
                                        <Pencil2Icon />
                                        Edit
                                      </Button>
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </React.Fragment>
                      ))}
                    </details>
                  </DocsSection>

                  <DocsSection title="IconButton">
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <ColumnHeaderCell />
                          {iconButtonPropDefs.size.values.map((size) => (
                            <ColumnHeaderCell key={size}>size {size}</ColumnHeaderCell>
                          ))}
                          <ColumnHeaderCell>+ high-contrast</ColumnHeaderCell>
                          <ColumnHeaderCell />
                          <ColumnHeaderCell>gray</ColumnHeaderCell>
                          <ColumnHeaderCell>+ high-contrast</ColumnHeaderCell>
                          <ColumnHeaderCell />
                          <ColumnHeaderCell>disabled</ColumnHeaderCell>
                        </tr>
                      </thead>
                      <tbody>
                        {iconButtonPropDefs.variant.values.map((variant) => (
                          <tr key={variant}>
                            <RowHeaderCell>{variant}</RowHeaderCell>
                            {iconButtonPropDefs.size.values.map((size) => (
                              <td key={size}>
                                <IconButton size={size} variant={variant}>
                                  <Share2Icon />
                                </IconButton>
                              </td>
                            ))}
                            <td>
                              <IconButton variant={variant} highContrast>
                                <Share2Icon />
                              </IconButton>
                            </td>
                            <td />
                            <td>
                              <IconButton variant={variant} color="gray">
                                <Share2Icon />
                              </IconButton>
                            </td>
                            <td>
                              <IconButton variant={variant} color="gray" highContrast>
                                <Share2Icon />
                              </IconButton>
                            </td>
                            <td />
                            <td>
                              <IconButton variant={variant} disabled>
                                <Share2Icon />
                              </IconButton>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

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
                        <table className={styles.table}>
                          <thead>
                            <tr>
                              <ColumnHeaderCell />
                              {iconButtonPropDefs.size.values.map((size) => (
                                <ColumnHeaderCell key={size}>size {size}</ColumnHeaderCell>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {iconButtonPropDefs.radius.values.map((radius) => (
                              <tr key={radius}>
                                <RowHeaderCell>{radius}</RowHeaderCell>
                                {iconButtonPropDefs.size.values.map((size) => (
                                  <td key={size}>
                                    <IconButton size={size} radius={radius}>
                                      <Share2Icon />
                                    </IconButton>
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
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
                        <React.Fragment key={label}>
                          <Text as="p" weight="bold" mt="6" mb="4">
                            {label}
                          </Text>
                          <table className={styles.table}>
                            <thead>
                              <tr>
                                <ColumnHeaderCell />
                                {iconButtonPropDefs.variant.values.map((variant) => (
                                  <ColumnHeaderCell key={variant}>{variant}</ColumnHeaderCell>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {values.map((color) => (
                                <tr key={color}>
                                  <RowHeaderCell>{color}</RowHeaderCell>
                                  {iconButtonPropDefs.variant.values.map((variant) => (
                                    <td key={variant}>
                                      <IconButton variant={variant} color={color}>
                                        <Share2Icon />
                                      </IconButton>
                                      <IconButton
                                        variant={variant}
                                        color={color}
                                        highContrast
                                        ml="2"
                                      >
                                        <Share2Icon />
                                      </IconButton>
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </React.Fragment>
                      ))}
                    </details>
                  </DocsSection>

                  <DocsSection title="TextField">
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <ColumnHeaderCell />
                          {textFieldRootPropDefs.size.values.map((size) => (
                            <ColumnHeaderCell key={size}>size {size}</ColumnHeaderCell>
                          ))}
                          <ColumnHeaderCell>disabled</ColumnHeaderCell>
                          <ColumnHeaderCell>read-only</ColumnHeaderCell>
                        </tr>
                      </thead>
                      <tbody>
                        {textFieldRootPropDefs.variant.values.map((variant) => (
                          <React.Fragment key={variant}>
                            {[variant, '+ gray'].map((label) => (
                              <tr key={label}>
                                <RowHeaderCell>{label}</RowHeaderCell>
                                {textFieldRootPropDefs.size.values.map((size) => (
                                  <td key={size}>
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
                                  </td>
                                ))}
                                <td>
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
                                </td>
                                <td>
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
                                </td>
                              </tr>
                            ))}
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>

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
                        <table className={styles.table}>
                          <thead>
                            <tr>
                              <ColumnHeaderCell />
                              {textFieldRootPropDefs.size.values.map((size) => (
                                <ColumnHeaderCell key={size}>size {size}</ColumnHeaderCell>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {textFieldRootPropDefs.radius.values.map((radius) => (
                              <tr key={radius}>
                                <RowHeaderCell>{radius}</RowHeaderCell>
                                {textFieldRootPropDefs.size.values.map((size) => (
                                  <td key={size}>
                                    <TextField.Root
                                      size={size}
                                      radius={radius}
                                      placeholder="Your name"
                                    />
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
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
                        <React.Fragment key={label}>
                          <Text as="p" weight="bold" mt="6" mb="4">
                            {label}
                          </Text>
                          <table className={styles.table}>
                            <thead>
                              <tr>
                                <ColumnHeaderCell />
                                {textFieldRootPropDefs.variant.values.map((variant) => (
                                  <ColumnHeaderCell key={variant}>{variant}</ColumnHeaderCell>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {values.map((color) => (
                                <tr key={color}>
                                  <RowHeaderCell>{color}</RowHeaderCell>
                                  {textFieldRootPropDefs.variant.values.map((variant) => (
                                    <td key={variant}>
                                      <TextField.Root
                                        variant={variant}
                                        color={color}
                                        placeholder="Your name"
                                      />
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </React.Fragment>
                      ))}
                    </details>
                  </DocsSection>

                  <DocsSection title="TextArea">
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <ColumnHeaderCell />
                          {textAreaPropDefs.size.values.map((size) => (
                            <ColumnHeaderCell key={size}>size {size}</ColumnHeaderCell>
                          ))}
                          <ColumnHeaderCell>disabled</ColumnHeaderCell>
                          <ColumnHeaderCell>read-only</ColumnHeaderCell>
                        </tr>
                      </thead>
                      <tbody>
                        {textAreaPropDefs.variant.values.map((variant) => (
                          <React.Fragment key={variant}>
                            {[variant, '+ gray'].map((label) => (
                              <tr key={label}>
                                <RowHeaderCell>{label}</RowHeaderCell>
                                {textAreaPropDefs.size.values.map((size) => (
                                  <td key={size}>
                                    <TextArea
                                      mb="2"
                                      size={size}
                                      variant={variant}
                                      color={label === '+ gray' ? 'gray' : undefined}
                                      placeholder="Your feedback"
                                    />
                                    <TextArea
                                      variant={variant}
                                      color={label === '+ gray' ? 'gray' : undefined}
                                      placeholder="Your feedback"
                                      defaultValue="The :autofill CSS pseudo-class matches when an <input> element has its value autofilled by the browser."
                                    />
                                  </td>
                                ))}
                                <td>
                                  <TextArea
                                    mb="2"
                                    disabled
                                    variant={variant}
                                    color={label === '+ gray' ? 'gray' : undefined}
                                    placeholder="Your feedback"
                                  />
                                  <TextArea
                                    disabled
                                    variant={variant}
                                    color={label === '+ gray' ? 'gray' : undefined}
                                    placeholder="Your feedback"
                                    defaultValue="The :autofill CSS pseudo-class matches when an <input> element has its value autofilled by the browser."
                                  />
                                </td>
                                <td>
                                  <TextArea
                                    mb="2"
                                    readOnly
                                    variant={variant}
                                    color={label === '+ gray' ? 'gray' : undefined}
                                    placeholder="Your feedback"
                                  />
                                  <TextArea
                                    readOnly
                                    variant={variant}
                                    color={label === '+ gray' ? 'gray' : undefined}
                                    placeholder="Your feedback"
                                    defaultValue="The :autofill CSS pseudo-class matches when an <input> element has its value autofilled by the browser."
                                  />
                                </td>
                              </tr>
                            ))}
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>

                    <Text as="p" my="5">
                      <Code>resize</Code> can be set per instance:
                    </Text>

                    <details>
                      <summary>
                        <Text size="2" color="gray">
                          See resize examples
                        </Text>
                      </summary>
                      <Box mt="3">
                        <table className={styles.table}>
                          <tbody>
                            {textAreaPropDefs.resize.values.map((resize) => (
                              <tr key={resize}>
                                <RowHeaderCell>{resize}</RowHeaderCell>
                                <td>
                                  <TextArea resize={resize} placeholder="Your feedback" />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </Box>
                    </details>

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
                        <table className={styles.table}>
                          <thead>
                            <tr>
                              <ColumnHeaderCell />
                              {textAreaPropDefs.size.values.map((size) => (
                                <ColumnHeaderCell key={size}>size {size}</ColumnHeaderCell>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {textAreaPropDefs.radius.values.map((radius) => (
                              <tr key={radius}>
                                <RowHeaderCell>{radius}</RowHeaderCell>
                                {textAreaPropDefs.size.values.map((size) => (
                                  <td key={size}>
                                    <TextArea
                                      size={size}
                                      radius={radius}
                                      placeholder="Your feedback"
                                    />
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
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
                        <React.Fragment key={label}>
                          <Text as="p" weight="bold" mt="6" mb="4">
                            {label}
                          </Text>
                          <table className={styles.table}>
                            <thead>
                              <tr>
                                <ColumnHeaderCell />
                                {textAreaPropDefs.variant.values.map((variant) => (
                                  <ColumnHeaderCell key={variant}>{variant}</ColumnHeaderCell>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {values.map((color) => (
                                <tr key={color}>
                                  <RowHeaderCell>{color}</RowHeaderCell>
                                  {textAreaPropDefs.variant.values.map((variant) => (
                                    <td key={variant}>
                                      <TextArea
                                        variant={variant}
                                        color={color}
                                        placeholder="Your name"
                                      />
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </React.Fragment>
                      ))}
                    </details>
                  </DocsSection>

                  <DocsSection title="Badge">
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <ColumnHeaderCell />
                          {badgePropDefs.size.values.map((size) => (
                            <ColumnHeaderCell key={size}>size {size}</ColumnHeaderCell>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {badgePropDefs.variant.values.map((variant) => (
                          <tr key={variant}>
                            <RowHeaderCell>{variant}</RowHeaderCell>
                            {badgePropDefs.size.values.map((size) => (
                              <td key={size}>
                                <Flex key={variant} gap="3" wrap="wrap" style={{ maxWidth: 600 }}>
                                  {(['orange', 'violet', 'cyan', 'gray'] as const).map((color) => (
                                    <Flex key={color} direction="column" gap="1">
                                      <Badge size={size} variant={variant} color={color}>
                                        {upperFirst(color)}
                                      </Badge>
                                    </Flex>
                                  ))}
                                </Flex>
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>

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
                        <table className={styles.table}>
                          <thead>
                            <tr>
                              <ColumnHeaderCell />
                              {badgePropDefs.size.values.map((size) => (
                                <ColumnHeaderCell key={size}>size {size}</ColumnHeaderCell>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {badgePropDefs.radius.values.map((radius) => (
                              <tr key={radius}>
                                <RowHeaderCell>{radius}</RowHeaderCell>
                                {badgePropDefs.size.values.map((size) => (
                                  <td key={size}>
                                    <Badge size={size} radius={radius}>
                                      {upperFirst(radius)}
                                    </Badge>
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
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
                        <React.Fragment key={label}>
                          <Text as="p" weight="bold" mt="6" mb="4">
                            {label}
                          </Text>
                          <table className={styles.table}>
                            <thead>
                              <tr>
                                <ColumnHeaderCell />
                                {badgePropDefs.variant.values.map((variant) => (
                                  <ColumnHeaderCell key={variant}>{variant}</ColumnHeaderCell>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {values.map((color) => (
                                <tr key={color}>
                                  <RowHeaderCell>{color}</RowHeaderCell>
                                  {badgePropDefs.variant.values.map((variant) => (
                                    <td key={variant}>
                                      <Flex direction="column" align="start" gap="1">
                                        <Badge variant={variant} color={color}>
                                          {color}
                                        </Badge>
                                        <Badge variant={variant} color={color} highContrast>
                                          {color}
                                        </Badge>
                                      </Flex>
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </React.Fragment>
                      ))}
                    </details>
                  </DocsSection>

                  <DocsSection title="Avatar">
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <ColumnHeaderCell />
                          <ColumnHeaderCell>image</ColumnHeaderCell>
                          <ColumnHeaderCell>1 letter</ColumnHeaderCell>
                          <ColumnHeaderCell>2 letters</ColumnHeaderCell>
                          <ColumnHeaderCell>icon</ColumnHeaderCell>
                          <ColumnHeaderCell>+ high-contrast</ColumnHeaderCell>
                          <ColumnHeaderCell>gray</ColumnHeaderCell>
                          <ColumnHeaderCell>+ high-contrast</ColumnHeaderCell>
                        </tr>
                      </thead>
                      <tbody>
                        {avatarPropDefs.variant.values.map((variant) => (
                          <tr key={variant}>
                            <RowHeaderCell>{variant}</RowHeaderCell>
                            <td>
                              <Avatar variant={variant} src="./api/avatar" fallback="D" />
                            </td>
                            <td>
                              <Avatar variant={variant} fallback="D" />
                            </td>
                            <td>
                              <Avatar variant={variant} fallback="BG" />
                            </td>
                            <td>
                              <Avatar variant={variant} fallback={<CustomUserIcon />} />
                            </td>
                            <td>
                              <Avatar variant={variant} highContrast fallback="D" />
                            </td>
                            <td>
                              <Avatar variant={variant} color="gray" fallback="D" />
                            </td>
                            <td>
                              <Avatar variant={variant} color="gray" highContrast fallback="D" />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <table className={styles.table}>
                      <tbody>
                        {avatarPropDefs.size.values.map((size) => (
                          <tr key={size}>
                            <RowHeaderCell>{size}</RowHeaderCell>
                            <td>
                              <Flex gap="3">
                                <Avatar size={size} src="./api/avatar" fallback="D" />
                                <Avatar size={size} fallback="D" />
                                <Avatar size={size} fallback="BG" />
                              </Flex>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

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
                        <table className={styles.table}>
                          <thead>
                            <tr>
                              <ColumnHeaderCell />
                              {avatarPropDefs.size.values.map((size) => (
                                <ColumnHeaderCell key={size}>size {size}</ColumnHeaderCell>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {avatarPropDefs.radius.values.map((radius) => (
                              <tr key={radius}>
                                <RowHeaderCell>{radius}</RowHeaderCell>
                                {avatarPropDefs.size.values.map((size) => (
                                  <td key={size}>
                                    <Avatar
                                      size={size}
                                      radius={radius}
                                      src="./api/avatar"
                                      fallback="D"
                                    />
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
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
                        <React.Fragment key={label}>
                          <Text as="p" weight="bold" mt="6" mb="4">
                            {label}
                          </Text>
                          <table className={styles.table}>
                            <thead>
                              <tr>
                                <ColumnHeaderCell />
                                {avatarPropDefs.variant.values.map((variant) => (
                                  <ColumnHeaderCell key={variant}>{variant}</ColumnHeaderCell>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {values.map((color) => (
                                <tr key={color}>
                                  <RowHeaderCell>{color}</RowHeaderCell>
                                  {avatarPropDefs.variant.values.map((variant) => (
                                    <td key={variant}>
                                      <Avatar variant={variant} color={color} fallback="D" />
                                      <Avatar
                                        variant={variant}
                                        color={color}
                                        highContrast
                                        fallback="D"
                                        ml="2"
                                      />
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </React.Fragment>
                      ))}
                    </details>
                  </DocsSection>

                  <DocsSection title="Card">
                    <table className={styles.table}>
                      <tbody>
                        {cardPropDefs.variant.values.map((variant) => (
                          <tr key={variant}>
                            <RowHeaderCell>{variant}</RowHeaderCell>
                            <td>
                              <Flex gap="5">
                                <Card variant={variant}>
                                  <Text as="p" size="2" weight="bold">
                                    Quick start
                                  </Text>
                                  <Text as="p" color="gray" size="2">
                                    Create a proof of concept app
                                  </Text>
                                </Card>

                                <Card variant={variant} asChild>
                                  <a href="#some-page">
                                    <Text as="p" size="2" weight="bold">
                                      Quick start
                                    </Text>
                                    <Text as="p" color="gray" size="2">
                                      Create a proof of concept app
                                    </Text>
                                  </a>
                                </Card>
                              </Flex>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <Grid columns="4" gap="5" my="7" style={{ marginLeft: 124 }}>
                      <div>
                        <Heading>Contacts</Heading>
                        <Text as="p" color="gray" mb="4">
                          Here are all your contacts:
                        </Text>
                        <Flex direction="column" gap="3">
                          {Array.from({ length: 4 }, (_, i) => (
                            <Card key={i} variant="surface" asChild>
                              <a href="#some-page">
                                <Flex align="center" gap="2">
                                  <Avatar src="./api/avatar" fallback="D" />
                                  <div>
                                    <Text as="p" size="2" weight="medium">
                                      Poppy Nichols
                                    </Text>
                                    <Text as="p" color="gray" size="1">
                                      poppy.nichols@gmail.com
                                    </Text>
                                  </div>
                                </Flex>
                              </a>
                            </Card>
                          ))}
                        </Flex>
                      </div>
                      <div>
                        <Heading>Contacts</Heading>
                        <Text as="p" color="gray" mb="4">
                          Here are all your contacts:
                        </Text>
                        <Flex direction="column" gap="3">
                          {Array.from({ length: 4 }, (_, i) => (
                            <Card key={i} variant="classic" asChild>
                              <a href="#some-page">
                                <Flex align="center" gap="2">
                                  <Avatar src="./api/avatar" fallback="D" />
                                  <div>
                                    <Text as="p" size="2" weight="medium">
                                      Poppy Nichols
                                    </Text>
                                    <Text as="p" color="gray" size="1">
                                      poppy.nichols@gmail.com
                                    </Text>
                                  </div>
                                </Flex>
                              </a>
                            </Card>
                          ))}
                        </Flex>
                      </div>
                      <div>
                        <Heading>Contacts</Heading>
                        <Text as="p" color="gray" mb="4">
                          Here are all your contacts:
                        </Text>
                        <Flex direction="column" gap="5">
                          {Array.from({ length: 4 }, (_, i) => (
                            <Card key={i} variant="ghost" asChild>
                              <a href="#some-page">
                                <Flex align="center" gap="2">
                                  <Avatar src="./api/avatar" fallback="D" />
                                  <div>
                                    <Text as="p" size="2" weight="medium">
                                      Poppy Nichols
                                    </Text>
                                    <Text as="p" color="gray" size="1">
                                      poppy.nichols@gmail.com
                                    </Text>
                                  </div>
                                </Flex>
                              </a>
                            </Card>
                          ))}
                        </Flex>
                      </div>
                    </Grid>

                    <table className={styles.table}>
                      <tbody>
                        {cardPropDefs.size.values.map((size) => (
                          <tr key={size}>
                            <RowHeaderCell>size {size}</RowHeaderCell>
                            <td>
                              <Card size={size} style={{ maxWidth: 'fit-content' }}>
                                <Text as="p" size={size} weight="bold" mb={size}>
                                  Typography
                                </Text>
                                <Text as="p" color="gray" size={size} style={{ maxWidth: '40ch' }}>
                                  The goal of typography is to relate font size, line height, and
                                  line width in a proportional way that maximizes beauty and makes
                                  reading easier and more pleasant.
                                </Text>
                              </Card>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </DocsSection>

                  <DocsSection title="Table">
                    <Grid columns="2" gap="5" mb="3">
                      <Flex direction="column" gap="3">
                        <Text color="gray" size="2">
                          surface
                        </Text>
                        <TableExample variant="surface" />
                      </Flex>

                      <Flex direction="column" gap="3">
                        <Text color="gray" size="2">
                          ghost
                        </Text>
                        <TableExample />
                      </Flex>
                    </Grid>

                    <Grid columns="3" gap="5" mt="5">
                      {tableRootPropDefs.size.values.map((size) => (
                        <div key={size}>
                          <Text as="p" color="gray" size="2" mb="3">
                            size {size}
                          </Text>
                          <TableExample size={size} variant="surface" noEmail />
                        </div>
                      ))}
                    </Grid>
                  </DocsSection>

                  <DocsSection title="Typography">
                    <Flex direction="column" gap="5" style={{ maxWidth: 688 }}>
                      <Text as="p" size="3">
                        The CSS rule <Code>-webkit-font-smoothing: antialiased;</Code> has been
                        applied to all fonts.google.com pages where fonts are rendered. This results
                        in browsers using the <Strong>greyscale antialiasing method</Strong> rather
                        than default <Em>subpixel rendering</Em> of fonts. Press <Kbd>⌘ Q</Kbd> to
                        quit.{' '}
                        <Quote>
                          I believe this was probably introduced to get around inconsistencies in
                          rendering between browsers
                        </Quote>
                        , particular between Chrome and Safari on MacOS.
                      </Text>

                      <Heading size="9">
                        The principles of the Typographic Craft are difficult to master
                      </Heading>

                      <Heading size="8">
                        The goal of typography is to relate font size, line height, and line width
                      </Heading>

                      <Heading size="7">
                        The goal of typography is to relate font size, line height, and line width
                        in a proportional way
                      </Heading>

                      <Heading size="6">
                        The goal of typography is to relate font size, line height, and line width
                        in a proportional way
                      </Heading>

                      <Text color="gray" size="5">
                        The goal of typography is to relate font size, line height, and line width
                        in a proportional way that maximizes beauty and makes reading easier and
                        more pleasant.
                      </Text>

                      <Text as="p" size="4">
                        The goal of typography is to relate font size, line height, and line width
                        in a proportional way that maximizes beauty and makes reading easier and
                        more pleasant. The question is: What proportion(s) will give us the best
                        results? The golden ratio is often observed in nature where beauty and
                        utility intersect; perhaps we can use this “divine” proportion to enhance
                        these attributes in our typography.
                      </Text>

                      <Text as="p" size="3" style={{ maxWidth: 600 }}>
                        The goal of typography is to relate font size, line height, and line width
                        in a proportional way that maximizes beauty and makes reading easier and
                        more pleasant. The question is: What proportion(s) will give us the best
                        results? The golden ratio is often observed in nature where beauty and
                        utility intersect; perhaps we can use this “divine” proportion to enhance
                        these attributes in our typography.
                      </Text>

                      <Grid columns="2" gap="5">
                        <Text as="p" size="2" style={{ maxWidth: 400 }}>
                          The goal of typography is to relate font size, line height, and line width
                          in a proportional way that maximizes beauty and makes reading easier and
                          more pleasant. The question is: What proportion(s) will give us the best
                          results? The golden ratio is often observed in nature where beauty and
                          utility intersect; perhaps we can use this “divine” proportion to enhance
                          these attributes in our typography.
                        </Text>

                        <Text as="p" size="1" style={{ maxWidth: 400 }}>
                          The goal of typography is to relate font size, line height, and line width
                          in a proportional way that maximizes beauty and makes reading easier and
                          more pleasant. The question is: What proportion(s) will give us the best
                          results? The golden ratio is often observed in nature where beauty and
                          utility intersect; perhaps we can use this “divine” proportion to enhance
                          these attributes in our typography.
                        </Text>
                      </Grid>

                      <Separator size="3" my="5" />

                      <Flex gap="4" mb="5">
                        <Link color="purple" href="/">
                          This is a link
                        </Link>
                        <Link color="gray" href="/">
                          This is a link
                        </Link>
                        <Link color="green" href="/">
                          This is a link
                        </Link>
                        <Link color="red" href="/">
                          This is a link
                        </Link>
                        <Link color="yellow" href="/">
                          This is a link
                        </Link>
                        <Link color="blue" href="/">
                          This is a link
                        </Link>
                      </Flex>
                      <Flex gap="4" mb="5">
                        <Link color="purple" highContrast href="/">
                          This is a link
                        </Link>
                        <Link color="gray" highContrast href="/">
                          This is a link
                        </Link>
                        <Link color="green" highContrast href="/">
                          This is a link
                        </Link>
                        <Link color="red" highContrast href="/">
                          This is a link
                        </Link>
                        <Link color="yellow" highContrast href="/">
                          This is a link
                        </Link>
                        <Link color="blue" highContrast href="/">
                          This is a link
                        </Link>
                      </Flex>

                      <Separator size="3" my="5" />

                      <Box style={{ width: '55%' }}>
                        <Heading size="5" mb="2">
                          The principles of the Typographic Craft are difficult to master
                        </Heading>
                        <Text as="p" size="4">
                          The goal of typography is to relate font size, line height, and line width
                          in a proportional way that maximizes beauty and makes reading easier and
                          more pleasant.
                        </Text>
                      </Box>

                      <Grid columns="2" gap="5" mb="7">
                        <Box>
                          <Heading size="4" mb="2">
                            The principles of the Typographic Craft are difficult to master
                          </Heading>
                          <Text as="p" size="3">
                            The goal of typography is to relate font size, line height, and line
                            width in a proportional way that maximizes beauty and makes reading
                            easier and more pleasant.
                          </Text>
                        </Box>
                        <Box>
                          <Heading size="3" mb="2">
                            The principles of the Typographic Craft are difficult to master
                          </Heading>
                          <Text as="p" size="2">
                            The goal of typography is to relate font size, line height, and line
                            width in a proportional way that maximizes beauty and makes reading
                            easier and more pleasant.
                          </Text>
                        </Box>
                      </Grid>

                      <Grid columns="3" gap="5">
                        <Box>
                          <Heading size="2" mb="1">
                            The principles of the Typographic Craft are difficult to master
                          </Heading>
                          <Text as="p" size="2">
                            The goal of typography is to relate font size, line height, and line
                            width in a proportional way that maximizes beauty and makes reading
                            easier and more pleasant.
                          </Text>
                        </Box>
                        <Box>
                          <Heading size="2" mb="1">
                            The principles of the Typographic Craft are difficult to master
                          </Heading>
                          <Text as="p" size="1">
                            The goal of typography is to relate font size, line height, and line
                            width in a proportional way that maximizes beauty and makes reading
                            easier and more pleasant.
                          </Text>
                        </Box>
                        <Box>
                          <Heading size="1" mb="1">
                            The principles of the Typographic Craft are difficult to master
                          </Heading>
                          <Text as="p" size="1">
                            The goal of typography is to relate font size, line height, and line
                            width in a proportional way that maximizes beauty and makes reading
                            easier and more pleasant.
                          </Text>
                        </Box>
                      </Grid>

                      <Separator size="3" my="5" />

                      <Grid columns="2" gap="5">
                        <Box style={{ maxWidth: 250 }}>
                          <Text as="p" size="1" weight="bold">
                            Quick Look
                          </Text>
                          <Text as="p" color="gray" size="1">
                            Extensions from added software
                          </Text>
                        </Box>
                        <Box style={{ maxWidth: 250 }}>
                          <Text as="p" size="2" weight="bold">
                            Quick Look
                          </Text>
                          <Text as="p" color="gray" size="1">
                            Extensions from added software
                          </Text>
                        </Box>
                      </Grid>
                      <Grid columns="2" gap="5">
                        <Box style={{ maxWidth: 250 }}>
                          <Text as="p" size="2" weight="bold">
                            Quick Look
                          </Text>
                          <Text as="p" color="gray" size="2">
                            Extensions from added software
                          </Text>
                        </Box>
                        <Box style={{ maxWidth: 250 }}>
                          <Text as="p" size="3" weight="bold">
                            Quick Look
                          </Text>
                          <Text as="p" color="gray" size="2">
                            Extensions from added software
                          </Text>
                        </Box>
                      </Grid>

                      <Separator size="3" my="5" />

                      <Grid columns="2" gap="5">
                        <Box style={{ maxWidth: 250 }}>
                          <Text as="p" size="1" weight="bold">
                            Quick Look
                          </Text>
                          <Text as="p" color="gray" size="1">
                            Extensions from added software for something to do with Apple Finder.
                          </Text>
                        </Box>
                        <Box style={{ maxWidth: 250 }}>
                          <Text as="p" size="2" weight="bold">
                            Quick Look
                          </Text>
                          <Text as="p" color="gray" size="1">
                            Extensions from added software for something to do with Apple Finder.
                          </Text>
                        </Box>
                      </Grid>

                      <Grid columns="2" gap="5">
                        <Box style={{ maxWidth: 250 }}>
                          <Text as="p" size="2" weight="bold">
                            Quick Look
                          </Text>
                          <Text as="p" color="gray" size="2">
                            Extensions from added software for something to do with Apple Finder.
                          </Text>
                        </Box>
                        <Box style={{ maxWidth: 250 }}>
                          <Text as="p" size="3" weight="bold">
                            Quick Look
                          </Text>
                          <Text as="p" color="gray" size="2">
                            Extensions from added software for something to do with Apple Finder.
                          </Text>
                        </Box>
                      </Grid>

                      <Separator size="3" my="5" />

                      <Grid columns="2" gap="5">
                        <Box style={{ maxWidth: 250, textAlign: 'center' }}>
                          <Button variant="solid" size="1" mb="1">
                            Quick Look
                          </Button>
                          <Text as="p" color="gray" size="1">
                            Verification needed
                          </Text>
                        </Box>
                        <Box style={{ maxWidth: 250, textAlign: 'center' }}>
                          <Button variant="solid" size="2" mb="1">
                            Quick Look
                          </Button>
                          <Text as="p" color="gray" size="1">
                            Verification needed
                          </Text>
                        </Box>
                        <Box style={{ maxWidth: 250, textAlign: 'center' }}>
                          <Button variant="solid" size="1" mb="1">
                            Quick Look
                          </Button>
                          <Text as="p" color="gray" size="2">
                            Verification needed
                          </Text>
                        </Box>
                        <Box style={{ maxWidth: 250, textAlign: 'center' }}>
                          <Button variant="solid" size="2" mb="1">
                            Quick Look
                          </Button>
                          <Text as="p" color="gray" size="2">
                            Verification needed
                          </Text>
                        </Box>
                      </Grid>

                      <Separator size="3" my="5" />

                      <Blockquote>
                        The CSS rule <Code>-webkit-font-smoothing: antialiased;</Code> has been
                        applied to all fonts.google.com pages where fonts are rendered. This results
                        in browsers using the <strong>greyscale antialiasing method</strong> rather
                        than default <Em>subpixel rendering</Em> of fonts. Press <Kbd>⌘ Q</Kbd> to
                        quit.{' '}
                        <Quote>
                          I believe this was probably introduced to get around inconsistencies in
                          rendering between browsers
                        </Quote>
                        , particular between Chrome and Safari on MacOS.
                      </Blockquote>
                    </Flex>
                  </DocsSection>

                  <DocsSection title="Text">
                    <Flex direction="column" gap="4">
                      {textPropDefs.size.values
                        .slice()
                        .reverse()
                        .map((size) => (
                          <Text key={size} size={size}>
                            The quick brown fox jumped{Number(size) < 9 && ' over the lazy dog'}
                          </Text>
                        ))}
                    </Flex>

                    <Flex direction="column" gap="5" mt="8">
                      <Flex gap="5">
                        {(['red', 'yellow', 'green', 'gray'] as const).map((color) => (
                          <Flex key={color} direction="column" gap="1">
                            <Text color={color}>{upperFirst(color)}</Text>
                            <Text color={color} highContrast>
                              {upperFirst(color)}
                            </Text>
                          </Flex>
                        ))}
                      </Flex>

                      <Text as="p" color="red" highContrast>
                        This is some red text in high-contrast and this{' '}
                        <Text color="blue">word</Text> should be blue.
                      </Text>

                      <Text as="p" color="red">
                        This is some red text and this <Text highContrast>word</Text> should be in
                        high-contrast.
                      </Text>
                    </Flex>
                  </DocsSection>

                  <DocsSection title="Code">
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <ColumnHeaderCell />
                          <ColumnHeaderCell>color</ColumnHeaderCell>
                          <ColumnHeaderCell>+ high-contrast</ColumnHeaderCell>
                          <ColumnHeaderCell>gray</ColumnHeaderCell>
                          <ColumnHeaderCell>+ high-contrast</ColumnHeaderCell>
                        </tr>
                      </thead>
                      <tbody>
                        {codePropDefs.variant.values.map((variant) => (
                          <tr key={variant}>
                            <RowHeaderCell>{variant}</RowHeaderCell>
                            <td>
                              <Code variant={variant}>console.log()</Code>
                            </td>
                            <td>
                              <Code variant={variant} highContrast>
                                console.log()
                              </Code>
                            </td>
                            <td>
                              <Code variant={variant} color="gray">
                                console.log()
                              </Code>
                            </td>
                            <td>
                              <Code variant={variant} color="gray" highContrast>
                                console.log()
                              </Code>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <Grid columns="400px 400px" gap="5" my="7">
                      {codePropDefs.variant.values.map((variant) => (
                        <Text as="p" size="3" key={variant}>
                          The CSS rule <Code variant={variant}>antialiased</Code> has been applied
                          to all fonts.google.com pages where fonts are rendered. This results in
                          browsers using the <Strong>greyscale antialiasing method</Strong> rather
                          than default <Em>subpixel rendering</Em> of fonts. Press <Kbd>⌘ Q</Kbd> to
                          quit.{' '}
                          <Quote>
                            I believe this was probably introduced to get around inconsistencies in
                            rendering between browsers
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
                          HTML element displays its contents styled in a fashion intended to
                          indicate that the text is a short fragment of computer code.
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
                        <React.Fragment key={label}>
                          <Text as="p" weight="bold" mt="6" mb="4">
                            {label}
                          </Text>
                          <table className={styles.table}>
                            <thead>
                              <tr>
                                <ColumnHeaderCell />
                                {codePropDefs.variant.values.map((variant) => (
                                  <ColumnHeaderCell key={variant}>{variant}</ColumnHeaderCell>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {values.map((color) => (
                                <tr key={color}>
                                  <RowHeaderCell>{color}</RowHeaderCell>
                                  {codePropDefs.variant.values.map((variant) => (
                                    <td key={variant}>
                                      <Code variant={variant} color={color}>
                                        console.log()
                                      </Code>
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </React.Fragment>
                      ))}
                    </details>
                  </DocsSection>

                  <DocsSection title="Heading">
                    <Flex direction="column" gap="4">
                      {headingPropDefs.size.values
                        .slice()
                        .reverse()
                        .map((size) => (
                          <Heading key={size} size={size}>
                            The quick brown fox jumped{Number(size) < 9 && ' over the lazy dog'}
                          </Heading>
                        ))}

                      <Flex direction="column" gap="6" mt="5">
                        <Heading size="9" style={{ width: '50%' }}>
                          Principles of the Typographic Craft
                        </Heading>
                        <Heading size="8" style={{ width: '40%' }}>
                          Principles of the Typographic Craft
                        </Heading>
                        <Heading size="7" style={{ width: '30%' }}>
                          Principles of the Typographic Craft
                        </Heading>
                        <Heading size="6" style={{ width: '25%' }}>
                          Principles of the Typographic Craft
                        </Heading>
                        <Heading size="5" style={{ width: '20%' }}>
                          Principles of the Typographic Craft
                        </Heading>
                        <Heading size="4" style={{ width: '15%' }}>
                          Principles of the Typographic Craft
                        </Heading>
                        <Heading size="3" style={{ width: '15%' }}>
                          Principles of the Typographic Craft
                        </Heading>
                        <Heading size="2" style={{ width: '15%' }}>
                          Principles of the Typographic Craft
                        </Heading>
                        <Heading size="1" style={{ width: '10%' }}>
                          Principles of the Typographic Craft
                        </Heading>
                      </Flex>
                    </Flex>

                    <Flex direction="column" gap="5" mt="8">
                      <Flex gap="5">
                        {(['red', 'yellow', 'green', 'gray'] as const).map((color) => (
                          <Flex key={color} direction="column" gap="1">
                            <Heading color={color}>{upperFirst(color)}</Heading>
                            <Heading color={color} highContrast>
                              {upperFirst(color)}
                            </Heading>
                          </Flex>
                        ))}
                      </Flex>

                      <Heading color="red" highContrast>
                        This is some red text in high-contrast and this{' '}
                        <Text color="blue">word</Text> should be blue.
                      </Heading>

                      <Heading color="red">
                        This is some red text and this <Text highContrast>word</Text> should be in
                        high-contrast.
                      </Heading>
                    </Flex>
                  </DocsSection>

                  <DocsSection title="Link">
                    <Flex gap="4" mb="5">
                      <Link color="purple" href="/">
                        This is a link
                      </Link>
                      <Link color="gray" href="/">
                        This is a link
                      </Link>
                      <Link color="green" href="/">
                        This is a link
                      </Link>
                      <Link color="red" href="/">
                        This is a link
                      </Link>
                      <Link color="yellow" href="/">
                        This is a link
                      </Link>
                      <Link color="blue" href="/">
                        This is a link
                      </Link>

                      <Text as="p" color="gray">
                        <Link href="/">This is a link</Link>
                      </Text>
                    </Flex>
                    <Flex gap="4" mb="5">
                      <Link color="purple" highContrast href="/">
                        This is a link
                      </Link>
                      <Link color="gray" highContrast href="/">
                        This is a link
                      </Link>
                      <Link color="green" highContrast href="/">
                        This is a link
                      </Link>
                      <Link color="red" highContrast href="/">
                        This is a link
                      </Link>
                      <Link color="yellow" highContrast href="/">
                        This is a link
                      </Link>
                      <Link color="blue" highContrast href="/">
                        This is a link
                      </Link>
                    </Flex>

                    <Flex direction="column" align="start" gap="4" mb="5">
                      {linkPropDefs.size.values
                        .slice()
                        .reverse()
                        .map((size) => (
                          <Link key={size} href="/" size={size}>
                            This is a link
                          </Link>
                        ))}

                      <Flex align="center" gap="1" asChild>
                        <Link color="purple" href="/" size="3">
                          This is a link
                          <ArrowTopRightIcon />
                        </Link>
                      </Flex>

                      <Flex align="center" gap="1" asChild>
                        <Link color="gray" href="/" size="3">
                          This is a link
                          <ArrowTopRightIcon />
                        </Link>
                      </Flex>

                      <Text as="p" size="6">
                        Single Sign-On (SSO) is the most frequently asked for requirement by
                        enterprise organizations looking to adopt new SaaS applications. SSO enables
                        authentication via an organization’s Identity Provider (IdP), such as Google
                        Workspace or Okta, as opposed to users or <Link href="/">IT admins</Link>{' '}
                        managing hundreds, if not thousands, of usernames and passwords. Facilitate
                        greater security, easier account management, and accelerated application
                        onboarding and adoption by <Link href="/">adding SSO to your app</Link>.
                      </Text>

                      <Text as="p" size="6">
                        Single Sign-On (SSO) is the most frequently asked for requirement by
                        enterprise organizations looking to adopt new SaaS applications. SSO enables
                        authentication via an organization’s Identity Provider (IdP), such as Google
                        Workspace or Okta, as opposed to users or <Link href="/">IT admins</Link>{' '}
                        managing hundreds, if not thousands, of usernames and passwords. Facilitate
                        greater security, easier account management, and accelerated application
                        onboarding and adoption by <Link href="/">adding SSO to your app</Link>.
                      </Text>

                      <Separator size="3" my="5" />

                      <Text as="p" color="gray" size="6">
                        Single Sign-On (SSO) is the most frequently asked for requirement by
                        enterprise organizations looking to adopt new SaaS applications. SSO enables
                        authentication via an organization’s Identity Provider (IdP), such as Google
                        Workspace or Okta, as opposed to users or <Link href="/">IT admins</Link>{' '}
                        managing hundreds, if not thousands, of usernames and passwords. Facilitate
                        greater security, easier account management, and accelerated application
                        onboarding and adoption by <Link href="/">adding SSO to your app</Link>.
                      </Text>

                      <Text as="p" color="purple" size="6">
                        Single Sign-On (SSO) is the most frequently asked for requirement by
                        enterprise organizations looking to adopt new SaaS applications. SSO enables
                        authentication via an organization’s Identity Provider (IdP), such as Google
                        Workspace or Okta, as opposed to users or <Link href="/">IT admins</Link>{' '}
                        managing hundreds, if not thousands, of usernames and passwords. Facilitate
                        greater security, easier account management, and accelerated application
                        onboarding and adoption by <Link href="/">adding SSO to your app</Link>.
                      </Text>

                      <Text as="p" color="blue" size="6">
                        Single Sign-On (SSO) is the most frequently asked for requirement by
                        enterprise organizations looking to adopt new SaaS applications. SSO enables
                        authentication via an organization’s Identity Provider (IdP), such as Google
                        Workspace or Okta, as opposed to users or <Link href="/">IT admins</Link>{' '}
                        managing hundreds, if not thousands, of usernames and passwords. Facilitate
                        greater security, easier account management, and accelerated application
                        onboarding and adoption by <Link href="/">adding SSO to your app</Link>.
                      </Text>

                      <Text as="p" color="green" size="6">
                        Single Sign-On (SSO) is the most frequently asked for requirement by
                        enterprise organizations looking to adopt new SaaS applications. SSO enables
                        authentication via an organization’s Identity Provider (IdP), such as Google
                        Workspace or Okta, as opposed to users or <Link href="/">IT admins</Link>{' '}
                        managing hundreds, if not thousands, of usernames and passwords. Facilitate
                        greater security, easier account management, and accelerated application
                        onboarding and adoption by <Link href="/">adding SSO to your app</Link>.
                      </Text>

                      <Text as="p" color="yellow" size="6">
                        Single Sign-On (SSO) is the most frequently asked for requirement by
                        enterprise organizations looking to adopt new SaaS applications. SSO enables
                        authentication via an organization’s Identity Provider (IdP), such as Google
                        Workspace or Okta, as opposed to users or <Link href="/">IT admins</Link>{' '}
                        managing hundreds, if not thousands, of usernames and passwords. Facilitate
                        greater security, easier account management, and accelerated application
                        onboarding and adoption by <Link href="/">adding SSO to your app</Link>.
                      </Text>

                      <Text as="p" color="red" size="6">
                        Single Sign-On (SSO) is the most frequently asked for requirement by
                        enterprise organizations looking to adopt new SaaS applications. SSO enables
                        authentication via an organization’s Identity Provider (IdP), such as Google
                        Workspace or Okta, as opposed to users or <Link href="/">IT admins</Link>{' '}
                        managing hundreds, if not thousands, of usernames and passwords. Facilitate
                        greater security, easier account management, and accelerated application
                        onboarding and adoption by <Link href="/">adding SSO to your app</Link>.
                      </Text>
                    </Flex>
                  </DocsSection>

                  <DocsSection title="Blockquote">
                    <Flex direction="column" align="start" gap="5">
                      <Blockquote size="6" style={{ maxWidth: '50ch' }}>
                        The goal of typography is to relate font size, line height, and line width
                        in a proportional way that maximizes beauty and makes reading easier and
                        more pleasant. The question is: What proportion(s) will give us the best
                        results?
                      </Blockquote>

                      <Blockquote size="4" style={{ maxWidth: '50ch' }} color="gray" highContrast>
                        The goal of typography is to relate font size, line height, and line width
                        in a proportional way that maximizes <Text color="pink">beauty</Text> and
                        makes reading easier and more pleasant. The question is: What proportion(s)
                        will give us the best results?
                      </Blockquote>

                      <Blockquote size="2" style={{ maxWidth: '50ch' }} color="blue">
                        The goal of typography is to relate font size, line height, and line width
                        in a proportional way that maximizes <Text highContrast>beauty</Text> and
                        makes reading easier and more pleasant. The question is: What proportion(s)
                        will give us the best results?
                      </Blockquote>
                    </Flex>
                  </DocsSection>

                  <DocsSection title="Callout">
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <ColumnHeaderCell />
                          <ColumnHeaderCell>default</ColumnHeaderCell>
                          <ColumnHeaderCell>+ high-contrast</ColumnHeaderCell>
                        </tr>
                      </thead>
                      <tbody>
                        {calloutRootPropDefs.variant.values.map((variant) => (
                          <tr key={variant}>
                            <RowHeaderCell>{variant}</RowHeaderCell>
                            <td style={{ width: 450 }}>
                              <Callout.Root variant={variant}>
                                <Callout.Icon>
                                  <InfoCircledIcon />
                                </Callout.Icon>
                                <Callout.Text>
                                  We have detected multiple issues in your application configuration
                                  file. Please read our <Link href="/">Configuration Guide</Link>{' '}
                                  for more details.
                                </Callout.Text>
                              </Callout.Root>
                            </td>
                            <td style={{ width: 450 }}>
                              <Callout.Root variant={variant} highContrast>
                                <Callout.Icon>
                                  <InfoCircledIcon />
                                </Callout.Icon>
                                <Callout.Text>
                                  We have detected multiple issues in your application configuration
                                  file. Please read our <Link href="/">Configuration Guide</Link>{' '}
                                  for more details.
                                </Callout.Text>
                              </Callout.Root>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <table className={styles.table}>
                      <tbody>
                        {calloutRootPropDefs.size.values.map((size) => (
                          <tr key={size}>
                            <RowHeaderCell>size {size}</RowHeaderCell>
                            <td style={{ width: 450 }}>
                              <Callout.Root size={size}>
                                <Callout.Icon>
                                  <InfoCircledIcon
                                    width={size === '3' ? 20 : 15}
                                    height={size === '3' ? 20 : 15}
                                  />
                                </Callout.Icon>
                                <Callout.Text>
                                  We have detected multiple issues in your application configuration
                                  file. Please read our <Link href="/">Configuration Guide</Link>{' '}
                                  for more details.
                                </Callout.Text>
                              </Callout.Root>
                            </td>
                            <td style={{ width: 450 }}>
                              <Callout.Root size={size}>
                                <Callout.Icon>
                                  <InfoCircledIcon
                                    width={size === '3' ? 20 : 15}
                                    height={size === '3' ? 20 : 15}
                                  />
                                </Callout.Icon>
                                <Callout.Text>
                                  There was an error in your configuration.
                                </Callout.Text>
                              </Callout.Root>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

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
                        <React.Fragment key={label}>
                          <Text as="p" weight="bold" mt="6" mb="4">
                            {label}
                          </Text>
                          <table className={styles.table}>
                            <thead>
                              <tr>
                                <ColumnHeaderCell />
                                {calloutRootPropDefs.variant.values.map((variant) => (
                                  <ColumnHeaderCell key={variant}>{variant}</ColumnHeaderCell>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {values.map((color) => (
                                <tr key={color}>
                                  <RowHeaderCell>{color}</RowHeaderCell>
                                  {calloutRootPropDefs.variant.values.map((variant) => (
                                    <td key={variant}>
                                      <Flex direction="column" align="start" gap="2">
                                        <Callout.Root variant={variant} color={color}>
                                          <Callout.Icon>
                                            <InfoCircledIcon />
                                          </Callout.Icon>
                                          <Flex gap="3">
                                            <Callout.Text>
                                              We have detected multiple issues in your application
                                              configuration file. Please read our{' '}
                                              <Link href="/">Configuration Guide</Link> for more
                                              details.
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
                                            We have detected multiple issues in your application
                                            configuration file. Please read our{' '}
                                            <Link href="/">Configuration Guide</Link> for more
                                            details.
                                          </Callout.Text>
                                        </Callout.Root>
                                      </Flex>
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </React.Fragment>
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
                          <React.Fragment key={size}>
                            <Callout.Root size={size}>
                              <Callout.Text trim="both">
                                We have detected multiple issues in your application configuration
                                file. Please read our <Link href="/">Configuration Guide</Link> for
                                more details.
                              </Callout.Text>
                            </Callout.Root>

                            <Callout.Root size={size}>
                              <Callout.Text trim="start">
                                There was an error in your configuration.
                              </Callout.Text>
                              <Callout.Text trim="end">
                                We have detected multiple issues in your application configuration
                                file. Please read our <Link href="/">Configuration Guide</Link> for
                                more details.
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
                                We have detected multiple issues in your application configuration
                                file. Please read our <Link href="/">Configuration Guide</Link> for
                                more details.
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
                                We have detected multiple issues in your application configuration
                                file. Please read our <Link href="/">Configuration Guide</Link> for
                                more details.
                              </Callout.Text>
                            </Callout.Root>

                            <Separator />
                          </React.Fragment>
                        ))}
                      </Flex>
                    </details>
                  </DocsSection>

                  <DocsSection title="Kbd">
                    <Flex gap="4">
                      <Kbd asChild>
                        <button>Enter</button>
                      </Kbd>
                      <Kbd asChild>
                        <button>Tab</button>
                      </Kbd>
                      <Kbd asChild>
                        <button>Shift + Tab</button>
                      </Kbd>
                    </Flex>

                    <Flex align="start" direction="column" gap="4" mt="7">
                      {kbdPropDefs.size.values
                        .slice()
                        .reverse()
                        .map((size) => (
                          <Flex key={size}>
                            <Kbd size={size} style={{ marginRight: '0.5em' }}>
                              /
                            </Kbd>
                            <Kbd size={size} style={{ marginRight: '0.5em' }}>
                              X
                            </Kbd>
                            <Kbd size={size} style={{ marginRight: '0.5em' }}>
                              ⇧ ⌘ V
                            </Kbd>
                          </Flex>
                        ))}
                    </Flex>
                  </DocsSection>

                  <React.Suspense fallback={null}>
                    <DocsSection title="Tab Nav">
                      <table className={styles.table}>
                        <tbody>
                          {tabsListPropDefs.size.values.map((size) => (
                            <tr key={size}>
                              <RowHeaderCell>size {size}</RowHeaderCell>
                              <td>
                                <TabNavDemo size={size} />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <Text as="p" my="5">
                        <Code>color</Code> can be set per instance:
                      </Text>
                      <details>
                        <summary>
                          <Text size="2" color="gray">
                            See color combinations
                          </Text>
                        </summary>
                        <Grid gap="5" columns="3" align="center">
                          {tabsListPropDefs.color.values.map((color, i) => (
                            <React.Fragment key={color}>
                              <Text>{color}</Text>
                              <Flex>
                                <TabNavDemo size="1" color={color} />
                              </Flex>
                              <Flex>
                                <TabNavDemo size="1" color={color} highContrast />
                              </Flex>
                            </React.Fragment>
                          ))}
                        </Grid>
                      </details>
                    </DocsSection>
                  </React.Suspense>

                  <DocsSection title="Tabs">
                    <table className={styles.table}>
                      <tbody>
                        {tabsListPropDefs.size.values.map((size) => (
                          <tr key={size}>
                            <RowHeaderCell>size {size}</RowHeaderCell>
                            <td>
                              <Tabs.Root defaultValue="account" activationMode="manual">
                                <Tabs.List size={size}>
                                  <Tabs.Trigger value="account">Account</Tabs.Trigger>
                                  <Tabs.Trigger value="documents">Documents</Tabs.Trigger>
                                  <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
                                </Tabs.List>
                                <Tabs.Content value="account">
                                  <Box py="5">Account</Box>
                                </Tabs.Content>
                                <Tabs.Content value="documents">
                                  <Box py="5">Documents</Box>
                                </Tabs.Content>
                                <Tabs.Content value="settings">
                                  <Box py="5">Settings</Box>
                                </Tabs.Content>
                              </Tabs.Root>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <Text as="p" my="5">
                      <Code>color</Code> can be set per instance:
                    </Text>
                    <details>
                      <summary>
                        <Text size="2" color="gray">
                          See color combinations
                        </Text>
                      </summary>
                      <Grid gap="5" columns="3" align="center">
                        {tabsListPropDefs.color.values.map((color, i) => (
                          <React.Fragment key={color}>
                            <Text>{color}</Text>
                            <Flex>
                              <Tabs.Root defaultValue="account" activationMode="manual">
                                <Tabs.List size="1" color={color}>
                                  <Tabs.Trigger value="account">Account</Tabs.Trigger>
                                  <Tabs.Trigger value="documents">Documents</Tabs.Trigger>
                                  <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
                                </Tabs.List>
                                <Tabs.Content value="account">
                                  <Box py="5">Account</Box>
                                </Tabs.Content>
                                <Tabs.Content value="documents">
                                  <Box py="5">Documents</Box>
                                </Tabs.Content>
                                <Tabs.Content value="settings">
                                  <Box py="5">Settings</Box>
                                </Tabs.Content>
                              </Tabs.Root>
                            </Flex>
                            <Flex>
                              <Tabs.Root defaultValue="account" activationMode="manual">
                                <Tabs.List size="1" color={color} highContrast>
                                  <Tabs.Trigger value="account">Account</Tabs.Trigger>
                                  <Tabs.Trigger value="documents">Documents</Tabs.Trigger>
                                  <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
                                </Tabs.List>
                                <Tabs.Content value="account">
                                  <Box py="5">Account</Box>
                                </Tabs.Content>
                                <Tabs.Content value="documents">
                                  <Box py="5">Documents</Box>
                                </Tabs.Content>
                                <Tabs.Content value="settings">
                                  <Box py="5">Settings</Box>
                                </Tabs.Content>
                              </Tabs.Root>
                            </Flex>
                          </React.Fragment>
                        ))}
                      </Grid>
                    </details>
                    <details>
                      <summary>
                        <Text size="2" color="gray">
                          See wrap & justify options
                        </Text>
                      </summary>

                      {tabsListPropDefs.wrap.values.map((wrap) => (
                        <Flex key={wrap} gap="6">
                          {tabsListPropDefs.justify.values.map((justify) => (
                            <Box py="5" width="320px" key={justify}>
                              <Tabs.Root defaultValue="file" activationMode="manual">
                                <Tabs.List size="1" wrap={wrap} justify={justify}>
                                  <Tabs.Trigger value="file">File</Tabs.Trigger>
                                  <Tabs.Trigger value="edit">Edit</Tabs.Trigger>
                                  <Tabs.Trigger value="view">View</Tabs.Trigger>
                                  <Tabs.Trigger value="history">History</Tabs.Trigger>
                                  <Tabs.Trigger value="bookmarks">Bookmarks</Tabs.Trigger>
                                  <Tabs.Trigger value="profiles">Profiles</Tabs.Trigger>
                                  <Tabs.Trigger value="tab">Tab</Tabs.Trigger>
                                  <Tabs.Trigger value="window">Window</Tabs.Trigger>
                                  <Tabs.Trigger value="help">Help</Tabs.Trigger>
                                </Tabs.List>
                              </Tabs.Root>
                            </Box>
                          ))}
                        </Flex>
                      ))}
                    </details>
                  </DocsSection>

                  <DocsSection title="AspectRatio">
                    <Grid gap="5" columns="4">
                      <div>
                        <Text as="p" size="1" color="gray" mb="2">
                          1x2
                        </Text>
                        <AspectRatio ratio={1 / 2}>{aspectRatioImage}</AspectRatio>
                      </div>
                      <div>
                        <Text as="p" size="1" color="gray" mb="2">
                          1x1
                        </Text>
                        <AspectRatio>{aspectRatioImage}</AspectRatio>
                      </div>
                      <div>
                        <Text as="p" size="1" color="gray" mb="2">
                          16x9
                        </Text>
                        <AspectRatio ratio={16 / 9}>{aspectRatioImage}</AspectRatio>
                      </div>
                      <div>
                        <Text as="p" size="1" color="gray" mb="2">
                          2x1
                        </Text>
                        <AspectRatio ratio={2 / 1}>{aspectRatioImage}</AspectRatio>
                      </div>
                    </Grid>
                  </DocsSection>

                  <DocsSection title="ScrollArea">
                    <Box style={{ width: 300, height: 350 }} mb="6">
                      <ScrollArea>
                        <Box
                          mb="3"
                          style={{
                            height: 200,
                            width: 600,
                            backgroundColor: 'var(--accent-3)',
                          }}
                        />
                        <Text as="p">
                          The goal of typography is to relate font size, line height, and line width
                          in a proportional way that maximizes beauty and makes reading easier and
                          more pleasant. The question is: What proportion(s) will give us the best
                          results? The golden ratio is often observed in nature where beauty and
                          utility intersect; perhaps we can use this “divine” proportion to enhance
                          these attributes in our typography.
                        </Text>
                        <Box style={{ width: 300 }} my="3">
                          <AspectRatio ratio={16 / 9}>{aspectRatioImage}</AspectRatio>
                        </Box>
                        <Text as="p" size="3">
                          The CSS rule <Code>-webkit-font-smoothing: antialiased;</Code> has been
                          applied to all fonts.google.com pages where fonts are rendered. This
                          results in browsers using the{' '}
                          <Strong>greyscale antialiasing method</Strong> rather than default{' '}
                          <Em>subpixel rendering</Em> of fonts. Press <Kbd>⌘ Q</Kbd> to quit.{' '}
                          <Quote>
                            I believe this was probably introduced to get around inconsistencies in
                            rendering between browsers
                          </Quote>
                          , particular between Chrome and Safari on MacOS.
                        </Text>
                        <Box style={{ width: 300 }}>
                          <AspectRatio ratio={1}>
                            <img
                              src="https://images.unsplash.com/photo-1683122803696-b3da13b071b2?&auto=format&fit=crop&w=400&q=80"
                              alt="A dragonfly on a branch"
                              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                            />
                          </AspectRatio>
                        </Box>
                      </ScrollArea>
                    </Box>

                    <table className={styles.table}>
                      <tbody>
                        {scrollAreaPropDefs.size.values.map((size) => (
                          <tr key={size}>
                            <RowHeaderCell>size {size}</RowHeaderCell>
                            <td>
                              <Box style={{ width: 200, height: 20 }}>
                                <ScrollArea type="always" size={size} scrollbars="horizontal">
                                  <Box style={{ width: 600, height: '100%' }} />
                                </ScrollArea>
                              </Box>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

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
                        <table className={styles.table}>
                          <thead>
                            <tr>
                              <ColumnHeaderCell />
                              {scrollAreaPropDefs.size.values.map((size) => (
                                <ColumnHeaderCell key={size}>size {size}</ColumnHeaderCell>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {scrollAreaPropDefs.radius.values.map((radius) => (
                              <tr key={radius}>
                                <RowHeaderCell>{radius}</RowHeaderCell>
                                {scrollAreaPropDefs.size.values.map((size) => (
                                  <td key={size}>
                                    <Box style={{ width: 200, height: 20 }}>
                                      <ScrollArea
                                        type="always"
                                        radius={radius}
                                        size={size}
                                        scrollbars="horizontal"
                                      >
                                        <Box style={{ width: 600, height: '100%' }} />
                                      </ScrollArea>
                                    </Box>
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </Box>
                    </details>
                  </DocsSection>

                  <DocsSection title="Playground">
                    <Text as="p" mb="5">
                      In this section, I am just throwing together some of the components to get a
                      sense of how harmonious they are.
                    </Text>
                    <Flex gap="9">
                      {textFieldRootPropDefs.size.values.map((size) => (
                        <PlaygroundForm
                          key={size}
                          size={size}
                          style={{ width: (Number(size) + 1) * 100 }}
                        />
                      ))}
                    </Flex>

                    <Card size="4" style={{ width: 400 }} mt="3">
                      <PlaygroundForm size="2" />
                    </Card>
                  </DocsSection>

                  <DocsSection title="Nested appearances test">
                    <SampleNestedUI title="Global appearance">
                      <Theme asChild appearance="dark">
                        <SampleNestedUI title="Always dark">
                          <Theme asChild appearance="light">
                            <SampleNestedUI title="Always light">
                              <Theme asChild appearance="dark">
                                <SampleNestedUI title="Always dark" />
                              </Theme>
                            </SampleNestedUI>
                          </Theme>
                        </SampleNestedUI>
                      </Theme>
                    </SampleNestedUI>
                  </DocsSection>

                  <DocsSection title="Nested colors test">
                    <SampleNestedUI title="Global color">
                      <Theme asChild accentColor="mint">
                        <SampleNestedUI title="Always mint">
                          <Theme asChild accentColor="amber">
                            <SampleNestedUI title="Always amber">
                              <Theme asChild accentColor="tomato">
                                <SampleNestedUI title="Always tomato" />
                              </Theme>
                            </SampleNestedUI>
                          </Theme>
                        </SampleNestedUI>
                      </Theme>
                    </SampleNestedUI>
                  </DocsSection>

                  <DocsSection title="Mixed nested themes test">
                    <SampleNestedUI title="Global theme">
                      <Theme
                        asChild
                        accentColor="mint"
                        appearance="dark"
                        radius="none"
                        scaling="90%"
                      >
                        <SampleNestedUI title="Dark, Mint, no radius, 90%">
                          <Theme
                            asChild
                            accentColor="amber"
                            appearance="light"
                            radius="full"
                            scaling="110%"
                          >
                            <SampleNestedUI title="Light, Amber, full radius, 110%">
                              <Theme
                                asChild
                                accentColor="tomato"
                                appearance="dark"
                                radius="large"
                                scaling="100%"
                              >
                                <SampleNestedUI title="Dark, Tomato, large radius, 100%" />
                              </Theme>
                            </SampleNestedUI>
                          </Theme>
                        </SampleNestedUI>
                      </Theme>
                    </SampleNestedUI>
                  </DocsSection>

                  <DocsSection title="Shadow tokens">
                    <Flex direction="column" gap="3" mt="6" mb="5">
                      <Flex
                        style={{
                          flex: 1,
                          background: 'var(--gray-1)',
                          boxShadow: 'inset 0 0 0 1px var(--gray-a4)',
                          borderRadius: 'var(--radius-3)',
                        }}
                        p="9"
                        gap="5"
                      >
                        {[...new Array(6)].map((_, i) => (
                          <Flex flexGrow="1" align="center" justify="center" key={i}>
                            <Box
                              flexGrow="1"
                              style={{
                                backgroundColor: 'var(--color-panel-solid)',
                                boxShadow: `var(--shadow-${i + 1})`,
                                borderRadius: 'var(--radius-2)',
                                height: 80,
                              }}
                              key={i}
                            />
                          </Flex>
                        ))}
                      </Flex>

                      <Flex align="center" gap="1" px="9">
                        {[...new Array(6)].map((_, i) => (
                          <Flex align="center" justify="center" height="100%" width="100%" key={i}>
                            <Text size="1" color="gray">
                              {i + 1}
                            </Text>
                          </Flex>
                        ))}
                      </Flex>
                    </Flex>
                  </DocsSection>

                  <DocsSection title="Grid">
                    {/* Ensure breakpoints work */}
                    <Grid columns={{ initial: '1', md: '2', lg: '3' }} gap="3" mb="8">
                      <Box style={{ height: 256 }}>
                        {/* Ensure default value works */}
                        <Grid gap="3" style={{ height: 256 }}>
                          {Array.from(Array(4).keys()).map((i) => (
                            <Box key={i} style={{ height: 55, background: 'var(--accent-9)' }} />
                          ))}
                        </Grid>
                      </Box>

                      <Box style={{ height: 256 }}>
                        {/* Ensure plain strings works */}
                        <Grid columns="5" gap="3" height="100%">
                          {Array.from(Array(5).keys()).map((i) => (
                            <Box key={i} style={{ background: 'var(--accent-9)' }} />
                          ))}
                        </Grid>
                      </Box>

                      <Box style={{ height: 256 }}>
                        {/* Ensure initial is equal to plain strings */}
                        <Grid columns={{ initial: '5' }} gap="3" height="100%">
                          {Array.from(Array(20).keys()).map((i) => (
                            <Box key={i} style={{ background: 'var(--accent-9)' }} />
                          ))}
                        </Grid>
                      </Box>
                    </Grid>

                    <Grid gap="3" columns="4">
                      {/* Ensure arbitrary values work */}
                      <Grid gap="3" columns="1fr 1fr 2fr">
                        {Array.from(Array(3).keys()).map((i) => (
                          <Box key={i} style={{ height: 55, background: 'var(--accent-9)' }} />
                        ))}
                      </Grid>

                      {/* Ensure arbitrary values work with theme values */}
                      <Grid gap="3" columns={{ xs: '3', md: '1fr 1fr 2fr' }}>
                        {Array.from(Array(3).keys()).map((i) => (
                          <Box key={i} style={{ height: 55, background: 'var(--accent-9)' }} />
                        ))}
                      </Grid>

                      {/* Ensure CSS source order is correct for arbitrary and theme values */}
                      <Grid gap="3" columns={{ xs: '3', md: '1fr 1fr 2fr', lg: '3' }}>
                        {Array.from(Array(3).keys()).map((i) => (
                          <Box key={i} style={{ height: 55, background: 'var(--accent-9)' }} />
                        ))}
                      </Grid>

                      {/* Ensure mapped values work*/}
                      <Grid gap="1" columns={{ xs: '20' }}>
                        {Array.from(Array(20).keys()).map((i) => (
                          <Box key={i} style={{ height: 55, background: 'var(--accent-9)' }} />
                        ))}
                      </Grid>
                    </Grid>
                  </DocsSection>

                  <DocsSection title="Separator">
                    <Flex direction="column" gap="5" my="5">
                      {accentColors.map((color) => (
                        <Separator key={color} size="4" color={color} />
                      ))}
                    </Flex>
                  </DocsSection>

                  <DocsSection title="Cursors">
                    <Flex align="center" gap="5" wrap="wrap" my="5">
                      <Card asChild>
                        <button>
                          <Text as="p" size="2" weight="bold" trim="start">
                            Button
                          </Text>
                          <Text as="p" color="gray" size="2" trim="end">
                            That looks like card
                          </Text>
                        </button>
                      </Card>

                      <Card asChild>
                        <a href="#Cursors">
                          <Text as="p" size="2" weight="bold" trim="start">
                            Link
                          </Text>
                          <Text as="p" color="gray" size="2" trim="end">
                            That looks like card
                          </Text>
                        </a>
                      </Card>

                      <DropdownMenu.Root>
                        <DropdownMenu.Trigger>
                          <Button>
                            Dropdown Menu <DropdownMenu.TriggerIcon />
                          </Button>
                        </DropdownMenu.Trigger>
                        <DropdownMenuContentDemo />
                      </DropdownMenu.Root>

                      <Button>Button</Button>

                      <Button asChild>
                        <a href="#Cursors">Link</a>
                      </Button>

                      <Link href="#Cursors">Link</Link>

                      <Link asChild>
                        <button>Button</button>
                      </Link>
                    </Flex>

                    <PointerCursorsCheckbox />
                  </DocsSection>

                  <DocsSection title="Skeleton">
                    <Flex gap="9">
                      <Box style={{ width: 400 }}>
                        <Card size="4">
                          <PlaygroundForm />
                        </Card>

                        <Flex gap="3" align="center" mt="6" wrap="wrap">
                          <Avatar fallback="BG" />
                          <Badge size="2" color="green">
                            New
                          </Badge>
                          <Button>
                            Next <ArrowRightIcon />
                          </Button>
                          <Checkbox size="3" defaultChecked />
                          <Code>console.log()</Code>
                          <IconButton>
                            <StarIcon />
                          </IconButton>
                          <Kbd>⌘ Q</Kbd>
                          <Link href="/">This is a link</Link>
                          <RadioGroup.Root defaultValue="value" size="3">
                            <RadioGroup.Item value="value" />
                          </RadioGroup.Root>
                          <Select.Root defaultValue="apple">
                            <Select.Trigger />
                            <Select.Content>
                              <SelectItemsDemo />
                            </Select.Content>
                          </Select.Root>
                          <div style={{ minWidth: 150 }}>
                            <Slider defaultValue={[33]} />
                          </div>
                          <Switch defaultChecked />
                          <TextField.Root placeholder="Your name" />
                          <TextArea placeholder="Your feedback" />
                          <Heading size="5">Principles of the Typographic Craft</Heading>

                          <Blockquote size="2" style={{ maxWidth: '50ch' }} color="gray">
                            The goal of typography is to relate font size, line height, and line
                            width in a proportional way that maximizes{' '}
                            <Text highContrast>beauty</Text> and makes reading easier and more
                            pleasant. The question is: What proportion(s) will give us the best
                            results?
                          </Blockquote>

                          <Callout.Root>
                            <Callout.Icon>
                              <InfoCircledIcon />
                            </Callout.Icon>
                            <Callout.Text>
                              We have detected multiple issues in your application configuration
                              file. Please read our <Link href="/">Configuration Guide</Link> for
                              more details.
                            </Callout.Text>
                          </Callout.Root>

                          <TableExample variant="surface" noEmail />

                          <Card size="5" />
                        </Flex>
                      </Box>

                      <Box style={{ width: 400 }}>
                        <Card size="4">
                          <Flex direction="column" gap="3">
                            <Grid gap="1">
                              <Text weight="bold">
                                <Skeleton>Email</Skeleton>
                              </Text>
                              <Skeleton>
                                <TextField.Root variant="classic" placeholder="Your email" />
                              </Skeleton>
                            </Grid>
                            <Grid gap="1">
                              <Text weight="bold">
                                <Skeleton>Subject</Skeleton>
                              </Text>
                              <Select.Root defaultValue="customer">
                                <Skeleton>
                                  <Select.Trigger variant="classic" />
                                </Skeleton>
                              </Select.Root>
                            </Grid>
                            <Grid gap="1">
                              <Text weight="bold">
                                <Skeleton>Feedback</Skeleton>
                              </Text>
                              <Skeleton>
                                <TextArea variant="classic" placeholder="Your feedback" />
                              </Skeleton>
                            </Grid>
                            <Grid columns="2" gap="2">
                              <Skeleton>
                                <Button variant="surface">Back</Button>
                              </Skeleton>
                              <Skeleton>
                                <Button variant="classic">Submit</Button>
                              </Skeleton>
                            </Grid>
                          </Flex>
                        </Card>

                        <Flex gap="3" align="center" mt="6" wrap="wrap">
                          <Skeleton>
                            <Avatar fallback="BG" />
                          </Skeleton>
                          <Skeleton>
                            <Badge size="2" color="green">
                              New
                            </Badge>
                          </Skeleton>
                          <Skeleton>
                            <Button>
                              Next <ArrowRightIcon />
                            </Button>
                          </Skeleton>
                          <Skeleton>
                            <Checkbox size="3" defaultChecked />
                          </Skeleton>
                          <Skeleton>
                            <Code>console.log()</Code>
                          </Skeleton>
                          <Skeleton>
                            <IconButton>
                              <StarIcon />
                            </IconButton>
                          </Skeleton>
                          <Skeleton>
                            <Kbd>⌘ Q</Kbd>
                          </Skeleton>
                          <Skeleton>
                            <Link href="/">This is a link</Link>
                          </Skeleton>
                          <RadioGroup.Root defaultValue="value" size="3">
                            <Skeleton>
                              <RadioGroup.Item value="value" />
                            </Skeleton>
                          </RadioGroup.Root>
                          <Select.Root defaultValue="apple">
                            <Skeleton>
                              <Select.Trigger />
                            </Skeleton>
                            <Select.Content>
                              <SelectItemsDemo />
                            </Select.Content>
                          </Select.Root>
                          <div style={{ minWidth: 150 }}>
                            <Skeleton>
                              <Slider defaultValue={[33]} />
                            </Skeleton>
                          </div>
                          <Skeleton>
                            <Switch defaultChecked />
                          </Skeleton>
                          <Skeleton>
                            <TextField.Root placeholder="Your name" />
                          </Skeleton>
                          <Skeleton>
                            <TextArea placeholder="Your feedback" />
                          </Skeleton>
                          <Skeleton>
                            <Heading size="5">Principles of the Typographic Craft</Heading>
                          </Skeleton>

                          <Skeleton>
                            <Blockquote size="2" style={{ maxWidth: '50ch' }} color="gray">
                              The goal of typography is to relate font size, line height, and line
                              width in a proportional way that maximizes{' '}
                              <Text highContrast>beauty</Text> and makes reading easier and more
                              pleasant. The question is: What proportion(s) will give us the best
                              results?
                            </Blockquote>
                          </Skeleton>

                          <Skeleton>
                            <Callout.Root>
                              <Callout.Icon>
                                <InfoCircledIcon />
                              </Callout.Icon>
                              <Callout.Text>
                                We have detected multiple issues in your application configuration
                                file. Please read our <Link href="/">Configuration Guide</Link> for
                                more details.
                              </Callout.Text>
                            </Callout.Root>
                          </Skeleton>

                          <Skeleton>
                            <TableExample variant="surface" noEmail />
                          </Skeleton>

                          <Skeleton>
                            <Card size="5" />
                          </Skeleton>
                        </Flex>
                      </Box>
                    </Flex>
                  </DocsSection>

                  <DocsSection title="DataList">
                    <Flex gap="4" align="center">
                      <Tabs.Root defaultValue="specimen">
                        <Tabs.List size="2">
                          <Tabs.Trigger value="specimen">Specimen</Tabs.Trigger>
                          <Tabs.Trigger value="all-orientations">All orientations</Tabs.Trigger>
                          <Tabs.Trigger value="all-sizes">All sizes</Tabs.Trigger>
                        </Tabs.List>

                        <Tabs.Content value="specimen">
                          <Box my="6" style={{ maxWidth: '688px' }}>
                            <DataList.Root>
                              <DataList.Item>
                                <DataList.Label width="200px">Name</DataList.Label>
                                <DataList.Value>Susan Kare</DataList.Value>
                              </DataList.Item>
                              <DataList.Item>
                                <DataList.Label>Email</DataList.Label>
                                <DataList.Value>susan.kare@apple.com</DataList.Value>
                              </DataList.Item>
                              <DataList.Item>
                                <DataList.Label>Status</DataList.Label>
                                <DataList.Value>
                                  <Button color="green" size="1">
                                    Active
                                  </Button>
                                </DataList.Value>
                              </DataList.Item>
                              <DataList.Item>
                                <DataList.Label>Bio</DataList.Label>
                                <DataList.Value>
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac
                                  nisl et libero ultricies viverra quis vitae quam. Proin a feugiat
                                  metus.
                                </DataList.Value>
                              </DataList.Item>
                              <DataList.Item>
                                <DataList.Label>Organization</DataList.Label>
                                <DataList.Value>
                                  <Link href="https://workos.com">WorkOS</Link>
                                </DataList.Value>
                              </DataList.Item>
                            </DataList.Root>
                          </Box>
                        </Tabs.Content>

                        <Tabs.Content value="all-orientations">
                          <Box my="6">
                            <table className={styles.table}>
                              <tbody>
                                {dataListRootPropDefs.orientation.values.map((orientation) => (
                                  <tr key={orientation}>
                                    <RowHeaderCell>{upperFirst(orientation)}</RowHeaderCell>
                                    <td style={{ textAlign: 'left' }}>
                                      <DataList.Root orientation={orientation} my="3">
                                        <DataList.Item>
                                          <DataList.Label>Name</DataList.Label>
                                          <DataList.Value>Susan Kare</DataList.Value>
                                        </DataList.Item>
                                        <DataList.Item>
                                          <DataList.Label>Email</DataList.Label>
                                          <DataList.Value>susan.kare@apple.com</DataList.Value>
                                        </DataList.Item>
                                      </DataList.Root>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </Box>
                        </Tabs.Content>

                        <Tabs.Content value="all-sizes">
                          <Box my="6">
                            <table className={styles.table}>
                              <tbody>
                                {dataListRootPropDefs.size.values.map((size) => (
                                  <tr key={size}>
                                    <RowHeaderCell>{`Size ${size}`}</RowHeaderCell>
                                    <td style={{ textAlign: 'left' }}>
                                      <DataList.Root size={size} my="3">
                                        <DataList.Item>
                                          <DataList.Label>Name</DataList.Label>
                                          <DataList.Value>Susan Kare</DataList.Value>
                                        </DataList.Item>
                                        <DataList.Item>
                                          <DataList.Label>Email</DataList.Label>
                                          <DataList.Value>susan.kare@apple.com</DataList.Value>
                                        </DataList.Item>
                                      </DataList.Root>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </Box>
                        </Tabs.Content>
                      </Tabs.Root>
                    </Flex>

                    <Text as="p" my="5">
                      <Code>color</Code> can be set per <Code>DataListLabel</Code> instance:
                    </Text>

                    <details>
                      <summary>
                        <Text size="2" color="gray">
                          See color combinations
                        </Text>
                      </summary>
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <ColumnHeaderCell />
                            <ColumnHeaderCell>Color</ColumnHeaderCell>
                            <ColumnHeaderCell>High Contrast</ColumnHeaderCell>
                          </tr>
                        </thead>

                        <tbody>
                          {dataListLabelPropDefs.color.values.map((color) => (
                            <tr key={color}>
                              <RowHeaderCell style={{ whiteSpace: 'nowrap' }}>
                                {color}
                              </RowHeaderCell>
                              <td>
                                <DataList.Root my="3">
                                  <DataList.Item>
                                    <DataList.Label color={color}>Name</DataList.Label>
                                    <DataList.Value>Susan Kare</DataList.Value>
                                  </DataList.Item>
                                  <DataList.Item>
                                    <DataList.Label color={color}>Email</DataList.Label>
                                    <DataList.Value>susan.kare@apple.com</DataList.Value>
                                  </DataList.Item>
                                </DataList.Root>
                              </td>
                              <td>
                                <DataList.Root my="3" ml="6">
                                  <DataList.Item>
                                    <DataList.Label highContrast color={color}>
                                      Name
                                    </DataList.Label>
                                    <DataList.Value>Susan Kare</DataList.Value>
                                  </DataList.Item>
                                  <DataList.Item>
                                    <DataList.Label highContrast color={color}>
                                      Email
                                    </DataList.Label>
                                    <DataList.Value>susan.kare@apple.com</DataList.Value>
                                  </DataList.Item>
                                </DataList.Root>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </details>

                    <Text as="p" my="5">
                      <Code>width</Code> can be set per <Code>DataListLabel</Code> instance:
                    </Text>

                    <details>
                      <summary>
                        <Text size="2" color="gray">
                          See width examples
                        </Text>
                      </summary>
                      <table className={styles.table}>
                        <tbody>
                          {['64px', '80px', '128px'].map((width) => {
                            return (
                              <tr key={width}>
                                <RowHeaderCell>{`${width}`}</RowHeaderCell>
                                <td>
                                  <DataList.Root my="3">
                                    <DataList.Item>
                                      <DataList.Label width={width}>Name</DataList.Label>
                                      <DataList.Value>Susan Kare</DataList.Value>
                                    </DataList.Item>
                                    <DataList.Item>
                                      <DataList.Label width={width}>Email</DataList.Label>
                                      <DataList.Value>susan.kare@apple.com</DataList.Value>
                                    </DataList.Item>
                                  </DataList.Root>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </details>
                  </DocsSection>

                  <DocsSection title="Segmented Control">
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <ColumnHeaderCell />
                          {segmentedControlRootPropDefs.size.values.map((size) => (
                            <ColumnHeaderCell key={size}>size {size}</ColumnHeaderCell>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {segmentedControlRootPropDefs.variant.values.map((variant) => (
                          <tr key={variant}>
                            <RowHeaderCell>{variant}</RowHeaderCell>
                            {segmentedControlRootPropDefs.size.values.map((size) => (
                              <td key={size}>
                                <SegmentedControl.Root
                                  size={size}
                                  variant={variant}
                                  defaultValue="1"
                                >
                                  <SegmentedControl.Item value="1">One</SegmentedControl.Item>
                                  <SegmentedControl.Item value="2">Two</SegmentedControl.Item>
                                  <SegmentedControl.Item value="3">Three</SegmentedControl.Item>
                                </SegmentedControl.Root>
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>

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
                        <table className={styles.table}>
                          <thead>
                            <tr>
                              <ColumnHeaderCell />
                              {segmentedControlRootPropDefs.size.values.map((size) => (
                                <ColumnHeaderCell key={size}>size {size}</ColumnHeaderCell>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {segmentedControlRootPropDefs.radius.values.map((radius) => (
                              <tr key={radius}>
                                <RowHeaderCell>{radius}</RowHeaderCell>
                                {segmentedControlRootPropDefs.size.values.map((size) => (
                                  <td key={size}>
                                    <SegmentedControl.Root
                                      size={size}
                                      radius={radius}
                                      defaultValue="1"
                                    >
                                      <SegmentedControl.Item value="1">One</SegmentedControl.Item>
                                      <SegmentedControl.Item value="2">Two</SegmentedControl.Item>
                                      <SegmentedControl.Item value="3">Three</SegmentedControl.Item>
                                    </SegmentedControl.Root>
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </Box>
                    </details>

                    <Separator size="4" my="9" />

                    <Flex direction="column" gap="4" my="7">
                      <Flex gap="4" align="center">
                        <SegmentedControl.Root>
                          <SegmentedControl.Item value="1">One</SegmentedControl.Item>
                        </SegmentedControl.Root>

                        <SegmentedControl.Root>
                          <SegmentedControl.Item value="1">One</SegmentedControl.Item>
                          <SegmentedControl.Item value="2">Two</SegmentedControl.Item>
                        </SegmentedControl.Root>

                        <SegmentedControl.Root>
                          <SegmentedControl.Item value="1">One</SegmentedControl.Item>
                          <SegmentedControl.Item value="2">Two</SegmentedControl.Item>
                          <SegmentedControl.Item value="3">Three</SegmentedControl.Item>
                        </SegmentedControl.Root>

                        <SegmentedControl.Root>
                          <SegmentedControl.Item value="1">One</SegmentedControl.Item>
                          <SegmentedControl.Item value="2">Two</SegmentedControl.Item>
                          <SegmentedControl.Item value="3">Three</SegmentedControl.Item>
                          <SegmentedControl.Item value="4">Four</SegmentedControl.Item>
                        </SegmentedControl.Root>

                        <SegmentedControl.Root>
                          <SegmentedControl.Item value="1">One</SegmentedControl.Item>
                          <SegmentedControl.Item value="2">Two</SegmentedControl.Item>
                          <SegmentedControl.Item value="3">Three</SegmentedControl.Item>
                          <SegmentedControl.Item value="4">Four</SegmentedControl.Item>
                          <SegmentedControl.Item value="5">Five</SegmentedControl.Item>
                        </SegmentedControl.Root>
                      </Flex>

                      <Flex gap="4" align="center">
                        <SegmentedControl.Root defaultValue="1">
                          <SegmentedControl.Item value="1">One</SegmentedControl.Item>
                        </SegmentedControl.Root>

                        <SegmentedControl.Root defaultValue="1">
                          <SegmentedControl.Item value="1">One</SegmentedControl.Item>
                          <SegmentedControl.Item value="2">Two</SegmentedControl.Item>
                        </SegmentedControl.Root>

                        <SegmentedControl.Root defaultValue="1">
                          <SegmentedControl.Item value="1">One</SegmentedControl.Item>
                          <SegmentedControl.Item value="2">Two</SegmentedControl.Item>
                          <SegmentedControl.Item value="3">Three</SegmentedControl.Item>
                        </SegmentedControl.Root>

                        <SegmentedControl.Root defaultValue="1">
                          <SegmentedControl.Item value="1">One</SegmentedControl.Item>
                          <SegmentedControl.Item value="2">Two</SegmentedControl.Item>
                          <SegmentedControl.Item value="3">Three</SegmentedControl.Item>
                          <SegmentedControl.Item value="4">Four</SegmentedControl.Item>
                        </SegmentedControl.Root>

                        <SegmentedControl.Root defaultValue="1">
                          <SegmentedControl.Item value="1">One</SegmentedControl.Item>
                          <SegmentedControl.Item value="2">Two</SegmentedControl.Item>
                          <SegmentedControl.Item value="3">Three</SegmentedControl.Item>
                          <SegmentedControl.Item value="4">Four</SegmentedControl.Item>
                          <SegmentedControl.Item value="5">Five</SegmentedControl.Item>
                        </SegmentedControl.Root>
                      </Flex>

                      <Flex gap="4" align="center">
                        <SegmentedControl.Root variant="classic" defaultValue="1">
                          <SegmentedControl.Item value="1">One</SegmentedControl.Item>
                        </SegmentedControl.Root>

                        <SegmentedControl.Root variant="classic" defaultValue="1">
                          <SegmentedControl.Item value="1">One</SegmentedControl.Item>
                          <SegmentedControl.Item value="2">Two</SegmentedControl.Item>
                        </SegmentedControl.Root>

                        <SegmentedControl.Root variant="classic" defaultValue="1">
                          <SegmentedControl.Item value="1">One</SegmentedControl.Item>
                          <SegmentedControl.Item value="2">Two</SegmentedControl.Item>
                          <SegmentedControl.Item value="3">Three</SegmentedControl.Item>
                        </SegmentedControl.Root>

                        <SegmentedControl.Root variant="classic" defaultValue="1">
                          <SegmentedControl.Item value="1">One</SegmentedControl.Item>
                          <SegmentedControl.Item value="2">Two</SegmentedControl.Item>
                          <SegmentedControl.Item value="3">Three</SegmentedControl.Item>
                          <SegmentedControl.Item value="4">Four</SegmentedControl.Item>
                        </SegmentedControl.Root>

                        <SegmentedControl.Root variant="classic" defaultValue="1">
                          <SegmentedControl.Item value="1">One</SegmentedControl.Item>
                          <SegmentedControl.Item value="2">Two</SegmentedControl.Item>
                          <SegmentedControl.Item value="3">Three</SegmentedControl.Item>
                          <SegmentedControl.Item value="4">Four</SegmentedControl.Item>
                          <SegmentedControl.Item value="5">Five</SegmentedControl.Item>
                        </SegmentedControl.Root>
                      </Flex>
                    </Flex>
                  </DocsSection>
                </main>
              </Box>
            </div>
          </Theme>
        </NextThemeProvider>
      </body>
    </html>
  );
}

function DropdownMenuContentDemo(props: React.ComponentProps<typeof DropdownMenu.Content>) {
  return (
    <DropdownMenu.Content {...props}>
      <DropdownMenu.Item shortcut="⌘+T">New Tab</DropdownMenu.Item>
      <DropdownMenu.Item shortcut="⌘+N">New Window</DropdownMenu.Item>
      <DropdownMenu.Item shortcut="⇧+⌘+N" disabled>
        New Private Window
      </DropdownMenu.Item>
      <DropdownMenu.Sub>
        <DropdownMenu.SubTrigger>More Tools</DropdownMenu.SubTrigger>

        <DropdownMenu.SubContent>
          <DropdownMenu.Item shortcut="⌘+S">Save Page As…</DropdownMenu.Item>
          <DropdownMenu.Item>Create Shortcut…</DropdownMenu.Item>
          <DropdownMenu.Item>Name Window…</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>Developer Tools</DropdownMenu.Item>
          <DropdownMenu.Item color="red">
            <Box asChild mx="-3px">
              <TrashIcon />
            </Box>
            Delete
          </DropdownMenu.Item>
        </DropdownMenu.SubContent>
      </DropdownMenu.Sub>

      <DropdownMenu.Separator />
      <DropdownMenu.Group>
        <DropdownMenu.Label>Other</DropdownMenu.Label>
        <DropdownMenu.Item shortcut="⌘+P">Print</DropdownMenu.Item>
        <DropdownMenu.Item shortcut="⌘+Q" asChild>
          <a href="#logout">Logout</a>
        </DropdownMenu.Item>
      </DropdownMenu.Group>

      {props.variant === 'solid' && (
        <>
          <DropdownMenu.Separator />

          <DropdownMenu.CheckboxItem shortcut="⌘+B" checked>
            Show Bookmarks
          </DropdownMenu.CheckboxItem>
          <DropdownMenu.CheckboxItem>Show Full URLs</DropdownMenu.CheckboxItem>

          <DropdownMenu.Separator />

          <DropdownMenu.Label>People</DropdownMenu.Label>
          <DropdownMenu.RadioGroup value="pedro">
            <DropdownMenu.RadioItem value="pedro">Pedro Duarte</DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem value="colm">Colm Tuite</DropdownMenu.RadioItem>
          </DropdownMenu.RadioGroup>

          <DropdownMenu.Separator />

          <DropdownMenu.Item color="red">Delete</DropdownMenu.Item>
        </>
      )}
    </DropdownMenu.Content>
  );
}

function ContextMenuContentDemo(props: React.ComponentProps<typeof ContextMenu.Content>) {
  return (
    <ContextMenu.Content {...props}>
      <ContextMenu.Item shortcut="⌘+T">New Tab</ContextMenu.Item>
      <ContextMenu.Item shortcut="⌘+N">New Window</ContextMenu.Item>
      <ContextMenu.Item shortcut="⇧+⌘+N" disabled>
        New Private Window
      </ContextMenu.Item>
      <ContextMenu.Sub>
        <ContextMenu.SubTrigger>More Tools</ContextMenu.SubTrigger>

        <ContextMenu.SubContent>
          <ContextMenu.Item shortcut="⌘+S">Save Page As…</ContextMenu.Item>
          <ContextMenu.Item>Create Shortcut…</ContextMenu.Item>
          <ContextMenu.Item>Name Window…</ContextMenu.Item>
          <ContextMenu.Separator />
          <ContextMenu.Item>Developer Tools</ContextMenu.Item>
        </ContextMenu.SubContent>
      </ContextMenu.Sub>

      <ContextMenu.Separator />
      <ContextMenu.Group>
        <ContextMenu.Label>Other</ContextMenu.Label>
        <ContextMenu.Item shortcut="⌘+P">Print</ContextMenu.Item>
        <ContextMenu.Item shortcut="⌘+Q" asChild>
          <a href="#logout">Logout</a>
        </ContextMenu.Item>
      </ContextMenu.Group>

      {props.variant === 'solid' && (
        <>
          <ContextMenu.Separator />

          <ContextMenu.CheckboxItem shortcut="⌘+B" checked>
            Show Bookmarks
          </ContextMenu.CheckboxItem>
          <ContextMenu.CheckboxItem>Show Full URLs</ContextMenu.CheckboxItem>

          <ContextMenu.Separator />

          <ContextMenu.Label>People</ContextMenu.Label>
          <ContextMenu.RadioGroup value="pedro">
            <ContextMenu.RadioItem value="pedro">Pedro Duarte</ContextMenu.RadioItem>
            <ContextMenu.RadioItem value="colm">Colm Tuite</ContextMenu.RadioItem>
          </ContextMenu.RadioGroup>

          <DropdownMenu.Separator />

          <ContextMenu.Item color="red">Delete</ContextMenu.Item>
        </>
      )}
    </ContextMenu.Content>
  );
}

type RightClickAreaProps = React.ComponentProps<typeof Grid> & {
  size: '1' | '2';
};
function RightClickArea({ size = '2', ...props }: RightClickAreaProps) {
  return (
    <Grid
      height={size === '2' ? '48px' : '32px'}
      px="3"
      {...props}
      style={{
        placeItems: 'center',
        borderRadius: 'var(--radius-3)',
        border: '1px dashed var(--accent-6)',
        cursor: 'default',
        ...props.style,
      }}
    >
      <Text size="1" color="gray">
        Right-click here
      </Text>
    </Grid>
  );
}

function SelectItemsDemo() {
  return (
    <>
      <Select.Group>
        <Select.Label>Fruits</Select.Label>
        <Select.Item value="orange">Orange</Select.Item>
        <Select.Item value="apple">Apple</Select.Item>
        <Select.Item value="grapes" disabled>
          Grape
        </Select.Item>
      </Select.Group>

      <Select.Separator />

      <Select.Group>
        <Select.Label>Vegetables</Select.Label>
        <Select.Item value="carrot">Carrot</Select.Item>
        <Select.Item value="potato">Potato</Select.Item>
      </Select.Group>
    </>
  );
}

function DocsSection({ title, children }: { title: string; children: React.ReactNode }) {
  const hashedTitle = title.toLowerCase().replace(/ /g, '-');
  return (
    <>
      <Container mx="6">
        <Section size="2">
          <Heading size="6" weight="regular" mb="4" as="h2">
            <Link href={`#${hashedTitle}`} id={hashedTitle}>
              {title}
            </Link>
          </Heading>
          {children}
        </Section>
      </Container>
      <Separator size="4" />
    </>
  );
}

function DocsGridSectionItem({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <Heading size="6" weight="regular" mb="4" as="h2">
        <Link href={`#${title}`} id={title}>
          {title}
        </Link>
      </Heading>
      {children}
    </div>
  );
}

function ColumnHeaderCell({ children, ...props }: React.ComponentProps<'th'>) {
  return (
    <th {...props} className={styles.columnHeaderCell}>
      {children && (
        <Text as="p" color="gray" size="2">
          {children}
        </Text>
      )}
    </th>
  );
}

function RowHeaderCell({ children, ...props }: React.ComponentProps<'td'>) {
  return (
    <td {...props} className={styles.rowHeaderCell}>
      {children && (
        <Text as="p" color="gray" size="2">
          {children}
        </Text>
      )}
    </td>
  );
}

function upperFirst(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const aspectRatioImage = (
  <img
    src="https://images.unsplash.com/photo-1605030753481-bb38b08c384a?&auto=format&fit=crop&w=400&q=80"
    alt="A house in a forest"
    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
  />
);

function CustomUserIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ width: '60%', height: '60%' }}
    >
      <path
        fillRule="evenodd"
        d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
        clipRule="evenodd"
      />
    </svg>
  );
}

const SampleNestedUI = React.forwardRef<
  React.ElementRef<typeof Flex>,
  React.ComponentPropsWithoutRef<typeof Flex>
>(({ children, title, ...props }, forwardedRef) => {
  return (
    <Flex
      p="5"
      gap="9"
      {...props}
      ref={forwardedRef}
      style={{
        boxShadow: '0 0 0 1px var(--gray-a6)',
        borderRadius: 'var(--radius-2)',
      }}
    >
      <div>
        <Heading size="2" trim="start" mb="3">
          {title}
        </Heading>
        <Flex direction="column" gap="3">
          <Grid gap="1">
            <Text as="p" weight="bold">
              Feedback
            </Text>
            <TextArea variant="classic" placeholder="Your feedback" />
          </Grid>
          <Flex asChild justify="between">
            <label>
              <Text color="gray" size="2">
                Attach screenshot?
              </Text>
              <Switch size="1" variant="classic" defaultChecked highContrast />
            </label>
          </Flex>
          <Grid columns="2" gap="2">
            <Button variant="surface">Back</Button>
            <Button variant="classic">Submit</Button>
          </Grid>
        </Flex>
      </div>

      {children}
    </Flex>
  );
});
SampleNestedUI.displayName = 'SampleNestedUI';

function PlaygroundForm({
  size,
  ...props
}: React.ComponentProps<typeof Flex> & {
  size?: React.ComponentProps<typeof TextField.Root>['size'];
}) {
  return (
    <Flex direction="column" gap="3" {...props}>
      <Grid gap="1">
        <Text size={size} weight="bold">
          Email
        </Text>
        <TextField.Root size={size} variant="classic" placeholder="Your email" />
      </Grid>
      <Grid gap="1">
        <Text size={size} weight="bold">
          Subject
        </Text>
        <Select.Root defaultValue="customer" size={size}>
          <Select.Trigger variant="classic" />
          <Select.Content>
            <Select.Item value="customer">Customer feedback</Select.Item>
            <Select.Item value="help">Help</Select.Item>
          </Select.Content>
        </Select.Root>
      </Grid>
      <Grid gap="1">
        <Text size={size} weight="bold">
          Feedback
        </Text>
        <TextArea size={size} variant="classic" placeholder="Your feedback" />
      </Grid>
      <Grid columns="2" gap="2">
        <Button size={size} variant="surface">
          Back
        </Button>
        <Button size={size} variant="classic">
          Submit
        </Button>
      </Grid>
    </Flex>
  );
}

function TableExample(props: React.ComponentProps<typeof Table.Root> & { noEmail?: boolean }) {
  const { noEmail, ...rootProps } = props;
  return (
    <Table.Root {...rootProps}>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Full name</Table.ColumnHeaderCell>
          {!noEmail && <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>}
          <Table.ColumnHeaderCell>Group</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.RowHeaderCell>Andy</Table.RowHeaderCell>
          {!noEmail && <Table.Cell>andy@workos.com</Table.Cell>}
          <Table.Cell>Developer</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.RowHeaderCell>Benoit</Table.RowHeaderCell>
          {!noEmail && <Table.Cell>benoit@workos.com</Table.Cell>}
          <Table.Cell>Admin</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.RowHeaderCell>Lucas</Table.RowHeaderCell>
          {!noEmail && <Table.Cell>lucas@workos.com</Table.Cell>}
          <Table.Cell>Developer</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.RowHeaderCell>Vlad</Table.RowHeaderCell>
          {!noEmail && <Table.Cell>vlad@workos.com</Table.Cell>}
          <Table.Cell>Designer</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Root>
  );
}

const colorsRegular = [
  'tomato',
  'red',
  'ruby',
  'crimson',
  'pink',
  'plum',
  'purple',
  'violet',
  'iris',
  'indigo',
  'blue',
  'cyan',
  'teal',
  'jade',
  'green',
  'grass',
  'brown',
  'orange',
] as const;
const colorsBright = ['sky', 'mint', 'lime', 'yellow', 'amber'] as const;
const colorsMetal = ['gold', 'bronze'] as const;
const accentColorsGrouped = [
  { label: 'Regulars', values: colorsRegular },
  { label: 'Brights', values: colorsBright },
  { label: 'Metals', values: colorsMetal },
  { label: 'Gray', values: ['gray'] as const },
];
