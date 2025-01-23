import * as React from 'react';
import classNames from 'classnames';
import { Slider as SliderPrimitive } from 'radix-ui';

import { sliderPropDefs } from './slider.props.js';
import { extractProps } from '../helpers/extract-props.js';
import { marginPropDefs } from '../props/margin.props.js';

import type { MarginProps } from '../props/margin.props.js';
import type { ComponentPropsWithout } from '../helpers/component-props.js';
import type { GetPropDefTypes } from '../props/prop-def.js';

type SliderElement = React.ElementRef<typeof SliderPrimitive.Root>;
type SliderOwnProps = GetPropDefTypes<typeof sliderPropDefs>;
interface SliderProps
  extends ComponentPropsWithout<
      typeof SliderPrimitive.Root,
      'asChild' | 'color' | 'children' | 'defaultChecked'
    >,
    MarginProps,
    SliderOwnProps {}
const Slider = React.forwardRef<SliderElement, SliderProps>((props, forwardedRef) => {
  const { className, color, radius, tabIndex, ...sliderProps } = extractProps(
    props,
    sliderPropDefs,
    marginPropDefs
  );
  return (
    <SliderPrimitive.Root
      data-accent-color={color}
      data-radius={radius}
      ref={forwardedRef}
      {...sliderProps}
      asChild={false}
      className={classNames('rt-SliderRoot', className)}
    >
      <SliderPrimitive.Track className="rt-SliderTrack">
        <SliderPrimitive.Range
          className={classNames('rt-SliderRange', { 'rt-high-contrast': props.highContrast })}
          data-inverted={sliderProps.inverted ? '' : undefined}
        />
      </SliderPrimitive.Track>
      {(sliderProps.value ?? sliderProps.defaultValue ?? []).map((value, index) => (
        <SliderPrimitive.Thumb
          key={index}
          className="rt-SliderThumb"
          {...(tabIndex !== undefined ? { tabIndex } : undefined)}
        />
      ))}
    </SliderPrimitive.Root>
  );
});
Slider.displayName = 'Slider';

export { Slider };
export type { SliderProps };
