import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { renderWithProviders, screen, waitFor } from '../../test-utils';
import userEvent from '@testing-library/user-event';
import { Shell } from '../../../src/components/index';

/**
 * Layout tests for Issue 1: Collapsed panes taking up space
 * 
 * Note: jsdom doesn't compute CSS styles, so we test:
 * 1. The data-mode attribute is correctly set (CSS relies on this)
 * 2. The layout relationship between content and body
 * 
 * The actual CSS rules are verified by inspecting shell.css which has:
 * - .rt-ShellInspector[data-mode='collapsed'] { position: absolute; width: 0px; flex-shrink: 0; flex-basis: 0; }
 * - .rt-ShellSidebar[data-mode='collapsed'] { position: absolute; width: 0px; flex-shrink: 0; flex-basis: 0; }
 * - .rt-ShellBottom[data-mode='collapsed'] { position: absolute; height: 0px; }
 */
describe('Collapsed panes layout (Issue 1: space taken when collapsed)', () => {
  describe('Inspector collapsed layout', () => {
    it('has data-mode="collapsed" when defaultOpen is false', () => {
      renderWithProviders(
        <Shell.Root>
          <Shell.Content>content</Shell.Content>
          <Shell.Inspector presentation="fixed" defaultOpen={false}>
            inspector
          </Shell.Inspector>
        </Shell.Root>,
      );

      const inspector = screen.getByText('inspector').closest('.rt-ShellInspector') as HTMLElement;
      expect(inspector).toHaveAttribute('data-mode', 'collapsed');
    });

    it('has data-mode="expanded" when defaultOpen is true', () => {
      renderWithProviders(
        <Shell.Root>
          <Shell.Content>content</Shell.Content>
          <Shell.Inspector presentation="fixed" defaultOpen={true}>
            inspector
          </Shell.Inspector>
        </Shell.Root>,
      );

      const inspector = screen.getByText('inspector').closest('.rt-ShellInspector') as HTMLElement;
      expect(inspector).toHaveAttribute('data-mode', 'expanded');
    });

    it('transitions from expanded to collapsed correctly', async () => {
      function Fixture() {
        const [open, setOpen] = React.useState(true);
        return (
          <Shell.Root>
            <Shell.Header>
              <button onClick={() => setOpen(false)}>close</button>
            </Shell.Header>
            <Shell.Content>content</Shell.Content>
            <Shell.Inspector presentation="fixed" open={open}>
              inspector
            </Shell.Inspector>
          </Shell.Root>
        );
      }

      renderWithProviders(<Fixture />);

      const inspector = screen.getByText('inspector').closest('.rt-ShellInspector') as HTMLElement;
      expect(inspector).toHaveAttribute('data-mode', 'expanded');

      await userEvent.click(screen.getByRole('button', { name: /close/i }));

      await waitFor(() => {
        expect(inspector).toHaveAttribute('data-mode', 'collapsed');
      });
    });
  });

  describe('Sidebar collapsed layout', () => {
    it('has data-mode="collapsed" when defaultState is collapsed', () => {
      renderWithProviders(
        <Shell.Root>
          <Shell.Sidebar presentation="fixed" defaultState="collapsed">
            sidebar
          </Shell.Sidebar>
          <Shell.Content>content</Shell.Content>
        </Shell.Root>,
      );

      const sidebar = screen.getByText('sidebar').closest('.rt-ShellSidebar') as HTMLElement;
      expect(sidebar).toHaveAttribute('data-mode', 'collapsed');
    });

    it('has data-mode="expanded" when defaultState is expanded', () => {
      renderWithProviders(
        <Shell.Root>
          <Shell.Sidebar presentation="fixed" defaultState="expanded">
            sidebar
          </Shell.Sidebar>
          <Shell.Content>content</Shell.Content>
        </Shell.Root>,
      );

      const sidebar = screen.getByText('sidebar').closest('.rt-ShellSidebar') as HTMLElement;
      expect(sidebar).toHaveAttribute('data-mode', 'expanded');
    });

    it('has data-mode="thin" when defaultState is thin', () => {
      renderWithProviders(
        <Shell.Root>
          <Shell.Sidebar presentation="fixed" defaultState="thin">
            sidebar
          </Shell.Sidebar>
          <Shell.Content>content</Shell.Content>
        </Shell.Root>,
      );

      const sidebar = screen.getByText('sidebar').closest('.rt-ShellSidebar') as HTMLElement;
      expect(sidebar).toHaveAttribute('data-mode', 'thin');
    });

    it('transitions from expanded to collapsed correctly', async () => {
      function Fixture() {
        const [state, setState] = React.useState<'collapsed' | 'thin' | 'expanded'>('expanded');
        return (
          <Shell.Root>
            <Shell.Header>
              <button onClick={() => setState('collapsed')}>collapse</button>
            </Shell.Header>
            <Shell.Sidebar presentation="fixed" state={state}>
              sidebar
            </Shell.Sidebar>
            <Shell.Content>content</Shell.Content>
          </Shell.Root>
        );
      }

      renderWithProviders(<Fixture />);

      const sidebar = screen.getByText('sidebar').closest('.rt-ShellSidebar') as HTMLElement;
      expect(sidebar).toHaveAttribute('data-mode', 'expanded');

      await userEvent.click(screen.getByRole('button', { name: /collapse/i }));

      await waitFor(() => {
        expect(sidebar).toHaveAttribute('data-mode', 'collapsed');
      });
    });
  });

  describe('Bottom collapsed layout', () => {
    it('has data-mode="collapsed" when defaultOpen is false', () => {
      renderWithProviders(
        <Shell.Root>
          <Shell.Content>content</Shell.Content>
          <Shell.Bottom presentation="fixed" defaultOpen={false}>
            bottom
          </Shell.Bottom>
        </Shell.Root>,
      );

      const bottom = screen.getByText('bottom').closest('.rt-ShellBottom') as HTMLElement;
      expect(bottom).toHaveAttribute('data-mode', 'collapsed');
    });

    it('has data-mode="expanded" when defaultOpen is true', () => {
      renderWithProviders(
        <Shell.Root>
          <Shell.Content>content</Shell.Content>
          <Shell.Bottom presentation="fixed" defaultOpen={true}>
            bottom
          </Shell.Bottom>
        </Shell.Root>,
      );

      const bottom = screen.getByText('bottom').closest('.rt-ShellBottom') as HTMLElement;
      expect(bottom).toHaveAttribute('data-mode', 'expanded');
    });

    it('transitions from expanded to collapsed correctly', async () => {
      function Fixture() {
        const [open, setOpen] = React.useState(true);
        return (
          <Shell.Root>
            <Shell.Header>
              <button onClick={() => setOpen(false)}>close</button>
            </Shell.Header>
            <Shell.Content>content</Shell.Content>
            <Shell.Bottom presentation="fixed" open={open}>
              bottom
            </Shell.Bottom>
          </Shell.Root>
        );
      }

      renderWithProviders(<Fixture />);

      const bottom = screen.getByText('bottom').closest('.rt-ShellBottom') as HTMLElement;
      expect(bottom).toHaveAttribute('data-mode', 'expanded');

      await userEvent.click(screen.getByRole('button', { name: /close/i }));

      await waitFor(() => {
        expect(bottom).toHaveAttribute('data-mode', 'collapsed');
      });
    });
  });

  describe('Multiple collapsed panes', () => {
    it('sidebar and inspector both have correct data-mode when collapsed', () => {
      renderWithProviders(
        <Shell.Root>
          <Shell.Sidebar presentation="fixed" defaultState="collapsed">
            sidebar
          </Shell.Sidebar>
          <Shell.Content>content</Shell.Content>
          <Shell.Inspector presentation="fixed" defaultOpen={false}>
            inspector
          </Shell.Inspector>
        </Shell.Root>,
      );

      const sidebar = screen.getByText('sidebar').closest('.rt-ShellSidebar') as HTMLElement;
      const inspector = screen.getByText('inspector').closest('.rt-ShellInspector') as HTMLElement;

      expect(sidebar).toHaveAttribute('data-mode', 'collapsed');
      expect(inspector).toHaveAttribute('data-mode', 'collapsed');
    });

    it('all panes can be collapsed simultaneously', () => {
      renderWithProviders(
        <Shell.Root>
          <Shell.Sidebar presentation="fixed" defaultState="collapsed">
            sidebar
          </Shell.Sidebar>
          <Shell.Content>content</Shell.Content>
          <Shell.Inspector presentation="fixed" defaultOpen={false}>
            inspector
          </Shell.Inspector>
          <Shell.Bottom presentation="fixed" defaultOpen={false}>
            bottom
          </Shell.Bottom>
        </Shell.Root>,
      );

      const sidebar = screen.getByText('sidebar').closest('.rt-ShellSidebar') as HTMLElement;
      const inspector = screen.getByText('inspector').closest('.rt-ShellInspector') as HTMLElement;
      const bottom = screen.getByText('bottom').closest('.rt-ShellBottom') as HTMLElement;

      expect(sidebar).toHaveAttribute('data-mode', 'collapsed');
      expect(inspector).toHaveAttribute('data-mode', 'collapsed');
      expect(bottom).toHaveAttribute('data-mode', 'collapsed');
    });
  });
});

