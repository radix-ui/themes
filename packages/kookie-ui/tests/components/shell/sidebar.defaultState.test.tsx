import * as React from 'react';
import { describe, it, expect } from 'vitest';
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

function App({ defaultState }: { defaultState?: 'collapsed' | 'thin' | 'expanded' }) {
  return (
    <Shell.Root>
      <Shell.Header>
        <ToggleSidebar />
      </Shell.Header>
      <Shell.Sidebar presentation="fixed" defaultState={defaultState}>
        sidebar
      </Shell.Sidebar>
      <Shell.Content>content</Shell.Content>
    </Shell.Root>
  );
}

describe('Sidebar defaultState (uncontrolled)', () => {
  it('is expanded by default when defaultState not provided (legacy defaultMode)', () => {
    renderWithProviders(<App />);
    const el = screen.getByText('sidebar').closest('.rt-ShellSidebar') as HTMLElement;
    expect(el).toHaveAttribute('data-mode', 'expanded');
  });

  it('is open on mount when defaultState is expanded', () => {
    renderWithProviders(<App defaultState="expanded" />);
    const el = screen.getByText('sidebar').closest('.rt-ShellSidebar') as HTMLElement;
    expect(el).toHaveAttribute('data-mode', 'expanded');
  });

  it('toggles internally', async () => {
    renderWithProviders(<App />);
    const el = () => screen.getByText('sidebar').closest('.rt-ShellSidebar') as HTMLElement;
    expect(el()).toHaveAttribute('data-mode', 'expanded');
    await userEvent.click(screen.getByRole('button', { name: /toggle sidebar/i }));
    expect(el()).toHaveAttribute('data-mode', 'collapsed');
  });
});
