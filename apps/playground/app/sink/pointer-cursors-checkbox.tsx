'use client';
import { Box, Checkbox, Text } from '@radix-ui/themes';
import React from 'react';

export function PointerCursorsCheckbox() {
  const [checked, setChecked] = React.useState(false);

  return (
    <Box>
      <label>
        <Checkbox mr="2" onCheckedChange={(value) => setChecked(!!value)} />
        <Text size="2">Use pointer cursors</Text>
      </label>
      {checked && (
        <style>
          {`
            .radix-themes {
              --cursor-link: pointer;
              --cursor-button: pointer;
              --cursor-menu: pointer;
              --cursor-disabled: default;
            }
          `}
        </style>
      )}
    </Box>
  );
}
