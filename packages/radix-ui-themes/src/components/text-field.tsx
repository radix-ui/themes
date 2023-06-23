import * as React from 'react';
import classNames from 'classnames';
import { extractMarginProps, withMargin, withBreakpoints } from '../helpers';
import {
  defaultTextFieldSize,
  defaultTextFieldVariant,
  defaultTextFieldRadius,
} from './text-field.props';

import type { MarginProps, Radius, Responsive } from '../helpers';
import type { TextFieldSize, TextFieldVariant } from './text-field.props';

type TextFieldElement = React.ElementRef<'input'>;
interface TextFieldProps
  extends Omit<React.ComponentPropsWithRef<'input'>, 'color' | 'size'>,
    MarginProps {
  size?: Responsive<TextFieldSize>;
  variant?: TextFieldVariant;
  radius?: Radius;
}
const TextField = React.forwardRef<TextFieldElement, TextFieldProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const {
    className,
    size = defaultTextFieldSize,
    variant = defaultTextFieldVariant,
    radius = defaultTextFieldRadius,
    ...textAreaProps
  } = marginRest;
  return (
    <input
      data-radius={radius}
      spellCheck="false"
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
