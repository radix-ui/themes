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
    SliderOwnProps {
  ticks?: Array<{ value: number; label?: string }>;
  unit?: string;
}
const Slider = React.forwardRef<SliderElement, SliderProps>((props, forwardedRef) => {
  const { className, color, radius, tabIndex, ...sliderProps } = extractProps(
    props,
    sliderPropDefs,
    marginPropDefs,
  );
  const { ticks, showTickLabels, snapToTicks, unit } = props;

  const min = sliderProps.min ?? 0;
  const max = sliderProps.max ?? 100;

  // Current value for accessibility
  const currentValue = sliderProps.value ?? sliderProps.defaultValue ?? [min];
  const isRange = Array.isArray(currentValue) && currentValue.length > 1;

  // For snapping to ticks, we need to handle this differently
  // Radix slider doesn't support arbitrary step values, so we'll handle snapping in the onValueChange
  const step = sliderProps.step;

  // Optimized snap-to-ticks with memoized sorted ticks
  const sortedTicks = React.useMemo(
    () => (ticks ? [...ticks].sort((a, b) => a.value - b.value) : []),
    [ticks],
  );

  // Function to snap value to nearest tick (optimized)
  const snapToNearestTick = React.useCallback(
    (value: number): number => {
      if (!snapToTicks || !sortedTicks.length) return value;

      // Binary search for closest tick
      let left = 0;
      let right = sortedTicks.length - 1;

      if (value <= sortedTicks[left].value) return sortedTicks[left].value;
      if (value >= sortedTicks[right].value) return sortedTicks[right].value;

      while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (sortedTicks[mid].value === value) return value;

        if (sortedTicks[mid].value < value) {
          left = mid + 1;
        } else {
          right = mid - 1;
        }
      }

      // Find closest between left and right
      const leftDistance = Math.abs(value - sortedTicks[right].value);
      const rightDistance = Math.abs(value - sortedTicks[left].value);

      return leftDistance <= rightDistance ? sortedTicks[right].value : sortedTicks[left].value;
    },
    [snapToTicks, sortedTicks],
  );

  // Format value text for accessibility
  const formatValueText = React.useCallback(
    (values: number[]): string => {
      const formatValue = (val: number) => (unit ? `${val} ${unit}` : val.toString());

      if (values.length === 1) {
        return `${formatValue(values[0])} out of ${formatValue(max)}`;
      } else if (values.length === 2) {
        return `${formatValue(values[0])} to ${formatValue(values[1])} out of ${formatValue(max)}`;
      } else {
        return `${values.map(formatValue).join(', ')} out of ${formatValue(max)}`;
      }
    },
    [unit, max],
  );

  // Memoize tick elements for performance
  const tickElements = React.useMemo(() => {
    if (!ticks) return null;

    return ticks.map((tick, index) => ({
      ...tick,
      percentage: ((tick.value - min) / (max - min)) * 100,
      index,
    }));
  }, [ticks, min, max]);

  // Live region state for accessibility announcements
  const [announceValue, setAnnounceValue] = React.useState<string>('');

  const { onValueChange } = sliderProps;
  // Handle value changes with snapping
  const handleValueChange = React.useCallback(
    (newValue: number[]) => {
      const finalValue =
        snapToTicks && ticks ? newValue.map((v) => snapToNearestTick(v)) : newValue;

      // Update live region for screen readers
      const valueText = formatValueText(finalValue);
      setAnnounceValue(valueText);

      onValueChange?.(finalValue);
    },
    [snapToTicks, ticks, snapToNearestTick, formatValueText, onValueChange],
  );

  // Clear announcement after a delay to prevent spam
  React.useEffect(() => {
    if (announceValue) {
      const timer = setTimeout(() => setAnnounceValue(''), 1000);
      return () => clearTimeout(timer);
    }
  }, [announceValue]);

  return (
    <div className="rt-SliderContainer">
      {/* Live region for screen reader announcements */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        style={{
          position: 'absolute',
          left: '-10000px',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
        }}
      >
        {announceValue}
      </div>

      <SliderPrimitive.Root
        data-accent-color={color}
        data-radius={radius}
        ref={forwardedRef}
        {...sliderProps}
        step={step}
        onValueChange={handleValueChange}
        asChild={false}
        className={classNames('rt-SliderRoot', className)}
        // Essential ARIA attributes for WCAG 2.2 AA compliance
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={Array.isArray(currentValue) ? currentValue[0] : (currentValue as number)}
        aria-valuetext={formatValueText(currentValue as number[])}
        aria-label={props['aria-label'] || `${isRange ? 'Range' : 'Value'} slider`}
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
            aria-label={
              isRange
                ? `${index === 0 ? 'Minimum' : index === 1 ? 'Maximum' : `Thumb ${index + 1}`} value: ${unit ? `${value} ${unit}` : value}`
                : `Slider value: ${unit ? `${value} ${unit}` : value}`
            }
            aria-valuetext={unit ? `${value} ${unit}` : value.toString()}
          />
        ))}
      </SliderPrimitive.Root>
      {tickElements && (
        <div className="rt-SliderTicks" role="group" aria-label="Slider tick marks">
          {tickElements.map((tick) => {
            return (
              <button
                key={tick.index}
                className="rt-SliderTick"
                style={{
                  left: `${tick.percentage}%`,
                  transform: 'translateX(-50%)',
                }}
                onClick={() => {
                  const currentValues = sliderProps.value ?? sliderProps.defaultValue ?? [min];
                  const newValue = Array.isArray(currentValues)
                    ? currentValues.map(() => tick.value)
                    : [tick.value];

                  handleValueChange(newValue);
                }}
                aria-label={`Set to ${tick.label || (unit ? `${tick.value} ${unit}` : tick.value)}`}
                aria-describedby={tick.label ? undefined : `tick-${tick.index}-value`}
                type="button"
              >
                <div className="rt-SliderTickMark" />
                {tick.label && showTickLabels !== false && (
                  <div className="rt-SliderTickLabel">{tick.label}</div>
                )}
                {!tick.label && (
                  <span id={`tick-${tick.index}-value`} className="sr-only">
                    {unit ? `${tick.value} ${unit}` : tick.value}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
});
Slider.displayName = 'Slider';

export { Slider };
export type { SliderProps };
