'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Flex, Card, Theme, Button, Box, Text, SegmentedControl } from '@kushagradhawan/kookie-ui';
import { HugeiconsIcon } from '@hugeicons/react';
import { Copy01Icon, Sun01Icon, Moon02Icon } from '@hugeicons/core-free-icons';
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

  /**
   * Show background image/pattern to demonstrate material prop effects
   */
  showBackground?: boolean;

  /**
   * Optional hint message to display below the preview
   */
  hint?: string;
}

export default function Playground({ component, code, items, showBackground = false, hint }: PlaygroundProps) {
  const [copied, setCopied] = useState(false);
  const [appearance, setAppearance] = useState<'light' | 'dark'>('light');

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
    <Flex direction={{ initial: 'column', md: 'row' }} gap="2" my="3" align="center">
      {/* Left side - Preview area */}
      <Flex direction="column" gap="2" width="100%" className="playground-container">
        <Theme asChild appearance={appearance} hasBackground={false}>
          <Box position="relative" style={{ width: '100%', height: '480px' }}>
            <Card size="1" variant="soft" style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}>
              {/* Background Image */}
              {showBackground && (
                <Image
                  src="https://images.unsplash.com/photo-1653558368201-cf9d0b2a2c70?q=80&w=2756&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Background"
                  fill
                  style={{ objectFit: 'cover', zIndex: 0 }}
                  priority
                />
              )}

              {/* Toolbar - Copy button (left) and theme toggle (right) */}
              <Flex position="absolute" top="2" left="2" style={{ zIndex: 2 }}>
                <Button size="2" variant="ghost" color="gray" onClick={handleCopy} tooltip={copied ? 'Copied!' : 'Copy'} aria-label={copied ? 'Copied!' : 'Copy code'}>
                  <HugeiconsIcon icon={Copy01Icon} /> Copy
                </Button>
              </Flex>
              <Flex position="absolute" top="2" right="2" style={{ zIndex: 2 }}>
                <SegmentedControl.Root size="2" value={appearance} onValueChange={(value) => setAppearance(value as 'light' | 'dark')}>
                  <SegmentedControl.Item value="light" iconOnly>
                    <HugeiconsIcon icon={Sun01Icon} />
                  </SegmentedControl.Item>
                  <SegmentedControl.Item value="dark" iconOnly>
                    <HugeiconsIcon icon={Moon02Icon} />
                  </SegmentedControl.Item>
                </SegmentedControl.Root>
              </Flex>

              {/* Preview area */}
              <Flex direction="column" align="center" justify="center" height="100%" p="4" style={{ position: 'relative', zIndex: 1 }}>
                {component}
              </Flex>
            </Card>
          </Box>
        </Theme>

        {/* Hint */}
        {hint && (
          <Text size="1" color="gray">
            {hint}
          </Text>
        )}
      </Flex>

      {/* Right side - Property controls */}
      <Box width={{ initial: '100%', md: '256px' }} flexShrink="0">
        <PropertyControl.Group width="100%" items={items} />
      </Box>
    </Flex>
  );
}
