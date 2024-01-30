'use client';

import * as React from 'react';
import classNames from 'classnames';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { radioCardGroupPropDefs } from './radio-card-group.props';
import { extractProps, marginPropDefs } from '../helpers';
import { Grid } from './grid';

import type { PropsWithoutRefOrColor, MarginProps, GetPropDefTypes } from '../helpers';

type RadioCardGroupRootElement = React.ElementRef<typeof RadioGroupPrimitive.Root>;
type RadioCardGroupRootOwnProps = GetPropDefTypes<typeof radioCardGroupPropDefs>;
interface RadioCardGroupRootProps
  extends PropsWithoutRefOrColor<typeof RadioGroupPrimitive.Root>,
    MarginProps,
    RadioCardGroupRootOwnProps {}
const RadioCardGroupRoot = React.forwardRef<RadioCardGroupRootElement, RadioCardGroupRootProps>(
  (props, forwardedRef) => {
    const { className, color, ...rootProps } = extractProps(
      props,
      radioCardGroupPropDefs,
      marginPropDefs
    );
    return (
      <Grid asChild columns={props.columns ?? 'repeat(auto-fit, minmax(160px, 1fr))'}>
        <RadioGroupPrimitive.Root
          data-accent-color={color}
          {...rootProps}
          ref={forwardedRef}
          className={classNames('rt-RadioCardGroupRoot', className)}
        />
      </Grid>
    );
  }
);
RadioCardGroupRoot.displayName = 'RadioCardGroupRoot';

type RadioCardGroupItemElement = React.ElementRef<typeof RadioGroupPrimitive.Item>;
interface RadioCardGroupItemProps
  extends Omit<PropsWithoutRefOrColor<typeof RadioGroupPrimitive.Item>, 'asChild'>,
    MarginProps {}
const RadioCardGroupItem = React.forwardRef<RadioCardGroupItemElement, RadioCardGroupItemProps>(
  ({ className, ...props }, forwardedRef) => (
    <RadioGroupPrimitive.Item
      ref={forwardedRef}
      className={classNames('rt-reset', 'rt-RadioCardGroupItem', className)}
      {...props}
      asChild={false}
    />
  )
);
RadioCardGroupItem.displayName = 'RadioCardGroupItem';

const RadioCardGroup = Object.assign(
  {},
  {
    Root: RadioCardGroupRoot,
    Item: RadioCardGroupItem,
  }
);

export { RadioCardGroup, RadioCardGroupRoot, RadioCardGroupItem };
export type { RadioCardGroupRootProps, RadioCardGroupItemProps };
