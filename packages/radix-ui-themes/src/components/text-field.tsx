import * as React from 'react';
import classNames from 'classnames';
import { textFieldPropDefs } from './text-field.props';
import { extractMarginProps, withMarginProps, withBreakpoints } from '../helpers';

import type { PropsWithoutRefOrColor, MarginProps, GetPropDefTypes } from '../helpers';

type TextFieldElement = React.ElementRef<'input'>;
type TextFieldOwnProps = GetPropDefTypes<typeof textFieldPropDefs>;
interface TextFieldProps
  extends Omit<PropsWithoutRefOrColor<'input'>, 'size'>,
    MarginProps,
    TextFieldOwnProps {}
const TextField = React.forwardRef<TextFieldElement, TextFieldProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const {
    className,
    size = textFieldPropDefs.size.default,
    variant = textFieldPropDefs.variant.default,
    color = textFieldPropDefs.color.default,
    radius = textFieldPropDefs.radius.default,
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
        'rt-TextField',
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
