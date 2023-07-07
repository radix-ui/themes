import * as React from 'react';
import classNames from 'classnames';
import { Slot } from '@radix-ui/react-slot';
import { linkPropDefs } from './link.props';
import { extractMarginProps, withMarginProps, withBreakpoints } from '../helpers';

import type { PropsWithoutRefOrColor, MarginProps, GetPropDefTypes } from '../helpers';

type LinkElement = React.ElementRef<'a'>;
type LinkOwnProps = GetPropDefTypes<typeof linkPropDefs>;
interface LinkProps extends PropsWithoutRefOrColor<'a'>, MarginProps, LinkOwnProps {
  asChild?: boolean;
}
const Link = React.forwardRef<LinkElement, LinkProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const {
    className,
    asChild = false,
    size = linkPropDefs.size.default,
    weight = linkPropDefs.weight.default,
    color = linkPropDefs.color.default,
    highContrast = linkPropDefs.highContrast.default,
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
        { 'high-contrast': highContrast },
        withMarginProps(marginProps)
      )}
    />
  );
});
Link.displayName = 'Link';

export { Link };
