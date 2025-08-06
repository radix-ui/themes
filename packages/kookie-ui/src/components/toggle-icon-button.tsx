import * as React from 'react';
import { Toggle } from 'radix-ui';
import { IconButton } from './icon-button.js';
import { BaseButton } from './_internal/base-button.js';
import { useLiveAnnouncer } from '../hooks/use-live-announcer.js';
import type { IconButtonProps } from './icon-button.js';

type ToggleIconButtonElement = React.ElementRef<typeof BaseButton>;

/**
 * Extract toggle-specific props from Radix Toggle
 * These props control the toggle state and behavior
 */
type ToggleProps = React.ComponentPropsWithoutRef<typeof Toggle.Root>;

/**
 * Required accessibility props for icon buttons (same as IconButton)
 * Icon buttons must have an accessible name to meet WCAG guidelines
 *
 * Three ways to provide accessibility:
 * 1. aria-label: Direct descriptive text
 * 2. aria-labelledby: Reference to a label element
 * 3. children: Visible text content (fallback)
 */
type AccessibilityProps =
  | { 'aria-label': string; 'aria-labelledby'?: never }
  | { 'aria-label'?: never; 'aria-labelledby': string }
  | { 'aria-label'?: never; 'aria-labelledby'?: never; children: React.ReactNode };

/**
 * Combine IconButton props with Toggle-specific props
 * Includes tooltip props from IconButton for comprehensive functionality
 */
interface ToggleIconButtonProps extends Omit<IconButtonProps, 'as'> {
  /** Controlled pressed state */
  pressed?: ToggleProps['pressed'];
  /** Callback when pressed state changes */
  onPressedChange?: ToggleProps['onPressedChange'];
  /** Default pressed state for uncontrolled usage */
  defaultPressed?: ToggleProps['defaultPressed'];
}

/**
 * Intersection with accessibility props to ensure compliance
 * This type ensures all ToggleIconButton instances have proper accessibility
 */
type ToggleIconButtonPropsWithAccessibility = ToggleIconButtonProps & AccessibilityProps;

/**
 * ToggleIconButton component for icon buttons that can be pressed/unpressed
 *
 * The ToggleIconButton component extends IconButton with toggle functionality
 * using Radix UI's Toggle primitive. It provides proper accessibility announcements,
 * controlled/uncontrolled state management, and seamless integration with
 * the existing IconButton component.
 *
 * Key features:
 * - Controlled and uncontrolled state management
 * - Live accessibility announcements for screen readers
 * - Enforced accessibility requirements (aria-label, aria-labelledby, or children)
 * - Automatic state validation and warnings
 * - Seamless integration with IconButton props and styling
 * - Proper ARIA attributes for toggle functionality
 * - Built-in tooltip support from IconButton
 *
 * @example
 * ```tsx
 * // Uncontrolled toggle icon button
 * <ToggleIconButton defaultPressed={false} aria-label="Toggle notifications">
 *   <Bell />
 * </ToggleIconButton>
 *
 * // Controlled toggle icon button
 * const [pressed, setPressed] = React.useState(false);
 * <ToggleIconButton
 *   pressed={pressed}
 *   onPressedChange={setPressed}
 *   aria-label="Toggle notifications"
 * >
 *   <Bell />
 * </ToggleIconButton>
 *
 * // Toggle icon button with tooltip
 * <ToggleIconButton
 *   variant="solid"
 *   size="3"
 *   color="blue"
 *   pressed={isActive}
 *   onPressedChange={setIsActive}
 *   aria-label="Toggle feature"
 *   tooltip="Toggle this feature on/off"
 * >
 *   <Star />
 * </ToggleIconButton>
 *
 * // Toggle icon button with aria-labelledby
 * <ToggleIconButton
 *   aria-labelledby="notifications-label"
 *   pressed={notificationsEnabled}
 *   onPressedChange={setNotificationsEnabled}
 * >
 *   <Bell />
 * </ToggleIconButton>
 * <span id="notifications-label">Toggle notifications</span>
 * ```
 */
const ToggleIconButton = React.forwardRef<
  ToggleIconButtonElement,
  ToggleIconButtonPropsWithAccessibility
>(({ pressed, onPressedChange, defaultPressed, ...iconButtonProps }, forwardedRef) => {
  // Get the live announcer for accessibility announcements
  const announce = useLiveAnnouncer();

  /**
   * Extract accessible name from various sources for announcements
   * This ensures screen readers announce meaningful state changes
   * Priority: aria-label > aria-labelledby > children > fallback
   */
  const getAccessibleName = React.useCallback(() => {
    const {
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      children,
    } = iconButtonProps;

    // First priority: direct aria-label
    if (ariaLabel) return ariaLabel;

    // Second priority: referenced label element
    if (ariaLabelledBy) {
      const labelElement = document.getElementById(ariaLabelledBy);
      return labelElement?.textContent || 'Toggle icon button';
    }

    // Third priority: visible text children
    if (typeof children === 'string') return children;
    if (React.isValidElement(children) && typeof (children.props as any)?.children === 'string') {
      return (children.props as any).children;
    }

    // Fallback for edge cases
    return 'Toggle icon button';
  }, [iconButtonProps]);

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
        'ToggleIconButton: You provided a `pressed` prop without an `onPressedChange` handler. ' +
          'This will result in a read-only toggle button. If you want the button to be interactive, ' +
          'you should provide an `onPressedChange` handler.',
      );
    }
  }, [pressed, onPressedChange]);

  // Render the toggle icon button using Radix UI's Toggle primitive
  // This provides proper ARIA attributes and keyboard navigation
  // The IconButton component handles accessibility validation internally
  return (
    <Toggle.Root
      pressed={pressed}
      onPressedChange={handlePressedChange}
      defaultPressed={defaultPressed}
      asChild
    >
      <IconButton {...iconButtonProps} ref={forwardedRef} />
    </Toggle.Root>
  );
});
ToggleIconButton.displayName = 'ToggleIconButton';

export { ToggleIconButton };
export type { ToggleIconButtonPropsWithAccessibility as ToggleIconButtonProps };
