import * as React from 'react';
import classNames from 'classnames';
import { extractMarginProps, withMargin, withBreakpoints } from '../helpers';
import {
  defaultCodeSize,
  defaultCodeVariant,
  defaultCodeWeight,
  defaultCodeColor,
} from './code.props';

import type { MarginProps, Color, Responsive } from '../helpers';
import type { CodeSize, CodeVariant, CodeWeight } from './code.props';

type CodeElement = React.ElementRef<'code'>;
interface CodeProps extends Omit<React.ComponentPropsWithoutRef<'code'>, 'color'>, MarginProps {
  size?: Responsive<CodeSize>;
  variant?: CodeVariant;
  weight?: Responsive<CodeWeight>;
  color?: Color;
}
const Code = React.forwardRef<CodeElement, CodeProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const {
    className,
    size = defaultCodeSize,
    variant = defaultCodeVariant,
    weight = defaultCodeWeight,
    color = defaultCodeColor,
    ...codeProps
  } = marginRest;
  return (
    <code
      data-accent-scale={color}
      {...codeProps}
      ref={forwardedRef}
      className={classNames(
        'rui-Code',
        withBreakpoints(size, 'size'),
        `variant-${variant}`,
        withBreakpoints(weight, 'weight'),
        withMargin(marginProps),
        className
      )}
    />
  );
});
Code.displayName = 'Code';

export { Code };
