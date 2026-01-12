import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { renderWithProviders, screen, fireEvent, waitFor, render } from '../../test-utils';
import * as DropdownMenu from '../../../src/components/dropdown-menu';
import { Button } from '../../../src/components/button';
import { Theme } from '../../../src/components/theme';

describe('DropdownMenu Drill-Down Mode', () => {
  describe('submenuBehavior="drill-down"', () => {
    it('renders root menu items initially', async () => {
      renderWithProviders(
        <DropdownMenu.Root defaultOpen>
          <DropdownMenu.Trigger>
            <Button>Open</Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content submenuBehavior="drill-down">
            <DropdownMenu.Item>Home</DropdownMenu.Item>
            <DropdownMenu.Item>Profile</DropdownMenu.Item>
            <DropdownMenu.Sub label="Settings">
              <DropdownMenu.SubTrigger>Settings</DropdownMenu.SubTrigger>
              <DropdownMenu.SubContent>
                <DropdownMenu.Item>General</DropdownMenu.Item>
              </DropdownMenu.SubContent>
            </DropdownMenu.Sub>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      );

      await waitFor(() => {
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Profile')).toBeInTheDocument();
      });
    });

    it('navigates to submenu when SubTrigger is clicked', async () => {
      renderWithProviders(
        <DropdownMenu.Root defaultOpen>
          <DropdownMenu.Trigger>
            <Button>Open</Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content submenuBehavior="drill-down">
            <DropdownMenu.Item>Home</DropdownMenu.Item>
            <DropdownMenu.Sub label="Back">
              <DropdownMenu.SubTrigger>Settings</DropdownMenu.SubTrigger>
              <DropdownMenu.SubContent>
                <DropdownMenu.Item>General</DropdownMenu.Item>
              </DropdownMenu.SubContent>
            </DropdownMenu.Sub>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      );

      // Wait for menu to render
      await waitFor(() => {
        expect(screen.getByText('Settings')).toBeInTheDocument();
      });

      // Click on Settings SubTrigger
      fireEvent.click(screen.getByText('Settings'));

      // Should show submenu items
      await waitFor(() => {
        expect(screen.getByText('General')).toBeVisible();
      });
    });

    it('navigates back when back button is clicked', async () => {
      renderWithProviders(
        <DropdownMenu.Root defaultOpen>
          <DropdownMenu.Trigger>
            <Button>Open</Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content submenuBehavior="drill-down">
            <DropdownMenu.Item>Home</DropdownMenu.Item>
            <DropdownMenu.Sub label="Go Back">
              <DropdownMenu.SubTrigger>Settings</DropdownMenu.SubTrigger>
              <DropdownMenu.SubContent>
                <DropdownMenu.Item>General</DropdownMenu.Item>
              </DropdownMenu.SubContent>
            </DropdownMenu.Sub>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      );

      // Navigate to submenu
      await waitFor(() => {
        expect(screen.getByText('Settings')).toBeInTheDocument();
      });
      fireEvent.click(screen.getByText('Settings'));

      // Wait for submenu to show
      await waitFor(() => {
        expect(screen.getByText('General')).toBeVisible();
      });

      // Click back button (has the label "Go Back")
      fireEvent.click(screen.getByText('Go Back'));

      // Should show root menu again
      await waitFor(() => {
        expect(screen.getByText('Home')).toBeVisible();
      });
    });

    it('supports nested submenus (3 levels deep)', async () => {
      renderWithProviders(
        <DropdownMenu.Root defaultOpen>
          <DropdownMenu.Trigger>
            <Button>Open</Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content submenuBehavior="drill-down">
            <DropdownMenu.Item>Root Item</DropdownMenu.Item>
            <DropdownMenu.Sub label="Back L1">
              <DropdownMenu.SubTrigger>Go to Level 1</DropdownMenu.SubTrigger>
              <DropdownMenu.SubContent>
                <DropdownMenu.Item>Level 1 Item</DropdownMenu.Item>
                <DropdownMenu.Sub label="Back L2">
                  <DropdownMenu.SubTrigger>Go to Level 2</DropdownMenu.SubTrigger>
                  <DropdownMenu.SubContent>
                    <DropdownMenu.Item>Level 2 Item</DropdownMenu.Item>
                  </DropdownMenu.SubContent>
                </DropdownMenu.Sub>
              </DropdownMenu.SubContent>
            </DropdownMenu.Sub>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      );

      // Start at root
      await waitFor(() => {
        expect(screen.getByText('Root Item')).toBeInTheDocument();
      });

      // Navigate to level 1
      fireEvent.click(screen.getByText('Go to Level 1'));
      await waitFor(() => {
        expect(screen.getByText('Level 1 Item')).toBeVisible();
      });

      // Navigate to level 2
      fireEvent.click(screen.getByText('Go to Level 2'));
      await waitFor(() => {
        expect(screen.getByText('Level 2 Item')).toBeVisible();
      });

      // Navigate back to level 1
      fireEvent.click(screen.getByText('Back L2'));
      await waitFor(() => {
        expect(screen.getByText('Level 1 Item')).toBeVisible();
      });
    });

    it('renders back button with custom label from Sub', async () => {
      renderWithProviders(
        <DropdownMenu.Root defaultOpen>
          <DropdownMenu.Trigger>
            <Button>Open</Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content submenuBehavior="drill-down">
            <DropdownMenu.Sub label="Custom Back Label">
              <DropdownMenu.SubTrigger>Open Sub</DropdownMenu.SubTrigger>
              <DropdownMenu.SubContent>
                <DropdownMenu.Item>Sub Item</DropdownMenu.Item>
              </DropdownMenu.SubContent>
            </DropdownMenu.Sub>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      );

      // Navigate to submenu
      await waitFor(() => {
        expect(screen.getByText('Open Sub')).toBeInTheDocument();
      });
      fireEvent.click(screen.getByText('Open Sub'));

      // Should show custom back label
      await waitFor(() => {
        expect(screen.getByText('Custom Back Label')).toBeInTheDocument();
      });
    });

    it('supports keyboard navigation (Enter to open submenu)', async () => {
      renderWithProviders(
        <DropdownMenu.Root defaultOpen>
          <DropdownMenu.Trigger>
            <Button>Open</Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content submenuBehavior="drill-down">
            <DropdownMenu.Sub label="Back">
              <DropdownMenu.SubTrigger>Go to Settings</DropdownMenu.SubTrigger>
              <DropdownMenu.SubContent>
                <DropdownMenu.Item>General</DropdownMenu.Item>
              </DropdownMenu.SubContent>
            </DropdownMenu.Sub>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      );

      await waitFor(() => {
        expect(screen.getByText('Go to Settings')).toBeInTheDocument();
      });

      const subTrigger = screen.getByText('Go to Settings');
      fireEvent.keyDown(subTrigger, { key: 'Enter' });

      await waitFor(() => {
        expect(screen.getByText('General')).toBeVisible();
      });
    });
  });

  describe('submenuBehavior="cascade" (default)', () => {
    it('renders menu without drill-down specific classes', async () => {
      renderWithProviders(
        <DropdownMenu.Root defaultOpen>
          <DropdownMenu.Trigger>
            <Button>Open</Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content submenuBehavior="cascade">
            <DropdownMenu.Item>Home</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      );

      // Root items should be visible
      await waitFor(() => {
        expect(screen.getByText('Home')).toBeInTheDocument();
      });

      // Should NOT have drill-down root wrapper
      const content = screen.getByText('Home').closest('.rt-DropdownMenuViewport');
      expect(content?.querySelector('.rt-DropdownMenuDrillDownRoot')).toBeNull();
    });
  });

  describe('responsive submenuBehavior', () => {
    it('accepts responsive object syntax', async () => {
      // This test just verifies the prop is accepted without errors
      renderWithProviders(
        <DropdownMenu.Root defaultOpen>
          <DropdownMenu.Trigger>
            <Button>Open</Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content submenuBehavior={{ initial: 'drill-down', md: 'cascade' }}>
            <DropdownMenu.Item>Home</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      );

      await waitFor(() => {
        expect(screen.getByText('Home')).toBeInTheDocument();
      });
    });
  });

  describe('submenu ID uniqueness (useId)', () => {
    it('multiple sibling submenus have independent navigation', async () => {
      // This tests that each Sub gets a unique ID, so clicking one doesn't affect another
      renderWithProviders(
        <DropdownMenu.Root defaultOpen>
          <DropdownMenu.Trigger>
            <Button>Open</Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content submenuBehavior="drill-down">
            <DropdownMenu.Sub label="Back from A">
              <DropdownMenu.SubTrigger>Go to A</DropdownMenu.SubTrigger>
              <DropdownMenu.SubContent>
                <DropdownMenu.Item>Item in A</DropdownMenu.Item>
              </DropdownMenu.SubContent>
            </DropdownMenu.Sub>
            <DropdownMenu.Sub label="Back from B">
              <DropdownMenu.SubTrigger>Go to B</DropdownMenu.SubTrigger>
              <DropdownMenu.SubContent>
                <DropdownMenu.Item>Item in B</DropdownMenu.Item>
              </DropdownMenu.SubContent>
            </DropdownMenu.Sub>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      );

      // Both triggers should be visible initially
      await waitFor(() => {
        expect(screen.getByText('Go to A')).toBeInTheDocument();
        expect(screen.getByText('Go to B')).toBeInTheDocument();
      });

      // Navigate to submenu A
      fireEvent.click(screen.getByText('Go to A'));

      // Should show A's back button label (proves A's panel is active, not B's)
      await waitFor(() => {
        expect(screen.getByText('Back from A')).toBeInTheDocument();
      });

      // B's back button should NOT be visible (its panel is not active)
      // We check that Back from B doesn't have data-drill-down-active
      const backFromB = screen.queryByText('Back from B');
      const backFromBPanel = backFromB?.closest('.rt-DropdownMenuDrillDownPanel');
      expect(backFromBPanel).not.toHaveAttribute('data-drill-down-active');

      // Now navigate back and then to B
      fireEvent.click(screen.getByText('Back from A'));
      await waitFor(() => {
        expect(screen.getByText('Go to B')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByText('Go to B'));
      await waitFor(() => {
        expect(screen.getByText('Back from B')).toBeInTheDocument();
      });

      // Now B's panel should be active, not A's
      const backFromA = screen.queryByText('Back from A');
      const backFromAPanel = backFromA?.closest('.rt-DropdownMenuDrillDownPanel');
      expect(backFromAPanel).not.toHaveAttribute('data-drill-down-active');
    });

    it('IDs are stable across re-renders', async () => {
      // Test that navigating in/out doesn't break due to ID changes
      const { rerender } = render(
        <Theme>
          <DropdownMenu.Root defaultOpen>
            <DropdownMenu.Trigger>
              <Button>Open</Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content submenuBehavior="drill-down">
              <DropdownMenu.Sub label="Back">
                <DropdownMenu.SubTrigger>Settings</DropdownMenu.SubTrigger>
                <DropdownMenu.SubContent>
                  <DropdownMenu.Item>General</DropdownMenu.Item>
                </DropdownMenu.SubContent>
              </DropdownMenu.Sub>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </Theme>
      );

      await waitFor(() => {
        expect(screen.getByText('Settings')).toBeInTheDocument();
      });

      // Navigate to submenu
      fireEvent.click(screen.getByText('Settings'));
      await waitFor(() => {
        expect(screen.getByText('General')).toBeVisible();
      });

      // Force a re-render
      rerender(
        <Theme>
          <DropdownMenu.Root defaultOpen>
            <DropdownMenu.Trigger>
              <Button>Open</Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content submenuBehavior="drill-down">
              <DropdownMenu.Sub label="Back">
                <DropdownMenu.SubTrigger>Settings</DropdownMenu.SubTrigger>
                <DropdownMenu.SubContent>
                  <DropdownMenu.Item>General</DropdownMenu.Item>
                </DropdownMenu.SubContent>
              </DropdownMenu.Sub>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </Theme>
      );

      // Should still show submenu content (ID remained stable)
      await waitFor(() => {
        expect(screen.getByText('General')).toBeVisible();
      });

      // Navigate back
      fireEvent.click(screen.getByText('Back'));
      await waitFor(() => {
        expect(screen.getByText('Settings')).toBeVisible();
      });
    });
  });
});
