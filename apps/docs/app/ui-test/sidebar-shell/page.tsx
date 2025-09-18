'use client';

import { Shell, Flex, Text, IconButton } from '@kushagradhawan/kookie-ui';
import { GripVertical, PanelLeft } from 'lucide-react';

export default function SidebarTestPage() {
  const lsPane = (key: string) => ({
    load: () => {
      if (typeof window === 'undefined') return undefined;
      const v = localStorage.getItem(key);
      return v ? Number(v) : undefined;
    },
    save: (size: number) => {
      if (typeof window === 'undefined') return;
      localStorage.setItem(key, String(size));
    },
  });

  return (
    <Shell.Root>
      <Shell.Header height={64}>
        <Flex align="center" width="100%" px="4" gap="2">
          <IconButton variant="ghost" size="2" asChild highContrast color="gray">
            <Shell.Trigger target="sidebar" action="toggle" peekOnHover={true}>
              <PanelLeft />
            </Shell.Trigger>
          </IconButton>
          <Text size="2" weight="bold">
            Sidebar Test
          </Text>
        </Flex>
      </Shell.Header>

      <Shell.Sidebar
        resizable
        // style={{ background: 'red' }}
        minSize={160}
        maxSize={480}
        expandedSize={280}
        thinSize={64}
        state={{ initial: 'expanded', xs: 'expanded', md: 'expanded' }}
        toggleModes="both"
        presentation={{ initial: 'fixed', xs: 'overlay' }}
        paneId="side"
        persistence={lsPane('ui-test:sidebar')}
      >
        <Flex align="center" justify="center" height="100%">
          <Text>Sidebar</Text>
          <IconButton variant="ghost" size="2" asChild highContrast color="gray">
            <Shell.Trigger target="sidebar" action="toggle" peekOnHover={true}>
              <PanelLeft />
            </Shell.Trigger>
          </IconButton>
        </Flex>
        <Shell.Sidebar.Handle>
          <IconButton variant="soft" size="1" highContrast color="gray">
            <GripVertical />
          </IconButton>
        </Shell.Sidebar.Handle>
      </Shell.Sidebar>

      <Shell.Content>
        <Flex align="center" justify="center" height="100%">
          <Text>Content</Text>
        </Flex>
      </Shell.Content>
    </Shell.Root>
  );
}
