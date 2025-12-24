import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders, screen, fireEvent } from '../../test-utils';
import * as Combobox from '../../../src/components/combobox';

describe('Combobox', () => {
  describe('Combobox.Root', () => {
    it('renders without crashing', () => {
      const { container } = renderWithProviders(
        <Combobox.Root>
          <Combobox.Trigger data-testid="trigger">
            <Combobox.Value placeholder="Select option" />
          </Combobox.Trigger>
          <Combobox.Content>
            <Combobox.List>
              <Combobox.Item value="apple">Apple</Combobox.Item>
            </Combobox.List>
          </Combobox.Content>
        </Combobox.Root>,
      );
      expect(container.querySelector('.rt-ComboboxTrigger')).toBeInTheDocument();
    });

    it('starts closed by default', () => {
      renderWithProviders(
        <Combobox.Root>
          <Combobox.Trigger>
            <Combobox.Value />
          </Combobox.Trigger>
          <Combobox.Content>
            <Combobox.List>
              <Combobox.Item value="a">A</Combobox.Item>
            </Combobox.List>
          </Combobox.Content>
        </Combobox.Root>,
      );
      // Content is not mounted when closed (forceMount defaults to false for performance)
      const content = document.querySelector('.rt-ComboboxContent');
      expect(content).not.toBeInTheDocument();
    });

    it('keeps content mounted when forceMount is true', () => {
      renderWithProviders(
        <Combobox.Root>
          <Combobox.Trigger>
            <Combobox.Value />
          </Combobox.Trigger>
          <Combobox.Content forceMount>
            <Combobox.List>
              <Combobox.Item value="a">A</Combobox.Item>
            </Combobox.List>
          </Combobox.Content>
        </Combobox.Root>,
      );
      // Content is force-mounted but hidden via CSS when closed
      const content = document.querySelector('.rt-ComboboxContent');
      expect(content).toBeInTheDocument();
      expect(content).toHaveAttribute('data-state', 'closed');
    });

    it('disables trigger when disabled prop is true', () => {
      renderWithProviders(
        <Combobox.Root disabled>
          <Combobox.Trigger data-testid="trigger">
            <Combobox.Value />
          </Combobox.Trigger>
          <Combobox.Content>
            <Combobox.List>
              <Combobox.Item value="a">A</Combobox.Item>
            </Combobox.List>
          </Combobox.Content>
        </Combobox.Root>,
      );
      const trigger = screen.getByTestId('trigger');
      expect(trigger).toBeDisabled();
    });
  });

  describe('Combobox.Trigger accessibility', () => {
    it('has role="combobox"', () => {
      renderWithProviders(
        <Combobox.Root>
          <Combobox.Trigger data-testid="trigger">
            <Combobox.Value />
          </Combobox.Trigger>
          <Combobox.Content>
            <Combobox.List>
              <Combobox.Item value="a">A</Combobox.Item>
            </Combobox.List>
          </Combobox.Content>
        </Combobox.Root>,
      );
      const trigger = screen.getByTestId('trigger');
      expect(trigger).toHaveAttribute('role', 'combobox');
    });

    it('has aria-expanded=false when closed', () => {
      renderWithProviders(
        <Combobox.Root>
          <Combobox.Trigger data-testid="trigger">
            <Combobox.Value />
          </Combobox.Trigger>
          <Combobox.Content>
            <Combobox.List>
              <Combobox.Item value="a">A</Combobox.Item>
            </Combobox.List>
          </Combobox.Content>
        </Combobox.Root>,
      );
      const trigger = screen.getByTestId('trigger');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });

    it('has aria-haspopup="listbox"', () => {
      renderWithProviders(
        <Combobox.Root>
          <Combobox.Trigger data-testid="trigger">
            <Combobox.Value />
          </Combobox.Trigger>
          <Combobox.Content>
            <Combobox.List>
              <Combobox.Item value="a">A</Combobox.Item>
            </Combobox.List>
          </Combobox.Content>
        </Combobox.Root>,
      );
      const trigger = screen.getByTestId('trigger');
      expect(trigger).toHaveAttribute('aria-haspopup', 'listbox');
    });

    it('has aria-autocomplete="list"', () => {
      renderWithProviders(
        <Combobox.Root>
          <Combobox.Trigger data-testid="trigger">
            <Combobox.Value />
          </Combobox.Trigger>
          <Combobox.Content>
            <Combobox.List>
              <Combobox.Item value="a">A</Combobox.Item>
            </Combobox.List>
          </Combobox.Content>
        </Combobox.Root>,
      );
      const trigger = screen.getByTestId('trigger');
      expect(trigger).toHaveAttribute('aria-autocomplete', 'list');
    });

    it('has aria-disabled when disabled', () => {
      renderWithProviders(
        <Combobox.Root disabled>
          <Combobox.Trigger data-testid="trigger">
            <Combobox.Value />
          </Combobox.Trigger>
          <Combobox.Content>
            <Combobox.List>
              <Combobox.Item value="a">A</Combobox.Item>
            </Combobox.List>
          </Combobox.Content>
        </Combobox.Root>,
      );
      const trigger = screen.getByTestId('trigger');
      expect(trigger).toHaveAttribute('aria-disabled', 'true');
    });

    it('does not have aria-controls when closed', () => {
      renderWithProviders(
        <Combobox.Root>
          <Combobox.Trigger data-testid="trigger">
            <Combobox.Value />
          </Combobox.Trigger>
          <Combobox.Content>
            <Combobox.List>
              <Combobox.Item value="a">A</Combobox.Item>
            </Combobox.List>
          </Combobox.Content>
        </Combobox.Root>,
      );
      const trigger = screen.getByTestId('trigger');
      expect(trigger).not.toHaveAttribute('aria-controls');
    });
  });

  describe('Combobox.Trigger styling', () => {
    it('renders with correct class names', () => {
      renderWithProviders(
        <Combobox.Root>
          <Combobox.Trigger data-testid="trigger">
            <Combobox.Value />
          </Combobox.Trigger>
          <Combobox.Content>
            <Combobox.List>
              <Combobox.Item value="a">A</Combobox.Item>
            </Combobox.List>
          </Combobox.Content>
        </Combobox.Root>,
      );
      const trigger = screen.getByTestId('trigger');
      expect(trigger).toHaveClass('rt-ComboboxTrigger');
      expect(trigger).toHaveClass('rt-SelectTrigger');
    });

    it('applies variant class', () => {
      renderWithProviders(
        <Combobox.Root>
          <Combobox.Trigger variant="soft" data-testid="trigger">
            <Combobox.Value />
          </Combobox.Trigger>
          <Combobox.Content>
            <Combobox.List>
              <Combobox.Item value="a">A</Combobox.Item>
            </Combobox.List>
          </Combobox.Content>
        </Combobox.Root>,
      );
      const trigger = screen.getByTestId('trigger');
      expect(trigger).toHaveClass('rt-variant-soft');
    });

    it('applies color prop', () => {
      renderWithProviders(
        <Combobox.Root>
          <Combobox.Trigger color="jade" data-testid="trigger">
            <Combobox.Value />
          </Combobox.Trigger>
          <Combobox.Content>
            <Combobox.List>
              <Combobox.Item value="a">A</Combobox.Item>
            </Combobox.List>
          </Combobox.Content>
        </Combobox.Root>,
      );
      const trigger = screen.getByTestId('trigger');
      expect(trigger).toHaveAttribute('data-accent-color', 'jade');
    });

    it('applies error state', () => {
      renderWithProviders(
        <Combobox.Root>
          <Combobox.Trigger error data-testid="trigger">
            <Combobox.Value />
          </Combobox.Trigger>
          <Combobox.Content>
            <Combobox.List>
              <Combobox.Item value="a">A</Combobox.Item>
            </Combobox.List>
          </Combobox.Content>
        </Combobox.Root>,
      );
      const trigger = screen.getByTestId('trigger');
      expect(trigger).toHaveAttribute('data-error', 'true');
    });

    it('applies loading state', () => {
      renderWithProviders(
        <Combobox.Root>
          <Combobox.Trigger loading data-testid="trigger">
            <Combobox.Value />
          </Combobox.Trigger>
          <Combobox.Content>
            <Combobox.List>
              <Combobox.Item value="a">A</Combobox.Item>
            </Combobox.List>
          </Combobox.Content>
        </Combobox.Root>,
      );
      const trigger = screen.getByTestId('trigger');
      expect(trigger).toHaveAttribute('data-loading', 'true');
    });
  });

  describe('Combobox.Value', () => {
    it('shows placeholder when no value is selected', () => {
      renderWithProviders(
        <Combobox.Root>
          <Combobox.Trigger>
            <Combobox.Value placeholder="Select option" />
          </Combobox.Trigger>
          <Combobox.Content>
            <Combobox.List>
              <Combobox.Item value="a">A</Combobox.Item>
            </Combobox.List>
          </Combobox.Content>
        </Combobox.Root>,
      );
      expect(screen.getByText('Select option')).toBeInTheDocument();
    });

    it('uses placeholder from Root', () => {
      renderWithProviders(
        <Combobox.Root placeholder="Choose one">
          <Combobox.Trigger>
            <Combobox.Value />
          </Combobox.Trigger>
          <Combobox.Content>
            <Combobox.List>
              <Combobox.Item value="a">A</Combobox.Item>
            </Combobox.List>
          </Combobox.Content>
        </Combobox.Root>,
      );
      expect(screen.getByText('Choose one')).toBeInTheDocument();
    });

    it('Value placeholder overrides Root placeholder', () => {
      renderWithProviders(
        <Combobox.Root placeholder="Root placeholder">
          <Combobox.Trigger>
            <Combobox.Value placeholder="Value placeholder" />
          </Combobox.Trigger>
          <Combobox.Content>
            <Combobox.List>
              <Combobox.Item value="a">A</Combobox.Item>
            </Combobox.List>
          </Combobox.Content>
        </Combobox.Root>,
      );
      expect(screen.getByText('Value placeholder')).toBeInTheDocument();
    });

    it('shows static displayValue when provided', () => {
      renderWithProviders(
        <Combobox.Root value="usa" displayValue="United States">
          <Combobox.Trigger>
            <Combobox.Value placeholder="Select country" />
          </Combobox.Trigger>
          <Combobox.Content>
            <Combobox.List>
              <Combobox.Item value="usa">US</Combobox.Item>
            </Combobox.List>
          </Combobox.Content>
        </Combobox.Root>,
      );
      expect(screen.getByText('United States')).toBeInTheDocument();
    });

    it('calls displayValue function with current value', () => {
      const countries = [
        { code: 'usa', name: 'United States' },
        { code: 'uk', name: 'United Kingdom' },
      ];
      const getDisplayValue = (value: string | null) =>
        countries.find((c) => c.code === value)?.name;

      renderWithProviders(
        <Combobox.Root value="uk" displayValue={getDisplayValue}>
          <Combobox.Trigger>
            <Combobox.Value placeholder="Select country" />
          </Combobox.Trigger>
          <Combobox.Content>
            <Combobox.List>
              <Combobox.Item value="usa">US</Combobox.Item>
              <Combobox.Item value="uk">UK</Combobox.Item>
            </Combobox.List>
          </Combobox.Content>
        </Combobox.Root>,
      );
      expect(screen.getByText('United Kingdom')).toBeInTheDocument();
    });

    it('displayValue function receives null when no value selected', () => {
      const displayValueFn = vi.fn((value: string | null) => (value ? `Selected: ${value}` : undefined));

      renderWithProviders(
        <Combobox.Root displayValue={displayValueFn}>
          <Combobox.Trigger>
            <Combobox.Value placeholder="Select option" />
          </Combobox.Trigger>
          <Combobox.Content>
            <Combobox.List>
              <Combobox.Item value="a">A</Combobox.Item>
            </Combobox.List>
          </Combobox.Content>
        </Combobox.Root>,
      );
      expect(displayValueFn).toHaveBeenCalledWith(null);
      expect(screen.getByText('Select option')).toBeInTheDocument();
    });

    it('displayValue takes priority over registered item label', () => {
      renderWithProviders(
        <Combobox.Root value="a" displayValue="Custom Display">
          <Combobox.Trigger>
            <Combobox.Value placeholder="Select option" />
          </Combobox.Trigger>
          <Combobox.Content forceMount>
            <Combobox.List>
              <Combobox.Item value="a">Item A Label</Combobox.Item>
            </Combobox.List>
          </Combobox.Content>
        </Combobox.Root>,
      );
      // displayValue should take priority even though item is mounted
      expect(screen.getByText('Custom Display')).toBeInTheDocument();
    });
  });

  describe('Combobox.Label', () => {
    it('renders label with class name', () => {
      renderWithProviders(
        <Combobox.Root defaultOpen>
          <Combobox.Trigger>
            <Combobox.Value />
          </Combobox.Trigger>
          <Combobox.Content>
            <Combobox.List>
              <Combobox.Label>Category</Combobox.Label>
              <Combobox.Item value="a">A</Combobox.Item>
            </Combobox.List>
          </Combobox.Content>
        </Combobox.Root>,
      );

      const label = screen.getByText('Category');
      expect(label).toHaveClass('rt-ComboboxLabel');
      expect(label).toHaveClass('rt-BaseMenuLabel');
    });
  });

  describe('Combobox.Separator', () => {
    it('renders separator with class name', () => {
      renderWithProviders(
        <Combobox.Root defaultOpen>
          <Combobox.Trigger>
            <Combobox.Value />
          </Combobox.Trigger>
          <Combobox.Content>
            <Combobox.List>
              <Combobox.Item value="a">A</Combobox.Item>
              <Combobox.Separator data-testid="separator" />
              <Combobox.Item value="b">B</Combobox.Item>
            </Combobox.List>
          </Combobox.Content>
        </Combobox.Root>,
      );

      const separator = screen.getByTestId('separator');
      expect(separator).toHaveClass('rt-ComboboxSeparator');
      expect(separator).toHaveClass('rt-BaseMenuSeparator');
    });
  });

  describe('Context errors', () => {
    it('throws when Trigger is used outside Root', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        renderWithProviders(
          <Combobox.Trigger>
            <Combobox.Value />
          </Combobox.Trigger>,
        );
      }).toThrow('Combobox.Trigger must be used within Combobox.Root');

      consoleSpy.mockRestore();
    });

    it('throws when Item is used outside Root', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        renderWithProviders(<Combobox.Item value="a">A</Combobox.Item>);
      }).toThrow('Combobox.Item must be used within Combobox.Root');

      consoleSpy.mockRestore();
    });
  });
});

describe('Combobox type exports', () => {
  it('exports all component types', () => {
    // This test verifies TypeScript types are exported correctly
    // by using them - if types are missing, this will fail to compile
    const _rootProps: Combobox.RootProps = { children: null };
    const _triggerProps: Combobox.TriggerProps = {};
    const _valueProps: Combobox.ValueProps = {};
    const _contentProps: Combobox.ContentProps = {};
    const _inputProps: Combobox.InputProps = {};
    const _listProps: Combobox.ListProps = {};
    const _emptyProps: Combobox.EmptyProps = {};
    const _groupProps: Combobox.GroupProps = {};
    const _labelProps: Combobox.LabelProps = {};
    const _separatorProps: Combobox.SeparatorProps = {};
    const _itemProps: Combobox.ItemProps = { value: 'test' };

    expect(true).toBe(true);
  });
});
