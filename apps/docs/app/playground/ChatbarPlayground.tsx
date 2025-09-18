'use client';

import React from 'react';
import { Chatbar, Text, Flex, Button, Heading, Card, IconButton } from '@kushagradhawan/kookie-ui';
import { Paperclip } from 'lucide-react';
import { PropertyControl } from '../components/property-control';

const variants = ['surface', 'outline', 'classic', 'ghost', 'soft'] as const;
const sizes = ['1', '2', '3'] as const;
const expandOnOptions = ['none', 'focus', 'overflow', 'both'] as const;
const sendModeOptions = ['always', 'whenDirty', 'never'] as const;

export default function ChatbarPlayground() {
  const [variant, setVariant] = React.useState<string>('surface');
  const [size, setSize] = React.useState<string>('2');
  const [expandOn, setExpandOn] = React.useState<string>('both');
  const [text, setText] = React.useState<string>('');
  const [minLines, setMinLines] = React.useState<number>(1);
  const [maxLines, setMaxLines] = React.useState<number>(6);
  const [sendMode, setSendMode] = React.useState<string>('whenDirty');
  const [disabled, setDisabled] = React.useState<boolean>(false);
  const [readOnly, setReadOnly] = React.useState<boolean>(false);
  const [dropzone, setDropzone] = React.useState<boolean>(true);
  const [multiple, setMultiple] = React.useState<boolean>(true);
  const [paste, setPaste] = React.useState<boolean>(true);
  const [clearOnSubmit, setClearOnSubmit] = React.useState<boolean>(true);

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
      id: 'expand-on',
      label: 'Expand On',
      type: 'select' as const,
      value: expandOn,
      onChange: setExpandOn,
      options: expandOnOptions.map((e) => ({ label: e, value: e })),
      placeholder: 'Select expand behavior',
    },
    {
      id: 'min-lines',
      label: 'Min Lines',
      type: 'select' as const,
      value: minLines.toString(),
      onChange: (value: string) => setMinLines(parseInt(value)),
      options: [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5', value: '5' },
      ],
      placeholder: 'Select min lines',
    },
    {
      id: 'max-lines',
      label: 'Max Lines',
      type: 'select' as const,
      value: maxLines.toString(),
      onChange: (value: string) => setMaxLines(parseInt(value)),
      options: [
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5', value: '5' },
        { label: '6', value: '6' },
        { label: '8', value: '8' },
        { label: '10', value: '10' },
      ],
      placeholder: 'Select max lines',
    },
    {
      id: 'send-mode',
      label: 'Send Mode',
      type: 'select' as const,
      value: sendMode,
      onChange: setSendMode,
      options: sendModeOptions.map((s) => ({ label: s, value: s })),
      placeholder: 'Select send mode',
    },
    {
      id: 'disabled',
      label: 'Disabled',
      type: 'switch' as const,
      value: disabled,
      onChange: setDisabled,
    },
    {
      id: 'read-only',
      label: 'Read Only',
      type: 'switch' as const,
      value: readOnly,
      onChange: setReadOnly,
    },
    {
      id: 'dropzone',
      label: 'Dropzone',
      type: 'switch' as const,
      value: dropzone,
      onChange: setDropzone,
    },
    {
      id: 'multiple',
      label: 'Multiple Files',
      type: 'switch' as const,
      value: multiple,
      onChange: setMultiple,
    },
    {
      id: 'paste',
      label: 'Paste Files',
      type: 'switch' as const,
      value: paste,
      onChange: setPaste,
    },
    {
      id: 'clear-on-submit',
      label: 'Clear On Submit',
      type: 'switch' as const,
      value: clearOnSubmit,
      onChange: setClearOnSubmit,
    },
  ];

  return (
    <Flex direction={{ initial: 'column', md: 'row' }} gap="5" align="center">
      <Card size="3" variant="soft" style={{ width: '100%', height: '400px' }}>
        <Flex direction="column" align="center" justify="center" height="100%">
          <Chatbar.Root
            size={size as any}
            variant={variant as any}
            expandOn={expandOn as any}
            minLines={minLines}
            maxLines={maxLines}
            accept={['image/*']}
            sendMode={sendMode as any}
            disabled={disabled}
            readOnly={readOnly}
            dropzone={dropzone}
            multiple={multiple}
            paste={paste}
            clearOnSubmit={clearOnSubmit}
            value={text}
            onValueChange={setText}
            onSubmit={({ value, attachments }) => {
              console.log('Submitted:', { value, attachments });
            }}
            onAttachmentReject={(rejections) => {
              console.log('Rejected attachments:', rejections);
            }}
            style={{ width: '100%', maxWidth: '500px' }}
          >
            <Chatbar.AttachmentsRow />
            <Chatbar.Textarea placeholder="Type a message..." />
            <Chatbar.Row>
              <Chatbar.AttachTrigger asChild>
                <IconButton size={size as any} variant="soft">
                  <Paperclip />
                </IconButton>
              </Chatbar.AttachTrigger>
              <Chatbar.Send variant="ghost"></Chatbar.Send>
            </Chatbar.Row>
          </Chatbar.Root>
        </Flex>
      </Card>

      <PropertyControl.Group width="288px" items={items} style={{ flexShrink: 0 }} />
    </Flex>
  );
}
