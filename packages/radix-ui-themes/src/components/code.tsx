import * as React from 'react';
import classNames from 'classnames';
import { extractMarginProps, withMargin, withBreakpoints } from '../helpers';

import type { MarginProps, Color, Responsive } from '../helpers';

const codeSizes = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
type CodeSize = (typeof codeSizes)[number];

const codeWeights = ['normal', 'bold'] as const;
type CodeWeight = (typeof codeWeights)[number];

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
    size,
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

export { codeSizes, codeWeights, Code };
export type { CodeSize, CodeWeight };
