'use client';

import React from 'react';
import { Button } from '@kushagradhawan/kookie-ui';
import { Plus } from 'lucide-react';
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

const variants = ['classic', 'solid', 'soft', 'surface', 'outline', 'ghost'] as const;
const sizes = ['1', '2', '3', '4'] as const;
const radiusOptions = ['none', 'small', 'medium', 'large', 'full'] as const;
const materials = ['solid', 'translucent'] as const;
const states = ['default', 'disabled', 'loading'] as const;

export default function ButtonPlayground() {
  const [variant, setVariant] = React.useState<string>('solid');
  const [color, setColor] = React.useState<string>('theme');
  const [radius, setRadius] = React.useState<string>('theme');
  const [size, setSize] = React.useState<string>('3');
  const [highContrast, setHighContrast] = React.useState<boolean>(false);
  const [material, setMaterial] = React.useState<string>('theme');
  const [state, setState] = React.useState<string>('default');
  const [iconPosition, setIconPosition] = React.useState<string>('none');

  const isDisabled = state === 'disabled';
  const isLoading = state === 'loading';

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
      id: 'radius',
      label: 'Radius',
      type: 'select' as const,
      value: radius,
      onChange: setRadius,
      options: [{ label: 'Theme', value: 'theme' }, ...radiusOptions.map((r) => ({ label: r, value: r }))],
      placeholder: 'Theme',
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
      id: 'state',
      label: 'State',
      type: 'select' as const,
      value: state,
      onChange: setState,
      options: states.map((s) => ({ label: s, value: s })),
      placeholder: 'Select state',
    },
    {
      id: 'icon-position',
      label: 'Icon',
      type: 'select' as const,
      value: iconPosition,
      onChange: setIconPosition,
      options: [
        { label: 'None', value: 'none' },
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
        { label: 'Both', value: 'both' },
      ],
      placeholder: 'Select icon position',
    },
  ];

  // Generate elegant code string with all props (except theme values)
  const generateCode = () => {
    const props = [`variant="${variant}"`, `size="${size}"`];

    // Add non-theme props
    if (color !== 'theme') props.push(`color="${color}"`);
    if (radius !== 'theme') props.push(`radius="${radius}"`);
    if (material !== 'theme') props.push(`material="${material}"`);

    // Add boolean props
    if (highContrast) props.push('highContrast');
    if (isDisabled) props.push('disabled');
    if (isLoading) props.push('loading');

    // Generate button content with icons
    const iconLeft = iconPosition === 'left' || iconPosition === 'both';
    const iconRight = iconPosition === 'right' || iconPosition === 'both';

    let content = 'Button';
    if (iconLeft && iconRight) {
      content = '<Plus />\n  Button\n  <Plus />';
    } else if (iconLeft) {
      content = '<Plus />\n  Button';
    } else if (iconRight) {
      content = 'Button\n  <Plus />';
    }

    // Format props nicely
    const propsString = props.length > 0 ? `\n  ${props.join('\n  ')}` : '';

    return `<Button${propsString}>
  ${content}
</Button>`;
  };

  return (
    <Playground
      component={
        <Button
          size={size as any}
          variant={variant as any}
          color={color === 'theme' ? ('' as any) : (color as any)}
          radius={radius === 'theme' ? undefined : (radius as any)}
          highContrast={highContrast || undefined}
          material={material === 'theme' ? undefined : (material as any)}
          disabled={isDisabled}
          loading={isLoading}
        >
          {iconPosition === 'left' || iconPosition === 'both' ? <Plus /> : null}
          Button
          {iconPosition === 'right' || iconPosition === 'both' ? <Plus /> : null}
        </Button>
      }
      code={generateCode()}
      items={items}
      showBackground={material === 'translucent'}
    />
  );
}
