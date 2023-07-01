import * as React from 'react';
import classNames from 'classnames';
import { extractMarginProps, withMarginProps, withBreakpoints } from '../helpers';
import {
  defaultTextFieldSize,
  defaultTextFieldVariant,
  defaultTextFieldColor,
  defaultTextFieldRadius,
} from './text-field.props';

import type { PropsWithoutRefOrColor, MarginProps, Color, Radius, Responsive } from '../helpers';
import type { TextFieldSize, TextFieldVariant } from './text-field.props';

type TextFieldElement = React.ElementRef<'input'>;
interface TextFieldProps extends Omit<PropsWithoutRefOrColor<'input'>, 'size'>, MarginProps {
  size?: Responsive<TextFieldSize>;
  variant?: TextFieldVariant;
  color?: Color;
  radius?: Radius;
}
const TextField = React.forwardRef<TextFieldElement, TextFieldProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const {
    className,
    size = defaultTextFieldSize,
    variant = defaultTextFieldVariant,
    color = defaultTextFieldColor,
    radius = defaultTextFieldRadius,
    ...textAreaProps
  } = marginRest;
  return (
    <input
      data-accent-scale={color}
      data-radius={radius}
      spellCheck="false"
      {...textAreaProps}
      ref={forwardedRef}
      className={classNames(
        'rui-TextField',
        withBreakpoints(size, 'size'),
        `variant-${variant}`,
        withMarginProps(marginProps),
        className
      )}
    />
  );
});
TextField.displayName = 'TextField';

export { TextField };
