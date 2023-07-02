import * as React from 'react';
import classNames from 'classnames';
import {
  badgeSizeDefault,
  badgeVariantDefault,
  badgeColorDefault,
  badgeHighContrastDefault,
  badgeRadiusDefault,
} from './badge.props';
import { extractMarginProps, withMarginProps, withBreakpoints } from '../helpers';

import type { BadgeSize, BadgeVariant } from './badge.props';
import type { PropsWithoutRefOrColor, MarginProps, Responsive } from '../helpers';
import type { ThemeAccentScale, ThemeRadius } from '../theme';

type BadgeElement = React.ElementRef<'span'>;
interface BadgeProps extends PropsWithoutRefOrColor<'span'>, MarginProps {
  size?: Responsive<BadgeSize>;
  variant?: BadgeVariant;
  color?: ThemeAccentScale;
  highContrast?: boolean;
  radius?: ThemeRadius;
}
const Badge = React.forwardRef<BadgeElement, BadgeProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const {
    className,
    size = badgeSizeDefault,
    variant = badgeVariantDefault,
    color = badgeColorDefault,
    highContrast = badgeHighContrastDefault,
    radius = badgeRadiusDefault,
    ...badgeProps
  } = marginRest;
  return (
    <span
      data-accent-scale={color}
      data-radius={radius}
      {...badgeProps}
      ref={forwardedRef}
      className={classNames(
        'rui-Badge',
        withBreakpoints(size, 'size'),
        `variant-${variant}`,
        { 'high-contrast': highContrast },
        withMarginProps(marginProps),
        className
      )}
    />
  );
});
Badge.displayName = 'Badge';

export { Badge };
