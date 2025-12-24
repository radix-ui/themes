'use client';

import React from 'react';
import { Sidebar, Flex, IconButton, Badge, Avatar } from '@kushagradhawan/kookie-ui';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { HugeiconsIcon } from '@hugeicons/react';
import { Github01Icon } from '@hugeicons/core-free-icons';
import { DarkModeToggle } from './dark-mode';
import { navigationGroups } from './navigation-config';

interface AppSidebarProps {
  presentation: 'thin' | 'expanded';
}

export function AppSidebar({ presentation }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <Sidebar.Root size="2" variant="soft" color="gray" menuVariant="soft" presentation={presentation}>
      <Sidebar.Header>
        <Flex justify="between" align="center" width="100%">
          <Link href="/" aria-label="Kushagra Dhawan - Homepage">
            <Flex align="center" gap="2">
              <Avatar fallback="K" size="2" src="/kookie-logo.png" />
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
