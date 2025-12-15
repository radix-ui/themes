import * as React from 'react';
import classNames from 'classnames';

import { BaseButton } from './_internal/base-button.js';
import { Tooltip } from './tooltip.js';
import { useTooltipWrapper } from '../hooks/use-tooltip-wrapper.js';
import type { BaseButtonProps } from './_internal/base-button.js';

/**
 * Styles that can be overridden for a particular interaction state
 */
interface ButtonOverrideStateStyles {
  color?: string;
  background?: string;
  backgroundColor?: string;
  boxShadow?: string;
  filter?: string;
  outline?: string;
  outlineOffset?: string;
  opacity?: string | number;
}

/**
 * Full set of override styles keyed by interaction state
 */
interface ButtonOverrideStyles {
  /** Default/idle state styles */
  normal?: ButtonOverrideStateStyles;
  /** Hover state styles */
  hover?: ButtonOverrideStateStyles;
  /** Active (mouse down) state styles */
  active?: ButtonOverrideStateStyles;
  /** Toggle pressed state styles (data-state="on") */
  pressed?: ButtonOverrideStateStyles;
  /** Open state styles (e.g., when used as a trigger) */
  open?: ButtonOverrideStateStyles;
  /** Disabled state styles */
  disabled?: ButtonOverrideStateStyles;
  /** Focus-visible outline styles */
  focus?: Pick<ButtonOverrideStateStyles, 'outline' | 'outlineOffset'>;
}

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
type ButtonOwnProps = Omit<BaseButtonProps, 'as'> &
  ButtonTooltipProps & {
    /**
     * When using variant="override", provide token-based styles per state.
     * We propagate these into CSS variables consumed by the override variant.
     */
    overrideStyles?: ButtonOverrideStyles;
  };

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
type ButtonComponent = <C extends React.ElementType = 'button'>(props: ButtonProps<C> & { ref?: React.ForwardedRef<ButtonElement> }) => React.ReactElement | null;

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
    { className, style, tooltip, tooltipSide = 'top', tooltipAlign = 'center', tooltipDelayDuration, tooltipDisableHoverableContent, overrideStyles, ...props }: ButtonProps,
    forwardedRef: React.ForwardedRef<ButtonElement>,
  ) => {
    // Use shared tooltip wrapper hook for accessibility props
    const { tooltipId, hasTooltip, accessibilityProps: tooltipAccessibilityProps } = useTooltipWrapper(tooltip);

    // Create the base button element with tooltip accessibility props
    // Map overrideStyles to CSS variables consumed by the override variant rules
    const overrideVars = React.useMemo(() => {
      if (!overrideStyles) return undefined;
      const vars: Record<string, string | number> = {};
      const setVar = (key: string, value: string | number | undefined) => {
        if (value !== undefined) vars[key] = value;
      };
      const apply = (prefix: string, s?: ButtonOverrideStateStyles) => {
        if (!s) return;
        setVar(`--button-override-${prefix}color`, s.color);
        setVar(`--button-override-${prefix}background`, s.background);
        setVar(`--button-override-${prefix}background-color`, s.backgroundColor);
        setVar(`--button-override-${prefix}box-shadow`, s.boxShadow);
        setVar(`--button-override-${prefix}filter`, s.filter);
        setVar(`--button-override-${prefix}outline`, s.outline);
        setVar(`--button-override-${prefix}outline-offset`, s.outlineOffset);
        setVar(`--button-override-${prefix}opacity`, s.opacity);
      };

      apply('', overrideStyles.normal);
      apply('hover-', overrideStyles.hover);
      apply('active-', overrideStyles.active);
      apply('pressed-', overrideStyles.pressed);
      apply('open-', overrideStyles.open);
      apply('disabled-', overrideStyles.disabled);

      if (overrideStyles.focus) {
        setVar('--button-override-focus-outline', overrideStyles.focus.outline);
        setVar('--button-override-focus-outline-offset', overrideStyles.focus.outlineOffset);
      }

      return vars as React.CSSProperties;
    }, [overrideStyles]);

    // Combine override styles with user-provided styles
    const combinedStyle = React.useMemo(() => (overrideVars ? { ...overrideVars, ...style } : style), [overrideVars, style]);

    const button = <BaseButton {...props} {...tooltipAccessibilityProps} ref={forwardedRef} className={classNames('rt-Button', className)} style={combinedStyle} />;

    // If no tooltip is provided, return the button as-is for better performance
    if (!hasTooltip) {
      return button;
    }

    // Wrap with Tooltip when tooltip content is provided
    // This creates a compound component that handles both button and tooltip functionality
    return (
      <Tooltip content={tooltip} side={tooltipSide} align={tooltipAlign} delayDuration={tooltipDelayDuration} disableHoverableContent={tooltipDisableHoverableContent} id={tooltipId}>
        {button}
      </Tooltip>
    );
  },
) as ButtonComponent & { displayName?: string };

Button.displayName = 'Button';

export { Button };
export type { ButtonProps, ButtonOverrideStyles, ButtonOverrideStateStyles };
