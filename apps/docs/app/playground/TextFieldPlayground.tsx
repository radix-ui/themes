'use client';

import React from 'react';
import { TextField, Text } from '@kushagradhawan/kookie-ui';
import { HugeiconsIcon } from '@hugeicons/react';
import { Search01Icon } from '@hugeicons/core-free-icons';
import Playground from '../components/playground';

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

const variants = ['classic', 'surface', 'soft', 'outline', 'ghost'] as const;
const sizes = ['1', '2', '3'] as const;
const radiusOptions = ['none', 'small', 'medium', 'large', 'full'] as const;
const materials = ['solid', 'translucent'] as const;
const states = ['default', 'disabled', 'readOnly'] as const;
const slotOptions = ['none', 'left', 'right', 'both'] as const;

export default function TextFieldPlayground() {
  const [variant, setVariant] = React.useState<string>('surface');
  const [color, setColor] = React.useState<string>('theme');
  const [radius, setRadius] = React.useState<string>('theme');
  const [size, setSize] = React.useState<string>('2');
  const [material, setMaterial] = React.useState<string>('theme');
  const [state, setState] = React.useState<string>('default');
  const [slot, setSlot] = React.useState<string>('left');
  const [scrub, setScrub] = React.useState<boolean>(true);
  const [scrubValue, setScrubValue] = React.useState<number>(100);

  const isDisabled = state === 'disabled';
  const isReadOnly = state === 'readOnly';

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
      options: states.map((s) => ({ label: s === 'readOnly' ? 'Read Only' : s, value: s })),
      placeholder: 'Select state',
    },
    {
      id: 'slot',
      label: 'Slot',
      type: 'select' as const,
      value: slot,
      onChange: setSlot,
      options: slotOptions.map((s) => ({ label: s === 'none' ? 'None' : s, value: s })),
      placeholder: 'Select slot',
    },
    {
      id: 'scrub',
      label: 'Scrub',
      type: 'switch' as const,
      value: scrub,
      onChange: setScrub,
    },
  ];

  // Generate code string
  const generateCode = () => {
    const props = [`variant="${variant}"`, `size="${size}"`];

    if (color !== 'theme') props.push(`color="${color}"`);
    if (radius !== 'theme') props.push(`radius="${radius}"`);
    if (material !== 'theme') props.push(`material="${material}"`);
    if (isDisabled) props.push('disabled');
    if (isReadOnly) props.push('readOnly');

    const propsString = props.length > 0 ? `\n  ${props.join('\n  ')}` : '';
    const hasLeftSlot = slot === 'left' || slot === 'both';
    const hasRightSlot = slot === 'right' || slot === 'both';

    if (!hasLeftSlot && !hasRightSlot) {
      return `<TextField.Root${propsString}
  placeholder="Enter text"
/>`;
    }

    let content = '';
    if (hasLeftSlot) {
      if (scrub) {
        content += `\n  <TextField.Slot
    scrub
    scrubValue={value}
    scrubMin={0}
    scrubMax={1000}
    onScrub={(delta) => setValue(prev => prev + delta)}
  >
    <Text size="2" weight="medium">Width</Text>
  </TextField.Slot>`;
      } else {
        content += `\n  <TextField.Slot>\n    <SearchIcon />\n  </TextField.Slot>`;
      }
    }
    if (hasRightSlot) {
      content += `\n  <TextField.Slot side="right">\n    <Text size="1" color="gray">px</Text>\n  </TextField.Slot>`;
    }

    return `<TextField.Root${propsString}
  type="number"
  value={${scrubValue}}
>${content}
</TextField.Root>`;
  };

  const hasLeftSlot = slot === 'left' || slot === 'both';
  const hasRightSlot = slot === 'right' || slot === 'both';

  return (
    <Playground
      component={
        <TextField.Root
          size={size as any}
          variant={variant as any}
          color={color === 'theme' ? undefined : (color as any)}
          radius={radius === 'theme' ? undefined : (radius as any)}
          material={material === 'theme' ? undefined : (material as any)}
          disabled={isDisabled}
          readOnly={isReadOnly}
          type={hasLeftSlot && scrub ? 'number' : 'text'}
          value={hasLeftSlot && scrub ? scrubValue : undefined}
          onChange={hasLeftSlot && scrub ? (e) => setScrubValue(Number(e.target.value) || 0) : undefined}
          placeholder={hasLeftSlot && scrub ? undefined : 'Enter text'}
          style={{ width: 240 }}
        >
          {hasLeftSlot && (
            <TextField.Slot
              scrub={scrub}
              scrubValue={scrubValue}
              scrubMin={0}
              scrubMax={1000}
              onScrub={(delta) => setScrubValue((prev) => Math.max(0, Math.min(1000, Math.round(prev + delta))))}
            >
              {scrub ? (
                <Text size="2" weight="medium">Width</Text>
              ) : (
                <HugeiconsIcon icon={Search01Icon} />
              )}
            </TextField.Slot>
          )}
          {hasRightSlot && (
            <TextField.Slot side="right">
              <Text size="1" color="gray">px</Text>
            </TextField.Slot>
          )}
        </TextField.Root>
      }
      code={generateCode()}
      items={items}
    />
  );
}
