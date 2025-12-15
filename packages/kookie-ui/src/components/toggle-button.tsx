import * as React from 'react';
import { Toggle } from 'radix-ui';
import { Button } from './button.js';
import { useToggleState } from '../hooks/use-toggle-state.js';

/**
 * ToggleButton props that extend Button with toggle-specific functionality
 *
 * The ToggleButton component provides a button that can be pressed/unpressed
 * with proper accessibility announcements and state management.
 */
interface ToggleButtonProps extends React.ComponentPropsWithoutRef<typeof Button> {
  /** Controlled pressed state */
  pressed?: boolean;
  /** Callback when pressed state changes */
  onPressedChange?: (pressed: boolean) => void;
  /** Default pressed state for uncontrolled usage */
  defaultPressed?: boolean;
}

type ToggleButtonElement = React.ElementRef<typeof Button>;

/**
 * ToggleButton component for buttons that can be pressed/unpressed
 *
 * The ToggleButton component extends Button with toggle functionality using
 * Radix UI's Toggle primitive. It provides proper accessibility announcements,
 * controlled/uncontrolled state management, and seamless integration with
 * the existing Button component.
 *
 * Key features:
 * - Controlled and uncontrolled state management
 * - Live accessibility announcements for screen readers
 * - Automatic state validation and warnings
 * - Seamless integration with Button props and styling
 * - Proper ARIA attributes for toggle functionality
 *
 * @example
 * ```tsx
 * // Uncontrolled toggle button
 * <ToggleButton defaultPressed={false}>
 *   Toggle Me
 * </ToggleButton>
 *
 * // Controlled toggle button
 * const [pressed, setPressed] = React.useState(false);
 * <ToggleButton
 *   pressed={pressed}
 *   onPressedChange={setPressed}
 * >
 *   {pressed ? 'On' : 'Off'}
 * </ToggleButton>
 *
 * // Toggle button with all Button props
 * <ToggleButton
 *   variant="solid"
 *   size="3"
 *   color="blue"
 *   pressed={isActive}
 *   onPressedChange={setIsActive}
 * >
 *   {isActive ? 'Active' : 'Inactive'}
 * </ToggleButton>
 * ```
 */
const ToggleButton = React.forwardRef<ToggleButtonElement, ToggleButtonProps>(({ pressed, onPressedChange, defaultPressed, children, ...buttonProps }, forwardedRef) => {
  /**
   * Extract accessible name from button content for announcements.
   * This ensures screen readers announce meaningful state changes.
   */
  const getAccessibleName = React.useCallback(() => {
    if (typeof children === 'string') return children;
    if (React.isValidElement(children) && typeof (children.props as any)?.children === 'string') {
      return (children.props as any).children;
    }
    return 'Toggle button';
  }, [children]);

  // Use shared toggle state hook for accessibility announcements and warnings
  const { handlePressedChange } = useToggleState({
    pressed,
    onPressedChange,
    getAccessibleName,
    componentName: 'ToggleButton',
  });

  // Render the toggle button using Radix UI's Toggle primitive
  // This provides proper ARIA attributes and keyboard navigation
  return (
    <Toggle.Root pressed={pressed} onPressedChange={handlePressedChange} defaultPressed={defaultPressed} asChild>
      <Button {...buttonProps} ref={forwardedRef}>
        {children}
      </Button>
    </Toggle.Root>
  );
});
ToggleButton.displayName = 'ToggleButton';

export { ToggleButton };
export type { ToggleButtonProps };
