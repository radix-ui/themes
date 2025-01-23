'use client';

import * as React from 'react';
import classNames from 'classnames';
import { composeEventHandlers, composeRefs } from 'radix-ui/internal';

import { radioPropDefs } from './radio.props.js';
import { marginPropDefs } from '../props/margin.props.js';
import { extractProps } from '../helpers/extract-props.js';

import type { MarginProps } from '../props/margin.props.js';
import type { ComponentPropsWithout } from '../helpers/component-props.js';
import type { NotInputRadioAttributes } from '../helpers/input-attributes.js';
import type { GetPropDefTypes } from '../props/prop-def.js';

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
