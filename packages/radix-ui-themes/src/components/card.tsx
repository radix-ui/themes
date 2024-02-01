import * as React from 'react';
import classNames from 'classnames';
import { Slot } from '@radix-ui/react-slot';
import { cardPropDefs } from './card.props';
import { extractProps, getRoot, marginPropDefs } from '../helpers';

import type { MarginProps, GetPropDefTypes, PropsWithoutRefOrColor } from '../helpers';

type CardElement = React.ElementRef<'div'>;
type CardOwnProps = GetPropDefTypes<typeof cardPropDefs>;
interface CardProps extends PropsWithoutRefOrColor<'div'>, MarginProps, CardOwnProps {
  asChild?: boolean;
}
const Card = React.forwardRef<CardElement, CardProps>((props, forwardedRef) => {
  const {
    asChild,
    children: childrenProp,
    className,
    ...cardProps
  } = extractProps(props, cardPropDefs, marginPropDefs);

  const { Root: CardRoot, children } = getRoot({
    asChild,
    children: childrenProp,
    parent: asChild ? Slot : 'div',
  });

  return (
    <CardRoot
      ref={forwardedRef}
      {...cardProps}
      className={classNames('rt-reset', 'rt-Card', className)}
    >
      <div className="rt-CardInner">{children}</div>
    </CardRoot>
  );
});
Card.displayName = 'Card';

export { Card };
export type { CardProps };
