import * as React from 'react';
import classNames from 'classnames';
import {
  defaultCodeSize,
  defaultCodeVariant,
  defaultCodeWeight,
  defaultCodeColor,
  defaultCodeHighContrast,
} from './code.props';
import { extractMarginProps, withMarginProps, withBreakpoints } from '../helpers';

import type { CodeSize, CodeVariant, CodeWeight } from './code.props';
import type { PropsWithoutRefOrColor, MarginProps, Responsive } from '../helpers';
import type { ThemeAccentScale } from '../theme';

type CodeElement = React.ElementRef<'code'>;
interface CodeProps extends PropsWithoutRefOrColor<'code'>, MarginProps {
  size?: Responsive<CodeSize>;
  variant?: CodeVariant;
  weight?: Responsive<CodeWeight>;
  color?: ThemeAccentScale;
  highContrast?: boolean;
}
const Code = React.forwardRef<CodeElement, CodeProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const {
    className,
    size = defaultCodeSize,
    variant = defaultCodeVariant,
    weight = defaultCodeWeight,
    color = defaultCodeColor,
    highContrast = defaultCodeHighContrast,
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
        { highContrast },
        withBreakpoints(weight, 'weight'),
        withMarginProps(marginProps),
        className
      )}
    />
  );
});
Code.displayName = 'Code';

export { Code };
