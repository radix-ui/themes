import * as React from 'react';
import classNames from 'classnames';
import { extractMarginProps, withMargin, withBreakpoints } from '../helpers';

import type { MarginProps, Color, Responsive } from '../helpers';

type CodeElement = React.ElementRef<'code'>;
interface CodeProps extends Omit<React.ComponentPropsWithoutRef<'code'>, 'color'>, MarginProps {
  size?: Responsive<'1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'>;
  weight?: Responsive<'normal' | 'bold'>;
  color?: Color | 'color';
  highlighted?: boolean;
}
const Code = React.forwardRef<CodeElement, CodeProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const {
    className,
    size = '3',
    weight = 'normal',
    color,
    highlighted = true,
    ...codeProps
  } = marginRest;

  return (
    <code
      data-color-scale={color}
      {...codeProps}
      ref={forwardedRef}
      className={classNames(
        'rui-Code',
        withBreakpoints(size, 'size'),
        withBreakpoints(weight, 'weight'),
        { highlighted },
        withMargin(marginProps),
        className
      )}
    />
  );
});
Code.displayName = 'Code';

export { Code };
