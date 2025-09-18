import * as React from 'react';
import { describe, it, expect } from 'vitest';
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

function App({ defaultOpen }: { defaultOpen?: boolean }) {
  return (
    <Shell.Root>
      <Shell.Header>
        <ToggleLeft />
      </Shell.Header>
      <Shell.Rail presentation="fixed" expandedSize={64} {...(defaultOpen ? { defaultOpen: true } : {})} />
      <Shell.Panel>panel</Shell.Panel>
      <Shell.Content>content</Shell.Content>
    </Shell.Root>
  );
}

describe('Rail defaultOpen (uncontrolled)', () => {
  it('is closed by default when defaultOpen not provided', () => {
    renderWithProviders(<App />);
    const left = screen.getByText('panel').closest('.rt-ShellLeft') as HTMLElement;
    expect(left).toHaveAttribute('data-mode', 'collapsed');
  });

  it('is open on mount when defaultOpen is true', () => {
    renderWithProviders(<App defaultOpen />);
    const left = screen.getByText('panel').closest('.rt-ShellLeft') as HTMLElement;
    expect(left).toHaveAttribute('data-mode', 'expanded');
  });

  it('toggles internally via shell.togglePane("left") without props', async () => {
    renderWithProviders(<App />);
    const btn = screen.getByRole('button', { name: /toggle left/i });
    const left = () => screen.getByText('panel').closest('.rt-ShellLeft') as HTMLElement;
    expect(left()).toHaveAttribute('data-mode', 'collapsed');
    await userEvent.click(btn);
    expect(left()).toHaveAttribute('data-mode', 'expanded');
  });
});
