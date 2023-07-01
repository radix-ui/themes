import * as React from 'react';
import classNames from 'classnames';
import { extractMarginProps, withMarginProps, withBreakpoints } from '../helpers';
import { defaultBadgeSize, defaultBadgeVariant, defaultBadgeColor } from './badge.props';

import type { PropsWithoutRefOrColor, MarginProps, Color, Responsive } from '../helpers';
import type { BadgeSize, BadgeVariant } from './badge.props';

type BadgeElement = React.ElementRef<'span'>;
interface BadgeProps extends PropsWithoutRefOrColor<'span'>, MarginProps {
  size?: Responsive<BadgeSize>;
  variant?: BadgeVariant;
  color?: Color;
}
const Badge = React.forwardRef<BadgeElement, BadgeProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const {
    className,
    size = defaultBadgeSize,
    variant = defaultBadgeVariant,
    color = defaultBadgeColor,
    ...badgeProps
  } = marginRest;
  return (
    <span
      data-accent-scale={color}
      {...badgeProps}
      ref={forwardedRef}
      className={classNames(
        'rui-Badge',
        withBreakpoints(size, 'size'),
        `variant-${variant}`,
        withMarginProps(marginProps),
        className
      )}
    />
  );
});
Badge.displayName = 'Badge';

export { Badge };
