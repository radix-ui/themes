import * as React from 'react';
import classNames from 'classnames';
import { Slot } from 'radix-ui';
import { composeRefs } from 'radix-ui/internal';

import { baseButtonPropDefs } from './base-button.props.js';
import { Flex } from '../flex.js';
import { Spinner } from '../spinner.js';
import { VisuallyHidden } from '../visually-hidden.js';
import { extractProps } from '../../helpers/extract-props.js';
import { mapResponsiveProp, mapButtonSizeToSpinnerSize } from '../../helpers/map-prop-values.js';
import { marginPropDefs } from '../../props/margin.props.js';

import type { MarginProps } from '../../props/margin.props.js';
import type { ComponentPropsWithout, RemovedProps } from '../../helpers/component-props.js';
import type { GetPropDefTypes } from '../../props/prop-def.js';

type BaseButtonElement = React.ElementRef<'button'>;
type BaseButtonOwnProps = GetPropDefTypes<typeof baseButtonPropDefs>;

/**
 * Polymorphic BaseButton props that support rendering as different HTML elements
 * Uses the proper ComponentPropsWithout pattern for type safety
 * @template C - The element type to render as (defaults to 'button')
 */
type PolymorphicBaseButtonProps<C extends React.ElementType = 'button'> = {
  /** Element type to render as (e.g., 'a', 'span', etc.) */
  as?: C;
} & BaseButtonOwnProps &
  MarginProps &
  ComponentPropsWithout<C, RemovedProps | keyof BaseButtonOwnProps | keyof MarginProps | 'as'>;

/**
 * BaseButton props interface that combines all available props
 */
interface BaseButtonProps extends PolymorphicBaseButtonProps {}

/**
 * BaseButton component that provides the core button functionality
 *
 * This is the foundational button component that handles all the complex logic
 * including loading states, accessibility, performance optimizations, and
 * polymorphic rendering. It's used by Button, IconButton, and other button
 * variants to ensure consistent behavior across the design system.
 *
 * Key features:
 * - Loading state with spinner and accessibility announcements
 * - Performance optimizations for backdrop-filter effects
 * - Comprehensive accessibility support
 * - Polymorphic rendering support
 * - Material/panel background handling
 *
 * @example
 * ```tsx
 * // Basic usage
 * <BaseButton>Click me</BaseButton>
 *
 * // With loading state
 * <BaseButton loading>Processing...</BaseButton>
 *
 * // Polymorphic rendering
 * <BaseButton as="a" href="/link">Link Button</BaseButton>
 * ```
 */
const BaseButton = React.forwardRef<BaseButtonElement, BaseButtonProps>((props, forwardedRef) => {
  const { size = baseButtonPropDefs.size.default } = props;

  // Extract button-specific props from the combined props object
  const {
    className,
    children,
    asChild,
    as,
    color,
    radius,
    material,
    panelBackground,
    flush,
    disabled = props.loading, // Loading state automatically disables the button
    ...baseButtonProps
  } = extractProps(props, baseButtonPropDefs, marginPropDefs);

  // Show deprecation warning for panelBackground when used
  // This helps developers migrate to the new material prop
  React.useEffect(() => {
    if (props.panelBackground !== undefined) {
      console.warn('Warning: The `panelBackground` prop is deprecated and will be removed in a future version. Use `material` prop instead.');
    }
  }, [props.panelBackground]);

  // Material takes precedence over panelBackground for backward compatibility
  const effectiveMaterial = material ?? panelBackground;

  // Will-change cleanup for backdrop-filter performance optimization
  // This prevents layout thrashing when using translucent materials
  const buttonRef = React.useRef<HTMLElement>(null);

  // Use a ref to track current material value to avoid stale closures in setTimeout
  const materialRef = React.useRef(effectiveMaterial);
  materialRef.current = effectiveMaterial;

  React.useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const hasTranslucentMaterial = effectiveMaterial === 'translucent';

    if (hasTranslucentMaterial) {
      // Add will-change when material is translucent to optimize rendering
      button.style.setProperty('will-change', 'backdrop-filter');

      // Track timeout for cleanup
      let timeoutId: ReturnType<typeof setTimeout> | undefined;

      // Clean up will-change after transition completes to prevent memory leaks
      const cleanup = () => {
        const transitionDuration = getComputedStyle(button).getPropertyValue('--duration-2') || '75ms';
        const duration = parseInt(transitionDuration) || 75;

        timeoutId = setTimeout(() => {
          // Use ref to get current value, not stale closure value
          if (button && materialRef.current !== 'translucent') {
            button.style.setProperty('will-change', 'auto');
          }
        }, duration);
      };

      // Listen for material changes to clean up will-change property
      const observer = new MutationObserver(cleanup);
      observer.observe(button, { attributes: true, attributeFilter: ['data-material'] });

      return () => {
        if (timeoutId) clearTimeout(timeoutId);
        observer.disconnect();
        button.style.setProperty('will-change', 'auto');
      };
    } else {
      // Remove will-change when material is not translucent
      button.style.setProperty('will-change', 'auto');
    }
  }, [effectiveMaterial]);

  // asChild takes precedence over as prop for Radix Slot integration
  // When asChild is true, we use Slot.Root to merge props onto the child element
  // When asChild is false, we render as the specified element (or button by default)
  const Comp = asChild ? Slot.Root : (as || 'button');

  // Only pass disabled for elements that support it
  // This prevents invalid HTML attributes on unsupported elements
  const shouldPassDisabled = asChild || !as || ['button', 'input', 'textarea', 'select'].includes(as);

  // Determine if we are rendering a real <button> element so we can set a safe
  // default type. Native <button> defaults to type="submit" which can cause
  // accidental form submissions. We default to type="button" unless the user
  // explicitly provided a type or we're using asChild (unknown underlying node).
  const isNativeButtonElement = !asChild && (!as || as === 'button');
  const hasExplicitTypeAttribute = 'type' in (baseButtonProps as Record<string, unknown>);

  // Generate unique ID for loading announcements
  const loadingId = React.useId();
  const describedById = props.loading ? `${loadingId}-loading` : undefined;

  // Extract button text for accessibility announcements
  const buttonText = React.useMemo(() => {
    if (typeof children === 'string') return children;
    if (React.isValidElement(children) && typeof (children.props as any)?.children === 'string') {
      return (children.props as any).children;
    }
    return 'button';
  }, [children]);

  // Enhanced accessibility props for loading state
  // These ensure screen readers announce the loading state properly
  const accessibilityProps = React.useMemo(() => {
    if (props.loading) {
      return {
        'aria-busy': true,
        'aria-disabled': true,
        'aria-describedby': describedById,
        'aria-label': `${buttonText} (loading)`,
      };
    }
    return {};
  }, [props.loading, describedById, buttonText]);

  return (
    <Comp
      // The `data-disabled` attribute enables correct styles when doing `<Button asChild disabled>`
      data-disabled={disabled || undefined}
      data-accent-color={color}
      data-radius={radius}
      data-material={effectiveMaterial}
      data-panel-background={effectiveMaterial}
      data-flush={flush ? 'true' : undefined}
      {...baseButtonProps}
      {...accessibilityProps}
      ref={composeRefs(buttonRef, forwardedRef)}
      className={classNames('rt-reset', 'rt-BaseButton', className)}
      {...(shouldPassDisabled && { disabled })}
      {...(isNativeButtonElement && !hasExplicitTypeAttribute ? { type: 'button' } : {})}
    >
      {props.loading ? (
        <>
          {/**
           * We need a wrapper to set `visibility: hidden` to hide the button content whilst we show the `Spinner`.
           * The button is a flex container with a `gap`, so we use `display: contents` to ensure the correct flex layout.
           *
           * However, `display: contents` removes the content from the accessibility tree in some browsers,
           * so we force remove it with `aria-hidden` and re-add it in the tree with `VisuallyHidden`
           */}
          <span style={{ display: 'contents', visibility: 'hidden' }} aria-hidden>
            {children}
          </span>

          {/* Enhanced accessibility for loading state */}
          <VisuallyHidden>
            <span id={describedById}>{buttonText} is loading, please wait...</span>
            {children}
          </VisuallyHidden>

          {/* Centered spinner overlay during loading state */}
          <Flex asChild align="center" justify="center" position="absolute" inset="0">
            <span>
              <Spinner size={mapResponsiveProp(size, mapButtonSizeToSpinnerSize)} aria-hidden="true" />
            </span>
          </Flex>
        </>
      ) : (
        children
      )}
    </Comp>
  );
});
BaseButton.displayName = 'BaseButton';

export { BaseButton };
export type { BaseButtonProps };
