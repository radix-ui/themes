'use client';

import * as React from 'react';
import { Sheet, Button, Flex, Text, VisuallyHidden } from '@kushagradhawan/kookie-ui';

export default function Page() {
  const [topSheetOpen, setTopSheetOpen] = React.useState(false);
  const [startSheetOpen, setStartSheetOpen] = React.useState(false);
  const [endSheetOpen, setEndSheetOpen] = React.useState(false);

  return (
    <Flex direction="column" align="start" p="4" gap="3">
      <Flex gap="3">
        <Sheet.Root open={topSheetOpen} onOpenChange={setTopSheetOpen}>
          <Sheet.Trigger>
            <Button>Top Sheet</Button>
          </Sheet.Trigger>
          <Sheet.Content side="top" height={{ initial: '45vh', md: '60vh' }}>
            <Sheet.Title>
              <VisuallyHidden>Top Sheet</VisuallyHidden>
            </Sheet.Title>
            <Flex direction="column" gap="3" p="3">
              <Text size="2" color="gray">
                Top sheet content
              </Text>
              <Sheet.Close>
                <Button variant="soft" size="2">
                  Close
                </Button>
              </Sheet.Close>
            </Flex>
          </Sheet.Content>
        </Sheet.Root>

        <Sheet.Root open={startSheetOpen} onOpenChange={setStartSheetOpen}>
          <Sheet.Trigger>
            <Button>Left Sheet</Button>
          </Sheet.Trigger>
          <Sheet.Content side="start" width={{ initial: '280px', md: '360px' }}>
            <Sheet.Title>
              <VisuallyHidden>Left Sheet</VisuallyHidden>
            </Sheet.Title>
            <Flex direction="column" gap="3" p="3">
              <Text size="2" color="gray">
                Left sheet content
              </Text>
              <Sheet.Close>
                <Button variant="soft" size="2">
                  Close
                </Button>
              </Sheet.Close>
            </Flex>
          </Sheet.Content>
        </Sheet.Root>

        <Sheet.Root open={endSheetOpen} onOpenChange={setEndSheetOpen}>
          <Sheet.Trigger>
            <Button>Right Sheet</Button>
          </Sheet.Trigger>
          <Sheet.Content side="right" width={{ initial: '280px', md: '360px' }}>
            <Sheet.Title>
              <VisuallyHidden>Right Sheet</VisuallyHidden>
            </Sheet.Title>
            <Flex direction="column" gap="3" p="3">
              <Text size="2" color="gray">
                Right sheet content
              </Text>
              <Sheet.Close>
                <Button variant="soft" size="2">
                  Close
                </Button>
              </Sheet.Close>
            </Flex>
          </Sheet.Content>
        </Sheet.Root>
      </Flex>
    </Flex>
  );
}
