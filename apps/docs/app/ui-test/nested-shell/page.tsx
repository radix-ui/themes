'use client';

import { Shell, Flex, Text, IconButton, SegmentedControl } from '@kushagradhawan/kookie-ui';
import { Menu } from 'lucide-react';
import { useState } from 'react';

export default function NestedShellTestPage() {
  const [toggleMode, setToggleMode] = useState<'both' | 'thin' | 'expanded'>('both');

  const getToggleModes = (): Array<'thin' | 'expanded'> => {
    switch (toggleMode) {
      case 'thin':
        return ['thin'];
      case 'expanded':
        return ['expanded'];
      case 'both':
      default:
        return ['thin', 'expanded'];
    }
  };

  return (
    <Shell.Root>
      <Shell.Header height={64}>
        <Flex align="center" width="100%" px="4" gap="2">
          <IconButton variant="ghost" size="2" asChild highContrast color="gray">
            <Shell.Trigger target="rail" action="toggle">
              <Menu />
            </Shell.Trigger>
          </IconButton>
          <IconButton variant="ghost" size="2" asChild highContrast color="gray">
            <Shell.Trigger target="panel" action="toggle">
              <Menu />
            </Shell.Trigger>
          </IconButton>
          <IconButton variant="ghost" size="2" asChild highContrast color="gray">
            <Shell.Trigger target="inspector" action="toggle">
              <Menu />
            </Shell.Trigger>
          </IconButton>
          <Text size="2" weight="bold">
            Outer Shell
          </Text>
        </Flex>
      </Shell.Header>

      <Shell.Rail expandedSize={64} presentation="fixed">
        <Flex align="center" justify="center" height="100%">
          <Text>Rail</Text>
        </Flex>
      </Shell.Rail>

      <Shell.Panel resizable expandedSize={280}>
        <Flex align="center" justify="center" height="100%">
          <Text>Panel</Text>
        </Flex>
      </Shell.Panel>

      <Shell.Content>
        <Shell.Root height="100%">
          <Shell.Header height={48}>
            <Flex align="center" width="100%" px="3" gap="2">
              <IconButton variant="ghost" size="2" asChild highContrast color="gray">
                <Shell.Trigger target="sidebar" action="toggle">
                  <Menu />
                </Shell.Trigger>
              </IconButton>
              <IconButton variant="ghost" size="2" asChild highContrast color="gray">
                <Shell.Trigger target="inspector" action="toggle">
                  <Menu />
                </Shell.Trigger>
              </IconButton>
              <Text size="2" weight="bold">
                Nested Shell
              </Text>
              <Flex align="center" gap="3" ml="auto">
                <Text size="2" color="gray">
                  Toggle Mode:
                </Text>
                <SegmentedControl.Root value={toggleMode} size="1" onValueChange={(value: string) => setToggleMode(value as 'both' | 'thin' | 'expanded')}>
                  <SegmentedControl.Item value="both">Both</SegmentedControl.Item>
                  <SegmentedControl.Item value="thin">Thin Only</SegmentedControl.Item>
                  <SegmentedControl.Item value="expanded">Expanded Only</SegmentedControl.Item>
                </SegmentedControl.Root>
              </Flex>
            </Flex>
          </Shell.Header>

          <Shell.Sidebar expandedSize={200} thinSize={64} resizable presentation={{ initial: 'overlay', sm: 'fixed' }} toggleModes="both">
            <Flex align="center" justify="center" height="100%" direction="column" gap="2">
              <IconButton variant="ghost" size="2" asChild highContrast color="gray">
                <Shell.Trigger target="sidebar" action="toggle">
                  <Menu />
                </Shell.Trigger>
              </IconButton>
              <Text size="2" align="center">
                Toggle Mode: {toggleMode}
              </Text>
              <Text size="2" align="center">
                Nested Sidebar
              </Text>
            </Flex>
          </Shell.Sidebar>

          <Shell.Content>
            <Flex align="center" justify="center" height="100%" direction="column" gap="4">
              <Text size="2" weight="bold">
                Nested Content
              </Text>
              <Text size="2" color="gray">
                Click the menu button to toggle sidebar with different modes:
              </Text>
              <Flex direction="column" gap="2" align="center">
                <Text size="2">• Both: collapsed → thin → expanded → collapsed</Text>
                <Text size="2">• Thin Only: collapsed → thin → collapsed</Text>
                <Text size="2">• Expanded Only: collapsed → expanded → collapsed</Text>
              </Flex>
            </Flex>
          </Shell.Content>

          <Shell.Inspector resizable expandedSize={250} presentation={{ initial: 'fixed', xs: 'fixed' }}>
            <Flex align="center" justify="center" height="100%">
              <Text>Nested Inspector</Text>
            </Flex>
          </Shell.Inspector>
        </Shell.Root>
      </Shell.Content>

      <Shell.Inspector resizable expandedSize={320} presentation={{ initial: 'fixed', md: 'fixed' }}>
        <Flex align="center" justify="center" height="100%">
          <Text>Inspector</Text>
        </Flex>
      </Shell.Inspector>
    </Shell.Root>
  );
}
