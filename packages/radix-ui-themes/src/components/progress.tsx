'use client';

import * as React from 'react';
import classNames from 'classnames';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { progressPropDefs } from './progress.props.js';
import { extractProps, mergeStyles } from '../helpers/index.js';
import { marginPropDefs } from '../props/index.js';

import type { ComponentPropsWithout, RemovedProps } from '../helpers/index.js';
import type { GetPropDefTypes, MarginProps } from '../props/index.js';

type ProgressElement = React.ElementRef<typeof ProgressPrimitive.Root>;
type ProgressOwnProps = GetPropDefTypes<typeof progressPropDefs>;
interface ProgressProps
  extends ComponentPropsWithout<typeof ProgressPrimitive.Root, RemovedProps | 'children'>,
    MarginProps,
    ProgressOwnProps {
  duration?: `${number}s` | `${number}ms`;
}
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
