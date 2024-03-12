'use client';

import * as React from 'react';
import classNames from 'classnames';
import { createContextScope } from '@radix-ui/react-context';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { createRadioGroupScope } from '@radix-ui/react-radio-group';
import { radioGroupRootPropDefs } from './radio-group.props.js';
import { extractProps } from '../helpers/index.js';
import { marginPropDefs } from '../props/index.js';

import { Text } from './text.js';

import type { ComponentPropsWithout, RemovedProps } from '../helpers/index.js';
import type { GetPropDefTypes, MarginProps } from '../props/index.js';
import type { Scope } from '@radix-ui/react-context';

const RADIO_GROUP_NAME = 'RadioGroup';

type ScopedProps<P> = P & { __scopeRadioGroup?: Scope };
const [createRadioGroupContext] = createContextScope(RADIO_GROUP_NAME, [createRadioGroupScope]);
const useRadioGroupScope = createRadioGroupScope();

type RadioGroupRootOwnProps = GetPropDefTypes<typeof radioGroupRootPropDefs>;
type RadioGroupContextValue = RadioGroupRootOwnProps;

const [RadioGroupProvider, useRadioGroupContext] =
  createRadioGroupContext<RadioGroupContextValue>(RADIO_GROUP_NAME);

type RadioGroupRootElement = React.ElementRef<typeof RadioGroupPrimitive.Root>;
interface RadioGroupRootProps
  extends ComponentPropsWithout<
      typeof RadioGroupPrimitive.Root,
      'asChild' | 'color' | 'defaultChecked'
    >,
    MarginProps,
    RadioGroupRootOwnProps {}
const RadioGroupRoot = React.forwardRef<RadioGroupRootElement, RadioGroupRootProps>(
  (
    {
      color = radioGroupRootPropDefs.color.default,
      highContrast = radioGroupRootPropDefs.highContrast.default,
      size = radioGroupRootPropDefs.size.default,
      variant = radioGroupRootPropDefs.variant.default,
      ...props
    }: ScopedProps<RadioGroupRootProps>,
    forwardedRef
  ) => {
    const { __scopeRadioGroup, className, ...rootProps } = extractProps(props, marginPropDefs);
    const radioGroupScope = useRadioGroupScope(__scopeRadioGroup);
    return (
      <RadioGroupProvider
        scope={__scopeRadioGroup}
        color={color}
        highContrast={highContrast}
        size={size}
        variant={variant}
      >
        <RadioGroupPrimitive.Root
          {...radioGroupScope}
          {...rootProps}
          ref={forwardedRef}
          className={classNames('rt-RadioGroupRoot', className)}
        />
      </RadioGroupProvider>
    );
  }
);
RadioGroupRoot.displayName = 'RadioGroup.Root';

type RadioGroupItemElement = React.ElementRef<typeof RadioGroupItemRadio>;
interface RadioGroupItemProps
  extends ComponentPropsWithout<typeof RadioGroupItemRadio, RemovedProps>,
    MarginProps {}
const RadioGroupItem = React.forwardRef<RadioGroupItemElement, RadioGroupItemProps>(
  (_props: ScopedProps<RadioGroupItemProps>, forwardedRef) => {
    const { __scopeRadioGroup, children, className, style, ...props } = _props;
    const { size } = useRadioGroupContext('RadioGroupItem', __scopeRadioGroup);

    // Render `<Text as="label">` if children are provided, otherwise render
    // the solo radio button to allow building out your custom layouts with it.
    if (children) {
      return (
        <Text
          as="label"
          size={size}
          className={classNames('rt-RadioGroupItem', className)}
          style={style}
        >
          <RadioGroupItemRadio
            __scopeRadioGroup={__scopeRadioGroup}
            {...props}
            ref={forwardedRef}
          />
          {children && <span>{children}</span>}
        </Text>
      );
    }

    return (
      <RadioGroupItemRadio
        __scopeRadioGroup={__scopeRadioGroup}
        {...props}
        ref={forwardedRef}
        className={className}
        style={style}
      />
    );
  }
);
RadioGroupItem.displayName = 'RadioGroup.Item';

type RadioGroupItemRadioElement = React.ElementRef<typeof RadioGroupPrimitive.Item>;
interface RadioGroupItemRadioProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {}
const RadioGroupItemRadio = React.forwardRef<
  RadioGroupItemRadioElement,
  ScopedProps<RadioGroupItemRadioProps>
>(({ __scopeRadioGroup, ...props }, forwardedRef) => {
  const context = useRadioGroupContext('RadioGroupItemRadio', __scopeRadioGroup);
  const radioGroupScope = useRadioGroupScope(__scopeRadioGroup);
  const { color, className } = extractProps(
    { ...props, ...context },
    radioGroupRootPropDefs,
    marginPropDefs
  );
  return (
    <RadioGroupPrimitive.Item
      {...radioGroupScope}
      data-accent-color={color}
      {...props}
      asChild={false}
      ref={forwardedRef}
      className={classNames('rt-reset', 'rt-BaseRadioRoot', className)}
    />
  );
});
RadioGroupItemRadio.displayName = 'RadioGroup.ItemRadio';

export { RadioGroupRoot as Root, RadioGroupItem as Item };
export type { RadioGroupRootProps as RootProps, RadioGroupItemProps as ItemProps };
