'use client';

/**
 * Sheet
 *
 * A side-placed overlay built on top of Radix Dialog. It inherits accessibility,
 * focus management, overlay behavior, and sizing scales from the base dialog, and
 * adds side placement and slide motion suited for navigation panels and drawers.
 *
 * Structure mirrors Dialog:
 * - Root, Trigger, Content, Title, Description, Close
 *
 * Notes
 * - Side: set with `side` on `Sheet.Content`. Aliases: `left` → `start`, `right` → `end`.
 * - Sizing: reuses Dialog content prop defs (width/min/max/height/size). Default Dialog
 *   maxWidth clamping is removed for Sheets.
 * - Material: use `material` (solid | translucent). Deprecated `panelBackground` falls back
 *   in dev with a warning.
 * - A11y: provide an accessible name via `Sheet.Title` or `aria-label` on `Sheet.Content`.
 *
 * Example
 * <Sheet.Root>
 *   <Sheet.Trigger>
 *     <Button>Open</Button>
 *   </Sheet.Trigger>
 *   <Sheet.Content side="end" width={{ initial: '280px', md: '360px' }}>
 *     <Sheet.Title>Details</Sheet.Title>
 *     ...
 *     <Sheet.Close>
 *       <Button>Close</Button>
 *     </Sheet.Close>
 *   </Sheet.Content>
 * </Sheet.Root>
 */

import * as React from 'react';
import classNames from 'classnames';
import { Dialog as DialogPrimitive } from 'radix-ui';

import { dialogContentPropDefs } from './dialog.props.js';
import type { DialogContentOwnProps } from './dialog.props.js';
import { Theme } from './theme.js';
import { extractProps } from '../helpers/extract-props.js';
import { requireReactElement } from '../helpers/require-react-element.js';
import { useBodyPointerEventsCleanup } from '../hooks/use-body-pointer-events-cleanup.js';

import type { ComponentPropsWithout, RemovedProps } from '../helpers/component-props.js';

/**
 * Supported sides for the Sheet.
 * Aliases are normalized RTL-aware: `left` → `start`, `right` → `end`.
 */
type SheetSide = 'start' | 'end' | 'top' | 'bottom' | 'left' | 'right';

/**
 * Sheet is a side-placed overlay built on the Dialog primitive.
 * It reuses Dialog's accessibility, focus, overlay, and size scales, while adding side placement and slide motion.
 */

// Root
/**
 * Props for `Sheet.Root` (Radix Dialog root with `modal` forced on).
 */
interface SheetRootProps extends ComponentPropsWithout<typeof DialogPrimitive.Root, 'modal'> {}
const Root: React.FC<SheetRootProps> = (props) => <DialogPrimitive.Root {...props} modal />;
Root.displayName = 'Sheet.Root';

// Trigger
/** Element type for `Sheet.Trigger`. */
type SheetTriggerElement = React.ElementRef<typeof DialogPrimitive.Trigger>;
/** Props for `Sheet.Trigger` (expects a single element child). */
interface SheetTriggerProps
  extends ComponentPropsWithout<typeof DialogPrimitive.Trigger, RemovedProps> {}
const Trigger = React.forwardRef<SheetTriggerElement, SheetTriggerProps>(
  ({ children, ...props }, ref) => (
    <DialogPrimitive.Trigger {...props} ref={ref} asChild>
      {requireReactElement(children)}
    </DialogPrimitive.Trigger>
  ),
);
Trigger.displayName = 'Sheet.Trigger';

// Content
/** Element type for `Sheet.Content`. */
type SheetContentElement = React.ElementRef<typeof DialogPrimitive.Content>;
interface SheetContentProps
  extends ComponentPropsWithout<typeof DialogPrimitive.Content, RemovedProps>,
    DialogContentOwnProps {
  /** Side where the Sheet should appear. `left`/`right` alias to `start`/`end`. */
  side?: SheetSide;
  /** Optional DOM container to portal into. Defaults to `document.body`. */
  container?: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Portal>['container'];
}

/**
 * Renders the Sheet panel. Normalizes left/right to logical start/end and
 * forwards dialog sizing props. Provide an accessible name via `Sheet.Title`
 * or `aria-label`.
 */
const Content = React.forwardRef<SheetContentElement, SheetContentProps>(
  (allProps, forwardedRef) => {
    const {
      side = 'start',
      forceMount,
      container,
      className,
      panelBackground: panelBackgroundProp,
      material: materialProp,
      ...restProps
    } = allProps;
    const normalizedSideMap: Record<SheetSide, 'start' | 'end' | 'top' | 'bottom'> = {
      left: 'start',
      right: 'end',
      start: 'start',
      end: 'end',
      top: 'top',
      bottom: 'bottom',
    };
    const normalizedSide = normalizedSideMap[side];
    // Reuse dialog content prop defs for size/width/height tokens, but handle
    // material/panelBackground explicitly to avoid forwarding unknown DOM props.
    const {
      align: _alignPropDef,
      panelBackground: panelBackgroundPropDef,
      material: materialPropDef,
      ...propDefs
    } = dialogContentPropDefs;

    // Extract panelBackground and material together (remove from DOM props)
    const { panelBackground: resolvedPanelBackground, material: resolvedMaterial } = extractProps(
      { panelBackground: panelBackgroundProp, material: materialProp },
      { panelBackground: panelBackgroundPropDef, material: materialPropDef },
    );

    const materialValue = React.useMemo(() => {
      if (resolvedPanelBackground !== undefined) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn(
            'Warning: The `panelBackground` prop is deprecated and will be removed in a future version. Use the `material` prop instead.',
          );
        }
      }
      return resolvedMaterial ?? resolvedPanelBackground;
    }, [resolvedMaterial, resolvedPanelBackground]);

    // Now extract remaining props using dialog defs so size/width/height classnames are applied
    // Override dialog's default maxWidth (600px) to avoid clamping Sheet by default
    // Match dialog.tsx: extract once and avoid leaking panel/material
    const { default: _mwDefault, ...maxWidthWithoutDefault } = propDefs.maxWidth;
    const sheetPropDefs = {
      ...propDefs,
      maxWidth: maxWidthWithoutDefault,
    } as typeof propDefs;
    const { className: extractedClassName, ...contentProps } = extractProps(
      restProps,
      sheetPropDefs,
    );

    // Dev-only a11y guard: ensure label is provided via Title or aria-label
    if (process.env.NODE_ENV !== 'production') {
      const children = (contentProps as any).children as React.ReactNode;
      const hasAriaLabel = typeof (contentProps as any)['aria-label'] === 'string';
      let hasTitle = false;
      if (children) {
        for (const child of React.Children.toArray(children)) {
          if (React.isValidElement(child) && child.type === Title) {
            hasTitle = true;
            break;
          }
        }
      }
      if (!hasTitle && !hasAriaLabel) {
        console.warn(
          'Sheet.Content: Missing accessible name. Include Sheet.Title as a child or provide aria-label.',
        );
      }
    }

    // Focus management and stuck pointer-events cleanup like Dialog
    const contentRef = React.useRef<HTMLDivElement>(null);
    const combinedRef = React.useMemo(
      () => (node: HTMLDivElement | null) => {
        contentRef.current = node;
        if (typeof forwardedRef === 'function') {
          forwardedRef(node);
        } else if (forwardedRef) {
          (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      },
      [forwardedRef],
    );

    useBodyPointerEventsCleanup();

    React.useEffect(() => {
      if (typeof window === 'undefined') return;
      const content = contentRef.current;
      if (!content) return;

      const focusableElements = content.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Tab') {
          if (event.shiftKey) {
            if (document.activeElement === firstElement) {
              event.preventDefault();
              lastElement.focus();
            }
          } else if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      };

      content.addEventListener('keydown', handleKeyDown);
      firstElement.focus();

      return () => {
        content.removeEventListener('keydown', handleKeyDown);
      };
    }, []);

    return (
      <DialogPrimitive.Portal container={container} forceMount={forceMount}>
        <Theme asChild>
          <DialogPrimitive.Overlay className="rt-BaseDialogOverlay rt-DialogOverlay rt-SheetOverlay">
            <DialogPrimitive.Content
              {...contentProps}
              ref={combinedRef}
              className={classNames(
                'rt-BaseDialogContent',
                'rt-SheetContent',
                className,
                extractedClassName,
              )}
              data-side={normalizedSide}
              data-material={materialValue}
              data-panel-background={materialValue}
              tabIndex={-1}
              role="dialog"
              aria-modal="true"
            />
          </DialogPrimitive.Overlay>
        </Theme>
      </DialogPrimitive.Portal>
    );
  },
);
Content.displayName = 'Sheet.Content';

// Title/Description/Close re-export
type SheetTitleElement = React.ElementRef<typeof DialogPrimitive.Title>;
interface SheetTitleProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title> {}
/** Accessible title for the Sheet. Required for non-decorative content. */
const Title = React.forwardRef<SheetTitleElement, SheetTitleProps>(
  ({ children, ...props }, ref) => (
    <DialogPrimitive.Title {...props} ref={ref} asChild={false}>
      {children}
    </DialogPrimitive.Title>
  ),
);
Title.displayName = 'Sheet.Title';

type SheetDescriptionElement = React.ElementRef<typeof DialogPrimitive.Description>;
interface SheetDescriptionProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description> {}
/** Supplementary description text for Sheet content. */
const Description = React.forwardRef<SheetDescriptionElement, SheetDescriptionProps>(
  ({ children, ...props }, ref) => (
    <DialogPrimitive.Description {...props} ref={ref} asChild={false}>
      {children}
    </DialogPrimitive.Description>
  ),
);
Description.displayName = 'Sheet.Description';

type SheetCloseElement = React.ElementRef<typeof DialogPrimitive.Close>;
interface SheetCloseProps
  extends ComponentPropsWithout<typeof DialogPrimitive.Close, RemovedProps> {}
/** Close button for the Sheet. Expects a single element child rendered via `asChild`. */
const Close = React.forwardRef<SheetCloseElement, SheetCloseProps>(
  ({ children, ...props }, ref) => (
    <DialogPrimitive.Close {...props} ref={ref} asChild>
      {requireReactElement(children)}
    </DialogPrimitive.Close>
  ),
);
Close.displayName = 'Sheet.Close';

export { Root, Trigger, Content, Title, Description, Close };
export type {
  SheetRootProps as RootProps,
  SheetTriggerProps as TriggerProps,
  SheetContentProps as ContentProps,
  SheetTitleProps as TitleProps,
  SheetDescriptionProps as DescriptionProps,
  SheetCloseProps as CloseProps,
};
