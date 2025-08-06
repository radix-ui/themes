import * as React from 'react';
import classNames from 'classnames';

import { BaseButton } from './_internal/base-button.js';
import { Tooltip } from './tooltip.js';
import type { BaseButtonProps } from './_internal/base-button.js';

type ButtonElement = React.ElementRef<typeof BaseButton>;

/**
 * Tooltip configuration props that can be passed to Button
 * These props are forwarded to the underlying Tooltip component
 */
interface ButtonTooltipProps {
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
 * Core Button props excluding the 'as' prop for polymorphic behavior
 * Combines BaseButton props with tooltip functionality
 */
type ButtonOwnProps = Omit<BaseButtonProps, 'as'> & ButtonTooltipProps;

/**
 * Polymorphic Button props that support rendering as different HTML elements
 * @template C - The element type to render as (defaults to 'button')
 */
type ButtonProps<C extends React.ElementType = 'button'> = ButtonOwnProps & {
  /** Element type to render as (e.g., 'a', 'span', etc.) */
  as?: C;
} & Omit<React.ComponentPropsWithoutRef<C>, keyof ButtonOwnProps>;

/**
 * Button component type that supports polymorphic rendering
 * @template C - The element type to render as
 */
type ButtonComponent = <C extends React.ElementType = 'button'>(
  props: ButtonProps<C> & { ref?: React.ForwardedRef<ButtonElement> },
) => React.ReactElement | null;

/**
 * Button component for triggering actions throughout your interface
 *
 * The Button component is the primary interactive element in the Kookie User Interface.
 * It provides six visual variants, four sizes, comprehensive color options, and built-in
 * tooltip support. The component automatically handles icon sizing, supports responsive
 * layouts, and provides accessibility compliance out of the box.
 *
 * @example
 * ```tsx
 * // Basic button
 * <Button>Click me</Button>
 *
 * // Button with variant and size
 * <Button variant="solid" size="3">Primary Action</Button>
 *
 * // Button with tooltip
 * <Button tooltip="Save your progress">Save</Button>
 *
 * // Polymorphic button as link
 * <Button as="a" href="/dashboard">Go to Dashboard</Button>
 * ```
 */
const Button = React.forwardRef(
  (
    {
      className,
      tooltip,
      tooltipSide = 'top',
      tooltipAlign = 'center',
      tooltipDelayDuration,
      tooltipDisableHoverableContent,
      ...props
    }: ButtonProps,
    forwardedRef: React.ForwardedRef<ButtonElement>,
  ) => {
    // Generate unique ID for tooltip accessibility
    const tooltipId = React.useId();
    const hasTooltip = Boolean(tooltip);

    // Prepare accessibility props for tooltip integration
    const tooltipAccessibilityProps = React.useMemo(
      () => (hasTooltip ? { 'aria-describedby': tooltipId } : {}),
      [hasTooltip, tooltipId],
    );

    // Create the base button element with tooltip accessibility props
    const button = (
      <BaseButton
        {...props}
        {...tooltipAccessibilityProps}
        ref={forwardedRef}
        className={classNames('rt-Button', className)}
      />
    );

    // If no tooltip is provided, return the button as-is for better performance
    if (!tooltip) {
      return button;
    }

    // Wrap with Tooltip when tooltip content is provided
    // This creates a compound component that handles both button and tooltip functionality
    return (
      <Tooltip
        content={tooltip}
        side={tooltipSide}
        align={tooltipAlign}
        delayDuration={tooltipDelayDuration}
        disableHoverableContent={tooltipDisableHoverableContent}
        id={tooltipId}
      >
        {button}
      </Tooltip>
    );
  },
) as ButtonComponent & { displayName?: string };

Button.displayName = 'Button';

export { Button };
export type { ButtonProps };
