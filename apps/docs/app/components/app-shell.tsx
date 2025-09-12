'use client';

import React from 'react';
import { Shell, Sidebar, Flex, IconButton, Badge, Container, Avatar } from '@kushagradhawan/kookie-ui';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { DarkModeToggle } from './dark-mode';
import {
  Signpost,
  BookOpen,
  Download,
  Palette,
  Component,
  ChevronDown,
  PanelLeft,
  Type,
  Palette as ColorsIcon,
  Box,
  Square,
  Layout,
  GripVertical,
  Calendar,
  Dog,
  GitBranch,
  Settings,
} from 'lucide-react';

// Define the navigation structure
const navigationItems = [
  {
    type: 'section' as const,
    title: 'Start',
    icon: Signpost,
    items: [
      { href: '/docs/home', title: 'Home', icon: BookOpen, badge: undefined },
      { href: '/docs/get-started', title: 'Get Started', icon: Signpost, badge: undefined },
      { href: '/docs/whats-kookie', title: "What's Kookie", icon: Dog, badge: undefined },
      { href: '/docs/changes-from-radix', title: 'Changes from Radix', icon: GitBranch, badge: undefined },
      { href: '/docs/roadmap', title: 'Roadmap', icon: Calendar, badge: undefined },
      { href: '/docs/installation', title: 'Installation', icon: Download, badge: undefined },
    ],
  },
  {
    type: 'section' as const,
    title: 'Foundations',
    icon: Palette,
    items: [
      { href: '/docs/colors', title: 'Colors', icon: ColorsIcon, badge: undefined },
      { href: '/docs/shadows', title: 'Shadows', icon: Box, badge: undefined },
      { href: '/docs/material', title: 'Material', icon: Square, badge: undefined },
    ],
  },
  {
    type: 'section' as const,
    title: 'Customization',
    icon: Settings,
    items: [
      {
        href: '/docs/font-customization',
        title: 'Fonts',
        icon: Type,
        badge: undefined,
      },
    ],
  },
  {
    type: 'section' as const,
    title: 'Components',
    icon: Component,
    items: [
      {
        href: '/docs/button',
        title: 'Button',
        icon: Square,
        badge: undefined,
        submenu: [
          { href: '/docs/button', title: 'Overview', icon: BookOpen },
          { href: '/docs/button/api', title: 'API', icon: GripVertical },
          { href: '/docs/button/specs', title: 'Specs', icon: Box },
          { href: '/docs/button/guidelines', title: 'Guidelines', icon: Palette },
          { href: '/docs/button/accessibility', title: 'Accessibility', icon: ChevronDown },
          { href: '/docs/button/changelog', title: 'Changelog', icon: Type },
          { href: '/docs/button/playground', title: 'Playground', icon: Square },
        ],
      },
      {
        href: '/docs/shell',
        title: 'Shell',
        icon: Layout,
        badge: undefined,
        submenu: [
          { href: '/docs/shell', title: 'Overview', icon: BookOpen },
          { href: '/docs/shell/api', title: 'API', icon: GripVertical },
          { href: '/docs/shell/specs', title: 'Specs', icon: Box },
          { href: '/docs/shell/guidelines', title: 'Guidelines', icon: Palette },
          { href: '/docs/shell/accessibility', title: 'Accessibility', icon: ChevronDown },
          { href: '/docs/shell/changelog', title: 'Changelog', icon: Type },
          { href: '/docs/shell/playground', title: 'Playground', icon: Square },
        ],
      },
      {
        href: '/docs/accordion',
        title: 'Accordion',
        icon: ChevronDown,
        badge: { content: 'Soon', variant: 'soft' as const, color: 'gray' as const },
      },
    ],
  },
];

// Sidebar content component
function AppSidebarContent({ presentation }: { presentation: 'thin' | 'expanded' }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Sidebar.Root size="2" variant="soft" color="gray" presentation={presentation}>
      <Sidebar.Header>
        <Flex justify="start" direction="row" width="100%">
          <Link href="/" aria-label="Kushagra Dhawan - Homepage">
            <Avatar src="/logo-dark-large.png" fallback="KD" size="2" radius="full" />
          </Link>
        </Flex>
      </Sidebar.Header>
      <Sidebar.Content>
        {navigationItems.map((section, sectionIndex) => (
          <Sidebar.Group key={sectionIndex}>
            <Sidebar.GroupLabel>{section.title}</Sidebar.GroupLabel>
            <Sidebar.GroupContent>
              <Sidebar.Menu>
                {section.items.map((item) => {
                  const IconComponent = item.icon;
                  if ('submenu' in item && item.submenu) {
                    const isSubmenuActive = item.submenu.some((subItem) => pathname === subItem.href);
                    return (
                      <Sidebar.MenuItem key={item.href}>
                        <Sidebar.MenuSub defaultOpen={isSubmenuActive}>
                          <Sidebar.MenuSubTrigger>
                            <IconComponent />
                            {item.title}
                          </Sidebar.MenuSubTrigger>
                          <Sidebar.MenuSubContent>
                            {item.submenu.map((subItem) => {
                              const SubIconComponent = subItem.icon;
                              return (
                                <Sidebar.MenuButton asChild key={subItem.href} isActive={pathname === subItem.href}>
                                  <Link href={subItem.href} prefetch>
                                    <SubIconComponent />
                                    <span className="rt-SidebarMenuLabel">{subItem.title}</span>
                                  </Link>
                                </Sidebar.MenuButton>
                              );
                            })}
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
                          <IconComponent />
                          <span className="rt-SidebarMenuLabel">{item.title}</span>
                        </Link>
                      </Sidebar.MenuButton>
                    </Sidebar.MenuItem>
                  );
                })}
              </Sidebar.Menu>
            </Sidebar.GroupContent>
          </Sidebar.Group>
        ))}
      </Sidebar.Content>
    </Sidebar.Root>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarPresentation, setSidebarPresentation] = React.useState<'thin' | 'expanded'>('expanded');

  return (
    <Shell.Root>
      <Shell.Header style={{ boxShadow: 'var(--shadow-2)' }}>
        <Flex gap="2" px="4">
          <IconButton variant="classic" size="2" asChild highContrast color="gray">
            <Shell.Trigger target="sidebar" action="toggle" peekOnHover={false}>
              <PanelLeft />
            </Shell.Trigger>
          </IconButton>
          <DarkModeToggle />
        </Flex>
      </Shell.Header>
      <Shell.Sidebar
        toggleModes="single"
        thinSize={80}
        expandedSize={280}
        resizable
        defaultMode={{ initial: 'collapsed', md: 'expanded' }}
        onModeChange={(mode) => setSidebarPresentation(mode === 'thin' ? 'thin' : 'expanded')}
        presentation={{ initial: 'overlay', md: 'fixed' }}
      >
        <Shell.Sidebar.Handle>
          <IconButton variant="classic" size="1" highContrast color="gray">
            <GripVertical />
          </IconButton>
        </Shell.Sidebar.Handle>
        <AppSidebarContent presentation={sidebarPresentation} />
      </Shell.Sidebar>

      <Shell.Content>{children}</Shell.Content>
    </Shell.Root>
  );
}
