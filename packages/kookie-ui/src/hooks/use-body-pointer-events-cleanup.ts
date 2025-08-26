import * as React from 'react';

/**
 * Hook to cleanup stuck pointer-events: none on document.body
 *
 * This addresses an issue where react-remove-scroll (used by Radix UI Dialog)
 * sometimes fails to restore body pointer-events after dialog closes,
 * leaving the page unclickable.
 */
export function useBodyPointerEventsCleanup() {
  React.useEffect(() => {
    const cleanup = () => {
      // Only intervene if body has pointer-events: none
      if (document.body.style.pointerEvents === 'none') {
        // Check if there are any actually open dialogs/overlays
        const hasOpenDialogs = document.querySelector(
          '[data-state="open"][role="dialog"], [data-state="open"][role="alertdialog"]',
        );

        if (!hasOpenDialogs) {
          // Safe to restore pointer events
          document.body.style.pointerEvents = '';
        }
      }
    };

    // Run cleanup after a small delay to allow for state transitions
    const timeoutId = setTimeout(cleanup, 100);

    // Also run cleanup on visibility change (tab switching)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        setTimeout(cleanup, 100);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
}
