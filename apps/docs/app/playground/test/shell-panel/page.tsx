'use client';

import * as React from 'react';
import { Shell, Flex, Text, Button } from '@kushagradhawan/kookie-ui';

export default function ShellPanelContentPage() {
  return (
    <Shell.Root>
      <Shell.Header>
        <Flex align="center" gap="3" px="3" py="2">
          <Text size="2" color="gray">
            Panel + Content
          </Text>
        </Flex>
      </Shell.Header>

      <Shell.Sidebar side="start" as="div">
        <Shell.Sidebar.Panel>
          <PanelOnlyDemo />
        </Shell.Sidebar.Panel>
      </Shell.Sidebar>

      <Shell.Content>
        <Flex direction="column" gap="3" p="4">
          <ActiveContextReadout />
        </Flex>
      </Shell.Content>
    </Shell.Root>
  );
}

function PanelOnlyDemo() {
  const { setActiveContext, activeContext } = Shell.useSidebar('start');
  return (
    <Flex direction="column" gap="2" px="3" py="3">
      <Text size="3" weight="medium">
        Context
      </Text>
      <Button variant="ghost" size="2" onClick={() => setActiveContext('layer-1')}>
        Layer 1
      </Button>
      <Button variant="ghost" size="2" onClick={() => setActiveContext('layer-2')}>
        Layer 2
      </Button>
      <Button variant="outline" size="2" onClick={() => setActiveContext(null)}>
        Clear
      </Button>
      <Text size="1" color="gray">
        Active: {activeContext ?? 'None'}
      </Text>
    </Flex>
  );
}

function ActiveContextReadout() {
  const { activeContext } = Shell.useSidebar('start');
  return <Text size="2">Active Context: {activeContext ?? 'None'}</Text>;
}
