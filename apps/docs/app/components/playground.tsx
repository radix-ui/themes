'use client';

import React, { useState } from 'react';
import { Flex, Card, Theme, Button, Box } from '@kushagradhawan/kookie-ui';
import { Copy } from 'lucide-react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Copy01Icon } from '@hugeicons/core-free-icons';
import { PropertyControl } from './property-control';

interface PlaygroundProps {
  /**
   * The component to render in the preview area
   */
  component: React.ReactNode;

  /**
   * The code string to display in the copy button
   */
  code: string;

  /**
   * Property control items for the right side
   */
  items: Array<
    | {
        id: string;
        label: string;
        type: 'select';
        value: string;
        onChange: (value: string) => void;
        options: Array<{ label: string; value: string }>;
        placeholder?: string;
        appearance?: 'swatch';
      }
    | {
        id: string;
        label: string;
        type: 'switch';
        value: boolean;
        onChange: (checked: boolean) => void;
      }
  >;
}

export default function Playground({ component, code, items }: PlaygroundProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <Flex direction={{ initial: 'column', md: 'row' }} gap="2" align="center">
      {/* Left side - Preview area */}
      <Box position="relative" className="playground-container" style={{ width: '100%', height: '320px' }}>
        <Card size="1" variant="soft" style={{ width: '100%', height: '100%' }}>
          {/* Copy button - positioned like CodeBlock */}
          <Flex gap="1" position="absolute" top="2" right="2" style={{ zIndex: 1 }} className="playground-copy-button">
            <Button size="2" variant="ghost" color="gray" onClick={handleCopy} tooltip={copied ? 'Copied!' : 'Copy'} aria-label={copied ? 'Copied!' : 'Copy code'}>
              <HugeiconsIcon icon={Copy01Icon} /> Copy
            </Button>
          </Flex>

          {/* Preview area */}
          <Flex direction="column" align="center" justify="center" height="100%" p="4">
            <Theme fontFamily="sans">{component}</Theme>
          </Flex>
        </Card>
      </Box>

      {/* Right side - Property controls */}
      <PropertyControl.Group width="256px" items={items} style={{ flexShrink: 0 }} />
    </Flex>
  );
}
