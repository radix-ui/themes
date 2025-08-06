import * as React from 'react';
import classNames from 'classnames';
import { Slot } from 'radix-ui';

import { badgePropDefs } from './badge.props.js';
import { extractProps } from '../helpers/extract-props.js';
import { marginPropDefs } from '../props/margin.props.js';
import { Tooltip } from './tooltip.js';

import type { MarginProps } from '../props/margin.props.js';
import type { ComponentPropsWithout, RemovedProps } from '../helpers/component-props.js';
import type { GetPropDefTypes } from '../props/prop-def.js';

type BadgeElement = React.ElementRef<'span'>;
type BadgeOwnProps = GetPropDefTypes<typeof badgePropDefs>;

// Tooltip props that can be passed to Badge
interface BadgeTooltipProps {
  tooltip?: React.ReactNode;
  tooltipSide?: 'top' | 'right' | 'bottom' | 'left';
  tooltipAlign?: 'start' | 'center' | 'end';
  tooltipDelayDuration?: number;
  tooltipDisableHoverableContent?: boolean;
}

interface BadgeProps
  extends ComponentPropsWithout<'span', RemovedProps>,
    MarginProps,
    BadgeOwnProps,
    BadgeTooltipProps {}

const Badge = React.forwardRef<BadgeElement, BadgeProps>((props, forwardedRef) => {
  const {
    asChild,
    className,
    children,
    color,
    radius,
    material,
    panelBackground,
    tooltip,
    tooltipSide = 'top',
    tooltipAlign = 'center',
    tooltipDelayDuration,
    tooltipDisableHoverableContent,
    ...badgeProps
  } = extractProps(props, badgePropDefs, marginPropDefs);

  // Memoize material calculation for performance
  const effectiveMaterial = React.useMemo(
    () => material ?? panelBackground,
    [material, panelBackground],
  );

  // Show deprecation warning for panelBackground when used
  React.useEffect(() => {
    if (panelBackground !== undefined) {
      console.warn(
        'Warning: The `panelBackground` prop is deprecated and will be removed in a future version. Use `material` prop instead.',
      );
    }
  }, [panelBackground]);

  // Memoize component variable to prevent unnecessary re-renders
  const Comp = React.useMemo(() => (asChild ? Slot.Root : 'span'), [asChild]);

  const badge = (
    <Comp
      data-accent-color={color}
      data-radius={radius}
      data-material={effectiveMaterial}
      data-panel-background={effectiveMaterial}
      {...badgeProps}
      ref={forwardedRef}
      className={classNames('rt-reset', 'rt-Badge', className)}
    >
      {children}
    </Comp>
  );

  // If no tooltip is provided, return the badge as-is
  if (!tooltip) {
    return badge;
  }

  // Wrap with Tooltip when tooltip content is provided
  return (
    <Tooltip
      content={tooltip}
      side={tooltipSide}
      align={tooltipAlign}
      delayDuration={tooltipDelayDuration}
      disableHoverableContent={tooltipDisableHoverableContent}
    >
      {badge}
    </Tooltip>
  );
});
Badge.displayName = 'Badge';

export { Badge };
export type { BadgeProps };
