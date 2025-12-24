'use client';

import React from 'react';
import { Flex, Text, Select, Switch, Card } from '@kushagradhawan/kookie-ui';

interface SelectControl {
  id: string;
  label: string;
  type: 'select';
  value: string;
  onChange: (value: string) => void;
  options: Array<{ label: string; value: string }>;
  placeholder?: string;
  appearance?: 'swatch';
}

interface SwitchControl {
  id: string;
  label: string;
  type: 'switch';
  value: boolean;
  onChange: (checked: boolean) => void;
}

type ControlItem = SelectControl | SwitchControl;

interface PropertyControlGroupProps {
  items: ControlItem[];
  width?: string;
  style?: React.CSSProperties;
}

function PropertyControlGroup({ items, width, style }: PropertyControlGroupProps) {
  return (
    <Card size="1" variant="soft" style={{ width: width || '256px', ...style }}>
      <Flex direction="column" gap="4" p="4">
        {items.map((item) => {
          if (item.type === 'select') {
            return (
              <Flex key={item.id} direction="column" gap="2">
                <Text size="2" weight="medium" color="gray">
                  {item.label}
                </Text>
                <Select.Root value={item.value} onValueChange={item.onChange}>
                  <Select.Trigger placeholder={item.placeholder} />
                  <Select.Content>
                    {item.options.map((option) => (
                      <Select.Item key={option.value} value={option.value}>
                        {option.label}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Root>
              </Flex>
            );
          }

          if (item.type === 'switch') {
            return (
              <Flex key={item.id} direction="row" align="center" justify="between" gap="2">
                <Text size="2" weight="medium" color="gray">
                  {item.label}
                </Text>
                <Switch checked={item.value} onCheckedChange={item.onChange} />
              </Flex>
            );
          }

          return null;
        })}
      </Flex>
    </Card>
  );
}

export const PropertyControl = {
  Group: PropertyControlGroup,
};
