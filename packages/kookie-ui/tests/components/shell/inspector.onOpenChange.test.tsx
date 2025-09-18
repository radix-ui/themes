import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders, screen } from '../../test-utils';
import userEvent from '@testing-library/user-event';
import { Shell } from '../../../src/components/index';
import { useShell } from '../../../src/components/shell.context';

function ToggleInspector() {
  const shell = useShell();
  return (
    <button aria-label="toggle inspector" onClick={() => shell.togglePane('inspector')}>
      toggle inspector
    </button>
  );
}

describe('Inspector onOpenChange (uncontrolled notify only)', () => {
  it('fires with reason=init when defaultOpen=true on mount', () => {
    const spy = vi.fn();
    renderWithProviders(
      <Shell.Root>
        <Shell.Content>content</Shell.Content>
        <Shell.Inspector presentation={{ initial: 'fixed' }} defaultOpen onOpenChange={spy}>
          inspector
        </Shell.Inspector>
      </Shell.Root>,
    );
    expect(spy).toHaveBeenCalledWith(true, { reason: 'init' });
  });

  it('fires with reason=toggle on internal toggle', async () => {
    const spy = vi.fn();
    renderWithProviders(
      <Shell.Root>
        <Shell.Header>
          <ToggleInspector />
        </Shell.Header>
        <Shell.Content>content</Shell.Content>
        <Shell.Inspector presentation={{ initial: 'fixed' }} onOpenChange={spy}>
          inspector
        </Shell.Inspector>
      </Shell.Root>,
    );
    await userEvent.click(screen.getByRole('button', { name: /toggle inspector/i }));
    expect(spy).toHaveBeenCalledWith(true, { reason: 'toggle' });
  });
});
