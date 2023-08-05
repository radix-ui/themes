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
  useThemeContext,
} from '@radix-ui/themes';
import { NextThemeProvider } from '../next-theme-provider';
import {
  ArrowRightIcon,
  BookmarkIcon,
  CaretDownIcon,
  DotsHorizontalIcon,
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
              <Box m={{ initial: '3', md: '6', xl: '9' }}>…</Box>
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

const avatarUrl =
  'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=160&h=160&dpr=2&q=80';

function buttonSizeToIconSize(buttonSize: (typeof buttonPropDefs.size.values)[number]) {
  if (buttonSize === '1' || buttonSize === '2') return { width: 16, height: 16 };
  if (buttonSize === '3') return { width: 18, height: 18 };
  if (buttonSize === '4') return { width: 20, height: 20 };
}

function calloutSizeToIconSize(calloutSize: (typeof calloutRootPropDefs.size.values)[number]) {
  if (calloutSize === '1' || calloutSize === '2') return { width: 16, height: 16 };
  if (calloutSize === '3') return { width: 20, height: 20 };
}

function selectTriggerVariantToSelectContentVariant(
  triggerVariant: (typeof selectTriggerPropDefs.variant.values)[number]
) {
  if (triggerVariant === 'soft' || triggerVariant === 'ghost') return 'soft';
  return 'solid';
}

function upperFirst(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
