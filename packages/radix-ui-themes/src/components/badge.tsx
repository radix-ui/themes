import * as React from 'react';
import classNames from 'classnames';
import { extractMarginProps, withMargin, withBreakpoints } from '../helpers';

import type { MarginProps, ColorOrGray, Responsive } from '../helpers';

const badgeSizes = ['1', '2'] as const;
type BadgeSize = (typeof badgeSizes)[number];
const defaultBadgeSize: BadgeSize = '1';

const badgeVariants = ['surface', 'subtle', 'outline'] as const;
type BadgeVariant = (typeof badgeVariants)[number];
const defaultBadgeVariant: BadgeVariant = 'subtle';

const defaultBadgeColor: ColorOrGray = 'gray';

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

export {
  badgeSizes,
  defaultBadgeSize,
  badgeVariants,
  defaultBadgeVariant,
  defaultBadgeColor,
  Badge,
};
export { BadgeSize, BadgeVariant };
