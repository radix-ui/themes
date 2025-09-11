'use client';

import React from 'react';
import { Shell, Sidebar, Flex, IconButton, Badge, Container, Avatar } from '@kushagradhawan/kookie-ui';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { DarkModeToggle } from './dark-mode';
import { Home, BookOpen, Download, Palette, Component, ChevronDown, PanelLeft, X, Type, Palette as ColorsIcon, Box, Square, Layout, GripVertical } from 'lucide-react';

// Define the navigation structure
const navigationItems = [
  {
    type: 'section' as const,
    title: 'Start',
    icon: Home,
    items: [
      { href: '/docs/introduction', title: 'Introduction', icon: BookOpen, badge: undefined },
      { href: '/docs/overview', title: 'Overview', icon: Home, badge: undefined },
    ],
  },
  {
    type: 'section' as const,
    title: 'Foundations',
    icon: Palette,
    items: [
      { href: '/docs/colors', title: 'Colors', icon: ColorsIcon, badge: undefined },
      { href: '/docs/shadows', title: 'Shadows', icon: Box, badge: undefined },
      { href: '/docs/material', title: 'Material', icon: Box, badge: undefined },
    ],
  },
  {
    type: 'section' as const,
    title: 'Customization',
    icon: Palette,
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
      { href: '/docs/installation', title: 'Installation', icon: Download, badge: undefined },
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
function AppSidebarContent() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Sidebar.Root size="2" variant="surface" color="gray">
      <Sidebar.Header className="rt-justify-between">
        <Link href="/" aria-label="Kushagra Dhawan - Homepage">
          <Avatar src="/logo-dark-large.png" fallback="KD" size="2" radius="full" />
        </Link>
        <DarkModeToggle />
      </Sidebar.Header>
      <Sidebar.Content>
        {navigationItems.map((section, sectionIndex) => (
          <Sidebar.Group key={sectionIndex}>
            <Sidebar.GroupLabel>{section.title}</Sidebar.GroupLabel>
            <Sidebar.GroupContent>
              <Sidebar.Menu>
                {section.items.map((item) => {
                  const IconComponent = item.icon;

                  // Check if this item has a submenu
                  if (item.submenu) {
                    // Check if any submenu item is active
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
                                    {subItem.title}
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
                          {item.title}
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
  return (
    <Shell.Root>
      {/* <Shell.Header>
        <Flex position="absolute" top="3" left="3">
          <IconButton variant="classic" size="2" asChild highContrast color="gray">
            <Shell.Trigger target="sidebar" action="toggle" peekOnHover={false}>
              <PanelLeft />
            </Shell.Trigger>
          </IconButton>
        </Flex>
      </Shell.Header> */}
      <Shell.Sidebar
        toggleModes="single"
        thinSize={80}
        expandedSize={280}
        resizable
        defaultMode={{ initial: 'collapsed', md: 'expanded' }}
        onModeChange={(mode) => console.log('mode', mode)}
        presentation={{ initial: 'overlay', md: 'fixed' }}
      >
        <Shell.Sidebar.Handle>
          <IconButton variant="classic" size="1" highContrast color="gray">
            <GripVertical />
          </IconButton>
        </Shell.Sidebar.Handle>
        <AppSidebarContent />
      </Shell.Sidebar>

      <Shell.Content>{children}</Shell.Content>
    </Shell.Root>
  );
}
