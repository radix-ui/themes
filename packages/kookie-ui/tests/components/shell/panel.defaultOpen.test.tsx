import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { renderWithProviders, screen } from '../../test-utils';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';
import { Shell } from '../../../src/components/index';
import { useShell } from '../../../src/components/shell.context';

function ToggleButton() {
  const shell = useShell();
  return (
    <button onClick={() => shell.togglePane('panel')} aria-label="toggle panel">
      toggle panel
    </button>
  );
}

function App({ defaultOpen }: { defaultOpen?: boolean }) {
  return (
    <Shell.Root>
      <Shell.Header>
        <ToggleButton />
      </Shell.Header>
      {/* Left is internal; compose Rail + Panel directly. Force fixed presentation for tests. */}
      <Shell.Rail presentation="fixed" />
      <Shell.Panel defaultOpen={defaultOpen}>panel</Shell.Panel>
      <Shell.Content>content</Shell.Content>
    </Shell.Root>
  );
}

describe('Panel defaultOpen (uncontrolled)', () => {
  it('is closed by default when defaultOpen is not provided', () => {
    renderWithProviders(<App />);
    const panelRoot = screen.getByText('panel').closest('.rt-ShellPanel') as HTMLElement;
    expect(panelRoot).toHaveAttribute('data-mode', 'collapsed');
  });

  it('is open on mount when defaultOpen is true', async () => {
    renderWithProviders(<App defaultOpen />);
    await waitFor(() => {
      const panelRoot = screen.getByText('panel').closest('.rt-ShellPanel') as HTMLElement;
      expect(panelRoot).toHaveAttribute('data-mode', 'expanded');
    });
  });

  it('toggles internally via shell.togglePane without props', async () => {
    renderWithProviders(<App />);
    let panelRoot = screen.getByText('panel').closest('.rt-ShellPanel') as HTMLElement;
    expect(panelRoot).toHaveAttribute('data-mode', 'collapsed');
    await userEvent.click(screen.getByRole('button', { name: /toggle panel/i }));
    panelRoot = screen.getByText('panel').closest('.rt-ShellPanel') as HTMLElement;
    expect(panelRoot).toHaveAttribute('data-mode', 'expanded');
  });
});
