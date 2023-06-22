import * as React from 'react';
import {
  ArrowTopRightIcon,
  ArrowRightIcon,
  DotsHorizontalIcon,
  Pencil2Icon,
  Share2Icon,
} from '@radix-ui/react-icons';
import NextLink from 'next/link';
import {
  Provider,
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
  avatarSizes,
  avatarVariants,
  //
  Badge,
  badgeSizes,
  badgeVariants,
  //
  Blockquote,
  Box,
  //
  Button,
  buttonSizes,
  buttonVariants,
  //
  Checkbox,
  checkboxSizes,
  checkboxVariants,
  //
  Code,
  codeSizes,
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
  contextMenuSizes,
  contextMenuVariants,
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
  dropdownMenuSizes,
  dropdownMenuVariants,
  //
  Em,
  Flex,
  Grid,
  //
  Heading,
  headingSizes,
  //
  HoverCardRoot,
  HoverCardTrigger,
  HoverCardContent,
  //
  IconButton,
  iconButtonSizes,
  iconButtonVariants,
  //
  Kbd,
  //
  Link,
  linkSizes,
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
  radioGroupSizes,
  radioGroupVariants,
  //
  ScrollArea,
  scrollAreaSizes,
  //
  Section,
  //
  SelectRoot,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
  selectSizes,
  selectTriggerVariants,
  selectMenuVariants,
  //
  Separator,
  //
  Slider,
  sliderSizes,
  sliderVariants,
  //
  Strong,
  Sup,
  //
  Switch,
  switchSizes,
  switchVariants,
  //
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
  tabsListSizes,
  //
  TextArea,
  textAreaSizes,
  textAreaVariants,
  //
  TextField,
  textFieldSizes,
  textFieldVariants,
  //
  Text,
  textSizes,
  //
  Tooltip,
  //
  // helpers:
  groupedColors,
  buttonRadiusValues as radiusValues,
} from '@radix-ui/themes';
import { ControlPanel } from '../../components/control-panel';
// import { HideCursor } from './hide-cursor';
import styles from './page.module.css';

import type {
  ContextMenuSize,
  ContextMenuVariant,
  DropdownMenuSize,
  DropdownMenuVariant,
} from '@radix-ui/themes';

export default function Sink() {
  return (
    <html
      lang="en"
      className={styles.root}
      // className="dark-theme"
    >
      <body className="rui-reset-body">
        <div id="root">
          <Provider
          // dir="rtl"
          >
            {/* <HideCursor /> */}
            <ControlPanel />

            {/* <header
              style={{ backgroundColor: 'var(--blackA2)', boxShadow: '0 0 0 0.5px var(--monoA6)' }}
            >
              <Container>
                <nav>
                  <Flex p="6" gap="5" align="center">
                    <Link asChild variant="high-contrast">
                      <NextLink href="sink">Kitchen sink</NextLink>
                    </Link>
                    <Separator orientation="vertical" />
                    <Link href="home-os" color="gray">
                      Home OS
                    </Link>
                    <Link href="snapshot" color="gray">
                      Snapshot
                    </Link>
                  </Flex>
                </nav>
              </Container>
            </header> */}

            <main
            // dir="rtl"
            >
              <DocsSection title="Dialog">
                <DialogRoot>
                  <DialogTrigger>
                    <Button variant="solid">Open</Button>
                  </DialogTrigger>
                  <DialogContent style={{ maxWidth: 450 }}>
                    <Flex direction="column" gap="3">
                      <DialogTitle>Share resource</DialogTitle>
                      <DialogDescription size="2">
                        Jan Tschichold was a German calligrapher, typographer and book designer. He
                        played a significant role in the development of graphic design in the 20th
                        century.
                      </DialogDescription>
                      <Flex gap="3" mt="4" justify="end">
                        <DialogClose>
                          <Button variant="subtle-mono">Cancel</Button>
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
              </DocsSection>

              <DocsSection title="AlertDialog">
                <AlertDialogRoot>
                  <AlertDialogTrigger>
                    <Button variant="solid">Open</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent style={{ maxWidth: 450 }}>
                    <Flex direction="column" gap="3">
                      <AlertDialogTitle>Revoke setup link</AlertDialogTitle>
                      <AlertDialogDescription size="2">
                        The setup link will no longer be accessible and any existing setup sessions
                        will be revoked.
                      </AlertDialogDescription>
                      <Flex gap="3" mt="4" justify="end">
                        <AlertDialogCancel>
                          <Button variant="subtle-mono">Cancel</Button>
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
              </DocsSection>

              <DocsSection title="HoverCard">
                <HoverCardRoot>
                  <HoverCardTrigger>
                    <Link>A fancy link</Link>
                  </HoverCardTrigger>
                  <HoverCardContent style={{ width: 200 }}>
                    <Text size="2">
                      Jan Tschichold was a German calligrapher, typographer and book designer. He
                      played a significant role in the development of graphic design in the 20th
                      century.
                    </Text>
                  </HoverCardContent>
                </HoverCardRoot>
              </DocsSection>

              <DocsSection title="Popover">
                <PopoverRoot>
                  <PopoverTrigger>
                    <Button variant="solid">Popover</Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Box p="4" style={{ width: 200 }}>
                      <Text size="2" mb="2">
                        Jan Tschichold was a German calligrapher, typographer and book designer. He
                        played a significant role in the development of graphic design in the 20th
                        century.
                      </Text>
                      <Button variant="solid" size="1">
                        Share <Share2Icon />
                      </Button>
                    </Box>
                  </PopoverContent>
                </PopoverRoot>
              </DocsSection>

              <DocsSection title="Tooltip">
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
                    multiline
                  >
                    <Button variant="solid" size="1">
                      Multiline
                    </Button>
                  </Tooltip>
                </Flex>
              </DocsSection>

              <DocsSection title="DropdownMenu">
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <ColumnHeaderCell />
                      {dropdownMenuSizes.map((size) => (
                        <ColumnHeaderCell key={size}>size {size}</ColumnHeaderCell>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {dropdownMenuVariants.map((variant) => (
                      <tr key={variant}>
                        <RowHeaderCell>{variant}</RowHeaderCell>
                        {dropdownMenuSizes.map((size) => (
                          <td key={size}>
                            <DropdownMenuRoot>
                              <DropdownMenuTrigger>
                                <Button variant="subtle-mono" size={size}>
                                  <DotsHorizontalIcon />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContentDemo size={size} variant={variant} />
                            </DropdownMenuRoot>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </DocsSection>

              <DocsSection title="ContextMenu">
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <ColumnHeaderCell />
                      {contextMenuSizes.map((size) => (
                        <ColumnHeaderCell key={size}>size {size}</ColumnHeaderCell>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {contextMenuVariants.map((variant) => (
                      <tr key={variant}>
                        <RowHeaderCell>{variant}</RowHeaderCell>
                        {contextMenuSizes.map((size) => (
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
              </DocsSection>

              <DocsSection title="Select">
                <Text my="5">Trigger variants:</Text>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <ColumnHeaderCell />
                      {selectSizes.map((size) => (
                        <ColumnHeaderCell key={size}>size {size}</ColumnHeaderCell>
                      ))}
                      <ColumnHeaderCell>disabled</ColumnHeaderCell>
                    </tr>
                  </thead>
                  <tbody>
                    {selectTriggerVariants.map((variant) => (
                      <tr key={variant}>
                        <RowHeaderCell>{variant}</RowHeaderCell>
                        {selectSizes.map((size) => (
                          <td key={size}>
                            <SelectRoot defaultValue="apple" size={size} triggerVariant={variant}>
                              <SelectItemsDemo />
                            </SelectRoot>
                          </td>
                        ))}
                        <td>
                          <SelectRoot
                            defaultValue="apple"
                            size="2"
                            triggerVariant={variant}
                            disabled
                          >
                            <SelectItemsDemo />
                          </SelectRoot>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <Text mt="8" mb="4">
                  Menu variants:
                </Text>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <ColumnHeaderCell />
                      <ColumnHeaderCell colSpan={2}>
                        position: &quot;item-aligned&quot;
                      </ColumnHeaderCell>
                      <ColumnHeaderCell colSpan={2}>position: &quot;popper&quot;</ColumnHeaderCell>
                    </tr>
                  </thead>
                  <tbody>
                    {selectMenuVariants.map((variant) => (
                      <tr key={variant}>
                        <RowHeaderCell>{variant}</RowHeaderCell>
                        {selectSizes.map((size) => (
                          <td key={size}>
                            <SelectRoot defaultValue="apple" size={size} menuVariant={variant}>
                              <SelectItemsDemo />
                            </SelectRoot>
                          </td>
                        ))}

                        {selectSizes.map((size) => (
                          <td key={size}>
                            <SelectRoot
                              defaultValue="apple"
                              size={size}
                              menuVariant={variant}
                              position="popper"
                            >
                              <SelectItemsDemo />
                            </SelectRoot>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>

                <Text my="5">
                  <Code>radius</Code> can be set per instance:
                </Text>

                <details>
                  <summary>
                    <Text size="2" color="gray" asChild>
                      <span>See specific radius examples</span>
                    </Text>
                  </summary>
                  <Box mt="3">
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <ColumnHeaderCell />
                          {selectSizes.map((size) => (
                            <ColumnHeaderCell key={size}>size {size}</ColumnHeaderCell>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {radiusValues.map((radius) => (
                          <tr key={radius}>
                            <RowHeaderCell>{radius}</RowHeaderCell>
                            {selectSizes.map((size) => (
                              <td key={size}>
                                <SelectRoot defaultValue="apple" size={size} radius={radius}>
                                  <SelectItemsDemo />
                                </SelectRoot>
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Box>
                </details>

                <Text my="5">
                  <Code>color</Code> can be set per instance:
                </Text>

                <details>
                  <summary>
                    <Text size="2" color="gray" asChild>
                      <span>See colors & variants combinations</span>
                    </Text>
                  </summary>
                  {groupedColors.map(({ label, colors }) => (
                    <React.Fragment key={label}>
                      <Text weight="bold" mt="6" mb="4">
                        {label}
                      </Text>
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <ColumnHeaderCell />
                            {selectTriggerVariants.map((variant) => (
                              <ColumnHeaderCell key={variant}>{variant}</ColumnHeaderCell>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {colors.map((color) => (
                            <tr key={color}>
                              <RowHeaderCell>{color}</RowHeaderCell>
                              {selectTriggerVariants.map((variant) => (
                                <td key={variant}>
                                  <SelectRoot
                                    defaultValue="apple"
                                    size="1"
                                    triggerVariant={variant}
                                    menuVariant="subtle"
                                    color={color}
                                  >
                                    <SelectItemsDemo />
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
                    {switchVariants.map((variant) => (
                      <tr key={variant}>
                        <RowHeaderCell>{variant}</RowHeaderCell>
                        <td>
                          <Text size="2" asChild>
                            <label>
                              I agree
                              <Switch ml="2" variant={variant} />
                            </label>
                          </Text>
                        </td>
                        <td>
                          <Text size="2" asChild>
                            <label>
                              I agree
                              <Switch ml="2" variant={variant} defaultChecked />
                            </label>
                          </Text>
                        </td>
                        <td>
                          <Text size="2" asChild>
                            <label>
                              I agree
                              <Switch ml="2" variant={variant} disabled />
                            </label>
                          </Text>
                        </td>
                        <td>
                          <Text size="2" asChild>
                            <label>
                              I agree
                              <Switch ml="2" variant={variant} disabled defaultChecked />
                            </label>
                          </Text>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <table className={styles.table}>
                  <tbody>
                    {switchSizes.map((size) => (
                      <tr key={size}>
                        <RowHeaderCell>size {size}</RowHeaderCell>
                        <td>
                          <Text size="2">
                            <label>
                              I agree
                              <Switch ml="2" size={size} defaultChecked={size === '2'} />
                            </label>
                          </Text>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <Text my="5">
                  <Code>radius</Code> can be set per instance:
                </Text>

                <details>
                  <summary>
                    <Text size="2" color="gray" asChild>
                      <span>See specific radius examples</span>
                    </Text>
                  </summary>
                  <Box mt="3">
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <ColumnHeaderCell />
                          {switchSizes.map((size) => (
                            <ColumnHeaderCell key={size}>size {size}</ColumnHeaderCell>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {radiusValues.map((radius) => (
                          <tr key={radius}>
                            <RowHeaderCell>{radius}</RowHeaderCell>
                            {switchSizes.map((size) => (
                              <td key={size}>
                                <Text size="2">
                                  <label>
                                    I agree
                                    <Switch size={size} ml="2" radius={radius} />
                                  </label>
                                </Text>
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Box>
                </details>

                <Text my="5">
                  <Code>color</Code> can be set per instance:
                </Text>

                <details>
                  <summary>
                    <Text size="2" color="gray" asChild>
                      <span>See colors</span>
                    </Text>
                  </summary>
                  {groupedColors.map(({ label, colors }) => (
                    <React.Fragment key={label}>
                      <Text weight="bold" mt="6" mb="4">
                        {label}
                      </Text>
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <ColumnHeaderCell />
                            {switchVariants.map((variant) => (
                              <RowHeaderCell key={variant}>{variant}</RowHeaderCell>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {colors.map((color) => (
                            <tr key={color}>
                              <RowHeaderCell>{color}</RowHeaderCell>
                              {switchVariants.map((variant) => (
                                <td key={variant}>
                                  <Text size="2" asChild>
                                    <label>
                                      I agree
                                      <Switch
                                        variant={variant}
                                        color={color}
                                        defaultChecked
                                        ml="2"
                                      />
                                    </label>
                                  </Text>
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

                <Text mb="3">Alignement</Text>

                <Flex direction="column" gap="3" style={{ maxWidth: 324 }}>
                  <Text size="2">
                    <label>
                      <Switch mr="2" />
                      Agree to Terms and Conditions
                    </label>
                  </Text>

                  <label>
                    <Flex gap="2">
                      <Switch />
                      <Text size="2">
                        I understand that these documents are confidential and cannot be shared with
                        a third party.
                      </Text>
                    </Flex>
                  </label>

                  {textSizes.slice(0, 4).map((size) => (
                    <label key={size}>
                      <Flex align="center" gap="2">
                        <Switch />
                        <Text size={size}>Agree to Terms and Conditions</Text>
                      </Flex>
                    </label>
                  ))}
                </Flex>
              </DocsSection>

              <DocsSection title="Slider">
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <ColumnHeaderCell />
                      {sliderSizes.map((size) => (
                        <ColumnHeaderCell key={size}>size {size}</ColumnHeaderCell>
                      ))}
                      <ColumnHeaderCell>disabled</ColumnHeaderCell>
                    </tr>
                  </thead>
                  <tbody>
                    {sliderVariants.map((variant) => (
                      <tr key={variant}>
                        <RowHeaderCell>{variant}</RowHeaderCell>
                        {sliderSizes.map((size) => (
                          <td key={size} style={{ minWidth: 150 }}>
                            <Slider size={size} variant={variant} defaultValue={[50]} />
                          </td>
                        ))}
                        <td style={{ minWidth: 150 }}>
                          <Slider variant={variant} defaultValue={[50]} size="3" disabled />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <Flex gap="5" style={{ height: 200 }} mt="5">
                  {sliderSizes.map((size, i, sizes) => {
                    return (
                      <React.Fragment key={size}>
                        {sliderVariants.map((variant, j, variants) => {
                          const stepCount = variants.length * sizes.length - 1;
                          const step = i * variants.length + j;
                          const value =
                            25 + Math.round(Math.sin(Math.PI * (step / stepCount)) * 50);
                          return (
                            <Slider
                              key={variant}
                              orientation="vertical"
                              defaultValue={[value]}
                              size={size}
                              variant={variant}
                            />
                          );
                        })}
                      </React.Fragment>
                    );
                  })}
                </Flex>

                <Separator size="3" my="5" />

                <Slider defaultValue={[25, 75]} />

                <Separator size="3" my="5" />

                <Text my="5">
                  <Code>radius</Code> can be set per instance:
                </Text>

                <details>
                  <summary>
                    <Text size="2" color="gray" asChild>
                      <span>See specific radius examples</span>
                    </Text>
                  </summary>
                  <Box mt="3">
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <ColumnHeaderCell />
                          {sliderSizes.map((size) => (
                            <ColumnHeaderCell key={size}>size {size}</ColumnHeaderCell>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {radiusValues.map((radius) => (
                          <tr key={radius}>
                            <RowHeaderCell>{radius}</RowHeaderCell>
                            {sliderSizes.map((size) => (
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

                <Text my="5">
                  <Code>color</Code> can be set per instance:
                </Text>

                <details>
                  <summary>
                    <Text size="2" color="gray" asChild>
                      <span>See colors</span>
                    </Text>
                  </summary>
                  {groupedColors.map(({ label, colors }) => (
                    <React.Fragment key={label}>
                      <Text weight="bold" mt="6" mb="4">
                        {label}
                      </Text>
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <ColumnHeaderCell />
                            {sliderVariants.map((variant) => (
                              <RowHeaderCell key={variant}>{variant}</RowHeaderCell>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {colors.map((color) => (
                            <tr key={color}>
                              <RowHeaderCell>{color}</RowHeaderCell>
                              {sliderVariants.map((variant) => (
                                <td key={variant} style={{ minWidth: 150 }}>
                                  <Slider variant={variant} color={color} defaultValue={[50]} />
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
                    {checkboxVariants.map((variant) => (
                      <tr key={variant}>
                        <RowHeaderCell>{variant}</RowHeaderCell>
                        <td>
                          <Text size="2" asChild>
                            <label>
                              <Checkbox variant={variant} mr="2" />I agree
                            </label>
                          </Text>
                        </td>
                        <td>
                          <Text size="2" asChild>
                            <label>
                              <Checkbox variant={variant} mr="2" defaultChecked />I agree
                            </label>
                          </Text>
                        </td>
                        <td>
                          <Text size="2" asChild>
                            <label>
                              <Checkbox variant={variant} mr="2" disabled />I agree
                            </label>
                          </Text>
                        </td>
                        <td>
                          <Text size="2" asChild>
                            <label>
                              <Checkbox variant={variant} mr="2" disabled defaultChecked />I agree
                            </label>
                          </Text>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <table className={styles.table}>
                  <tbody>
                    {checkboxSizes.map((size) => (
                      <tr key={size}>
                        <RowHeaderCell>size {size}</RowHeaderCell>
                        <td>
                          <Text size="2">
                            <label>
                              <Checkbox mr="2" size={size} defaultChecked />I agree
                            </label>
                          </Text>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <Text my="5">
                  <Code>radius</Code> can be set per instance:
                </Text>

                <details>
                  <summary>
                    <Text size="2" color="gray" asChild>
                      <span>See specific radius examples</span>
                    </Text>
                  </summary>
                  <Box mt="3">
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <ColumnHeaderCell />
                          {checkboxSizes.map((size) => (
                            <ColumnHeaderCell key={size}>size {size}</ColumnHeaderCell>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {radiusValues.map((radius) => (
                          <tr key={radius}>
                            <RowHeaderCell>{radius}</RowHeaderCell>
                            {checkboxSizes.map((size) => (
                              <td key={size}>
                                <Text size="2">
                                  <label>
                                    <Checkbox defaultChecked radius={radius} mr="2" size={size} />I
                                    agree
                                  </label>
                                </Text>
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Box>
                </details>

                <Text my="5">
                  <Code>color</Code> can be set per instance:
                </Text>

                <details>
                  <summary>
                    <Text size="2" color="gray" asChild>
                      <span>See colors & variants combinations</span>
                    </Text>
                  </summary>
                  {groupedColors.map(({ label, colors }) => (
                    <React.Fragment key={label}>
                      <Text weight="bold" mt="6" mb="4">
                        {label}
                      </Text>
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <ColumnHeaderCell />
                            {checkboxVariants.map((variant) => (
                              <ColumnHeaderCell key={variant}>{variant}</ColumnHeaderCell>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {colors.map((color) => (
                            <tr key={color}>
                              <RowHeaderCell>{color}</RowHeaderCell>
                              {checkboxVariants.map((variant) => (
                                <td key={variant}>
                                  <Text size="2" asChild>
                                    <label>
                                      <Checkbox
                                        variant={variant}
                                        color={color}
                                        defaultChecked
                                        mr="2"
                                      />
                                      I agree
                                    </label>
                                  </Text>
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

                <Text mb="3">Alignement</Text>

                <Flex direction="column" gap="3" style={{ maxWidth: 300 }}>
                  <Text size="2">
                    <label>
                      <Checkbox mr="2" />
                      Agree to Terms and Conditions
                    </label>
                  </Text>

                  <Flex gap="2">
                    <Checkbox id={`align-1`} />
                    <Text size="2">
                      <label htmlFor={`align-1`}>
                        I understand that these documents are confidential and cannot be shared with
                        a third party.
                      </label>
                    </Text>
                  </Flex>

                  {textSizes.slice(0, 4).map((size) => (
                    <Flex align="center" gap="2" key={size}>
                      <Checkbox id={`align-size${size}`} />
                      <Text size={size}>
                        <label htmlFor={`align-size${size}`}>Agree to Terms and Conditions</label>
                      </Text>
                    </Flex>
                  ))}
                </Flex>
              </DocsSection>

              <DocsSection title="RadioGroup">
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
                    {radioGroupVariants.map((variant) => (
                      <tr key={variant}>
                        <RowHeaderCell>{variant}</RowHeaderCell>
                        <td>
                          <RadioGroupRoot variant={variant}>
                            <Text size="2" asChild>
                              <label>
                                <RadioGroupItem value="value" mr="2" />
                                My radio
                              </label>
                            </Text>
                          </RadioGroupRoot>
                        </td>
                        <td>
                          <RadioGroupRoot variant={variant}>
                            <Text size="2" asChild>
                              <label>
                                <RadioGroupItem value="value" mr="2" defaultChecked />
                                My radio
                              </label>
                            </Text>
                          </RadioGroupRoot>
                        </td>
                        <td>
                          <RadioGroupRoot variant={variant}>
                            <Text size="2" asChild>
                              <label>
                                <RadioGroupItem value="value" mr="2" disabled />
                                My radio
                              </label>
                            </Text>
                          </RadioGroupRoot>
                        </td>
                        <td>
                          <RadioGroupRoot variant={variant} disabled defaultChecked>
                            <Text size="2" asChild>
                              <label>
                                <RadioGroupItem value="value" mr="2" />
                                My radio
                              </label>
                            </Text>
                          </RadioGroupRoot>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <table className={styles.table}>
                  <tbody>
                    {radioGroupSizes.map((size) => (
                      <tr key={size}>
                        <RowHeaderCell>size {size}</RowHeaderCell>
                        <td>
                          <RadioGroupRoot size={size} defaultValue="value">
                            <Text size="2">
                              <label>
                                <RadioGroupItem value="value" mr="2" />
                                My radio
                              </label>
                            </Text>
                          </RadioGroupRoot>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <Text my="5">
                  <Code>color</Code> can be set per instance:
                </Text>

                <details>
                  <summary>
                    <Text size="2" color="gray" asChild>
                      <span>See colors & variants combinations</span>
                    </Text>
                  </summary>
                  {groupedColors.map(({ label, colors }) => (
                    <React.Fragment key={label}>
                      <Text weight="bold" mt="6" mb="4">
                        {label}
                      </Text>
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <ColumnHeaderCell />
                            {radioGroupVariants.map((variant) => (
                              <ColumnHeaderCell key={variant}>{variant}</ColumnHeaderCell>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {colors.map((color) => (
                            <tr key={color}>
                              <RowHeaderCell>{color}</RowHeaderCell>
                              {radioGroupVariants.map((variant) => (
                                <td key={variant}>
                                  <RadioGroupRoot
                                    variant={variant}
                                    color={color}
                                    defaultValue="value"
                                  >
                                    <Text size="2" asChild>
                                      <label>
                                        <RadioGroupItem value="value" mr="2" />
                                        My radio
                                      </label>
                                    </Text>
                                  </RadioGroupRoot>
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

                <Text mb="3">Alignement</Text>

                <Flex direction="column" gap="3" style={{ maxWidth: 200 }}>
                  <RadioGroupRoot>
                    <Text size="2">
                      <label>
                        <RadioGroupItem value="value" mr="2" />
                        My radio
                      </label>
                    </Text>
                  </RadioGroupRoot>

                  <RadioGroupRoot>
                    <label>
                      <Flex gap="2">
                        <RadioGroupItem value="value" />
                        <Text size="2">Automatically based on mouse or trackpad</Text>
                      </Flex>
                    </label>
                  </RadioGroupRoot>

                  {textSizes.slice(0, 4).map((size) => (
                    <RadioGroupRoot key={size}>
                      <label>
                        <Flex align="center" gap="2">
                          <RadioGroupItem value="value" />
                          <Text size={size}>Text size {size}</Text>
                        </Flex>
                      </label>
                    </RadioGroupRoot>
                  ))}
                </Flex>
              </DocsSection>

              <DocsSection title="Button">
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <ColumnHeaderCell />
                      {buttonSizes.map((size) => (
                        <ColumnHeaderCell key={size}>size {size}</ColumnHeaderCell>
                      ))}
                      <ColumnHeaderCell>disabled</ColumnHeaderCell>
                    </tr>
                  </thead>
                  <tbody>
                    {buttonVariants.map((variant) => (
                      <tr key={variant}>
                        <RowHeaderCell>{variant}</RowHeaderCell>
                        {buttonSizes.map((size) => (
                          <td key={size}>
                            <Button size={size} variant={variant}>
                              Next <ArrowRightIcon />
                            </Button>
                          </td>
                        ))}
                        <td>
                          <Button size="3" variant={variant} disabled>
                            Next <ArrowRightIcon />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <Text my="5">
                  <Code>radius</Code> can be set per instance:
                </Text>

                <details>
                  <summary>
                    <Text size="2" color="gray" asChild>
                      <span>See specific radius examples</span>
                    </Text>
                  </summary>
                  <Box mt="3">
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <ColumnHeaderCell />
                          {buttonSizes.map((size) => (
                            <ColumnHeaderCell key={size}>size {size}</ColumnHeaderCell>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {radiusValues.map((radius) => (
                          <tr key={radius}>
                            <RowHeaderCell>{radius}</RowHeaderCell>
                            {buttonSizes.map((size) => (
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

                <Text my="5">
                  <Code>color</Code> can be set per instance:
                </Text>

                <details>
                  <summary>
                    <Text size="2" color="gray" asChild>
                      <span>See colors & variants combinations</span>
                    </Text>
                  </summary>
                  {groupedColors.map(({ label, colors }) => (
                    <React.Fragment key={label}>
                      <Text weight="bold" mt="6" mb="4">
                        {label}
                      </Text>
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <ColumnHeaderCell />
                            {buttonVariants.map((variant) => (
                              <ColumnHeaderCell key={variant}>{variant}</ColumnHeaderCell>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {colors.map((color) => (
                            <tr key={color}>
                              <RowHeaderCell>{color}</RowHeaderCell>
                              {buttonVariants.map((variant) => (
                                <td key={variant}>
                                  <Button variant={variant} color={color}>
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
                      {iconButtonSizes.map((size) => (
                        <ColumnHeaderCell key={size}>size {size}</ColumnHeaderCell>
                      ))}
                      <ColumnHeaderCell>disabled</ColumnHeaderCell>
                    </tr>
                  </thead>
                  <tbody>
                    {iconButtonVariants.map((variant) => (
                      <tr key={variant}>
                        <RowHeaderCell>{variant}</RowHeaderCell>
                        {iconButtonSizes.map((size) => (
                          <td key={size}>
                            <IconButton size={size} variant={variant}>
                              <Share2Icon />
                            </IconButton>
                          </td>
                        ))}
                        <td>
                          <IconButton size="3" variant={variant} disabled>
                            <Share2Icon />
                          </IconButton>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <Text my="5">
                  <Code>radius</Code> can be set per instance:
                </Text>

                <details>
                  <summary>
                    <Text size="2" color="gray" asChild>
                      <span>See specific radius examples</span>
                    </Text>
                  </summary>
                  <Box mt="3">
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <ColumnHeaderCell />
                          {iconButtonSizes.map((size) => (
                            <ColumnHeaderCell key={size}>size {size}</ColumnHeaderCell>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {radiusValues.map((radius) => (
                          <tr key={radius}>
                            <RowHeaderCell>{radius}</RowHeaderCell>
                            {iconButtonSizes.map((size) => (
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

                <Text my="5">
                  <Code>color</Code> can be set per instance:
                </Text>

                <details>
                  <summary>
                    <Text size="2" color="gray" asChild>
                      <span>See colors & variants combinations</span>
                    </Text>
                  </summary>
                  {groupedColors.map(({ label, colors }) => (
                    <React.Fragment key={label}>
                      <Text weight="bold" mt="6" mb="4">
                        {label}
                      </Text>
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <ColumnHeaderCell />
                            {iconButtonVariants.map((variant) => (
                              <ColumnHeaderCell key={variant}>{variant}</ColumnHeaderCell>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {colors.map((color) => (
                            <tr key={color}>
                              <RowHeaderCell>{color}</RowHeaderCell>
                              {iconButtonVariants.map((variant) => (
                                <td key={variant}>
                                  <IconButton variant={variant} color={color}>
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
                      {textFieldSizes.map((size) => (
                        <ColumnHeaderCell key={size}>size {size}</ColumnHeaderCell>
                      ))}
                      <ColumnHeaderCell>value</ColumnHeaderCell>
                      <ColumnHeaderCell>disabled</ColumnHeaderCell>
                      <ColumnHeaderCell>read-only</ColumnHeaderCell>
                    </tr>
                  </thead>
                  <tbody>
                    {textFieldVariants.map((variant) => (
                      <tr key={variant}>
                        <RowHeaderCell>{variant}</RowHeaderCell>
                        {textFieldSizes.map((size) => (
                          <td key={size}>
                            <TextField variant={variant} size={size} placeholder="Your name" />
                          </td>
                        ))}
                        <td>
                          <TextField variant={variant} defaultValue="The quick brown fox jumped" />
                        </td>
                        <td>
                          <TextField
                            variant={variant}
                            placeholder="Your name"
                            disabled
                            defaultValue="The quick brown fox jumped"
                          />
                        </td>
                        <td>
                          <TextField
                            variant={variant}
                            placeholder="Your name"
                            readOnly
                            defaultValue="The quick brown fox jumped"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <Text my="5">
                  <Code>radius</Code> can be set per instance:
                </Text>

                <details>
                  <summary>
                    <Text size="2" color="gray" asChild>
                      <span>See specific radius examples</span>
                    </Text>
                  </summary>
                  <Box mt="3">
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <ColumnHeaderCell />
                          {textFieldSizes.map((size) => (
                            <ColumnHeaderCell key={size}>size {size}</ColumnHeaderCell>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {radiusValues.map((radius) => (
                          <tr key={radius}>
                            <RowHeaderCell>{radius}</RowHeaderCell>
                            {textFieldSizes.map((size) => (
                              <td key={size}>
                                <TextField size={size} radius={radius} placeholder="Your name" />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Box>
                </details>
              </DocsSection>

              <DocsSection title="TextArea">
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <ColumnHeaderCell />
                      {textAreaSizes.map((size) => (
                        <ColumnHeaderCell key={size}>size {size}</ColumnHeaderCell>
                      ))}
                      <ColumnHeaderCell>value</ColumnHeaderCell>
                      <ColumnHeaderCell>disabled</ColumnHeaderCell>
                      <ColumnHeaderCell>read-only</ColumnHeaderCell>
                    </tr>
                  </thead>
                  <tbody>
                    {textAreaVariants.map((variant) => (
                      <tr key={variant}>
                        <RowHeaderCell>{variant}</RowHeaderCell>
                        {textAreaSizes.map((size) => (
                          <td key={size}>
                            <TextArea size={size} variant={variant} placeholder="Your feedback" />
                          </td>
                        ))}
                        <td>
                          <TextArea
                            variant={variant}
                            defaultValue="Love the new design, it's looking great!"
                          />
                        </td>
                        <td>
                          <TextArea
                            variant={variant}
                            placeholder="Your feedback"
                            disabled
                            defaultValue="The :autofill CSS pseudo-class matches when an <input> element has its value autofilled by the browser."
                          />
                        </td>
                        <td>
                          <TextArea
                            variant={variant}
                            placeholder="Your feedback"
                            readOnly
                            defaultValue="The :autofill CSS pseudo-class matches when an <input> element has its value autofilled by the browser."
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <Text my="5">
                  <Code>radius</Code> can be set per instance:
                </Text>

                <details>
                  <summary>
                    <Text size="2" color="gray" asChild>
                      <span>See specific radius examples</span>
                    </Text>
                  </summary>
                  <Box mt="3">
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <ColumnHeaderCell />
                          {textAreaSizes.map((size) => (
                            <ColumnHeaderCell key={size}>size {size}</ColumnHeaderCell>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {radiusValues.map((radius) => (
                          <tr key={radius}>
                            <RowHeaderCell>{radius}</RowHeaderCell>
                            {textAreaSizes.map((size) => (
                              <td key={size}>
                                <TextArea size={size} radius={radius} placeholder="Your feedback" />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Box>
                </details>
              </DocsSection>

              <DocsSection title="Badge">
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <ColumnHeaderCell />
                      {badgeSizes.map((size) => (
                        <ColumnHeaderCell key={size}>size {size}</ColumnHeaderCell>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {badgeVariants.map((variant) => (
                      <tr key={variant}>
                        <RowHeaderCell>{variant}</RowHeaderCell>
                        {badgeSizes.map((size) => (
                          <td key={size}>
                            <Flex key={variant} gap="3" wrap="wrap" style={{ maxWidth: 600 }}>
                              {(['red', 'yellow', 'green', 'gray'] as const).map((color) => (
                                <Badge key={color} size={size} variant={variant} color={color}>
                                  {upperFirst(color)}
                                </Badge>
                              ))}
                            </Flex>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>

                <Text my="5">
                  <Code>color</Code> can be set per instance:
                </Text>

                <details>
                  <summary>
                    <Text size="2" color="gray" asChild>
                      <span>See colors & variants combinations</span>
                    </Text>
                  </summary>
                  {groupedColors.map(({ label, colors }) => (
                    <React.Fragment key={label}>
                      <Text weight="bold" mt="6" mb="4">
                        {label}
                      </Text>
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <ColumnHeaderCell />
                            {badgeVariants.map((variant) => (
                              <ColumnHeaderCell key={variant}>{variant}</ColumnHeaderCell>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {colors.map((color) => (
                            <tr key={color}>
                              <RowHeaderCell>{color}</RowHeaderCell>
                              {badgeVariants.map((variant) => (
                                <td key={variant}>
                                  <Badge variant={variant} color={color}>
                                    {color}
                                  </Badge>
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
                      {avatarSizes.map((size) => (
                        <ColumnHeaderCell key={size}>size {size}</ColumnHeaderCell>
                      ))}
                      <td>
                        <Text size="2">fallbacks →</Text>
                      </td>
                      <ColumnHeaderCell>default</ColumnHeaderCell>
                      <ColumnHeaderCell>1 letter</ColumnHeaderCell>
                      <ColumnHeaderCell>2 letters</ColumnHeaderCell>
                      <ColumnHeaderCell>custom icon</ColumnHeaderCell>
                    </tr>
                  </thead>
                  <tbody>
                    {avatarVariants.map((variant) => (
                      <tr key={variant}>
                        <RowHeaderCell>{variant}</RowHeaderCell>
                        {avatarSizes.map((size) => (
                          <td key={size}>
                            <Avatar size={size} variant={variant} src="./api/avatar" fallback="D" />
                          </td>
                        ))}
                        <td />
                        <td>
                          <Avatar variant={variant} />
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
                      </tr>
                    ))}
                  </tbody>
                </table>

                <Text my="5">
                  <Code>radius</Code> can be set per instance:
                </Text>

                <details>
                  <summary>
                    <Text size="2" color="gray" asChild>
                      <span>See specific radius examples</span>
                    </Text>
                  </summary>
                  <Box mt="3">
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <ColumnHeaderCell />
                          {avatarSizes.map((size) => (
                            <ColumnHeaderCell key={size}>size {size}</ColumnHeaderCell>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {radiusValues.map((radius) => (
                          <tr key={radius}>
                            <RowHeaderCell>{radius}</RowHeaderCell>
                            {avatarSizes.map((size) => (
                              <td key={size}>
                                <Avatar size={size} radius={radius} fallback="D" />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Box>
                </details>

                <Text my="5">
                  <Code>color</Code> can be set per instance:
                </Text>

                <details>
                  <summary>
                    <Text size="2" color="gray" asChild>
                      <span>See colors & variants combinations</span>
                    </Text>
                  </summary>
                  {groupedColors.map(({ label, colors }) => (
                    <React.Fragment key={label}>
                      <Text weight="bold" mt="6" mb="4">
                        {label}
                      </Text>
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <ColumnHeaderCell />
                            {avatarVariants.map((variant) => (
                              <ColumnHeaderCell key={variant}>{variant}</ColumnHeaderCell>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {colors.map((color) => (
                            <tr key={color}>
                              <RowHeaderCell>{color}</RowHeaderCell>
                              {avatarVariants.map((variant) => (
                                <td key={variant}>
                                  <Avatar variant={variant} color={color} fallback="D" />
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

              <DocsSection title="Typography">
                <Flex direction="column" gap="5" style={{ maxWidth: 688 }}>
                  <Text size="3">
                    The CSS rule <Code>-webkit-font-smoothing: antialiased;</Code> has been applied
                    to all fonts.google.com pages where fonts are rendered. This results in browsers
                    using the <Strong>greyscale antialiasing method</Strong> rather than default{' '}
                    <Em>subpixel rendering</Em> of fonts.{' '}
                    <Quote>
                      I believe this was probably introduced to get around inconsistencies in
                      rendering between browsers
                    </Quote>
                    , particular between Chrome and Safari on MacOS.
                    <Sup>1</Sup>
                  </Text>

                  <Heading size="9">
                    The principles of the Typographic Craft are difficult to master
                  </Heading>

                  <Heading size="8">
                    The goal of typography is to relate font size, line height, and line width
                  </Heading>

                  <Heading size="7">
                    The goal of typography is to relate font size, line height, and line width in a
                    proportional way
                  </Heading>

                  <Heading size="6">
                    The goal of typography is to relate font size, line height, and line width in a
                    proportional way
                  </Heading>

                  <Text color="gray" size="5">
                    The goal of typography is to relate font size, line height, and line width in a
                    proportional way that maximizes beauty and makes reading easier and more
                    pleasant.
                  </Text>

                  <Text size="4">
                    The goal of typography is to relate font size, line height, and line width in a
                    proportional way that maximizes beauty and makes reading easier and more
                    pleasant. The question is: What proportion(s) will give us the best results? The
                    golden ratio is often observed in nature where beauty and utility intersect;
                    perhaps we can use this “divine” proportion to enhance these attributes in our
                    typography.
                  </Text>

                  <Text size="3" style={{ maxWidth: 600 }}>
                    The goal of typography is to relate font size, line height, and line width in a
                    proportional way that maximizes beauty and makes reading easier and more
                    pleasant. The question is: What proportion(s) will give us the best results? The
                    golden ratio is often observed in nature where beauty and utility intersect;
                    perhaps we can use this “divine” proportion to enhance these attributes in our
                    typography.
                  </Text>

                  <Grid columns="2" gap="5">
                    <Text size="2" style={{ maxWidth: 400 }}>
                      The goal of typography is to relate font size, line height, and line width in
                      a proportional way that maximizes beauty and makes reading easier and more
                      pleasant. The question is: What proportion(s) will give us the best results?
                      The golden ratio is often observed in nature where beauty and utility
                      intersect; perhaps we can use this “divine” proportion to enhance these
                      attributes in our typography.
                    </Text>

                    <Text size="1" style={{ maxWidth: 400 }}>
                      The goal of typography is to relate font size, line height, and line width in
                      a proportional way that maximizes beauty and makes reading easier and more
                      pleasant. The question is: What proportion(s) will give us the best results?
                      The golden ratio is often observed in nature where beauty and utility
                      intersect; perhaps we can use this “divine” proportion to enhance these
                      attributes in our typography.
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
                    <Link variant="high-contrast" color="purple" href="/">
                      This is a link
                    </Link>
                    <Link variant="high-contrast" color="gray" href="/">
                      This is a link
                    </Link>
                    <Link variant="high-contrast" color="green" href="/">
                      This is a link
                    </Link>
                    <Link variant="high-contrast" color="red" href="/">
                      This is a link
                    </Link>
                    <Link variant="high-contrast" color="yellow" href="/">
                      This is a link
                    </Link>
                    <Link variant="high-contrast" color="blue" href="/">
                      This is a link
                    </Link>
                  </Flex>

                  <Separator size="3" my="5" />

                  <Box style={{ width: '55%' }}>
                    <Heading size="5" mb="2">
                      The principles of the Typographic Craft are difficult to master
                    </Heading>
                    <Text size="4">
                      The goal of typography is to relate font size, line height, and line width in
                      a proportional way that maximizes beauty and makes reading easier and more
                      pleasant.
                    </Text>
                  </Box>

                  <Grid columns="2" gap="5" mb="7">
                    <Box>
                      <Heading size="4" mb="2">
                        The principles of the Typographic Craft are difficult to master
                      </Heading>
                      <Text size="3">
                        The goal of typography is to relate font size, line height, and line width
                        in a proportional way that maximizes beauty and makes reading easier and
                        more pleasant.
                      </Text>
                    </Box>
                    <Box>
                      <Heading size="3" mb="2">
                        The principles of the Typographic Craft are difficult to master
                      </Heading>
                      <Text size="2">
                        The goal of typography is to relate font size, line height, and line width
                        in a proportional way that maximizes beauty and makes reading easier and
                        more pleasant.
                      </Text>
                    </Box>
                  </Grid>

                  <Grid columns="3" gap="5">
                    <Box>
                      <Heading size="2" mb="1">
                        The principles of the Typographic Craft are difficult to master
                      </Heading>
                      <Text size="2">
                        The goal of typography is to relate font size, line height, and line width
                        in a proportional way that maximizes beauty and makes reading easier and
                        more pleasant.
                      </Text>
                    </Box>
                    <Box>
                      <Heading size="2" mb="1">
                        The principles of the Typographic Craft are difficult to master
                      </Heading>
                      <Text size="1">
                        The goal of typography is to relate font size, line height, and line width
                        in a proportional way that maximizes beauty and makes reading easier and
                        more pleasant.
                      </Text>
                    </Box>
                    <Box>
                      <Heading size="1" mb="1">
                        The principles of the Typographic Craft are difficult to master
                      </Heading>
                      <Text size="1">
                        The goal of typography is to relate font size, line height, and line width
                        in a proportional way that maximizes beauty and makes reading easier and
                        more pleasant.
                      </Text>
                    </Box>
                  </Grid>

                  <Separator size="3" my="5" />

                  <Grid columns="2" gap="5">
                    <Box style={{ maxWidth: 250 }}>
                      <Text size="1" weight="bold">
                        Quick Look
                      </Text>
                      <Text color="gray" size="1">
                        Extensions from added software
                      </Text>
                    </Box>
                    <Box style={{ maxWidth: 250 }}>
                      <Text size="2" weight="bold">
                        Quick Look
                      </Text>
                      <Text color="gray" size="1">
                        Extensions from added software
                      </Text>
                    </Box>
                  </Grid>
                  <Grid columns="2" gap="5">
                    <Box style={{ maxWidth: 250 }}>
                      <Text size="2" weight="bold">
                        Quick Look
                      </Text>
                      <Text color="gray" size="2">
                        Extensions from added software
                      </Text>
                    </Box>
                    <Box style={{ maxWidth: 250 }}>
                      <Text size="3" weight="bold">
                        Quick Look
                      </Text>
                      <Text color="gray" size="2">
                        Extensions from added software
                      </Text>
                    </Box>
                  </Grid>

                  <Separator size="3" my="5" />

                  <Grid columns="2" gap="5">
                    <Box style={{ maxWidth: 250 }}>
                      <Text size="1" weight="bold">
                        Quick Look
                      </Text>
                      <Text color="gray" size="1">
                        Extensions from added software for something to do with Apple Finder.
                      </Text>
                    </Box>
                    <Box style={{ maxWidth: 250 }}>
                      <Text size="2" weight="bold">
                        Quick Look
                      </Text>
                      <Text color="gray" size="1">
                        Extensions from added software for something to do with Apple Finder.
                      </Text>
                    </Box>
                  </Grid>

                  <Grid columns="2" gap="5">
                    <Box style={{ maxWidth: 250 }}>
                      <Text size="2" weight="bold">
                        Quick Look
                      </Text>
                      <Text color="gray" size="2">
                        Extensions from added software for something to do with Apple Finder.
                      </Text>
                    </Box>
                    <Box style={{ maxWidth: 250 }}>
                      <Text size="3" weight="bold">
                        Quick Look
                      </Text>
                      <Text color="gray" size="2">
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
                      <Text color="gray" size="1">
                        Verification needed
                      </Text>
                    </Box>
                    <Box style={{ maxWidth: 250, textAlign: 'center' }}>
                      <Button variant="solid" size="2" mb="1">
                        Quick Look
                      </Button>
                      <Text color="gray" size="1">
                        Verification needed
                      </Text>
                    </Box>
                    <Box style={{ maxWidth: 250, textAlign: 'center' }}>
                      <Button variant="solid" size="1" mb="1">
                        Quick Look
                      </Button>
                      <Text color="gray" size="2">
                        Verification needed
                      </Text>
                    </Box>
                    <Box style={{ maxWidth: 250, textAlign: 'center' }}>
                      <Button variant="solid" size="2" mb="1">
                        Quick Look
                      </Button>
                      <Text color="gray" size="2">
                        Verification needed
                      </Text>
                    </Box>
                  </Grid>

                  <Separator size="3" my="5" />

                  <Blockquote>
                    The CSS rule <Code>-webkit-font-smoothing: antialiased;</Code> has been applied
                    to all fonts.google.com pages where fonts are rendered. This results in browsers
                    using the <strong>greyscale antialiasing method</strong> rather than default{' '}
                    <Em>subpixel rendering</Em> of fonts.{' '}
                    <Quote>
                      I believe this was probably introduced to get around inconsistencies in
                      rendering between browsers
                    </Quote>
                    , particular between Chrome and Safari on MacOS.
                    <Sup>1</Sup>
                  </Blockquote>
                </Flex>
              </DocsSection>

              <DocsSection title="Text">
                <Flex direction="column" gap="4">
                  {textSizes
                    .slice()
                    .reverse()
                    .map((size) => (
                      <Text key={size} size={size}>
                        The quick brown fox jumped{Number(size) < 9 && ' over the lazy dog'}
                      </Text>
                    ))}
                </Flex>
              </DocsSection>

              <DocsSection title="Code">
                <Text mb="5">
                  The <Code>console.log()</Code> method outputs a message to the web console
                </Text>
                <Flex direction="column" gap="4">
                  {codeSizes
                    .slice()
                    .reverse()
                    .map((size) => (
                      <Code key={size} size={size} highlighted={false}>
                        The quick brown fox jumped{Number(size) < 9 && ' over the lazy dog'}
                      </Code>
                    ))}
                </Flex>
              </DocsSection>

              <DocsSection title="Heading">
                <Flex direction="column" gap="4">
                  {headingSizes
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
                </Flex>
                <Flex gap="4" mb="5">
                  <Link variant="high-contrast" color="purple" href="/">
                    This is a link
                  </Link>
                  <Link variant="high-contrast" color="gray" href="/">
                    This is a link
                  </Link>
                  <Link variant="high-contrast" color="green" href="/">
                    This is a link
                  </Link>
                  <Link variant="high-contrast" color="red" href="/">
                    This is a link
                  </Link>
                  <Link variant="high-contrast" color="yellow" href="/">
                    This is a link
                  </Link>
                  <Link variant="high-contrast" color="blue" href="/">
                    This is a link
                  </Link>
                </Flex>

                <Flex direction="column" align="start" gap="4" mb="5">
                  {linkSizes
                    .slice()
                    .reverse()
                    .map((size) => (
                      <Link key={size} href="/" size={size}>
                        This is a link
                      </Link>
                    ))}

                  <Link color="purple" gap="1" href="/" size="3">
                    This is a link
                    <ArrowTopRightIcon />
                  </Link>

                  <Link color="gray" gap="1" href="/" size="3">
                    This is a link
                    <ArrowTopRightIcon />
                  </Link>

                  <Text size="6">
                    Single Sign-On (SSO) is the most frequently asked for requirement by enterprise
                    organizations looking to adopt new SaaS applications. SSO enables authentication
                    via an organization’s Identity Provider (IdP), such as Google Workspace or Okta,
                    as opposed to users or <Link href="/">IT admins</Link> managing hundreds, if not
                    thousands, of usernames and passwords. Facilitate greater security, easier
                    account management, and accelerated application onboarding and adoption by{' '}
                    <Link href="/">adding SSO to your app</Link>.
                  </Text>

                  <Text size="6">
                    Single Sign-On (SSO) is the most frequently asked for requirement by enterprise
                    organizations looking to adopt new SaaS applications. SSO enables authentication
                    via an organization’s Identity Provider (IdP), such as Google Workspace or Okta,
                    as opposed to users or <Link href="/">IT admins</Link> managing hundreds, if not
                    thousands, of usernames and passwords. Facilitate greater security, easier
                    account management, and accelerated application onboarding and adoption by{' '}
                    <Link href="/">adding SSO to your app</Link>.
                  </Text>

                  <Separator size="3" my="5" />

                  <Text color="gray" size="6">
                    Single Sign-On (SSO) is the most frequently asked for requirement by enterprise
                    organizations looking to adopt new SaaS applications. SSO enables authentication
                    via an organization’s Identity Provider (IdP), such as Google Workspace or Okta,
                    as opposed to users or <Link href="/">IT admins</Link> managing hundreds, if not
                    thousands, of usernames and passwords. Facilitate greater security, easier
                    account management, and accelerated application onboarding and adoption by{' '}
                    <Link href="/">adding SSO to your app</Link>.
                  </Text>

                  <Text color="purple" size="6">
                    Single Sign-On (SSO) is the most frequently asked for requirement by enterprise
                    organizations looking to adopt new SaaS applications. SSO enables authentication
                    via an organization’s Identity Provider (IdP), such as Google Workspace or Okta,
                    as opposed to users or <Link href="/">IT admins</Link> managing hundreds, if not
                    thousands, of usernames and passwords. Facilitate greater security, easier
                    account management, and accelerated application onboarding and adoption by{' '}
                    <Link href="/">adding SSO to your app</Link>.
                  </Text>

                  <Text color="blue" size="6">
                    Single Sign-On (SSO) is the most frequently asked for requirement by enterprise
                    organizations looking to adopt new SaaS applications. SSO enables authentication
                    via an organization’s Identity Provider (IdP), such as Google Workspace or Okta,
                    as opposed to users or <Link href="/">IT admins</Link> managing hundreds, if not
                    thousands, of usernames and passwords. Facilitate greater security, easier
                    account management, and accelerated application onboarding and adoption by{' '}
                    <Link href="/">adding SSO to your app</Link>.
                  </Text>

                  <Text color="green" size="6">
                    Single Sign-On (SSO) is the most frequently asked for requirement by enterprise
                    organizations looking to adopt new SaaS applications. SSO enables authentication
                    via an organization’s Identity Provider (IdP), such as Google Workspace or Okta,
                    as opposed to users or <Link href="/">IT admins</Link> managing hundreds, if not
                    thousands, of usernames and passwords. Facilitate greater security, easier
                    account management, and accelerated application onboarding and adoption by{' '}
                    <Link href="/">adding SSO to your app</Link>.
                  </Text>

                  <Text color="yellow" size="6">
                    Single Sign-On (SSO) is the most frequently asked for requirement by enterprise
                    organizations looking to adopt new SaaS applications. SSO enables authentication
                    via an organization’s Identity Provider (IdP), such as Google Workspace or Okta,
                    as opposed to users or <Link href="/">IT admins</Link> managing hundreds, if not
                    thousands, of usernames and passwords. Facilitate greater security, easier
                    account management, and accelerated application onboarding and adoption by{' '}
                    <Link href="/">adding SSO to your app</Link>.
                  </Text>

                  <Text color="red" size="6">
                    Single Sign-On (SSO) is the most frequently asked for requirement by enterprise
                    organizations looking to adopt new SaaS applications. SSO enables authentication
                    via an organization’s Identity Provider (IdP), such as Google Workspace or Okta,
                    as opposed to users or <Link href="/">IT admins</Link> managing hundreds, if not
                    thousands, of usernames and passwords. Facilitate greater security, easier
                    account management, and accelerated application onboarding and adoption by{' '}
                    <Link href="/">adding SSO to your app</Link>.
                  </Text>
                </Flex>
              </DocsSection>

              <DocsSection title="Kbd">
                <Flex gap="4">
                  <Kbd>Enter</Kbd>
                  <Kbd>Tab</Kbd>
                  <Kbd>Shift + Tab</Kbd>
                  <Kbd width="command">⌘</Kbd>
                  <Kbd width="shift">⇧</Kbd>
                  <Kbd width="space">Space</Kbd>
                </Flex>
              </DocsSection>

              <DocsSection title="Tabs">
                <table className={styles.table}>
                  <tbody>
                    {tabsListSizes.map((size) => (
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
                    <Text size="1" color="gray" mb="2">
                      1x2
                    </Text>
                    <AspectRatio ratio={1 / 2}>{aspectRatioImage}</AspectRatio>
                  </div>
                  <div>
                    <Text size="1" color="gray" mb="2">
                      1x1
                    </Text>
                    <AspectRatio>{aspectRatioImage}</AspectRatio>
                  </div>
                  <div>
                    <Text size="1" color="gray" mb="2">
                      16x9
                    </Text>
                    <AspectRatio ratio={16 / 9}>{aspectRatioImage}</AspectRatio>
                  </div>
                  <div>
                    <Text size="1" color="gray" mb="2">
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
                        backgroundColor: 'var(--color3)',
                      }}
                    />
                    <Text>
                      The goal of typography is to relate font size, line height, and line width in
                      a proportional way that maximizes beauty and makes reading easier and more
                      pleasant. The question is: What proportion(s) will give us the best results?
                      The golden ratio is often observed in nature where beauty and utility
                      intersect; perhaps we can use this “divine” proportion to enhance these
                      attributes in our typography.
                    </Text>
                    <Box style={{ width: 300 }} my="3">
                      <AspectRatio ratio={16 / 9}>{aspectRatioImage}</AspectRatio>
                    </Box>
                    <Text size="3">
                      The CSS rule <Code>-webkit-font-smoothing: antialiased;</Code> has been
                      applied to all fonts.google.com pages where fonts are rendered. This results
                      in browsers using the <Strong>greyscale antialiasing method</Strong> rather
                      than default <Em>subpixel rendering</Em> of fonts.{' '}
                      <Quote>
                        I believe this was probably introduced to get around inconsistencies in
                        rendering between browsers
                      </Quote>
                      , particular between Chrome and Safari on MacOS.
                      <Sup>1</Sup>
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
                    {scrollAreaSizes.map((size) => (
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

                <Text my="5">
                  <Code>radius</Code> can be set per instance:
                </Text>

                <details>
                  <summary>
                    <Text size="2" color="gray" asChild>
                      <span>See specific radius examples</span>
                    </Text>
                  </summary>
                  <Box mt="3">
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <ColumnHeaderCell />
                          {scrollAreaSizes.map((size) => (
                            <ColumnHeaderCell key={size}>size {size}</ColumnHeaderCell>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {radiusValues.map((radius) => (
                          <tr key={radius}>
                            <RowHeaderCell>{radius}</RowHeaderCell>
                            {scrollAreaSizes.map((size) => (
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

              <Box className="dark-theme" style={{ backgroundColor: 'var(--background-feel)' }}>
                <DocsSection title="Playground">
                  <Text mb="5">
                    In this section, I am just throwing together some of the components to get a
                    sense of how harmonious they are.
                  </Text>
                  <Flex gap="9">
                    {textFieldSizes.map((size) => (
                      <Flex
                        key={size}
                        direction="column"
                        gap="3"
                        style={{ width: (Number(size) + 1) * 100 }}
                      >
                        <Grid gap="1">
                          <Text size={size} weight="bold">
                            Name
                          </Text>
                          <TextField size={size} placeholder="Your name" />
                        </Grid>
                        <Grid gap="1">
                          <Text size={size} weight="bold">
                            Email
                          </Text>
                          <TextField size={size} placeholder="Your email" />
                        </Grid>
                        <Grid gap="1">
                          <Text size={size} weight="bold">
                            Feedback
                          </Text>
                          <TextArea size={size} placeholder="Your feedback" />
                        </Grid>
                        <Button size={size}>Submit</Button>
                      </Flex>
                    ))}
                  </Flex>
                </DocsSection>
              </Box>
            </main>
          </Provider>
        </div>
      </body>
    </html>
  );
}

function DropdownMenuContentDemo({
  size,
  variant,
}: {
  size: DropdownMenuSize;
  variant: DropdownMenuVariant;
}) {
  return (
    <DropdownMenuContent variant={variant} size={size}>
      <DropdownMenuItem shortcut="⌘+T">New Tab</DropdownMenuItem>
      <DropdownMenuItem shortcut="⌘+N">New Window</DropdownMenuItem>
      <DropdownMenuItem shortcut="⇧+⌘+N" disabled>
        New Private Window
      </DropdownMenuItem>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>More Tools</DropdownMenuSubTrigger>

        <DropdownMenuSubContent variant={variant} size={size}>
          <DropdownMenuItem shortcut="⌘+S">Save Page As…</DropdownMenuItem>
          <DropdownMenuItem>Create Shortcut…</DropdownMenuItem>
          <DropdownMenuItem>Name Window…</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Developer Tools</DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuSub>

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
    </DropdownMenuContent>
  );
}

function ContextMenuContentDemo({
  size,
  variant,
}: {
  size: ContextMenuSize;
  variant: ContextMenuVariant;
}) {
  return (
    <ContextMenuContent variant={variant} size={size}>
      <ContextMenuItem shortcut="⌘+T">New Tab</ContextMenuItem>
      <ContextMenuItem shortcut="⌘+N">New Window</ContextMenuItem>
      <ContextMenuItem shortcut="⇧+⌘+N" disabled>
        New Private Window
      </ContextMenuItem>
      <ContextMenuSub>
        <ContextMenuSubTrigger>More Tools</ContextMenuSubTrigger>

        <ContextMenuSubContent variant={variant} size={size}>
          <ContextMenuItem shortcut="⌘+S">Save Page As…</ContextMenuItem>
          <ContextMenuItem>Create Shortcut…</ContextMenuItem>
          <ContextMenuItem>Name Window…</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Developer Tools</ContextMenuItem>
        </ContextMenuSubContent>
      </ContextMenuSub>

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
        borderRadius: 'var(--br-3)',
        border: '1px dashed var(--color6)',
        cursor: 'default',
        ...props.style,
      }}
    >
      <Text asChild size="1" color="color">
        <span>Right-click here</span>
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
      <Container>
        <Section>
          <Box px="6">
            <Text size="6" mb="4" asChild>
              <h1>
                <Link href={`#${title}`} id={title}>
                  {title}
                </Link>
              </h1>
            </Text>
            {children}
          </Box>
        </Section>
      </Container>
      <Separator size="4" />
    </>
  );
}

function ColumnHeaderCell({ children, ...props }: React.ComponentProps<'th'>) {
  return (
    <th {...props}>
      {children && (
        <Text color="gray" size="2">
          {children}
        </Text>
      )}
    </th>
  );
}

function RowHeaderCell({ children, ...props }: React.ComponentProps<'td'>) {
  return (
    <td {...props}>
      {children && (
        <Text color="gray" size="2">
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
      className="w-6 h-6"
    >
      <path
        fillRule="evenodd"
        d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
        clipRule="evenodd"
      />
    </svg>
  );
}
