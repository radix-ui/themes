import * as React from 'react';
import classNames from 'classnames';
import { extractMarginProps, withMargin, withBreakpoints } from '../helpers';
import { defaultBadgeSize, defaultBadgeVariant, defaultBadgeColor } from './badge.props';

import type { MarginProps, ColorOrGray, Responsive } from '../helpers';
import type { BadgeSize, BadgeVariant } from './badge.props';

type BadgeElement = React.ElementRef<'span'>;
interface BadgeProps extends Omit<React.ComponentPropsWithoutRef<'span'>, 'color'>, MarginProps {
  size?: Responsive<BadgeSize>;
  variant?: BadgeVariant;
  color?: ColorOrGray;
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
      data-color-scale={color}
      {...badgeProps}
      ref={forwardedRef}
      className={classNames(
        'rui-Badge',
        withBreakpoints(size, 'size'),
        `variant-${variant}`,
        withMargin(marginProps),
        className
      )}
    />
  );
});
Badge.displayName = 'Badge';

export { Badge };
