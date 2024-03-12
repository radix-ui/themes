import * as React from 'react';
import classNames from 'classnames';
import { Slot } from '@radix-ui/react-slot';
import { cardPropDefs } from './card.props.js';
import { extractProps } from '../helpers/index.js';
import { marginPropDefs } from '../props/index.js';

import type { ComponentPropsWithout, RemovedProps } from '../helpers/index.js';
import type { GetPropDefTypes, MarginProps } from '../props/index.js';

type CardElement = React.ElementRef<'div'>;
type CardOwnProps = GetPropDefTypes<typeof cardPropDefs>;
interface CardProps extends ComponentPropsWithout<RemovedProps, 'div'>, MarginProps, CardOwnProps {}
const Card = React.forwardRef<CardElement, CardProps>((props, forwardedRef) => {
  const { asChild, className, ...cardProps } = extractProps(props, cardPropDefs, marginPropDefs);
  const Comp = asChild ? Slot : 'div';
  return (
    <Comp
      ref={forwardedRef}
      {...cardProps}
      className={classNames('rt-reset', 'rt-BaseCard', 'rt-Card', className)}
    />
  );
});
Card.displayName = 'Card';

export { Card };
export type { CardProps };
