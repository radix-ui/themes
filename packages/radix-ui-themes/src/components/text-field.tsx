import * as React from 'react';
import classNames from 'classnames';
import { extractMarginProps, withMargin, withBreakpoints } from '../helpers';

import type { MarginProps, ButtonRadius, Responsive } from '../helpers';

type TextFieldElement = React.ElementRef<'input'>;
interface TextFieldProps
  extends Omit<React.ComponentPropsWithRef<'input'>, 'color' | 'size'>,
    MarginProps {
  size?: Responsive<'1' | '2' | '3'>;
  variant?: 'surface' | 'surface-mono' | 'subtle-mono';
  radius?: ButtonRadius;
}
const TextField = React.forwardRef<TextFieldElement, TextFieldProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const { className, size = '2', variant = 'surface', radius, ...textAreaProps } = marginRest;

  return (
    <input
      data-button-radius={radius}
      {...textAreaProps}
      ref={forwardedRef}
      className={classNames(
        'rui-TextField',
        withBreakpoints(size, 'size'),
        `variant-${variant}`,
        withMargin(marginProps),
        className
      )}
    />
  );
});
TextField.displayName = 'TextField';

export { TextField };
