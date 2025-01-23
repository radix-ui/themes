import * as React from 'react';
import classNames from 'classnames';
import { Progress as ProgressPrimitive } from 'radix-ui';

import { progressPropDefs } from './progress.props.js';
import { extractProps } from '../helpers/extract-props.js';
import { mergeStyles } from '../helpers/merge-styles.js';
import { marginPropDefs } from '../props/margin.props.js';

import type { MarginProps } from '../props/margin.props.js';
import type { ComponentPropsWithout, RemovedProps } from '../helpers/component-props.js';
import type { GetPropDefTypes } from '../props/prop-def.js';

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
          '--progress-max': 'max' in progressProps ? progressProps.max : undefined,
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
