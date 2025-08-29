'use client';

import React from 'react';
import { Shell, Flex, Sidebar, Avatar, Link as KookieLink, Badge } from '@kushagradhawan/kookie-ui';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { DarkModeToggle } from './dark-mode';

// Define the navigation structure
const navigationItems = [
  {
    type: 'section' as const,
    title: 'Start',
    items: [
      { href: '/', title: 'Overview', badge: undefined },
      { href: '/installation', title: 'Installation', badge: undefined },
      { href: '/docs', title: 'Introduction', badge: undefined },
    ],
  },
  {
    type: 'section' as const,
    title: 'Components',
    items: [
      { href: '/docs/button', title: 'Button', badge: undefined },
      {
        href: '/docs/accordion',
        title: 'Accordion',
        badge: { content: 'Soon', variant: 'soft' as const, color: 'gray' as const },
      },
      {
        href: '/docs/alert-dialog',
        title: 'Alert Dialog',
        badge: { content: 'Soon', variant: 'soft' as const, color: 'gray' as const },
      },
      {
        href: '/docs/avatar',
        title: 'Avatar',
        badge: { content: 'Soon', variant: 'soft' as const, color: 'gray' as const },
      },
      {
        href: '/docs/badge',
        title: 'Badge',
        badge: { content: 'Soon', variant: 'soft' as const, color: 'gray' as const },
      },
      {
        href: '/docs/callout',
        title: 'Callout',
        badge: { content: 'Soon', variant: 'soft' as const, color: 'gray' as const },
      },
      {
        href: '/docs/card',
        title: 'Card',
        badge: { content: 'Soon', variant: 'soft' as const, color: 'gray' as const },
      },
      {
        href: '/docs/checkbox',
        title: 'Checkbox',
        badge: { content: 'Soon', variant: 'soft' as const, color: 'gray' as const },
      },
      {
        href: '/docs/dialog',
        title: 'Dialog',
        badge: { content: 'Soon', variant: 'soft' as const, color: 'gray' as const },
      },
      {
        href: '/docs/dropdown-menu',
        title: 'Dropdown Menu',
        badge: { content: 'Soon', variant: 'soft' as const, color: 'gray' as const },
      },
      {
        href: '/docs/heading',
        title: 'Heading',
        badge: { content: 'Soon', variant: 'soft' as const, color: 'gray' as const },
      },
      {
        href: '/docs/icon-button',
        title: 'Icon Button',
        badge: { content: 'Soon', variant: 'soft' as const, color: 'gray' as const },
      },
      {
        href: '/docs/popover',
        title: 'Popover',
        badge: { content: 'Soon', variant: 'soft' as const, color: 'gray' as const },
      },
      {
        href: '/docs/progress',
        title: 'Progress',
        badge: { content: 'Soon', variant: 'soft' as const, color: 'gray' as const },
      },
      {
        href: '/docs/radio',
        title: 'Radio',
        badge: { content: 'Soon', variant: 'soft' as const, color: 'gray' as const },
      },
      {
        href: '/docs/select',
        title: 'Select',
        badge: { content: 'Soon', variant: 'soft' as const, color: 'gray' as const },
      },
      {
        href: '/docs/slider',
        title: 'Slider',
        badge: { content: 'Soon', variant: 'soft' as const, color: 'gray' as const },
      },
      {
        href: '/docs/switch',
        title: 'Switch',
        badge: { content: 'Soon', variant: 'soft' as const, color: 'gray' as const },
      },
      {
        href: '/docs/table',
        title: 'Table',
        badge: { content: 'Soon', variant: 'soft' as const, color: 'gray' as const },
      },
      {
        href: '/docs/tabs',
        title: 'Tabs',
        badge: { content: 'Soon', variant: 'soft' as const, color: 'gray' as const },
      },
      {
        href: '/docs/text',
        title: 'Text',
        badge: { content: 'Soon', variant: 'soft' as const, color: 'gray' as const },
      },
      {
        href: '/docs/text-area',
        title: 'Text Area',
        badge: { content: 'Soon', variant: 'soft' as const, color: 'gray' as const },
      },
      {
        href: '/docs/text-field',
        title: 'Text Field',
        badge: { content: 'Soon', variant: 'soft' as const, color: 'gray' as const },
      },
      {
        href: '/docs/tooltip',
        title: 'Tooltip',
        badge: { content: 'Soon', variant: 'soft' as const, color: 'gray' as const },
      },
    ],
  },
  {
    type: 'section' as const,
    title: 'Layout',
    items: [
      {
        href: '/docs/box',
        title: 'Box',
        badge: { content: 'Soon', variant: 'soft' as const, color: 'gray' as const },
      },
      {
        href: '/docs/container',
        title: 'Container',
        badge: { content: 'Soon', variant: 'soft' as const, color: 'gray' as const },
      },
      {
        href: '/docs/flex',
        title: 'Flex',
        badge: { content: 'Soon', variant: 'soft' as const, color: 'gray' as const },
      },
      {
        href: '/docs/grid',
        title: 'Grid',
        badge: { content: 'Soon', variant: 'soft' as const, color: 'gray' as const },
      },
      {
        href: '/docs/section',
        title: 'Section',
        badge: { content: 'Soon', variant: 'soft' as const, color: 'gray' as const },
      },
    ],
  },
];

// Header component for app layout
function AppHeader() {
  return (
    <Flex align="center" justify="between" width="100%" px="4">
      <Flex align="center" gap="2">
        <Avatar color="gray" size="2" src="/logo-dark-large.png" fallback="KD" asChild>
          <Link href="/" />
        </Avatar>
        <Badge size="2" variant="soft" color="orange">
          Beta
        </Badge>
      </Flex>
      <DarkModeToggle />
    </Flex>
  );
}

// Sidebar content component
function AppSidebarContent() {
  const pathname = usePathname();

  return (
    <Sidebar.Root size="2" variant="ghost" color="gray">
      <Sidebar.Content>
        {navigationItems.map((section, sectionIndex) => (
          <Sidebar.Group key={sectionIndex}>
            <Sidebar.GroupLabel>{section.title}</Sidebar.GroupLabel>
            <Sidebar.GroupContent>
              <Sidebar.Menu>
                {section.items.map((item) => (
                  <Sidebar.MenuItem key={item.href}>
                    <Sidebar.MenuButton
                      asChild
                      isActive={pathname === item.href}
                      badge={item.badge}
                    >
                      <Link href={item.href}>{item.title}</Link>
                    </Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                ))}
              </Sidebar.Menu>
            </Sidebar.GroupContent>
          </Sidebar.Group>
        ))}
      </Sidebar.Content>
    </Sidebar.Root>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Extract current section/tool from pathname for active tool coordination
  const activeTool = React.useMemo(() => {
    if (pathname === '/') return 'overview';
    if (pathname === '/docs') return 'introduction';
    const segments = pathname.split('/');
    if (segments[1] === 'docs' && segments[2]) {
      return segments[2]; // e.g., 'button' from '/docs/button'
    }
    return null;
  }, [pathname]);

  return (
    <Shell.Root
      minContentWidth="640px"
      activeTool={activeTool}
      singleViewCycle={['panel', 'collapsed']}
      onToolChange={(tool) => {
        // Could handle programmatic navigation here if needed
        console.log('Active tool changed:', tool);
      }}
    >
      <Shell.Header>
        <AppHeader />
      </Shell.Header>

      <Shell.Sidebar side="start">
        <AppSidebarContent />
      </Shell.Sidebar>

      <Shell.Content>{children}</Shell.Content>
    </Shell.Root>
  );
}
