import * as React from 'react';
import { Toggle } from 'radix-ui';
import { Button } from './button.js';
import { useLiveAnnouncer } from '../hooks/use-live-announcer.js';

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
const ToggleButton = React.forwardRef<ToggleButtonElement, ToggleButtonProps>(
  ({ pressed, onPressedChange, defaultPressed, children, ...buttonProps }, forwardedRef) => {
    // Get the live announcer for accessibility announcements
    const announce = useLiveAnnouncer();

    /**
     * Extract accessible name from button content for announcements
     * This ensures screen readers announce meaningful state changes
     */
    const getAccessibleName = React.useCallback(() => {
      if (typeof children === 'string') return children;
      if (React.isValidElement(children) && typeof (children.props as any)?.children === 'string') {
        return (children.props as any).children;
      }
      return 'Toggle button';
    }, [children]);

    /**
     * Memoized handler for state changes with accessibility announcements
     * This ensures screen readers announce the new state immediately
     */
    const handlePressedChange = React.useCallback(
      (newPressed: boolean) => {
        const accessibleName = getAccessibleName();
        // Announce the state change for screen readers
        announce(`${accessibleName} ${newPressed ? 'pressed' : 'unpressed'}`);
        // Call the user's change handler
        onPressedChange?.(newPressed);
      },
      [announce, onPressedChange, getAccessibleName],
    );

    // Development-only warning for controlled/uncontrolled pattern
    // This helps developers avoid common state management mistakes
    React.useEffect(() => {
      if (process.env.NODE_ENV === 'development' && pressed !== undefined && onPressedChange === undefined) {
        console.warn(
          'ToggleButton: You provided a `pressed` prop without an `onPressedChange` handler. ' +
            'This will result in a read-only toggle button. If you want the button to be interactive, ' +
            'you should provide an `onPressedChange` handler.',
        );
      }
    }, [pressed, onPressedChange]);

    // Render the toggle button using Radix UI's Toggle primitive
    // This provides proper ARIA attributes and keyboard navigation
    return (
      <Toggle.Root
        pressed={pressed}
        onPressedChange={handlePressedChange}
        defaultPressed={defaultPressed}
        asChild
      >
        <Button {...buttonProps} ref={forwardedRef}>
          {children}
        </Button>
      </Toggle.Root>
    );
  },
);
ToggleButton.displayName = 'ToggleButton';

export { ToggleButton };
export type { ToggleButtonProps };
