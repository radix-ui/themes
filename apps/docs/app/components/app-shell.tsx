'use client';

import React from 'react';
import { Shell, Flex, IconButton } from '@kushagradhawan/kookie-ui';
import { HugeiconsIcon } from '@hugeicons/react';
import { Menu01Icon } from '@hugeicons/core-free-icons';
import { AppSidebar } from './app-sidebar';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
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
        <AppSidebar presentation={sidebarPresentation} />
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
    </Shell.Root>
  );
}
