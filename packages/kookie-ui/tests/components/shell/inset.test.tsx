import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { renderWithProviders, screen } from '../../test-utils';
import { Shell } from '../../../src/components/index';

describe('Shell inset prop', () => {
  describe('Shell.Content', () => {
    it('does not have data-inset when inset is not provided', () => {
      renderWithProviders(
        <Shell.Root>
          <Shell.Content>content</Shell.Content>
        </Shell.Root>,
      );
      const content = screen.getByText('content').closest('.rt-ShellContent') as HTMLElement;
      expect(content.hasAttribute('data-inset')).toBe(false);
    });

    it('has data-inset when inset is true', () => {
      renderWithProviders(
        <Shell.Root>
          <Shell.Content inset>content</Shell.Content>
        </Shell.Root>,
      );
      const content = screen.getByText('content').closest('.rt-ShellContent') as HTMLElement;
      expect(content.hasAttribute('data-inset')).toBe(true);
    });
  });

  describe('Shell.Sidebar', () => {
    it('does not have data-inset when inset is not provided', () => {
      renderWithProviders(
        <Shell.Root>
          <Shell.Sidebar presentation="fixed" defaultState="expanded">
            sidebar
          </Shell.Sidebar>
          <Shell.Content>content</Shell.Content>
        </Shell.Root>,
      );
      const sidebar = screen.getByText('sidebar').closest('.rt-ShellSidebar') as HTMLElement;
      expect(sidebar.hasAttribute('data-inset')).toBe(false);
    });

    it('has data-inset when inset is true', () => {
      renderWithProviders(
        <Shell.Root>
          <Shell.Sidebar presentation="fixed" defaultState="expanded" inset>
            sidebar
          </Shell.Sidebar>
          <Shell.Content>content</Shell.Content>
        </Shell.Root>,
      );
      const sidebar = screen.getByText('sidebar').closest('.rt-ShellSidebar') as HTMLElement;
      expect(sidebar.hasAttribute('data-inset')).toBe(true);
    });
  });

  describe('Shell.Inspector', () => {
    it('does not have data-inset when inset is not provided', () => {
      renderWithProviders(
        <Shell.Root>
          <Shell.Content>content</Shell.Content>
          <Shell.Inspector presentation="fixed" defaultOpen>
            inspector
          </Shell.Inspector>
        </Shell.Root>,
      );
      const inspector = screen.getByText('inspector').closest('.rt-ShellInspector') as HTMLElement;
      expect(inspector.hasAttribute('data-inset')).toBe(false);
    });

    it('has data-inset when inset is true', () => {
      renderWithProviders(
        <Shell.Root>
          <Shell.Content>content</Shell.Content>
          <Shell.Inspector presentation="fixed" defaultOpen inset>
            inspector
          </Shell.Inspector>
        </Shell.Root>,
      );
      const inspector = screen.getByText('inspector').closest('.rt-ShellInspector') as HTMLElement;
      expect(inspector.hasAttribute('data-inset')).toBe(true);
    });
  });

  describe('Shell.Bottom', () => {
    it('does not have data-inset when inset is not provided', () => {
      renderWithProviders(
        <Shell.Root>
          <Shell.Content>content</Shell.Content>
          <Shell.Bottom presentation="fixed" defaultOpen>
            bottom
          </Shell.Bottom>
        </Shell.Root>,
      );
      const bottom = screen.getByText('bottom').closest('.rt-ShellBottom') as HTMLElement;
      expect(bottom.hasAttribute('data-inset')).toBe(false);
    });

    it('has data-inset when inset is true', () => {
      renderWithProviders(
        <Shell.Root>
          <Shell.Content>content</Shell.Content>
          <Shell.Bottom presentation="fixed" defaultOpen inset>
            bottom
          </Shell.Bottom>
        </Shell.Root>,
      );
      const bottom = screen.getByText('bottom').closest('.rt-ShellBottom') as HTMLElement;
      expect(bottom.hasAttribute('data-inset')).toBe(true);
    });
  });

  describe('Shell.Left (Rail + Panel)', () => {
    it('does not have data-inset when inset is not provided', () => {
      renderWithProviders(
        <Shell.Root>
          <Shell.Rail />
          <Shell.Panel>panel</Shell.Panel>
          <Shell.Content>content</Shell.Content>
        </Shell.Root>,
      );
      const left = screen.getByText('panel').closest('.rt-ShellLeft') as HTMLElement;
      expect(left.hasAttribute('data-inset')).toBe(false);
    });

    it('has data-inset when Rail has inset', () => {
      renderWithProviders(
        <Shell.Root>
          <Shell.Rail inset />
          <Shell.Panel>panel</Shell.Panel>
          <Shell.Content>content</Shell.Content>
        </Shell.Root>,
      );
      const left = screen.getByText('panel').closest('.rt-ShellLeft') as HTMLElement;
      expect(left.hasAttribute('data-inset')).toBe(true);
    });

    it('has data-inset when Panel has inset', () => {
      renderWithProviders(
        <Shell.Root>
          <Shell.Rail />
          <Shell.Panel inset>panel</Shell.Panel>
          <Shell.Content>content</Shell.Content>
        </Shell.Root>,
      );
      const left = screen.getByText('panel').closest('.rt-ShellLeft') as HTMLElement;
      expect(left.hasAttribute('data-inset')).toBe(true);
    });
  });

  describe('data-has-inset on Shell.Body', () => {
    it('does not have data-has-inset when no panes have inset', () => {
      renderWithProviders(
        <Shell.Root>
          <Shell.Content>content</Shell.Content>
        </Shell.Root>,
      );
      const body = document.querySelector('.rt-ShellBody') as HTMLElement;
      expect(body.hasAttribute('data-has-inset')).toBe(false);
    });

    it('has data-has-inset when Content has inset', () => {
      renderWithProviders(
        <Shell.Root>
          <Shell.Content inset>content</Shell.Content>
        </Shell.Root>,
      );
      const body = document.querySelector('.rt-ShellBody') as HTMLElement;
      expect(body.hasAttribute('data-has-inset')).toBe(true);
    });

    it('has data-has-inset when Sidebar has inset', () => {
      renderWithProviders(
        <Shell.Root>
          <Shell.Sidebar presentation="fixed" defaultState="expanded" inset>
            sidebar
          </Shell.Sidebar>
          <Shell.Content>content</Shell.Content>
        </Shell.Root>,
      );
      const body = document.querySelector('.rt-ShellBody') as HTMLElement;
      expect(body.hasAttribute('data-has-inset')).toBe(true);
    });

    it('has data-has-inset when Inspector has inset', () => {
      renderWithProviders(
        <Shell.Root>
          <Shell.Content>content</Shell.Content>
          <Shell.Inspector presentation="fixed" defaultOpen inset>
            inspector
          </Shell.Inspector>
        </Shell.Root>,
      );
      const body = document.querySelector('.rt-ShellBody') as HTMLElement;
      expect(body.hasAttribute('data-has-inset')).toBe(true);
    });

    it('has data-has-inset when Rail has inset', () => {
      renderWithProviders(
        <Shell.Root>
          <Shell.Rail inset />
          <Shell.Panel>panel</Shell.Panel>
          <Shell.Content>content</Shell.Content>
        </Shell.Root>,
      );
      const body = document.querySelector('.rt-ShellBody') as HTMLElement;
      expect(body.hasAttribute('data-has-inset')).toBe(true);
    });

    it('has data-has-inset when multiple panes have inset', () => {
      renderWithProviders(
        <Shell.Root>
          <Shell.Sidebar presentation="fixed" defaultState="expanded" inset>
            sidebar
          </Shell.Sidebar>
          <Shell.Content inset>content</Shell.Content>
          <Shell.Inspector presentation="fixed" defaultOpen inset>
            inspector
          </Shell.Inspector>
        </Shell.Root>,
      );
      const body = document.querySelector('.rt-ShellBody') as HTMLElement;
      expect(body.hasAttribute('data-has-inset')).toBe(true);
    });
  });
});
