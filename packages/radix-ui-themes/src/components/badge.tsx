import * as React from 'react';
import classNames from 'classnames';
import { badgePropDefs } from './badge.props';
import { extractMarginProps, withMarginProps, withBreakpoints } from '../helpers';

import type { PropsWithoutRefOrColor, MarginProps, GetPropDefTypes } from '../helpers';

type BadgeElement = React.ElementRef<'span'>;
type BadgeOwnProps = GetPropDefTypes<typeof badgePropDefs>;
interface BadgeProps extends PropsWithoutRefOrColor<'span'>, MarginProps, BadgeOwnProps {}
const Badge = React.forwardRef<BadgeElement, BadgeProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const {
    className,
    size = badgePropDefs.size.default,
    variant = badgePropDefs.variant.default,
    color = badgePropDefs.color.default,
    highContrast = badgePropDefs.highContrast.default,
    radius = badgePropDefs.radius.default,
    ...badgeProps
  } = marginRest;
  return (
    <span
      data-accent-color={color}
      data-radius={radius}
      {...badgeProps}
      ref={forwardedRef}
      className={classNames(
        'rt-Badge',
        className,
        withBreakpoints(size, 'rt-r-size'),
        `rt-variant-${variant}`,
        { 'rt-high-contrast': highContrast },
        withMarginProps(marginProps)
      )}
    />
  );
});
Badge.displayName = 'Badge';

export { Badge };
export type { BadgeProps };
