'use client';

import * as React from 'react';
import classNames from 'classnames';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { progressPropDefs } from './progress.props';
import { extractProps, marginPropDefs, mergeStyles } from '../helpers';

import type { PropsWithoutRefOrColor, MarginProps, GetPropDefTypes } from '../helpers';

type ProgressElement = React.ElementRef<typeof ProgressPrimitive.Root>;
type ProgressOwnProps = GetPropDefTypes<typeof progressPropDefs>;
interface ProgressProps
  extends Omit<PropsWithoutRefOrColor<typeof ProgressPrimitive.Root>, 'asChild' | 'children'>,
    MarginProps,
    ProgressOwnProps {}
const Progress = React.forwardRef<ProgressElement, ProgressProps>((props, forwardedRef) => {
  const { className, style, color, radius, duration, ...progressProps } = extractProps(
    props,
    progressPropDefs,
    marginPropDefs
  );

  return (
    <ProgressPrimitive.Root
      data-accent-color={color}
      data-radius={radius}
      ref={forwardedRef}
      className={classNames('rt-ProgressRoot', className)}
      style={mergeStyles(
        {
          '--progress-duration': 'value' in progressProps ? undefined : duration,
          '--progress-value': 'value' in progressProps ? progressProps.value : undefined,
        },
        style
      )}
      {...progressProps}
      asChild={false}
    >
      <ProgressPrimitive.Indicator className="rt-ProgressIndicator" />
    </ProgressPrimitive.Root>
  );
});
Progress.displayName = 'Progress';

export { Progress };
export type { ProgressProps };
