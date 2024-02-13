'use client';

import * as React from 'react';
import classNames from 'classnames';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { Text } from './text.js';
import { radioGroupRootPropDefs } from './radio-group.props.js';
import { extractProps } from '../helpers/index.js';
import { marginPropDefs } from '../props/index.js';

import type { ComponentPropsWithoutColor } from '../helpers/index.js';
import type { MarginProps, GetPropDefTypes } from '../props/index.js';

type RadioGroupRootOwnProps = GetPropDefTypes<typeof radioGroupRootPropDefs>;
type RadioGroupContextValue = RadioGroupRootOwnProps;
const RadioGroupContext = React.createContext<RadioGroupContextValue>({});

type RadioGroupRootElement = React.ElementRef<typeof RadioGroupPrimitive.Root>;
interface RadioGroupRootProps
  extends ComponentPropsWithoutColor<typeof RadioGroupPrimitive.Root>,
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
    },
    forwardedRef
  ) => {
    const { className, ...rootProps } = extractProps(props, marginPropDefs);
    return (
      <RadioGroupContext.Provider
        value={React.useMemo(
          () => ({ color, highContrast, size, variant }),
          [color, highContrast, size, variant]
        )}
      >
        <RadioGroupPrimitive.Root
          {...rootProps}
          ref={forwardedRef}
          className={classNames('rt-RadioGroupRoot', className)}
        />
      </RadioGroupContext.Provider>
    );
  }
);
RadioGroupRoot.displayName = 'RadioGroupRoot';

type RadioGroupItemElement = React.ElementRef<typeof RadioGroupItemRadio>;
interface RadioGroupItemProps
  extends Omit<ComponentPropsWithoutColor<typeof RadioGroupItemRadio>, 'asChild'>,
    MarginProps {}
const RadioGroupItem = React.forwardRef<RadioGroupItemElement, RadioGroupItemProps>(
  ({ children, className, style, ...props }, forwardedRef) => {
    const { size } = React.useContext(RadioGroupContext);

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
          <RadioGroupItemRadio ref={forwardedRef} {...props} />
          {children && <span>{children}</span>}
        </Text>
      );
    }

    return (
      <RadioGroupItemRadio ref={forwardedRef} className={className} style={style} {...props} />
    );
  }
);
RadioGroupItem.displayName = 'RadioGroupItem';

type RadioGroupItemRadioElement = React.ElementRef<typeof RadioGroupPrimitive.Item>;
interface RadioGroupItemRadioProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {}
const RadioGroupItemRadio = React.forwardRef<RadioGroupItemRadioElement, RadioGroupItemRadioProps>(
  (props, forwardedRef) => {
    const context = React.useContext(RadioGroupContext);
    const { color, className } = extractProps(
      { ...props, ...context },
      radioGroupRootPropDefs,
      marginPropDefs
    );
    return (
      <RadioGroupPrimitive.Item
        data-accent-color={color}
        {...props}
        asChild={false}
        ref={forwardedRef}
        className={classNames('rt-reset', 'rt-BaseRadioRoot', className)}
      />
    );
  }
);
RadioGroupItemRadio.displayName = 'RadioGroupItemRadio';

export { RadioGroupRoot, RadioGroupItem };
export type { RadioGroupRootProps, RadioGroupItemProps };
