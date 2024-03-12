'use client';

import * as React from 'react';
import classNames from 'classnames';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { radioCardGroupRootPropDefs } from './radio-card-group.props.js';
import { extractProps } from '../helpers/index.js';
import { marginPropDefs } from '../props/index.js';
import { Grid } from './grid.js';

import type { ComponentPropsWithout, RemovedProps } from '../helpers/index.js';
import type { GetPropDefTypes, MarginProps } from '../props/index.js';

type RadioCardGroupRootElement = React.ElementRef<typeof RadioGroupPrimitive.Root>;
type RadioCardGroupRootOwnProps = GetPropDefTypes<typeof radioCardGroupRootPropDefs>;
interface RadioCardGroupRootProps
  extends ComponentPropsWithout<
      'asChild' | 'color' | 'defaultChecked',
      typeof RadioGroupPrimitive.Root
    >,
    MarginProps,
    RadioCardGroupRootOwnProps {}
const RadioCardGroupRoot = React.forwardRef<RadioCardGroupRootElement, RadioCardGroupRootProps>(
  (props, forwardedRef) => {
    const { className, color, ...rootProps } = extractProps(
      props,
      radioCardGroupRootPropDefs,
      marginPropDefs
    );
    return (
      <Grid asChild>
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
  extends ComponentPropsWithout<RemovedProps, typeof RadioGroupPrimitive.Item>,
    MarginProps {}
const RadioCardGroupItem = React.forwardRef<RadioCardGroupItemElement, RadioCardGroupItemProps>(
  ({ className, ...props }, forwardedRef) => (
    <RadioGroupPrimitive.Item
      {...props}
      asChild={false}
      ref={forwardedRef}
      className={classNames('rt-reset', 'rt-BaseCard', 'rt-RadioCardGroupItem', className)}
    />
  )
);
RadioCardGroupItem.displayName = 'RadioCardGroupItem';

export { RadioCardGroupRoot, RadioCardGroupItem };
export type { RadioCardGroupRootProps, RadioCardGroupItemProps };
