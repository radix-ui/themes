import * as React from 'react';
import classNames from 'classnames';
import { Slot } from '@radix-ui/react-slot';
import { extractMarginProps, withMargin, withBreakpoints } from '../helpers';

import type { MarginProps, ColorOrGray, Responsive } from '../helpers';

const linkSizes = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
type LinkSize = (typeof linkSizes)[number];
const defaultLinkSize: LinkSize | undefined = undefined;

const linkVariants = ['default', 'high-contrast'] as const;
type LinkVariant = (typeof linkVariants)[number];
const defaultLinkVariant: LinkVariant = 'default';

const linkWeights = ['normal', 'bold'] as const;
type LinkWeight = (typeof linkWeights)[number];
const defaultLinkWeight: LinkWeight = 'normal';

const linkGap = ['0', '1', '2'] as const;
type LinkGap = (typeof linkGap)[number];
const defaultLinkGap: LinkGap | undefined = undefined;

const defaultLinkColor: ColorOrGray | undefined = undefined;

type LinkElement = React.ElementRef<'a'>;
interface LinkProps extends Omit<React.ComponentPropsWithoutRef<'a'>, 'color'>, MarginProps {
  asChild?: boolean;
  size?: Responsive<LinkSize>;
  variant?: LinkVariant;
  weight?: Responsive<LinkWeight>;
  gap?: Responsive<LinkGap>;
  color?: ColorOrGray;
}
const Link = React.forwardRef<LinkElement, LinkProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const {
    className,
    asChild = false,
    size = defaultLinkSize,
    variant = defaultLinkVariant,
    weight = defaultLinkWeight,
    gap = defaultLinkGap,
    color = defaultLinkColor,
    ...linkProps
  } = marginRest;
  const Comp = asChild ? Slot : 'a';

  return (
    <Comp
      data-color-scale={color}
      {...linkProps}
      ref={forwardedRef}
      className={classNames(
        className,
        'rui-reset-a',
        'rui-Text',
        'rui-Link',
        withBreakpoints(size, 'size'),
        `variant-${variant}`,
        withBreakpoints(weight, 'weight'),
        withMargin(marginProps),
        withBreakpoints(gap, 'rui-gap')
      )}
    />
  );
});
Link.displayName = 'Link';

export {
  linkSizes,
  defaultLinkSize,
  linkVariants,
  defaultLinkVariant,
  linkWeights,
  defaultLinkWeight,
  linkGap,
  defaultLinkGap,
  defaultLinkColor,
  Link,
};
export type { LinkSize, LinkVariant, LinkWeight, LinkGap };
