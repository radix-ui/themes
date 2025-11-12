'use client';

import React from 'react';
import { Shell, Sidebar, Flex, IconButton, Badge, Heading, Box, Card, Avatar } from '@kushagradhawan/kookie-ui';
import ComponentShowcase from './component-showcase';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { DarkModeToggle } from './dark-mode';
import {
  Power,
  BookOpen,
  Code,
  ArrowDownToLine,
  Hash,
  Component,
  ChevronDown,
  Cog,
  Type,
  Palette,
  Square,
  Layout,
  GripVertical,
  Gamepad,
  PanelLeft,
  MessageSquare,
  Github,
  Layers,
  SwatchBook,
  SquareRoundCorner,
} from 'lucide-react';

// Define the navigation structure
const navigationItems = [
  // { href: '/docs/home', title: 'Home', icon: BookOpen, badge: undefined },
  // { href: '/docs/get-started', title: 'Start', icon: Power, badge: undefined },
  // { href: '/docs/whats-kookie', title: "What's Kookie", icon: Component, badge: undefined },
  // { href: '/docs/changes-from-radix', title: 'Radix Changes', icon: GitBranch, badge: undefined },
  { href: '/docs/installation', title: 'Installation', icon: ArrowDownToLine, badge: undefined },
  { href: '/docs/theme', title: 'Theme', icon: Cog, badge: undefined },
  { href: '/docs/colors', title: 'Colors', icon: Palette, badge: undefined },
  { href: '/docs/constants', title: 'Constants', icon: Hash, badge: { content: 'WIP', highContrast: true, size: '1' as const } },
  { href: '/docs/shadows', title: 'Shadows', icon: Layers, badge: undefined },
  { href: '/docs/material', title: 'Material', icon: SwatchBook, badge: undefined },
  { href: '/docs/radius', title: 'Radius', icon: SquareRoundCorner, badge: undefined },
  { href: '/docs/typography', title: 'Typography', icon: Type, badge: undefined },
  // {
  //   href: '/docs/button',
  //   title: 'Button',
  //   icon: Square,
  //   badge: undefined,
  // },
  // {
  //   href: '/docs/shell',
  //   title: 'Shell',
  //   icon: Layout,
  //   badge: undefined,
  //   submenu: [
  //     { href: '/docs/shell', title: 'Overview', icon: BookOpen },
  //     { href: '/docs/shell/api', title: 'API', icon: GripVertical },
  //     // { href: '/docs/shell/specs', title: 'Specs', icon: Box },
  //     // { href: '/docs/shell/guidelines', title: 'Guidelines', icon: Palette },
  //     { href: '/docs/shell/playground', title: 'Playground', icon: Gamepad },
  //   ],
  // },
  // {
  //   href: '/docs/chatbar',
  //   title: 'Chatbar',
  //   icon: MessageSquare,
  //   badge: undefined,
  //   submenu: [
  //     { href: '/docs/chatbar', title: 'Overview', icon: BookOpen },
  //     { href: '/docs/chatbar/api', title: 'API', icon: GripVertical },
  //     // { href: '/docs/chatbar/specs', title: 'Specs', icon: Box },
  //     // { href: '/docs/chatbar/guidelines', title: 'Guidelines', icon: Palette },
  //     { href: '/docs/chatbar/playground', title: 'Playground', icon: Gamepad },
  //   ],
  // },
  // {
  //   href: '/docs/accordion',
  //   title: 'Accordion',
  //   icon: ChevronDown,
  //   badge: { content: 'Soon', variant: 'soft' as const, color: 'gray' as const },
  // },
];

// Sidebar content component
function AppSidebarContent({ presentation }: { presentation: 'thin' | 'expanded' }) {
  const pathname = usePathname();
  // const router = useRouter();

  return (
    <Sidebar.Root size="2" variant="ghost" color="gray" menuVariant="soft" presentation={presentation}>
      <Sidebar.Header>
        <Flex justify="between" align="center" width="100%">
          <Link href="/" aria-label="Kushagra Dhawan - Homepage">
            <Flex align="center" gap="2" px="1">
              <Avatar fallback="K" size="2" src="/kookie-ui-logo.png"></Avatar>
              <Badge highContrast color="gray" size="1">
                Beta
              </Badge>
            </Flex>
          </Link>
        </Flex>
      </Sidebar.Header>
      <Sidebar.Content>
        <Sidebar.Menu>
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            if ('submenu' in item && item.submenu) {
              const isSubmenuActive = Array.isArray(item.submenu) && item.submenu?.length > 0 ? item.submenu.some((subItem) => pathname === subItem.href) : false;
              return (
                <Sidebar.MenuItem key={item.href}>
                  <Sidebar.MenuSub defaultOpen={isSubmenuActive}>
                    <Sidebar.MenuSubTrigger>
                      {/* <IconComponent /> */}
                      {item.title}
                    </Sidebar.MenuSubTrigger>
                    <Sidebar.MenuSubContent>
                      {Array.isArray(item.submenu) && item.submenu.length > 0
                        ? item.submenu.map((subItem) => {
                            const SubIconComponent = subItem.icon;
                            return (
                              <Sidebar.MenuButton asChild key={subItem.href} isActive={pathname === subItem.href}>
                                <Link href={subItem.href} prefetch>
                                  {/* <SubIconComponent /> */}
                                  <span className="rt-SidebarMenuLabel">{subItem.title}</span>
                                </Link>
                              </Sidebar.MenuButton>
                            );
                          })
                        : null}
                    </Sidebar.MenuSubContent>
                  </Sidebar.MenuSub>
                </Sidebar.MenuItem>
              );
            }

            // Regular menu item without submenu
            return (
              <Sidebar.MenuItem key={item.href}>
                <Sidebar.MenuButton asChild isActive={pathname === item.href} badge={item.badge}>
                  <Link href={item.href} prefetch>
                    {/* <IconComponent /> */}
                    <span className="rt-SidebarMenuLabel">{item.title}</span>
                  </Link>
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
            );
          })}
        </Sidebar.Menu>
      </Sidebar.Content>
      <Sidebar.Footer>
        <Flex gap="0">
          <IconButton asChild variant="ghost" highContrast>
            <Link href="https://github.com/KushagraDhawan1997/kookie-ui" target="_blank">
              <Github />
            </Link>
          </IconButton>
          <DarkModeToggle />
        </Flex>
      </Sidebar.Footer>
    </Sidebar.Root>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarPresentation, setSidebarPresentation] = React.useState<'thin' | 'expanded'>('expanded');

  return (
    <Shell.Root>
      <Shell.Sidebar
        toggleModes="single"
        thinSize={80}
        expandedSize={200}
        resizable
        defaultState={{ initial: 'collapsed', sm: 'expanded' }}
        onStateChange={(state) => setSidebarPresentation(state === 'thin' ? 'thin' : 'expanded')}
        presentation={{ initial: 'overlay', sm: 'fixed' }}
      >
        <AppSidebarContent presentation={sidebarPresentation} />
      </Shell.Sidebar>

      <Shell.Content>
        <Flex display={{ initial: 'flex', sm: 'none' }} position="fixed" top="4" left="4" align="center" justify="center" width="auto" height="auto" style={{ zIndex: 999 }}>
          <IconButton variant="classic" size="3" highContrast color="gray" asChild>
            <Shell.Trigger target="sidebar">
              <PanelLeft />
            </Shell.Trigger>
          </IconButton>
        </Flex>
        {children}
      </Shell.Content>

      {/* <Shell.Inspector resizable maxSize={800} expandedSize={600} defaultOpen={{ initial: false, sm: true }}>
        <Shell.Inspector.Handle>
          <IconButton variant="classic" size="2" highContrast color="gray">
            <GripVertical />
          </IconButton>
        </Shell.Inspector.Handle>
        <Flex direction="column" height="100%" width="100%" p="4" style={{ borderLeft: 'solid 1px var(--gray-a6)' }}>
          <ComponentShowcase />
        </Flex>
      </Shell.Inspector> */}
    </Shell.Root>
  );
}
