'use client';

import * as React from 'react';
import classNames from 'classnames';
import { Slot } from '@radix-ui/react-slot';
import { Text } from './text.js';
import { calloutRootPropDefs } from './callout.props.js';
import { extractProps, mapCalloutSizeToTextSize, mapResponsiveProp } from '../helpers/index.js';
import { marginPropDefs } from '../props/index.js';

import type { ComponentPropsAs, ComponentPropsWithout, RemovedProps } from '../helpers/index.js';
import { GetPropDefTypes, MarginProps } from '../props/index.js';

type CalloutRootOwnProps = GetPropDefTypes<typeof calloutRootPropDefs>;

type CalloutContextValue = CalloutRootOwnProps;
const CalloutContext = React.createContext<CalloutContextValue>({});

type CalloutRootElement = React.ElementRef<'div'>;
interface CalloutRootProps
  extends ComponentPropsWithout<RemovedProps, 'div'>,
    MarginProps,
    CalloutContextValue {}
const CalloutRoot = React.forwardRef<CalloutRootElement, CalloutRootProps>(
  (props, forwardedRef) => {
    const {
      size = calloutRootPropDefs.size.default,
      highContrast = calloutRootPropDefs.highContrast.default,
    } = props;
    const { asChild, children, className, color, ...rootProps } = extractProps(
      props,
      calloutRootPropDefs,
      marginPropDefs
    );
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        data-accent-color={color}
        {...rootProps}
        className={classNames('rt-CalloutRoot', className)}
        ref={forwardedRef}
      >
        <CalloutContext.Provider
          value={React.useMemo(() => ({ size, color, highContrast }), [size, color, highContrast])}
        >
          {children}
        </CalloutContext.Provider>
      </Comp>
    );
  }
);
CalloutRoot.displayName = 'CalloutRoot';

type CalloutIconElement = React.ElementRef<'div'>;
interface CalloutIconProps extends ComponentPropsWithout<RemovedProps, 'div'> {}
const CalloutIcon = React.forwardRef<CalloutIconElement, CalloutIconProps>(
  ({ className, ...props }, forwardedRef) => {
    const { color, size, highContrast } = React.useContext(CalloutContext);
    return (
      <Text
        asChild
        color={color}
        size={mapResponsiveProp(size, mapCalloutSizeToTextSize)}
        highContrast={highContrast}
      >
        <div {...props} className={classNames('rt-CalloutIcon', className)} ref={forwardedRef} />
      </Text>
    );
  }
);
CalloutIcon.displayName = 'CalloutIcon';

type CalloutTextElement = React.ElementRef<'p'>;
type CalloutTextProps = ComponentPropsAs<typeof Text, 'p'>;
const CalloutText = React.forwardRef<CalloutTextElement, CalloutTextProps>(
  ({ className, ...props }, forwardedRef) => {
    const { color, size, highContrast } = React.useContext(CalloutContext);
    return (
      <Text
        as="p"
        size={mapResponsiveProp(size, mapCalloutSizeToTextSize)}
        color={color}
        highContrast={highContrast}
        {...props}
        asChild={false}
        ref={forwardedRef}
        className={classNames('rt-CalloutText', className)}
      />
    );
  }
);
CalloutText.displayName = 'CalloutText';

export { CalloutRoot, CalloutIcon, CalloutText };
export type { CalloutRootProps, CalloutIconProps, CalloutTextProps };
