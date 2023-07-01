'use client';

import * as React from 'react';
import classNames from 'classnames';
import * as SliderPrimitive from '@radix-ui/react-slider';
import {
  defaultSliderSize,
  defaultSliderVariant,
  defaultSliderColor,
  defaultSliderHighContrast,
  defaultSliderRadius,
} from './slider.props';
import { extractMarginProps, withMarginProps, withBreakpoints } from '../helpers';

import type { SliderSize, SliderVariant } from './slider.props';
import type { PropsWithoutRefOrColor, MarginProps, Responsive } from '../helpers';
import type { ThemeAccentScale, ThemeRadius } from '../theme';

type SliderElement = React.ElementRef<typeof SliderPrimitive.Root>;
interface SliderProps
  extends Omit<PropsWithoutRefOrColor<typeof SliderPrimitive.Root>, 'children'>,
    MarginProps {
  size?: Responsive<SliderSize>;
  variant?: SliderVariant;
  color?: ThemeAccentScale;
  highContrast?: boolean;
  radius?: ThemeRadius;
}
const Slider = React.forwardRef<SliderElement, SliderProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const {
    className,
    size = defaultSliderSize,
    variant = defaultSliderVariant,
    color = defaultSliderColor,
    highContrast = defaultSliderHighContrast,
    radius = defaultSliderRadius,
    ...sliderProps
  } = marginRest;
  return (
    <SliderPrimitive.Root
      data-accent-scale={color}
      data-radius={radius}
      ref={forwardedRef}
      {...sliderProps}
      className={classNames(
        'rui-SliderRoot',
        withBreakpoints(size, 'size'),
        `variant-${variant}`,
        { highContrast },
        withMarginProps(marginProps),
        className
      )}
    >
      <SliderPrimitive.Track className="rui-SliderTrack">
        <SliderPrimitive.Range
          className="rui-SliderRange"
          data-inverted={sliderProps.inverted ? '' : undefined}
        />
      </SliderPrimitive.Track>
      {(sliderProps.value ?? sliderProps.defaultValue ?? []).map((value, index) => (
        <SliderPrimitive.Thumb key={index} className="rui-SliderThumb" />
      ))}
    </SliderPrimitive.Root>
  );
});
Slider.displayName = 'Slider';

export { Slider };
