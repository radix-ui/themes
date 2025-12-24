import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders, screen, fireEvent } from '../../test-utils';
import { TextField } from '../../../src/components/index';

describe('TextField', () => {
  describe('TextField.Root', () => {
    it('renders without crashing', () => {
      const { container } = renderWithProviders(<TextField.Root />);
      expect(container.querySelector('.rt-TextFieldRoot')).toBeInTheDocument();
    });

    it('renders with default size (2)', () => {
      const { container } = renderWithProviders(<TextField.Root />);
      const root = container.querySelector('.rt-TextFieldRoot');
      expect(root).toHaveClass('rt-r-size-2');
    });

    it('renders with custom size 1', () => {
      const { container } = renderWithProviders(<TextField.Root size="1" />);
      const root = container.querySelector('.rt-TextFieldRoot');
      expect(root).toHaveClass('rt-r-size-1');
    });

    it('renders with custom size 3', () => {
      const { container } = renderWithProviders(<TextField.Root size="3" />);
      const root = container.querySelector('.rt-TextFieldRoot');
      expect(root).toHaveClass('rt-r-size-3');
    });

    it('renders with default variant (surface)', () => {
      const { container } = renderWithProviders(<TextField.Root />);
      const root = container.querySelector('.rt-TextFieldRoot');
      expect(root).toHaveClass('rt-variant-surface');
    });

    it('renders with classic variant', () => {
      const { container } = renderWithProviders(<TextField.Root variant="classic" />);
      const root = container.querySelector('.rt-TextFieldRoot');
      expect(root).toHaveClass('rt-variant-classic');
    });

    it('renders with soft variant', () => {
      const { container } = renderWithProviders(<TextField.Root variant="soft" />);
      const root = container.querySelector('.rt-TextFieldRoot');
      expect(root).toHaveClass('rt-variant-soft');
    });

    it('renders with ghost variant', () => {
      const { container } = renderWithProviders(<TextField.Root variant="ghost" />);
      const root = container.querySelector('.rt-TextFieldRoot');
      expect(root).toHaveClass('rt-variant-ghost');
    });

    it('renders with outline variant', () => {
      const { container } = renderWithProviders(<TextField.Root variant="outline" />);
      const root = container.querySelector('.rt-TextFieldRoot');
      expect(root).toHaveClass('rt-variant-outline');
    });

    it('applies color prop', () => {
      const { container } = renderWithProviders(<TextField.Root color="red" />);
      const root = container.querySelector('.rt-TextFieldRoot');
      expect(root).toHaveAttribute('data-accent-color', 'red');
    });

    it('applies radius prop', () => {
      const { container } = renderWithProviders(<TextField.Root radius="full" />);
      const root = container.querySelector('.rt-TextFieldRoot');
      expect(root).toHaveAttribute('data-radius', 'full');
    });

    it('renders input element', () => {
      renderWithProviders(<TextField.Root placeholder="Enter text" />);
      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    });

    it('forwards value and onChange', () => {
      const handleChange = vi.fn();
      renderWithProviders(<TextField.Root value="test" onChange={handleChange} />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('test');
      fireEvent.change(input, { target: { value: 'new value' } });
      expect(handleChange).toHaveBeenCalled();
    });

    it('supports defaultValue', () => {
      renderWithProviders(<TextField.Root defaultValue="default" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('default');
    });

    it('renders with type number', () => {
      renderWithProviders(<TextField.Root type="number" />);
      const input = screen.getByRole('spinbutton');
      expect(input).toHaveAttribute('type', 'number');
    });

    it('renders with type email', () => {
      renderWithProviders(<TextField.Root type="email" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'email');
    });

    it('renders with type password', () => {
      const { container } = renderWithProviders(<TextField.Root type="password" />);
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('type', 'password');
    });

    it('renders with disabled state', () => {
      renderWithProviders(<TextField.Root disabled />);
      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();
    });

    it('renders with readOnly state', () => {
      renderWithProviders(<TextField.Root readOnly />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('readonly');
    });

    // Note: The `required` prop is defined in textFieldRootPropDefs but
    // is not currently forwarded to the native input element.
    // This test documents the current behavior.

    it('renders with error state', () => {
      const { container } = renderWithProviders(<TextField.Root error />);
      const root = container.querySelector('.rt-TextFieldRoot');
      expect(root).toHaveClass('rt-error');
    });

    it('renders error message when provided', () => {
      renderWithProviders(<TextField.Root error errorMessage="This field is required" />);
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });
  });

  describe('TextField.Slot', () => {
    it('renders slot content', () => {
      renderWithProviders(
        <TextField.Root>
          <TextField.Slot>Label</TextField.Slot>
        </TextField.Root>,
      );
      expect(screen.getByText('Label')).toBeInTheDocument();
    });

    it('renders left slot by default', () => {
      renderWithProviders(
        <TextField.Root>
          <TextField.Slot data-testid="slot">Left</TextField.Slot>
        </TextField.Root>,
      );
      const slot = screen.getByTestId('slot');
      expect(slot).not.toHaveAttribute('data-side', 'right');
    });

    it('renders right slot', () => {
      renderWithProviders(
        <TextField.Root>
          <TextField.Slot side="right" data-testid="slot">
            Right
          </TextField.Slot>
        </TextField.Root>,
      );
      const slot = screen.getByTestId('slot');
      expect(slot).toHaveAttribute('data-side', 'right');
    });

    it('renders left slot explicitly', () => {
      renderWithProviders(
        <TextField.Root>
          <TextField.Slot side="left" data-testid="slot">
            Left
          </TextField.Slot>
        </TextField.Root>,
      );
      const slot = screen.getByTestId('slot');
      expect(slot).toHaveAttribute('data-side', 'left');
    });

    it('renders multiple slots', () => {
      renderWithProviders(
        <TextField.Root>
          <TextField.Slot>Left</TextField.Slot>
          <TextField.Slot side="right">Right</TextField.Slot>
        </TextField.Root>,
      );
      expect(screen.getByText('Left')).toBeInTheDocument();
      expect(screen.getByText('Right')).toBeInTheDocument();
    });

    it('applies color to slot', () => {
      renderWithProviders(
        <TextField.Root>
          <TextField.Slot data-testid="slot" color="blue">
            Label
          </TextField.Slot>
        </TextField.Root>,
      );
      const slot = screen.getByTestId('slot');
      expect(slot).toHaveAttribute('data-accent-color', 'blue');
    });

    it('has TextFieldSlot class', () => {
      renderWithProviders(
        <TextField.Root>
          <TextField.Slot data-testid="slot">Label</TextField.Slot>
        </TextField.Root>,
      );
      const slot = screen.getByTestId('slot');
      expect(slot).toHaveClass('rt-TextFieldSlot');
    });
  });

  describe('TextField with input and slots', () => {
    it('renders complete TextField with input and slots', () => {
      renderWithProviders(
        <TextField.Root type="number" defaultValue={100}>
          <TextField.Slot>Width</TextField.Slot>
          <TextField.Slot side="right">px</TextField.Slot>
        </TextField.Root>,
      );
      expect(screen.getByText('Width')).toBeInTheDocument();
      expect(screen.getByText('px')).toBeInTheDocument();
      expect(screen.getByRole('spinbutton')).toHaveValue(100);
    });

    it('allows typing in input with slots', () => {
      renderWithProviders(
        <TextField.Root defaultValue="">
          <TextField.Slot>Label</TextField.Slot>
        </TextField.Root>,
      );
      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'hello' } });
      expect(input).toHaveValue('hello');
    });
  });
});

describe('TextField.Slot scrubbing props', () => {
  // Note: Full scrubbing behavior requires Pointer Lock API which is not
  // available in jsdom. These tests verify prop handling and initial state.
  // Full scrubbing behavior should be tested with e2e tests.

  it('renders with data-scrub attribute when scrub is enabled', () => {
    renderWithProviders(
      <TextField.Root>
        <TextField.Slot scrub data-testid="scrub-slot">
          Label
        </TextField.Slot>
      </TextField.Root>,
    );
    const slot = screen.getByTestId('scrub-slot');
    expect(slot).toHaveAttribute('data-scrub');
  });

  it('does not have data-scrub when scrub is disabled', () => {
    renderWithProviders(
      <TextField.Root>
        <TextField.Slot data-testid="slot">Label</TextField.Slot>
      </TextField.Root>,
    );
    const slot = screen.getByTestId('slot');
    expect(slot).not.toHaveAttribute('data-scrub');
  });

  it('does not have data-scrubbing initially', () => {
    renderWithProviders(
      <TextField.Root>
        <TextField.Slot scrub data-testid="scrub-slot">
          Label
        </TextField.Slot>
      </TextField.Root>,
    );
    const slot = screen.getByTestId('scrub-slot');
    expect(slot).not.toHaveAttribute('data-scrubbing');
  });

  it('accepts all scrub props without errors', () => {
    const handleScrub = vi.fn();
    expect(() => {
      renderWithProviders(
        <TextField.Root>
          <TextField.Slot
            scrub
            scrubValue={50}
            scrubStep={1}
            scrubSensitivity={2}
            scrubMin={0}
            scrubMax={100}
            scrubShiftMultiplier={10}
            scrubAltMultiplier={0.1}
            onScrub={handleScrub}
            data-testid="scrub-slot"
          >
            Label
          </TextField.Slot>
        </TextField.Root>,
      );
    }).not.toThrow();

    const slot = screen.getByTestId('scrub-slot');
    expect(slot).toHaveAttribute('data-scrub');
  });

  it('does not start scrubbing when clicking on nested interactive elements', () => {
    const handleScrub = vi.fn();
    renderWithProviders(
      <TextField.Root>
        <TextField.Slot scrub onScrub={handleScrub} data-testid="scrub-slot">
          <button data-testid="nested-button">Click me</button>
        </TextField.Slot>
      </TextField.Root>,
    );

    const button = screen.getByTestId('nested-button');
    fireEvent.pointerDown(button, { clientX: 100, clientY: 100 });

    // Scrubbing should not start when clicking nested button
    const slot = screen.getByTestId('scrub-slot');
    expect(slot).not.toHaveAttribute('data-scrubbing');
  });

  it('does not start scrubbing when clicking on nested anchor', () => {
    const handleScrub = vi.fn();
    renderWithProviders(
      <TextField.Root>
        <TextField.Slot scrub onScrub={handleScrub} data-testid="scrub-slot">
          <a href="#" data-testid="nested-link">
            Link
          </a>
        </TextField.Slot>
      </TextField.Root>,
    );

    const link = screen.getByTestId('nested-link');
    fireEvent.pointerDown(link, { clientX: 100, clientY: 100 });

    const slot = screen.getByTestId('scrub-slot');
    expect(slot).not.toHaveAttribute('data-scrubbing');
  });
});
