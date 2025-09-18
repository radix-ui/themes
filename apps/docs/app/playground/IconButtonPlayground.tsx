'use client';

import React from 'react';
import { IconButton, Text, Flex, Box, Card } from '@kushagradhawan/kookie-ui';
import { Plus } from 'lucide-react';
import { PropertyControl } from '../components/property-control';

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
const tooltipSides = ['top', 'right', 'bottom', 'left'] as const;

export default function IconButtonPlayground() {
  const [variant, setVariant] = React.useState<string>('solid');
  const [color, setColor] = React.useState<string>('theme');
  const [radius, setRadius] = React.useState<string>('theme');
  const [size, setSize] = React.useState<string>('3');
  const [highContrast, setHighContrast] = React.useState<boolean>(false);
  const [material, setMaterial] = React.useState<string>('theme');
  const [flush, setFlush] = React.useState<boolean>(false);
  const [fullWidth, setFullWidth] = React.useState<boolean>(false);
  const [state, setState] = React.useState<string>('default');
  const [tooltip, setTooltip] = React.useState<string>('');
  const [tooltipSide, setTooltipSide] = React.useState<string>('top');

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
      id: 'flush',
      label: 'Flush',
      type: 'switch' as const,
      value: flush,
      onChange: setFlush,
    },
    {
      id: 'full-width',
      label: 'Full Width',
      type: 'switch' as const,
      value: fullWidth,
      onChange: setFullWidth,
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
      id: 'tooltip-side',
      label: 'Tooltip',
      type: 'select' as const,
      value: tooltipSide,
      onChange: setTooltipSide,
      options: [{ label: 'None', value: 'top' }, ...tooltipSides.slice(1).map((s) => ({ label: s, value: s }))],
      placeholder: 'Select tooltip position',
    },
  ];

  return (
    <Flex direction={{ initial: 'column', md: 'row' }} gap="5" align="center">
      <Card size="3" variant="surface" style={{ width: '100%', height: '400px' }}>
        <Flex direction="column" align="center" justify="center" height="100%">
          <IconButton
            size={size as any}
            variant={variant as any}
            color={color === 'theme' ? ('' as any) : (color as any)}
            radius={radius === 'theme' ? undefined : (radius as any)}
            highContrast={highContrast || undefined}
            material={material === 'theme' ? undefined : (material as any)}
            flush={flush}
            fullWidth={fullWidth}
            disabled={isDisabled}
            loading={isLoading}
            tooltip={tooltipSide !== 'top' ? 'Plus icon' : undefined}
            tooltipSide={tooltipSide as any}
            aria-label="Plus icon"
          >
            <Plus />
          </IconButton>
        </Flex>
      </Card>

      <PropertyControl.Group width="288px" items={items} style={{ flexShrink: 0 }} />
    </Flex>
  );
}
