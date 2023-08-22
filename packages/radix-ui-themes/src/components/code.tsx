import * as React from 'react';
import classNames from 'classnames';
import { codePropDefs } from './code.props';
import { extractMarginProps, withMarginProps, withBreakpoints } from '../helpers';

import type { PropsWithoutRefOrColor, MarginProps, GetPropDefTypes } from '../helpers';

type CodeElement = React.ElementRef<'code'>;
type CodeOwnProps = GetPropDefTypes<typeof codePropDefs>;
interface CodeProps extends PropsWithoutRefOrColor<'code'>, MarginProps, CodeOwnProps {}
const Code = React.forwardRef<CodeElement, CodeProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const {
    className,
    size = codePropDefs.size.default,
    variant = codePropDefs.variant.default,
    weight = codePropDefs.weight.default,
    color = codePropDefs.color.default,
    highContrast = codePropDefs.highContrast.default,
    ...codeProps
  } = marginRest;
  return (
    <code
      data-accent-color={color}
      {...codeProps}
      ref={forwardedRef}
      className={classNames(
        'rt-Code',
        className,
        withBreakpoints(size, 'rt-r-size'),
        `rt-variant-${variant}`,
        withBreakpoints(weight, 'rt-r-weight'),
        { 'rt-high-contrast': highContrast },
        withMarginProps(marginProps)
      )}
    />
  );
});
Code.displayName = 'Code';

export { Code };
export type { CodeProps };
