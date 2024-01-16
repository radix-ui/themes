'use client';

import * as React from 'react';
import classNames from 'classnames';
import { Text } from './text';
import { calloutRootPropDefs } from './callout.props';
import {
  extractProps,
  mapCalloutSizeToTextSize,
  mapResponsiveProp,
  marginPropDefs,
} from '../helpers';

import type {
  PropsWithoutRefOrColor,
  MarginProps,
  GetPropDefTypes,
  ExtractPropsForTag,
} from '../helpers';

type CalloutRootOwnProps = GetPropDefTypes<typeof calloutRootPropDefs>;

type CalloutContextValue = CalloutRootOwnProps;
const CalloutContext = React.createContext<CalloutContextValue>({});

type CalloutRootElement = React.ElementRef<'div'>;
interface CalloutRootProps
  extends PropsWithoutRefOrColor<'div'>,
    MarginProps,
    CalloutContextValue {}
const CalloutRoot = React.forwardRef<CalloutRootElement, CalloutRootProps>(
  (props, forwardedRef) => {
    const {
      size = calloutRootPropDefs.size.default,
      highContrast = calloutRootPropDefs.highContrast.default,
    } = props;
    const { children, className, color, ...rootProps } = extractProps(
      props,
      calloutRootPropDefs,
      marginPropDefs
    );
    return (
      <div
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
      </div>
    );
  }
);
CalloutRoot.displayName = 'CalloutRoot';

type CalloutIconElement = React.ElementRef<'div'>;
interface CalloutIconProps extends PropsWithoutRefOrColor<'div'> {}
const CalloutIcon = React.forwardRef<CalloutIconElement, CalloutIconProps>(
  (props, forwardedRef) => {
    const { color, size, highContrast } = React.useContext(CalloutContext);
    return (
      <Text
        asChild
        color={color}
        size={mapResponsiveProp(size, mapCalloutSizeToTextSize)}
        highContrast={highContrast}
      >
        <div
          {...props}
          className={classNames('rt-CalloutIcon', props.className)}
          ref={forwardedRef}
        />
      </Text>
    );
  }
);
CalloutIcon.displayName = 'CalloutIcon';

type CalloutTextElement = React.ElementRef<'p'>;
type CalloutTextProps = ExtractPropsForTag<typeof Text, 'p'>;
const CalloutText = React.forwardRef<CalloutTextElement, CalloutTextProps>(
  (props, forwardedRef) => {
    const { color, size, highContrast } = React.useContext(CalloutContext);
    return (
      <Text
        as="p"
        size={mapResponsiveProp(size, mapCalloutSizeToTextSize)}
        color={color}
        highContrast={highContrast}
        {...props}
        ref={forwardedRef}
        className={classNames('rt-CalloutText', props.className)}
      />
    );
  }
);
CalloutText.displayName = 'CalloutText';

const Callout = Object.assign(
  {},
  {
    Root: CalloutRoot,
    Icon: CalloutIcon,
    Text: CalloutText,
  }
);

export { Callout, CalloutRoot, CalloutIcon, CalloutText };
export type { CalloutRootProps, CalloutIconProps, CalloutTextProps };
