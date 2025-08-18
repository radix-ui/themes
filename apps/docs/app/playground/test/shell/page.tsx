'use client';

import * as React from 'react';
import { Shell, Flex, Box, Text, Button } from '@kushagradhawan/kookie-ui';
import { PanelLeft } from 'lucide-react';

export default function ShellDemoPage() {
  return (
    <Shell.Root>
      <Shell.Header>
        <Flex align="center" gap="3" px="3" py="2">
          <Shell.Trigger side="start" aria-label="Toggle sidebar">
            <PanelLeft />
          </Shell.Trigger>
          <Text size="2" color="gray">
            Shell Demo
          </Text>
        </Flex>
      </Shell.Header>

      <Shell.Sidebar side="start" defaultValue="collapsed" as="div">
        <Shell.Sidebar.Rail>
          <RailDemo />
        </Shell.Sidebar.Rail>
        <Shell.Sidebar.Panel>
          <PanelDemo />
        </Shell.Sidebar.Panel>
      </Shell.Sidebar>

      <Shell.Content>
        <ContentLong />
      </Shell.Content>

      <Shell.Footer>
        <Flex align="center" px="3" style={{ inlineSize: '100%', blockSize: '56px' }}>
          <Text size="2" color="gray">
            Global Footer — outside content scroll
          </Text>
        </Flex>
      </Shell.Footer>
    </Shell.Root>
  );
}

function ContentLong() {
  return (
    <Box data-content px="4" py="4" height="300vh" style={{ inlineSize: '100%' }}>
      <Flex direction="column" gap="3">
        <Text size="2">Long content (300vh) for scroll testing</Text>
        <Text size="1" color="gray">
          Demonstrates the new Shell architecture where:
        </Text>
        <Text size="1" color="gray">
          • Rail emits ItemSelected events (stateless)
        </Text>
        <Text size="1" color="gray">
          • Panel renders based on active tool from Shell (stateless)
        </Text>
        <Text size="1" color="gray">
          • Shell coordinates everything
        </Text>
        <Text size="1" color="gray">
          • Panel automatically hides when no tool is active
        </Text>
      </Flex>
    </Box>
  );
}

function RailDemo() {
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

function PanelDemo() {
  const { activeTool } = Shell.usePanelState();
  const { panel } = Shell.useSidebar('start');

  return (
    <Flex direction="column" gap="2" px="3" py="3">
      <Text size="3" weight="medium">
        Active Tool: {activeTool || 'None'}
      </Text>

      {activeTool === 'A' && (
        <Box>
          <Text size="2" color="gray">
            Tool A Panel Content
          </Text>
          <Text size="1" color="gray">
            This is the contextual content for tool A.
          </Text>
        </Box>
      )}

      {activeTool === 'B' && (
        <Box>
          <Text size="2" color="gray">
            Tool B Panel Content
          </Text>
          <Text size="1" color="gray">
            This is the contextual content for tool B.
          </Text>
        </Box>
      )}

      {activeTool === 'C' && (
        <Box>
          <Text size="2" color="gray">
            Tool C Panel Content
          </Text>
          <Text size="1" color="gray">
            This is the contextual content for tool C.
          </Text>
        </Box>
      )}

      <Button size="1" variant="soft" onClick={() => panel.hide()}>
        Close Panel
      </Button>
    </Flex>
  );
}
