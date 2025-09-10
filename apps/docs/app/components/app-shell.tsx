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
    ],
  },
  {
    type: 'section' as const,
    title: 'Foundations',
    icon: Palette,
    items: [
      { href: '/docs/colors', title: 'Colors', icon: BookOpen, badge: undefined },
      { href: '/docs/shadows', title: 'Shadows', icon: BookOpen, badge: undefined },
    ],
  },
  {
    type: 'section' as const,
    title: 'Customization',
    icon: Palette,
    items: [
      {
        href: '/docs/font-customization',
        title: 'Font Customization',
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
      { href: '/docs/installation', title: 'Installation', icon: Download, badge: undefined },
      { href: '/docs/button', title: 'Button', icon: Component, badge: undefined },
      { href: '/docs/shell', title: 'Shell', icon: Component, badge: undefined },
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
              <path d="M239.71,125l-16.42-88a16,16,0,0,0-19.61-12.58l-.31.09L150.85,40h-45.7L52.63,24.56l-.31-.09A16,16,0,0,0,32.71,37.05L16.29,125a15.77,15.77,0,0,0,9.12,17.52A16.26,16.26,0,0,0,32.12,144,15.48,15.48,0,0,0,40,141.84V184a40,40,0,0,0,40,40h96a40,40,0,0,0,40-40V141.85a15.5,15.5,0,0,0,7.87,2.16,16.31,16.31,0,0,0,6.72-1.47A15.77,15.77,0,0,0,239.71,125ZM176,208H136V195.31l13.66-13.65a8,8,0,0,0-11.32-11.32L128,180.69l-10.34-10.35a8,8,0,0,0-11.32,11.32L120,195.31V208H80a24,24,0,0,1-24-24V123.11L107.93,56h40.14L200,123.11V184A24,24,0,0,1,176,208Zm-72-68a12,12,0,1,1-12-12A12,12,0,0,1,104,140Zm72,0a12,12,0,1,1-12-12A12,12,0,0,1,176,140Z"></path>
            </svg>
          </Link>
        </Flex>
        {/* <Text size="3" weight="medium">
          UI.
        </Text> */}
        {/* <Badge size="1" variant="soft" color="orange" highContrast>
          Beta
        </Badge> */}
        {/* <IconButton asChild variant="ghost" color="gray" highContrast>
          <Shell.Trigger target="sidebar" action="toggle">
            <PanelLeft />
          </Shell.Trigger>
        </IconButton> */}
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
  return (
    <Shell.Root>
      <Shell.Header height={64}>
        <AppHeader />
      </Shell.Header>

      <Shell.Sidebar
        toggleModes={['thin', 'expanded']}
        thinSize={80}
        expandedSize={240}
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
