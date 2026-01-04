'use client';

import React from 'react';
import { TextField } from '@kushagradhawan/kookie-ui';
import { Search } from 'lucide-react';
import Playground from '@/components/playground';

const variants = ['classic', 'surface', 'soft', 'outline'] as const;
const sizes = ['1', '2', '3'] as const;
const radiusOptions = ['none', 'small', 'medium', 'large', 'full'] as const;
const materials = ['solid', 'translucent'] as const;

export default function TextFieldPlayground() {
  const [variant, setVariant] = React.useState<string>('surface');
  const [size, setSize] = React.useState<string>('2');
  const [radius, setRadius] = React.useState<string>('theme');
  const [material, setMaterial] = React.useState<string>('theme');
  const [disabled, setDisabled] = React.useState<boolean>(false);
  const [error, setError] = React.useState<boolean>(false);
  const [showIcon, setShowIcon] = React.useState<boolean>(false);

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
    {
      id: 'disabled',
      label: 'Disabled',
      type: 'switch' as const,
      value: disabled,
      onChange: setDisabled,
    },
    {
      id: 'error',
      label: 'Error',
      type: 'switch' as const,
      value: error,
      onChange: setError,
    },
  ];

  const generateCode = () => {
    const props = [`variant="${variant}"`, `size="${size}"`, 'placeholder="Enter text"'];

    if (radius !== 'theme') props.push(`radius="${radius}"`);
    if (material !== 'theme') props.push(`material="${material}"`);
    if (disabled) props.push('disabled');
    if (error) props.push('error');

    const propsString = props.length > 0 ? `\n  ${props.join('\n  ')}` : '';

    if (showIcon) {
      return `<TextField.Root${propsString}>
  <TextField.Slot>
    <Search />
  </TextField.Slot>
</TextField.Root>`;
    }

    return `<TextField.Root${propsString} />`;
  };

  return (
    <Playground
      component={
        <TextField.Root
          variant={variant as any}
          size={size as any}
          radius={radius === 'theme' ? undefined : (radius as any)}
          material={material === 'theme' ? undefined : (material as any)}
          disabled={disabled}
          error={error}
          placeholder="Enter text"
          style={{ width: 240 }}
        >
          {showIcon && (
            <TextField.Slot>
              <Search size={16} />
            </TextField.Slot>
          )}
        </TextField.Root>
      }
      code={generateCode()}
      items={items}
      showBackground={material === 'translucent'}
      hint={material === 'translucent' ? 'Translucent material adds backdrop blur for depth over complex backgrounds.' : undefined}
    />
  );
}
