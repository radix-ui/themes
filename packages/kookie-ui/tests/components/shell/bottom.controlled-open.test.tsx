import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders, screen } from '../../test-utils';
import userEvent from '@testing-library/user-event';
import { Shell } from '../../../src/components/index';

function ControlledFixture() {
  const [open, setOpen] = React.useState(false);
  const onOpenChange = vi.fn((next: boolean) => setOpen(next));
  return (
    <Shell.Root>
      <Shell.Header>
        <button aria-label="toggle bottom" onClick={() => onOpenChange(!open)}>
          toggle bottom
        </button>
      </Shell.Header>
      <Shell.Content>content</Shell.Content>
      <Shell.Bottom presentation={{ initial: 'fixed' }} open={open} onOpenChange={onOpenChange}>
        bottom
      </Shell.Bottom>
    </Shell.Root>
  );
}

describe('Bottom controlled open', () => {
  it('parent drives state; callback emitted', async () => {
    renderWithProviders(<ControlledFixture />);
    const el = () => screen.getByText('bottom').closest('.rt-ShellBottom') as HTMLElement;
    expect(el()).toHaveAttribute('data-mode', 'collapsed');
    await userEvent.click(screen.getByRole('button', { name: /toggle bottom/i }));
    expect(el()).toHaveAttribute('data-mode', 'expanded');
    await userEvent.click(screen.getByRole('button', { name: /toggle bottom/i }));
    expect(el()).toHaveAttribute('data-mode', 'collapsed');
  });
});
