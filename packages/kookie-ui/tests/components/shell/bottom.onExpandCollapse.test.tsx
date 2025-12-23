import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders, screen, waitFor } from '../../test-utils';
import userEvent from '@testing-library/user-event';
import { Shell } from '../../../src/components/index';

describe('Bottom onExpand/onCollapse callbacks', () => {
  it('does not fire onCollapse on initial mount when collapsed', () => {
    const onExpand = vi.fn();
    const onCollapse = vi.fn();

    renderWithProviders(
      <Shell.Root>
        <Shell.Content>content</Shell.Content>
        <Shell.Bottom
          presentation="fixed"
          defaultOpen={false}
          onExpand={onExpand}
          onCollapse={onCollapse}
        >
          bottom
        </Shell.Bottom>
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
        <Shell.Content>content</Shell.Content>
        <Shell.Bottom
          presentation="fixed"
          defaultOpen={true}
          onExpand={onExpand}
          onCollapse={onCollapse}
        >
          bottom
        </Shell.Bottom>
      </Shell.Root>,
    );

    expect(onExpand).not.toHaveBeenCalled();
    expect(onCollapse).not.toHaveBeenCalled();
  });

  it('fires only onExpand when controlled open changes false → true', async () => {
    const onExpand = vi.fn();
    const onCollapse = vi.fn();

    function ControlledFixture() {
      const [open, setOpen] = React.useState(false);
      return (
        <Shell.Root>
          <Shell.Header>
            <button onClick={() => setOpen(true)}>open</button>
          </Shell.Header>
          <Shell.Content>content</Shell.Content>
          <Shell.Bottom
            presentation="fixed"
            open={open}
            onExpand={onExpand}
            onCollapse={onCollapse}
          >
            bottom
          </Shell.Bottom>
        </Shell.Root>
      );
    }

    renderWithProviders(<ControlledFixture />);

    // Initial mount should not fire callbacks
    expect(onExpand).not.toHaveBeenCalled();
    expect(onCollapse).not.toHaveBeenCalled();

    // Open the bottom panel
    await userEvent.click(screen.getByRole('button', { name: /open/i }));

    await waitFor(() => {
      expect(onExpand).toHaveBeenCalledTimes(1);
    });
    expect(onCollapse).not.toHaveBeenCalled();
  });

  it('fires only onCollapse when controlled open changes true → false', async () => {
    const onExpand = vi.fn();
    const onCollapse = vi.fn();

    function ControlledFixture() {
      const [open, setOpen] = React.useState(true);
      return (
        <Shell.Root>
          <Shell.Header>
            <button onClick={() => setOpen(false)}>close</button>
          </Shell.Header>
          <Shell.Content>content</Shell.Content>
          <Shell.Bottom
            presentation="fixed"
            open={open}
            onExpand={onExpand}
            onCollapse={onCollapse}
          >
            bottom
          </Shell.Bottom>
        </Shell.Root>
      );
    }

    renderWithProviders(<ControlledFixture />);

    // Initial mount should not fire callbacks
    expect(onExpand).not.toHaveBeenCalled();
    expect(onCollapse).not.toHaveBeenCalled();

    // Close the bottom panel
    await userEvent.click(screen.getByRole('button', { name: /close/i }));

    await waitFor(() => {
      expect(onCollapse).toHaveBeenCalledTimes(1);
    });
    expect(onExpand).not.toHaveBeenCalled();
  });

  it('fires callbacks correctly on toggle cycle', async () => {
    const onExpand = vi.fn();
    const onCollapse = vi.fn();

    function ControlledFixture() {
      const [open, setOpen] = React.useState(false);
      return (
        <Shell.Root>
          <Shell.Header>
            <button onClick={() => setOpen((o) => !o)}>toggle</button>
          </Shell.Header>
          <Shell.Content>content</Shell.Content>
          <Shell.Bottom
            presentation="fixed"
            open={open}
            onExpand={onExpand}
            onCollapse={onCollapse}
          >
            bottom
          </Shell.Bottom>
        </Shell.Root>
      );
    }

    renderWithProviders(<ControlledFixture />);

    // Initial: no callbacks
    expect(onExpand).toHaveBeenCalledTimes(0);
    expect(onCollapse).toHaveBeenCalledTimes(0);

    // Toggle open
    await userEvent.click(screen.getByRole('button', { name: /toggle/i }));
    await waitFor(() => expect(onExpand).toHaveBeenCalledTimes(1));
    expect(onCollapse).toHaveBeenCalledTimes(0);

    // Toggle closed
    await userEvent.click(screen.getByRole('button', { name: /toggle/i }));
    await waitFor(() => expect(onCollapse).toHaveBeenCalledTimes(1));
    expect(onExpand).toHaveBeenCalledTimes(1);

    // Toggle open again
    await userEvent.click(screen.getByRole('button', { name: /toggle/i }));
    await waitFor(() => expect(onExpand).toHaveBeenCalledTimes(2));
    expect(onCollapse).toHaveBeenCalledTimes(1);
  });
});

