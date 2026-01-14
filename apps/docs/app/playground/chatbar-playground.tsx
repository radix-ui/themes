'use client';

import React from 'react';
import { Chatbar, IconButton } from '@kushagradhawan/kookie-ui';
import { HugeiconsIcon } from '@hugeicons/react';
import { Attachment01Icon } from '@hugeicons/core-free-icons';
import Playground from '@/components/playground';

const variants = ['classic', 'surface', 'soft', 'outline', 'ghost'] as const;
const sizes = ['1', '2', '3'] as const;
const radiusOptions = ['none', 'small', 'medium', 'large', 'full'] as const;
const materials = ['solid', 'translucent'] as const;
const expandOnOptions = ['none', 'focus', 'overflow', 'both'] as const;
const sendModeOptions = ['always', 'whenDirty', 'never'] as const;

export default function ChatbarPlayground() {
  const [variant, setVariant] = React.useState<string>('surface');
  const [size, setSize] = React.useState<string>('2');
  const [radius, setRadius] = React.useState<string>('theme');
  const [material, setMaterial] = React.useState<string>('theme');
  const [expandOn, setExpandOn] = React.useState<string>('both');
  const [sendMode, setSendMode] = React.useState<string>('whenDirty');
  const [disabled, setDisabled] = React.useState<boolean>(false);
  const [showAttach, setShowAttach] = React.useState<boolean>(false);
  const [textValue, setTextValue] = React.useState<string>('');

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
      id: 'expandOn',
      label: 'Expand On',
      type: 'select' as const,
      value: expandOn,
      onChange: setExpandOn,
      options: expandOnOptions.map((e) => ({ label: e, value: e })),
      placeholder: 'both',
    },
    {
      id: 'sendMode',
      label: 'Send Mode',
      type: 'select' as const,
      value: sendMode,
      onChange: setSendMode,
      options: sendModeOptions.map((s) => ({ label: s, value: s })),
      placeholder: 'whenDirty',
    },
    {
      id: 'show-attach',
      label: 'Show Attach',
      type: 'switch' as const,
      value: showAttach,
      onChange: setShowAttach,
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
    const props = [`variant="${variant}"`, `size="${size}"`];

    if (radius !== 'theme') props.push(`radius="${radius}"`);
    if (material !== 'theme') props.push(`material="${material}"`);
    if (expandOn !== 'both') props.push(`expandOn="${expandOn}"`);
    if (sendMode !== 'whenDirty') props.push(`sendMode="${sendMode}"`);
    if (disabled) props.push('disabled');

    const propsString = props.length > 0 ? `\n  ${props.join('\n  ')}` : '';

    const attachRow = showAttach
      ? `
    <Chatbar.RowStart>
      <Chatbar.AttachTrigger asChild>
        <IconButton variant="ghost" size="${size}" aria-label="Attach">
          <AttachmentIcon />
        </IconButton>
      </Chatbar.AttachTrigger>
    </Chatbar.RowStart>`
      : '';

    return `<Chatbar.Root${propsString}>${showAttach ? '\n  <Chatbar.AttachmentsRow />' : ''}
  <Chatbar.Textarea aria-label="Message" placeholder="Type a message..." />
  <Chatbar.InlineEnd>
    <Chatbar.Send />
  </Chatbar.InlineEnd>
  <Chatbar.Row>${attachRow}
    <Chatbar.RowEnd>
      <Chatbar.Send />
    </Chatbar.RowEnd>
  </Chatbar.Row>
</Chatbar.Root>`;
  };

  return (
    <Playground
      component={
        <Chatbar.Root
          variant={variant as any}
          size={size as any}
          radius={radius === 'theme' ? undefined : (radius as any)}
          material={material === 'theme' ? undefined : (material as any)}
          expandOn={expandOn as any}
          sendMode={sendMode as any}
          disabled={disabled}
          value={textValue}
          onValueChange={setTextValue}
          width={400}
          minLines={4}
        >
          {showAttach && <Chatbar.AttachmentsRow />}
          <Chatbar.Textarea aria-label="Message" placeholder="Type a message..." />
          <Chatbar.InlineEnd>
            <Chatbar.Send />
          </Chatbar.InlineEnd>
          <Chatbar.Row>
            <Chatbar.RowStart>
              {showAttach && (
                <Chatbar.AttachTrigger asChild>
                  <IconButton variant="ghost" size={size as any} color="gray" highContrast aria-label="Attach file">
                    <HugeiconsIcon icon={Attachment01Icon} strokeWidth={1.75} />
                  </IconButton>
                </Chatbar.AttachTrigger>
              )}
            </Chatbar.RowStart>
            <Chatbar.RowEnd>
              <Chatbar.Send />
            </Chatbar.RowEnd>
          </Chatbar.Row>
        </Chatbar.Root>
      }
      code={generateCode()}
      items={items}
      showBackground={material === 'translucent'}
      hint={
        material === 'translucent'
          ? 'Translucent material adds backdrop blur for depth over complex backgrounds.'
          : expandOn === 'both' || expandOn === 'focus'
            ? 'Click to focus and expand the chatbar. Type multiple lines to see auto-resize.'
            : expandOn === 'overflow'
              ? 'Type multiple lines to expand the chatbar automatically.'
              : 'Control expansion manually via the open prop.'
      }
    />
  );
}
