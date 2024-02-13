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

type RadioGroupItemElement = React.ElementRef<typeof RadioGroupPrimitive.Item>;
interface RadioGroupItemProps
  extends Omit<ComponentPropsWithoutColor<typeof RadioGroupPrimitive.Item>, 'asChild'>,
    MarginProps {}
const RadioGroupItem = React.forwardRef<RadioGroupItemElement, RadioGroupItemProps>(
  ({ children, className, style, ...props }, forwardedRef) => {
    const context = React.useContext(RadioGroupContext);
    const { className: radioClassName } = extractProps(
      context,
      radioGroupRootPropDefs,
      marginPropDefs
    );
    // Render `<Text as="label" size={context.size}>` if children are provided, otherwise
    // render a simple `<label>` to avoid setting a height / line height on the element.
    // This is so that you can easily use this component in own layout.
    const Label = children ? Text : 'label';
    const labelProps = children ? { as: 'label' as const, size: context.size } : {};
    return (
      <Label {...labelProps} className={classNames('rt-RadioGroupItem', className)} style={style}>
        <RadioGroupPrimitive.Item
          {...props}
          asChild={false}
          ref={forwardedRef}
          className={classNames('rt-reset', 'rt-BaseRadioRoot', radioClassName)}
        />
        {children && <span>{children}</span>}
      </Label>
    );
  }
);
RadioGroupItem.displayName = 'RadioGroupItem';

export { RadioGroupRoot, RadioGroupItem };
export type { RadioGroupRootProps, RadioGroupItemProps };
