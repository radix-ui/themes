import * as React from 'react';
import classNames from 'classnames';
import { codePropDefs } from './code.props';
import { extractProps, marginPropDefs } from '../helpers';

import type { PropsWithoutRefOrColor, MarginProps, GetPropDefTypes } from '../helpers';

type CodeElement = React.ElementRef<'code'>;
type CodeOwnProps = GetPropDefTypes<typeof codePropDefs>;
interface CodeProps extends PropsWithoutRefOrColor<'code'>, MarginProps, CodeOwnProps {}
const Code = React.forwardRef<CodeElement, CodeProps>((props, forwardedRef) => {
  const {
    className,
    color: accent,
    ...codeProps
  } = extractProps(props, codePropDefs, marginPropDefs);
  // Code ghost color prop should work as an inherited color by default
  const color = props.variant === 'ghost' ? accent || undefined : accent;
  return (
    <code
      data-accent-color={color}
      {...codeProps}
      ref={forwardedRef}
      className={classNames('rt-Code', className)}
    />
  );
});
Code.displayName = 'Code';

export { Code };
export type { CodeProps };
