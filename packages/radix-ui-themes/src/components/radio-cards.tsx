'use client';

import * as React from 'react';
import classNames from 'classnames';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { radioCardsRootPropDefs } from './radio-cards.props.js';
import { extractProps } from '../helpers/index.js';
import { marginPropDefs } from '../props/index.js';
import { Grid } from './grid.js';

import type { ComponentPropsWithout, RemovedProps } from '../helpers/index.js';
import type { GetPropDefTypes, MarginProps } from '../props/index.js';

type RadioCardsRootElement = React.ElementRef<typeof RadioGroupPrimitive.Root>;
type RadioCardsRootOwnProps = GetPropDefTypes<typeof radioCardsRootPropDefs>;
interface RadioCardsRootProps
  extends ComponentPropsWithout<
      typeof RadioGroupPrimitive.Root,
      'asChild' | 'color' | 'defaultChecked'
    >,
    MarginProps,
    RadioCardsRootOwnProps {}
const RadioCardsRoot = React.forwardRef<RadioCardsRootElement, RadioCardsRootProps>(
  (props, forwardedRef) => {
    const { className, color, ...rootProps } = extractProps(
      props,
      radioCardsRootPropDefs,
      marginPropDefs
    );
    return (
      <Grid asChild>
        <RadioGroupPrimitive.Root
          data-accent-color={color}
          {...rootProps}
          ref={forwardedRef}
          className={classNames('rt-RadioCardsRoot', className)}
        />
      </Grid>
    );
  }
);
RadioCardsRoot.displayName = 'RadioCards.Root';

type RadioCardsItemElement = React.ElementRef<typeof RadioGroupPrimitive.Item>;
interface RadioCardsItemProps
  extends ComponentPropsWithout<typeof RadioGroupPrimitive.Item, RemovedProps>,
    MarginProps {}
const RadioCardsItem = React.forwardRef<RadioCardsItemElement, RadioCardsItemProps>(
  ({ className, ...props }, forwardedRef) => (
    <RadioGroupPrimitive.Item
      {...props}
      asChild={false}
      ref={forwardedRef}
      className={classNames('rt-reset', 'rt-BaseCard', 'rt-RadioCardsItem', className)}
    />
  )
);
RadioCardsItem.displayName = 'RadioCards.Item';

export { RadioCardsRoot as Root, RadioCardsItem as Item };
export type { RadioCardsRootProps as RootProps, RadioCardsItemProps as ItemProps };
