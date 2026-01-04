'use client';

import React from 'react';
import { Card, Flex } from '@kushagradhawan/kookie-ui';
import Playground from '@/components/playground';

const variants = ['surface', 'outline', 'classic', 'ghost', 'soft'] as const;
const sizes = ['1', '2', '3', '4', '5'] as const;
const materials = ['solid', 'translucent'] as const;

export default function CardPlayground() {
  const [variant, setVariant] = React.useState<string>('classic');
  const [size, setSize] = React.useState<string>('2');
  const [material, setMaterial] = React.useState<string>('theme');

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
      id: 'material',
      label: 'Material',
      type: 'select' as const,
      value: material,
      onChange: setMaterial,
      options: [{ label: 'Theme', value: 'theme' }, ...materials.map((m) => ({ label: m, value: m }))],
      placeholder: 'Theme',
    },
  ];

  const generateCode = () => {
    const props = [`variant="${variant}"`, `size="${size}"`];

    if (material !== 'theme') props.push(`material="${material}"`);

    const propsString = props.length > 0 ? `\n  ${props.join('\n  ')}` : '';

    return `<Card${propsString}>
  <Flex direction="column" gap="2">
    <Heading size="3">Card Title</Heading>
    <Text size="2">Card content goes here.</Text>
  </Flex>
</Card>`;
  };

  return (
    <Playground
      component={
        <Card size={size as any} variant={variant as any} material={material === 'theme' ? undefined : (material as any)} style={{ width: 280 }}>
          <Flex
            direction="column"
            gap="2"
            p="2"
            width="100%"
            height="320px"
            style={{
              border: '1px dashed var(--crimson-8)',
              borderRadius: 'var(--radius-2)',
              background: 'repeating-linear-gradient(135deg, transparent, transparent 4px, var(--crimson-3) 4px, var(--crimson-3) 5px)',
            }}
          ></Flex>
        </Card>
      }
      code={generateCode()}
      items={items}
      showBackground={material === 'translucent'}
      hint={material === 'translucent' ? 'Translucent material is best observed with surface or soft variants.' : undefined}
    />
  );
}
