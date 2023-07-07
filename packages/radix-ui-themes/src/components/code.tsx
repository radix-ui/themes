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
      data-accent-scale={color}
      {...codeProps}
      ref={forwardedRef}
      className={classNames(
        'rui-Code',
        withBreakpoints(size, 'size'),
        `variant-${variant}`,
        { 'high-contrast': highContrast },
        withBreakpoints(weight, 'rui-weight'),
        withMarginProps(marginProps),
        className
      )}
    />
  );
});
Code.displayName = 'Code';

export { Code };
