import * as React from 'react';
import classNames from 'classnames';
import {
  textFieldSizeDefault,
  textFieldVariantDefault,
  textFieldColorDefault,
  textFieldRadiusDefault,
} from './text-field.props';
import { extractMarginProps, withMarginProps, withBreakpoints } from '../helpers';

import type { TextFieldSize, TextFieldVariant } from './text-field.props';
import type { PropsWithoutRefOrColor, MarginProps, Responsive } from '../helpers';
import type { ThemeAccentScale, ThemeRadius } from '../theme-options';

type TextFieldElement = React.ElementRef<'input'>;
interface TextFieldProps extends Omit<PropsWithoutRefOrColor<'input'>, 'size'>, MarginProps {
  size?: Responsive<TextFieldSize>;
  variant?: TextFieldVariant;
  color?: ThemeAccentScale;
  radius?: ThemeRadius;
}
const TextField = React.forwardRef<TextFieldElement, TextFieldProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const {
    className,
    size = textFieldSizeDefault,
    variant = textFieldVariantDefault,
    color = textFieldColorDefault,
    radius = textFieldRadiusDefault,
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
