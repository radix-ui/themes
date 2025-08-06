'use client';

import * as React from 'react';
import classNames from 'classnames';
import { Slot } from 'radix-ui';

import { Text } from './text.js';
import { calloutRootPropDefs } from './callout.props.js';
import { extractProps } from '../helpers/extract-props.js';
import { mapResponsiveProp, mapCalloutSizeToTextSize } from '../helpers/map-prop-values.js';
import { marginPropDefs } from '../props/margin.props.js';

import type { MarginProps } from '../props/margin.props.js';
import type {
  ComponentPropsWithout,
  RemovedProps,
  ComponentPropsAs,
} from '../helpers/component-props.js';
import type { GetPropDefTypes } from '../props/prop-def.js';

type CalloutRootOwnProps = GetPropDefTypes<typeof calloutRootPropDefs>;

type CalloutContextValue = {
  size?: CalloutRootOwnProps['size'];
  variant?: CalloutRootOwnProps['variant'];
  color?: CalloutRootOwnProps['color'];
};
const CalloutContext = React.createContext<CalloutContextValue>({});

type CalloutRootElement = React.ElementRef<'div'>;
interface CalloutRootProps
  extends ComponentPropsWithout<'div', RemovedProps>,
    MarginProps,
    CalloutRootOwnProps {
  /** Controls the ARIA live region behavior for screen readers */
  live?: 'off' | 'polite' | 'assertive';
  /** Semantic role for the callout */
  role?: 'alert' | 'status' | 'note';
}
const CalloutRoot = React.forwardRef<CalloutRootElement, CalloutRootProps>(
  (props, forwardedRef) => {
    const {
      size = calloutRootPropDefs.size.default,
      live = 'polite',
      role = 'status',
      variant,
    } = props;
    const { asChild, children, className, color, panelBackground, material, ...rootProps } =
      extractProps(props, calloutRootPropDefs, marginPropDefs);
    const Comp = asChild ? Slot.Root : 'div';

    // Determine appropriate ARIA attributes based on role and live
    const ariaProps = {
      role,
      'aria-live': live,
      'aria-atomic': true,
    };

    return (
      <Comp
        data-accent-color={color}
        data-panel-background={panelBackground}
        data-material={material}
        {...rootProps}
        {...ariaProps}
        className={classNames('rt-CalloutRoot', className)}
        ref={forwardedRef}
      >
        <CalloutContext.Provider
          value={React.useMemo(() => ({ size, variant, color }), [size, variant, color])}
        >
          {children}
        </CalloutContext.Provider>
      </Comp>
    );
  },
);
CalloutRoot.displayName = 'Callout.Root';

type CalloutIconElement = React.ElementRef<'div'>;
interface CalloutIconProps extends ComponentPropsWithout<'div', RemovedProps> {}
const CalloutIcon = React.forwardRef<CalloutIconElement, CalloutIconProps>(
  ({ className, ...props }, forwardedRef) => {
    return (
      <div {...props} className={classNames('rt-CalloutIcon', className)} ref={forwardedRef} />
    );
  },
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
  },
);
CalloutText.displayName = 'Callout.Text';

export { CalloutRoot as Root, CalloutIcon as Icon, CalloutText as Text };
export type {
  CalloutRootProps as RootProps,
  CalloutIconProps as IconProps,
  CalloutTextProps as TextProps,
};
