'use client';

import React from 'react';
import { Shell, Sidebar, Flex, IconButton, Badge } from '@kushagradhawan/kookie-ui';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { DarkModeToggle } from './dark-mode';
import {
  Home,
  BookOpen,
  Download,
  Palette,
  Component,
  ChevronDown,
  PanelLeft,
  X,
} from 'lucide-react';

// Define the navigation structure
const navigationItems = [
  {
    type: 'section' as const,
    title: 'Start',
    icon: Home,
    items: [
      { href: '/docs/introduction', title: 'Introduction', icon: BookOpen, badge: undefined },
      { href: '/docs/overview', title: 'Overview', icon: Home, badge: undefined },
      { href: '/docs/installation', title: 'Installation', icon: Download, badge: undefined },
    ],
  },
  {
    type: 'section' as const,
    title: 'Customization',
    icon: Palette,
    items: [
      {
        href: '/docs/font-customization',
        title: 'Font',
        icon: Palette,
        badge: undefined,
      },
    ],
  },
  {
    type: 'section' as const,
    title: 'Components',
    icon: Component,
    items: [
      { href: '/docs/button', title: 'Button', icon: Component, badge: undefined },
      {
        href: '/docs/accordion',
        title: 'Accordion',
        icon: ChevronDown,
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
        <Flex as="span" display="inline-flex" align="center" justify="center">
          <Link href="/" aria-label="Kushagra Dhawan - Homepage">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="var(--gray-a12)"
              viewBox="0 0 256 256"
            >
              <path d="M240,108a28,28,0,1,1-28-28A28,28,0,0,1,240,108ZM72,108a28,28,0,1,0-28,28A28,28,0,0,0,72,108ZM92,88A28,28,0,1,0,64,60,28,28,0,0,0,92,88Zm72,0a28,28,0,1,0-28-28A28,28,0,0,0,164,88Zm23.12,60.86a35.3,35.3,0,0,1-16.87-21.14,44,44,0,0,0-84.5,0A35.25,35.25,0,0,1,69,148.82,40,40,0,0,0,88,224a39.48,39.48,0,0,0,15.52-3.13,64.09,64.09,0,0,1,48.87,0,40,40,0,0,0,34.73-72Z"></path>
            </svg>
          </Link>
        </Flex>
        {/* <Text size="3" weight="medium">
          UI.
        </Text> */}
        {/* <Badge size="1" variant="soft" color="orange" highContrast>
          Beta
        </Badge> */}
        <IconButton asChild variant="ghost" color="gray" highContrast>
          <Shell.Trigger target="sidebar" action="toggle">
            <PanelLeft />
          </Shell.Trigger>
        </IconButton>
      </Flex>
      <Flex align="center" gap="2">
        <DarkModeToggle />
      </Flex>
    </Flex>
  );
}

// Sidebar content component
function AppSidebarContent() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Sidebar.Root size="1" variant="ghost" color="gray">
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
  return (
    <Shell.Root>
      <Shell.Header height={64}>
        <AppHeader />
      </Shell.Header>

      <Shell.Sidebar
        toggleModes={['thin', 'expanded']}
        thinSize={80}
        defaultMode="expanded"
        onModeChange={(mode) => console.log('mode', mode)}
        presentation={{ initial: 'overlay', md: 'fixed' }}
      >
        <AppSidebarContent />
      </Shell.Sidebar>

      <Shell.Content>{children}</Shell.Content>
    </Shell.Root>
  );
}
