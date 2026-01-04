'use client';

import React from 'react';
import { SegmentedControl } from '@kushagradhawan/kookie-ui';
import Playground from '@/components/playground';

const sizes = ['1', '2', '3', '4'] as const;
const radiusOptions = ['none', 'small', 'medium', 'large', 'full'] as const;

export default function SegmentedControlPlayground() {
  const [size, setSize] = React.useState<string>('2');
  const [radius, setRadius] = React.useState<string>('theme');
  const [disabled, setDisabled] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>('grid');

  const items = [
    {
      id: 'size',
      label: 'Size',
      type: 'select' as const,
      value: size,
      onChange: setSize,
      options: sizes.map((s) => ({ label: s, value: s })),
      placeholder: 'Select size',
    },
    {
      id: 'radius',
      label: 'Radius',
      type: 'select' as const,
      value: radius,
      onChange: setRadius,
      options: [{ label: 'Theme', value: 'theme' }, ...radiusOptions.map((r) => ({ label: r, value: r }))],
      placeholder: 'Theme',
    },
    {
      id: 'disabled',
      label: 'Disabled',
      type: 'switch' as const,
      value: disabled,
      onChange: setDisabled,
    },
  ];

  const generateCode = () => {
    const props = [`size="${size}"`, 'defaultValue="grid"'];

    if (radius !== 'theme') props.push(`radius="${radius}"`);
    if (disabled) props.push('disabled');

    const propsString = props.length > 0 ? `\n  ${props.join('\n  ')}` : '';

    return `<SegmentedControl.Root${propsString}>
  <SegmentedControl.Item value="list">List</SegmentedControl.Item>
  <SegmentedControl.Item value="grid">Grid</SegmentedControl.Item>
  <SegmentedControl.Item value="board">Board</SegmentedControl.Item>
</SegmentedControl.Root>`;
  };

  return (
    <Playground
      component={
        <SegmentedControl.Root
          size={size as any}
          radius={radius === 'theme' ? undefined : (radius as any)}
          disabled={disabled}
          value={value}
          onValueChange={setValue}
        >
          <SegmentedControl.Item value="list">List</SegmentedControl.Item>
          <SegmentedControl.Item value="grid">Grid</SegmentedControl.Item>
          <SegmentedControl.Item value="board">Board</SegmentedControl.Item>
        </SegmentedControl.Root>
      }
      code={generateCode()}
      items={items}
    />
  );
}
