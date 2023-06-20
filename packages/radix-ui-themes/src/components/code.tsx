import * as React from 'react';
import classNames from 'classnames';
import { extractMarginProps, withMargin, withBreakpoints } from '../helpers';
import { defaultCodeSize, defaultCodeWeight, defaultCodeColor } from './code.props';

import type { MarginProps, Color, Responsive } from '../helpers';
import type { CodeSize, CodeWeight } from './code.props';

type CodeElement = React.ElementRef<'code'>;
interface CodeProps extends Omit<React.ComponentPropsWithoutRef<'code'>, 'color'>, MarginProps {
  size?: Responsive<CodeSize>;
  weight?: Responsive<CodeWeight>;
  color?: Color | 'color';
  highlighted?: boolean;
}
const Code = React.forwardRef<CodeElement, CodeProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const {
    className,
    size = defaultCodeSize,
    weight = defaultCodeWeight,
    color = defaultCodeColor,
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
