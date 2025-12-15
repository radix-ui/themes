import * as React from 'react';
import classNames from 'classnames';

import { BaseButton } from './_internal/base-button.js';
import { Tooltip } from './tooltip.js';
import { useTooltipWrapper } from '../hooks/use-tooltip-wrapper.js';
import type { BaseButtonProps } from './_internal/base-button.js';

type IconButtonElement = React.ElementRef<typeof BaseButton>;

/**
 * Required accessibility props for icon buttons
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
 * Tooltip configuration props that can be passed to IconButton
 * These props are forwarded to the underlying Tooltip component
 */
interface IconButtonTooltipProps {
  /** Content to display in the tooltip on hover/focus */
  tooltip?: React.ReactNode;
  /** Side of the button where the tooltip should appear */
  tooltipSide?: 'top' | 'right' | 'bottom' | 'left';
  /** Alignment of the tooltip relative to the button */
  tooltipAlign?: 'start' | 'center' | 'end';
  /** Delay before showing the tooltip (in milliseconds) */
  tooltipDelayDuration?: number;
  /** Whether to disable hoverable content behavior */
  tooltipDisableHoverableContent?: boolean;
}

/**
 * Core IconButton props excluding the 'as' prop for polymorphic behavior
 * Combines BaseButton props with accessibility requirements and tooltip functionality
 */
type IconButtonOwnProps = Omit<BaseButtonProps, 'as'> & AccessibilityProps & IconButtonTooltipProps;

/**
 * Polymorphic IconButton props that support rendering as different HTML elements
 * @template C - The element type to render as (defaults to 'button')
 */
type IconButtonProps<C extends React.ElementType = 'button'> = IconButtonOwnProps & {
  /** Element type to render as (e.g., 'a', 'span', etc.) */
  as?: C;
} & Omit<React.ComponentPropsWithoutRef<C>, keyof IconButtonOwnProps>;

/**
 * IconButton component type that supports polymorphic rendering
 * @template C - The element type to render as
 */
type IconButtonComponent = <C extends React.ElementType = 'button'>(props: IconButtonProps<C> & { ref?: React.ForwardedRef<IconButtonElement> }) => React.ReactElement | null;

/**
 * IconButton component for compact, accessible icon-only interactions
 *
 * The IconButton component extends Button with specialized behavior for visual symbols.
 * It enforces accessibility requirements, provides automatic square sizing, and includes
 * built-in tooltip integration. Icon buttons are essential for space-efficient interfaces
 * while maintaining accessibility compliance.
 *
 * Key features:
 * - Enforced accessibility requirements (aria-label, aria-labelledby, or children)
 * - Automatic square aspect ratios for consistent visual alignment
 * - Built-in tooltip support for context and guidance
 * - Same variant and size system as Button for consistency
 * - Runtime validation for accessibility compliance
 *
 * @example
 * ```tsx
 * // Basic icon button with aria-label
 * <IconButton aria-label="Settings">
 *   <Settings />
 * </IconButton>
 *
 * // Icon button with tooltip
 * <IconButton aria-label="Save" tooltip="Save your progress">
 *   <Save />
 * </IconButton>
 *
 * // Icon button with aria-labelledby
 * <IconButton aria-labelledby="settings-label">
 *   <Settings />
 * </IconButton>
 * <span id="settings-label">Open settings panel</span>
 *
 * // Icon button with visible text (fallback)
 * <IconButton>
 *   <Settings />
 *   Settings
 * </IconButton>
 * ```
 */
const IconButton = React.forwardRef(
  (
    { className, tooltip, tooltipSide = 'top', tooltipAlign = 'center', tooltipDelayDuration, tooltipDisableHoverableContent, ...props }: IconButtonProps,
    forwardedRef: React.ForwardedRef<IconButtonElement>,
  ) => {
    // Use shared tooltip wrapper hook for accessibility props
    const { tooltipId, hasTooltip, accessibilityProps: tooltipAccessibilityProps } = useTooltipWrapper(tooltip);

    // Runtime accessibility validation to ensure WCAG compliance
    // This helps catch accessibility issues during development
    const hasAriaLabel = 'aria-label' in props && props['aria-label'];
    const hasAriaLabelledBy = 'aria-labelledby' in props && props['aria-labelledby'];
    const hasChildren = 'children' in props && props.children;

    // Validate accessible name - throw in development, log error in production
    if (!hasAriaLabel && !hasAriaLabelledBy && !hasChildren) {
      const errorMessage =
        'IconButton: Icon buttons must have an accessible name. Please provide either:' +
        '\n- aria-label prop with descriptive text' +
        '\n- aria-labelledby prop referencing a label element' +
        '\n- or visible text children';

      if (process.env.NODE_ENV === 'development') {
        throw new Error(errorMessage);
      } else {
        console.error(errorMessage);
      }
    }

    // Create the base icon button element with accessibility props
    const iconButton = <BaseButton {...props} {...tooltipAccessibilityProps} ref={forwardedRef} className={classNames('rt-IconButton', className)} />;

    // If no tooltip is provided, return the icon button as-is for better performance
    if (!hasTooltip) {
      return iconButton;
    }

    // Wrap with Tooltip when tooltip content is provided
    // This creates a compound component that handles both button and tooltip functionality
    return (
      <Tooltip content={tooltip} side={tooltipSide} align={tooltipAlign} delayDuration={tooltipDelayDuration} disableHoverableContent={tooltipDisableHoverableContent} id={tooltipId}>
        {iconButton}
      </Tooltip>
    );
  },
) as IconButtonComponent & { displayName?: string };

IconButton.displayName = 'IconButton';

export { IconButton };
export type { IconButtonProps };
