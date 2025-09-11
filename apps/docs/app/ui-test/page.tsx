'use client';

import { Shell, Flex, Text, IconButton } from '@kushagradhawan/kookie-ui';
import { GripVertical, PanelLeft } from 'lucide-react';

export default function UITestPage() {
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
            <Shell.Trigger target="rail" action="toggle" peekOnHover={true}>
              <PanelLeft />
            </Shell.Trigger>
          </IconButton>
          <IconButton variant="ghost" size="2" asChild highContrast color="gray">
            <Shell.Trigger target="panel" action="toggle" peekOnHover={true}>
              <PanelLeft />
            </Shell.Trigger>
          </IconButton>
          <IconButton variant="ghost" size="2" asChild highContrast color="gray">
            <Shell.Trigger target="bottom" action="toggle" peekOnHover={true}>
              <PanelLeft />
            </Shell.Trigger>
          </IconButton>
          <IconButton variant="ghost" size="2" asChild highContrast color="gray">
            <Shell.Trigger target="inspector" action="toggle" peekOnHover={true}>
              <PanelLeft />
            </Shell.Trigger>
          </IconButton>
          <Text size="2" weight="bold">
            Simple Shell Test
          </Text>
        </Flex>
      </Shell.Header>

      <Shell.Rail
        defaultMode={{ initial: 'expanded', xs: 'collapsed', md: 'expanded' }}
        expandedSize={64}
        presentation={{ initial: 'stacked', xs: 'overlay', md: 'stacked' }}
      >
        <Flex align="center" justify="center" height="100%">
          <Shell.Trigger target="panel" action="toggle" peekOnHover={true}>
            <IconButton variant="classic" color="gray" highContrast as="div">
              <PanelLeft />
            </IconButton>
          </Shell.Trigger>
        </Flex>
      </Shell.Rail>

      <Shell.Panel
        resizable
        collapsible={false}
        minSize={100}
        maxSize={500}
        expandedSize={280}
        snapPoints={[240, 280, 320, 480]}
        snapTolerance={Infinity}
        collapseThreshold={120}
        paneId="left-panel"
        persistence={lsPane('ui-test:left-panel')}
      >
        <Flex align="center" justify="center" height="100%">
          <Text>Panel</Text>
        </Flex>
        <Shell.Panel.Handle>
          <IconButton variant="soft" size="1" highContrast color="gray">
            <GripVertical />
          </IconButton>
        </Shell.Panel.Handle>
      </Shell.Panel>

      <Shell.Content>
        <Flex align="center" justify="center" height="100%">
          <Text>Content</Text>
        </Flex>
      </Shell.Content>

      <Shell.Bottom
        resizable
        minSize={60}
        maxSize={300}
        expandedSize={120}
        snapPoints={[80, 120, 160, 200]}
        snapTolerance={Infinity}
        collapseThreshold={80}
        defaultMode={{ initial: 'collapsed', sm: 'collapsed', md: 'expanded' }}
        presentation={{ initial: 'overlay', xs: 'stacked', sm: 'stacked' }}
        paneId="bottom-panel"
        persistence={lsPane('ui-test:bottom-panel')}
      >
        <Flex align="center" justify="center" height="100%">
          <Text>Bottom Panel</Text>
        </Flex>
        <Shell.Bottom.Handle>
          <IconButton variant="soft" size="1" highContrast color="gray">
            <GripVertical />
          </IconButton>
        </Shell.Bottom.Handle>
      </Shell.Bottom>

      <Shell.Inspector
        resizable
        minSize={100}
        maxSize={500}
        expandedSize={280}
        snapPoints={[240, 280, 320, 480]}
        snapTolerance={Infinity}
        collapseThreshold={120}
        defaultMode={{ initial: 'collapsed', xs: 'collapsed', md: 'collapsed' }}
        presentation="stacked"
      >
        <Flex align="center" justify="center" height="100%">
          <Text>Inspector</Text>
        </Flex>
        <Shell.Inspector.Handle>
          <IconButton variant="soft" size="1" highContrast color="gray">
            <GripVertical />
          </IconButton>
        </Shell.Inspector.Handle>
      </Shell.Inspector>
    </Shell.Root>
  );
}
