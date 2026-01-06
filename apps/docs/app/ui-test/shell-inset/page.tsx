'use client';

import * as React from 'react';
import { Shell, IconButton, Flex, Box, Text, Heading, Button, SegmentedControl } from '@kushagradhawan/kookie-ui';
import { HugeiconsIcon } from '@hugeicons/react';
import { Menu01Icon, SidebarLeft01Icon, Settings01Icon, GridViewIcon } from '@hugeicons/core-free-icons';

type InsetConfig = {
  sidebar: boolean;
  content: boolean;
  inspector: boolean;
  bottom: boolean;
};

export default function ShellInsetTest() {
  const [insetConfig, setInsetConfig] = React.useState<InsetConfig>({
    sidebar: true,
    content: true,
    inspector: true,
    bottom: false,
  });

  const toggleInset = (key: keyof InsetConfig) => {
    setInsetConfig((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <Shell.Root height="100vh">
      {/* Sidebar with inset */}
      <Shell.Sidebar
        defaultState="expanded"
        expandedSize={280}
        thinSize={64}
        presentation={{ initial: 'overlay', md: 'fixed' }}
        inset={insetConfig.sidebar}
      >
        <Flex direction="column" gap="4" p="4" style={{ height: '100%' }}>
          <Flex align="center" gap="2">
            <IconButton variant="ghost" size="2" asChild>
              <Shell.Trigger target="sidebar">
                <HugeiconsIcon icon={Menu01Icon} size={18} />
              </Shell.Trigger>
            </IconButton>
            <Heading size="4">Sidebar</Heading>
          </Flex>
          
          <Text size="2" color="gray">
            {insetConfig.sidebar ? '✓ Inset enabled' : '✗ Inset disabled'}
          </Text>
          
          <Flex direction="column" gap="2" style={{ flex: 1 }}>
            <Text size="2">Navigation items...</Text>
          </Flex>
        </Flex>
      </Shell.Sidebar>

      {/* Content with inset */}
      <Shell.Content inset={insetConfig.content}>
        <Box p="6" style={{ height: '100%' }}>
          <Heading size="6" mb="4">Shell Inset Test</Heading>
          
          <Text size="2" color="gray" mb="6">
            The inset prop creates floating panes with a gray backdrop. Toggle each pane's inset below.
          </Text>

          {/* Inset Controls */}
          <Box mb="6" p="4" style={{ background: 'var(--gray-a3)', borderRadius: 'var(--radius-3)' }}>
            <Heading size="3" mb="4">Inset Controls</Heading>
            <Flex gap="3" wrap="wrap">
              <Button
                variant={insetConfig.sidebar ? 'solid' : 'outline'}
                onClick={() => toggleInset('sidebar')}
              >
                Sidebar: {insetConfig.sidebar ? 'ON' : 'OFF'}
              </Button>
              <Button
                variant={insetConfig.content ? 'solid' : 'outline'}
                onClick={() => toggleInset('content')}
              >
                Content: {insetConfig.content ? 'ON' : 'OFF'}
              </Button>
              <Button
                variant={insetConfig.inspector ? 'solid' : 'outline'}
                onClick={() => toggleInset('inspector')}
              >
                Inspector: {insetConfig.inspector ? 'ON' : 'OFF'}
              </Button>
              <Button
                variant={insetConfig.bottom ? 'solid' : 'outline'}
                onClick={() => toggleInset('bottom')}
              >
                Bottom: {insetConfig.bottom ? 'ON' : 'OFF'}
              </Button>
            </Flex>
          </Box>

          {/* Pane Controls */}
          <Box mb="6" p="4" style={{ background: 'var(--blue-a3)', borderRadius: 'var(--radius-3)' }}>
            <Heading size="3" mb="4">Pane Toggles</Heading>
            <Flex gap="3" wrap="wrap">
              <IconButton variant="soft" size="3" asChild>
                <Shell.Trigger target="sidebar">
                  <HugeiconsIcon icon={SidebarLeft01Icon} size={20} />
                </Shell.Trigger>
              </IconButton>
              <IconButton variant="soft" size="3" asChild>
                <Shell.Trigger target="inspector">
                  <HugeiconsIcon icon={Settings01Icon} size={20} />
                </Shell.Trigger>
              </IconButton>
              <IconButton variant="soft" size="3" asChild>
                <Shell.Trigger target="bottom">
                  <HugeiconsIcon icon={GridViewIcon} size={20} />
                </Shell.Trigger>
              </IconButton>
            </Flex>
          </Box>

          {/* Current State */}
          <Box p="4" style={{ background: 'var(--gray-a3)', borderRadius: 'var(--radius-3)' }}>
            <Heading size="3" mb="2">How Inset Works</Heading>
            <Text as="div" size="2" mb="2">
              • Shell body gets <code>background: var(--gray-2)</code> when any pane has inset
            </Text>
            <Text as="div" size="2" mb="2">
              • Each inset pane gets <code>margin</code> and <code>border-radius</code>
            </Text>
            <Text as="div" size="2" mb="2">
              • Visual styling (shadow, bg) is handled by child components
            </Text>
            <Text as="div" size="2">
              • Adjacent inset panes have 2x gap between them
            </Text>
          </Box>
        </Box>
      </Shell.Content>

      {/* Inspector with inset */}
      <Shell.Inspector
        defaultOpen={{ initial: false, lg: true }}
        expandedSize={300}
        presentation={{ initial: 'overlay', lg: 'fixed' }}
        inset={insetConfig.inspector}
      >
        <Flex direction="column" gap="4" p="4" style={{ height: '100%' }}>
          <Heading size="4">Inspector</Heading>
          <Text size="2" color="gray">
            {insetConfig.inspector ? '✓ Inset enabled' : '✗ Inset disabled'}
          </Text>
          <Text size="2">Property panel content...</Text>
        </Flex>
      </Shell.Inspector>

      {/* Bottom with inset */}
      <Shell.Bottom
        defaultOpen={false}
        expandedSize={200}
        inset={insetConfig.bottom}
      >
        <Flex direction="column" gap="2" p="4" style={{ height: '100%' }}>
          <Heading size="4">Bottom Panel</Heading>
          <Text size="2" color="gray">
            {insetConfig.bottom ? '✓ Inset enabled' : '✗ Inset disabled'}
          </Text>
          <Text size="2">Terminal / logs content...</Text>
        </Flex>
      </Shell.Bottom>
    </Shell.Root>
  );
}

