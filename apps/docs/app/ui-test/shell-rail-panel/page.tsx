'use client';

import * as React from 'react';
import { Shell, IconButton, Flex, Box, Text, Heading } from '@kushagradhawan/kookie-ui';
import { HugeiconsIcon } from '@hugeicons/react';
import { Menu01Icon, SidebarLeft01Icon, SidebarRight01Icon } from '@hugeicons/core-free-icons';

export default function ShellRailPanelTest() {
  return (
    <Shell.Root height="100vh">
      {/* Rail: always open by default */}
      <Shell.Rail
        defaultOpen={true}
        expandedSize={64}
        presentation={{ initial: 'overlay', sm: 'fixed' }}
      >
        <Flex direction="column" gap="2" p="2" align="center">
          <IconButton variant="ghost" size="2" asChild>
            <Shell.Trigger target="rail">
              <HugeiconsIcon icon={Menu01Icon} size={18} />
            </Shell.Trigger>
          </IconButton>
          <IconButton variant="ghost" size="2" asChild>
            <Shell.Trigger target="panel">
              <HugeiconsIcon icon={SidebarLeft01Icon} size={18} />
            </Shell.Trigger>
          </IconButton>
          <Box style={{ flex: 1 }} />
          <Text size="1" color="gray">Rail</Text>
        </Flex>
      </Shell.Rail>

      {/* Panel: responsive defaultOpen (closed on mobile, open on sm+) */}
      <Shell.Panel
        defaultOpen={{ initial: false, sm: true }}
        expandedSize={280}
        resizable
        minSize={200}
        maxSize={400}
      >
        <Flex direction="column" p="4" gap="4" style={{ height: '100%' }}>
          <Heading size="4">Panel</Heading>
          <Text size="2" color="gray">
            This panel is closed by default on mobile (initial), but open on sm breakpoint and above.
          </Text>
          <Box style={{ flex: 1 }}>
            <Text size="2">Navigation items would go here...</Text>
          </Box>
          <Text size="1" color="gray">
            Breakpoint: sm = 768px
          </Text>
        </Flex>
      </Shell.Panel>

      {/* Content */}
      <Shell.Content>
        <Box p="6">
          <Heading size="6" mb="4">Shell Rail + Panel Test</Heading>
          
          <Flex gap="3" mb="6" wrap="wrap">
            <IconButton variant="soft" size="3" asChild>
              <Shell.Trigger target="rail">
                <HugeiconsIcon icon={Menu01Icon} size={20} />
              </Shell.Trigger>
            </IconButton>
            <IconButton variant="soft" size="3" asChild>
              <Shell.Trigger target="panel">
                <HugeiconsIcon icon={SidebarLeft01Icon} size={20} />
              </Shell.Trigger>
            </IconButton>
          </Flex>

          <Box mb="6" p="4" style={{ background: 'var(--gray-2)', borderRadius: 'var(--radius-3)' }}>
            <Heading size="3" mb="2">Test Configuration</Heading>
            <Text as="div" size="2" mb="2">
              <strong>Rail:</strong> defaultOpen=true (always starts open)
            </Text>
            <Text as="div" size="2" mb="2">
              <strong>Panel:</strong> defaultOpen={`{{ initial: false, sm: true }}`}
            </Text>
            <Text as="div" size="2" mb="2">
              <strong>Rail presentation:</strong> {`{{ initial: 'overlay', sm: 'fixed' }}`}
            </Text>
            <Text as="div" size="2">
              <strong>Panel resizable:</strong> true (200px - 400px)
            </Text>
          </Box>

          <Box mb="6" p="4" style={{ background: 'var(--blue-2)', borderRadius: 'var(--radius-3)' }}>
            <Heading size="3" mb="2">Expected Behavior</Heading>
            <Text as="div" size="2" mb="2">
              • On mobile (initial): Rail open as overlay, Panel closed
            </Text>
            <Text as="div" size="2" mb="2">
              • On sm+ (≥768px): Rail open fixed, Panel open fixed
            </Text>
            <Text as="div" size="2" mb="2">
              • Closing Rail cascades to close Panel
            </Text>
            <Text as="div" size="2">
              • Panel can be resized by dragging the edge
            </Text>
          </Box>

          <Box p="4" style={{ background: 'var(--gray-3)', borderRadius: 'var(--radius-3)' }}>
            <Heading size="3" mb="2">Controls</Heading>
            <Text as="div" size="2" mb="3">
              Use the buttons above or in the Rail to toggle:
            </Text>
            <Flex gap="2" wrap="wrap">
              <IconButton variant="outline" asChild>
                <Shell.Trigger target="rail" action="expand">
                  <Text size="1">Expand Rail</Text>
                </Shell.Trigger>
              </IconButton>
              <IconButton variant="outline" asChild>
                <Shell.Trigger target="rail" action="collapse">
                  <Text size="1">Collapse Rail</Text>
                </Shell.Trigger>
              </IconButton>
              <IconButton variant="outline" asChild>
                <Shell.Trigger target="panel" action="expand">
                  <Text size="1">Expand Panel</Text>
                </Shell.Trigger>
              </IconButton>
              <IconButton variant="outline" asChild>
                <Shell.Trigger target="panel" action="collapse">
                  <Text size="1">Collapse Panel</Text>
                </Shell.Trigger>
              </IconButton>
            </Flex>
          </Box>
        </Box>
      </Shell.Content>
    </Shell.Root>
  );
}

