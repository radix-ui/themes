'use client';

import React from 'react';
import { Sheet, Button, Flex, Text } from '@kushagradhawan/kookie-ui';
import Playground from '@/components/playground';

const sides = ['start', 'end', 'top', 'bottom'] as const;
const materials = ['solid', 'translucent'] as const;
const widths = ['280px', '320px', '400px', '50%'] as const;
const heights = ['200px', '300px', '400px', '50%'] as const;

export default function SheetPlayground() {
  const [side, setSide] = React.useState<string>('end');
  const [material, setMaterial] = React.useState<string>('theme');
  const [width, setWidth] = React.useState<string>('320px');
  const [height, setHeight] = React.useState<string>('300px');
  const [open, setOpen] = React.useState(false);

  const isHorizontal = side === 'start' || side === 'end';

  const items = [
    {
      id: 'side',
      label: 'Side',
      type: 'select' as const,
      value: side,
      onChange: setSide,
      options: sides.map((s) => ({ label: s, value: s })),
      placeholder: 'Select side',
    },
    ...(isHorizontal
      ? [
          {
            id: 'width',
            label: 'Width',
            type: 'select' as const,
            value: width,
            onChange: setWidth,
            options: widths.map((w) => ({ label: w, value: w })),
            placeholder: 'Select width',
          },
        ]
      : [
          {
            id: 'height',
            label: 'Height',
            type: 'select' as const,
            value: height,
            onChange: setHeight,
            options: heights.map((h) => ({ label: h, value: h })),
            placeholder: 'Select height',
          },
        ]),
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
    const contentProps = [`side="${side}"`];
    if (isHorizontal && width !== '320px') contentProps.push(`width="${width}"`);
    if (!isHorizontal && height !== '300px') contentProps.push(`height="${height}"`);
    if (material !== 'theme') contentProps.push(`material="${material}"`);

    const contentPropsString = contentProps.length > 0 ? ` ${contentProps.join(' ')}` : '';

    return `<Sheet.Root>
  <Sheet.Trigger>
    <Button>Open Sheet</Button>
  </Sheet.Trigger>
  <Sheet.Content${contentPropsString}>
    <Sheet.Title>Sheet Title</Sheet.Title>
    <Sheet.Description>
      Sheet content goes here.
    </Sheet.Description>
    <Sheet.Close>
      <Button variant="soft">Close</Button>
    </Sheet.Close>
  </Sheet.Content>
</Sheet.Root>`;
  };

  return (
    <Playground
      component={
        <Sheet.Root open={open} onOpenChange={setOpen}>
          <Sheet.Trigger>
            <Button>Open Sheet</Button>
          </Sheet.Trigger>
          <Sheet.Content
            side={side as any}
            width={isHorizontal ? width : undefined}
            height={!isHorizontal ? height : undefined}
            material={material === 'theme' ? undefined : (material as any)}
          >
            <Flex direction="column" gap="4" p="4">
              <Flex direction="column" gap="1">
                <Sheet.Title>
                  <Text size="4" weight="bold">Sheet Title</Text>
                </Sheet.Title>
                <Sheet.Description>
                  <Text size="2" color="gray">
                    This is a sheet panel that slides in from the {side} side.
                  </Text>
                </Sheet.Description>
              </Flex>
              <Flex
                direction="column"
                gap="2"
                p="4"
                style={{
                  border: '1px dashed var(--gray-6)',
                  borderRadius: 'var(--radius-2)',
                  background: 'var(--gray-2)',
                  minHeight: '200px',
                }}
              >
                <Text size="2" color="gray">
                  Sheet content area
                </Text>
              </Flex>
              <Flex gap="2" justify="end">
                <Sheet.Close>
                  <Button variant="soft" color="gray">Cancel</Button>
                </Sheet.Close>
                <Sheet.Close>
                  <Button>Confirm</Button>
                </Sheet.Close>
              </Flex>
            </Flex>
          </Sheet.Content>
        </Sheet.Root>
      }
      code={generateCode()}
      items={items}
      showBackground={material === 'translucent'}
      hint={material === 'translucent' ? 'Translucent material creates a frosted glass effect over backgrounds.' : undefined}
    />
  );
}
