import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders, screen } from '../../test-utils';
import userEvent from '@testing-library/user-event';
import { Shell } from '../../../src/components/index';
import { useShell } from '../../../src/components/shell.context';

function ToggleLeft() {
  const shell = useShell();
  return (
    <button aria-label="toggle left" onClick={() => shell.togglePane('left')}>
      toggle left
    </button>
  );
}

describe('Rail onOpenChange notify', () => {
  it('fires with reason=init when defaultOpen', () => {
    const spy = vi.fn();
    renderWithProviders(
      <Shell.Root>
        <Shell.Rail presentation="fixed" defaultOpen onOpenChange={spy} />
        <Shell.Panel>panel</Shell.Panel>
        <Shell.Content>content</Shell.Content>
      </Shell.Root>,
    );
    expect(spy).toHaveBeenCalledWith(true, { reason: 'init' });
  });

  it('fires with reason=toggle when toggled internally', async () => {
    const spy = vi.fn();
    renderWithProviders(
      <Shell.Root>
        <Shell.Header>
          <ToggleLeft />
        </Shell.Header>
        <Shell.Rail presentation="fixed" onOpenChange={spy} />
        <Shell.Panel>panel</Shell.Panel>
        <Shell.Content>content</Shell.Content>
      </Shell.Root>,
    );
    await userEvent.click(screen.getByRole('button', { name: /toggle left/i }));
    expect(spy).toHaveBeenCalledWith(true, { reason: 'toggle' });
  });
});
