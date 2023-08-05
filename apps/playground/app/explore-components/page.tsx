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
import { NextThemeProvider } from '../next-theme-provider';
import { ArrowRightIcon, BookmarkIcon } from '@radix-ui/react-icons';

export default function ExploreComponents() {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <NextThemeProvider>
          <Theme asChild>
            <div id="root">
              <ThemePanel defaultOpen={false} />

              <Box m="9">
                <Heading mb="5">Button</Heading>
                <TabsRoot defaultValue="accent-color">
                  <TabsList size="2">
                    <TabsTrigger value="accent-color">Accent color</TabsTrigger>
                    <TabsTrigger value="all-colors">All colors</TabsTrigger>
                    <TabsTrigger value="radius">Radius</TabsTrigger>
                  </TabsList>
                  <TabsContent value="accent-color">
                    <Box my="6">
                      <TableRoot variant="surface" size="3" style={{ width: 'auto' }}>
                        <TableHeader>
                          <TableRow align="center">
                            <TableColumnHeaderCell />
                            {buttonPropDefs.size.values.map((size) => (
                              <TableColumnHeaderCell key={size} align="center">
                                Size {size}
                              </TableColumnHeaderCell>
                            ))}
                            <TableColumnHeaderCell align="center">
                              + High-contrast
                            </TableColumnHeaderCell>
                            <TableColumnHeaderCell align="center">Gray</TableColumnHeaderCell>
                            <TableColumnHeaderCell align="center">
                              + High-contrast
                            </TableColumnHeaderCell>
                            <TableColumnHeaderCell align="center">Disabled</TableColumnHeaderCell>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {buttonPropDefs.variant.values.map((variant) => (
                            <TableRow key={variant} align="center">
                              <TableRowHeaderCell width="160px">
                                {upperFirst(variant)}
                              </TableRowHeaderCell>

                              {buttonPropDefs.size.values.map((size) => (
                                <TableCell key={size} align="center">
                                  <Button variant={variant} size={size}>
                                    Next <ArrowRightIcon />
                                  </Button>
                                </TableCell>
                              ))}

                              <TableCell align="center">
                                <Button variant={variant} highContrast>
                                  Next <ArrowRightIcon />
                                </Button>
                              </TableCell>

                              <TableCell align="center">
                                <Button variant={variant} color="gray">
                                  Next <ArrowRightIcon />
                                </Button>
                              </TableCell>

                              <TableCell align="center">
                                <Button variant={variant} color="gray" highContrast>
                                  Next <ArrowRightIcon />
                                </Button>
                              </TableCell>

                              <TableCell align="center">
                                <Button disabled>
                                  Next <ArrowRightIcon />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}

                          {/* <TableRow align="center">
                            <TableRowHeaderCell width="160px">Accent color</TableRowHeaderCell>
                            {buttonPropDefs.variant.values.map((variant) => (
                              <TableCell key={variant} align="center">
                                <Flex direction="column" gap="4" align="center">
                                  {buttonPropDefs.size.values.map((size) => (
                                    <Button key={size} variant={variant} size={size}>
                                      <BookmarkIcon /> Bookmark
                                    </Button>
                                  ))}
                                </Flex>
                              </TableCell>
                            ))}
                          </TableRow>

                          <TableRow align="center">
                            <TableRowHeaderCell width="160px">+ High-contrast</TableRowHeaderCell>
                            {buttonPropDefs.variant.values.map((variant) => (
                              <TableCell key={variant} align="center">
                                <Button variant={variant} highContrast>
                                  <BookmarkIcon /> Bookmark
                                </Button>
                              </TableCell>
                            ))}
                          </TableRow>

                          <TableRow align="center">
                            <TableRowHeaderCell width="160px">Gray</TableRowHeaderCell>
                            {buttonPropDefs.variant.values.map((variant) => (
                              <TableCell key={variant} align="center">
                                <Button variant={variant} color="gray">
                                  <BookmarkIcon /> Bookmark
                                </Button>
                              </TableCell>
                            ))}
                          </TableRow>

                          <TableRow align="center">
                            <TableRowHeaderCell width="160px">+ High-contrast</TableRowHeaderCell>
                            {buttonPropDefs.variant.values.map((variant) => (
                              <TableCell key={variant} align="center">
                                <Button variant={variant} color="gray" highContrast>
                                  <BookmarkIcon /> Bookmark
                                </Button>
                              </TableCell>
                            ))}
                          </TableRow>

                          <TableRow align="center">
                            <TableRowHeaderCell width="160px">Disabled</TableRowHeaderCell>
                            {buttonPropDefs.variant.values.map((variant) => (
                              <TableCell key={variant} align="center">
                                <Button variant={variant} disabled>
                                  <BookmarkIcon /> Bookmark
                                </Button>
                              </TableCell>
                            ))}
                          </TableRow> */}
                        </TableBody>
                      </TableRoot>
                    </Box>
                  </TabsContent>

                  <TabsContent value="all-colors">
                    <Box my="6">
                      <TableRoot variant="surface" size="3" style={{ width: 'auto' }}>
                        <TableHeader>
                          <TableRow align="center">
                            <TableColumnHeaderCell />
                            {buttonPropDefs.variant.values.map((variant) => (
                              <TableColumnHeaderCell key={variant} align="center">
                                {upperFirst(variant)}
                              </TableColumnHeaderCell>
                            ))}
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {themeAccentColorsOrdered.map((color) => (
                            <TableRow key={color} align="center">
                              <TableRowHeaderCell width="160px">
                                {upperFirst(color)}
                              </TableRowHeaderCell>
                              {buttonPropDefs.variant.values.map((variant) => (
                                <TableCell key={variant} align="center">
                                  <Button variant={variant} color={color}>
                                    Next <ArrowRightIcon />
                                  </Button>
                                  <Button variant={variant} color={color} highContrast ml="4">
                                    Next <ArrowRightIcon />
                                  </Button>
                                </TableCell>
                              ))}
                            </TableRow>
                          ))}
                        </TableBody>
                      </TableRoot>
                    </Box>
                  </TabsContent>
                </TabsRoot>
              </Box>
            </div>
          </Theme>
        </NextThemeProvider>
      </body>
    </html>
  );
}

function upperFirst(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
