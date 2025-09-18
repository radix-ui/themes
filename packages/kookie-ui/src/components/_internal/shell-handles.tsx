import * as React from 'react';
import classNames from 'classnames';
import { usePaneResize } from './shell-resize.js';

export const PaneHandle = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(({ className, children, ...props }, ref) => {
  const {
    containerRef,
    cssVarName,
    minSize,
    maxSize,
    defaultSize,
    orientation,
    edge,
    computeNext,
    onResize,
    onResizeStart,
    onResizeEnd,
    snapPoints,
    snapTolerance,
    collapseThreshold,
    collapsible,
    target: _target,
    requestCollapse,
    requestToggle,
  } = usePaneResize();

  const activeCleanupRef = React.useRef<(() => void) | null>(null);
  React.useEffect(
    () => () => {
      try {
        activeCleanupRef.current?.();
      } catch {}
      activeCleanupRef.current = null;
    },
    [],
  );

  const ariaOrientation = orientation;

  return (
    <div
      {...props}
      ref={ref}
      className={classNames('rt-ShellResizer', className)}
      data-orientation={orientation}
      data-edge={edge}
      role="slider"
      aria-orientation={ariaOrientation}
      aria-valuemin={minSize}
      aria-valuemax={maxSize}
      aria-valuenow={defaultSize}
      tabIndex={0}
      onPointerDown={(e) => {
        if (!containerRef.current) return;
        e.preventDefault();
        const container = containerRef.current;
        const handleEl = e.currentTarget as HTMLElement;
        const pointerId = e.pointerId;
        try {
          activeCleanupRef.current?.();
        } catch {}
        container.setAttribute('data-resizing', '');
        try {
          handleEl.setPointerCapture(pointerId);
        } catch {}
        const startClient = orientation === 'vertical' ? e.clientX : e.clientY;
        const startSize = parseFloat(getComputedStyle(container).getPropertyValue(cssVarName) || `${defaultSize}`);
        const clamp = (v: number) => Math.min(Math.max(v, minSize), maxSize);
        const body = document.body;
        const prevCursor = body.style.cursor;
        const prevUserSelect = body.style.userSelect;
        body.style.cursor = orientation === 'vertical' ? 'col-resize' : 'row-resize';
        body.style.userSelect = 'none';
        onResizeStart?.(startSize);
        const handleMove = (ev: PointerEvent) => {
          const client = orientation === 'vertical' ? ev.clientX : ev.clientY;
          const next = clamp(computeNext(client, startClient, startSize));
          container.style.setProperty(cssVarName, `${next}px`);
          handleEl.setAttribute('aria-valuenow', String(next));
          onResize?.(next);
        };
        const cleanup = () => {
          try {
            handleEl.releasePointerCapture(pointerId);
          } catch {}
          window.removeEventListener('pointermove', handleMove as any);
          document.removeEventListener('pointermove', handleMove as any);
          window.removeEventListener('mousemove', handleMove as any);
          document.removeEventListener('mousemove', handleMove as any);
          handleEl.removeEventListener('pointermove', handleMove as any);
          window.removeEventListener('pointerup', handleUp as any);
          document.removeEventListener('pointerup', handleUp as any);
          window.removeEventListener('mouseup', handleUp as any);
          document.removeEventListener('mouseup', handleUp as any);
          window.removeEventListener('pointercancel', handleUp as any);
          document.removeEventListener('pointercancel', handleUp as any);
          window.removeEventListener('keydown', handleKey as any);
          handleEl.removeEventListener('lostpointercapture', handleUp as any);
          container.removeAttribute('data-resizing');
          body.style.cursor = prevCursor;
          body.style.userSelect = prevUserSelect;
          activeCleanupRef.current = null;
        };
        const handleUp = () => {
          const finalSize = parseFloat(getComputedStyle(container).getPropertyValue(cssVarName) || `${defaultSize}`);
          let snapped = finalSize;
          if (snapPoints && snapPoints.length) {
            const nearest = snapPoints.reduce((acc, p) => (Math.abs(p - finalSize) < Math.abs(acc - finalSize) ? p : acc), snapPoints[0]);
            if (Math.abs(nearest - finalSize) <= (snapTolerance ?? 8)) {
              snapped = nearest;
              container.style.setProperty(cssVarName, `${snapped}px`);
              handleEl.setAttribute('aria-valuenow', String(snapped));
              onResize?.(snapped);
            }
          }
          if (collapsible && typeof collapseThreshold === 'number' && finalSize <= collapseThreshold) {
            requestCollapse?.();
          }
          onResizeEnd?.(snapped);
          cleanup();
        };
        const handleKey = (kev: KeyboardEvent) => {
          if (kev.key === 'Escape') {
            container.style.setProperty(cssVarName, `${startSize}px`);
            handleEl.setAttribute('aria-valuenow', String(startSize));
            onResizeEnd?.(startSize);
            cleanup();
          }
        };
        window.addEventListener('pointermove', handleMove as any);
        document.addEventListener('pointermove', handleMove as any);
        // Fallbacks for environments that don't fully support PointerEvent on window
        window.addEventListener('mousemove', handleMove as any);
        document.addEventListener('mousemove', handleMove as any);
        handleEl.addEventListener('pointermove', handleMove as any);
        window.addEventListener('pointerup', handleUp as any);
        document.addEventListener('pointerup', handleUp as any);
        window.addEventListener('mouseup', handleUp as any);
        document.addEventListener('mouseup', handleUp as any);
        window.addEventListener('pointercancel', handleUp as any);
        document.addEventListener('pointercancel', handleUp as any);
        window.addEventListener('keydown', handleKey as any);
        handleEl.addEventListener('lostpointercapture', handleUp as any);
        activeCleanupRef.current = cleanup;
      }}
      onDoubleClick={() => {
        if (collapsible) requestToggle?.();
      }}
      onKeyDown={(e) => {
        if (!containerRef.current) return;
        const container = containerRef.current;
        const rawCurrent = getComputedStyle(container).getPropertyValue(cssVarName);
        const parsedCurrent = Number.parseFloat(rawCurrent.trim());
        const current = Number.isFinite(parsedCurrent) ? parsedCurrent : defaultSize;
        const clamp = (v: number) => Math.min(Math.max(v, minSize), maxSize);
        const step = e.shiftKey ? 32 : 8;
        let delta = 0;
        if (orientation === 'vertical') {
          const docDir = typeof document !== 'undefined' ? document.dir : undefined;
          const cssDir = getComputedStyle(container).direction;
          const hasRtlAncestor = !!(container.closest && container.closest('[dir="rtl"]'));
          const isRtl = docDir === 'rtl' || cssDir === 'rtl' || hasRtlAncestor;
          if (e.key === 'ArrowRight')
            delta = isRtl ? -step : step; // inline-end
          else if (e.key === 'ArrowLeft') delta = isRtl ? step : -step; // inline-start
        } else {
          if (e.key === 'ArrowDown') delta = step;
          else if (e.key === 'ArrowUp') delta = -step;
        }
        if (e.key === 'Home') {
          e.preventDefault();
          onResizeStart?.(current);
          const next = clamp(minSize);
          container.style.setProperty(cssVarName, `${next}px`);
          (e.currentTarget as HTMLElement).setAttribute('aria-valuenow', String(next));
          onResize?.(next);
          onResizeEnd?.(next);
          return;
        }
        if (e.key === 'End') {
          e.preventDefault();
          onResizeStart?.(current);
          const next = clamp(maxSize);
          container.style.setProperty(cssVarName, `${next}px`);
          (e.currentTarget as HTMLElement).setAttribute('aria-valuenow', String(next));
          onResize?.(next);
          onResizeEnd?.(next);
          return;
        }
        if (delta !== 0) {
          e.preventDefault();
          onResizeStart?.(current);
          const signedDelta = orientation === 'vertical' ? (edge === 'start' ? -delta : delta) : delta;
          const next = clamp(current + signedDelta);
          container.style.setProperty(cssVarName, `${next}px`);
          (e.currentTarget as HTMLElement).setAttribute('aria-valuenow', String(next));
          onResize?.(next);
          onResizeEnd?.(next);
        }
      }}
    >
      {children}
    </div>
  );
});
PaneHandle.displayName = 'Shell.Handle';

export const PanelHandle = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>((props, ref) => <PaneHandle {...props} ref={ref} />);
PanelHandle.displayName = 'Shell.Panel.Handle';

export const SidebarHandle = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>((props, ref) => <PaneHandle {...props} ref={ref} />);
SidebarHandle.displayName = 'Shell.Sidebar.Handle';

export const InspectorHandle = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>((props, ref) => <PaneHandle {...props} ref={ref} />);
InspectorHandle.displayName = 'Shell.Inspector.Handle';

export const BottomHandle = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>((props, ref) => <PaneHandle {...props} ref={ref} />);
BottomHandle.displayName = 'Shell.Bottom.Handle';
