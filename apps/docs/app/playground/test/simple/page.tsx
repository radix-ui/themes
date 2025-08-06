'use client';

import * as React from 'react';
import { Button, DropdownMenu } from '@kushagradhawan/kookie-ui';
import { ChevronDown } from 'lucide-react';

export default function SimpleTestPage() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <h1>Ultra-Simple Dropdown Test</h1>
      <p>Testing just one dropdown in isolation.</p>

      <div style={{ marginTop: '2rem' }}>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button variant="solid" size="2">
              Test Dropdown
              <ChevronDown size={16} />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item>Option 1</DropdownMenu.Item>
            <DropdownMenu.Item>Option 2</DropdownMenu.Item>
            <DropdownMenu.Item>Option 3</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>

      <div style={{ marginTop: '3rem' }}>
        <h2>Performance Test</h2>
        <p>Click the button above and measure INP in dev tools.</p>
        <p>This should give us the baseline performance for a single dropdown.</p>
      </div>
    </div>
  );
}
