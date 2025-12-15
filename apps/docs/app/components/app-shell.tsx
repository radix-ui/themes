'use client';

import React from 'react';
import { Shell, Sidebar, Flex, IconButton, Badge, Avatar } from '@kushagradhawan/kookie-ui';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { DarkModeToggle } from './dark-mode';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Download01Icon,
  LayoutBottomIcon,
  CodeIcon,
  Settings01Icon,
  ColorsIcon,
  Grid02Icon,
  Layers01Icon,
  SwatchIcon,
  JoinRoundIcon,
  TextSquareIcon,
  Github01Icon,
  Menu01Icon,
  LayoutIcon,
} from '@hugeicons/core-free-icons';

// Define the navigation structure with groups
const navigationGroups = [
  {
    label: 'Get Started',
    items: [{ href: '/docs/installation', title: 'Installation', icon: Download01Icon, badge: undefined }],
  },
  {
    label: 'Theme',
    items: [
      { href: '/docs/theme', title: 'Theme', icon: Settings01Icon, badge: undefined },
      { href: '/docs/colors', title: 'Colors', icon: ColorsIcon, badge: undefined },
      { href: '/docs/constants', title: 'Constants', icon: Grid02Icon, badge: { content: 'Alpha', highContrast: true, size: '1' as const } },
      { href: '/docs/shadows', title: 'Shadows', icon: Layers01Icon, badge: undefined },
      { href: '/docs/material', title: 'Material', icon: SwatchIcon, badge: { content: 'Alpha', highContrast: true, size: '1' as const } },
      { href: '/docs/radius', title: 'Radius', icon: JoinRoundIcon, badge: undefined },
      { href: '/docs/typography', title: 'Typography', icon: TextSquareIcon, badge: undefined },
    ],
  },
  {
    label: 'Components',
    items: [
      {
        href: '/docs/button',
        title: 'Button',
        icon: LayoutBottomIcon,
        badge: { content: 'Alpha', highContrast: true, size: '1' as const },
      },
      {
        href: '/docs/combobox',
        title: 'Combobox',
        icon: CodeIcon,
        badge: { content: 'Alpha', highContrast: true, size: '1' as const },
      },
      {
        href: '/docs/shell',
        title: 'Shell',
        icon: LayoutIcon,
        badge: { content: 'Alpha', highContrast: true, size: '1' as const },
      },
    ],
  },
];

// Sidebar content component
function AppSidebarContent({ presentation }: { presentation: 'thin' | 'expanded' }) {
  const pathname = usePathname();
  // const router = useRouter();

  return (
    <Sidebar.Root size="2" variant="soft" color="gray" menuVariant="soft" presentation={presentation}>
      <Sidebar.Header>
        <Flex justify="between" align="center" width="100%">
          <Link href="/" aria-label="Kushagra Dhawan - Homepage">
            <Flex align="center" gap="2">
              <Avatar fallback="K" size="2" src="/kookie-logo.png"></Avatar>
              <Badge highContrast color="gray" size="1">
                Alpha
              </Badge>
            </Flex>
          </Link>
        </Flex>
      </Sidebar.Header>
      <Sidebar.Content>
        <Sidebar.Menu>
          {navigationGroups.map((group) => (
            <Sidebar.Group key={group.label}>
              <Sidebar.GroupLabel>{group.label}</Sidebar.GroupLabel>
              <Sidebar.GroupContent>
                {group.items.map((item) => {
                  const IconComponent = item.icon;
                  if ('submenu' in item && item.submenu) {
                    const isSubmenuActive = Array.isArray(item.submenu) && item.submenu?.length > 0 ? item.submenu.some((subItem) => pathname === subItem.href) : false;
                    return (
                      <Sidebar.MenuItem key={item.href}>
                        <Sidebar.MenuSub defaultOpen={isSubmenuActive}>
                          <Sidebar.MenuSubTrigger>
                            <HugeiconsIcon icon={IconComponent} />
                            {item.title}
                          </Sidebar.MenuSubTrigger>
                          <Sidebar.MenuSubContent>
                            {Array.isArray(item.submenu) && item.submenu.length > 0
                              ? item.submenu.map((subItem) => {
                                  const SubIconComponent = subItem.icon;
                                  return (
                                    <Sidebar.MenuButton asChild key={subItem.href} isActive={pathname === subItem.href}>
                                      <Link href={subItem.href} prefetch>
                                        <HugeiconsIcon icon={SubIconComponent} />
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
                          <HugeiconsIcon icon={IconComponent} />
                          <span className="rt-SidebarMenuLabel">{item.title}</span>
                        </Link>
                      </Sidebar.MenuButton>
                    </Sidebar.MenuItem>
                  );
                })}
              </Sidebar.GroupContent>
            </Sidebar.Group>
          ))}
        </Sidebar.Menu>
      </Sidebar.Content>
      <Sidebar.Footer>
        <Flex gap="0">
          <IconButton asChild variant="ghost" highContrast>
            <Link href="https://github.com/KushagraDhawan1997/kookie-ui" target="_blank">
              <HugeiconsIcon icon={Github01Icon} />
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
        resizable
        defaultState={{ initial: 'collapsed', sm: 'expanded' }}
        onStateChange={(state) => setSidebarPresentation(state === 'thin' ? 'thin' : 'expanded')}
        presentation={{ initial: 'overlay', sm: 'fixed' }}
      >
        <AppSidebarContent presentation={sidebarPresentation} />
      </Shell.Sidebar>

      <Shell.Content>
        <Flex display={{ initial: 'flex', sm: 'none' }} position="fixed" top="4" left="4" align="center" justify="center" width="auto" height="auto" style={{ zIndex: 999 }}>
          <IconButton variant="ghost" size="3" highContrast color="gray" asChild>
            <Shell.Trigger target="sidebar">
              <HugeiconsIcon icon={Menu01Icon} />
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
