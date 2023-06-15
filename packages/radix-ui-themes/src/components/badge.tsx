import * as React from 'react';
import classNames from 'classnames';
import { extractMarginProps, withMargin, withBreakpoints } from '../helpers';

import type { MarginProps, Color, Responsive } from '../helpers';

type BadgeElement = React.ElementRef<'span'>;
interface BadgeProps extends Omit<React.ComponentPropsWithoutRef<'span'>, 'color'>, MarginProps {
  size?: Responsive<'1' | '2'>;
  variant?: 'subtle';
  color?: Color;
}
const Badge = React.forwardRef<BadgeElement, BadgeProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const { className, size = '1', variant = 'subtle', color = 'gray', ...badgeProps } = marginRest;

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
