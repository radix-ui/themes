'use client';

import * as React from 'react';
import { Shell, Flex, Text } from '@kushagradhawan/kookie-ui';

export default function ShellContentOnlyPage() {
  return (
    <Shell.Root>
      <Shell.Header>
        <Flex align="center" gap="3" px="3" py="2">
          <Text size="2" color="gray">
            Content Only
          </Text>
        </Flex>
      </Shell.Header>
      <Shell.Content>
        <Flex direction="column" gap="3" p="4">
          <Text size="2">Canvas/Workspace goes here</Text>
        </Flex>
      </Shell.Content>
    </Shell.Root>
  );
}
