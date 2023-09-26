'use client';

import * as React from 'react';
import classNames from 'classnames';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { sliderPropDefs } from './slider.props';
import { extractMarginProps, withMarginProps, withBreakpoints } from '../helpers';

import type { PropsWithoutRefOrColor, MarginProps, GetPropDefTypes } from '../helpers';

type SliderElement = React.ElementRef<typeof SliderPrimitive.Root>;
type SliderOwnProps = GetPropDefTypes<typeof sliderPropDefs>;
interface SliderProps
  extends Omit<PropsWithoutRefOrColor<typeof SliderPrimitive.Root>, 'children'>,
    MarginProps,
    SliderOwnProps {}
const Slider = React.forwardRef<SliderElement, SliderProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const {
    className,
    size = sliderPropDefs.size.default,
    variant = sliderPropDefs.variant.default,
    color = sliderPropDefs.color.default,
    highContrast = sliderPropDefs.highContrast.default,
    radius = sliderPropDefs.radius.default,
    tabIndex,
    ...sliderProps
  } = marginRest;
  return (
    <SliderPrimitive.Root
      data-accent-color={color}
      data-radius={radius}
      ref={forwardedRef}
      {...sliderProps}
      className={classNames(
        'rt-SliderRoot',
        className,
        withBreakpoints(size, 'rt-r-size'),
        `rt-variant-${variant}`,
        { 'rt-high-contrast': highContrast },
        withMarginProps(marginProps)
      )}
    >
      <SliderPrimitive.Track className="rt-SliderTrack">
        <SliderPrimitive.Range
          className={classNames('rt-SliderRange', { 'rt-high-contrast': highContrast })}
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
