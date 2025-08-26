import * as React from 'react';

let bodyCleanupInstalled = false;

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

    let timeoutId: number | undefined;

    const hasOpenModal = (): boolean => {
      // Detect any open modal dialogs/alertdialogs
      return Boolean(
        document.querySelector(
          '[role="dialog"][aria-modal="true"], [role="alertdialog"][aria-modal="true"]',
        ),
      );
    };

    const cleanup = () => {
      if (document.body.style.pointerEvents === 'none' && !hasOpenModal()) {
        document.body.style.pointerEvents = '';
      }
    };

    const scheduleCleanup = (delay = 50) => {
      if (timeoutId) window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(cleanup, delay);
    };

    // Initial run to catch already-stuck state
    scheduleCleanup(100);

    // If already installed globally, don't re-register listeners/observers
    if (bodyCleanupInstalled) {
      return () => {
        if (timeoutId) window.clearTimeout(timeoutId);
      };
    }

    bodyCleanupInstalled = true;

    const onPointer = () => scheduleCleanup(50);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' || event.key === 'Enter' || event.key === ' ') scheduleCleanup(50);
    };
    const onVisibility = () => {
      if (!document.hidden) scheduleCleanup(50);
    };
    const onTransitionEnd = () => scheduleCleanup(0);
    const onAnimationEnd = () => scheduleCleanup(0);

    // Listen for common interactions that close overlays/menus
    document.addEventListener('pointerup', onPointer, true);
    document.addEventListener('click', onPointer, true);
    document.addEventListener('keydown', onKey, true);
    document.addEventListener('keyup', onKey, true);
    document.addEventListener('visibilitychange', onVisibility);
    document.addEventListener('transitionend', onTransitionEnd, true);
    document.addEventListener('animationend', onAnimationEnd, true);

    // Observe body style changes (where pointer-events is applied) and DOM mutations
    const bodyObserver = new MutationObserver(() => scheduleCleanup(0));
    bodyObserver.observe(document.body, { attributes: true, attributeFilter: ['style'] });

    const domObserver = new MutationObserver(() => scheduleCleanup(0));
    domObserver.observe(document, { childList: true, subtree: true });

    // Keep listeners/observers for the app lifetime to ensure cleanup even after overlays unmount
    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);
}
