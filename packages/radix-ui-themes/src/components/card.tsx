import * as React from 'react';
import classNames from 'classnames';
import { Slot } from 'radix-ui';

import { cardPropDefs } from './card.props';
import { extractProps } from '../helpers/extract-props';
import { marginPropDefs } from '../props/margin.props';

import type { MarginProps } from '../props/margin.props';
import type { ComponentPropsWithout, RemovedProps } from '../helpers/component-props';
import type { GetPropDefTypes } from '../props/prop-def';

type CardElement = React.ElementRef<'div'>;
type CardOwnProps = GetPropDefTypes<typeof cardPropDefs>;
interface CardProps extends ComponentPropsWithout<'div', RemovedProps>, MarginProps, CardOwnProps {}
const Card = React.forwardRef<CardElement, CardProps>((props, forwardedRef) => {
  const { asChild, className, ...cardProps } = extractProps(props, cardPropDefs, marginPropDefs);
  const Comp = asChild ? Slot.Root : 'div';
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
