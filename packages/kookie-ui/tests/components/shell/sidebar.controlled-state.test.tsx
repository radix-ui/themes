import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders, screen } from '../../test-utils';
import userEvent from '@testing-library/user-event';
import { Shell } from '../../../src/components/index';

function ControlledFixture() {
  const [state, setState] = React.useState<'collapsed' | 'thin' | 'expanded'>('collapsed');
  const onStateChange = vi.fn((next: 'collapsed' | 'thin' | 'expanded') => setState(next));
  return (
    <Shell.Root>
      <Shell.Header>
        <button aria-label="expand sidebar" onClick={() => onStateChange('expanded')}>
          expand
        </button>
      </Shell.Header>
      <Shell.Sidebar presentation="fixed" state={state} onStateChange={onStateChange}>
        sidebar
      </Shell.Sidebar>
      <Shell.Content>content</Shell.Content>
    </Shell.Root>
  );
}

describe('Sidebar controlled state', () => {
  it('parent drives; callback emitted', async () => {
    renderWithProviders(<ControlledFixture />);
    const el = () => screen.getByText('sidebar').closest('.rt-ShellSidebar') as HTMLElement;
    expect(el()).toHaveAttribute('data-mode', 'collapsed');
    await userEvent.click(screen.getByRole('button', { name: /expand sidebar/i }));
    expect(el()).toHaveAttribute('data-mode', 'expanded');
  });
});
