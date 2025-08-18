'use client';

import * as React from 'react';
import { Shell, Flex, Text, Button } from '@kushagradhawan/kookie-ui';

export default function ShellRailContentPage() {
  return (
    <Shell.Root>
      <Shell.Header>
        <Flex align="center" gap="3" px="3" py="2">
          <Text size="2" color="gray">
            Rail + Content
          </Text>
        </Flex>
      </Shell.Header>

      <Shell.Sidebar side="start" as="div">
        <Shell.Sidebar.Rail>
          <RailOnlyDemo />
        </Shell.Sidebar.Rail>
      </Shell.Sidebar>

      <Shell.Content>
        <Flex direction="column" gap="3" p="4">
          <ActiveToolReadout />
        </Flex>
      </Shell.Content>
    </Shell.Root>
  );
}

function RailOnlyDemo() {
  const { onItemSelected } = Shell.useRailEvents();
  const { setActiveTool } = Shell.useSidebar('start');
  return (
    <Flex direction="column" align="center" gap="1" px="2" py="2">
      <Button size="2" variant="ghost" onClick={() => onItemSelected('A')}>
        A
      </Button>
      <Button size="2" variant="ghost" onClick={() => onItemSelected('B')}>
        B
      </Button>
      <Button size="2" variant="ghost" onClick={() => onItemSelected('C')}>
        C
      </Button>
      <Button size="2" variant="outline" onClick={() => setActiveTool(null)} mt="2">
        Clear
      </Button>
    </Flex>
  );
}

function ActiveToolReadout() {
  const { activeTool } = Shell.useSidebar('start');
  return <Text size="2">Active Tool: {activeTool ?? 'None'}</Text>;
}
