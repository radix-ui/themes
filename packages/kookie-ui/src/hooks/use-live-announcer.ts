import * as React from 'react';

/**
 * Hook for making live announcements to screen readers
 * Creates a hidden aria-live region for announcing dynamic content changes
 */
export function useLiveAnnouncer() {

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

    return () => {
      // Clean up on unmount if no other components are using it
      if (liveRegion && !liveRegion.hasChildNodes()) {
        liveRegion.remove();
      }
    };
  }, []);

  const announce = React.useCallback((message: string) => {
    const liveRegion = document.getElementById('rt-live-announcer');
    if (liveRegion) {
      // Clear previous announcements
      liveRegion.textContent = '';
      
      // Add new announcement with a small delay to ensure it's announced
      setTimeout(() => {
        liveRegion.textContent = message;
      }, 100);
    }
  }, []);

  return announce;
} 