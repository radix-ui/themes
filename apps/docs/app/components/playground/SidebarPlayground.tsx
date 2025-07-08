'use client';

import React from 'react';
import {
  Sidebar,
  Text,
  Flex,
  Box,
  Heading,
  Tabs,
  Table,
  Badge,
  Button,
  Dialog,
  VisuallyHidden,
} from '@kushagradhawan/kookie-ui';
import {
  Home,
  FileText,
  User,
  Settings,
  HelpCircle,
  Calendar,
  Mail,
  Phone,
  Star,
  Archive,
  Trash2,
  Edit,
  Copy,
  Share,
  Download,
  Bell,
  Search,
  Filter,
  MoreHorizontal,
  ChevronRight,
  Folder,
  FolderOpen,
  Image,
  Video,
  Music,
  Code,
  Database,
  Globe,
  Shield,
  Users,
  CreditCard,
  Zap,
  Menu,
  PanelLeft,
} from 'lucide-react';

const containerVariants = ['surface', 'soft', 'ghost'] as const;
const menuVariants = ['solid', 'soft'] as const;
const sizes = ['1', '2'] as const;

export default function SidebarPlayground() {
  return (
    <Flex direction="column" gap="6">
      <Flex direction="column" gap="2">
        <Badge size="2" variant="soft" color="green" style={{ alignSelf: 'flex-start' }}>
          New
        </Badge>
        <Heading size="6" weight="bold">
          Sidebar
        </Heading>
        <Text size="3" color="gray">
          A navigation panel with dual variant system: container variants control the sidebar
          background, while menu variants control the menu item interactions.
        </Text>
      </Flex>

      <Tabs.Root defaultValue="container-variants">
        <Tabs.List size="2">
          <Tabs.Trigger value="container-variants">Container variants</Tabs.Trigger>
          <Tabs.Trigger value="menu-variants">Menu variants</Tabs.Trigger>
          <Tabs.Trigger value="types">Types</Tabs.Trigger>
          <Tabs.Trigger value="collapsible">Collapsible menus</Tabs.Trigger>
          <Tabs.Trigger value="dialog-examples">Dialog examples</Tabs.Trigger>
          <Tabs.Trigger value="combinations">Combinations</Tabs.Trigger>
          <Tabs.Trigger value="sizes">Sizes</Tabs.Trigger>
        </Tabs.List>

        {/* Container Variants Tab */}
        <Tabs.Content value="container-variants">
          <Box pt="4">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell style={{ width: '120px' }}>
                    <Text size="1" color="gray">
                      Variant
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '400px' }}>
                    <Text size="1" color="gray">
                      Sidebar (with solid menu)
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '200px' }}>
                    <Text size="1" color="gray">
                      Description
                    </Text>
                  </Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {containerVariants.map((variant) => (
                  <Table.Row key={variant}>
                    <Table.RowHeaderCell>
                      <Text size="1" color="gray" style={{ textTransform: 'capitalize' }}>
                        {variant}
                      </Text>
                    </Table.RowHeaderCell>
                    <Table.Cell>
                      <Sidebar.Provider>
                        <Box
                          style={{
                            border: '1px solid var(--gray-a6)',
                            borderRadius: 'var(--radius-3)',
                            overflow: 'hidden',
                          }}
                        >
                          <Flex style={{ height: '100%' }}>
                            <Sidebar.Root
                              variant={variant}
                              menuVariant="solid"
                              size="2"
                              collapsible="icon"
                            >
                              <Sidebar.Content>
                                <Sidebar.Menu>
                                  <Sidebar.Group>
                                    <Sidebar.GroupLabel>Navigation</Sidebar.GroupLabel>
                                    <Sidebar.MenuItem>
                                      <Sidebar.MenuButton data-active>
                                        <Home />
                                        <span>Dashboard</span>
                                      </Sidebar.MenuButton>
                                    </Sidebar.MenuItem>
                                    <Sidebar.MenuSub defaultOpen>
                                      <Sidebar.MenuItem>
                                        <Sidebar.MenuSubTrigger>
                                          <Folder />
                                          <span>Projects</span>
                                        </Sidebar.MenuSubTrigger>
                                      </Sidebar.MenuItem>
                                      <Sidebar.MenuSubContent>
                                        <Sidebar.MenuItem>
                                          <Sidebar.MenuButton>
                                            <Code />
                                            <span>Website</span>
                                          </Sidebar.MenuButton>
                                        </Sidebar.MenuItem>
                                        <Sidebar.MenuItem>
                                          <Sidebar.MenuButton>
                                            <Database />
                                            <span>API</span>
                                          </Sidebar.MenuButton>
                                        </Sidebar.MenuItem>
                                      </Sidebar.MenuSubContent>
                                    </Sidebar.MenuSub>
                                    <Sidebar.MenuItem>
                                      <Sidebar.MenuButton>
                                        <User />
                                        <span>Profile</span>
                                      </Sidebar.MenuButton>
                                    </Sidebar.MenuItem>
                                  </Sidebar.Group>
                                  <Sidebar.Group>
                                    <Sidebar.GroupLabel>Tools</Sidebar.GroupLabel>
                                    <Sidebar.MenuSub>
                                      <Sidebar.MenuItem>
                                        <Sidebar.MenuSubTrigger>
                                          <Settings />
                                          <span>Settings</span>
                                        </Sidebar.MenuSubTrigger>
                                      </Sidebar.MenuItem>
                                      <Sidebar.MenuSubContent>
                                        <Sidebar.MenuItem>
                                          <Sidebar.MenuButton>
                                            <Bell />
                                            <span>Notifications</span>
                                          </Sidebar.MenuButton>
                                        </Sidebar.MenuItem>
                                        <Sidebar.MenuItem>
                                          <Sidebar.MenuButton>
                                            <Shield />
                                            <span>Privacy</span>
                                          </Sidebar.MenuButton>
                                        </Sidebar.MenuItem>
                                      </Sidebar.MenuSubContent>
                                    </Sidebar.MenuSub>
                                    <Sidebar.MenuItem>
                                      <Sidebar.MenuButton>
                                        <HelpCircle />
                                        <span>Help</span>
                                      </Sidebar.MenuButton>
                                    </Sidebar.MenuItem>
                                  </Sidebar.Group>
                                </Sidebar.Menu>
                              </Sidebar.Content>
                            </Sidebar.Root>

                            {/* Main content area with sidebar trigger */}
                            <Flex direction="column" style={{ flex: 1, height: '100%' }}>
                              <Flex
                                align="center"
                                gap="2"
                                style={{
                                  padding: 'var(--space-3)',
                                  backgroundColor: 'var(--color-panel)',
                                }}
                              >
                                <Sidebar.Trigger variant="ghost" size="2" color="gray" highContrast>
                                  <PanelLeft />
                                </Sidebar.Trigger>
                              </Flex>
                            </Flex>
                          </Flex>
                        </Box>
                      </Sidebar.Provider>
                    </Table.Cell>
                    <Table.Cell>
                      <Text size="1" color="gray">
                        {variant === 'surface' && 'Panel background with borders'}
                        {variant === 'soft' && 'Soft gray background'}
                        {variant === 'ghost' && 'Transparent with shadow'}
                      </Text>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </Tabs.Content>

        {/* Menu Variants Tab */}
        <Tabs.Content value="menu-variants">
          <Box pt="4">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell style={{ width: '120px' }}>
                    <Text size="1" color="gray">
                      Variant
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '400px' }}>
                    <Text size="1" color="gray">
                      Sidebar (with surface container)
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '200px' }}>
                    <Text size="1" color="gray">
                      Description
                    </Text>
                  </Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {menuVariants.map((variant) => (
                  <Table.Row key={variant}>
                    <Table.RowHeaderCell>
                      <Text size="1" color="gray" style={{ textTransform: 'capitalize' }}>
                        {variant}
                      </Text>
                    </Table.RowHeaderCell>
                    <Table.Cell>
                      <Sidebar.Provider>
                        <Box
                          style={{
                            border: '1px solid var(--gray-a6)',
                            borderRadius: 'var(--radius-3)',
                            overflow: 'hidden',
                          }}
                        >
                          <Flex style={{ height: '100%' }}>
                            <Sidebar.Root
                              variant="surface"
                              menuVariant={variant}
                              size="2"
                              collapsible="icon"
                            >
                              <Sidebar.Content>
                                <Sidebar.Menu>
                                  <Sidebar.Group>
                                    <Sidebar.GroupLabel>Navigation</Sidebar.GroupLabel>
                                    <Sidebar.MenuItem>
                                      <Sidebar.MenuButton data-active>
                                        <Home />
                                        <span>Dashboard</span>
                                        <Badge size="1" variant="soft">
                                          3
                                        </Badge>
                                      </Sidebar.MenuButton>
                                    </Sidebar.MenuItem>
                                    <Sidebar.MenuSub defaultOpen>
                                      <Sidebar.MenuItem>
                                        <Sidebar.MenuSubTrigger data-highlighted>
                                          <FolderOpen />
                                          <span>Workspace</span>
                                          <Badge size="1" variant="soft" color="gray">
                                            12
                                          </Badge>
                                        </Sidebar.MenuSubTrigger>
                                      </Sidebar.MenuItem>
                                      <Sidebar.MenuSubContent>
                                        <Sidebar.MenuItem>
                                          <Sidebar.MenuButton>
                                            <FileText />
                                            <span>Documents</span>
                                          </Sidebar.MenuButton>
                                        </Sidebar.MenuItem>
                                        <Sidebar.MenuItem>
                                          <Sidebar.MenuButton>
                                            <Image />
                                            <span>Media</span>
                                          </Sidebar.MenuButton>
                                        </Sidebar.MenuItem>
                                      </Sidebar.MenuSubContent>
                                    </Sidebar.MenuSub>
                                    <Sidebar.MenuItem>
                                      <Sidebar.MenuButton>
                                        <User />
                                        <span>Profile</span>
                                      </Sidebar.MenuButton>
                                    </Sidebar.MenuItem>
                                  </Sidebar.Group>
                                  <Sidebar.Group>
                                    <Sidebar.GroupLabel>Management</Sidebar.GroupLabel>
                                    <Sidebar.MenuSub>
                                      <Sidebar.MenuItem>
                                        <Sidebar.MenuSubTrigger>
                                          <Users />
                                          <span>Team</span>
                                        </Sidebar.MenuSubTrigger>
                                      </Sidebar.MenuItem>
                                      <Sidebar.MenuSubContent>
                                        <Sidebar.MenuItem>
                                          <Sidebar.MenuButton>
                                            <User />
                                            <span>Members</span>
                                          </Sidebar.MenuButton>
                                        </Sidebar.MenuItem>
                                        <Sidebar.MenuItem>
                                          <Sidebar.MenuButton>
                                            <Settings />
                                            <span>Permissions</span>
                                          </Sidebar.MenuButton>
                                        </Sidebar.MenuItem>
                                      </Sidebar.MenuSubContent>
                                    </Sidebar.MenuSub>
                                    <Sidebar.MenuItem>
                                      <Sidebar.MenuButton>
                                        <HelpCircle />
                                        <span>Help</span>
                                      </Sidebar.MenuButton>
                                    </Sidebar.MenuItem>
                                  </Sidebar.Group>
                                </Sidebar.Menu>
                              </Sidebar.Content>
                            </Sidebar.Root>

                            {/* Main content area with sidebar trigger */}
                            <Flex direction="column" style={{ flex: 1, height: '100%' }}>
                              <Flex
                                align="center"
                                gap="2"
                                style={{
                                  padding: 'var(--space-3)',
                                  backgroundColor: 'var(--color-panel)',
                                }}
                              >
                                <Sidebar.Trigger variant="ghost" size="2" color="gray" highContrast>
                                  <PanelLeft />
                                </Sidebar.Trigger>
                              </Flex>
                            </Flex>
                          </Flex>
                        </Box>
                      </Sidebar.Provider>
                    </Table.Cell>
                    <Table.Cell>
                      <Text size="1" color="gray">
                        {variant === 'solid' && 'High contrast accent hover'}
                        {variant === 'soft' && 'Subtle accent background'}
                      </Text>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </Tabs.Content>

        {/* Types Tab */}
        <Tabs.Content value="types">
          <Box pt="4">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell style={{ width: '120px' }}>
                    <Text size="1" color="gray">
                      Type
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '400px' }}>
                    <Text size="1" color="gray">
                      Sidebar (with surface container)
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '200px' }}>
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
                      Default
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Sidebar.Provider>
                      <Box
                        style={{
                          border: '1px solid var(--gray-a6)',
                          overflow: 'hidden',
                        }}
                      >
                        <Flex height="100%">
                          <Sidebar.Root
                            variant="surface"
                            menuVariant="soft"
                            size="2"
                            type="sidebar"
                            collapsible="icon"
                          >
                            <Sidebar.Content>
                              <Sidebar.Menu>
                                <Sidebar.Group>
                                  <Sidebar.GroupLabel>Navigation</Sidebar.GroupLabel>
                                  <Sidebar.MenuItem>
                                    <Sidebar.MenuButton data-active>
                                      <Home />
                                      <span>Dashboard</span>
                                    </Sidebar.MenuButton>
                                  </Sidebar.MenuItem>
                                  <Sidebar.MenuSub defaultOpen>
                                    <Sidebar.MenuItem>
                                      <Sidebar.MenuSubTrigger>
                                        <Folder />
                                        <span>Projects</span>
                                      </Sidebar.MenuSubTrigger>
                                    </Sidebar.MenuItem>
                                    <Sidebar.MenuSubContent>
                                      <Sidebar.MenuItem>
                                        <Sidebar.MenuButton>
                                          <FileText />
                                          <span>Website</span>
                                        </Sidebar.MenuButton>
                                      </Sidebar.MenuItem>
                                      <Sidebar.MenuItem>
                                        <Sidebar.MenuButton>
                                          <Database />
                                          <span>API</span>
                                        </Sidebar.MenuButton>
                                      </Sidebar.MenuItem>
                                    </Sidebar.MenuSubContent>
                                  </Sidebar.MenuSub>
                                  <Sidebar.MenuItem>
                                    <Sidebar.MenuButton>
                                      <User />
                                      <span>Profile</span>
                                    </Sidebar.MenuButton>
                                  </Sidebar.MenuItem>
                                </Sidebar.Group>
                              </Sidebar.Menu>
                            </Sidebar.Content>
                          </Sidebar.Root>

                          {/* Main content area with sidebar trigger */}
                          <Flex direction="column" style={{ flex: 1, height: '100%' }}>
                            <Flex
                              align="center"
                              gap="2"
                              style={{
                                padding: 'var(--space-3)',
                                backgroundColor: 'var(--color-panel)',
                              }}
                            >
                              <Sidebar.Trigger variant="ghost" size="2" color="gray" highContrast>
                                <PanelLeft />
                              </Sidebar.Trigger>
                            </Flex>
                          </Flex>
                        </Flex>
                      </Box>
                    </Sidebar.Provider>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="1" color="gray">
                      Standard sidebar attached to container edge
                    </Text>
                  </Table.Cell>
                </Table.Row>
                {containerVariants.map((variant) => (
                  <Table.Row key={`floating-${variant}`}>
                    <Table.RowHeaderCell>
                      <Text size="1" color="gray" style={{ textTransform: 'capitalize' }}>
                        Floating {variant}
                      </Text>
                    </Table.RowHeaderCell>
                    <Table.Cell>
                      <Sidebar.Provider>
                        <Box
                          style={{
                            border: '1px solid var(--gray-a6)',
                            overflow: variant === 'ghost' ? 'visible' : 'hidden', // Allow shadow to show for ghost variant
                            backgroundColor: 'var(--gray-1)',
                            padding: variant === 'ghost' ? 'var(--space-1)' : '0', // Give shadow breathing room
                          }}
                        >
                          <Flex height="100%">
                            <Sidebar.Root
                              variant={variant}
                              menuVariant="soft"
                              size="2"
                              type="floating"
                              collapsible="icon"
                            >
                              <Sidebar.Content>
                                <Sidebar.Menu>
                                  <Sidebar.Group>
                                    <Sidebar.GroupLabel>Navigation</Sidebar.GroupLabel>
                                    <Sidebar.MenuItem>
                                      <Sidebar.MenuButton data-active>
                                        <Home />
                                        <span>Dashboard</span>
                                      </Sidebar.MenuButton>
                                    </Sidebar.MenuItem>
                                    <Sidebar.MenuSub defaultOpen>
                                      <Sidebar.MenuItem>
                                        <Sidebar.MenuSubTrigger>
                                          <Folder />
                                          <span>Projects</span>
                                        </Sidebar.MenuSubTrigger>
                                      </Sidebar.MenuItem>
                                      <Sidebar.MenuSubContent>
                                        <Sidebar.MenuItem>
                                          <Sidebar.MenuButton>
                                            <FileText />
                                            <span>Website</span>
                                          </Sidebar.MenuButton>
                                        </Sidebar.MenuItem>
                                        <Sidebar.MenuItem>
                                          <Sidebar.MenuButton>
                                            <Database />
                                            <span>API</span>
                                          </Sidebar.MenuButton>
                                        </Sidebar.MenuItem>
                                      </Sidebar.MenuSubContent>
                                    </Sidebar.MenuSub>
                                    <Sidebar.MenuItem>
                                      <Sidebar.MenuButton>
                                        <User />
                                        <span>Profile</span>
                                      </Sidebar.MenuButton>
                                    </Sidebar.MenuItem>
                                  </Sidebar.Group>
                                </Sidebar.Menu>
                              </Sidebar.Content>
                            </Sidebar.Root>

                            {/* Main content area with sidebar trigger */}
                            <Flex direction="column" style={{ flex: 1, height: '100%' }}>
                              <Flex
                                align="center"
                                gap="2"
                                style={{
                                  padding: 'var(--space-3)',
                                }}
                              >
                                <Sidebar.Trigger variant="ghost" size="2" color="gray" highContrast>
                                  <PanelLeft />
                                </Sidebar.Trigger>
                              </Flex>
                            </Flex>
                          </Flex>
                        </Box>
                      </Sidebar.Provider>
                    </Table.Cell>
                    <Table.Cell>
                      <Text size="1" color="gray">
                        {variant === 'surface' && 'Floating panel with borders'}
                        {variant === 'soft' && 'Floating with soft gray background'}
                        {variant === 'ghost' && 'Floating transparent with shadow'}
                      </Text>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </Tabs.Content>

        {/* Collapsible Menus Tab */}
        <Tabs.Content value="collapsible">
          <Box pt="4">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell style={{ width: '120px' }}>
                    <Text size="1" color="gray">
                      Example
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '400px' }}>
                    <Text size="1" color="gray">
                      Collapsible Sidebar
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '200px' }}>
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
                      Project Structure
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Sidebar.Provider>
                      <Box
                        style={{
                          border: '1px solid var(--gray-a6)',
                          borderRadius: 'var(--radius-3)',
                          overflow: 'hidden',
                        }}
                      >
                        <Flex style={{ height: '100%' }}>
                          <Sidebar.Root
                            variant="surface"
                            menuVariant="soft"
                            size="2"
                            collapsible="icon"
                          >
                            <Sidebar.Content>
                              <Sidebar.Menu>
                                <Sidebar.Group>
                                  <Sidebar.GroupLabel>Projects</Sidebar.GroupLabel>
                                  <Sidebar.MenuItem>
                                    <Sidebar.MenuButton data-active>
                                      <Home />
                                      <span>Dashboard</span>
                                    </Sidebar.MenuButton>
                                  </Sidebar.MenuItem>
                                  <Sidebar.MenuSub defaultOpen>
                                    <Sidebar.MenuItem>
                                      <Sidebar.MenuSubTrigger>
                                        <Folder />
                                        <span>My Projects</span>
                                      </Sidebar.MenuSubTrigger>
                                    </Sidebar.MenuItem>
                                    <Sidebar.MenuSubContent>
                                      <Sidebar.MenuItem>
                                        <Sidebar.MenuButton>
                                          <Code />
                                          <span>Website Redesign</span>
                                        </Sidebar.MenuButton>
                                      </Sidebar.MenuItem>
                                      <Sidebar.MenuItem>
                                        <Sidebar.MenuButton>
                                          <Database />
                                          <span>API Development</span>
                                        </Sidebar.MenuButton>
                                      </Sidebar.MenuItem>
                                      <Sidebar.MenuItem>
                                        <Sidebar.MenuButton>
                                          <Globe />
                                          <span>Landing Page</span>
                                        </Sidebar.MenuButton>
                                      </Sidebar.MenuItem>
                                    </Sidebar.MenuSubContent>
                                  </Sidebar.MenuSub>
                                  <Sidebar.MenuSub>
                                    <Sidebar.MenuItem>
                                      <Sidebar.MenuSubTrigger>
                                        <Users />
                                        <span>Team Projects</span>
                                      </Sidebar.MenuSubTrigger>
                                    </Sidebar.MenuItem>
                                    <Sidebar.MenuSubContent>
                                      <Sidebar.MenuItem>
                                        <Sidebar.MenuButton>
                                          <Shield />
                                          <span>Security Audit</span>
                                        </Sidebar.MenuButton>
                                      </Sidebar.MenuItem>
                                      <Sidebar.MenuItem>
                                        <Sidebar.MenuButton>
                                          <Zap />
                                          <span>Performance Optimization</span>
                                        </Sidebar.MenuButton>
                                      </Sidebar.MenuItem>
                                    </Sidebar.MenuSubContent>
                                  </Sidebar.MenuSub>
                                </Sidebar.Group>
                              </Sidebar.Menu>
                            </Sidebar.Content>
                          </Sidebar.Root>

                          {/* Main content area with sidebar trigger */}
                          <Flex direction="column" style={{ flex: 1, height: '100%' }}>
                            <Flex
                              align="center"
                              gap="2"
                              style={{
                                padding: 'var(--space-3)',
                                backgroundColor: 'var(--color-panel)',
                              }}
                            >
                              <Sidebar.Trigger variant="ghost" size="2" color="gray" highContrast>
                                <PanelLeft />
                              </Sidebar.Trigger>
                            </Flex>
                          </Flex>
                        </Flex>
                      </Box>
                    </Sidebar.Provider>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="1" color="gray">
                      Expandable project folders with nested items
                    </Text>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      File Explorer
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Sidebar.Provider>
                      <Box
                        style={{
                          border: '1px solid var(--gray-a6)',
                          borderRadius: 'var(--radius-3)',
                          overflow: 'hidden',
                        }}
                      >
                        <Flex style={{ height: '100%' }}>
                          <Sidebar.Root
                            variant="ghost"
                            menuVariant="solid"
                            size="2"
                            collapsible="icon"
                          >
                            <Sidebar.Content>
                              <Sidebar.Menu>
                                <Sidebar.Group>
                                  <Sidebar.GroupLabel>Files</Sidebar.GroupLabel>
                                  <Sidebar.MenuSub defaultOpen>
                                    <Sidebar.MenuItem>
                                      <Sidebar.MenuSubTrigger>
                                        <FolderOpen />
                                        <span>Documents</span>
                                      </Sidebar.MenuSubTrigger>
                                    </Sidebar.MenuItem>
                                    <Sidebar.MenuSubContent>
                                      <Sidebar.MenuItem>
                                        <Sidebar.MenuButton>
                                          <FileText />
                                          <span>Report.pdf</span>
                                        </Sidebar.MenuButton>
                                      </Sidebar.MenuItem>
                                      <Sidebar.MenuItem>
                                        <Sidebar.MenuButton data-active>
                                          <FileText />
                                          <span>Proposal.docx</span>
                                        </Sidebar.MenuButton>
                                      </Sidebar.MenuItem>
                                    </Sidebar.MenuSubContent>
                                  </Sidebar.MenuSub>
                                  <Sidebar.MenuSub>
                                    <Sidebar.MenuItem>
                                      <Sidebar.MenuSubTrigger>
                                        <Folder />
                                        <span>Media</span>
                                      </Sidebar.MenuSubTrigger>
                                    </Sidebar.MenuItem>
                                    <Sidebar.MenuSubContent>
                                      <Sidebar.MenuItem>
                                        <Sidebar.MenuButton>
                                          <Image />
                                          <span>Screenshots</span>
                                        </Sidebar.MenuButton>
                                      </Sidebar.MenuItem>
                                      <Sidebar.MenuItem>
                                        <Sidebar.MenuButton>
                                          <Video />
                                          <span>Demo Videos</span>
                                        </Sidebar.MenuButton>
                                      </Sidebar.MenuItem>
                                      <Sidebar.MenuItem>
                                        <Sidebar.MenuButton>
                                          <Music />
                                          <span>Audio Files</span>
                                        </Sidebar.MenuButton>
                                      </Sidebar.MenuItem>
                                    </Sidebar.MenuSubContent>
                                  </Sidebar.MenuSub>
                                  <Sidebar.MenuItem>
                                    <Sidebar.MenuButton>
                                      <Archive />
                                      <span>Archive</span>
                                    </Sidebar.MenuButton>
                                  </Sidebar.MenuItem>
                                </Sidebar.Group>
                              </Sidebar.Menu>
                            </Sidebar.Content>
                          </Sidebar.Root>

                          {/* Main content area with sidebar trigger */}
                          <Flex direction="column" style={{ flex: 1, height: '100%' }}>
                            <Flex
                              align="center"
                              gap="2"
                              style={{
                                padding: 'var(--space-3)',
                                backgroundColor: 'var(--color-panel)',
                              }}
                            >
                              <Sidebar.Trigger variant="ghost" size="2" color="gray" highContrast>
                                <PanelLeft />
                              </Sidebar.Trigger>
                            </Flex>
                          </Flex>
                        </Flex>
                      </Box>
                    </Sidebar.Provider>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="1" color="gray">
                      File system navigation with collapsible folders
                    </Text>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Settings Menu
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Sidebar.Provider>
                      <Box
                        style={{
                          border: '1px solid var(--gray-a6)',
                          borderRadius: 'var(--radius-3)',
                          overflow: 'hidden',
                        }}
                      >
                        <Flex style={{ height: '100%' }}>
                          <Sidebar.Root
                            variant="soft"
                            menuVariant="soft"
                            size="2"
                            collapsible="icon"
                          >
                            <Sidebar.Content>
                              <Sidebar.Menu>
                                <Sidebar.Group>
                                  <Sidebar.GroupLabel>Configuration</Sidebar.GroupLabel>
                                  <Sidebar.MenuItem>
                                    <Sidebar.MenuButton>
                                      <User />
                                      <span>Profile</span>
                                    </Sidebar.MenuButton>
                                  </Sidebar.MenuItem>
                                  <Sidebar.MenuSub>
                                    <Sidebar.MenuItem>
                                      <Sidebar.MenuSubTrigger>
                                        <Settings />
                                        <span>Preferences</span>
                                      </Sidebar.MenuSubTrigger>
                                    </Sidebar.MenuItem>
                                    <Sidebar.MenuSubContent>
                                      <Sidebar.MenuItem>
                                        <Sidebar.MenuButton>
                                          <Bell />
                                          <span>Notifications</span>
                                        </Sidebar.MenuButton>
                                      </Sidebar.MenuItem>
                                      <Sidebar.MenuItem>
                                        <Sidebar.MenuButton>
                                          <Shield />
                                          <span>Privacy</span>
                                        </Sidebar.MenuButton>
                                      </Sidebar.MenuItem>
                                      <Sidebar.MenuItem>
                                        <Sidebar.MenuButton>
                                          <CreditCard />
                                          <span>Billing</span>
                                        </Sidebar.MenuButton>
                                      </Sidebar.MenuItem>
                                    </Sidebar.MenuSubContent>
                                  </Sidebar.MenuSub>
                                  <Sidebar.MenuSub defaultOpen>
                                    <Sidebar.MenuItem>
                                      <Sidebar.MenuSubTrigger>
                                        <HelpCircle />
                                        <span>Support</span>
                                      </Sidebar.MenuSubTrigger>
                                    </Sidebar.MenuItem>
                                    <Sidebar.MenuSubContent>
                                      <Sidebar.MenuItem>
                                        <Sidebar.MenuButton>
                                          <FileText />
                                          <span>Documentation</span>
                                        </Sidebar.MenuButton>
                                      </Sidebar.MenuItem>
                                      <Sidebar.MenuItem>
                                        <Sidebar.MenuButton>
                                          <Mail />
                                          <span>Contact Support</span>
                                        </Sidebar.MenuButton>
                                      </Sidebar.MenuItem>
                                    </Sidebar.MenuSubContent>
                                  </Sidebar.MenuSub>
                                </Sidebar.Group>
                              </Sidebar.Menu>
                            </Sidebar.Content>
                          </Sidebar.Root>

                          {/* Main content area with sidebar trigger */}
                          <Flex direction="column" style={{ flex: 1, height: '100%' }}>
                            <Flex
                              align="center"
                              gap="2"
                              style={{
                                padding: 'var(--space-3)',
                                backgroundColor: 'var(--color-panel)',
                              }}
                            >
                              <Sidebar.Trigger variant="ghost" size="2" color="gray" highContrast>
                                <PanelLeft />
                              </Sidebar.Trigger>
                            </Flex>
                          </Flex>
                        </Flex>
                      </Box>
                    </Sidebar.Provider>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="1" color="gray">
                      Nested settings with expandable sections
                    </Text>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table.Root>
          </Box>
        </Tabs.Content>

        {/* Dialog Examples Tab */}
        <Tabs.Content value="dialog-examples">
          <Box pt="4">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell style={{ width: '120px' }}>
                    <Text size="1" color="gray">
                      Example
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '400px' }}>
                    <Text size="1" color="gray">
                      Dialog with Sidebar
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '200px' }}>
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
                      User Settings
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Dialog.Root>
                      <Dialog.Trigger>
                        <Button variant="outline">Open Settings</Button>
                      </Dialog.Trigger>
                      <Dialog.Content style={{ maxWidth: '600px', padding: 0 }}>
                        <VisuallyHidden>
                          <Dialog.Title>User Settings</Dialog.Title>
                        </VisuallyHidden>
                        <Sidebar.Provider>
                          <Flex>
                            <Sidebar.Root
                              variant="surface"
                              menuVariant="soft"
                              size="2"
                              collapsible="icon"
                            >
                              <Sidebar.Content>
                                <Sidebar.Menu>
                                  <Sidebar.Group>
                                    <Sidebar.GroupLabel>Account</Sidebar.GroupLabel>
                                    <Sidebar.MenuItem>
                                      <Sidebar.MenuButton data-active>
                                        <User />
                                        <span>Profile</span>
                                      </Sidebar.MenuButton>
                                    </Sidebar.MenuItem>
                                    <Sidebar.MenuItem>
                                      <Sidebar.MenuButton>
                                        <Shield />
                                        <span>Security</span>
                                      </Sidebar.MenuButton>
                                    </Sidebar.MenuItem>
                                    <Sidebar.MenuItem>
                                      <Sidebar.MenuButton>
                                        <Bell />
                                        <span>Notifications</span>
                                      </Sidebar.MenuButton>
                                    </Sidebar.MenuItem>
                                  </Sidebar.Group>
                                  <Sidebar.Group>
                                    <Sidebar.GroupLabel>Preferences</Sidebar.GroupLabel>
                                    <Sidebar.MenuItem>
                                      <Sidebar.MenuButton>
                                        <Settings />
                                        <span>General</span>
                                      </Sidebar.MenuButton>
                                    </Sidebar.MenuItem>
                                    <Sidebar.MenuItem>
                                      <Sidebar.MenuButton>
                                        <Globe />
                                        <span>Language</span>
                                      </Sidebar.MenuButton>
                                    </Sidebar.MenuItem>
                                  </Sidebar.Group>
                                </Sidebar.Menu>
                              </Sidebar.Content>
                            </Sidebar.Root>

                            {/* Empty content area */}
                            <Flex direction="column" style={{ flex: 1 }}>
                              <Flex
                                align="center"
                                gap="2"
                                style={{
                                  padding: 'var(--space-3)',
                                  backgroundColor: 'var(--color-panel)',
                                }}
                              >
                                <Sidebar.Trigger variant="ghost" size="2" color="gray" highContrast>
                                  <PanelLeft />
                                </Sidebar.Trigger>
                              </Flex>
                            </Flex>
                          </Flex>
                        </Sidebar.Provider>
                      </Dialog.Content>
                    </Dialog.Root>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="1" color="gray">
                      Settings dialog with collapsible navigation sidebar
                    </Text>
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Project Config
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Dialog.Root>
                      <Dialog.Trigger>
                        <Button variant="outline">Project Settings</Button>
                      </Dialog.Trigger>
                      <Dialog.Content style={{ maxWidth: '700px', padding: 0 }}>
                        <VisuallyHidden>
                          <Dialog.Title>Project Configuration</Dialog.Title>
                        </VisuallyHidden>
                        <Sidebar.Provider>
                          <Flex>
                            <Sidebar.Root
                              variant="ghost"
                              menuVariant="solid"
                              size="2"
                              type="floating"
                              collapsible="icon"
                            >
                              <Sidebar.Content>
                                <Sidebar.Menu>
                                  <Sidebar.Group>
                                    <Sidebar.GroupLabel>Configuration</Sidebar.GroupLabel>
                                    <Sidebar.MenuSub defaultOpen>
                                      <Sidebar.MenuItem>
                                        <Sidebar.MenuSubTrigger>
                                          <Settings />
                                          <span>General</span>
                                        </Sidebar.MenuSubTrigger>
                                      </Sidebar.MenuItem>
                                      <Sidebar.MenuSubContent>
                                        <Sidebar.MenuItem>
                                          <Sidebar.MenuButton data-active>
                                            <Globe />
                                            <span>Environment</span>
                                          </Sidebar.MenuButton>
                                        </Sidebar.MenuItem>
                                        <Sidebar.MenuItem>
                                          <Sidebar.MenuButton>
                                            <Database />
                                            <span>Database</span>
                                          </Sidebar.MenuButton>
                                        </Sidebar.MenuItem>
                                      </Sidebar.MenuSubContent>
                                    </Sidebar.MenuSub>
                                    <Sidebar.MenuSub>
                                      <Sidebar.MenuItem>
                                        <Sidebar.MenuSubTrigger>
                                          <Code />
                                          <span>Build</span>
                                        </Sidebar.MenuSubTrigger>
                                      </Sidebar.MenuItem>
                                      <Sidebar.MenuSubContent>
                                        <Sidebar.MenuItem>
                                          <Sidebar.MenuButton>
                                            <Zap />
                                            <span>Scripts</span>
                                          </Sidebar.MenuButton>
                                        </Sidebar.MenuItem>
                                        <Sidebar.MenuItem>
                                          <Sidebar.MenuButton>
                                            <Archive />
                                            <span>Dependencies</span>
                                          </Sidebar.MenuButton>
                                        </Sidebar.MenuItem>
                                      </Sidebar.MenuSubContent>
                                    </Sidebar.MenuSub>
                                  </Sidebar.Group>
                                  <Sidebar.Group>
                                    <Sidebar.GroupLabel>Security</Sidebar.GroupLabel>
                                    <Sidebar.MenuItem>
                                      <Sidebar.MenuButton>
                                        <Shield />
                                        <span>Access Control</span>
                                      </Sidebar.MenuButton>
                                    </Sidebar.MenuItem>
                                    <Sidebar.MenuItem>
                                      <Sidebar.MenuButton>
                                        <Users />
                                        <span>Team Members</span>
                                      </Sidebar.MenuButton>
                                    </Sidebar.MenuItem>
                                  </Sidebar.Group>
                                </Sidebar.Menu>
                              </Sidebar.Content>
                            </Sidebar.Root>

                            {/* Empty content area */}
                            <Flex direction="column" style={{ flex: 1 }}>
                              <Flex
                                align="center"
                                gap="2"
                                style={{
                                  padding: 'var(--space-3)',
                                  backgroundColor: 'var(--color-panel)',
                                }}
                              >
                                <Sidebar.Trigger variant="ghost" size="2" color="gray" highContrast>
                                  <PanelLeft />
                                </Sidebar.Trigger>
                              </Flex>
                            </Flex>
                          </Flex>
                        </Sidebar.Provider>
                      </Dialog.Content>
                    </Dialog.Root>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="1" color="gray">
                      Floating ghost sidebar in project configuration dialog
                    </Text>
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Admin Panel
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Dialog.Root>
                      <Dialog.Trigger>
                        <Button variant="outline">Admin Dashboard</Button>
                      </Dialog.Trigger>
                      <Dialog.Content style={{ maxWidth: '800px', padding: 0 }}>
                        <VisuallyHidden>
                          <Dialog.Title>Admin Dashboard</Dialog.Title>
                        </VisuallyHidden>
                        <Sidebar.Provider>
                          <Flex>
                            <Sidebar.Root
                              variant="soft"
                              menuVariant="soft"
                              size="2"
                              collapsible="icon"
                            >
                              <Sidebar.Content>
                                <Sidebar.Menu>
                                  <Sidebar.Group>
                                    <Sidebar.GroupLabel>Management</Sidebar.GroupLabel>
                                    <Sidebar.MenuItem>
                                      <Sidebar.MenuButton data-active>
                                        <Users />
                                        <span>Users</span>
                                        <Badge size="1" variant="soft" color="red">
                                          5
                                        </Badge>
                                      </Sidebar.MenuButton>
                                    </Sidebar.MenuItem>
                                    <Sidebar.MenuSub defaultOpen>
                                      <Sidebar.MenuItem>
                                        <Sidebar.MenuSubTrigger>
                                          <Settings />
                                          <span>System</span>
                                        </Sidebar.MenuSubTrigger>
                                      </Sidebar.MenuItem>
                                      <Sidebar.MenuSubContent>
                                        <Sidebar.MenuItem>
                                          <Sidebar.MenuButton>
                                            <Database />
                                            <span>Database</span>
                                          </Sidebar.MenuButton>
                                        </Sidebar.MenuItem>
                                        <Sidebar.MenuItem>
                                          <Sidebar.MenuButton>
                                            <Shield />
                                            <span>Security</span>
                                          </Sidebar.MenuButton>
                                        </Sidebar.MenuItem>
                                        <Sidebar.MenuItem>
                                          <Sidebar.MenuButton>
                                            <Bell />
                                            <span>Logs</span>
                                          </Sidebar.MenuButton>
                                        </Sidebar.MenuItem>
                                      </Sidebar.MenuSubContent>
                                    </Sidebar.MenuSub>
                                  </Sidebar.Group>
                                  <Sidebar.Group>
                                    <Sidebar.GroupLabel>Reports</Sidebar.GroupLabel>
                                    <Sidebar.MenuItem>
                                      <Sidebar.MenuButton>
                                        <FileText />
                                        <span>Analytics</span>
                                      </Sidebar.MenuButton>
                                    </Sidebar.MenuItem>
                                    <Sidebar.MenuItem>
                                      <Sidebar.MenuButton>
                                        <CreditCard />
                                        <span>Billing</span>
                                      </Sidebar.MenuButton>
                                    </Sidebar.MenuItem>
                                  </Sidebar.Group>
                                </Sidebar.Menu>
                              </Sidebar.Content>
                            </Sidebar.Root>

                            {/* Empty content area */}
                            <Flex direction="column" style={{ flex: 1 }}>
                              <Flex
                                align="center"
                                gap="2"
                                style={{
                                  padding: 'var(--space-3)',
                                  backgroundColor: 'var(--color-panel)',
                                }}
                              >
                                <Sidebar.Trigger variant="ghost" size="2" color="gray" highContrast>
                                  <PanelLeft />
                                </Sidebar.Trigger>
                              </Flex>
                            </Flex>
                          </Flex>
                        </Sidebar.Provider>
                      </Dialog.Content>
                    </Dialog.Root>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="1" color="gray">
                      Admin dashboard with soft sidebar and badges
                    </Text>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table.Root>
          </Box>
        </Tabs.Content>

        {/* Combinations Tab */}
        <Tabs.Content value="combinations">
          <Box pt="4">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell style={{ width: '120px' }}>
                    <Text size="1" color="gray">
                      Container
                    </Text>
                  </Table.ColumnHeaderCell>
                  {menuVariants.map((menuVariant) => (
                    <Table.ColumnHeaderCell
                      key={menuVariant}
                      style={{ width: '200px', textAlign: 'left' }}
                    >
                      <Text size="1" color="gray" style={{ textTransform: 'capitalize' }}>
                        {menuVariant} Menu
                      </Text>
                    </Table.ColumnHeaderCell>
                  ))}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {containerVariants.map((containerVariant) => (
                  <Table.Row key={containerVariant}>
                    <Table.RowHeaderCell>
                      <Text size="1" color="gray" style={{ textTransform: 'capitalize' }}>
                        {containerVariant}
                      </Text>
                    </Table.RowHeaderCell>
                    {menuVariants.map((menuVariant) => (
                      <Table.Cell key={menuVariant}>
                        <Sidebar.Provider>
                          <Box
                            style={{
                              border: '1px solid var(--gray-a6)',
                              borderRadius: 'var(--radius-3)',
                              overflow: 'hidden',
                            }}
                          >
                            <Flex style={{ height: '100%' }}>
                              <Sidebar.Root
                                variant={containerVariant}
                                menuVariant={menuVariant}
                                size="2"
                                collapsible="icon"
                              >
                                <Sidebar.Content>
                                  <Sidebar.Menu>
                                    <Sidebar.Group>
                                      <Sidebar.GroupLabel>Apps</Sidebar.GroupLabel>
                                      <Sidebar.MenuItem>
                                        <Sidebar.MenuButton data-active>
                                          <Mail />
                                          <span>Mail</span>
                                          <Badge size="1" variant="soft">
                                            2
                                          </Badge>
                                        </Sidebar.MenuButton>
                                      </Sidebar.MenuItem>
                                      <Sidebar.MenuSub defaultOpen>
                                        <Sidebar.MenuItem>
                                          <Sidebar.MenuSubTrigger>
                                            <Folder />
                                            <span>Workspace</span>
                                          </Sidebar.MenuSubTrigger>
                                        </Sidebar.MenuItem>
                                        <Sidebar.MenuSubContent>
                                          <Sidebar.MenuItem>
                                            <Sidebar.MenuButton>
                                              <Calendar />
                                              <span>Calendar</span>
                                            </Sidebar.MenuButton>
                                          </Sidebar.MenuItem>
                                          <Sidebar.MenuItem>
                                            <Sidebar.MenuButton>
                                              <Phone />
                                              <span>Contacts</span>
                                            </Sidebar.MenuButton>
                                          </Sidebar.MenuItem>
                                        </Sidebar.MenuSubContent>
                                      </Sidebar.MenuSub>
                                    </Sidebar.Group>
                                    <Sidebar.Group>
                                      <Sidebar.GroupLabel>Recent</Sidebar.GroupLabel>
                                      <Sidebar.MenuItem>
                                        <Sidebar.MenuButton>
                                          <Star />
                                          <span>Favorites</span>
                                        </Sidebar.MenuButton>
                                      </Sidebar.MenuItem>
                                      <Sidebar.MenuSub>
                                        <Sidebar.MenuItem>
                                          <Sidebar.MenuSubTrigger>
                                            <Archive />
                                            <span>Archive</span>
                                          </Sidebar.MenuSubTrigger>
                                        </Sidebar.MenuItem>
                                        <Sidebar.MenuSubContent>
                                          <Sidebar.MenuItem>
                                            <Sidebar.MenuButton>
                                              <FileText />
                                              <span>Old Files</span>
                                            </Sidebar.MenuButton>
                                          </Sidebar.MenuItem>
                                        </Sidebar.MenuSubContent>
                                      </Sidebar.MenuSub>
                                    </Sidebar.Group>
                                  </Sidebar.Menu>
                                </Sidebar.Content>
                              </Sidebar.Root>

                              {/* Main content area with sidebar trigger */}
                              <Flex direction="column" style={{ flex: 1, height: '100%' }}>
                                <Flex
                                  align="center"
                                  gap="2"
                                  style={{
                                    padding: 'var(--space-3)',
                                    backgroundColor: 'var(--color-panel)',
                                  }}
                                >
                                  <Sidebar.Trigger
                                    variant="ghost"
                                    size="2"
                                    color="gray"
                                    highContrast
                                  >
                                    <PanelLeft />
                                  </Sidebar.Trigger>
                                </Flex>
                              </Flex>
                            </Flex>
                          </Box>
                        </Sidebar.Provider>
                      </Table.Cell>
                    ))}
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </Tabs.Content>

        {/* Sizes Tab */}
        <Tabs.Content value="sizes">
          <Box pt="4">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell style={{ width: '120px' }}>
                    <Text size="1" color="gray">
                      Size
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '300px' }}>
                    <Text size="1" color="gray">
                      Surface + Solid Menu
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '300px' }}>
                    <Text size="1" color="gray">
                      Ghost + Soft Menu
                    </Text>
                  </Table.ColumnHeaderCell>
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
                    <Table.Cell>
                      <Sidebar.Provider>
                        <Box
                          style={{
                            border: '1px solid var(--gray-a6)',
                            borderRadius: 'var(--radius-3)',
                            overflow: 'hidden',
                          }}
                        >
                          <Flex style={{ height: '100%' }}>
                            <Sidebar.Root
                              variant="surface"
                              menuVariant="solid"
                              size={size as any}
                              collapsible="icon"
                            >
                              <Sidebar.Content>
                                <Sidebar.Menu>
                                  <Sidebar.Group>
                                    <Sidebar.GroupLabel>Navigation</Sidebar.GroupLabel>
                                    <Sidebar.MenuItem>
                                      <Sidebar.MenuButton data-active>
                                        <Home size={size === '1' ? 14 : 16} />
                                        <span>Dashboard</span>
                                      </Sidebar.MenuButton>
                                    </Sidebar.MenuItem>
                                    <Sidebar.MenuSub defaultOpen>
                                      <Sidebar.MenuItem>
                                        <Sidebar.MenuSubTrigger>
                                          <Folder size={size === '1' ? 14 : 16} />
                                          <span>Projects</span>
                                        </Sidebar.MenuSubTrigger>
                                      </Sidebar.MenuItem>
                                      <Sidebar.MenuSubContent>
                                        <Sidebar.MenuItem>
                                          <Sidebar.MenuButton>
                                            <FileText size={size === '1' ? 14 : 16} />
                                            <span>Docs</span>
                                          </Sidebar.MenuButton>
                                        </Sidebar.MenuItem>
                                        <Sidebar.MenuItem>
                                          <Sidebar.MenuButton>
                                            <Code size={size === '1' ? 14 : 16} />
                                            <span>Code</span>
                                          </Sidebar.MenuButton>
                                        </Sidebar.MenuItem>
                                      </Sidebar.MenuSubContent>
                                    </Sidebar.MenuSub>
                                    <Sidebar.MenuItem>
                                      <Sidebar.MenuButton>
                                        <User size={size === '1' ? 14 : 16} />
                                        <span>Profile</span>
                                      </Sidebar.MenuButton>
                                    </Sidebar.MenuItem>
                                  </Sidebar.Group>
                                  <Sidebar.Group>
                                    <Sidebar.GroupLabel>Tools</Sidebar.GroupLabel>
                                    <Sidebar.MenuSub>
                                      <Sidebar.MenuItem>
                                        <Sidebar.MenuSubTrigger>
                                          <Settings size={size === '1' ? 14 : 16} />
                                          <span>Settings</span>
                                        </Sidebar.MenuSubTrigger>
                                      </Sidebar.MenuItem>
                                      <Sidebar.MenuSubContent>
                                        <Sidebar.MenuItem>
                                          <Sidebar.MenuButton>
                                            <Bell size={size === '1' ? 14 : 16} />
                                            <span>Alerts</span>
                                          </Sidebar.MenuButton>
                                        </Sidebar.MenuItem>
                                      </Sidebar.MenuSubContent>
                                    </Sidebar.MenuSub>
                                    <Sidebar.MenuItem>
                                      <Sidebar.MenuButton>
                                        <HelpCircle size={size === '1' ? 14 : 16} />
                                        <span>Help</span>
                                      </Sidebar.MenuButton>
                                    </Sidebar.MenuItem>
                                  </Sidebar.Group>
                                </Sidebar.Menu>
                              </Sidebar.Content>
                            </Sidebar.Root>

                            {/* Main content area with sidebar trigger */}
                            <Flex direction="column" style={{ flex: 1, height: '100%' }}>
                              <Flex
                                align="center"
                                gap="2"
                                style={{
                                  padding: 'var(--space-3)',
                                  backgroundColor: 'var(--color-panel)',
                                }}
                              >
                                <Sidebar.Trigger
                                  variant="ghost"
                                  size={size}
                                  color="gray"
                                  highContrast
                                >
                                  <PanelLeft />
                                </Sidebar.Trigger>
                              </Flex>
                            </Flex>
                          </Flex>
                        </Box>
                      </Sidebar.Provider>
                    </Table.Cell>
                    <Table.Cell>
                      <Sidebar.Provider>
                        <Box
                          style={{
                            border: '1px solid var(--gray-a6)',
                            borderRadius: 'var(--radius-3)',
                            overflow: 'hidden',
                          }}
                        >
                          <Flex style={{ height: '100%' }}>
                            <Sidebar.Root
                              variant="ghost"
                              menuVariant="soft"
                              size={size as any}
                              collapsible="icon"
                            >
                              <Sidebar.Content>
                                <Sidebar.Menu>
                                  <Sidebar.Group>
                                    <Sidebar.GroupLabel>Actions</Sidebar.GroupLabel>
                                    <Sidebar.MenuItem>
                                      <Sidebar.MenuButton data-active>
                                        <Edit size={size === '1' ? 14 : 16} />
                                        <span>Edit</span>
                                      </Sidebar.MenuButton>
                                    </Sidebar.MenuItem>
                                    <Sidebar.MenuSub defaultOpen>
                                      <Sidebar.MenuItem>
                                        <Sidebar.MenuSubTrigger>
                                          <Folder size={size === '1' ? 14 : 16} />
                                          <span>Tools</span>
                                        </Sidebar.MenuSubTrigger>
                                      </Sidebar.MenuItem>
                                      <Sidebar.MenuSubContent>
                                        <Sidebar.MenuItem>
                                          <Sidebar.MenuButton>
                                            <Copy size={size === '1' ? 14 : 16} />
                                            <span>Copy</span>
                                          </Sidebar.MenuButton>
                                        </Sidebar.MenuItem>
                                        <Sidebar.MenuItem>
                                          <Sidebar.MenuButton>
                                            <Share size={size === '1' ? 14 : 16} />
                                            <span>Share</span>
                                          </Sidebar.MenuButton>
                                        </Sidebar.MenuItem>
                                      </Sidebar.MenuSubContent>
                                    </Sidebar.MenuSub>
                                  </Sidebar.Group>
                                  <Sidebar.Group>
                                    <Sidebar.GroupLabel>More</Sidebar.GroupLabel>
                                    <Sidebar.MenuItem>
                                      <Sidebar.MenuButton>
                                        <Download size={size === '1' ? 14 : 16} />
                                        <span>Download</span>
                                      </Sidebar.MenuButton>
                                    </Sidebar.MenuItem>
                                    <Sidebar.MenuSub>
                                      <Sidebar.MenuItem>
                                        <Sidebar.MenuSubTrigger>
                                          <Archive size={size === '1' ? 14 : 16} />
                                          <span>Archive</span>
                                        </Sidebar.MenuSubTrigger>
                                      </Sidebar.MenuItem>
                                      <Sidebar.MenuSubContent>
                                        <Sidebar.MenuItem>
                                          <Sidebar.MenuButton>
                                            <FileText size={size === '1' ? 14 : 16} />
                                            <span>Old Files</span>
                                          </Sidebar.MenuButton>
                                        </Sidebar.MenuItem>
                                      </Sidebar.MenuSubContent>
                                    </Sidebar.MenuSub>
                                  </Sidebar.Group>
                                </Sidebar.Menu>
                              </Sidebar.Content>
                            </Sidebar.Root>

                            {/* Main content area with sidebar trigger */}
                            <Flex direction="column" style={{ flex: 1, height: '100%' }}>
                              <Flex
                                align="center"
                                gap="2"
                                style={{
                                  padding: 'var(--space-3)',
                                  backgroundColor: 'var(--color-panel)',
                                }}
                              >
                                <Sidebar.Trigger
                                  variant="ghost"
                                  size={size}
                                  color="gray"
                                  highContrast
                                >
                                  <PanelLeft />
                                </Sidebar.Trigger>
                              </Flex>
                            </Flex>
                          </Flex>
                        </Box>
                      </Sidebar.Provider>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </Tabs.Content>
      </Tabs.Root>
    </Flex>
  );
}
