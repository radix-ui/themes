import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders, screen } from '../../test-utils';
import { Shell } from '../../../src/components/index';
import userEvent from '@testing-library/user-event';

function ControlledFixture() {
  const [open, setOpen] = React.useState(false);
  const onOpenChange = vi.fn((next: boolean) => setOpen(next));
  return (
    <Shell.Root>
      <Shell.Header>
        <button aria-label="toggle panel" onClick={() => onOpenChange(!open)}>
          toggle panel
        </button>
      </Shell.Header>
      <Shell.Rail presentation="fixed" />
      <Shell.Panel open={open} onOpenChange={onOpenChange}>
        panel
      </Shell.Panel>
      <Shell.Content>content</Shell.Content>
    </Shell.Root>
  );
}

describe('Panel controlled open', () => {
  it('user action -> onOpenChange fired; UI updates only when parent re-renders', async () => {
    renderWithProviders(<ControlledFixture />);
    const panel = () => screen.getByText('panel').closest('.rt-ShellPanel') as HTMLElement;
    // Initially closed
    expect(panel()).toHaveAttribute('data-mode', 'collapsed');
    // Click toggle -> should call onOpenChange with true, parent updates state -> UI expands
    await userEvent.click(screen.getByRole('button', { name: /toggle panel/i }));
    expect(panel()).toHaveAttribute('data-mode', 'expanded');
    // Click again -> collapse
    await userEvent.click(screen.getByRole('button', { name: /toggle panel/i }));
    expect(panel()).toHaveAttribute('data-mode', 'collapsed');
  });
});
