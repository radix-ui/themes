'use client';
import { Box, Checkbox, Flex, Text } from '@radix-ui/themes';
import React from 'react';

export function PointerCursorsCheckbox() {
  const [checked, setChecked] = React.useState(false);

  return (
    <Box>
      <Text as="label" size="2">
        <Flex gap="2">
          <Checkbox onCheckedChange={(value) => setChecked(!!value)} />
          Use pointer cursors
        </Flex>
      </Text>
      {checked && (
        <style>
          {`
            .radix-themes {
              --cursor-button: pointer;
              --cursor-checkbox: pointer;
              --cursor-disabled: default;
              --cursor-link: pointer;
              --cursor-menu-item: pointer;
              --cursor-radio: pointer;
              --cursor-slider-thumb: grab;
              --cursor-slider-thumb-active: grabbing;
              --cursor-switch: pointer;
            }
          `}
        </style>
      )}
    </Box>
  );
}
