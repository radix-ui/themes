import * as React from 'react';

/**
 * Reference counter to track how many components are using the live region.
 * Only remove the live region when no components are using it.
 */
let liveRegionRefCount = 0;

/**
 * Hook for making live announcements to screen readers
 * Creates a hidden aria-live region for announcing dynamic content changes
 */
export function useLiveAnnouncer() {
  // Track the timeout so we can clean it up on unmount
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Create aria-live region if it doesn't exist
  React.useEffect(() => {
    let liveRegion = document.getElementById('rt-live-announcer');

    if (!liveRegion) {
      liveRegion = document.createElement('div');
      liveRegion.id = 'rt-live-announcer';
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.style.cssText = `
        position: absolute;
        left: -10000px;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
      `;
      document.body.appendChild(liveRegion);
    }

    // Increment ref count when component mounts
    liveRegionRefCount++;

    return () => {
      // Decrement ref count when component unmounts
      liveRegionRefCount--;

      // Clean up timeout on unmount
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Only remove the live region if no components are using it
      if (liveRegionRefCount === 0) {
        const region = document.getElementById('rt-live-announcer');
        if (region) {
          region.remove();
        }
      }
    };
  }, []);

  const announce = React.useCallback((message: string) => {
    const liveRegion = document.getElementById('rt-live-announcer');
    if (liveRegion) {
      // Clear any pending timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Clear previous announcements
      liveRegion.textContent = '';

      // Add new announcement with a small delay to ensure it's announced
      timeoutRef.current = setTimeout(() => {
        liveRegion.textContent = message;
      }, 100);
    }
  }, []);

  return announce;
}
