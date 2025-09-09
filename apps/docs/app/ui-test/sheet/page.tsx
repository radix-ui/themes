'use client';

import { Sheet, Flex, Text, Button } from '@kushagradhawan/kookie-ui';
import { Menu, X } from 'lucide-react';

export default function SheetTestPage() {
  return (
    <Flex direction="column" height="100vh" width="100%">
      {/* Header */}
      <Flex
        align="center"
        width="100%"
        px="4"
        py="3"
        gap="2"
        style={{ borderBottom: '1px solid var(--gray-6)' }}
      >
        <Sheet.Root>
          <Sheet.Trigger>
            <Button variant="ghost" size="2" highContrast color="gray">
              <Menu />
              Left Sheet
            </Button>
          </Sheet.Trigger>
          <Sheet.Content side="start" width={{ initial: '280px', md: '320px' }}>
            <Sheet.Title>Left Sheet</Sheet.Title>
            <Flex align="center" justify="center" height="100%" p="4">
              <Text>Left Sheet Content</Text>
            </Flex>
            <Sheet.Close>
              <Button
                variant="ghost"
                size="2"
                highContrast
                color="gray"
                style={{ position: 'absolute', top: '1rem', right: '1rem' }}
              >
                <X />
              </Button>
            </Sheet.Close>
          </Sheet.Content>
        </Sheet.Root>

        <Sheet.Root>
          <Sheet.Trigger>
            <Button variant="ghost" size="2" highContrast color="gray">
              <Menu />
              Right Sheet
            </Button>
          </Sheet.Trigger>
          <Sheet.Content side="end" width={{ initial: '280px', md: '360px' }}>
            <Sheet.Title>Right Sheet</Sheet.Title>
            <Flex align="center" justify="center" height="100%" p="4">
              <Text>Right Sheet Content</Text>
            </Flex>
            <Sheet.Close>
              <Button
                variant="ghost"
                size="2"
                highContrast
                color="gray"
                style={{ position: 'absolute', top: '1rem', right: '1rem' }}
              >
                <X />
              </Button>
            </Sheet.Close>
          </Sheet.Content>
        </Sheet.Root>

        <Sheet.Root>
          <Sheet.Trigger>
            <Button variant="ghost" size="2" highContrast color="gray">
              <Menu />
              Top Sheet
            </Button>
          </Sheet.Trigger>
          <Sheet.Content side="top" height={{ initial: '200px', md: '300px' }}>
            <Sheet.Title>Top Sheet</Sheet.Title>
            <Flex align="center" justify="center" height="100%" p="4">
              <Text>Top Sheet Content</Text>
            </Flex>
            <Sheet.Close>
              <Button
                variant="ghost"
                size="2"
                highContrast
                color="gray"
                style={{ position: 'absolute', top: '1rem', right: '1rem' }}
              >
                <X />
              </Button>
            </Sheet.Close>
          </Sheet.Content>
        </Sheet.Root>

        <Sheet.Root>
          <Sheet.Trigger>
            <Button variant="ghost" size="2" highContrast color="gray">
              <Menu />
              Bottom Sheet
            </Button>
          </Sheet.Trigger>
          <Sheet.Content side="bottom" height={{ initial: '200px', md: '300px' }}>
            <Sheet.Title>Bottom Sheet</Sheet.Title>
            <Flex align="center" justify="center" height="100%" p="4">
              <Text>Bottom Sheet Content</Text>
            </Flex>
            <Sheet.Close>
              <Button
                variant="ghost"
                size="2"
                highContrast
                color="gray"
                style={{ position: 'absolute', top: '1rem', right: '1rem' }}
              >
                <X />
              </Button>
            </Sheet.Close>
          </Sheet.Content>
        </Sheet.Root>

        <Text size="2" weight="bold" style={{ marginLeft: 'auto' }}>
          Sheet Test
        </Text>
      </Flex>

      {/* Main Content */}
      <Flex align="center" justify="center" style={{ flex: '1' }} p="8">
        <Flex direction="column" align="center" gap="4">
          <Text size="2" weight="bold">
            Sheet Component Layout Test
          </Text>
          <Text size="2" color="gray">
            Click the buttons above to test different sheet positions
          </Text>
          <Flex gap="2" wrap="wrap" justify="center">
            <Text size="2" color="gray">
              • Left/Start
            </Text>
            <Text size="2" color="gray">
              • Right/End
            </Text>
            <Text size="2" color="gray">
              • Top
            </Text>
            <Text size="2" color="gray">
              • Bottom
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
