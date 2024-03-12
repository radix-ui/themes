'use client';

import * as React from 'react';
import classNames from 'classnames';
import { composeEventHandlers } from '@radix-ui/primitive';
import { composeRefs } from '@radix-ui/react-compose-refs';
import { radioPropDefs } from './radio.props.js';
import { extractProps } from '../helpers/index.js';
import { marginPropDefs } from '../props/index.js';

import type { ComponentPropsWithout, NotInputRadioAttributes } from '../helpers/index.js';
import type { GetPropDefTypes, MarginProps } from '../props/index.js';

type RadioElement = React.ElementRef<'input'>;
type RadioOwnProps = GetPropDefTypes<typeof radioPropDefs> & {
  value: string;
  onValueChange?: (value: string) => void;
};
type RadioInputProps = ComponentPropsWithout<
  'input',
  NotInputRadioAttributes | 'color' | 'defaultValue' | 'value'
>;
interface RadioProps extends RadioInputProps, MarginProps, RadioOwnProps {}

const Radio = React.forwardRef<RadioElement, RadioProps>((props, forwardedRef) => {
  const ref = React.useRef<RadioElement>(null);
  const { className, color, onChange, onValueChange, ...radioProps } = extractProps(
    props,
    radioPropDefs,
    marginPropDefs
  );
  return (
    <input
      type="radio"
      data-accent-color={color}
      {...radioProps}
      onChange={composeEventHandlers(onChange, (event) =>
        onValueChange?.(event.currentTarget.value)
      )}
      ref={composeRefs(ref, forwardedRef)}
      className={classNames('rt-reset', 'rt-BaseRadioRoot', 'rt-RadioRoot', className)}
    />
  );
});
Radio.displayName = 'Radio';

export { Radio };
export type { RadioProps };
