import * as React from 'react';
import classNames from 'classnames';
import { Slot } from '@radix-ui/react-slot';
import { cardPropDefs } from './card.props';
import { extractProps, marginPropDefs } from '../helpers';

import type { MarginProps, GetPropDefTypes } from '../helpers';

type CardElement = React.ElementRef<'div'>;
type CardOwnProps = GetPropDefTypes<typeof cardPropDefs>;
interface CardProps extends React.ComponentPropsWithoutRef<'div'>, MarginProps, CardOwnProps {
  asChild?: boolean;
}
const Card = React.forwardRef<CardElement, CardProps>((props, forwardedRef) => {
  const { asChild, children, className, ...cardProps } = extractProps(
    props,
    cardPropDefs,
    marginPropDefs
  );
  const Comp = asChild ? Slot : 'div';
  return (
    <Comp
      ref={forwardedRef}
      {...cardProps}
      className={classNames('rt-reset', 'rt-Card', className)}
    >
      {asChild ? getChild(children) : <div className="rt-CardInner">{children}</div>}
    </Comp>
  );
});
Card.displayName = 'Card';

function getChild(children: React.ReactNode) {
  const firstChild = React.Children.only(children) as React.ReactElement;
  return React.cloneElement(firstChild, {
    children: <div className="rt-CardInner">{firstChild.props.children}</div>,
  });
}

export { Card };
export type { CardProps };
