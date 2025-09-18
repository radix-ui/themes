import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { renderWithProviders, screen } from '../../test-utils';
import { waitFor } from '@testing-library/react';
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

function App({ defaultOpen }: { defaultOpen?: boolean }) {
  return (
    <Shell.Root>
      <Shell.Header>
        <ToggleInspector />
      </Shell.Header>
      <Shell.Content>content</Shell.Content>
      <Shell.Inspector presentation={{ initial: 'fixed' }} {...(defaultOpen ? { defaultOpen: true } : {})}>
        inspector
      </Shell.Inspector>
    </Shell.Root>
  );
}

describe('Inspector defaultOpen (uncontrolled)', () => {
  it('is closed by default when defaultOpen not provided', () => {
    renderWithProviders(<App />);
    const el = screen.getByText('inspector').closest('.rt-ShellInspector') as HTMLElement;
    expect(el).toHaveAttribute('data-mode', 'collapsed');
  });

  it('is open on mount when defaultOpen is true', async () => {
    renderWithProviders(<App defaultOpen />);
    await waitFor(() => {
      const el = screen.getByText('inspector').closest('.rt-ShellInspector') as HTMLElement;
      expect(el).toHaveAttribute('data-mode', 'expanded');
    });
  });

  it('toggles internally via shell.togglePane("inspector") without props', async () => {
    renderWithProviders(<App />);
    const btn = screen.getByRole('button', { name: /toggle inspector/i });
    const el = () => screen.getByText('inspector').closest('.rt-ShellInspector') as HTMLElement;
    expect(el()).toHaveAttribute('data-mode', 'collapsed');
    await userEvent.click(btn);
    expect(el()).toHaveAttribute('data-mode', 'expanded');
  });
});
