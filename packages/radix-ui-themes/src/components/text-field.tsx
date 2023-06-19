import * as React from 'react';
import classNames from 'classnames';
import { extractMarginProps, withMargin, withBreakpoints } from '../helpers';

import type { MarginProps, ButtonRadius, Responsive } from '../helpers';

const textFieldSizes = ['1', '2', '3'] as const;
type TextFieldSize = (typeof textFieldSizes)[number];
const defaultTextFieldSize: TextFieldSize = '2';

const textFieldVariants = ['surface', 'surface-mono', 'subtle-mono'] as const;
type TextFieldVariant = (typeof textFieldVariants)[number];
const defaultTextFieldVariant: TextFieldVariant = 'surface';

const defaultTextFieldRadius: ButtonRadius | undefined = undefined;

type TextFieldElement = React.ElementRef<'input'>;
interface TextFieldProps
  extends Omit<React.ComponentPropsWithRef<'input'>, 'color' | 'size'>,
    MarginProps {
  size?: Responsive<TextFieldSize>;
  variant?: TextFieldVariant;
  radius?: ButtonRadius;
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

export {
  textFieldSizes,
  defaultTextFieldSize,
  textFieldVariants,
  defaultTextFieldVariant,
  defaultTextFieldRadius,
  TextField,
};
export type { TextFieldSize, TextFieldVariant };
