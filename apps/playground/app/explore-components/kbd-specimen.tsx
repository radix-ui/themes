'use client';

import * as React from 'react';

import { Flex, Kbd, Text } from '@radix-ui/themes';

export const KbdSpecimen = () => {
  type Platform = 'apple' | 'nonApple';

  const [platform, setPlatform] = React.useState<Platform | null>(null);

  // set user's platform
  React.useEffect(() => {
    if (typeof navigator !== 'undefined') {
      if (/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)) {
        setPlatform('apple');
      } else setPlatform('nonApple');
    }
  }, []);

  // display correct action key based on the user's platform
  const ActionKey = () => {
    if (platform === 'apple') return <>⌘ </>;
    return <>Ctrl+</>;
  };

  if (platform)
    return (
      <Flex direction="column" gap="4" my="6">
        <Text as="p" size="2">
          Press{' '}
          <Kbd>
            <ActionKey />C
          </Kbd>{' '}
          to show/hide the Theme Panel, or press{' '}
          <Kbd>
            <ActionKey />D
          </Kbd>{' '}
          to toggle dark mode.
        </Text>
        <Text as="p" size="3">
          Press{' '}
          <Kbd>
            <ActionKey />C
          </Kbd>{' '}
          to show/hide the Theme Panel, or press{' '}
          <Kbd>
            <ActionKey />D
          </Kbd>{' '}
          to toggle dark mode.
        </Text>
        <Text as="p" size="4">
          Press{' '}
          <Kbd>
            <ActionKey />C
          </Kbd>{' '}
          to show/hide the Theme Panel, or press{' '}
          <Kbd>
            <ActionKey />D
          </Kbd>{' '}
          to toggle dark mode.
        </Text>
        <Text as="p" size="5">
          Press{' '}
          <Kbd>
            <ActionKey />C
          </Kbd>{' '}
          to show/hide the Theme Panel, or press{' '}
          <Kbd>
            <ActionKey />D
          </Kbd>{' '}
          to toggle dark mode.
        </Text>
      </Flex>
    );
};
