import * as React from 'react';
import classNames from 'classnames';
import { badgeSizeDefault, badgeVariantDefault, badgeColorDefault } from './badge.props';
import { extractMarginProps, withMarginProps, withBreakpoints } from '../helpers';

import type { BadgeSize, BadgeVariant } from './badge.props';
import type { PropsWithoutRefOrColor, MarginProps, Responsive } from '../helpers';
import type { ThemeAccentScale } from '../theme';

type BadgeElement = React.ElementRef<'span'>;
interface BadgeProps extends PropsWithoutRefOrColor<'span'>, MarginProps {
  size?: Responsive<BadgeSize>;
  variant?: BadgeVariant;
  color?: ThemeAccentScale;
}
const Badge = React.forwardRef<BadgeElement, BadgeProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const {
    className,
    size = badgeSizeDefault,
    variant = badgeVariantDefault,
    color = badgeColorDefault,
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
