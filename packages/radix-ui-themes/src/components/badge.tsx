import * as React from 'react';
import classNames from 'classnames';
import { Slot } from '@radix-ui/react-slot';
import { badgePropDefs } from './badge.props.js';
import { extractProps } from '../helpers/index.js';
import { marginPropDefs } from '../props/index.js';

import type { ComponentPropsWithout, RemovedProps } from '../helpers/index.js';
import type { GetPropDefTypes, MarginProps } from '../props/index.js';

type BadgeElement = React.ElementRef<'span'>;
type BadgeOwnProps = GetPropDefTypes<typeof badgePropDefs>;
interface BadgeProps
  extends ComponentPropsWithout<'span', RemovedProps>,
    MarginProps,
    BadgeOwnProps {}
const Badge = React.forwardRef<BadgeElement, BadgeProps>((props, forwardedRef) => {
  const { asChild, className, color, radius, ...badgeProps } = extractProps(
    props,
    badgePropDefs,
    marginPropDefs
  );
  const Comp = asChild ? Slot : 'span';
  return (
    <Comp
      data-accent-color={color}
      data-radius={radius}
      {...badgeProps}
      ref={forwardedRef}
      className={classNames('rt-reset', 'rt-Badge', className)}
    />
  );
});
Badge.displayName = 'Badge';

export { Badge };
export type { BadgeProps };
