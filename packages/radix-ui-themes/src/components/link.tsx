import * as React from 'react';
import classNames from 'classnames';
import { Slot } from '@radix-ui/react-slot';
import {
  linkSizeDefault,
  linkWeightDefault,
  linkColorDefault,
  linkHighContrastDefault,
} from './link.props';
import { extractMarginProps, withMarginProps, withBreakpoints } from '../helpers';

import type { LinkSize, LinkWeight } from './link.props';
import type { PropsWithoutRefOrColor, MarginProps, Responsive } from '../helpers';
import type { ThemeAccentScale } from '../theme';

type LinkElement = React.ElementRef<'a'>;
interface LinkProps extends PropsWithoutRefOrColor<'a'>, MarginProps {
  asChild?: boolean;
  size?: Responsive<LinkSize>;
  weight?: Responsive<LinkWeight>;
  color?: ThemeAccentScale;
  highContrast?: boolean;
}
const Link = React.forwardRef<LinkElement, LinkProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const {
    className,
    asChild = false,
    size = linkSizeDefault,
    weight = linkWeightDefault,
    color = linkColorDefault,
    highContrast = linkHighContrastDefault,
    ...linkProps
  } = marginRest;
  const Comp = asChild ? Slot : 'a';
  return (
    <Comp
      data-accent-scale={color}
      {...linkProps}
      ref={forwardedRef}
      className={classNames(
        className,
        'rui-reset-a',
        'rui-Text',
        'rui-Link',
        withBreakpoints(size, 'size'),
        withBreakpoints(weight, 'weight'),
        { highContrast },
        withMarginProps(marginProps)
      )}
    />
  );
});
Link.displayName = 'Link';

export { Link };
