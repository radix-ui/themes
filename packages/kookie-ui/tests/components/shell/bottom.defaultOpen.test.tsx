import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { renderWithProviders, screen } from '../../test-utils';
import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Shell } from '../../../src/components/index';
import { useShell } from '../../../src/components/shell.context';

function ToggleBottom() {
  const shell = useShell();
  return (
    <button aria-label="toggle bottom" onClick={() => shell.togglePane('bottom')}>
      toggle bottom
    </button>
  );
}

function App({ defaultOpen }: { defaultOpen?: boolean }) {
  return (
    <Shell.Root>
      <Shell.Header>
        <ToggleBottom />
      </Shell.Header>
      <Shell.Content>content</Shell.Content>
      <Shell.Bottom presentation={{ initial: 'fixed' }} {...(defaultOpen ? { defaultOpen: true } : {})}>
        bottom
      </Shell.Bottom>
    </Shell.Root>
  );
}

describe('Bottom defaultOpen (uncontrolled)', () => {
  it('is closed by default when defaultOpen not provided', () => {
    renderWithProviders(<App />);
    const el = screen.getByText('bottom').closest('.rt-ShellBottom') as HTMLElement;
    expect(el).toHaveAttribute('data-mode', 'collapsed');
  });

  it('is open on mount when defaultOpen is true', async () => {
    renderWithProviders(<App defaultOpen />);
    await waitFor(() => {
      const el = screen.getByText('bottom').closest('.rt-ShellBottom') as HTMLElement;
      expect(el).toHaveAttribute('data-mode', 'expanded');
    });
  });

  it('toggles internally via shell.togglePane("bottom") without props', async () => {
    renderWithProviders(<App />);
    const btn = screen.getByRole('button', { name: /toggle bottom/i });
    const el = () => screen.getByText('bottom').closest('.rt-ShellBottom') as HTMLElement;
    expect(el()).toHaveAttribute('data-mode', 'collapsed');
    await userEvent.click(btn);
    expect(el()).toHaveAttribute('data-mode', 'expanded');
  });
});
