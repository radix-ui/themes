'use client';

import React from 'react';
import {
  Shell,
  Sidebar,
  Flex,
  IconButton,
  Badge,
  Container,
  Avatar,
} from '@kushagradhawan/kookie-ui';
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
  Type,
  Palette as ColorsIcon,
  Box,
  Square,
  Layout,
  GripVertical,
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
      { href: '/docs/colors', title: 'Colors', icon: ColorsIcon, badge: undefined },
      { href: '/docs/shadows', title: 'Shadows', icon: Box, badge: undefined },
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
      { href: '/docs/button', title: 'Button', icon: Square, badge: undefined },
      { href: '/docs/shell', title: 'Shell', icon: Layout, badge: undefined },
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
                  return (
                    <Sidebar.MenuItem key={item.href}>
                      <Sidebar.MenuButton
                        isActive={pathname === item.href}
                        badge={item.badge}
                        onClick={() => router.push(item.href)}
                      >
                        <IconComponent />
                        {item.title}
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
      <Shell.Sidebar
        toggleModes="both"
        thinSize={80}
        expandedSize={280}
        resizable
        defaultMode="expanded"
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

      <Shell.Content>
        {/* <Flex position="relative" top="3" left="3">
          <IconButton variant="ghost" size="2" asChild highContrast color="gray">
            <Shell.Trigger target="sidebar" action="toggle" peekOnHover={false}>
              <PanelLeft />
            </Shell.Trigger>
          </IconButton>
        </Flex> */}
        {children}
      </Shell.Content>
    </Shell.Root>
  );
}
