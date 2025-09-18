import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders, screen } from '../../test-utils';
import userEvent from '@testing-library/user-event';
import { Shell } from '../../../src/components/index';
import { useShell } from '../../../src/components/shell.context';

function ToggleSidebar() {
  const shell = useShell();
  return (
    <button aria-label="toggle sidebar" onClick={() => shell.togglePane('sidebar')}>
      toggle sidebar
    </button>
  );
}

describe('Sidebar onStateChange notify', () => {
  it('fires with reason=init when defaultState is provided', () => {
    const spy = vi.fn();
    renderWithProviders(
      <Shell.Root>
        <Shell.Sidebar presentation="fixed" defaultState="expanded" onStateChange={spy} />
        <Shell.Content>content</Shell.Content>
      </Shell.Root>,
    );
    expect(spy).toHaveBeenCalledWith('expanded', { reason: 'init' });
  });

  it('fires with reason=toggle when toggled internally', async () => {
    const spy = vi.fn();
    renderWithProviders(
      <Shell.Root>
        <Shell.Header>
          <ToggleSidebar />
        </Shell.Header>
        <Shell.Sidebar presentation="fixed" onStateChange={spy} />
        <Shell.Content>content</Shell.Content>
      </Shell.Root>,
    );
    await userEvent.click(screen.getByRole('button', { name: /toggle sidebar/i }));
    expect(spy).toHaveBeenCalled();
  });
});
