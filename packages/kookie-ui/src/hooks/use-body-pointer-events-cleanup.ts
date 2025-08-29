import * as React from 'react';

let cleanupInstalled = false;

/**
 * Hook to cleanup stuck pointer-events: none on document.body
 *
 * This addresses an issue where react-remove-scroll (used by Radix UI Dialog)
 * sometimes fails to restore body pointer-events after dialog closes,
 * leaving the page unclickable.
 */
export function useBodyPointerEventsCleanup() {
  React.useEffect(() => {
    if (typeof document === 'undefined') return;
    if (cleanupInstalled) return;

    cleanupInstalled = true;

    const hasOpenModal = (): boolean => {
      // Check for open dialogs/alertdialogs
      const hasDialogs = Boolean(
        document.querySelector(
          '[role="dialog"][aria-modal="true"], [role="alertdialog"][aria-modal="true"]',
        ),
      );

      // Also check for any Radix overlays that are still mounted
      const hasRadixOverlays = Boolean(
        document.querySelector('[data-radix-popper-content-wrapper], [data-state="open"]'),
      );

      return hasDialogs || hasRadixOverlays;
    };

    const forceCleanup = () => {
      // Aggressive cleanup - remove pointer-events regardless
      if (document.body.style.pointerEvents === 'none') {
        console.log('[KookieUI] Force cleaning stuck pointer-events: none from body');
        document.body.style.pointerEvents = '';

        // Also remove any scroll-lock related attributes
        document.body.removeAttribute('data-scroll-locked');
        document.body.removeAttribute('data-remove-scroll');

        // Remove any classes that might be causing issues
        document.body.classList.remove('ReactModal__Body--open');
      }
    };

    const safeCleanup = () => {
      if (document.body.style.pointerEvents === 'none' && !hasOpenModal()) {
        console.log('[KookieUI] Safe cleaning stuck pointer-events: none from body');
        document.body.style.pointerEvents = '';
      }
    };

    // Force cleanup on any click outside modal content
    const onDocumentClick = (event: Event) => {
      const target = event.target as Element;
      if (
        target &&
        !target.closest(
          '[role="dialog"], [role="alertdialog"], [data-radix-popper-content-wrapper]',
        )
      ) {
        // Clicked outside any modal - force cleanup after a short delay
        setTimeout(forceCleanup, 100);
      }
    };

    // Force cleanup on ESC key
    const onEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setTimeout(forceCleanup, 200);
      }
    };

    // Safe cleanup on other interactions
    const onInteraction = () => {
      setTimeout(safeCleanup, 50);
    };

    // Install global listeners
    document.addEventListener('click', onDocumentClick, true);
    document.addEventListener('keydown', onEscapeKey, true);
    document.addEventListener('pointerup', onInteraction, true);
    document.addEventListener('transitionend', onInteraction, true);
    document.addEventListener('animationend', onInteraction, true);

    // Watch for DOM changes that might indicate overlay removal
    const observer = new MutationObserver(() => {
      setTimeout(safeCleanup, 0);
    });
    observer.observe(document.body, { childList: true, subtree: true, attributes: true });

    // Fallback periodic cleanup
    const intervalId = setInterval(() => {
      if (document.body.style.pointerEvents === 'none' && !hasOpenModal()) {
        console.log('[KookieUI] Periodic cleanup of stuck pointer-events');
        document.body.style.pointerEvents = '';
      }
    }, 1000);

    // Initial cleanup
    setTimeout(safeCleanup, 100);

    // Cleanup function (keep listeners for app lifetime)
    return () => {
      clearInterval(intervalId);
    };
  }, []);
}
