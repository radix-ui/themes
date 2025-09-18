import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders, screen } from '../../test-utils';
import { Shell } from '../../../src/components/index';
import { useShell } from '../../../src/components/shell.context';
import userEvent from '@testing-library/user-event';

function ToggleButton() {
  const shell = useShell();
  return (
    <button aria-label="toggle panel" onClick={() => shell.togglePane('panel')}>
      toggle panel
    </button>
  );
}

function App({ defaultOpen = false, onOpenChange }: { defaultOpen?: boolean; onOpenChange?: (open: boolean, meta: { reason: string }) => void }) {
  return (
    <Shell.Root>
      <Shell.Header>
        <ToggleButton />
      </Shell.Header>
      <Shell.Rail presentation="fixed" />
      <Shell.Panel defaultOpen={defaultOpen} onOpenChange={onOpenChange as any}>
        panel
      </Shell.Panel>
      <Shell.Content>content</Shell.Content>
    </Shell.Root>
  );
}

describe('Panel onOpenChange (uncontrolled notify only)', () => {
  it('fires with reason=init when defaultOpen=true on mount', () => {
    const spy = vi.fn();
    renderWithProviders(<App defaultOpen onOpenChange={spy} />);
    expect(spy).toHaveBeenCalledWith(true, { reason: 'init' });
  });

  it('fires with reason=toggle on internal toggle', async () => {
    const spy = vi.fn();
    renderWithProviders(<App onOpenChange={spy} />);
    // Click toggle via shell context: use header button bound to window toggle shim
    // Bind a shim to toggle pane through Shell.Root via a custom control
    const btn = screen.getByRole('button', { name: /toggle panel/i });
    // Emulate toggle using keyboard path (user would invoke a trigger normally)
    await userEvent.click(btn);
    // After click, expect a toggle callback occurred either open or close; reason should be 'toggle'
    expect(spy).toHaveBeenCalledWith(true, { reason: 'toggle' });
  });
});
