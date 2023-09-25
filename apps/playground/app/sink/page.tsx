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
} from '@radix-ui/react-icons';
import NextLink from 'next/link';
import {
  Theme,
  //
  AlertDialogRoot,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  //
  AspectRatio,
  //
  Avatar,
  avatarPropDefs,
  //
  Badge,
  badgePropDefs,
  //
  Blockquote,
  blockquotePropDefs,
  //
  Box,
  //
  Button,
  buttonPropDefs,
  //
  CalloutRoot,
  CalloutIcon,
  CalloutText,
  calloutRootPropDefs,
  //
  Card,
  cardPropDefs,
  //
  Checkbox,
  checkboxPropDefs,
  //
  Code,
  codePropDefs,
  //
  Container,
  //
  ContextMenuRoot,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuLabel,
  ContextMenuItem,
  ContextMenuGroup,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuCheckboxItem,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
  ContextMenuSeparator,
  contextMenuContentPropDefs,
  //
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
  //
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuCheckboxItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuSeparator,
  dropdownMenuContentPropDefs,
  //
  Em,
  Flex,
  Grid,
  //
  Heading,
  headingPropDefs,
  //
  HoverCardRoot,
  HoverCardTrigger,
  HoverCardContent,
  //
  IconButton,
  iconButtonPropDefs,
  //
  Kbd,
  kbdPropDefs,
  //
  Link,
  linkPropDefs,
  //
  PopoverRoot,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
  //
  Quote,
  //
  RadioGroupRoot,
  RadioGroupItem,
  radioGroupPropDefs,
  //
  ScrollArea,
  scrollAreaPropDefs,
  //
  Section,
  //
  SelectRoot,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
  selectRootPropDefs,
  selectTriggerPropDefs,
  selectContentPropDefs,
  //
  Separator,
  //
  Slider,
  sliderPropDefs,
  //
  Strong,
  //
  Switch,
  switchPropDefs,
  //
  TableRoot,
  TableHeader,
  TableRow,
  TableColumnHeaderCell,
  TableBody,
  TableRowHeaderCell,
  TableCell,
  tableRootPropDefs,
  //
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
  tabsListPropDefs,
  //
  TextArea,
  textAreaPropDefs,
  //
  TextFieldRoot,
  TextFieldSlot,
  TextFieldInput,
  textFieldPropDefs,
  //
  Text,
  textPropDefs,
  //
  Tooltip,
  //
  // helpers:
  themeAccentColorsGrouped,
  //
  ThemePanel,
  themeAccentColorsOrdered,
} from '@radix-ui/themes';
// import { HideCursor } from './hide-cursor';
import styles from './page.module.css';

import { RadixLogo } from './radix-logo';
import { PointerCursorsCheckbox } from './pointer-cursors-checkbox';

export default function Sink() {
  return (
    <html lang="en" className={styles.root} suppressHydrationWarning>
      <body>
        <NextThemeProvider>
          <Theme asChild accentColor="violet">
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
                          <DialogRoot>
                            <DialogTrigger>
                              <Button variant="solid">Open</Button>
                            </DialogTrigger>
                            <DialogContent style={{ maxWidth: 450 }}>
                              <Flex direction="column" gap="3">
                                <DialogTitle>Share resource</DialogTitle>
                                <DialogDescription>
                                  Jan Tschichold was a German calligrapher, typographer and book
                                  designer. He played a significant role in the development of
                                  graphic design in the 20th century.
                                </DialogDescription>
                                <Flex gap="3" mt="4" justify="end">
                                  <DialogClose>
                                    <Button variant="soft" color="gray">
                                      Cancel
                                    </Button>
                                  </DialogClose>
                                  <DialogClose>
                                    <Button variant="solid">
                                      Share <Share2Icon />
                                    </Button>
                                  </DialogClose>
                                </Flex>
                              </Flex>
                            </DialogContent>
                          </DialogRoot>
                        </DocsGridSectionItem>

                        <DocsGridSectionItem title="HoverCard">
                          <HoverCardRoot>
                            <HoverCardTrigger>
                              <Link>A fancy link</Link>
                            </HoverCardTrigger>
                            <HoverCardContent style={{ width: 200 }}>
                              <Text as="p" size="2">
                                Jan Tschichold was a German calligrapher, typographer and book
                                designer. He played a significant role in the development of graphic
                                design in the 20th century.
                              </Text>
                            </HoverCardContent>
                          </HoverCardRoot>
                        </DocsGridSectionItem>

                        <DocsGridSectionItem title="Tooltip">
                          <Flex gap="5">
                            <Tooltip content="The quick brown fox">
                              <Button variant="solid" size="1">
                                Singleline
                              </Button>
                            </Tooltip>

                            <Tooltip
                              content="The goal of typography is to relate font size, line height, and line width in a
                    proportional way that maximizes beauty and makes reading easier and more
                    pleasant."
                              style={{ maxWidth: 200 }}
                            >
                              <Button variant="solid" size="1">
                                Multiline
                              </Button>
                            </Tooltip>
                          </Flex>
                        </DocsGridSectionItem>

                        <DocsGridSectionItem title="AlertDialog">
                          <AlertDialogRoot>
                            <AlertDialogTrigger>
                              <Button variant="solid">Open</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent style={{ maxWidth: 450 }}>
                              <Flex direction="column" gap="3">
                                <AlertDialogTitle>Revoke setup link</AlertDialogTitle>
                                <AlertDialogDescription>
                                  The setup link will no longer be accessible and any existing setup
                                  sessions will be revoked.
                                </AlertDialogDescription>
                                <Flex gap="3" mt="4" justify="end">
                                  <AlertDialogCancel>
                                    <Button variant="soft" color="gray">
                                      Cancel
                                    </Button>
                                  </AlertDialogCancel>
                                  <AlertDialogAction>
                                    <Button variant="solid" color="red">
                                      Revoke link
                                    </Button>
                                  </AlertDialogAction>
                                </Flex>
                              </Flex>
                            </AlertDialogContent>
                          </AlertDialogRoot>
                        </DocsGridSectionItem>

                        <DocsGridSectionItem title="Popover">
                          <PopoverRoot>
                            <PopoverTrigger>
                              <Button variant="solid">Popover</Button>
                            </PopoverTrigger>
                            <PopoverContent style={{ width: 200 }}>
                              <Text as="p" size="2" mb="2">
                                Jan Tschichold was a German calligrapher, typographer and book
                                designer. He played a significant role in the development of graphic
                                design in the 20th century.
                              </Text>
                              <Button variant="solid" size="1">
                                Share <Share2Icon />
                              </Button>
                            </PopoverContent>
                          </PopoverRoot>
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
                                        <DropdownMenuRoot>
                                          <DropdownMenuTrigger>
                                            <Button size={size} variant="soft" color="gray">
                                              <DotsHorizontalIcon />
                                            </Button>
                                          </DropdownMenuTrigger>
                                          <DropdownMenuContentDemo size={size} variant={variant} />
                                        </DropdownMenuRoot>
                                      </td>
                                    ))}
                                    <td>
                                      <DropdownMenuRoot>
                                        <DropdownMenuTrigger>
                                          <Button variant="soft" color="gray">
                                            <DotsHorizontalIcon />
                                          </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContentDemo variant={variant} highContrast />
                                      </DropdownMenuRoot>
                                    </td>
                                    <td>
                                      <DropdownMenuRoot>
                                        <DropdownMenuTrigger>
                                          <Button variant="soft" color="gray">
                                            <DotsHorizontalIcon />
                                          </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContentDemo variant={variant} color="gray" />
                                      </DropdownMenuRoot>
                                    </td>
                                    <td>
                                      <DropdownMenuRoot>
                                        <DropdownMenuTrigger>
                                          <Button variant="soft" color="gray">
                                            <DotsHorizontalIcon />
                                          </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContentDemo
                                          variant={variant}
                                          color="gray"
                                          highContrast
                                        />
                                      </DropdownMenuRoot>
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
                              {themeAccentColorsGrouped.map(({ label, values }) => (
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
                                                <DropdownMenuRoot>
                                                  <DropdownMenuTrigger>
                                                    <Button variant="soft" color="gray">
                                                      <DotsHorizontalIcon />
                                                    </Button>
                                                  </DropdownMenuTrigger>
                                                  <DropdownMenuContentDemo
                                                    variant={variant}
                                                    color={color}
                                                  />
                                                </DropdownMenuRoot>
                                                <DropdownMenuRoot>
                                                  <DropdownMenuTrigger>
                                                    <Button variant="soft" color="gray" ml="2">
                                                      <DotsHorizontalIcon />
                                                    </Button>
                                                  </DropdownMenuTrigger>
                                                  <DropdownMenuContentDemo
                                                    variant={variant}
                                                    color={color}
                                                    highContrast
                                                  />
                                                </DropdownMenuRoot>
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
                                      <ContextMenuRoot>
                                        <ContextMenuTrigger>
                                          <RightClickArea size={size} />
                                        </ContextMenuTrigger>
                                        <ContextMenuContentDemo size={size} variant={variant} />
                                      </ContextMenuRoot>
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
                                <SelectRoot defaultValue="apple" size={size}>
                                  <SelectTrigger variant={variant} />
                                  <SelectContent>
                                    <SelectItemsDemo />
                                  </SelectContent>
                                </SelectRoot>
                              </td>
                            ))}
                            <td>
                              <SelectRoot size="2">
                                <SelectTrigger variant={variant} placeholder="Choose a fruit" />
                                <SelectContent>
                                  <SelectItemsDemo />
                                </SelectContent>
                              </SelectRoot>
                            </td>
                            <td />
                            <td>
                              <SelectRoot defaultValue="apple" size="2">
                                <SelectTrigger variant={variant} color="gray" />
                                <SelectContent>
                                  <SelectItemsDemo />
                                </SelectContent>
                              </SelectRoot>
                            </td>
                            <td>
                              <SelectRoot size="2">
                                <SelectTrigger
                                  variant={variant}
                                  color="gray"
                                  placeholder="Choose a fruit"
                                />
                                <SelectContent>
                                  <SelectItemsDemo />
                                </SelectContent>
                              </SelectRoot>
                            </td>
                            <td />
                            <td>
                              <SelectRoot defaultValue="apple" size="2" disabled>
                                <SelectTrigger variant={variant} />
                                <SelectContent>
                                  <SelectItemsDemo />
                                </SelectContent>
                              </SelectRoot>
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
                              <SelectRoot defaultValue="apple" size="1">
                                <SelectTrigger />
                                <SelectContent variant={variant} position="popper">
                                  <SelectItemsDemo />
                                </SelectContent>
                              </SelectRoot>
                            </td>
                            <td>
                              <SelectRoot defaultValue="apple" size="1">
                                <SelectTrigger />
                                <SelectContent variant={variant} highContrast position="popper">
                                  <SelectItemsDemo />
                                </SelectContent>
                              </SelectRoot>
                            </td>
                            <td>
                              <SelectRoot defaultValue="apple" size="1">
                                <SelectTrigger />
                                <SelectContent variant={variant} color="gray" position="popper">
                                  <SelectItemsDemo />
                                </SelectContent>
                              </SelectRoot>
                            </td>
                            <td>
                              <SelectRoot defaultValue="apple" size="1">
                                <SelectTrigger />
                                <SelectContent
                                  variant={variant}
                                  color="gray"
                                  highContrast
                                  position="popper"
                                >
                                  <SelectItemsDemo />
                                </SelectContent>
                              </SelectRoot>
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
                                    <SelectRoot defaultValue="apple" size={size}>
                                      <SelectTrigger radius={radius} />
                                      <SelectContent>
                                        <SelectItemsDemo />
                                      </SelectContent>
                                    </SelectRoot>
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
                      {themeAccentColorsGrouped.map(({ label, values }) => (
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
                                      <SelectRoot defaultValue="apple" size="1">
                                        <SelectTrigger variant={variant} color={color} />
                                        <SelectContent variant="soft" color={color}>
                                          <SelectItemsDemo />
                                        </SelectContent>
                                      </SelectRoot>
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
                      {themeAccentColorsGrouped.map(({ label, values }) => (
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
                      {themeAccentColorsGrouped.map(({ label, values }) => (
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

                  <DocsSection title="Checkbox">
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
                                  <Checkbox size={size} defaultChecked />
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
                      {themeAccentColorsGrouped.map(({ label, values }) => (
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
                            {radioGroupPropDefs.variant.values.map((variant) => (
                              <React.Fragment key={variant}>
                                {[variant, '+ high-contrast'].map((label) => (
                                  <tr key={label}>
                                    <RowHeaderCell>{label}</RowHeaderCell>
                                    <td>
                                      <RadioGroupRoot
                                        variant={variant}
                                        highContrast={label === '+ high-contrast'}
                                      >
                                        <RadioGroupItem value="value" />
                                      </RadioGroupRoot>
                                    </td>
                                    <td>
                                      <RadioGroupRoot
                                        variant={variant}
                                        defaultValue="value"
                                        highContrast={label === '+ high-contrast'}
                                      >
                                        <RadioGroupItem value="value" />
                                      </RadioGroupRoot>
                                    </td>
                                    <td>
                                      <RadioGroupRoot
                                        variant={variant}
                                        highContrast={label === '+ high-contrast'}
                                      >
                                        <RadioGroupItem value="value" disabled />
                                      </RadioGroupRoot>
                                    </td>
                                    <td>
                                      <RadioGroupRoot
                                        variant={variant}
                                        highContrast={label === '+ high-contrast'}
                                        disabled
                                        defaultValue="value"
                                      >
                                        <RadioGroupItem value="value" />
                                      </RadioGroupRoot>
                                    </td>
                                  </tr>
                                ))}
                              </React.Fragment>
                            ))}
                          </tbody>
                        </table>

                        <table className={styles.table}>
                          <tbody>
                            {radioGroupPropDefs.size.values.map((size) => (
                              <tr key={size}>
                                <RowHeaderCell>size {size}</RowHeaderCell>
                                <td>
                                  <RadioGroupRoot size={size} defaultValue="value">
                                    <RadioGroupItem value="value" />
                                  </RadioGroupRoot>
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

                          <RadioGroupRoot defaultValue="1" size="1">
                            <Flex direction="column" gap="1">
                              <Text size="1" asChild>
                                <label>
                                  <Flex gap="2">
                                    <RadioGroupItem value="1" />
                                    <Text>Agree to Terms and Conditions</Text>
                                  </Flex>
                                </label>
                              </Text>
                              <Text size="1" asChild>
                                <label>
                                  <Flex gap="2">
                                    <RadioGroupItem value="2" />
                                    <Text>Disagree with Terms and Conditions</Text>
                                  </Flex>
                                </label>
                              </Text>
                            </Flex>
                          </RadioGroupRoot>

                          <Separator size="4" />

                          <RadioGroupRoot defaultValue="1" size="1">
                            <Flex direction="column" gap="1">
                              <Text size="2" asChild>
                                <label>
                                  <Flex gap="2">
                                    <RadioGroupItem value="1" />
                                    <Text>Agree to Terms and Conditions</Text>
                                  </Flex>
                                </label>
                              </Text>
                              <Text size="2" asChild>
                                <label>
                                  <Flex gap="2">
                                    <RadioGroupItem value="2" />
                                    <Text>Disagree with Terms and Conditions</Text>
                                  </Flex>
                                </label>
                              </Text>
                            </Flex>
                          </RadioGroupRoot>

                          <Separator size="4" />

                          <RadioGroupRoot defaultValue="1" size="2">
                            <Flex direction="column" gap="1">
                              <Text size="2" asChild>
                                <label>
                                  <Flex gap="2">
                                    <RadioGroupItem value="1" />
                                    <Text>Agree to Terms and Conditions</Text>
                                  </Flex>
                                </label>
                              </Text>
                              <Text size="2" asChild>
                                <label>
                                  <Flex gap="2">
                                    <RadioGroupItem value="2" />
                                    <Text>Disagree with Terms and Conditions</Text>
                                  </Flex>
                                </label>
                              </Text>
                            </Flex>
                          </RadioGroupRoot>

                          <Separator size="4" />

                          <RadioGroupRoot defaultValue="1" size="2">
                            <Flex direction="column" gap="1">
                              <Text size="3" asChild>
                                <label>
                                  <Flex gap="2">
                                    <RadioGroupItem value="1" />
                                    <Text>Agree to Terms and Conditions</Text>
                                  </Flex>
                                </label>
                              </Text>
                              <Text size="3" asChild>
                                <label>
                                  <Flex gap="2">
                                    <RadioGroupItem value="2" />
                                    <Text>Disagree with Terms and Conditions</Text>
                                  </Flex>
                                </label>
                              </Text>
                            </Flex>
                          </RadioGroupRoot>

                          <Separator size="4" />

                          <RadioGroupRoot defaultValue="1" size="3">
                            <Flex direction="column" gap="1">
                              <Text size="3" asChild>
                                <label>
                                  <Flex gap="2">
                                    <RadioGroupItem value="1" />
                                    <Text>Agree to Terms and Conditions</Text>
                                  </Flex>
                                </label>
                              </Text>
                              <Text size="3" asChild>
                                <label>
                                  <Flex gap="2">
                                    <RadioGroupItem value="2" />
                                    <Text>Disagree with Terms and Conditions</Text>
                                  </Flex>
                                </label>
                              </Text>
                            </Flex>
                          </RadioGroupRoot>

                          <Separator size="4" />

                          <RadioGroupRoot defaultValue="1" size="3">
                            <Flex direction="column" gap="1">
                              <Text size="4" asChild>
                                <label>
                                  <Flex gap="2">
                                    <RadioGroupItem value="1" />
                                    <Text>Agree to Terms and Conditions</Text>
                                  </Flex>
                                </label>
                              </Text>
                              <Text size="4" asChild>
                                <label>
                                  <Flex gap="2">
                                    <RadioGroupItem value="2" />
                                    <Text>Disagree with Terms and Conditions</Text>
                                  </Flex>
                                </label>
                              </Text>
                            </Flex>
                          </RadioGroupRoot>

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
                      {themeAccentColorsGrouped.map(({ label, values }) => (
                        <React.Fragment key={label}>
                          <Text as="p" weight="bold" mt="6" mb="4">
                            {label}
                          </Text>
                          <table className={styles.table}>
                            <thead>
                              <tr>
                                <ColumnHeaderCell />
                                {radioGroupPropDefs.variant.values.map((variant) => (
                                  <ColumnHeaderCell key={variant}>{variant}</ColumnHeaderCell>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {values.map((color) => (
                                <tr key={color}>
                                  <RowHeaderCell>{color}</RowHeaderCell>
                                  {radioGroupPropDefs.variant.values.map((variant) => (
                                    <td key={variant}>
                                      <Flex gap="2">
                                        <RadioGroupRoot
                                          variant={variant}
                                          color={color}
                                          defaultValue="value"
                                        >
                                          <RadioGroupItem value="value" />
                                        </RadioGroupRoot>
                                        <RadioGroupRoot
                                          variant={variant}
                                          color={color}
                                          defaultValue="value"
                                          highContrast
                                        >
                                          <RadioGroupItem value="value" />
                                        </RadioGroupRoot>
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
                      {themeAccentColorsGrouped.map(({ label, values }) => (
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
                      {themeAccentColorsGrouped.map(({ label, values }) => (
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
                          {textFieldPropDefs.size.values.map((size) => (
                            <ColumnHeaderCell key={size}>size {size}</ColumnHeaderCell>
                          ))}
                          <ColumnHeaderCell>disabled</ColumnHeaderCell>
                          <ColumnHeaderCell>read-only</ColumnHeaderCell>
                        </tr>
                      </thead>
                      <tbody>
                        {textFieldPropDefs.variant.values.map((variant) => (
                          <React.Fragment key={variant}>
                            {[variant, '+ gray'].map((label) => (
                              <tr key={label}>
                                <RowHeaderCell>{label}</RowHeaderCell>
                                {textFieldPropDefs.size.values.map((size) => (
                                  <td key={size}>
                                    <Flex direction="column" gap="2">
                                      <TextFieldInput
                                        size={size}
                                        variant={variant}
                                        color={label === '+ gray' ? 'gray' : undefined}
                                        placeholder="Your name"
                                      />
                                      <TextFieldRoot
                                        size={size}
                                        variant={variant}
                                        color={label === '+ gray' ? 'gray' : undefined}
                                      >
                                        <TextFieldSlot>
                                          <InfoCircledIcon />
                                        </TextFieldSlot>
                                        <TextFieldInput placeholder="Your name" />
                                        <TextFieldSlot>
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
                                        </TextFieldSlot>
                                      </TextFieldRoot>
                                      <TextFieldInput
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
                                    <TextFieldInput
                                      variant={variant}
                                      color={label === '+ gray' ? 'gray' : undefined}
                                      placeholder="Your name"
                                      disabled
                                    />
                                    <TextFieldRoot
                                      variant={variant}
                                      color={label === '+ gray' ? 'gray' : undefined}
                                    >
                                      <TextFieldSlot>
                                        <InfoCircledIcon />
                                      </TextFieldSlot>
                                      <TextFieldInput placeholder="Your name" disabled />
                                      <TextFieldSlot>
                                        <IconButton size="1" variant="ghost" color="gray">
                                          <StarIcon />
                                        </IconButton>
                                      </TextFieldSlot>
                                    </TextFieldRoot>
                                    <TextFieldInput
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
                                    <TextFieldInput
                                      variant={variant}
                                      color={label === '+ gray' ? 'gray' : undefined}
                                      placeholder="Your name"
                                      readOnly
                                    />
                                    <TextFieldRoot
                                      variant={variant}
                                      color={label === '+ gray' ? 'gray' : undefined}
                                    >
                                      <TextFieldSlot>
                                        <InfoCircledIcon />
                                      </TextFieldSlot>
                                      <TextFieldInput placeholder="Your name" readOnly />
                                      <TextFieldSlot>
                                        <IconButton size="1" variant="ghost" color="gray">
                                          <StarIcon />
                                        </IconButton>
                                      </TextFieldSlot>
                                    </TextFieldRoot>
                                    <TextFieldInput
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
                          <TextFieldInput
                            mb="2"
                            variant="classic"
                            autoComplete="email"
                            placeholder="Autofill (Email)"
                            size="2"
                            type="email"
                          />
                          <TextFieldInput
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
                          <TextFieldInput
                            mb="2"
                            variant="surface"
                            autoComplete="email"
                            placeholder="Autofill (Email)"
                            size="2"
                            type="email"
                          />
                          <TextFieldInput
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
                          <TextFieldInput
                            mb="2"
                            variant="soft"
                            autoComplete="email"
                            placeholder="Autofill (Email)"
                            size="2"
                            type="email"
                          />
                          <TextFieldInput
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
                          <TextFieldInput
                            mb="2"
                            variant="soft"
                            color="gray"
                            autoComplete="email"
                            placeholder="Autofill (Email)"
                            size="2"
                            type="email"
                          />
                          <TextFieldInput
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
                              {textFieldPropDefs.size.values.map((size) => (
                                <ColumnHeaderCell key={size}>size {size}</ColumnHeaderCell>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {textFieldPropDefs.radius.values.map((radius) => (
                              <tr key={radius}>
                                <RowHeaderCell>{radius}</RowHeaderCell>
                                {textFieldPropDefs.size.values.map((size) => (
                                  <td key={size}>
                                    <TextFieldInput
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
                      {themeAccentColorsGrouped.map(({ label, values }) => (
                        <React.Fragment key={label}>
                          <Text as="p" weight="bold" mt="6" mb="4">
                            {label}
                          </Text>
                          <table className={styles.table}>
                            <thead>
                              <tr>
                                <ColumnHeaderCell />
                                {textFieldPropDefs.variant.values.map((variant) => (
                                  <ColumnHeaderCell key={variant}>{variant}</ColumnHeaderCell>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {values.map((color) => (
                                <tr key={color}>
                                  <RowHeaderCell>{color}</RowHeaderCell>
                                  {textFieldPropDefs.variant.values.map((variant) => (
                                    <td key={variant}>
                                      <TextFieldInput
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
                      <Code>color</Code> can be set per instance:
                    </Text>

                    <details>
                      <summary>
                        <Text size="2" color="gray">
                          See colors & variants combinations
                        </Text>
                      </summary>
                      {themeAccentColorsGrouped.map(({ label, values }) => (
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
                                  {(['red', 'yellow', 'green', 'gray'] as const).map((color) => (
                                    <Flex key={color} direction="column" gap="1">
                                      <Badge size={size} variant={variant} color={color}>
                                        {upperFirst(color)}
                                      </Badge>
                                      <Badge
                                        size={size}
                                        variant={variant}
                                        color={color}
                                        highContrast
                                      >
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
                      {themeAccentColorsGrouped.map(({ label, values }) => (
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
                      {themeAccentColorsGrouped.map(({ label, values }) => (
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
                      {themeAccentColorsGrouped.map(({ label, values }) => (
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
                              <CalloutRoot variant={variant}>
                                <CalloutIcon>
                                  <InfoCircledIcon />
                                </CalloutIcon>
                                <CalloutText>
                                  We have detected multiple issues in your application configuration
                                  file. Please read our <Link href="/">Configuration Guide</Link>{' '}
                                  for more details.
                                </CalloutText>
                              </CalloutRoot>
                            </td>
                            <td style={{ width: 450 }}>
                              <CalloutRoot variant={variant} highContrast>
                                <CalloutIcon>
                                  <InfoCircledIcon />
                                </CalloutIcon>
                                <CalloutText>
                                  We have detected multiple issues in your application configuration
                                  file. Please read our <Link href="/">Configuration Guide</Link>{' '}
                                  for more details.
                                </CalloutText>
                              </CalloutRoot>
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
                              <CalloutRoot size={size}>
                                <CalloutIcon>
                                  <InfoCircledIcon
                                    width={size === '3' ? 20 : 15}
                                    height={size === '3' ? 20 : 15}
                                  />
                                </CalloutIcon>
                                <CalloutText>
                                  We have detected multiple issues in your application configuration
                                  file. Please read our <Link href="/">Configuration Guide</Link>{' '}
                                  for more details.
                                </CalloutText>
                              </CalloutRoot>
                            </td>
                            <td style={{ width: 450 }}>
                              <CalloutRoot size={size}>
                                <CalloutIcon>
                                  <InfoCircledIcon
                                    width={size === '3' ? 20 : 15}
                                    height={size === '3' ? 20 : 15}
                                  />
                                </CalloutIcon>
                                <CalloutText>There was an error in your configuration.</CalloutText>
                              </CalloutRoot>
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
                      {themeAccentColorsGrouped.map(({ label, values }) => (
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
                                        <CalloutRoot variant={variant} color={color}>
                                          <CalloutIcon>
                                            <InfoCircledIcon />
                                          </CalloutIcon>
                                          <Flex gap="3">
                                            <CalloutText>
                                              We have detected multiple issues in your application
                                              configuration file. Please read our{' '}
                                              <Link href="/">Configuration Guide</Link> for more
                                              details.
                                            </CalloutText>
                                            <IconButton size="1" variant="soft">
                                              <Cross1Icon />
                                            </IconButton>
                                          </Flex>
                                        </CalloutRoot>
                                        <CalloutRoot variant={variant} color={color} highContrast>
                                          <CalloutIcon>
                                            <InfoCircledIcon />
                                          </CalloutIcon>
                                          <CalloutText>
                                            We have detected multiple issues in your application
                                            configuration file. Please read our{' '}
                                            <Link href="/">Configuration Guide</Link> for more
                                            details.
                                          </CalloutText>
                                        </CalloutRoot>
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
                            <CalloutRoot size={size}>
                              <CalloutText trim="both">
                                We have detected multiple issues in your application configuration
                                file. Please read our <Link href="/">Configuration Guide</Link> for
                                more details.
                              </CalloutText>
                            </CalloutRoot>

                            <CalloutRoot size={size}>
                              <CalloutText trim="start">
                                There was an error in your configuration.
                              </CalloutText>
                              <CalloutText trim="end">
                                We have detected multiple issues in your application configuration
                                file. Please read our <Link href="/">Configuration Guide</Link> for
                                more details.
                              </CalloutText>
                            </CalloutRoot>

                            <CalloutRoot size={size}>
                              <CalloutIcon>
                                <InfoCircledIcon
                                  width={size === '3' ? 20 : 15}
                                  height={size === '3' ? 20 : 15}
                                />
                              </CalloutIcon>
                              <CalloutText>
                                We have detected multiple issues in your application configuration
                                file. Please read our <Link href="/">Configuration Guide</Link> for
                                more details.
                              </CalloutText>
                            </CalloutRoot>

                            <CalloutRoot size={size}>
                              <CalloutIcon>
                                <InfoCircledIcon
                                  width={size === '3' ? 20 : 15}
                                  height={size === '3' ? 20 : 15}
                                />
                              </CalloutIcon>
                              <CalloutText>There was an error in your configuration.</CalloutText>
                              <CalloutText>
                                We have detected multiple issues in your application configuration
                                file. Please read our <Link href="/">Configuration Guide</Link> for
                                more details.
                              </CalloutText>
                            </CalloutRoot>

                            <Separator />
                          </React.Fragment>
                        ))}
                      </Flex>
                    </details>
                  </DocsSection>

                  <DocsSection title="Kbd">
                    <Flex gap="4">
                      <Kbd>Enter</Kbd>
                      <Kbd>Tab</Kbd>
                      <Kbd>Shift + Tab</Kbd>
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

                  <DocsSection title="Tabs">
                    <table className={styles.table}>
                      <tbody>
                        {tabsListPropDefs.size.values.map((size) => (
                          <tr key={size}>
                            <RowHeaderCell>size {size}</RowHeaderCell>
                            <td>
                              <TabsRoot defaultValue="account" activationMode="manual">
                                <TabsList size={size}>
                                  <TabsTrigger value="account">Account</TabsTrigger>
                                  <TabsTrigger value="documents">Documents</TabsTrigger>
                                  <TabsTrigger value="settings">Settings</TabsTrigger>
                                </TabsList>
                                <TabsContent value="account">
                                  <Box py="5">Account</Box>
                                </TabsContent>
                                <TabsContent value="documents">
                                  <Box py="5">Documents</Box>
                                </TabsContent>
                                <TabsContent value="settings">
                                  <Box py="5">Settings</Box>
                                </TabsContent>
                              </TabsRoot>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
                      {textFieldPropDefs.size.values.map((size) => (
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
                          <Flex grow="1" align="center" justify="center" key={i}>
                            <Box
                              grow="1"
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
                    <Grid columns={{ initial: '1', md: '2', lg: '3' }} gap="3">
                      <Box style={{ height: 256 }}>
                        <Grid gap="3">
                          {Array.from(Array(4).keys()).map((i) => (
                            <Box key={i} style={{ height: 55, background: 'var(--accent-9)' }} />
                          ))}
                        </Grid>
                      </Box>

                      <Box style={{ height: 256 }}>
                        <Grid columns="5" gap="3" height="100%">
                          {Array.from(Array(5).keys()).map((i) => (
                            <Box key={i} style={{ background: 'var(--accent-9)' }} />
                          ))}
                        </Grid>
                      </Box>

                      <Box style={{ height: 256 }}>
                        <Grid columns={{ initial: '5' }} gap="3" height="100%">
                          {Array.from(Array(20).keys()).map((i) => (
                            <Box key={i} style={{ background: 'var(--accent-9)' }} />
                          ))}
                        </Grid>
                      </Box>
                    </Grid>
                  </DocsSection>

                  <DocsSection title="Separator">
                    <Flex direction="column" gap="5" my="5">
                      {themeAccentColorsOrdered.map((color) => (
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

                      <DropdownMenuRoot>
                        <DropdownMenuTrigger>
                          <Button>Dropdown Menu</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContentDemo />
                      </DropdownMenuRoot>

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
                </main>
              </Box>
            </div>
          </Theme>
        </NextThemeProvider>
      </body>
    </html>
  );
}

function DropdownMenuContentDemo(props: React.ComponentProps<typeof DropdownMenuContent>) {
  return (
    <DropdownMenuContent {...props}>
      <DropdownMenuItem shortcut="⌘+T">New Tab</DropdownMenuItem>
      <DropdownMenuItem shortcut="⌘+N">New Window</DropdownMenuItem>
      <DropdownMenuItem shortcut="⇧+⌘+N" disabled>
        New Private Window
      </DropdownMenuItem>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>More Tools</DropdownMenuSubTrigger>

        <DropdownMenuSubContent>
          <DropdownMenuItem shortcut="⌘+S">Save Page As…</DropdownMenuItem>
          <DropdownMenuItem>Create Shortcut…</DropdownMenuItem>
          <DropdownMenuItem>Name Window…</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Developer Tools</DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuSub>

      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuLabel>Other</DropdownMenuLabel>
        <DropdownMenuItem shortcut="⌘+P">Print</DropdownMenuItem>
        <DropdownMenuItem shortcut="⌘+Q" asChild>
          <a href="#logout">Logout</a>
        </DropdownMenuItem>
      </DropdownMenuGroup>

      {props.variant === 'solid' && (
        <>
          <DropdownMenuSeparator />

          <DropdownMenuCheckboxItem shortcut="⌘+B" checked>
            Show Bookmarks
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>Show Full URLs</DropdownMenuCheckboxItem>

          <DropdownMenuSeparator />

          <DropdownMenuLabel>People</DropdownMenuLabel>
          <DropdownMenuRadioGroup value="pedro">
            <DropdownMenuRadioItem value="pedro">Pedro Duarte</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="colm">Colm Tuite</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>

          <DropdownMenuSeparator />

          <DropdownMenuItem color="red">Delete</DropdownMenuItem>
        </>
      )}
    </DropdownMenuContent>
  );
}

function ContextMenuContentDemo(props: React.ComponentProps<typeof ContextMenuContent>) {
  return (
    <ContextMenuContent {...props}>
      <ContextMenuItem shortcut="⌘+T">New Tab</ContextMenuItem>
      <ContextMenuItem shortcut="⌘+N">New Window</ContextMenuItem>
      <ContextMenuItem shortcut="⇧+⌘+N" disabled>
        New Private Window
      </ContextMenuItem>
      <ContextMenuSub>
        <ContextMenuSubTrigger>More Tools</ContextMenuSubTrigger>

        <ContextMenuSubContent>
          <ContextMenuItem shortcut="⌘+S">Save Page As…</ContextMenuItem>
          <ContextMenuItem>Create Shortcut…</ContextMenuItem>
          <ContextMenuItem>Name Window…</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Developer Tools</ContextMenuItem>
        </ContextMenuSubContent>
      </ContextMenuSub>

      <ContextMenuSeparator />
      <ContextMenuGroup>
        <ContextMenuLabel>Other</ContextMenuLabel>
        <ContextMenuItem shortcut="⌘+P">Print</ContextMenuItem>
        <ContextMenuItem shortcut="⌘+Q" asChild>
          <a href="#logout">Logout</a>
        </ContextMenuItem>
      </ContextMenuGroup>

      {props.variant === 'solid' && (
        <>
          <ContextMenuSeparator />

          <ContextMenuCheckboxItem shortcut="⌘+B" checked>
            Show Bookmarks
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>

          <ContextMenuSeparator />

          <ContextMenuLabel>People</ContextMenuLabel>
          <ContextMenuRadioGroup value="pedro">
            <ContextMenuRadioItem value="pedro">Pedro Duarte</ContextMenuRadioItem>
            <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
          </ContextMenuRadioGroup>

          <DropdownMenuSeparator />

          <ContextMenuItem color="red">Delete</ContextMenuItem>
        </>
      )}
    </ContextMenuContent>
  );
}

type RightClickAreaProps = React.ComponentProps<typeof Grid> & {
  size: '1' | '2';
};
function RightClickArea({ size = '2', ...props }: RightClickAreaProps) {
  return (
    <Grid
      height={size === '2' ? '8' : '6'}
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
      <SelectGroup>
        <SelectLabel>Fruits</SelectLabel>
        <SelectItem value="orange">Orange</SelectItem>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="grapes" disabled>
          Grape
        </SelectItem>
      </SelectGroup>

      <SelectSeparator />

      <SelectGroup>
        <SelectLabel>Vegetables</SelectLabel>
        <SelectItem value="carrot">Carrot</SelectItem>
        <SelectItem value="potato">Potato</SelectItem>
      </SelectGroup>
    </>
  );
}

function DocsSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <Container mx="6">
        <Section size="2">
          <Heading size="6" weight="regular" mb="4" as="h2">
            <Link href={`#${title}`} id={title}>
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
  size?: React.ComponentProps<typeof TextFieldInput>['size'];
}) {
  return (
    <Flex direction="column" gap="3" {...props}>
      <Grid gap="1">
        <Text size={size} weight="bold">
          Email
        </Text>
        <TextFieldInput size={size} variant="classic" placeholder="Your email" />
      </Grid>
      <Grid gap="1">
        <Text size={size} weight="bold">
          Subject
        </Text>
        <SelectRoot defaultValue="customer" size={size}>
          <SelectTrigger variant="classic" />
          <SelectContent>
            <SelectItem value="customer">Customer feedback</SelectItem>
            <SelectItem value="help">Help</SelectItem>
          </SelectContent>
        </SelectRoot>
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

function TableExample(props: React.ComponentProps<typeof TableRoot> & { noEmail?: boolean }) {
  const { noEmail, ...rootProps } = props;
  return (
    <TableRoot {...rootProps}>
      <TableHeader>
        <TableRow>
          <TableColumnHeaderCell>Full name</TableColumnHeaderCell>
          {!noEmail && <TableColumnHeaderCell>Email</TableColumnHeaderCell>}
          <TableColumnHeaderCell>Group</TableColumnHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableRowHeaderCell>Andy</TableRowHeaderCell>
          {!noEmail && <TableCell>andy@workos.com</TableCell>}
          <TableCell>Developer</TableCell>
        </TableRow>
        <TableRow>
          <TableRowHeaderCell>Benoit</TableRowHeaderCell>
          {!noEmail && <TableCell>benoit@workos.com</TableCell>}
          <TableCell>Admin</TableCell>
        </TableRow>
        <TableRow>
          <TableRowHeaderCell>Lucas</TableRowHeaderCell>
          {!noEmail && <TableCell>lucas@workos.com</TableCell>}
          <TableCell>Developer</TableCell>
        </TableRow>
        <TableRow>
          <TableRowHeaderCell>Vlad</TableRowHeaderCell>
          {!noEmail && <TableCell>vlad@workos.com</TableCell>}
          <TableCell>Designer</TableCell>
        </TableRow>
      </TableBody>
    </TableRoot>
  );
}
