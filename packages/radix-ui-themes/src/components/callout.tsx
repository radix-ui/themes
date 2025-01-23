'use client';

import * as React from 'react';
import classNames from 'classnames';
import { Slot } from 'radix-ui';

import { Text } from './text';
import { calloutRootPropDefs } from './callout.props';
import { extractProps } from '../helpers/extract-props';
import { mapResponsiveProp, mapCalloutSizeToTextSize } from '../helpers/map-prop-values';
import { marginPropDefs } from '../props/margin.props';

import type { MarginProps } from '../props/margin.props';
import type {
  ComponentPropsWithout,
  RemovedProps,
  ComponentPropsAs,
} from '../helpers/component-props';
import type { GetPropDefTypes } from '../props/prop-def';

type CalloutRootOwnProps = GetPropDefTypes<typeof calloutRootPropDefs>;

type CalloutContextValue = { size?: CalloutRootOwnProps['size'] };
const CalloutContext = React.createContext<CalloutContextValue>({});

type CalloutRootElement = React.ElementRef<'div'>;
interface CalloutRootProps
  extends ComponentPropsWithout<'div', RemovedProps>,
    MarginProps,
    CalloutRootOwnProps {}
const CalloutRoot = React.forwardRef<CalloutRootElement, CalloutRootProps>(
  (props, forwardedRef) => {
    const { size = calloutRootPropDefs.size.default } = props;
    const { asChild, children, className, color, ...rootProps } = extractProps(
      props,
      calloutRootPropDefs,
      marginPropDefs
    );
    const Comp = asChild ? Slot.Root : 'div';
    return (
      <Comp
        data-accent-color={color}
        {...rootProps}
        className={classNames('rt-CalloutRoot', className)}
        ref={forwardedRef}
      >
        <CalloutContext.Provider value={React.useMemo(() => ({ size }), [size])}>
          {children}
        </CalloutContext.Provider>
      </Comp>
    );
  }
);
CalloutRoot.displayName = 'Callout.Root';

type CalloutIconElement = React.ElementRef<'div'>;
interface CalloutIconProps extends ComponentPropsWithout<'div', RemovedProps> {}
const CalloutIcon = React.forwardRef<CalloutIconElement, CalloutIconProps>(
  ({ className, ...props }, forwardedRef) => {
    return (
      <div {...props} className={classNames('rt-CalloutIcon', className)} ref={forwardedRef} />
    );
  }
);
CalloutIcon.displayName = 'Callout.Icon';

type CalloutTextElement = React.ElementRef<'p'>;
type CalloutTextProps = ComponentPropsAs<typeof Text, 'p'>;
const CalloutText = React.forwardRef<CalloutTextElement, CalloutTextProps>(
  ({ className, ...props }, forwardedRef) => {
    const { size } = React.useContext(CalloutContext);
    return (
      <Text
        as="p"
        size={mapResponsiveProp(size, mapCalloutSizeToTextSize)}
        {...props}
        asChild={false}
        ref={forwardedRef}
        className={classNames('rt-CalloutText', className)}
      />
    );
  }
);
CalloutText.displayName = 'Callout.Text';

export { CalloutRoot as Root, CalloutIcon as Icon, CalloutText as Text };
export type {
  CalloutRootProps as RootProps,
  CalloutIconProps as IconProps,
  CalloutTextProps as TextProps,
};
