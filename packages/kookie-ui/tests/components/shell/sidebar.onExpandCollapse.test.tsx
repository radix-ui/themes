import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders, screen, waitFor } from '../../test-utils';
import userEvent from '@testing-library/user-event';
import { Shell } from '../../../src/components/index';

describe('Sidebar onExpand/onCollapse callbacks', () => {
  it('does not fire onCollapse on initial mount when collapsed', () => {
    const onExpand = vi.fn();
    const onCollapse = vi.fn();

    renderWithProviders(
      <Shell.Root>
        <Shell.Sidebar
          presentation="fixed"
          defaultState="collapsed"
          onExpand={onExpand}
          onCollapse={onCollapse}
        >
          sidebar
        </Shell.Sidebar>
        <Shell.Content>content</Shell.Content>
      </Shell.Root>,
    );

    expect(onCollapse).not.toHaveBeenCalled();
    expect(onExpand).not.toHaveBeenCalled();
  });

  it('does not fire onExpand on initial mount when expanded', () => {
    const onExpand = vi.fn();
    const onCollapse = vi.fn();

    renderWithProviders(
      <Shell.Root>
        <Shell.Sidebar
          presentation="fixed"
          defaultState="expanded"
          onExpand={onExpand}
          onCollapse={onCollapse}
        >
          sidebar
        </Shell.Sidebar>
        <Shell.Content>content</Shell.Content>
      </Shell.Root>,
    );

    expect(onExpand).not.toHaveBeenCalled();
    expect(onCollapse).not.toHaveBeenCalled();
  });

  it('fires only onExpand when controlled state changes collapsed → expanded', async () => {
    const onExpand = vi.fn();
    const onCollapse = vi.fn();

    function ControlledFixture() {
      const [state, setState] = React.useState<'collapsed' | 'thin' | 'expanded'>('collapsed');
      return (
        <Shell.Root>
          <Shell.Header>
            <button onClick={() => setState('expanded')}>expand</button>
          </Shell.Header>
          <Shell.Sidebar
            presentation="fixed"
            state={state}
            onExpand={onExpand}
            onCollapse={onCollapse}
          >
            sidebar
          </Shell.Sidebar>
          <Shell.Content>content</Shell.Content>
        </Shell.Root>
      );
    }

    renderWithProviders(<ControlledFixture />);

    // Initial mount should not fire callbacks
    expect(onExpand).not.toHaveBeenCalled();
    expect(onCollapse).not.toHaveBeenCalled();

    // Expand the sidebar
    await userEvent.click(screen.getByRole('button', { name: /expand/i }));

    await waitFor(() => {
      expect(onExpand).toHaveBeenCalledTimes(1);
    });
    expect(onCollapse).not.toHaveBeenCalled();
  });

  it('fires only onExpand when controlled state changes collapsed → thin', async () => {
    const onExpand = vi.fn();
    const onCollapse = vi.fn();

    function ControlledFixture() {
      const [state, setState] = React.useState<'collapsed' | 'thin' | 'expanded'>('collapsed');
      return (
        <Shell.Root>
          <Shell.Header>
            <button onClick={() => setState('thin')}>thin</button>
          </Shell.Header>
          <Shell.Sidebar
            presentation="fixed"
            state={state}
            onExpand={onExpand}
            onCollapse={onCollapse}
          >
            sidebar
          </Shell.Sidebar>
          <Shell.Content>content</Shell.Content>
        </Shell.Root>
      );
    }

    renderWithProviders(<ControlledFixture />);

    // Initial mount should not fire callbacks
    expect(onExpand).not.toHaveBeenCalled();
    expect(onCollapse).not.toHaveBeenCalled();

    // Set to thin mode
    await userEvent.click(screen.getByRole('button', { name: /thin/i }));

    await waitFor(() => {
      expect(onExpand).toHaveBeenCalledTimes(1);
    });
    expect(onCollapse).not.toHaveBeenCalled();
  });

  it('fires only onCollapse when controlled state changes expanded → collapsed', async () => {
    const onExpand = vi.fn();
    const onCollapse = vi.fn();

    function ControlledFixture() {
      const [state, setState] = React.useState<'collapsed' | 'thin' | 'expanded'>('expanded');
      return (
        <Shell.Root>
          <Shell.Header>
            <button onClick={() => setState('collapsed')}>collapse</button>
          </Shell.Header>
          <Shell.Sidebar
            presentation="fixed"
            state={state}
            onExpand={onExpand}
            onCollapse={onCollapse}
          >
            sidebar
          </Shell.Sidebar>
          <Shell.Content>content</Shell.Content>
        </Shell.Root>
      );
    }

    renderWithProviders(<ControlledFixture />);

    // Initial mount should not fire callbacks
    expect(onExpand).not.toHaveBeenCalled();
    expect(onCollapse).not.toHaveBeenCalled();

    // Collapse the sidebar
    await userEvent.click(screen.getByRole('button', { name: /collapse/i }));

    await waitFor(() => {
      expect(onCollapse).toHaveBeenCalledTimes(1);
    });
    expect(onExpand).not.toHaveBeenCalled();
  });

  it('does not fire callbacks when transitioning between thin and expanded', async () => {
    const onExpand = vi.fn();
    const onCollapse = vi.fn();

    function ControlledFixture() {
      const [state, setState] = React.useState<'collapsed' | 'thin' | 'expanded'>('thin');
      return (
        <Shell.Root>
          <Shell.Header>
            <button onClick={() => setState('expanded')}>expand</button>
          </Shell.Header>
          <Shell.Sidebar
            presentation="fixed"
            state={state}
            onExpand={onExpand}
            onCollapse={onCollapse}
          >
            sidebar
          </Shell.Sidebar>
          <Shell.Content>content</Shell.Content>
        </Shell.Root>
      );
    }

    renderWithProviders(<ControlledFixture />);

    // Initial mount should not fire callbacks
    expect(onExpand).not.toHaveBeenCalled();
    expect(onCollapse).not.toHaveBeenCalled();

    // Go from thin to expanded (both are visible states)
    await userEvent.click(screen.getByRole('button', { name: /expand/i }));

    // Neither callback should fire - we're just changing size, not visibility
    expect(onExpand).not.toHaveBeenCalled();
    expect(onCollapse).not.toHaveBeenCalled();
  });

  it('fires callbacks correctly on full cycle', async () => {
    const onExpand = vi.fn();
    const onCollapse = vi.fn();

    function ControlledFixture() {
      const [state, setState] = React.useState<'collapsed' | 'thin' | 'expanded'>('collapsed');
      return (
        <Shell.Root>
          <Shell.Header>
            <button onClick={() => setState('expanded')}>expand</button>
            <button onClick={() => setState('collapsed')}>collapse</button>
          </Shell.Header>
          <Shell.Sidebar
            presentation="fixed"
            state={state}
            onExpand={onExpand}
            onCollapse={onCollapse}
          >
            sidebar
          </Shell.Sidebar>
          <Shell.Content>content</Shell.Content>
        </Shell.Root>
      );
    }

    renderWithProviders(<ControlledFixture />);

    // Initial: no callbacks
    expect(onExpand).toHaveBeenCalledTimes(0);
    expect(onCollapse).toHaveBeenCalledTimes(0);

    // Expand
    await userEvent.click(screen.getByRole('button', { name: /expand/i }));
    await waitFor(() => expect(onExpand).toHaveBeenCalledTimes(1));
    expect(onCollapse).toHaveBeenCalledTimes(0);

    // Collapse
    await userEvent.click(screen.getByRole('button', { name: /collapse/i }));
    await waitFor(() => expect(onCollapse).toHaveBeenCalledTimes(1));
    expect(onExpand).toHaveBeenCalledTimes(1);

    // Expand again
    await userEvent.click(screen.getByRole('button', { name: /expand/i }));
    await waitFor(() => expect(onExpand).toHaveBeenCalledTimes(2));
    expect(onCollapse).toHaveBeenCalledTimes(1);
  });
});

