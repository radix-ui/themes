'use client';

import * as React from 'react';
import classNames from 'classnames';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { progressPropDefs } from './progress.props';
import { extractMarginProps, withMarginProps, withBreakpoints } from '../helpers';

import type { PropsWithoutRefOrColor, MarginProps, GetPropDefTypes } from '../helpers';

type ProgressElement = React.ElementRef<typeof ProgressPrimitive.Root>;
type ProgressOwnProps = GetPropDefTypes<typeof progressPropDefs>;
interface ProgressProps
  extends Omit<PropsWithoutRefOrColor<typeof ProgressPrimitive.Root>, 'children'>,
    MarginProps,
    ProgressOwnProps {}
const Progress = React.forwardRef<ProgressElement, ProgressProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const {
    className,
    style,
    size = progressPropDefs.size.default,
    variant = progressPropDefs.variant.default,
    color = progressPropDefs.color.default,
    highContrast = progressPropDefs.highContrast.default,
    radius = progressPropDefs.radius.default,
    duration,
    ...progressProps
  } = marginRest;

  return (
    <ProgressPrimitive.Root
      data-accent-color={color}
      data-radius={radius}
      ref={forwardedRef}
      className={classNames(
        'rt-ProgressRoot',
        className,
        withBreakpoints(size, 'rt-r-size'),
        `rt-variant-${variant}`,
        { 'rt-high-contrast': highContrast },
        withMarginProps(marginProps)
      )}
      style={
        {
          '--progress-duration': 'value' in progressProps ? undefined : duration,
          '--progress-value': 'value' in progressProps ? progressProps.value : undefined,
          ...style,
        } as React.CSSProperties
      }
      {...progressProps}
    >
      <ProgressPrimitive.Indicator className="rt-ProgressIndicator" />
    </ProgressPrimitive.Root>
  );
});
Progress.displayName = 'Progress';

export { Progress };
export type { ProgressProps };
