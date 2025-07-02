'use client';

import React from 'react';
import {
  ContextMenu,
  Card,
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
  Star,
  Archive,
  Users,
  Lock,
  FileText,
  Image,
  Video,
  Folder,
  Link,
  MessageCircle,
  Bell,
  Palette,
  Move,
  Code,
  Database,
  Calendar,
  MoreHorizontal,
  ExternalLink,
  History,
  Pin,
  Layers,
  Grid,
  List,
  BarChart3,
  Check,
  Circle,
  Dot,
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

const contentVariants = ['solid', 'soft'] as const;
const sizes = ['1', '2'] as const;

export default function ContextMenuPlayground() {
  const [checkedItems, setCheckedItems] = React.useState<Record<string, boolean>>({
    notifications: true,
    autoSave: false,
    spellCheck: true,
  });

  const [selectedView, setSelectedView] = React.useState('list');
  const [selectedTheme, setSelectedTheme] = React.useState('light');

  const toggleCheckedItem = (key: string) => {
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <Flex direction="column" gap="6">
      <Heading size="6" weight="bold">
        ContextMenu
      </Heading>

      <Tabs.Root defaultValue="basic-usage">
        <Tabs.List size="2">
          <Tabs.Trigger value="basic-usage">Basic usage</Tabs.Trigger>
          <Tabs.Trigger value="content-variants">Content variants</Tabs.Trigger>
          <Tabs.Trigger value="all-sizes">All sizes</Tabs.Trigger>
          <Tabs.Trigger value="all-colors">All colors</Tabs.Trigger>
          <Tabs.Trigger value="complex-menus">Complex menus</Tabs.Trigger>
        </Tabs.List>

        {/* Basic Usage Tab */}
        <Tabs.Content value="basic-usage">
          <Box pt="4">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell style={{ width: '200px' }}>
                    <Text size="1" color="gray">
                      Right-click trigger
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '300px' }}>
                    <Text size="1" color="gray">
                      Context menu content
                    </Text>
                  </Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Card trigger
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <ContextMenu.Root>
                      <ContextMenu.Trigger>
                        <Box
                          p="4"
                          style={{
                            backgroundColor: 'var(--gray-a2)',
                            borderRadius: 'var(--radius-3)',
                            cursor: 'context-menu',
                            border: '1px dashed var(--gray-a6)',
                            textAlign: 'center',
                            width: '120px',
                            height: '80px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Text size="2">Right-click here</Text>
                        </Box>
                      </ContextMenu.Trigger>
                      <ContextMenu.Content>
                        <ContextMenu.Item>
                          <Edit size={16} />
                          Rename
                        </ContextMenu.Item>
                        <ContextMenu.Item>
                          <Copy size={16} />
                          Duplicate
                        </ContextMenu.Item>
                        <ContextMenu.Item>
                          <Star size={16} />
                          Add to favorites
                        </ContextMenu.Item>
                        <ContextMenu.Item>
                          <Share size={16} />
                          Share
                        </ContextMenu.Item>
                        <ContextMenu.Separator />
                        <ContextMenu.Item>
                          <Archive size={16} />
                          Move to archive
                        </ContextMenu.Item>
                        <ContextMenu.Item color="red">
                          <Trash2 size={16} />
                          Delete
                        </ContextMenu.Item>
                      </ContextMenu.Content>
                    </ContextMenu.Root>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Text trigger
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <ContextMenu.Root>
                      <ContextMenu.Trigger>
                        <Box
                          p="4"
                          style={{
                            backgroundColor: 'var(--gray-a2)',
                            borderRadius: 'var(--radius-3)',
                            cursor: 'context-menu',
                            border: '1px dashed var(--gray-a6)',
                            textAlign: 'center',
                            width: '120px',
                            height: '80px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Text size="2">Right-click here</Text>
                        </Box>
                      </ContextMenu.Trigger>
                      <ContextMenu.Content>
                        <ContextMenu.Item>
                          <Copy size={16} />
                          Copy text
                        </ContextMenu.Item>
                        <ContextMenu.Item>
                          <Edit size={16} />
                          Edit
                        </ContextMenu.Item>
                        <ContextMenu.Separator />
                        <ContextMenu.Item>
                          <Palette size={16} />
                          Format
                        </ContextMenu.Item>
                        <ContextMenu.Sub>
                          <ContextMenu.SubTrigger>
                            <Link size={16} />
                            Insert link
                          </ContextMenu.SubTrigger>
                          <ContextMenu.SubContent>
                            <ContextMenu.Item>
                              <ExternalLink size={16} />
                              External link
                            </ContextMenu.Item>
                            <ContextMenu.Item>
                              <FileText size={16} />
                              Internal page
                            </ContextMenu.Item>
                            <ContextMenu.Item>
                              <User size={16} />
                              Mention person
                            </ContextMenu.Item>
                          </ContextMenu.SubContent>
                        </ContextMenu.Sub>
                        <ContextMenu.Item>
                          <MessageCircle size={16} />
                          Add comment
                        </ContextMenu.Item>
                      </ContextMenu.Content>
                    </ContextMenu.Root>
                  </Table.Cell>
                </Table.Row>
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
                  <Table.ColumnHeaderCell style={{ width: '200px' }}>
                    <Text size="1" color="gray">
                      Trigger
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '300px' }}>
                    <Text size="1" color="gray">
                      Context menu
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
                    <Table.Cell>
                      <ContextMenu.Root>
                        <ContextMenu.Trigger>
                          <Box
                            p="4"
                            style={{
                              backgroundColor: 'var(--gray-a2)',
                              borderRadius: 'var(--radius-3)',
                              cursor: 'context-menu',
                              border: '1px dashed var(--gray-a6)',
                              textAlign: 'center',
                              width: '120px',
                              height: '80px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <Text size="2" style={{ textTransform: 'capitalize' }}>
                              Right-click here
                            </Text>
                          </Box>
                        </ContextMenu.Trigger>
                        <ContextMenu.Content variant={variant}>
                          <ContextMenu.Item>
                            <Settings size={16} />
                            Settings
                          </ContextMenu.Item>
                          <ContextMenu.Item>
                            <User size={16} />
                            Profile
                          </ContextMenu.Item>
                          <ContextMenu.Item>
                            <Bell size={16} />
                            Notifications
                          </ContextMenu.Item>
                          <ContextMenu.Separator />
                          <ContextMenu.Item>
                            <LogOut size={16} />
                            Sign out
                          </ContextMenu.Item>
                        </ContextMenu.Content>
                      </ContextMenu.Root>
                    </Table.Cell>
                    <Table.Cell>
                      <Text size="1" color="gray">
                        Right-click the {variant} trigger to see the menu
                      </Text>
                    </Table.Cell>
                  </Table.Row>
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
                  {contentVariants.map((variant) => (
                    <Table.ColumnHeaderCell
                      key={variant}
                      style={{ width: '200px', textAlign: 'left' }}
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
                    {contentVariants.map((variant) => (
                      <Table.Cell key={variant}>
                        <ContextMenu.Root>
                          <ContextMenu.Trigger>
                            <Box
                              p="4"
                              style={{
                                backgroundColor: 'var(--gray-a2)',
                                borderRadius: 'var(--radius-3)',
                                cursor: 'context-menu',
                                border: '1px dashed var(--gray-a6)',
                                textAlign: 'center',
                                width: '120px',
                                height: '80px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <Text size="2">Right-click here</Text>
                            </Box>
                          </ContextMenu.Trigger>
                          <ContextMenu.Content variant={variant} size={size}>
                            <ContextMenu.Item>
                              <Edit size={16} />
                              Edit item
                            </ContextMenu.Item>
                            <ContextMenu.Item>
                              <Copy size={16} />
                              Copy item
                            </ContextMenu.Item>
                            <ContextMenu.Item>
                              <Download size={16} />
                              Download
                            </ContextMenu.Item>
                            <ContextMenu.Separator />
                            <ContextMenu.Item color="red">
                              <Trash2 size={16} />
                              Delete
                            </ContextMenu.Item>
                          </ContextMenu.Content>
                        </ContextMenu.Root>
                      </Table.Cell>
                    ))}
                  </Table.Row>
                ))}
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
                  {contentVariants.map((variant) => (
                    <Table.ColumnHeaderCell
                      key={variant}
                      style={{ width: '200px', textAlign: 'left' }}
                    >
                      <Text size="1" color="gray" style={{ textTransform: 'capitalize' }}>
                        {variant}
                      </Text>
                    </Table.ColumnHeaderCell>
                  ))}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {accentColors.slice(0, 10).map((color) => (
                  <React.Fragment key={color}>
                    <Table.Row>
                      <Table.RowHeaderCell>
                        <Text size="1" color="gray" style={{ textTransform: 'capitalize' }}>
                          {color}
                        </Text>
                      </Table.RowHeaderCell>
                      {contentVariants.map((variant) => (
                        <Table.Cell key={variant}>
                          <ContextMenu.Root>
                            <ContextMenu.Trigger>
                              <Box
                                p="4"
                                style={{
                                  backgroundColor: 'var(--gray-a2)',
                                  borderRadius: 'var(--radius-3)',
                                  cursor: 'context-menu',
                                  border: '1px dashed var(--gray-a6)',
                                  textAlign: 'center',
                                  width: '120px',
                                  height: '80px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                <Text size="2">Right-click here</Text>
                              </Box>
                            </ContextMenu.Trigger>
                            <ContextMenu.Content variant={variant} color={color}>
                              <ContextMenu.Item color={color}>
                                <Star size={16} />
                                Accent item
                              </ContextMenu.Item>
                              <ContextMenu.Item>
                                <Edit size={16} />
                                Normal item
                              </ContextMenu.Item>
                              <ContextMenu.Item>
                                <Copy size={16} />
                                Another item
                              </ContextMenu.Item>
                              <ContextMenu.Separator />
                              <ContextMenu.Item color="red">
                                <Trash2 size={16} />
                                Delete
                              </ContextMenu.Item>
                            </ContextMenu.Content>
                          </ContextMenu.Root>
                        </Table.Cell>
                      ))}
                    </Table.Row>
                    <Table.Row>
                      <Table.RowHeaderCell>
                        <Text
                          size="1"
                          color="gray"
                          style={{ textTransform: 'capitalize', opacity: 0.7 }}
                        >
                          {color} HC
                        </Text>
                      </Table.RowHeaderCell>
                      {contentVariants.map((variant) => (
                        <Table.Cell key={variant}>
                          <ContextMenu.Root>
                            <ContextMenu.Trigger>
                              <Box
                                p="4"
                                style={{
                                  backgroundColor: 'var(--gray-a2)',
                                  borderRadius: 'var(--radius-3)',
                                  cursor: 'context-menu',
                                  border: '1px dashed var(--gray-a6)',
                                  textAlign: 'center',
                                  width: '120px',
                                  height: '80px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                <Text size="2">Right-click here</Text>
                              </Box>
                            </ContextMenu.Trigger>
                            <ContextMenu.Content variant={variant} color={color} highContrast>
                              <ContextMenu.Item color={color}>
                                <Star size={16} />
                                Accent item
                              </ContextMenu.Item>
                              <ContextMenu.Item>
                                <Edit size={16} />
                                Normal item
                              </ContextMenu.Item>
                              <ContextMenu.Item>
                                <Copy size={16} />
                                Another item
                              </ContextMenu.Item>
                              <ContextMenu.Separator />
                              <ContextMenu.Item color="red">
                                <Trash2 size={16} />
                                Delete
                              </ContextMenu.Item>
                            </ContextMenu.Content>
                          </ContextMenu.Root>
                        </Table.Cell>
                      ))}
                    </Table.Row>
                  </React.Fragment>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </Tabs.Content>

        {/* Complex Menus Tab */}
        <Tabs.Content value="complex-menus">
          <Box pt="4">
            <Flex direction="column" gap="6">
              {/* File Explorer Context Menu */}
              <Box>
                <Heading size="4" mb="3">
                  File Explorer Context Menu
                </Heading>
                <Flex gap="4" wrap="wrap">
                  <ContextMenu.Root>
                    <ContextMenu.Trigger>
                      <Box
                        p="4"
                        style={{
                          backgroundColor: 'var(--gray-a2)',
                          borderRadius: 'var(--radius-3)',
                          cursor: 'context-menu',
                          border: '1px dashed var(--gray-a6)',
                          textAlign: 'center',
                          width: '120px',
                          height: '80px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Text size="2">Right-click here</Text>
                      </Box>
                    </ContextMenu.Trigger>
                    <ContextMenu.Content>
                      <ContextMenu.Item>
                        <Plus size={16} />
                        New file
                      </ContextMenu.Item>
                      <ContextMenu.Item>
                        <Folder size={16} />
                        New folder
                      </ContextMenu.Item>
                      <ContextMenu.Separator />
                      <ContextMenu.Item>
                        <Edit size={16} />
                        Rename
                      </ContextMenu.Item>
                      <ContextMenu.Item>
                        <Copy size={16} />
                        Copy
                      </ContextMenu.Item>
                      <ContextMenu.Item>
                        <Move size={16} />
                        Cut
                      </ContextMenu.Item>
                      <ContextMenu.Separator />
                      <ContextMenu.Sub>
                        <ContextMenu.SubTrigger>
                          <Share size={16} />
                          Share
                        </ContextMenu.SubTrigger>
                        <ContextMenu.SubContent>
                          <ContextMenu.Item>
                            <Link size={16} />
                            Copy link
                          </ContextMenu.Item>
                          <ContextMenu.Item>
                            <Users size={16} />
                            Share with people
                          </ContextMenu.Item>
                          <ContextMenu.Item>
                            <ExternalLink size={16} />
                            Share publicly
                          </ContextMenu.Item>
                        </ContextMenu.SubContent>
                      </ContextMenu.Sub>
                      <ContextMenu.Sub>
                        <ContextMenu.SubTrigger>
                          <MoreHorizontal size={16} />
                          More actions
                        </ContextMenu.SubTrigger>
                        <ContextMenu.SubContent>
                          <ContextMenu.Item>
                            <Archive size={16} />
                            Archive
                          </ContextMenu.Item>
                          <ContextMenu.Item>
                            <Download size={16} />
                            Download
                          </ContextMenu.Item>
                          <ContextMenu.Item>
                            <History size={16} />
                            View history
                          </ContextMenu.Item>
                          <ContextMenu.Separator />
                          <ContextMenu.Item>
                            <Lock size={16} />
                            Make private
                          </ContextMenu.Item>
                          <ContextMenu.Item>
                            <Pin size={16} />
                            Pin to sidebar
                          </ContextMenu.Item>
                        </ContextMenu.SubContent>
                      </ContextMenu.Sub>
                      <ContextMenu.Separator />
                      <ContextMenu.Item>
                        <Settings size={16} />
                        Properties
                      </ContextMenu.Item>
                      <ContextMenu.Item color="red">
                        <Trash2 size={16} />
                        Delete
                      </ContextMenu.Item>
                    </ContextMenu.Content>
                  </ContextMenu.Root>
                </Flex>
              </Box>

              {/* Settings Context Menu with Checkboxes and Radio Groups */}
              <Box>
                <Heading size="4" mb="3">
                  Settings Context Menu
                </Heading>
                <Flex gap="4" wrap="wrap">
                  <ContextMenu.Root>
                    <ContextMenu.Trigger>
                      <Box
                        p="4"
                        style={{
                          backgroundColor: 'var(--gray-a2)',
                          borderRadius: 'var(--radius-3)',
                          cursor: 'context-menu',
                          border: '1px dashed var(--gray-a6)',
                          textAlign: 'center',
                          width: '120px',
                          height: '80px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Text size="2">Right-click here</Text>
                      </Box>
                    </ContextMenu.Trigger>
                    <ContextMenu.Content>
                      <ContextMenu.Label>General Settings</ContextMenu.Label>
                      <ContextMenu.CheckboxItem
                        checked={checkedItems.notifications}
                        onCheckedChange={() => toggleCheckedItem('notifications')}
                      >
                        <Bell size={16} />
                        Enable notifications
                      </ContextMenu.CheckboxItem>
                      <ContextMenu.CheckboxItem
                        checked={checkedItems.autoSave}
                        onCheckedChange={() => toggleCheckedItem('autoSave')}
                      >
                        <Archive size={16} />
                        Auto-save documents
                      </ContextMenu.CheckboxItem>
                      <ContextMenu.CheckboxItem
                        checked={checkedItems.spellCheck}
                        onCheckedChange={() => toggleCheckedItem('spellCheck')}
                      >
                        <Check size={16} />
                        Enable spell check
                      </ContextMenu.CheckboxItem>

                      <ContextMenu.Separator />

                      <ContextMenu.Label>View Options</ContextMenu.Label>
                      <ContextMenu.RadioGroup value={selectedView} onValueChange={setSelectedView}>
                        <ContextMenu.RadioItem value="list">
                          <List size={16} />
                          List view
                        </ContextMenu.RadioItem>
                        <ContextMenu.RadioItem value="grid">
                          <Grid size={16} />
                          Grid view
                        </ContextMenu.RadioItem>
                        <ContextMenu.RadioItem value="cards">
                          <Layers size={16} />
                          Card view
                        </ContextMenu.RadioItem>
                      </ContextMenu.RadioGroup>

                      <ContextMenu.Separator />

                      <ContextMenu.Label>Theme</ContextMenu.Label>
                      <ContextMenu.RadioGroup
                        value={selectedTheme}
                        onValueChange={setSelectedTheme}
                      >
                        <ContextMenu.RadioItem value="light">
                          <Circle size={16} />
                          Light theme
                        </ContextMenu.RadioItem>
                        <ContextMenu.RadioItem value="dark">
                          <Dot size={16} />
                          Dark theme
                        </ContextMenu.RadioItem>
                        <ContextMenu.RadioItem value="auto">
                          <Palette size={16} />
                          Auto theme
                        </ContextMenu.RadioItem>
                      </ContextMenu.RadioGroup>

                      <ContextMenu.Separator />

                      <ContextMenu.Item>
                        <Settings size={16} />
                        Advanced settings
                      </ContextMenu.Item>
                    </ContextMenu.Content>
                  </ContextMenu.Root>
                </Flex>
              </Box>

              {/* Rich Text Editor Context Menu */}
              <Box>
                <Heading size="4" mb="3">
                  Rich Text Editor Context Menu
                </Heading>
                <ContextMenu.Root>
                  <ContextMenu.Trigger>
                    <Box
                      p="4"
                      style={{
                        backgroundColor: 'var(--gray-a2)',
                        borderRadius: 'var(--radius-3)',
                        cursor: 'context-menu',
                        border: '1px dashed var(--gray-a6)',
                        textAlign: 'center',
                        width: '120px',
                        height: '80px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Text size="2">Right-click here</Text>
                    </Box>
                  </ContextMenu.Trigger>
                  <ContextMenu.Content>
                    <ContextMenu.Item shortcut="⌘X">
                      <Move size={16} />
                      Cut
                    </ContextMenu.Item>
                    <ContextMenu.Item shortcut="⌘C">
                      <Copy size={16} />
                      Copy
                    </ContextMenu.Item>
                    <ContextMenu.Item shortcut="⌘V">
                      <Plus size={16} />
                      Paste
                    </ContextMenu.Item>
                    <ContextMenu.Separator />
                    <ContextMenu.Sub>
                      <ContextMenu.SubTrigger>
                        <Palette size={16} />
                        Format text
                      </ContextMenu.SubTrigger>
                      <ContextMenu.SubContent>
                        <ContextMenu.Item>
                          <Text style={{ fontWeight: 'bold' }}>Bold</Text>
                        </ContextMenu.Item>
                        <ContextMenu.Item>
                          <Text style={{ fontStyle: 'italic' }}>Italic</Text>
                        </ContextMenu.Item>
                        <ContextMenu.Item>
                          <Text style={{ textDecoration: 'underline' }}>Underline</Text>
                        </ContextMenu.Item>
                        <ContextMenu.Separator />
                        <ContextMenu.Item>
                          <Code size={16} />
                          Code format
                        </ContextMenu.Item>
                        <ContextMenu.Item>
                          <Link size={16} />
                          Add link
                        </ContextMenu.Item>
                      </ContextMenu.SubContent>
                    </ContextMenu.Sub>
                    <ContextMenu.Sub>
                      <ContextMenu.SubTrigger>
                        <Plus size={16} />
                        Insert
                      </ContextMenu.SubTrigger>
                      <ContextMenu.SubContent>
                        <ContextMenu.Item>
                          <Image size={16} />
                          Image
                        </ContextMenu.Item>
                        <ContextMenu.Item>
                          <Video size={16} />
                          Video
                        </ContextMenu.Item>
                        <ContextMenu.Item>
                          <FileText size={16} />
                          File
                        </ContextMenu.Item>
                        <ContextMenu.Separator />
                        <ContextMenu.Item>
                          <BarChart3 size={16} />
                          Chart
                        </ContextMenu.Item>
                        <ContextMenu.Item>
                          <Calendar size={16} />
                          Date
                        </ContextMenu.Item>
                        <ContextMenu.Item>
                          <Database size={16} />
                          Table
                        </ContextMenu.Item>
                      </ContextMenu.SubContent>
                    </ContextMenu.Sub>
                    <ContextMenu.Separator />
                    <ContextMenu.Item>
                      <MessageCircle size={16} />
                      Add comment
                    </ContextMenu.Item>
                    <ContextMenu.Item shortcut="⌘/">
                      <Settings size={16} />
                      Editor settings
                    </ContextMenu.Item>
                  </ContextMenu.Content>
                </ContextMenu.Root>
              </Box>
            </Flex>
          </Box>
        </Tabs.Content>
      </Tabs.Root>
    </Flex>
  );
}
