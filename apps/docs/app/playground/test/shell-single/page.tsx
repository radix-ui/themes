'use client';

import * as React from 'react';
import { Shell, Flex, Text, Button } from '@kushagradhawan/kookie-ui';
import { PanelLeft } from 'lucide-react';

export default function ShellSingleMarkupPage() {
  return (
    <Shell.Root>
      <Shell.Header>
        <Flex align="center" gap="3" px="3" py="2">
          <Shell.Trigger side="start" aria-label="Toggle sidebar">
            <PanelLeft />
          </Shell.Trigger>
          <Text size="2" color="gray">
            Single Markup
          </Text>
        </Flex>
      </Shell.Header>

      <Shell.Sidebar side="start" defaultView="rail" as="div">
        <SingleSidebarContent />
      </Shell.Sidebar>

      <Shell.Content>
        <Flex direction="column" gap="3" p="4">
          <ActiveToolReadout />
        </Flex>
      </Shell.Content>
    </Shell.Root>
  );
}

function SingleSidebarContent() {
  const { rail, single, activeTool, setActiveTool } = Shell.useSidebar('start');

  return (
    <Flex direction="column" gap="2" px="2" py="2">
      <Flex align="center" gap="2">
        <Shell.Sidebar.Trigger aria-label="Toggle view" />
        {single.view === 'panel' ? (
          <Text size="3" weight="medium">
            Panel
          </Text>
        ) : null}
      </Flex>

      <Flex direction="column" gap="1">
        <Button size="2" variant="ghost" onClick={() => rail.onItemSelected('A')}>
          A
        </Button>
        <Button size="2" variant="ghost" onClick={() => rail.onItemSelected('B')}>
          B
        </Button>
        <Button size="2" variant="ghost" onClick={() => rail.onItemSelected('C')}>
          C
        </Button>
      </Flex>

      <Flex gap="2" align="center">
        <Button size="2" variant="outline" onClick={() => setActiveTool(null)}>
          Clear
        </Button>
        {single.view === 'panel' ? (
          <Text size="2" color="gray">
            Selected: {activeTool ?? 'None'}
          </Text>
        ) : null}
      </Flex>
    </Flex>
  );
}

function ActiveToolReadout() {
  const { activeTool } = Shell.useSidebar('start');
  return <Text size="2">Active Tool: {activeTool ?? 'None'}</Text>;
}
