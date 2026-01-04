'use client';

import React from 'react';
import { Callout } from '@kushagradhawan/kookie-ui';
import { HugeiconsIcon } from '@hugeicons/react';
import { InformationCircleIcon } from '@hugeicons/core-free-icons';
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

const variants = ['soft', 'surface', 'outline'] as const;
const sizes = ['1', '2', '3'] as const;
const materials = ['solid', 'translucent'] as const;

export default function CalloutPlayground() {
  const [variant, setVariant] = React.useState<string>('soft');
  const [color, setColor] = React.useState<string>('theme');
  const [size, setSize] = React.useState<string>('2');
  const [highContrast, setHighContrast] = React.useState<boolean>(true);
  const [material, setMaterial] = React.useState<string>('theme');
  const [showIcon, setShowIcon] = React.useState<boolean>(true);

  const items = [
    {
      id: 'variant',
      label: 'Variant',
      type: 'select' as const,
      value: variant,
      onChange: setVariant,
      options: variants.map((v) => ({ label: v, value: v })),
      placeholder: 'Select variant',
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
      id: 'size',
      label: 'Size',
      type: 'select' as const,
      value: size,
      onChange: setSize,
      options: sizes.map((s) => ({ label: s, value: s })),
      placeholder: 'Select size',
    },
    {
      id: 'high-contrast',
      label: 'High Contrast',
      type: 'switch' as const,
      value: highContrast,
      onChange: setHighContrast,
    },
    {
      id: 'material',
      label: 'Material',
      type: 'select' as const,
      value: material,
      onChange: setMaterial,
      options: [{ label: 'Theme', value: 'theme' }, ...materials.map((m) => ({ label: m, value: m }))],
      placeholder: 'Theme',
    },
    {
      id: 'show-icon',
      label: 'Show Icon',
      type: 'switch' as const,
      value: showIcon,
      onChange: setShowIcon,
    },
  ];

  const generateCode = () => {
    const props = [`variant="${variant}"`, `size="${size}"`];

    if (color !== 'theme') props.push(`color="${color}"`);
    if (material !== 'theme') props.push(`material="${material}"`);
    if (highContrast) props.push('highContrast');

    const propsString = props.length > 0 ? `\n  ${props.join('\n  ')}` : '';

    const iconPart = showIcon
      ? `
  <Callout.Icon>
    <InformationCircleIcon />
  </Callout.Icon>`
      : '';

    return `<Callout.Root${propsString}>${iconPart}
  <Callout.Text>
    This is an informational callout message.
  </Callout.Text>
</Callout.Root>`;
  };

  return (
    <Playground
      component={
        <Callout.Root
          size={size as any}
          variant={variant as any}
          color={color === 'theme' ? undefined : (color as any)}
          material={material === 'theme' ? undefined : (material as any)}
          highContrast={highContrast || undefined}
        >
          {showIcon && (
            <Callout.Icon>
              <HugeiconsIcon icon={InformationCircleIcon} strokeWidth={1.75} />
            </Callout.Icon>
          )}
          <Callout.Text>This is an informational callout message.</Callout.Text>
        </Callout.Root>
      }
      code={generateCode()}
      items={items}
      showBackground={material === 'translucent'}
      hint={material === 'translucent' ? 'Translucent material is best observed with soft or surface variants.' : undefined}
    />
  );
}
