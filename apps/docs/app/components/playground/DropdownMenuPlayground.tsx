'use client';

import React from 'react';
import {
  DropdownMenu,
  Button,
  Text,
  Flex,
  Box,
  Heading,
  Tabs,
  Table,
  Separator,
} from '@kushagradhawan/kookie-ui';
import {
  Settings,
  User,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Copy,
  Download,
  Share,
  Eye,
  EyeOff,
  Star,
  Archive,
  Clock,
  Users,
  Lock,
  Unlock,
  FileText,
  Image,
  Video,
  Folder,
  Link,
  MessageCircle,
  Bell,
  BellOff,
  Bookmark,
  BookmarkPlus,
  Palette,
  Move,
  RotateCcw,
  Zap,
  Code,
  Database,
  Calendar,
  Filter,
  SortAsc,
  MoreHorizontal,
  ExternalLink,
  GitBranch,
  History,
  Pin,
  PinOff,
  Flag,
  Tag,
  Layers,
  Grid,
  List,
  BarChart3,
  PieChart,
  TrendingUp,
} from 'lucide-react';

const accentColors = [
  'gray',
  'gold',
  'bronze',
  'brown',
  'yellow',
  'amber',
  'orange',
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
  'lime',
  'mint',
  'sky',
] as const;

const buttonVariants = ['classic', 'solid', 'soft', 'surface', 'outline', 'ghost'] as const;
const contentVariants = ['solid', 'soft'] as const;
const sizes = ['1', '2'] as const; // DropdownMenu only supports sizes 1 and 2

export default function DropdownMenuPlayground() {
  return (
    <Flex direction="column" gap="6">
      <Heading size="6" weight="bold">
        Dropdown Menu
      </Heading>
      <Text size="3" color="gray" mt="2">
        A menu that appears when clicking a trigger element, providing a list of actions or options.
      </Text>

      <Tabs.Root defaultValue="theme-colors">
        <Tabs.List size="2">
          <Tabs.Trigger value="theme-colors">Theme colors</Tabs.Trigger>
          <Tabs.Trigger value="all-colors">All colors</Tabs.Trigger>
          <Tabs.Trigger value="all-sizes">All sizes</Tabs.Trigger>
          <Tabs.Trigger value="content-variants">Content variants</Tabs.Trigger>
          <Tabs.Trigger value="complex-menus">Complex menus</Tabs.Trigger>
        </Tabs.List>

        {/* Theme Colors Tab */}
        <Tabs.Content value="theme-colors">
          <Box pt="4">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell style={{ width: '120px' }}>
                    <Text size="1" color="gray">
                      Color
                    </Text>
                  </Table.ColumnHeaderCell>
                  {buttonVariants.map((variant) => (
                    <Table.ColumnHeaderCell
                      key={variant}
                      style={{ width: '140px', textAlign: 'left' }}
                    >
                      <Text size="1" color="gray" style={{ textTransform: 'capitalize' }}>
                        {variant}
                      </Text>
                    </Table.ColumnHeaderCell>
                  ))}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Accent
                    </Text>
                  </Table.RowHeaderCell>
                  {buttonVariants.map((variant) => (
                    <Table.Cell key={variant} style={{ verticalAlign: 'middle' }}>
                      <DropdownMenu.Root>
                        <DropdownMenu.Trigger>
                          <Button variant={variant} size="2">
                            Action
                            <DropdownMenu.TriggerIcon />
                          </Button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content>
                          <DropdownMenu.Item>
                            <Edit size={16} />
                            Rename page
                          </DropdownMenu.Item>
                          <DropdownMenu.Item>
                            <Copy size={16} />
                            Duplicate
                          </DropdownMenu.Item>
                          <DropdownMenu.Item>
                            <Star size={16} />
                            Add to favorites
                          </DropdownMenu.Item>
                          <DropdownMenu.Item>
                            <Users size={16} />
                            Share & permissions
                          </DropdownMenu.Item>
                          <DropdownMenu.Separator />
                          <DropdownMenu.Item>
                            <Archive size={16} />
                            Move to archive
                          </DropdownMenu.Item>
                          <DropdownMenu.Item color="red">
                            <Trash2 size={16} />
                            Delete page
                          </DropdownMenu.Item>
                        </DropdownMenu.Content>
                      </DropdownMenu.Root>
                    </Table.Cell>
                  ))}
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Gray
                    </Text>
                  </Table.RowHeaderCell>
                  {buttonVariants.map((variant) => (
                    <Table.Cell key={variant} style={{ verticalAlign: 'middle' }}>
                      <DropdownMenu.Root>
                        <DropdownMenu.Trigger>
                          <Button variant={variant} color="gray" size="2">
                            Action
                            <DropdownMenu.TriggerIcon />
                          </Button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content color="gray">
                          <DropdownMenu.Item>
                            <Eye size={16} />
                            View project
                          </DropdownMenu.Item>
                          <DropdownMenu.Item>
                            <Edit size={16} />
                            Edit details
                          </DropdownMenu.Item>
                          <DropdownMenu.Item>
                            <Users size={16} />
                            Manage team
                          </DropdownMenu.Item>
                          <DropdownMenu.Item>
                            <Settings size={16} />
                            Project settings
                          </DropdownMenu.Item>
                          <DropdownMenu.Separator />
                          <DropdownMenu.Item color="red">
                            <Trash2 size={16} />
                            Delete project
                          </DropdownMenu.Item>
                        </DropdownMenu.Content>
                      </DropdownMenu.Root>
                    </Table.Cell>
                  ))}
                </Table.Row>
              </Table.Body>
            </Table.Root>
          </Box>
        </Tabs.Content>

        {/* All Colors Tab */}
        <Tabs.Content value="all-colors">
          <Box pt="4">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell style={{ width: '120px' }}>
                    <Text size="1" color="gray">
                      Color
                    </Text>
                  </Table.ColumnHeaderCell>
                  {buttonVariants.slice(0, 4).map((variant) => (
                    <Table.ColumnHeaderCell
                      key={variant}
                      style={{ width: '140px', textAlign: 'left' }}
                    >
                      <Text size="1" color="gray" style={{ textTransform: 'capitalize' }}>
                        {variant}
                      </Text>
                    </Table.ColumnHeaderCell>
                  ))}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {accentColors.slice(0, 12).map((color) => (
                  <React.Fragment key={color}>
                    <Table.Row>
                      <Table.RowHeaderCell>
                        <Text size="1" color="gray" style={{ textTransform: 'capitalize' }}>
                          {color}
                        </Text>
                      </Table.RowHeaderCell>
                      {buttonVariants.slice(0, 4).map((variant) => (
                        <Table.Cell key={variant} style={{ verticalAlign: 'middle' }}>
                          <DropdownMenu.Root>
                            <DropdownMenu.Trigger>
                              <Button variant={variant} color={color} size="2">
                                Action
                                <DropdownMenu.TriggerIcon />
                              </Button>
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Content color={color}>
                              <DropdownMenu.Item>
                                <Layers size={16} />
                                Bring to front
                              </DropdownMenu.Item>
                              <DropdownMenu.Item>
                                <Copy size={16} />
                                Duplicate layer
                              </DropdownMenu.Item>
                              <DropdownMenu.Item>
                                <Palette size={16} />
                                Change color
                              </DropdownMenu.Item>
                              <DropdownMenu.Separator />
                              <DropdownMenu.Item>
                                <Lock size={16} />
                                Lock layer
                              </DropdownMenu.Item>
                              <DropdownMenu.Item color="red">
                                <Trash2 size={16} />
                                Delete layer
                              </DropdownMenu.Item>
                            </DropdownMenu.Content>
                          </DropdownMenu.Root>
                        </Table.Cell>
                      ))}
                    </Table.Row>
                  </React.Fragment>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </Tabs.Content>

        {/* All Sizes Tab */}
        <Tabs.Content value="all-sizes">
          <Box pt="4">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell style={{ width: '120px' }}>
                    <Text size="1" color="gray">
                      Size
                    </Text>
                  </Table.ColumnHeaderCell>
                  {buttonVariants.map((variant) => (
                    <Table.ColumnHeaderCell
                      key={variant}
                      style={{ width: '140px', textAlign: 'left' }}
                    >
                      <Text size="1" color="gray" style={{ textTransform: 'capitalize' }}>
                        {variant}
                      </Text>
                    </Table.ColumnHeaderCell>
                  ))}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {sizes.map((size) => (
                  <Table.Row key={size}>
                    <Table.RowHeaderCell>
                      <Text size="1" color="gray">
                        Size {size}
                      </Text>
                    </Table.RowHeaderCell>
                    {buttonVariants.map((variant) => (
                      <Table.Cell key={variant} style={{ verticalAlign: 'middle' }}>
                        <DropdownMenu.Root>
                          <DropdownMenu.Trigger>
                            <Button variant={variant} size={size}>
                              Action
                              <DropdownMenu.TriggerIcon />
                            </Button>
                          </DropdownMenu.Trigger>
                          <DropdownMenu.Content size={size}>
                            <DropdownMenu.Item>
                              <Plus size={16} />
                              Create new page
                            </DropdownMenu.Item>
                            <DropdownMenu.Item>
                              <Folder size={16} />
                              New folder
                            </DropdownMenu.Item>
                            <DropdownMenu.Item>
                              <Database size={16} />
                              New database
                            </DropdownMenu.Item>
                            <DropdownMenu.Separator />
                            <DropdownMenu.Item>
                              <Users size={16} />
                              Invite teammates
                            </DropdownMenu.Item>
                            <DropdownMenu.Item>
                              <Settings size={16} />
                              Workspace settings
                            </DropdownMenu.Item>
                          </DropdownMenu.Content>
                        </DropdownMenu.Root>
                      </Table.Cell>
                    ))}
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </Tabs.Content>

        {/* Content Variants Tab */}
        <Tabs.Content value="content-variants">
          <Box pt="4">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell style={{ width: '120px' }}>
                    <Text size="1" color="gray">
                      Variant
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '140px', textAlign: 'left' }}>
                    <Text size="1" color="gray">
                      Accent
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '140px', textAlign: 'left' }}>
                    <Text size="1" color="gray">
                      Gray
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '140px', textAlign: 'left' }}>
                    <Text size="1" color="gray">
                      High Contrast
                    </Text>
                  </Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {contentVariants.map((variant) => (
                  <Table.Row key={variant}>
                    <Table.RowHeaderCell>
                      <Text size="1" color="gray" style={{ textTransform: 'capitalize' }}>
                        {variant}
                      </Text>
                    </Table.RowHeaderCell>
                    <Table.Cell style={{ verticalAlign: 'middle' }}>
                      <DropdownMenu.Root>
                        <DropdownMenu.Trigger>
                          <Button variant="surface" size="2">
                            Action
                            <DropdownMenu.TriggerIcon />
                          </Button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content variant={variant}>
                          <DropdownMenu.Item>
                            <FileText size={16} />
                            Open in editor
                          </DropdownMenu.Item>
                          <DropdownMenu.Item>
                            <Download size={16} />
                            Download file
                          </DropdownMenu.Item>
                          <DropdownMenu.Item>
                            <Share size={16} />
                            Share link
                          </DropdownMenu.Item>
                          <DropdownMenu.Separator />
                          <DropdownMenu.Item>
                            <History size={16} />
                            Version history
                          </DropdownMenu.Item>
                          <DropdownMenu.Item color="red">
                            <Trash2 size={16} />
                            Move to trash
                          </DropdownMenu.Item>
                        </DropdownMenu.Content>
                      </DropdownMenu.Root>
                    </Table.Cell>
                    <Table.Cell style={{ verticalAlign: 'middle' }}>
                      <DropdownMenu.Root>
                        <DropdownMenu.Trigger>
                          <Button variant="surface" color="gray" size="2">
                            Action
                            <DropdownMenu.TriggerIcon />
                          </Button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content variant={variant} color="gray">
                          <DropdownMenu.Item>
                            <Grid size={16} />
                            Grid view
                          </DropdownMenu.Item>
                          <DropdownMenu.Item>
                            <List size={16} />
                            List view
                          </DropdownMenu.Item>
                          <DropdownMenu.Item>
                            <Calendar size={16} />
                            Calendar view
                          </DropdownMenu.Item>
                          <DropdownMenu.Separator />
                          <DropdownMenu.Item>
                            <Filter size={16} />
                            Add filter
                          </DropdownMenu.Item>
                          <DropdownMenu.Item>
                            <SortAsc size={16} />
                            Sort options
                          </DropdownMenu.Item>
                        </DropdownMenu.Content>
                      </DropdownMenu.Root>
                    </Table.Cell>
                    <Table.Cell style={{ verticalAlign: 'middle' }}>
                      <DropdownMenu.Root>
                        <DropdownMenu.Trigger>
                          <Button variant="surface" size="2" highContrast>
                            Action
                            <DropdownMenu.TriggerIcon />
                          </Button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content variant={variant} highContrast>
                          <DropdownMenu.Item>
                            <BarChart3 size={16} />
                            Bar chart
                          </DropdownMenu.Item>
                          <DropdownMenu.Item>
                            <PieChart size={16} />
                            Pie chart
                          </DropdownMenu.Item>
                          <DropdownMenu.Item>
                            <TrendingUp size={16} />
                            Trend analysis
                          </DropdownMenu.Item>
                          <DropdownMenu.Separator />
                          <DropdownMenu.Item>
                            <Download size={16} />
                            Export data
                          </DropdownMenu.Item>
                        </DropdownMenu.Content>
                      </DropdownMenu.Root>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </Tabs.Content>

        {/* Complex Menus Tab */}
        <Tabs.Content value="complex-menus">
          <Box pt="4">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell style={{ width: '200px' }}>
                    <Text size="1" color="gray">
                      Menu Type
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '200px' }}>
                    <Text size="1" color="gray">
                      Trigger
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '300px' }}>
                    <Text size="1" color="gray">
                      Description
                    </Text>
                  </Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Page Actions
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <DropdownMenu.Root>
                      <DropdownMenu.Trigger>
                        <Button variant="surface" size="2">
                          <MoreHorizontal size={16} />
                          Options
                        </Button>
                      </DropdownMenu.Trigger>
                      <DropdownMenu.Content>
                        <DropdownMenu.Item>
                          <Edit size={16} />
                          Rename
                        </DropdownMenu.Item>
                        <DropdownMenu.Item>
                          <Copy size={16} />
                          Duplicate
                        </DropdownMenu.Item>
                        <DropdownMenu.Item>
                          <Star size={16} />
                          Add to favorites
                        </DropdownMenu.Item>
                        <DropdownMenu.Separator />
                        <DropdownMenu.Item>
                          <Users size={16} />
                          Share
                        </DropdownMenu.Item>
                        <DropdownMenu.Item color="red">
                          <Trash2 size={16} />
                          Delete
                        </DropdownMenu.Item>
                      </DropdownMenu.Content>
                    </DropdownMenu.Root>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="2">Basic page management with common actions</Text>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Layer Actions
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <DropdownMenu.Root>
                      <DropdownMenu.Trigger>
                        <Button variant="surface" size="2">
                          <Layers size={16} />
                          Actions
                        </Button>
                      </DropdownMenu.Trigger>
                      <DropdownMenu.Content>
                        <DropdownMenu.Label>Edit</DropdownMenu.Label>
                        <DropdownMenu.Item>
                          <Copy size={16} />
                          Copy
                        </DropdownMenu.Item>
                        <DropdownMenu.Item>
                          <Move size={16} />
                          Move
                        </DropdownMenu.Item>
                        <DropdownMenu.Separator />
                        <DropdownMenu.CheckboxItem checked>
                          <Eye size={16} />
                          Visible
                        </DropdownMenu.CheckboxItem>
                        <DropdownMenu.CheckboxItem>
                          <Lock size={16} />
                          Locked
                        </DropdownMenu.CheckboxItem>
                        <DropdownMenu.Separator />
                        <DropdownMenu.Item color="red">
                          <Trash2 size={16} />
                          Delete
                        </DropdownMenu.Item>
                      </DropdownMenu.Content>
                    </DropdownMenu.Root>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="2">Layer management with checkboxes and labels</Text>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Workspace Settings
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <DropdownMenu.Root>
                      <DropdownMenu.Trigger>
                        <Button variant="surface" size="2">
                          <Settings size={16} />
                          Workspace
                        </Button>
                      </DropdownMenu.Trigger>
                      <DropdownMenu.Content>
                        <DropdownMenu.Label>Create</DropdownMenu.Label>
                        <DropdownMenu.Item>
                          <FileText size={16} />
                          New page
                        </DropdownMenu.Item>
                        <DropdownMenu.Item>
                          <Plus size={16} />
                          New template
                        </DropdownMenu.Item>
                        <DropdownMenu.Separator />
                        <DropdownMenu.Label>View</DropdownMenu.Label>
                        <DropdownMenu.RadioGroup value="comfortable">
                          <DropdownMenu.RadioItem value="compact">Compact</DropdownMenu.RadioItem>
                          <DropdownMenu.RadioItem value="comfortable">
                            Comfortable
                          </DropdownMenu.RadioItem>
                        </DropdownMenu.RadioGroup>
                      </DropdownMenu.Content>
                    </DropdownMenu.Root>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="2">Workspace menu with radio groups and submenus</Text>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Content Creation
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <DropdownMenu.Root>
                      <DropdownMenu.Trigger>
                        <Button variant="surface" size="2">
                          <Plus size={16} />
                          Content
                        </Button>
                      </DropdownMenu.Trigger>
                      <DropdownMenu.Content>
                        <DropdownMenu.Label>Basic</DropdownMenu.Label>
                        <DropdownMenu.Item>
                          <FileText size={16} />
                          Text
                        </DropdownMenu.Item>
                        <DropdownMenu.Item>
                          <Image size={16} />
                          Image
                        </DropdownMenu.Item>
                        <DropdownMenu.Item>
                          <Video size={16} />
                          Video
                        </DropdownMenu.Item>
                        <DropdownMenu.Separator />
                        <DropdownMenu.Label>Advanced</DropdownMenu.Label>
                        <DropdownMenu.Item>
                          <Database size={16} />
                          Table
                        </DropdownMenu.Item>
                        <DropdownMenu.Item>
                          <Calendar size={16} />
                          Calendar
                        </DropdownMenu.Item>
                      </DropdownMenu.Content>
                    </DropdownMenu.Root>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="2">Content creation menu with organized sections</Text>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table.Root>
          </Box>
        </Tabs.Content>
      </Tabs.Root>
    </Flex>
  );
}
