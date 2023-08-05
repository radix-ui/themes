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
import styles from './page.module.css';

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
                <TabsRoot defaultValue="examples">
                  <TabsList size="2">
                    <TabsTrigger value="examples">Examples</TabsTrigger>
                    <TabsTrigger value="variant-color">Variant & Color</TabsTrigger>
                    <TabsTrigger value="size-radius">Size & Radius</TabsTrigger>
                  </TabsList>
                  <TabsContent value="examples">
                    <Box my="6">
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th />
                            {buttonPropDefs.size.values.map((size) => (
                              <th key={size}>Size {size}</th>
                            ))}
                            <th>+ High-contrast</th>
                            <th>Gray</th>
                            <th>+ High-contrast</th>
                            <th>Disabled</th>
                          </tr>
                        </thead>
                        <tbody>
                          {buttonPropDefs.variant.values.map((variant) => (
                            <tr key={variant}>
                              <td>{upperFirst(variant)}</td>
                              {buttonPropDefs.size.values.map((size) => (
                                <td key={size}>
                                  <Button variant={variant} size={size}>
                                    Next <ArrowRightIcon />
                                  </Button>
                                </td>
                              ))}
                              <td>
                                <Button variant={variant} highContrast>
                                  Next <ArrowRightIcon />
                                </Button>
                              </td>
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
                              <td>
                                <Button disabled>
                                  Next <ArrowRightIcon />
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Box>
                  </TabsContent>

                  <TabsContent value="variant-color">
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
                                  <Button variant={variant} color={color}>
                                    Next <ArrowRightIcon />
                                  </Button>
                                  <Button variant={variant} color={color} highContrast ml="4">
                                    Next <ArrowRightIcon />
                                  </Button>
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Box>
                  </TabsContent>

                  <TabsContent value="size-radius">
                    <Box my="6">
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th />
                            {buttonPropDefs.size.values.map((size) => (
                              <th key={size}>Size {size}</th>
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
                              {buttonPropDefs.radius.values.map((radius) => (
                                <tr key={radius}>
                                  <td>{upperFirst(radius)}</td>
                                  {buttonPropDefs.size.values.map((size) => (
                                    <td key={size}>
                                      <Button size={size} variant={variant} radius={radius}>
                                        Next <ArrowRightIcon />
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
