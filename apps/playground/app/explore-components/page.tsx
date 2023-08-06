import * as React from 'react';
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
  dialogContentPropDefs,
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
  hoverCardContentPropDefs,
  //
  IconButton,
  iconButtonPropDefs,
  //
  Inset,
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
  themeAccentColorsOrdered,
  //
  ThemePanel,
} from '@radix-ui/themes';
import { NextThemeProvider } from '../next-theme-provider';
import {
  ArrowRightIcon,
  CaretDownIcon,
  InfoCircledIcon,
  MagnifyingGlassIcon,
  StarIcon,
} from '@radix-ui/react-icons';
import { getPeopleForColor } from './people';
import styles from './page.module.css';

export default function ExploreComponents() {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <NextThemeProvider>
          <Theme asChild>
            <div id="root">
              <Box display={{ initial: 'none', lg: 'block' }}>
                <ThemePanel />
              </Box>

              {/* Benoit works here */}
              <Box m={{ initial: '3', md: '6', xl: '9' }}>
                <Heading mb="5">Avatar</Heading>
                <TabsRoot defaultValue="theme-colors">
                  <TabsList size="2">
                    <TabsTrigger value="theme-colors">Theme colors</TabsTrigger>
                    <TabsTrigger value="all-colors">All colors</TabsTrigger>
                    <TabsTrigger value="all-sizes">All sizes</TabsTrigger>
                  </TabsList>
                  <TabsContent value="theme-colors">
                    <Box my="6">
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th />
                            <th colSpan={5}>Accent</th>
                            <th colSpan={5}>Gray</th>
                          </tr>
                        </thead>
                        <tbody>
                          {avatarPropDefs.variant.values.map((variant, index) => (
                            <tr key={variant}>
                              <td>{upperFirst(variant)}</td>
                              <td>
                                <Avatar
                                  variant={variant}
                                  src={getPeopleForColor('gray')[index].image}
                                  fallback="V"
                                />
                              </td>
                              <td>
                                <Avatar variant={variant} fallback="V" />
                              </td>
                              <td>
                                <Avatar variant={variant} fallback="BG" />
                              </td>
                              <td>
                                <Avatar variant={variant} fallback={<AvatarIconFallback />} />
                              </td>
                              <td>
                                <Avatar variant={variant} fallback="V" highContrast />
                              </td>
                              <td>
                                <Avatar
                                  variant={variant}
                                  color="gray"
                                  src={getPeopleForColor('gray')[index + 2].image}
                                  fallback="V"
                                />
                              </td>
                              <td>
                                <Avatar variant={variant} color="gray" fallback="V" />
                              </td>
                              <td>
                                <Avatar variant={variant} color="gray" fallback="BG" />
                              </td>
                              <td>
                                <Avatar
                                  variant={variant}
                                  color="gray"
                                  fallback={<AvatarIconFallback />}
                                />
                              </td>
                              <td>
                                <Avatar variant={variant} color="gray" fallback="V" highContrast />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Box>
                  </TabsContent>

                  <TabsContent value="all-colors">
                    <Box my="6">
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th />
                            {avatarPropDefs.variant.values.map((variant) => (
                              <th key={variant} colSpan={5}>
                                {upperFirst(variant)}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {themeAccentColorsOrdered.map((color) => (
                            <tr key={color}>
                              <td>{upperFirst(color)}</td>
                              {avatarPropDefs.variant.values.map((variant, index) => (
                                <React.Fragment key={variant}>
                                  <td>
                                    <Avatar
                                      variant={variant}
                                      color={color}
                                      src={getPeopleForColor(color)[index].image}
                                      fallback="V"
                                    />
                                  </td>
                                  <td>
                                    <Avatar variant={variant} color={color} fallback="V" />
                                  </td>
                                  <td>
                                    <Avatar variant={variant} color={color} fallback="BG" />
                                  </td>
                                  <td>
                                    <Avatar
                                      variant={variant}
                                      color={color}
                                      fallback={<AvatarIconFallback />}
                                    />
                                  </td>
                                  <td>
                                    <Avatar
                                      variant={variant}
                                      color={color}
                                      fallback="V"
                                      highContrast
                                    />
                                  </td>
                                </React.Fragment>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Box>
                  </TabsContent>

                  <TabsContent value="all-sizes">
                    <Box my="6">
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th />
                            {avatarPropDefs.radius.values.map((radius) => (
                              <th key={radius} style={{ textAlign: 'left' }}>
                                {radius === 'none' ? 'No radius' : upperFirst(radius)}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {avatarPropDefs.variant.values.map((variant, index) => (
                            <React.Fragment key={variant}>
                              {index > 0 && (
                                <tr>
                                  <td>&nbsp;</td>
                                </tr>
                              )}
                              {avatarPropDefs.size.values.map((size) => (
                                <tr key={size}>
                                  <td>Size {size}</td>
                                  {avatarPropDefs.radius.values.map((radius) => (
                                    <td key={radius} style={{ textAlign: 'left' }}>
                                      <Avatar
                                        size={size}
                                        variant={variant}
                                        radius={radius}
                                        fallback="BG"
                                      />
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </React.Fragment>
                          ))}
                        </tbody>
                      </table>
                    </Box>
                  </TabsContent>
                </TabsRoot>

                <Heading mb="5">Badge</Heading>
                <TabsRoot defaultValue="theme-colors">
                  <TabsList size="2">
                    <TabsTrigger value="theme-colors">Theme colors</TabsTrigger>
                    <TabsTrigger value="all-colors">All colors</TabsTrigger>
                    <TabsTrigger value="all-sizes">All sizes</TabsTrigger>
                  </TabsList>
                  <TabsContent value="theme-colors">
                    <Box my="6">
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th />
                            <th>Accent</th>
                            <th>Gray</th>
                          </tr>
                        </thead>
                        <tbody>
                          {badgePropDefs.variant.values.map((variant) => (
                            <tr key={variant}>
                              <td>{upperFirst(variant)}</td>
                              <td>
                                <Flex gap="4">
                                  <Badge variant={variant}>New</Badge>
                                  <Badge variant={variant} highContrast>
                                    New
                                  </Badge>
                                </Flex>
                              </td>
                              <td>
                                <Flex gap="4">
                                  <Badge variant={variant} color="gray">
                                    New
                                  </Badge>
                                  <Badge variant={variant} color="gray" highContrast>
                                    New
                                  </Badge>
                                </Flex>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Box>
                  </TabsContent>

                  <TabsContent value="all-colors">
                    <Box my="6">
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th />
                            {badgePropDefs.variant.values.map((variant) => (
                              <th key={variant}>{upperFirst(variant)}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {themeAccentColorsOrdered.map((color) => (
                            <tr key={color}>
                              <td>{upperFirst(color)}</td>
                              {badgePropDefs.variant.values.map((variant) => (
                                <td key={variant}>
                                  <Flex align="center" justify="center" gap="4">
                                    <Badge variant={variant} color={color}>
                                      New
                                    </Badge>
                                    <Badge variant={variant} color={color} highContrast>
                                      New
                                    </Badge>
                                  </Flex>
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Box>
                  </TabsContent>

                  <TabsContent value="all-sizes">
                    <Box my="6">
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th />
                            {badgePropDefs.radius.values.map((radius) => (
                              <th key={radius} style={{ textAlign: 'left' }}>
                                {radius === 'none' ? 'No radius' : upperFirst(radius)}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {badgePropDefs.variant.values.map((variant, index) => (
                            <React.Fragment key={variant}>
                              {index > 0 && (
                                <tr>
                                  <td>&nbsp;</td>
                                </tr>
                              )}
                              {badgePropDefs.size.values.map((size) => (
                                <tr key={size}>
                                  <td>Size {size}</td>
                                  {badgePropDefs.radius.values.map((radius) => (
                                    <td key={radius} style={{ textAlign: 'left' }}>
                                      <Badge size={size} variant={variant} radius={radius}>
                                        New
                                      </Badge>
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </React.Fragment>
                          ))}
                        </tbody>
                      </table>
                    </Box>
                  </TabsContent>
                </TabsRoot>

                <Heading mb="5">Button</Heading>
                <TabsRoot defaultValue="theme-colors">
                  <TabsList size="2">
                    <TabsTrigger value="theme-colors">Theme colors</TabsTrigger>
                    <TabsTrigger value="all-colors">All colors</TabsTrigger>
                    <TabsTrigger value="all-sizes">All sizes</TabsTrigger>
                  </TabsList>
                  <TabsContent value="theme-colors">
                    <Box my="6">
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th />
                            <th colSpan={2}>Accent</th>
                            <th colSpan={2}>Gray</th>
                            <th>Disabled</th>
                          </tr>
                        </thead>
                        <tbody>
                          {buttonPropDefs.variant.values.map((variant) => (
                            <tr key={variant}>
                              <td>{upperFirst(variant)}</td>
                              <td>
                                <Button variant={variant}>
                                  Next <ArrowRightIcon width="16" height="16" />
                                </Button>
                              </td>
                              <td>
                                <Button variant={variant} highContrast>
                                  Next <ArrowRightIcon width="16" height="16" />
                                </Button>
                              </td>
                              <td>
                                <Button variant={variant} color="gray">
                                  Next <ArrowRightIcon width="16" height="16" />
                                </Button>
                              </td>
                              <td>
                                <Button variant={variant} color="gray" highContrast>
                                  Next <ArrowRightIcon width="16" height="16" />
                                </Button>
                              </td>
                              <td>
                                <Button variant={variant} disabled>
                                  Next <ArrowRightIcon width="16" height="16" />
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Box>
                  </TabsContent>

                  <TabsContent value="all-colors">
                    <Box my="6">
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th />
                            {buttonPropDefs.variant.values.map((variant) => (
                              <th key={variant}>{upperFirst(variant)}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {themeAccentColorsOrdered.map((color) => (
                            <tr key={color}>
                              <td>{upperFirst(color)}</td>
                              {buttonPropDefs.variant.values.map((variant) => (
                                <td key={variant}>
                                  <Flex align="center" justify="center" gap="4">
                                    <Button variant={variant} color={color}>
                                      Next <ArrowRightIcon width="16" height="16" />
                                    </Button>
                                    <Button variant={variant} color={color} highContrast>
                                      Next <ArrowRightIcon width="16" height="16" />
                                    </Button>
                                  </Flex>
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Box>
                  </TabsContent>

                  <TabsContent value="all-sizes">
                    <Box my="6">
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th />
                            {buttonPropDefs.radius.values.map((radius) => (
                              <th key={radius} style={{ textAlign: 'left' }}>
                                {radius === 'none' ? 'No radius' : upperFirst(radius)}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {buttonPropDefs.variant.values.map((variant, index) => (
                            <React.Fragment key={variant}>
                              {index > 0 && (
                                <tr>
                                  <td>&nbsp;</td>
                                </tr>
                              )}
                              {buttonPropDefs.size.values.map((size) => (
                                <tr key={size}>
                                  <td>Size {size}</td>
                                  {buttonPropDefs.radius.values.map((radius) => (
                                    <td key={radius} style={{ textAlign: 'left' }}>
                                      <Button size={size} variant={variant} radius={radius}>
                                        Next <ArrowRightIcon {...buttonSizeToIconSize(size)} />
                                      </Button>
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </React.Fragment>
                          ))}
                        </tbody>
                      </table>
                    </Box>
                  </TabsContent>
                </TabsRoot>

                <Heading mb="5">Icon Button</Heading>
                <TabsRoot defaultValue="theme-colors">
                  <TabsList size="2">
                    <TabsTrigger value="theme-colors">Theme colors</TabsTrigger>
                    <TabsTrigger value="all-colors">All colors</TabsTrigger>
                    <TabsTrigger value="all-sizes">All sizes</TabsTrigger>
                  </TabsList>
                  <TabsContent value="theme-colors">
                    <Box my="6">
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th />
                            <th colSpan={2}>Accent</th>
                            <th colSpan={2}>Gray</th>
                            <th>Disabled</th>
                          </tr>
                        </thead>
                        <tbody>
                          {iconButtonPropDefs.variant.values.map((variant) => (
                            <tr key={variant}>
                              <td>{upperFirst(variant)}</td>
                              <td>
                                <IconButton variant={variant}>
                                  <StarIcon width="16" height="16" />
                                </IconButton>
                              </td>
                              <td>
                                <IconButton variant={variant} highContrast>
                                  <StarIcon width="16" height="16" />
                                </IconButton>
                              </td>
                              <td>
                                <IconButton variant={variant} color="gray">
                                  <StarIcon width="16" height="16" />
                                </IconButton>
                              </td>
                              <td>
                                <IconButton variant={variant} color="gray" highContrast>
                                  <StarIcon width="16" height="16" />
                                </IconButton>
                              </td>
                              <td>
                                <IconButton variant={variant} disabled>
                                  <StarIcon width="16" height="16" />
                                </IconButton>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Box>
                  </TabsContent>

                  <TabsContent value="all-colors">
                    <Box my="6">
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th />
                            {iconButtonPropDefs.variant.values.map((variant) => (
                              <th key={variant}>{upperFirst(variant)}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {themeAccentColorsOrdered.map((color) => (
                            <tr key={color}>
                              <td>{upperFirst(color)}</td>
                              {iconButtonPropDefs.variant.values.map((variant) => (
                                <td key={variant}>
                                  <Flex align="center" justify="center" gap="4">
                                    <IconButton variant={variant} color={color}>
                                      <StarIcon width="16" height="16" />
                                    </IconButton>
                                    <IconButton variant={variant} color={color} highContrast>
                                      <StarIcon width="16" height="16" />
                                    </IconButton>
                                  </Flex>
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Box>
                  </TabsContent>

                  <TabsContent value="all-sizes">
                    <Box my="6">
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th />
                            {iconButtonPropDefs.radius.values.map((radius) => (
                              <th key={radius} style={{ textAlign: 'left' }}>
                                {radius === 'none' ? 'No radius' : upperFirst(radius)}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {iconButtonPropDefs.variant.values.map((variant, index) => (
                            <React.Fragment key={variant}>
                              {index > 0 && (
                                <tr>
                                  <td>&nbsp;</td>
                                </tr>
                              )}
                              {iconButtonPropDefs.size.values.map((size) => (
                                <tr key={size}>
                                  <td>Size {size}</td>
                                  {iconButtonPropDefs.radius.values.map((radius) => (
                                    <td key={radius} style={{ textAlign: 'left' }}>
                                      <IconButton size={size} variant={variant} radius={radius}>
                                        <StarIcon {...buttonSizeToIconSize(size)} />
                                      </IconButton>
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </React.Fragment>
                          ))}
                        </tbody>
                      </table>
                    </Box>
                  </TabsContent>
                </TabsRoot>

                <Heading mb="5">Callout</Heading>
                <TabsRoot defaultValue="theme-colors">
                  <TabsList size="2">
                    <TabsTrigger value="theme-colors">Theme colors</TabsTrigger>
                    <TabsTrigger value="all-colors">All colors</TabsTrigger>
                    <TabsTrigger value="all-sizes">All sizes</TabsTrigger>
                  </TabsList>
                  <TabsContent value="theme-colors">
                    <Box my="6">
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th />
                            <th>Accent</th>
                            <th>Gray</th>
                          </tr>
                        </thead>
                        <tbody>
                          {calloutRootPropDefs.variant.values.map((variant) => (
                            <tr key={variant}>
                              <td>{upperFirst(variant)}</td>
                              <td>
                                <CalloutRoot variant={variant}>
                                  <CalloutIcon>
                                    <InfoCircledIcon width="16" height="16" />
                                  </CalloutIcon>
                                  <CalloutText>
                                    Please <Link href="#">upgrade</Link> to the new version.
                                  </CalloutText>
                                </CalloutRoot>
                                <CalloutRoot variant={variant} highContrast mt="4">
                                  <CalloutIcon>
                                    <InfoCircledIcon width="16" height="16" />
                                  </CalloutIcon>
                                  <CalloutText>
                                    Please <Link href="#">upgrade</Link> to the new version.
                                  </CalloutText>
                                </CalloutRoot>
                              </td>
                              <td>
                                <CalloutRoot variant={variant} color="gray">
                                  <CalloutIcon>
                                    <InfoCircledIcon width="16" height="16" />
                                  </CalloutIcon>
                                  <CalloutText>
                                    Please <Link href="#">upgrade</Link> to the new version.
                                  </CalloutText>
                                </CalloutRoot>
                                <CalloutRoot variant={variant} color="gray" highContrast mt="4">
                                  <CalloutIcon>
                                    <InfoCircledIcon width="16" height="16" />
                                  </CalloutIcon>
                                  <CalloutText>
                                    Please <Link href="#">upgrade</Link> to the new version.
                                  </CalloutText>
                                </CalloutRoot>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Box>
                  </TabsContent>

                  <TabsContent value="all-colors">
                    <Box my="6">
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th />
                            {calloutRootPropDefs.variant.values.map((variant) => (
                              <th key={variant}>{upperFirst(variant)}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {themeAccentColorsOrdered.map((color) => (
                            <tr key={color}>
                              <td>{upperFirst(color)}</td>
                              {calloutRootPropDefs.variant.values.map((variant) => (
                                <td key={variant}>
                                  <CalloutRoot variant={variant} color={color}>
                                    <CalloutIcon>
                                      <InfoCircledIcon width="16" height="16" />
                                    </CalloutIcon>
                                    <CalloutText>
                                      Please <Link href="#">upgrade</Link> to the new version.
                                    </CalloutText>
                                  </CalloutRoot>
                                  <CalloutRoot variant={variant} color={color} highContrast mt="4">
                                    <CalloutIcon>
                                      <InfoCircledIcon width="16" height="16" />
                                    </CalloutIcon>
                                    <CalloutText>
                                      Please <Link href="#">upgrade</Link> to the new version.
                                    </CalloutText>
                                  </CalloutRoot>
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Box>
                  </TabsContent>

                  <TabsContent value="all-sizes">
                    <Box my="6">
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th />
                            {calloutRootPropDefs.variant.values.map((variant) => (
                              <th key={variant} style={{ textAlign: 'left' }}>
                                {upperFirst(variant)}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {calloutRootPropDefs.size.values.map((size) => (
                            <tr key={size}>
                              <td>Size {size}</td>
                              {calloutRootPropDefs.variant.values.map((variant) => (
                                <td key={variant}>
                                  <Flex>
                                    <CalloutRoot variant={variant} size={size}>
                                      <CalloutIcon>
                                        <InfoCircledIcon {...calloutSizeToIconSize(size)} />
                                      </CalloutIcon>
                                      <CalloutText>
                                        Please <Link href="#">upgrade</Link> to the new version.
                                      </CalloutText>
                                    </CalloutRoot>
                                  </Flex>
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Box>
                  </TabsContent>
                </TabsRoot>

                <Heading mb="5">Dialog</Heading>
                <Flex gap="4" align="center" mb="9">
                  <DialogRoot>
                    <DialogTrigger>
                      <Button size="1">Open</Button>
                    </DialogTrigger>
                    <DialogContent size="1" style={{ maxWidth: 300 }}>
                      <DialogTitle size="3" mb="1">
                        Edit profile
                      </DialogTitle>
                      <DialogDescription size="2" mb="3">
                        Make changes to your profile.
                      </DialogDescription>

                      <Flex direction="column" gap="3">
                        <label>
                          <Text as="div" size="1" mb="1" weight="bold">
                            Name
                          </Text>
                          <TextFieldInput
                            size="1"
                            defaultValue="Freja Johnsen"
                            placeholder="Enter your full name"
                          />
                        </label>
                        <label>
                          <Text as="div" size="1" mb="1" weight="bold">
                            Email
                          </Text>
                          <TextFieldInput
                            size="1"
                            defaultValue="freja@example.com"
                            placeholder="Enter your email"
                          />
                        </label>
                      </Flex>

                      <Flex gap="2" mt="3" justify="end">
                        <DialogClose>
                          <Button size="1" variant="soft" color="gray">
                            Cancel
                          </Button>
                        </DialogClose>
                        <DialogClose>
                          <Button size="1">Save</Button>
                        </DialogClose>
                      </Flex>
                    </DialogContent>
                  </DialogRoot>

                  <DialogRoot>
                    <DialogTrigger>
                      <Button size="2">Open</Button>
                    </DialogTrigger>
                    <DialogContent size="2" style={{ maxWidth: 400 }}>
                      <DialogTitle mb="2">Edit profile</DialogTitle>
                      <DialogDescription size="2" mb="4">
                        Make changes to your profile.
                      </DialogDescription>

                      <Flex direction="column" gap="3">
                        <label>
                          <Text as="div" size="2" mb="1" weight="bold">
                            Name
                          </Text>
                          <TextFieldInput
                            defaultValue="Freja Johnsen"
                            placeholder="Enter your full name"
                          />
                        </label>
                        <label>
                          <Text as="div" size="2" mb="1" weight="bold">
                            Email
                          </Text>
                          <TextFieldInput
                            defaultValue="freja@example.com"
                            placeholder="Enter your email"
                          />
                        </label>
                      </Flex>

                      <Flex gap="3" mt="4" justify="end">
                        <DialogClose>
                          <Button variant="soft" color="gray">
                            Cancel
                          </Button>
                        </DialogClose>
                        <DialogClose>
                          <Button>Save</Button>
                        </DialogClose>
                      </Flex>
                    </DialogContent>
                  </DialogRoot>

                  <DialogRoot>
                    <DialogTrigger>
                      <Button size="3">Open</Button>
                    </DialogTrigger>
                    <DialogContent size="3" style={{ maxWidth: 500 }}>
                      <DialogTitle>Edit profile</DialogTitle>
                      <DialogDescription size="2" mb="4">
                        Make changes to your profile.
                      </DialogDescription>

                      <Flex direction="column" gap="3">
                        <label>
                          <Text as="div" size="2" mb="1" weight="bold">
                            Name
                          </Text>
                          <TextFieldInput
                            defaultValue="Freja Johnsen"
                            placeholder="Enter your full name"
                          />
                        </label>
                        <label>
                          <Text as="div" size="2" mb="1" weight="bold">
                            Email
                          </Text>
                          <TextFieldInput
                            defaultValue="freja@example.com"
                            placeholder="Enter your email"
                          />
                        </label>
                      </Flex>

                      <Flex gap="3" mt="4" justify="end">
                        <DialogClose>
                          <Button variant="soft" color="gray">
                            Cancel
                          </Button>
                        </DialogClose>
                        <DialogClose>
                          <Button>Save</Button>
                        </DialogClose>
                      </Flex>
                    </DialogContent>
                  </DialogRoot>

                  <DialogRoot>
                    <DialogTrigger>
                      <Button size="4">Open</Button>
                    </DialogTrigger>
                    <DialogContent size="4">
                      <DialogTitle size="6">Edit profile</DialogTitle>
                      <DialogDescription size="3" mb="5">
                        Make changes to your profile.
                      </DialogDescription>

                      <Flex direction="column" gap="5">
                        <label>
                          <Text as="div" size="3" mb="1" weight="bold">
                            Name
                          </Text>
                          <TextFieldInput
                            size="3"
                            defaultValue="Freja Johnsen"
                            placeholder="Enter your full name"
                          />
                        </label>
                        <label>
                          <Text as="div" size="3" mb="1" weight="bold">
                            Email
                          </Text>
                          <TextFieldInput
                            size="3"
                            defaultValue="freja@example.com"
                            placeholder="Enter your email"
                          />
                        </label>
                      </Flex>

                      <Flex gap="3" mt="5" justify="end">
                        <DialogClose>
                          <Button size="3" variant="soft" color="gray">
                            Cancel
                          </Button>
                        </DialogClose>
                        <DialogClose>
                          <Button size="3">Save</Button>
                        </DialogClose>
                      </Flex>
                    </DialogContent>
                  </DialogRoot>
                </Flex>

                <Heading mb="5">Alert Dialog</Heading>
                <Flex gap="4" align="center" mb="9">
                  <AlertDialogRoot>
                    <AlertDialogTrigger>
                      <Button size="1" color="red">
                        Revoke access
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent size="1" style={{ maxWidth: 300 }}>
                      <AlertDialogTitle size="3" mb="1">
                        Revoke access
                      </AlertDialogTitle>
                      <AlertDialogDescription size="2" mb="3">
                        Are you sure? this application will no longer be accessible and any existing
                        sessions will be expired.
                      </AlertDialogDescription>

                      <Flex gap="2" mt="3" justify="end">
                        <AlertDialogCancel>
                          <Button size="1" variant="soft" color="gray">
                            Cancel
                          </Button>
                        </AlertDialogCancel>
                        <AlertDialogAction>
                          <Button size="1" color="red">
                            Revoke access
                          </Button>
                        </AlertDialogAction>
                      </Flex>
                    </AlertDialogContent>
                  </AlertDialogRoot>

                  <AlertDialogRoot>
                    <AlertDialogTrigger>
                      <Button size="2" color="red">
                        Revoke access
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent size="2" style={{ maxWidth: 400 }}>
                      <AlertDialogTitle mb="2">Revoke access</AlertDialogTitle>
                      <AlertDialogDescription size="2" mb="4">
                        Are you sure? this application will no longer be accessible and any existing
                        sessions will be expired.
                      </AlertDialogDescription>

                      <Flex gap="3" mt="4" justify="end">
                        <AlertDialogCancel>
                          <Button variant="soft" color="gray">
                            Cancel
                          </Button>
                        </AlertDialogCancel>
                        <AlertDialogAction>
                          <Button color="red">Revoke access</Button>
                        </AlertDialogAction>
                      </Flex>
                    </AlertDialogContent>
                  </AlertDialogRoot>

                  <AlertDialogRoot>
                    <AlertDialogTrigger>
                      <Button size="3" color="red">
                        Revoke access
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent size="3" style={{ maxWidth: 500 }}>
                      <AlertDialogTitle>Revoke access</AlertDialogTitle>
                      <AlertDialogDescription size="2" mb="4">
                        Are you sure? this application will no longer be accessible and any existing
                        sessions will be expired.
                      </AlertDialogDescription>

                      <Flex gap="3" mt="4" justify="end">
                        <AlertDialogCancel>
                          <Button variant="soft" color="gray">
                            Cancel
                          </Button>
                        </AlertDialogCancel>
                        <AlertDialogAction>
                          <Button color="red">Revoke access</Button>
                        </AlertDialogAction>
                      </Flex>
                    </AlertDialogContent>
                  </AlertDialogRoot>

                  <AlertDialogRoot>
                    <AlertDialogTrigger>
                      <Button size="4" color="red">
                        Revoke access
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent size="4">
                      <AlertDialogTitle size="6">Revoke access</AlertDialogTitle>
                      <AlertDialogDescription size="3" mb="5">
                        Are you sure? this application will no longer be accessible and any existing
                        sessions will be expired.
                      </AlertDialogDescription>

                      <Flex gap="3" mt="5" justify="end">
                        <AlertDialogCancel>
                          <Button size="3" variant="soft" color="gray">
                            Cancel
                          </Button>
                        </AlertDialogCancel>
                        <AlertDialogAction>
                          <Button size="3" color="red">
                            Revoke access
                          </Button>
                        </AlertDialogAction>
                      </Flex>
                    </AlertDialogContent>
                  </AlertDialogRoot>
                </Flex>

                <Heading mb="5">Dropdown Menu</Heading>
                <TabsRoot defaultValue="theme-colors">
                  <TabsList size="2">
                    <TabsTrigger value="theme-colors">Theme colors</TabsTrigger>
                    <TabsTrigger value="all-colors">All colors</TabsTrigger>
                    <TabsTrigger value="all-sizes">All sizes</TabsTrigger>
                  </TabsList>
                  <TabsContent value="theme-colors">
                    <Box my="6">
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th />
                            <th colSpan={2}>Accent</th>
                            <th colSpan={2}>Gray</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dropdownMenuContentPropDefs.variant.values.map((variant) => (
                            <tr key={variant}>
                              <td>{upperFirst(variant)}</td>
                              <td>
                                <DropdownMenuRoot>
                                  <DropdownMenuTrigger>
                                    <Button variant={variant}>
                                      Options
                                      <CaretDownIcon width="16" height="16" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent variant={variant}>
                                    <ExampleDropdownMenuContent />
                                  </DropdownMenuContent>
                                </DropdownMenuRoot>
                              </td>
                              <td>
                                <DropdownMenuRoot>
                                  <DropdownMenuTrigger>
                                    <Button variant={variant} highContrast>
                                      Options
                                      <CaretDownIcon width="16" height="16" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent variant={variant} highContrast>
                                    <ExampleDropdownMenuContent />
                                  </DropdownMenuContent>
                                </DropdownMenuRoot>
                              </td>
                              <td>
                                <DropdownMenuRoot>
                                  <DropdownMenuTrigger>
                                    <Button variant={variant} color="gray">
                                      Options
                                      <CaretDownIcon width="16" height="16" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent variant={variant} color="gray">
                                    <ExampleDropdownMenuContent />
                                  </DropdownMenuContent>
                                </DropdownMenuRoot>
                              </td>
                              <td>
                                <DropdownMenuRoot>
                                  <DropdownMenuTrigger>
                                    <Button variant={variant} color="gray" highContrast>
                                      Options
                                      <CaretDownIcon width="16" height="16" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent variant={variant} color="gray" highContrast>
                                    <ExampleDropdownMenuContent />
                                  </DropdownMenuContent>
                                </DropdownMenuRoot>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Box>
                  </TabsContent>

                  <TabsContent value="all-colors">
                    <Box my="6">
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th />
                            {dropdownMenuContentPropDefs.variant.values.map((variant) => (
                              <th key={variant}>{upperFirst(variant)}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {themeAccentColorsOrdered.map((color) => (
                            <tr key={color}>
                              <td>{upperFirst(color)}</td>
                              {dropdownMenuContentPropDefs.variant.values.map((variant) => (
                                <td key={variant}>
                                  <Flex align="center" justify="center" gap="4">
                                    <DropdownMenuRoot>
                                      <DropdownMenuTrigger>
                                        <Button variant={variant} color={color}>
                                          Options
                                          <CaretDownIcon width="16" height="16" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent variant={variant} color={color}>
                                        <ExampleDropdownMenuContent />
                                      </DropdownMenuContent>
                                    </DropdownMenuRoot>
                                    <DropdownMenuRoot>
                                      <DropdownMenuTrigger>
                                        <Button variant={variant} color={color} highContrast>
                                          Options
                                          <CaretDownIcon width="16" height="16" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent
                                        variant={variant}
                                        color={color}
                                        highContrast
                                      >
                                        <ExampleDropdownMenuContent />
                                      </DropdownMenuContent>
                                    </DropdownMenuRoot>
                                  </Flex>
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Box>
                  </TabsContent>

                  <TabsContent value="all-sizes">
                    <Box my="6">
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th />
                            {dropdownMenuContentPropDefs.variant.values.map((variant) => (
                              <th key={variant} style={{ textAlign: 'left' }}>
                                {upperFirst(variant)}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {dropdownMenuContentPropDefs.size.values.map((size) => (
                            <tr key={size}>
                              <td>Size {size}</td>
                              {dropdownMenuContentPropDefs.variant.values.map((variant) => (
                                <td key={variant}>
                                  <Flex>
                                    <DropdownMenuRoot>
                                      <DropdownMenuTrigger>
                                        <Button size={size} variant={variant}>
                                          Options
                                          <CaretDownIcon {...buttonSizeToIconSize(size)} />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent size={size} variant={variant}>
                                        <ExampleDropdownMenuContent />
                                      </DropdownMenuContent>
                                    </DropdownMenuRoot>
                                  </Flex>
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Box>
                  </TabsContent>
                </TabsRoot>

                <Heading mb="5">Context Menu</Heading>
                <TabsRoot defaultValue="theme-colors">
                  <TabsList size="2">
                    <TabsTrigger value="theme-colors">Theme colors</TabsTrigger>
                    <TabsTrigger value="all-colors">All colors</TabsTrigger>
                    <TabsTrigger value="all-sizes">All sizes</TabsTrigger>
                  </TabsList>
                  <TabsContent value="theme-colors">
                    <Box my="6">
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th />
                            <th colSpan={2}>Accent</th>
                            <th colSpan={2}>Gray</th>
                          </tr>
                        </thead>
                        <tbody>
                          {contextMenuContentPropDefs.variant.values.map((variant) => (
                            <tr key={variant}>
                              <td>{upperFirst(variant)}</td>
                              <td>
                                <ContextMenuRoot>
                                  <ContextMenuTrigger>
                                    <RightClickArea variant={variant} />
                                  </ContextMenuTrigger>
                                  <ContextMenuContent variant={variant}>
                                    <ExampleContextMenuContent />
                                  </ContextMenuContent>
                                </ContextMenuRoot>
                              </td>
                              <td>
                                <ContextMenuRoot>
                                  <ContextMenuTrigger>
                                    <RightClickArea variant={variant} highContrast />
                                  </ContextMenuTrigger>
                                  <ContextMenuContent variant={variant} highContrast>
                                    <ExampleContextMenuContent />
                                  </ContextMenuContent>
                                </ContextMenuRoot>
                              </td>
                              <td>
                                <ContextMenuRoot>
                                  <ContextMenuTrigger>
                                    <RightClickArea variant={variant} color="gray" />
                                  </ContextMenuTrigger>
                                  <ContextMenuContent variant={variant} color="gray">
                                    <ExampleContextMenuContent />
                                  </ContextMenuContent>
                                </ContextMenuRoot>
                              </td>
                              <td>
                                <ContextMenuRoot>
                                  <ContextMenuTrigger>
                                    <RightClickArea variant={variant} color="gray" highContrast />
                                  </ContextMenuTrigger>
                                  <ContextMenuContent variant={variant} color="gray" highContrast>
                                    <ExampleContextMenuContent />
                                  </ContextMenuContent>
                                </ContextMenuRoot>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Box>
                  </TabsContent>

                  <TabsContent value="all-colors">
                    <Box my="6">
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th />
                            {contextMenuContentPropDefs.variant.values.map((variant) => (
                              <th key={variant}>{upperFirst(variant)}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {themeAccentColorsOrdered.map((color) => (
                            <tr key={color}>
                              <td>{upperFirst(color)}</td>
                              {contextMenuContentPropDefs.variant.values.map((variant) => (
                                <td key={variant}>
                                  <Flex align="center" justify="center" gap="4">
                                    <ContextMenuRoot>
                                      <ContextMenuTrigger>
                                        <RightClickArea variant={variant} color={color} />
                                      </ContextMenuTrigger>
                                      <ContextMenuContent variant={variant} color={color}>
                                        <ExampleContextMenuContent />
                                      </ContextMenuContent>
                                    </ContextMenuRoot>
                                    <ContextMenuRoot>
                                      <ContextMenuTrigger>
                                        <RightClickArea
                                          variant={variant}
                                          color={color}
                                          highContrast
                                        />
                                      </ContextMenuTrigger>
                                      <ContextMenuContent
                                        variant={variant}
                                        color={color}
                                        highContrast
                                      >
                                        <ExampleContextMenuContent />
                                      </ContextMenuContent>
                                    </ContextMenuRoot>
                                  </Flex>
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Box>
                  </TabsContent>

                  <TabsContent value="all-sizes">
                    <Box my="6">
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th />
                            {contextMenuContentPropDefs.variant.values.map((variant) => (
                              <th key={variant} style={{ textAlign: 'left' }}>
                                {upperFirst(variant)}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {contextMenuContentPropDefs.size.values.map((size) => (
                            <tr key={size}>
                              <td>Size {size}</td>
                              {contextMenuContentPropDefs.variant.values.map((variant) => (
                                <td key={variant}>
                                  <Flex>
                                    <ContextMenuRoot>
                                      <ContextMenuTrigger>
                                        <RightClickArea size={size} variant={variant} />
                                      </ContextMenuTrigger>
                                      <ContextMenuContent size={size} variant={variant}>
                                        <ExampleContextMenuContent />
                                      </ContextMenuContent>
                                    </ContextMenuRoot>
                                  </Flex>
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Box>
                  </TabsContent>
                </TabsRoot>

                <Heading mb="5">Hover Card</Heading>
                <Flex direction="column" gap="4" mb="9">
                  {hoverCardContentPropDefs.size.values.map((size) => (
                    <Text key={size} size={size}>
                      Technology revolutionized{' '}
                      <HoverCardRoot>
                        <HoverCardTrigger>
                          <Link href="#">typography</Link>
                        </HoverCardTrigger>

                        <HoverCardContent size={size}>
                          <Flex>
                            {hoverCardInsetImage}
                            <Text as="p" size={size} style={{ maxWidth: 150 + 50 * Number(size) }}>
                              <Strong>Typography</Strong> is the art and technique of arranging type
                              to make written language legible, readable and appealing when
                              displayed. The arrangement of type involves selecting typefaces, point
                              sizes, line lengths, line-spacing (leading), and letter-spacing
                              (tracking)…
                            </Text>
                          </Flex>
                        </HoverCardContent>
                      </HoverCardRoot>{' '}
                      in the latter twentieth century.
                    </Text>
                  ))}
                </Flex>

                <Heading mb="5">Select</Heading>
                <TabsRoot defaultValue="theme-colors">
                  <TabsList size="2">
                    <TabsTrigger value="theme-colors">Theme colors</TabsTrigger>
                    <TabsTrigger value="all-colors">All colors</TabsTrigger>
                    <TabsTrigger value="all-sizes">All sizes</TabsTrigger>
                  </TabsList>
                  <TabsContent value="theme-colors">
                    <Box my="6">
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th />
                            <th>Accent</th>
                            <th>Gray</th>
                            <th>Placeholder</th>
                            <th>Disabled</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectTriggerPropDefs.variant.values.map((variant) => (
                            <tr key={variant}>
                              <td>{upperFirst(variant)}</td>
                              <td>
                                <SelectRoot defaultValue="apple">
                                  <SelectTrigger variant={variant} />
                                  <SelectContent
                                    variant={selectTriggerVariantToSelectContentVariant(variant)}
                                  >
                                    <ExampleSelectContent />
                                  </SelectContent>
                                </SelectRoot>
                              </td>
                              <td>
                                <SelectRoot defaultValue="apple">
                                  <SelectTrigger variant={variant} color="gray" />
                                  <SelectContent
                                    variant={selectTriggerVariantToSelectContentVariant(variant)}
                                    color="gray"
                                    highContrast
                                  >
                                    <ExampleSelectContent />
                                  </SelectContent>
                                </SelectRoot>
                              </td>
                              <td>
                                <SelectRoot>
                                  <SelectTrigger variant={variant} placeholder="Choose a fruit…" />
                                  <SelectContent
                                    variant={selectTriggerVariantToSelectContentVariant(variant)}
                                  >
                                    <ExampleSelectContent />
                                  </SelectContent>
                                </SelectRoot>
                              </td>
                              <td>
                                <SelectRoot defaultValue="apple" disabled>
                                  <SelectTrigger variant={variant} />
                                  <SelectContent
                                    variant={selectTriggerVariantToSelectContentVariant(variant)}
                                  >
                                    <ExampleSelectContent />
                                  </SelectContent>
                                </SelectRoot>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Box>
                  </TabsContent>

                  <TabsContent value="all-colors">
                    <Box my="6">
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th />
                            {selectTriggerPropDefs.variant.values.map((variant) => (
                              <th key={variant}>{upperFirst(variant)}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {themeAccentColorsOrdered.map((color) => (
                            <tr key={color}>
                              <td>{upperFirst(color)}</td>
                              {selectTriggerPropDefs.variant.values.map((variant) => (
                                <td key={variant}>
                                  <SelectRoot defaultValue="apple">
                                    <SelectTrigger variant={variant} color={color} />
                                    <SelectContent
                                      variant={selectTriggerVariantToSelectContentVariant(variant)}
                                      color={color}
                                    >
                                      <ExampleSelectContent />
                                    </SelectContent>
                                  </SelectRoot>
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Box>
                  </TabsContent>

                  <TabsContent value="all-sizes">
                    <Box my="6">
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th />
                            {selectTriggerPropDefs.radius.values.map((radius) => (
                              <th key={radius} style={{ textAlign: 'left' }}>
                                {radius === 'none' ? 'No radius' : upperFirst(radius)}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {selectTriggerPropDefs.variant.values.map((variant, index) => (
                            <React.Fragment key={variant}>
                              {index > 0 && (
                                <tr>
                                  <td>&nbsp;</td>
                                </tr>
                              )}
                              {selectRootPropDefs.size.values.map((size) => (
                                <tr key={size}>
                                  <td>Size {size}</td>
                                  {selectTriggerPropDefs.radius.values.map((radius) => (
                                    <td key={radius} style={{ textAlign: 'left' }}>
                                      <SelectRoot size={size} defaultValue="apple">
                                        <SelectTrigger variant={variant} radius={radius} />
                                        <SelectContent
                                          variant={selectTriggerVariantToSelectContentVariant(
                                            variant
                                          )}
                                        >
                                          <ExampleSelectContent />
                                        </SelectContent>
                                      </SelectRoot>
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </React.Fragment>
                          ))}
                        </tbody>
                      </table>
                    </Box>
                  </TabsContent>
                </TabsRoot>

                <Heading mb="5">Checkbox</Heading>
                <TabsRoot defaultValue="theme-colors">
                  <TabsList size="2">
                    <TabsTrigger value="theme-colors">Theme colors</TabsTrigger>
                    <TabsTrigger value="all-colors">All colors</TabsTrigger>
                    <TabsTrigger value="all-sizes">All sizes</TabsTrigger>
                  </TabsList>
                  <TabsContent value="theme-colors">
                    <Box my="6">
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th />
                            <th colSpan={2}>Accent</th>
                            <th colSpan={2}>Gray</th>
                            <th>Disabled</th>
                          </tr>
                        </thead>
                        <tbody>
                          {checkboxPropDefs.variant.values.map((variant) => (
                            <tr key={variant}>
                              <td>{upperFirst(variant)}</td>
                              <td>
                                <Flex align="center" justify="center" gap="4">
                                  <Checkbox variant={variant} />
                                  <Checkbox variant={variant} defaultChecked />
                                </Flex>
                              </td>
                              <td>
                                <Flex align="center" justify="center" gap="4">
                                  <Checkbox variant={variant} highContrast defaultChecked />
                                </Flex>
                              </td>
                              <td>
                                <Flex align="center" justify="center" gap="4">
                                  <Checkbox variant={variant} color="gray" />
                                  <Checkbox variant={variant} color="gray" defaultChecked />
                                </Flex>
                              </td>
                              <td>
                                <Flex align="center" justify="center" gap="4">
                                  <Checkbox
                                    variant={variant}
                                    color="gray"
                                    highContrast
                                    defaultChecked
                                  />
                                </Flex>
                              </td>
                              <td>
                                <Flex align="center" justify="center" gap="4">
                                  <Checkbox variant={variant} disabled />
                                  <Checkbox variant={variant} disabled defaultChecked />
                                </Flex>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Box>
                  </TabsContent>

                  <TabsContent value="all-colors">
                    <Box my="6">
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th />
                            {checkboxPropDefs.variant.values.map((variant) => (
                              <th key={variant}>{upperFirst(variant)}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {themeAccentColorsOrdered.map((color) => (
                            <tr key={color}>
                              <td>{upperFirst(color)}</td>
                              {checkboxPropDefs.variant.values.map((variant) => (
                                <td key={variant}>
                                  <Flex align="center" justify="center" gap="4">
                                    <Checkbox variant={variant} color={color} />
                                    <Checkbox variant={variant} color={color} defaultChecked />
                                    <Checkbox
                                      variant={variant}
                                      color={color}
                                      highContrast
                                      defaultChecked
                                    />
                                  </Flex>
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Box>
                  </TabsContent>

                  <TabsContent value="all-sizes">
                    <Box my="6">
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th />
                            {checkboxPropDefs.variant.values.map((variant) => (
                              <th key={variant} style={{ textAlign: 'left' }}>
                                {upperFirst(variant)}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {checkboxPropDefs.size.values.map((size) => (
                            <tr key={size}>
                              <td>Size {size}</td>
                              {checkboxPropDefs.variant.values.map((variant) => (
                                <td key={variant} style={{ textAlign: 'left' }}>
                                  <Flex align="center" justify="start" gap="4">
                                    <Checkbox size={size} variant={variant} defaultChecked />
                                  </Flex>
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Box>
                  </TabsContent>
                </TabsRoot>

                <Heading mb="5">Radio Group</Heading>
                <TabsRoot defaultValue="theme-colors">
                  <TabsList size="2">
                    <TabsTrigger value="theme-colors">Theme colors</TabsTrigger>
                    <TabsTrigger value="all-colors">All colors</TabsTrigger>
                    <TabsTrigger value="all-sizes">All sizes</TabsTrigger>
                  </TabsList>
                  <TabsContent value="theme-colors">
                    <Box my="6">
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th />
                            <th colSpan={2}>Accent</th>
                            <th colSpan={2}>Gray</th>
                            <th>Disabled</th>
                          </tr>
                        </thead>
                        <tbody>
                          {radioGroupPropDefs.variant.values.map((variant) => (
                            <tr key={variant}>
                              <td>{upperFirst(variant)}</td>
                              <td>
                                <Flex align="center" justify="center" gap="4">
                                  <RadioGroupRoot variant={variant}>
                                    <RadioGroupItem value="value" />
                                  </RadioGroupRoot>
                                  <RadioGroupRoot variant={variant} defaultValue="value">
                                    <RadioGroupItem value="value" />
                                  </RadioGroupRoot>
                                </Flex>
                              </td>
                              <td>
                                <Flex align="center" justify="center" gap="4">
                                  <RadioGroupRoot
                                    variant={variant}
                                    highContrast
                                    defaultValue="value"
                                  >
                                    <RadioGroupItem value="value" />
                                  </RadioGroupRoot>
                                </Flex>
                              </td>
                              <td>
                                <Flex align="center" justify="center" gap="4">
                                  <RadioGroupRoot variant={variant} color="gray">
                                    <RadioGroupItem value="value" />
                                  </RadioGroupRoot>
                                  <RadioGroupRoot
                                    variant={variant}
                                    color="gray"
                                    defaultValue="value"
                                  >
                                    <RadioGroupItem value="value" />
                                  </RadioGroupRoot>
                                </Flex>
                              </td>
                              <td>
                                <Flex align="center" justify="center" gap="4">
                                  <RadioGroupRoot
                                    variant={variant}
                                    color="gray"
                                    highContrast
                                    defaultValue="value"
                                  >
                                    <RadioGroupItem value="value" />
                                  </RadioGroupRoot>
                                </Flex>
                              </td>
                              <td>
                                <Flex align="center" justify="center" gap="4">
                                  <RadioGroupRoot variant={variant} disabled>
                                    <RadioGroupItem value="value" />
                                  </RadioGroupRoot>
                                  <RadioGroupRoot variant={variant} disabled defaultValue="value">
                                    <RadioGroupItem value="value" />
                                  </RadioGroupRoot>
                                </Flex>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Box>
                  </TabsContent>

                  <TabsContent value="all-colors">
                    <Box my="6">
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th />
                            {radioGroupPropDefs.variant.values.map((variant) => (
                              <th key={variant}>{upperFirst(variant)}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {themeAccentColorsOrdered.map((color) => (
                            <tr key={color}>
                              <td>{upperFirst(color)}</td>
                              {radioGroupPropDefs.variant.values.map((variant) => (
                                <td key={variant}>
                                  <Flex align="center" justify="center" gap="4">
                                    <RadioGroupRoot variant={variant} color={color}>
                                      <RadioGroupItem value="value" />
                                    </RadioGroupRoot>

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
                                      highContrast
                                      defaultValue="value"
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
                    </Box>
                  </TabsContent>

                  <TabsContent value="all-sizes">
                    <Box my="6">
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th />
                            {radioGroupPropDefs.variant.values.map((variant) => (
                              <th key={variant} style={{ textAlign: 'left' }}>
                                {upperFirst(variant)}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {radioGroupPropDefs.size.values.map((size) => (
                            <tr key={size}>
                              <td>Size {size}</td>
                              {radioGroupPropDefs.variant.values.map((variant) => (
                                <td key={variant} style={{ textAlign: 'left' }}>
                                  <Flex align="center" justify="start" gap="4">
                                    <RadioGroupRoot
                                      size={size}
                                      variant={variant}
                                      defaultValue="value"
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
                    </Box>
                  </TabsContent>
                </TabsRoot>

                <Heading mb="5">Switch</Heading>
                <TabsRoot defaultValue="theme-colors">
                  <TabsList size="2">
                    <TabsTrigger value="theme-colors">Theme colors</TabsTrigger>
                    <TabsTrigger value="all-colors">All colors</TabsTrigger>
                    <TabsTrigger value="all-sizes">All sizes</TabsTrigger>
                  </TabsList>
                  <TabsContent value="theme-colors">
                    <Box my="6">
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th />
                            <th colSpan={2}>Accent</th>
                            <th colSpan={2}>Gray</th>
                            <th>Disabled</th>
                          </tr>
                        </thead>
                        <tbody>
                          {switchPropDefs.variant.values.map((variant) => (
                            <tr key={variant}>
                              <td>{upperFirst(variant)}</td>
                              <td>
                                <Flex align="center" justify="center" gap="4">
                                  <Switch variant={variant} />
                                  <Switch variant={variant} defaultChecked />
                                </Flex>
                              </td>
                              <td>
                                <Flex align="center" justify="center" gap="4">
                                  <Switch variant={variant} highContrast defaultChecked />
                                </Flex>
                              </td>
                              <td>
                                <Flex align="center" justify="center" gap="4">
                                  <Switch variant={variant} color="gray" />
                                  <Switch variant={variant} color="gray" defaultChecked />
                                </Flex>
                              </td>
                              <td>
                                <Flex align="center" justify="center" gap="4">
                                  <Switch
                                    variant={variant}
                                    color="gray"
                                    highContrast
                                    defaultChecked
                                  />
                                </Flex>
                              </td>
                              <td>
                                <Flex align="center" justify="center" gap="4">
                                  <Switch variant={variant} disabled />
                                  <Switch variant={variant} disabled defaultChecked />
                                </Flex>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Box>
                  </TabsContent>

                  <TabsContent value="all-colors">
                    <Box my="6">
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th />
                            {switchPropDefs.variant.values.map((variant) => (
                              <th key={variant}>{upperFirst(variant)}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {themeAccentColorsOrdered.map((color) => (
                            <tr key={color}>
                              <td>{upperFirst(color)}</td>
                              {switchPropDefs.variant.values.map((variant) => (
                                <td key={variant}>
                                  <Flex align="center" justify="center" gap="4">
                                    <Switch variant={variant} color={color} />
                                    <Switch variant={variant} color={color} defaultChecked />
                                    <Switch
                                      variant={variant}
                                      color={color}
                                      highContrast
                                      defaultChecked
                                    />
                                  </Flex>
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Box>
                  </TabsContent>

                  <TabsContent value="all-sizes">
                    <Box my="6">
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th />
                            {switchPropDefs.radius.values.map((radius) => (
                              <th key={radius} style={{ textAlign: 'left' }}>
                                {radius === 'none' ? 'No radius' : upperFirst(radius)}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {switchPropDefs.variant.values.map((variant, index) => (
                            <React.Fragment key={variant}>
                              {index > 0 && (
                                <tr>
                                  <td>&nbsp;</td>
                                </tr>
                              )}
                              {switchPropDefs.size.values.map((size) => (
                                <tr key={size}>
                                  <td>Size {size}</td>
                                  {switchPropDefs.radius.values.map((radius) => (
                                    <td key={radius} style={{ textAlign: 'left' }}>
                                      <Flex align="center" justify="start" gap="4">
                                        <Switch
                                          size={size}
                                          variant={variant}
                                          radius={radius}
                                          defaultChecked
                                        />
                                      </Flex>
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </React.Fragment>
                          ))}
                        </tbody>
                      </table>
                    </Box>
                  </TabsContent>
                </TabsRoot>

                <Heading mb="5">Slider</Heading>
                <TabsRoot defaultValue="theme-colors">
                  <TabsList size="2">
                    <TabsTrigger value="theme-colors">Theme colors</TabsTrigger>
                    <TabsTrigger value="all-colors">All colors</TabsTrigger>
                    <TabsTrigger value="all-sizes">All sizes</TabsTrigger>
                  </TabsList>
                  <TabsContent value="theme-colors">
                    <Box my="6">
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th />
                            <th colSpan={2}>Accent</th>
                            <th colSpan={2}>Gray</th>
                            <th>Disabled</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sliderPropDefs.variant.values.map((variant, index) => (
                            <tr key={variant}>
                              <td>{upperFirst(variant)}</td>
                              <td>
                                <Slider defaultValue={[33 + 17 * index]} variant={variant} />
                              </td>
                              <td>
                                <Slider
                                  defaultValue={[33 + 17 * index]}
                                  variant={variant}
                                  highContrast
                                />
                              </td>
                              <td>
                                <Slider
                                  defaultValue={[33 + 17 * index]}
                                  variant={variant}
                                  color="gray"
                                />
                              </td>
                              <td>
                                <Slider
                                  defaultValue={[33 + 17 * index]}
                                  variant={variant}
                                  color="gray"
                                  highContrast
                                />
                              </td>
                              <td>
                                <Slider
                                  defaultValue={[33 + 17 * index]}
                                  variant={variant}
                                  disabled
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Box>
                  </TabsContent>

                  <TabsContent value="all-colors">
                    <Box my="6">
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th />
                            {sliderPropDefs.variant.values.map((variant) => (
                              <th key={variant} colSpan={2}>
                                {upperFirst(variant)}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {themeAccentColorsOrdered.map((color, index) => (
                            <tr key={color}>
                              <td>{upperFirst(color)}</td>
                              {sliderPropDefs.variant.values.map((variant) => (
                                <React.Fragment key={variant}>
                                  <td>
                                    <Slider
                                      defaultValue={[30 + index * 2]}
                                      color={color}
                                      variant={variant}
                                    />
                                  </td>
                                  <td>
                                    <Slider
                                      defaultValue={[30 + index * 2]}
                                      color={color}
                                      variant={variant}
                                      highContrast
                                    />
                                  </td>
                                </React.Fragment>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Box>
                  </TabsContent>

                  <TabsContent value="all-sizes">
                    <Box my="6">
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th />
                            {sliderPropDefs.radius.values.map((radius) => (
                              <th key={radius} style={{ textAlign: 'left' }}>
                                {radius === 'none' ? 'No radius' : upperFirst(radius)}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {sliderPropDefs.variant.values.map((variant, index) => (
                            <React.Fragment key={variant}>
                              {index > 0 && (
                                <tr>
                                  <td>&nbsp;</td>
                                </tr>
                              )}
                              {sliderPropDefs.size.values.map((size, sizeIndex) => (
                                <tr key={size}>
                                  <td>Size {size}</td>
                                  {sliderPropDefs.radius.values.map((radius) => (
                                    <td key={radius} style={{ textAlign: 'left' }}>
                                      <Flex align="center" justify="start" gap="4">
                                        <Slider
                                          defaultValue={[33 + 17 * sizeIndex]}
                                          size={size}
                                          variant={variant}
                                          radius={radius}
                                        />
                                      </Flex>
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </React.Fragment>
                          ))}
                        </tbody>
                      </table>
                    </Box>
                  </TabsContent>
                </TabsRoot>

                <Heading mb="5">Text Field</Heading>
                <TabsRoot defaultValue="theme-colors">
                  <TabsList size="2">
                    <TabsTrigger value="theme-colors">Theme colors</TabsTrigger>
                    <TabsTrigger value="all-colors">All colors</TabsTrigger>
                    <TabsTrigger value="all-sizes">All sizes</TabsTrigger>
                  </TabsList>
                  <TabsContent value="theme-colors">
                    <Box my="6">
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th />
                            <th>Accent</th>
                            <th>Gray</th>
                            <th>Disabled</th>
                            <th>Read-only</th>
                          </tr>
                        </thead>
                        <tbody>
                          {textFieldPropDefs.variant.values.map((variant) => (
                            <tr key={variant}>
                              <td>{upperFirst(variant)}</td>
                              <td>
                                <TextFieldRoot variant={variant}>
                                  <TextFieldSlot>
                                    <MagnifyingGlassIcon width="16" height="16" />
                                  </TextFieldSlot>
                                  <TextFieldInput placeholder="Search" />
                                  <TextFieldSlot>
                                    <IconButton variant="ghost" color="gray" size="1">
                                      <InfoCircledIcon />
                                    </IconButton>
                                  </TextFieldSlot>
                                </TextFieldRoot>
                              </td>
                              <td>
                                <TextFieldRoot variant={variant} color="gray">
                                  <TextFieldSlot>
                                    <MagnifyingGlassIcon width="16" height="16" />
                                  </TextFieldSlot>
                                  <TextFieldInput placeholder="Search" />
                                  <TextFieldSlot>
                                    <IconButton variant="ghost" color="gray" size="1">
                                      <InfoCircledIcon />
                                    </IconButton>
                                  </TextFieldSlot>
                                </TextFieldRoot>
                              </td>
                              <td>
                                <TextFieldRoot variant={variant}>
                                  <TextFieldSlot>
                                    <MagnifyingGlassIcon width="16" height="16" />
                                  </TextFieldSlot>
                                  <TextFieldInput
                                    placeholder="Search"
                                    defaultValue="Quick brown fox"
                                    disabled
                                  />
                                  <TextFieldSlot>
                                    <IconButton variant="ghost" color="gray" size="1" disabled>
                                      <InfoCircledIcon />
                                    </IconButton>
                                  </TextFieldSlot>
                                </TextFieldRoot>
                              </td>
                              <td>
                                <TextFieldRoot variant={variant}>
                                  <TextFieldSlot>
                                    <MagnifyingGlassIcon width="16" height="16" />
                                  </TextFieldSlot>
                                  <TextFieldInput
                                    placeholder="Search"
                                    defaultValue="Quick brown fox"
                                    readOnly
                                  />
                                  <TextFieldSlot>
                                    <IconButton variant="ghost" color="gray" size="1">
                                      <InfoCircledIcon />
                                    </IconButton>
                                  </TextFieldSlot>
                                </TextFieldRoot>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Box>
                  </TabsContent>

                  <TabsContent value="all-colors">
                    <Box my="6">
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th />
                            {textFieldPropDefs.variant.values.map((variant) => (
                              <th key={variant}>{upperFirst(variant)}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {themeAccentColorsOrdered.map((color) => (
                            <tr key={color}>
                              <td>{upperFirst(color)}</td>
                              {textFieldPropDefs.variant.values.map((variant) => (
                                <td key={variant}>
                                  <TextFieldRoot color={color} variant={variant}>
                                    <TextFieldSlot>
                                      <MagnifyingGlassIcon width="16" height="16" />
                                    </TextFieldSlot>
                                    <TextFieldInput placeholder="Search" />
                                    <TextFieldSlot>
                                      <IconButton variant="ghost" color="gray" size="1">
                                        <InfoCircledIcon />
                                      </IconButton>
                                    </TextFieldSlot>
                                  </TextFieldRoot>
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Box>
                  </TabsContent>

                  <TabsContent value="all-sizes">
                    <Box my="6">
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th />
                            {textFieldPropDefs.radius.values.map((radius) => (
                              <th key={radius} style={{ textAlign: 'left' }}>
                                {radius === 'none' ? 'No radius' : upperFirst(radius)}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {textFieldPropDefs.variant.values.map((variant, index) => (
                            <React.Fragment key={variant}>
                              {index > 0 && (
                                <tr>
                                  <td>&nbsp;</td>
                                </tr>
                              )}
                              <tr>
                                <td>Size 1</td>
                                {textFieldPropDefs.radius.values.map((radius) => (
                                  <td key={radius}>
                                    <TextFieldRoot
                                      size="1"
                                      variant={variant}
                                      radius={radius}
                                      style={{ width: 140 }}
                                    >
                                      <TextFieldSlot>
                                        <MagnifyingGlassIcon width="14" height="14" />
                                      </TextFieldSlot>
                                      <TextFieldInput placeholder="Search" />
                                    </TextFieldRoot>
                                  </td>
                                ))}
                              </tr>
                              <tr>
                                <td>Size 2</td>
                                {textFieldPropDefs.radius.values.map((radius) => (
                                  <td key={radius}>
                                    <TextFieldRoot
                                      size="2"
                                      variant={variant}
                                      radius={radius}
                                      style={{ width: 160 }}
                                    >
                                      <TextFieldSlot>
                                        <MagnifyingGlassIcon width="16" height="16" />
                                      </TextFieldSlot>
                                      <TextFieldInput placeholder="Search" />
                                      <TextFieldSlot>
                                        <IconButton variant="ghost" color="gray" size="1">
                                          <InfoCircledIcon />
                                        </IconButton>
                                      </TextFieldSlot>
                                    </TextFieldRoot>
                                  </td>
                                ))}
                              </tr>
                              <tr>
                                <td>Size 3</td>
                                {textFieldPropDefs.radius.values.map((radius) => (
                                  <td key={radius}>
                                    <TextFieldRoot size="3" variant={variant} radius={radius}>
                                      <TextFieldSlot>
                                        <MagnifyingGlassIcon width="18" height="18" />
                                      </TextFieldSlot>
                                      <TextFieldInput placeholder="Search" />
                                      <TextFieldSlot>
                                        <IconButton variant="ghost" color="gray" size="2">
                                          <InfoCircledIcon />
                                        </IconButton>
                                      </TextFieldSlot>
                                    </TextFieldRoot>
                                  </td>
                                ))}
                              </tr>
                            </React.Fragment>
                          ))}
                        </tbody>
                      </table>
                    </Box>
                  </TabsContent>
                </TabsRoot>

                <Heading mb="5">Text Area</Heading>
                <TabsRoot defaultValue="theme-colors">
                  <TabsList size="2">
                    <TabsTrigger value="theme-colors">Theme colors</TabsTrigger>
                    <TabsTrigger value="all-colors">All colors</TabsTrigger>
                    <TabsTrigger value="all-sizes">All sizes</TabsTrigger>
                  </TabsList>
                  <TabsContent value="theme-colors">
                    <Box my="6">
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th />
                            <th>Accent</th>
                            <th>Gray</th>
                            <th>Disabled</th>
                            <th>Read-only</th>
                          </tr>
                        </thead>
                        <tbody>
                          {textAreaPropDefs.variant.values.map((variant) => (
                            <tr key={variant}>
                              <td>{upperFirst(variant)}</td>
                              <td>
                                <TextArea variant={variant} placeholder="Reply to comment" />
                              </td>
                              <td>
                                <TextArea
                                  variant={variant}
                                  color="gray"
                                  placeholder="Reply to comment"
                                />
                              </td>
                              <td>
                                <TextArea
                                  variant={variant}
                                  placeholder="Reply to comment"
                                  defaultValue="The :autofill CSS pseudo-class matches when an <input> element has its value autofilled by the browser."
                                  disabled
                                />
                              </td>
                              <td>
                                <TextArea
                                  variant={variant}
                                  placeholder="Reply to comment"
                                  defaultValue="The :autofill CSS pseudo-class matches when an <input> element has its value autofilled by the browser."
                                  readOnly
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Box>
                  </TabsContent>

                  <TabsContent value="all-colors">
                    <Box my="6">
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th />
                            {textAreaPropDefs.variant.values.map((variant) => (
                              <th key={variant}>{upperFirst(variant)}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {themeAccentColorsOrdered.map((color) => (
                            <tr key={color}>
                              <td>{upperFirst(color)}</td>
                              {textAreaPropDefs.variant.values.map((variant) => (
                                <td key={variant}>
                                  <TextArea
                                    color={color}
                                    variant={variant}
                                    placeholder="Reply to comment"
                                  />
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Box>
                  </TabsContent>

                  <TabsContent value="all-sizes">
                    <Box my="6">
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th />
                            {textAreaPropDefs.variant.values.map((variant) => (
                              <th key={variant} style={{ textAlign: 'left' }}>
                                {upperFirst(variant)}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {textAreaPropDefs.size.values.map((size) => (
                            <tr key={size}>
                              <td>Size {size}</td>
                              {textAreaPropDefs.variant.values.map((variant) => (
                                <td key={variant}>
                                  <TextArea
                                    size={size}
                                    variant={variant}
                                    placeholder="Reply to comment"
                                    style={{ width: 120 + Number(size) * 20 }}
                                  />
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Box>
                  </TabsContent>
                </TabsRoot>

                <Heading mb="5">Table</Heading>
                <Box my="6" style={{ whiteSpace: 'nowrap' }}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th />
                        {tableRootPropDefs.variant.values.map((variant) => (
                          <th
                            key={variant}
                            style={{
                              paddingRight: 'var(--space-8)',
                              paddingBottom: 'var(--space-6)',
                            }}
                          >
                            {upperFirst(variant)}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {tableRootPropDefs.size.values.map((size) => (
                        <tr key={size}>
                          <td>Size {size}</td>
                          {tableRootPropDefs.variant.values.map((variant) => (
                            <td
                              key={variant}
                              style={{
                                paddingRight: 'var(--space-8)',
                                paddingBottom: 'var(--space-8)',
                              }}
                            >
                              <TableRoot variant={variant} size={size}>
                                <TableHeader>
                                  <TableRow>
                                    <TableColumnHeaderCell>Full name</TableColumnHeaderCell>
                                    <TableColumnHeaderCell>Email</TableColumnHeaderCell>
                                    <TableColumnHeaderCell>Group</TableColumnHeaderCell>
                                  </TableRow>
                                </TableHeader>

                                <TableBody>
                                  <TableRow>
                                    <TableRowHeaderCell>Danilo Sousa</TableRowHeaderCell>
                                    <TableCell>danilo@example.com</TableCell>
                                    <TableCell>Developer</TableCell>
                                  </TableRow>

                                  <TableRow>
                                    <TableRowHeaderCell>Zahra Ambessa</TableRowHeaderCell>
                                    <TableCell>zahra@example.com</TableCell>
                                    <TableCell>Admin</TableCell>
                                  </TableRow>

                                  <TableRow>
                                    <TableRowHeaderCell>Jasper Eriksson</TableRowHeaderCell>
                                    <TableCell>jasper@example.com</TableCell>
                                    <TableCell>Developer</TableCell>
                                  </TableRow>
                                </TableBody>
                              </TableRoot>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Box>

                <Heading mb="5">Tabs</Heading>
                <Flex gap="8" align="end" mb="9">
                  {tabsListPropDefs.size.values.map((size) => (
                    <TabsRoot key={size} defaultValue="account" activationMode="manual">
                      <TabsList size={size}>
                        <TabsTrigger value="account">Account</TabsTrigger>
                        <TabsTrigger value="documents">Documents</TabsTrigger>
                        <TabsTrigger value="settings">Settings</TabsTrigger>
                      </TabsList>
                    </TabsRoot>
                  ))}
                </Flex>

                <Heading mb="5">Aspect Ratio</Heading>
                <Grid columns="4" gap="4" mb="9">
                  {['1 / 2', '1 / 1', '16 / 9', '2 / 1'].map((ratio) => (
                    <div key={ratio}>
                      <Text as="p" size="1" color="gray" mb="2">
                        Ratio: {ratio.replace('/', 'x')}
                      </Text>
                      <AspectRatio ratio={eval(ratio)}>{aspectRatioImage}</AspectRatio>
                    </div>
                  ))}
                </Grid>
              </Box>

              {/* Vlad works here */}
              <Box m={{ initial: '3', md: '6', xl: '9' }}>
                <Heading mb="5">Blockquote</Heading>
                <TabsRoot defaultValue="specimen">
                  <TabsList size="2">
                    <TabsTrigger value="specimen">Specimen</TabsTrigger>
                    <TabsTrigger value="all-colors">All colors</TabsTrigger>
                    <TabsTrigger value="all-sizes">All sizes</TabsTrigger>
                    <TabsTrigger value="all-weights">All weights</TabsTrigger>
                  </TabsList>
                  <TabsContent value="specimen">
                    <Grid my="6" gap="6" columns="auto auto" style={{ whiteSpace: 'nowrap' }}>
                      <Flex direction="column" gap="6">
                        <Text mb="-4" size="1" color="gray" align="center">
                          Accent
                        </Text>

                        <Blockquote size="4">
                          Perfect typography is certainly the most elusive of all arts.
                          <br />
                          Sculpture in stone alone comes near it in obstinacy.
                        </Blockquote>

                        <Blockquote size="3">
                          Perfect typography is certainly the most elusive of all arts.
                          <br />
                          Sculpture in stone alone comes near it in obstinacy.
                        </Blockquote>

                        <Blockquote size="2">
                          Perfect typography is certainly the most elusive of all arts.
                          <br />
                          Sculpture in stone alone comes near it in obstinacy.
                        </Blockquote>
                      </Flex>

                      <Flex direction="column" gap="6">
                        <Text mb="-4" size="1" color="gray" align="center">
                          Gray
                        </Text>

                        <Blockquote size="4" color="gray">
                          Perfect typography is certainly the most elusive of all arts.
                          <br />
                          Sculpture in stone alone comes near it in obstinacy.
                        </Blockquote>

                        <Blockquote size="3" color="gray">
                          Perfect typography is certainly the most elusive of all arts.
                          <br />
                          Sculpture in stone alone comes near it in obstinacy.
                        </Blockquote>

                        <Blockquote size="2" color="gray">
                          Perfect typography is certainly the most elusive of all arts.
                          <br />
                          Sculpture in stone alone comes near it in obstinacy.
                        </Blockquote>
                      </Flex>
                    </Grid>
                  </TabsContent>

                  <TabsContent value="all-colors">
                    <Box my="6">
                      <table className={styles.table} style={{ whiteSpace: 'nowrap' }}>
                        <tbody>
                          {themeAccentColorsOrdered.map((color) => (
                            <tr key={color}>
                              <td>{upperFirst(color)}</td>
                              <td style={{ textAlign: 'left' }}>
                                <Flex gap="6">
                                  <Blockquote color={color}>
                                    Perfect typography is certainly the most elusive of all arts.
                                    <br />
                                    Sculpture in stone alone comes near it in obstinacy.
                                  </Blockquote>
                                  <Blockquote color={color} highContrast>
                                    Perfect typography is certainly the most elusive of all arts.
                                    <br />
                                    Sculpture in stone alone comes near it in obstinacy.
                                  </Blockquote>
                                </Flex>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Box>
                  </TabsContent>

                  <TabsContent value="all-sizes">
                    <Box my="6">
                      <table className={styles.table}>
                        <tbody>
                          {blockquotePropDefs.size.values.map((size) => (
                            <tr key={size}>
                              <td>Size {size}</td>
                              <td style={{ textAlign: 'left' }}>
                                <Blockquote size={size}>
                                  Perfect typography is certainly
                                  <br />
                                  the most elusive of all arts.
                                </Blockquote>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Box>
                  </TabsContent>

                  <TabsContent value="all-weights">
                    <Box my="6">
                      <table className={styles.table} style={{ whiteSpace: 'nowrap' }}>
                        <tbody>
                          {blockquotePropDefs.weight.values.map((weight) => (
                            <tr key={weight}>
                              <td>{upperFirst(weight)}</td>
                              <td style={{ textAlign: 'left' }}>
                                <Blockquote weight={weight}>
                                  Perfect typography is certainly the most elusive of all arts.
                                  <br />
                                  Sculpture in stone alone comes near it in obstinacy.
                                </Blockquote>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Box>
                  </TabsContent>
                </TabsRoot>

                <Heading mb="5">Code</Heading>
                <TabsRoot defaultValue="theme-colors">
                  <TabsList size="2">
                    <TabsTrigger value="theme-colors">Theme colors</TabsTrigger>
                    <TabsTrigger value="all-colors">All colors</TabsTrigger>
                    <TabsTrigger value="all-sizes">All sizes</TabsTrigger>
                    <TabsTrigger value="all-weights">All weights</TabsTrigger>
                  </TabsList>
                  <TabsContent value="theme-colors">
                    <Box my="6">
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th />
                            <th colSpan={2}>Accent</th>
                            <th colSpan={2}>Gray</th>
                          </tr>
                        </thead>
                        <tbody>
                          {codePropDefs.variant.values.map((variant) => (
                            <tr key={variant} style={{ verticalAlign: 'baseline' }}>
                              <td>{upperFirst(variant)}</td>
                              <td>
                                <Flex>
                                  <Code variant={variant}>console.log()</Code>
                                </Flex>
                              </td>
                              <td>
                                <Flex>
                                  <Code variant={variant} highContrast>
                                    console.log()
                                  </Code>
                                </Flex>
                              </td>
                              <td>
                                <Flex>
                                  <Code variant={variant} color="gray">
                                    console.log()
                                  </Code>
                                </Flex>
                              </td>
                              <td>
                                <Flex>
                                  <Code variant={variant} color="gray" highContrast>
                                    console.log()
                                  </Code>
                                </Flex>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Box>
                  </TabsContent>

                  <TabsContent value="all-colors">
                    <Box my="6">
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th />
                            {codePropDefs.variant.values.map((variant) => (
                              <th key={variant}>{upperFirst(variant)}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {themeAccentColorsOrdered.map((color) => (
                            <tr key={color} style={{ verticalAlign: 'baseline' }}>
                              <td>{upperFirst(color)}</td>
                              {codePropDefs.variant.values.map((variant) => (
                                <td key={variant}>
                                  <Flex align="center" justify="center" gap="4">
                                    <Code variant={variant} color={color}>
                                      console.log()
                                    </Code>
                                    <Code variant={variant} color={color} highContrast>
                                      console.log()
                                    </Code>
                                  </Flex>
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Box>
                  </TabsContent>

                  <TabsContent value="all-sizes">
                    <Box my="6">
                      <Flex direction="column" gap="4">
                        {codePropDefs.size.values.map((size) => (
                          <Flex align="center" key={size}>
                            <Box shrink="0" style={{ width: 80 }}>
                              <Text color="gray" size="1">
                                Size {size}
                              </Text>
                            </Box>
                            <Code size={size}>console.log()</Code>
                          </Flex>
                        ))}
                      </Flex>
                    </Box>
                  </TabsContent>

                  <TabsContent value="all-weights">
                    <Box my="6">
                      <table className={styles.table} style={{ whiteSpace: 'nowrap' }}>
                        <tbody>
                          {(['regular', 'bold'] as const).map((weight) => (
                            <tr key={weight} style={{ verticalAlign: 'baseline' }}>
                              <td>{upperFirst(weight)}</td>
                              <td style={{ textAlign: 'left' }}>
                                <Code weight={weight}>console.log()</Code>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Box>
                  </TabsContent>
                </TabsRoot>

                <Heading mb="5">Em</Heading>
                <Box mb="9" style={{ width: 'calc(580px * var(--scaling))' }}>
                  Versions of the <Em>Lorem ipsum</Em> text have been used in typesetting at least
                  since the 1960s, when it was popularized by advertisements for Letraset transfer
                  sheets. It is typically a corrupted version of{' '}
                  <Em>De finibus bonorum et malorum</Em>, a 1st-century BC text by the Roman
                  statesman and philosopher Cicero, with words altered, added, and removed to make
                  it nonsensical and improper Latin.
                </Box>

                <Heading mb="5">Heading</Heading>
                <TabsRoot defaultValue="specimen">
                  <TabsList size="2">
                    <TabsTrigger value="specimen">Specimen</TabsTrigger>
                    <TabsTrigger value="all-colors">All colors</TabsTrigger>
                    <TabsTrigger value="all-sizes">All sizes</TabsTrigger>
                    <TabsTrigger value="all-weights">All weights</TabsTrigger>
                  </TabsList>
                  <TabsContent value="specimen">
                    <Box my="6" style={{ width: 'calc(560px * var(--scaling))' }}>
                      <Heading size="9">
                        The principles of the typographic craft are difficult to master
                      </Heading>
                    </Box>

                    <Flex my="6" gap="6">
                      <Box style={{ width: 'calc(340px * var(--scaling))' }}>
                        <Heading size="5" mb="2">
                          The principles of the typographic craft are difficult to master
                        </Heading>
                        <Text as="p" size="3">
                          The goal of typography is to relate font size, line height, and line width
                          in a proportional way that maximizes beauty and makes reading easier and
                          more pleasant.
                        </Text>
                      </Box>

                      <Box style={{ width: 'calc(320px * var(--scaling))' }}>
                        <Heading size="4" mb="2">
                          The principles of the typographic craft are difficult to master
                        </Heading>
                        <Text as="p" size="3">
                          The goal of typography is to relate font size, line height, and line width
                          in a proportional way that maximizes beauty and makes reading easier and
                          more pleasant.
                        </Text>
                      </Box>
                    </Flex>

                    <Flex my="6" gap="6">
                      <Box style={{ width: 'calc(290px * var(--scaling))' }}>
                        <Heading size="3" mb="1">
                          The principles of the typographic craft are difficult to master
                        </Heading>
                        <Text as="p" size="2">
                          The goal of typography is to relate font size, line height, and line width
                          in a proportional way that maximizes beauty and makes reading easier and
                          more pleasant.
                        </Text>
                      </Box>

                      <Box style={{ width: 'calc(260px * var(--scaling))' }}>
                        <Heading size="2" mb="1">
                          The principles of the typographic craft are difficult to master
                        </Heading>
                        <Text as="p" size="1">
                          The goal of typography is to relate font size, line height, and line width
                          in a proportional way that maximizes beauty and makes reading easier and
                          more pleasant.
                        </Text>
                      </Box>
                    </Flex>
                  </TabsContent>

                  <TabsContent value="all-colors">
                    <Box my="6">
                      <table className={styles.table} style={{ whiteSpace: 'nowrap' }}>
                        <tbody>
                          {themeAccentColorsOrdered.map((color) => (
                            <tr key={color}>
                              <td>{upperFirst(color)}</td>
                              <td>
                                <Heading color={color}>
                                  The quick brown fox jumps over the lazy dog
                                </Heading>
                                <Heading color={color} highContrast>
                                  The quick brown fox jumps over the lazy dog
                                </Heading>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Box>
                  </TabsContent>

                  <TabsContent value="all-sizes">
                    <Box my="6">
                      <table className={styles.table} style={{ whiteSpace: 'nowrap' }}>
                        <tbody>
                          {headingPropDefs.size.values.map((size) => (
                            <tr key={size}>
                              <td>Size {size}</td>
                              <td style={{ textAlign: 'left' }}>
                                <Heading size={size}>
                                  The quick brown fox
                                  <br />
                                  jumps over the lazy dog
                                </Heading>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Box>
                  </TabsContent>

                  <TabsContent value="all-weights">
                    <Box my="6">
                      <table className={styles.table} style={{ whiteSpace: 'nowrap' }}>
                        <tbody>
                          {headingPropDefs.weight.values.map((weight) => (
                            <tr key={weight} style={{ verticalAlign: 'baseline' }}>
                              <td>{upperFirst(weight)}</td>
                              <td style={{ textAlign: 'left' }}>
                                <Heading weight={weight}>
                                  The quick brown fox jumps over the lazy dog
                                </Heading>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Box>
                  </TabsContent>
                </TabsRoot>

                <Heading mb="5">Kbd</Heading>
                <TabsRoot defaultValue="specimen">
                  <TabsList size="2">
                    <TabsTrigger value="specimen">Specimen</TabsTrigger>
                    <TabsTrigger value="all-sizes">All sizes</TabsTrigger>
                  </TabsList>

                  <TabsContent value="specimen">
                    <Flex direction="column" gap="4" my="6">
                      <Text as="p" size="2">
                        Press <Kbd>⌘ C</Kbd> to show/hide the Theme Panel, or press <Kbd>⌘ D</Kbd>{' '}
                        to toggle dark mode.
                      </Text>
                      <Text as="p" size="3">
                        Press <Kbd>⌘ C</Kbd> to show/hide the Theme Panel, or press <Kbd>⌘ D</Kbd>{' '}
                        to toggle dark mode.
                      </Text>
                      <Text as="p" size="4">
                        Press <Kbd>⌘ C</Kbd> to show/hide the Theme Panel, or press <Kbd>⌘ D</Kbd>{' '}
                        to toggle dark mode.
                      </Text>
                      <Text as="p" size="5">
                        Press <Kbd>⌘ C</Kbd> to show/hide the Theme Panel, or press <Kbd>⌘ D</Kbd>{' '}
                        to toggle dark mode.
                      </Text>
                    </Flex>
                  </TabsContent>

                  <TabsContent value="all-sizes">
                    <Box my="6">
                      <Box my="6">
                        <Flex direction="column" gap="4" style={{ whiteSpace: 'nowrap' }}>
                          {kbdPropDefs.size.values.map((size) => (
                            <Flex align="center" key={size}>
                              <Box shrink="0" style={{ width: 80 }}>
                                <Text color="gray" size="1">
                                  Size {size}
                                </Text>
                              </Box>
                              <Kbd size={size}>⌥ J</Kbd>
                            </Flex>
                          ))}
                        </Flex>
                      </Box>
                    </Box>
                  </TabsContent>
                </TabsRoot>

                <Heading mb="5">Link</Heading>
                <TabsRoot defaultValue="specimen">
                  <TabsList size="2">
                    <TabsTrigger value="specimen">Specimen</TabsTrigger>
                    <TabsTrigger value="all-colors">All colors</TabsTrigger>
                    <TabsTrigger value="all-sizes">All sizes</TabsTrigger>
                    <TabsTrigger value="all-weights">All weights</TabsTrigger>
                  </TabsList>
                  <TabsContent value="specimen">
                    <Grid
                      my="6"
                      gap="6"
                      columns="calc(440px * var(--scaling)) calc(440px * var(--scaling))"
                    >
                      <Flex direction="column" gap="6">
                        <Text mb="-4" size="1" color="gray" align="center">
                          Accent
                        </Text>

                        <Text as="p" size="4">
                          Susan Kare is an American artist and{' '}
                          <Link href="#link">graphic designer</Link>, who contributed{' '}
                          <Link href="#link">interface</Link> elements and{' '}
                          <Link href="#link">typefaces</Link> for the first{' '}
                          <Link href="#link">Apple Macintosh</Link> personal computer from 1983 to
                          1986.
                        </Text>

                        <Text as="p" size="3">
                          Susan Kare is an American artist and{' '}
                          <Link href="#link">graphic designer</Link>, who contributed{' '}
                          <Link href="#link">interface</Link> elements and{' '}
                          <Link href="#link">typefaces</Link> for the first{' '}
                          <Link href="#link">Apple Macintosh</Link> personal computer from 1983 to
                          1986.
                        </Text>

                        <Text as="p" size="2">
                          Susan Kare is an American artist and{' '}
                          <Link href="#link">graphic designer</Link>, who contributed{' '}
                          <Link href="#link">interface</Link> elements and{' '}
                          <Link href="#link">typefaces</Link> for the first{' '}
                          <Link href="#link">Apple Macintosh</Link> personal computer from 1983 to
                          1986.
                        </Text>
                      </Flex>

                      <Flex direction="column" gap="6">
                        <Text mb="-4" size="1" color="gray" align="center">
                          Gray
                        </Text>

                        <Text as="p" size="4" color="gray">
                          Susan Kare is an American artist and{' '}
                          <Link href="#link">graphic designer</Link>, who contributed{' '}
                          <Link href="#link">interface</Link> elements and{' '}
                          <Link href="#link">typefaces</Link> for the first{' '}
                          <Link href="#link">Apple Macintosh</Link> personal computer from 1983 to
                          1986.
                        </Text>

                        <Text as="p" size="3" color="gray">
                          Susan Kare is an American artist and{' '}
                          <Link href="#link">graphic designer</Link>, who contributed{' '}
                          <Link href="#link">interface</Link> elements and{' '}
                          <Link href="#link">typefaces</Link> for the first{' '}
                          <Link href="#link">Apple Macintosh</Link> personal computer from 1983 to
                          1986.
                        </Text>

                        <Text as="p" size="2" color="gray">
                          Susan Kare is an American artist and{' '}
                          <Link href="#link">graphic designer</Link>, who contributed{' '}
                          <Link href="#link">interface</Link> elements and{' '}
                          <Link href="#link">typefaces</Link> for the first{' '}
                          <Link href="#link">Apple Macintosh</Link> personal computer from 1983 to
                          1986.
                        </Text>
                      </Flex>
                    </Grid>
                  </TabsContent>

                  <TabsContent value="all-colors">
                    <Box my="6">
                      <table className={styles.table} style={{ whiteSpace: 'nowrap' }}>
                        <tbody>
                          {themeAccentColorsOrdered.map((color) => (
                            <tr key={color}>
                              <td>{upperFirst(color)}</td>
                              <td style={{ textAlign: 'left' }}>
                                <Flex gap="6">
                                  <Link href="/" color={color}>
                                    Radix Themes
                                  </Link>
                                  <Link href="/" color={color} highContrast>
                                    Radix Themes
                                  </Link>
                                </Flex>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Box>
                  </TabsContent>

                  <TabsContent value="all-sizes">
                    <Box my="6">
                      <Flex direction="column" gap="4">
                        {linkPropDefs.size.values.map((size) => (
                          <Flex align="center" key={size}>
                            <Box shrink="0" style={{ width: 80 }}>
                              <Text color="gray" size="1">
                                Size {size}
                              </Text>
                            </Box>
                            <Link href="/" size={size}>
                              Radix Themes
                            </Link>
                          </Flex>
                        ))}
                      </Flex>
                    </Box>
                  </TabsContent>

                  <TabsContent value="all-weights">
                    <Box my="6">
                      <table className={styles.table} style={{ whiteSpace: 'nowrap' }}>
                        <tbody>
                          {blockquotePropDefs.weight.values.map((weight) => (
                            <tr key={weight}>
                              <td>{upperFirst(weight)}</td>
                              <td style={{ textAlign: 'left' }}>
                                <Link href="/" weight={weight}>
                                  Radix Themes
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Box>
                  </TabsContent>
                </TabsRoot>

                <Heading mb="5">Popover</Heading>
                <Flex align="center" gap="4" my="6">
                  <PopoverRoot>
                    <PopoverTrigger>
                      <Button size="1">
                        <ChatBubbleIcon width="14" height="14" />
                        Comment
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent size="1" style={{ width: 250 }}>
                      <Flex gap="3">
                        <Avatar
                          size="2"
                          src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
                          fallback="A"
                        />
                        <Box grow="1">
                          <TextArea
                            size="1"
                            placeholder="Write a comment…"
                            style={{ height: 80 }}
                          />

                          <Flex gap="3" mt="3" justify="between">
                            <Flex align="center" gap="2" asChild>
                              <label>
                                <Checkbox />
                                <Text size="1">Send to group</Text>
                              </label>
                            </Flex>

                            <PopoverClose>
                              <Button size="1">Comment</Button>
                            </PopoverClose>
                          </Flex>
                        </Box>
                      </Flex>
                    </PopoverContent>
                  </PopoverRoot>

                  <PopoverRoot>
                    <PopoverTrigger>
                      <Button size="2">
                        <ChatBubbleIcon width="16" height="16" />
                        Comment
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent size="2" style={{ width: 320 }}>
                      <Flex gap="4">
                        <Avatar
                          size="3"
                          src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
                          fallback="A"
                        />
                        <Box grow="1">
                          <TextArea placeholder="Write a comment…" style={{ height: 100 }} />
                          <Flex gap="3" mt="3" justify="between">
                            <Flex align="center" gap="2" asChild>
                              <label>
                                <Checkbox />
                                <Text size="2">Send to group</Text>
                              </label>
                            </Flex>

                            <PopoverClose>
                              <Button size="2">Comment</Button>
                            </PopoverClose>
                          </Flex>
                        </Box>
                      </Flex>
                    </PopoverContent>
                  </PopoverRoot>

                  <PopoverRoot>
                    <PopoverTrigger>
                      <Button size="3">
                        <ChatBubbleIcon width="16" height="16" />
                        Comment
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent size="3" style={{ width: 400 }}>
                      <Flex gap="4">
                        <Avatar
                          size="4"
                          src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
                          fallback="A"
                        />
                        <Box grow="1">
                          <TextArea
                            size="3"
                            placeholder="Write a comment…"
                            style={{ height: 120 }}
                          />
                          <Flex gap="3" mt="3" justify="between">
                            <Flex align="center" gap="2" asChild>
                              <label>
                                <Checkbox />
                                <Text size="2">Send to group</Text>
                              </label>
                            </Flex>

                            <PopoverClose>
                              <Button size="3">Comment</Button>
                            </PopoverClose>
                          </Flex>
                        </Box>
                      </Flex>
                    </PopoverContent>
                  </PopoverRoot>

                  <PopoverRoot>
                    <PopoverTrigger>
                      <Button size="4">
                        <ChatBubbleIcon width="18" height="18" />
                        Comment
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent size="4" style={{ width: 400 }}>
                      <Flex gap="4">
                        <Avatar
                          size="5"
                          src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
                          fallback="A"
                        />
                        <Box grow="1">
                          <TextArea
                            size="3"
                            placeholder="Write a comment…"
                            style={{ height: 120 }}
                          />
                          <Flex gap="3" mt="3" justify="between">
                            <Flex align="center" gap="2" asChild>
                              <label>
                                <Checkbox size="2" />
                                <Text size="3">Send to group</Text>
                              </label>
                            </Flex>

                            <PopoverClose>
                              <Button size="3">Comment</Button>
                            </PopoverClose>
                          </Flex>
                        </Box>
                      </Flex>
                    </PopoverContent>
                  </PopoverRoot>
                </Flex>

                <Heading mb="5">Quote</Heading>
                <Box mb="9" style={{ width: 'calc(580px * var(--scaling))' }}>
                  <Quote style={{ marginLeft: '-0.4em' }}>
                    A man who would letterspace lower case would steal sheep
                    <span style={{ marginRight: '-0.2em' }}>,</span>
                  </Quote>{' '}
                  Frederic Goudy liked to say. The reason for not letterspacing lower case is that
                  it hampers legibility. But there are some lowercase alphabets to which this
                  principle doesn’t apply. Moderate letterspacing can make a face such as lowercase
                  Univers bold condensed more legible rather than less
                </Box>

                <Heading mb="5">Scroll Area</Heading>
                <Flex align="start" direction="column" my="6">
                  <Card size="2">
                    <Inset>
                      <ScrollArea
                        type="always"
                        scrollbars="vertical"
                        style={{
                          width: 520,
                          height: 180,
                          '--scrollarea-scrollbar-margin-top': 'var(--space-3)',
                          '--scrollarea-scrollbar-margin-bottom': 'var(--space-3)',
                          '--scrollarea-scrollbar-margin-left': 'var(--space-3)',
                          '--scrollarea-scrollbar-margin-right': 'var(--space-3)',
                        }}
                      >
                        <Inset p="current" style={{ margin: 0 }}>
                          <Box pr="5">
                            <Flex direction="column" gap="4">
                              <Text as="p" size="2">
                                Three fundamental aspects of typography are legibility, readability,
                                and aesthetics. Although in a non-technical sense “legible” and
                                “readable” are often used synonymously, typographically they are
                                separate but related concepts.
                              </Text>

                              <Text as="p" size="2">
                                Legibility describes how easily individual characters can be
                                distinguished from one another. It is described by Walter Tracy as
                                “the quality of being decipherable and recognisable”. For instance,
                                if a “b” and an “h”, or a “3” and an “8”, are difficult to
                                distinguish at small sizes, this is a problem of legibility.
                              </Text>

                              <Text as="p" size="2">
                                Typographers are concerned with legibility insofar as it is their
                                job to select the correct font to use. Brush Script is an example of
                                a font containing many characters that might be difficult to
                                distinguish. The selection of cases influences the legibility of
                                typography because using only uppercase letters (all-caps) reduces
                                legibility.
                              </Text>
                            </Flex>
                          </Box>
                        </Inset>
                      </ScrollArea>
                    </Inset>
                  </Card>
                </Flex>

                <Heading mb="5">Separator</Heading>
                <Flex my="6" style={{ whiteSpace: 'nowrap' }}>
                  <Text size="2">
                    Tools for building high-quality, accessible UI.
                    <Separator my="3" size="4" />
                    <Flex gap="3" align="center">
                      Themes
                      <Separator orientation="vertical" />
                      Primitives
                      <Separator orientation="vertical" />
                      Icons
                      <Separator orientation="vertical" />
                      Colors
                    </Flex>
                  </Text>
                </Flex>

                <Heading mb="5">Text</Heading>
                <TabsRoot defaultValue="specimen">
                  <TabsList size="2">
                    <TabsTrigger value="specimen">Specimen</TabsTrigger>
                    <TabsTrigger value="all-colors">All colors</TabsTrigger>
                    <TabsTrigger value="all-sizes">All sizes</TabsTrigger>
                    <TabsTrigger value="all-weights">All weights</TabsTrigger>
                  </TabsList>

                  <TabsContent value="specimen">
                    <Box my="6" style={{ width: 'calc(760px * var(--scaling))' }}>
                      <Text as="p" size="5">
                        The goal of typography is to relate font size, line height, and line width
                        in a proportional way that maximizes beauty and makes reading easier and
                        more pleasant. The question is: What proportion(s) will give us the best
                        results? The golden ratio is often observed in nature where beauty and
                        utility intersect; perhaps we can use this “divine” proportion to enhance
                        these attributes in our typography.
                      </Text>
                    </Box>

                    <Box my="6" style={{ width: 'calc(700px * var(--scaling))' }}>
                      <Text as="p" size="4">
                        The goal of typography is to relate font size, line height, and line width
                        in a proportional way that maximizes beauty and makes reading easier and
                        more pleasant. The question is: What proportion(s) will give us the best
                        results? The golden ratio is often observed in nature where beauty and
                        utility intersect; perhaps we can use this “divine” proportion to enhance
                        these attributes in our typography.
                      </Text>
                    </Box>

                    <Box my="6" style={{ width: 'calc(640px * var(--scaling))' }}>
                      <Text as="p" size="3">
                        The goal of typography is to relate font size, line height, and line width
                        in a proportional way that maximizes beauty and makes reading easier and
                        more pleasant. The question is: What proportion(s) will give us the best
                        results? The golden ratio is often observed in nature where beauty and
                        utility intersect; perhaps we can use this “divine” proportion to enhance
                        these attributes in our typography.
                      </Text>
                    </Box>

                    <Box my="6" style={{ width: 'calc(572px * var(--scaling))' }}>
                      <Text as="p" size="2">
                        The goal of typography is to relate font size, line height, and line width
                        in a proportional way that maximizes beauty and makes reading easier and
                        more pleasant. The question is: What proportion(s) will give us the best
                        results? The golden ratio is often observed in nature where beauty and
                        utility intersect; perhaps we can use this “divine” proportion to enhance
                        these attributes in our typography.
                      </Text>
                    </Box>

                    <Grid
                      my="7"
                      gap="6"
                      columns="2"
                      align="center"
                      style={{ width: 'calc(540px * var(--scaling))' }}
                    >
                      <Box>
                        <Text size="3" as="div" weight="bold">
                          Quick Look
                        </Text>
                        <Text size="2" as="div">
                          Extensions from the installed software may add new features to this app.
                        </Text>
                      </Box>

                      <Box>
                        <Text size="2" as="div" weight="bold">
                          Quick Look
                        </Text>
                        <Text size="2" as="div">
                          Extensions from the installed software may add new features to this app.
                        </Text>
                      </Box>

                      <Box style={{ width: '90%' }}>
                        <Text size="2" as="div" weight="bold">
                          Quick Look
                        </Text>
                        <Text size="1" as="div">
                          Extensions from the installed software may add new features to this app.
                        </Text>
                      </Box>

                      <Box style={{ width: '90%' }}>
                        <Text size="1" as="div" weight="bold">
                          Quick Look
                        </Text>
                        <Text size="1" as="div">
                          Extensions from the installed software may add new features to this app.
                        </Text>
                      </Box>
                    </Grid>

                    <Grid
                      my="7"
                      gap="6"
                      columns="2"
                      align="center"
                      style={{ width: 'calc(540px * var(--scaling))' }}
                    >
                      <Box>
                        <Text size="3" as="div" weight="medium">
                          Quick Look
                        </Text>
                        <Text size="2" as="div" color="gray">
                          Extensions from the installed software may add new features to this app.
                        </Text>
                      </Box>

                      <Box>
                        <Text size="2" as="div" weight="medium">
                          Quick Look
                        </Text>
                        <Text size="2" as="div" color="gray">
                          Extensions from the installed software may add new features to this app.
                        </Text>
                      </Box>

                      <Box style={{ width: '90%' }}>
                        <Text size="2" as="div" weight="medium">
                          Quick Look
                        </Text>
                        <Text size="1" as="div" color="gray">
                          Extensions from the installed software may add new features to this app.
                        </Text>
                      </Box>

                      <Box style={{ width: '90%' }}>
                        <Text size="1" as="div" weight="medium">
                          Quick Look
                        </Text>
                        <Text size="1" as="div" color="gray">
                          Extensions from the installed software may add new features to this app.
                        </Text>
                      </Box>
                    </Grid>

                    <Grid
                      my="7"
                      gap="6"
                      columns="repeat(4, auto)"
                      align="center"
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      <Flex direction="column" align="center" gap="1">
                        <Button variant="surface" color="gray" highContrast size="1">
                          Quick Look
                        </Button>
                        <Text size="1" color="gray">
                          Opens in a new window
                        </Text>
                      </Flex>

                      <Flex direction="column" align="center" gap="1">
                        <Button variant="surface" color="gray" highContrast size="2">
                          Quick Look
                        </Button>
                        <Text size="1" color="gray">
                          Opens in a new window
                        </Text>
                      </Flex>

                      <Flex direction="column" align="center" gap="1">
                        <Button variant="surface" color="gray" highContrast size="2">
                          Quick Look
                        </Button>
                        <Text size="2" color="gray">
                          Opens in a new window
                        </Text>
                      </Flex>

                      <Flex direction="column" align="center" gap="1">
                        <Button variant="surface" color="gray" highContrast size="3">
                          Quick Look
                        </Button>
                        <Text size="2" color="gray">
                          Opens in a new window
                        </Text>
                      </Flex>
                    </Grid>
                  </TabsContent>

                  <TabsContent value="all-colors">
                    <Box my="6">
                      <table className={styles.table} style={{ whiteSpace: 'nowrap' }}>
                        <tbody>
                          {themeAccentColorsOrdered.map((color) => (
                            <tr key={color} style={{ verticalAlign: 'baseline' }}>
                              <td>{upperFirst(color)}</td>
                              <td>
                                <Text mr="4" color={color}>
                                  The quick brown fox jumps over the lazy dog
                                </Text>
                                <Text color={color} highContrast>
                                  The quick brown fox jumps over the lazy dog
                                </Text>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Box>
                  </TabsContent>

                  <TabsContent value="all-sizes">
                    <Box my="6">
                      <Flex direction="column" gap="4" style={{ whiteSpace: 'nowrap' }}>
                        {textPropDefs.size.values.map((size) => (
                          <Flex align="center" key={size}>
                            <Box shrink="0" style={{ width: 80 }}>
                              <Text color="gray" size="1">
                                Size {size}
                              </Text>
                            </Box>
                            <Text size={size}>The quick brown fox jumped over the lazy dog</Text>
                          </Flex>
                        ))}
                      </Flex>
                    </Box>
                  </TabsContent>

                  <TabsContent value="all-weights">
                    <Box my="6">
                      <table className={styles.table} style={{ whiteSpace: 'nowrap' }}>
                        <tbody>
                          {textPropDefs.weight.values.map((weight) => (
                            <tr key={weight} style={{ verticalAlign: 'baseline' }}>
                              <td>{upperFirst(weight)}</td>
                              <td style={{ textAlign: 'left' }}>
                                <Text weight={weight}>
                                  The quick brown fox jumps over the lazy dog
                                </Text>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Box>
                  </TabsContent>
                </TabsRoot>

                <Heading mb="5">Tooltip</Heading>
                <Flex my="6">
                  <Tooltip content="The quick brown fox">
                    <Flex
                      p="4"
                      tabIndex={0}
                      align="center"
                      style={{
                        outline: 0,
                        borderRadius: 'var(--radius-3)',
                        border: `1px dashed var(--accent-7)`,
                        cursor: 'default',
                        color: 'var(--accent-12)',
                        backgroundColor: 'var(--accent-a2)',
                      }}
                    >
                      <Text size="2" trim="both">
                        Hover here
                      </Text>
                    </Flex>
                  </Tooltip>
                </Flex>
              </Box>
            </div>
          </Theme>
        </NextThemeProvider>
      </body>
    </html>
  );
}

function AvatarIconFallback() {
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

function ExampleDropdownMenuContent() {
  return (
    <>
      <DropdownMenuItem shortcut="⌘ E">Edit</DropdownMenuItem>
      <DropdownMenuItem shortcut="⌘ D">Duplicate</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem shortcut="⌘ N">Archive</DropdownMenuItem>

      <DropdownMenuSub>
        <DropdownMenuSubTrigger>More</DropdownMenuSubTrigger>
        <DropdownMenuSubContent>
          <DropdownMenuItem>Move to project…</DropdownMenuItem>
          <DropdownMenuItem>Move to folder…</DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem>Advanced options…</DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuSub>

      <DropdownMenuSeparator />
      <DropdownMenuItem>Share</DropdownMenuItem>
      <DropdownMenuItem>Add to favorites</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem shortcut="⌘ ⌫" color="red">
        Delete
      </DropdownMenuItem>
    </>
  );
}

function RightClickArea(props: {
  size?: (typeof contextMenuContentPropDefs.size.values)[number];
  variant?: (typeof contextMenuContentPropDefs.variant.values)[number];
  color?: (typeof contextMenuContentPropDefs.color.values)[number];
  highContrast?: boolean;
}) {
  const {
    size = contextMenuContentPropDefs.size.default,
    variant = contextMenuContentPropDefs.variant.default,
    color = 'accent',
    highContrast = contextMenuContentPropDefs.highContrast.default,
  } = props;
  return (
    <Grid
      data-accent-color={color}
      height={size === '2' ? '8' : '6'}
      px="3"
      style={{
        placeItems: 'center',
        borderRadius: 'var(--radius-3)',
        border: `1px dashed var(--accent-7)`,
        cursor: 'default',
        backgroundColor: variant === 'soft' ? 'var(--accent-a2)' : undefined,
      }}
    >
      {/* @ts-ignore */}
      <Text size={size} color={color} highContrast={highContrast}>
        Right-click here
      </Text>
    </Grid>
  );
}

function ExampleContextMenuContent() {
  return (
    <>
      <ContextMenuItem shortcut="⌘ E">Edit</ContextMenuItem>
      <ContextMenuItem shortcut="⌘ D">Duplicate</ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem shortcut="⌘ N">Archive</ContextMenuItem>

      <ContextMenuSub>
        <ContextMenuSubTrigger>More</ContextMenuSubTrigger>
        <ContextMenuSubContent>
          <ContextMenuItem>Move to project…</ContextMenuItem>
          <ContextMenuItem>Move to folder…</ContextMenuItem>

          <ContextMenuSeparator />
          <ContextMenuItem>Advanced options…</ContextMenuItem>
        </ContextMenuSubContent>
      </ContextMenuSub>

      <ContextMenuSeparator />
      <ContextMenuItem>Share</ContextMenuItem>
      <ContextMenuItem>Add to favorites</ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem shortcut="⌘ ⌫" color="red">
        Delete
      </ContextMenuItem>
    </>
  );
}

function ExampleSelectContent() {
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

const aspectRatioImage = (
  <img
    src="https://images.unsplash.com/photo-1479030160180-b1860951d696?&auto=format&fit=crop&w=1200&q=80"
    alt="A photo of a blue sky opening up from within a red canyon."
    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
  />
);

function buttonSizeToIconSize(buttonSize: (typeof buttonPropDefs.size.values)[number]) {
  if (buttonSize === '1' || buttonSize === '2') return { width: 16, height: 16 };
  if (buttonSize === '3') return { width: 18, height: 18 };
  if (buttonSize === '4') return { width: 20, height: 20 };
}

function calloutSizeToIconSize(calloutSize: (typeof calloutRootPropDefs.size.values)[number]) {
  if (calloutSize === '1' || calloutSize === '2') return { width: 16, height: 16 };
  if (calloutSize === '3') return { width: 20, height: 20 };
}

const hoverCardInsetImage = (
  <Inset side="left" pr="current">
    <img
      src="https://images.unsplash.com/photo-1596299786007-9974099be52b?&auto=format&fit=crop&w=300&q=80"
      alt="Bold typography"
      style={{
        display: 'block',
        objectFit: 'cover',
        height: '100%',
        width: 150,
        backgroundColor: 'var(--gray-5)',
      }}
    />
  </Inset>
);

function selectTriggerVariantToSelectContentVariant(
  triggerVariant: (typeof selectTriggerPropDefs.variant.values)[number]
) {
  if (triggerVariant === 'soft' || triggerVariant === 'ghost') return 'soft';
  return 'solid';
}

function upperFirst(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const ChatBubbleIcon = (props: React.ComponentPropsWithoutRef<'svg'>) => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12.5 3L2.5 3.00002C1.67157 3.00002 1 3.6716 1 4.50002V9.50003C1 10.3285 1.67157 11 2.5 11H7.50003C7.63264 11 7.75982 11.0527 7.85358 11.1465L10 13.2929V11.5C10 11.2239 10.2239 11 10.5 11H12.5C13.3284 11 14 10.3285 14 9.50003V4.5C14 3.67157 13.3284 3 12.5 3ZM2.49999 2.00002L12.5 2C13.8807 2 15 3.11929 15 4.5V9.50003C15 10.8807 13.8807 12 12.5 12H11V14.5C11 14.7022 10.8782 14.8845 10.6913 14.9619C10.5045 15.0393 10.2894 14.9965 10.1464 14.8536L7.29292 12H2.5C1.11929 12 0 10.8807 0 9.50003V4.50002C0 3.11931 1.11928 2.00003 2.49999 2.00002Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    ></path>
  </svg>
);
