'use client';

import * as React from 'react';
import { Box, Flex, Text, Theme, Slider } from '@kushagradhawan/kookie-ui';

export default function TestPerformancePage() {
  const [value, setValue] = React.useState([60]);

  return (
    <Flex align="center" justify="center" style={{ height: '100vh', width: '100%' }}>
      <Flex direction="column" gap="4" align="center">
        <Text size="3" weight="medium">
          {value[0]}
        </Text>
        <Slider
          size="4"
          variant="surface"
          value={value}
          onValueChange={setValue}
          min={1}
          max={180}
          snapToTicks
          ticks={[
            { value: 1, label: '1' },
            { value: 15, label: '15' },
            { value: 30, label: '30' },
            { value: 45, label: '45' },
            { value: 60, label: '60' },
            { value: 75, label: '75' },
            { value: 90, label: '90' },
            { value: 105, label: '105' },
            { value: 120, label: '120' },
            { value: 135, label: '135' },
            { value: 150, label: '150' },
            { value: 165, label: '165' },
            { value: 180, label: '180' },
          ]}
          style={{ width: '800px' }}
        />
      </Flex>
    </Flex>
  );
}
