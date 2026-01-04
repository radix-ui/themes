'use client';

import React from 'react';
import { Text } from '@kushagradhawan/kookie-ui';
import Playground from '@/components/playground';

const accentColors = [
  'gray',
  'gold',
  'bronze',
  'brown',
  'yellow',
  'amber',
  'orange',
  'tomato',
  'red',
  'ruby',
  'crimson',
  'pink',
  'plum',
  'purple',
  'violet',
  'iris',
  'indigo',
  'blue',
  'cyan',
  'teal',
  'jade',
  'green',
  'grass',
  'lime',
  'mint',
  'sky',
] as const;

const sizes = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
const weights = ['light', 'regular', 'medium', 'semibold', 'bold'] as const;
const aligns = ['left', 'center', 'right'] as const;

export default function TextPlayground() {
  const [size, setSize] = React.useState<string>('3');
  const [weight, setWeight] = React.useState<string>('theme');
  const [color, setColor] = React.useState<string>('theme');
  const [align, setAlign] = React.useState<string>('theme');
  const [highContrast, setHighContrast] = React.useState<boolean>(false);

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
      id: 'weight',
      label: 'Weight',
      type: 'select' as const,
      value: weight,
      onChange: setWeight,
      options: [{ label: 'Theme', value: 'theme' }, ...weights.map((w) => ({ label: w, value: w }))],
      placeholder: 'Theme',
    },
    {
      id: 'color',
      label: 'Color',
      type: 'select' as const,
      value: color,
      onChange: setColor,
      options: [{ label: 'Theme', value: 'theme' }, ...accentColors.map((c) => ({ label: c, value: c }))],
      placeholder: 'Theme',
      appearance: 'swatch' as const,
    },
    {
      id: 'align',
      label: 'Align',
      type: 'select' as const,
      value: align,
      onChange: setAlign,
      options: [{ label: 'Theme', value: 'theme' }, ...aligns.map((a) => ({ label: a, value: a }))],
      placeholder: 'Theme',
    },
    {
      id: 'high-contrast',
      label: 'High Contrast',
      type: 'switch' as const,
      value: highContrast,
      onChange: setHighContrast,
    },
  ];

  const generateCode = () => {
    const props = [`size="${size}"`];

    if (weight !== 'theme') props.push(`weight="${weight}"`);
    if (color !== 'theme') props.push(`color="${color}"`);
    if (align !== 'theme') props.push(`align="${align}"`);
    if (highContrast) props.push('highContrast');

    const propsString = props.length > 0 ? `\n  ${props.join('\n  ')}` : '';

    return `<Text${propsString}>
  The quick brown fox jumps over the lazy dog.
</Text>`;
  };

  return (
    <Playground
      component={
        <Text
          size={size as any}
          weight={weight === 'theme' ? undefined : (weight as any)}
          color={color === 'theme' ? undefined : (color as any)}
          align={align === 'theme' ? undefined : (align as any)}
          highContrast={highContrast || undefined}
        >
          The quick brown fox jumps over the lazy dog.
        </Text>
      }
      code={generateCode()}
      items={items}
    />
  );
}
