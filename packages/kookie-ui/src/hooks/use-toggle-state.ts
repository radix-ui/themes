import * as React from 'react';
import { useLiveAnnouncer } from './use-live-announcer.js';

/**
 * Options for the useToggleState hook
 */
interface UseToggleStateOptions {
  /** Controlled pressed state */
  pressed?: boolean;
  /** Callback when pressed state changes */
  onPressedChange?: (pressed: boolean) => void;
  /** Function to get the accessible name for announcements */
  getAccessibleName: () => string;
  /** Component name for warning messages */
  componentName: string;
}

/**
 * Hook for shared toggle button state management.
 * Provides accessibility announcements and controlled/uncontrolled warnings.
 *
 * @param options - Configuration options for the toggle state
 * @returns Object containing the handlePressedChange callback
 *
 * @example
 * ```tsx
 * const getAccessibleName = React.useCallback(() => 'Toggle button', []);
 *
 * const { handlePressedChange } = useToggleState({
 *   pressed,
 *   onPressedChange,
 *   getAccessibleName,
 *   componentName: 'ToggleButton',
 * });
 * ```
 */
export function useToggleState({ pressed, onPressedChange, getAccessibleName, componentName }: UseToggleStateOptions) {
  const announce = useLiveAnnouncer();

  // Track if we've already warned about controlled without handler
  const warnedRef = React.useRef(false);

  /**
   * Memoized handler for state changes with accessibility announcements.
   * Announces the new state immediately for screen readers.
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
  // Only warns once to avoid console spam
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development' && pressed !== undefined && onPressedChange === undefined && !warnedRef.current) {
      warnedRef.current = true;
      console.warn(
        `${componentName}: You provided a \`pressed\` prop without an \`onPressedChange\` handler. ` +
          'This will result in a read-only toggle button. If you want the button to be interactive, ' +
          'you should provide an `onPressedChange` handler.',
      );
    }
  }, [pressed, onPressedChange, componentName]);

  return { handlePressedChange };
}
