'use client';

import React from 'react';
import {
  Shell,
  Flex,
  Sidebar,
  Avatar,
  Link as KookieLink,
  Badge,
  Text,
} from '@kushagradhawan/kookie-ui';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { DarkModeToggle } from './dark-mode';

// Define the navigation structure
const navigationItems = [
  {
    type: 'section' as const,
    title: 'Start',
    items: [
      { href: '/docs', title: 'Introduction', badge: undefined },
      { href: '/', title: 'Overview', badge: undefined },
      { href: '/installation', title: 'Installation', badge: undefined },
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
    ],
  },
];

// Header component for app layout
function AppHeader() {
  return (
    <Flex align="center" justify="between" width="100%" px="4">
      <Link href="/" aria-label="Kushagra Dhawan - Homepage">
        <Flex align="center" gap="2">
          <Avatar color="gray" size="1" src="/logo-dark-large.png" fallback="KD" />
          {/* <Badge size="1" variant="soft" color="orange" highContrast>
            Beta
          </Badge> */}
          <Text size="4" weight="medium">
            Kookie UI.
          </Text>
        </Flex>
      </Link>
      <DarkModeToggle />
    </Flex>
  );
}

// Sidebar content component
function AppSidebarContent() {
  const pathname = usePathname();
  const router = useRouter();

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
                      isActive={pathname === item.href}
                      badge={item.badge}
                      onClick={() => router.push(item.href)}
                    >
                      {item.title}
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
