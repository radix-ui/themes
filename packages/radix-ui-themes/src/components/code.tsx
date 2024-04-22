import * as React from 'react';
import classNames from 'classnames';
import { Slot } from '@radix-ui/react-slot';
import { codePropDefs } from './code.props.js';
import { extractProps } from '../helpers/index.js';
import { marginPropDefs } from '../props/index.js';

import type { ComponentPropsWithout, RemovedProps } from '../helpers/index.js';
import type { GetPropDefTypes, MarginProps } from '../props/index.js';

type CodeElement = React.ElementRef<'code'>;
type CodeOwnProps = GetPropDefTypes<typeof codePropDefs>;
interface CodeProps
  extends ComponentPropsWithout<'code', RemovedProps>,
    MarginProps,
    CodeOwnProps {}
const Code = React.forwardRef<CodeElement, CodeProps>((props, forwardedRef) => {
  const { asChild, className, color, ...codeProps } = extractProps(
    props,
    codePropDefs,
    marginPropDefs
  );
  // Code ghost color prop should work as text color by default
  const resolvedColor = props.variant === 'ghost' ? color || undefined : color;
  const Comp = asChild ? Slot : 'code';
  return (
    <Comp
      data-accent-color={resolvedColor}
      {...codeProps}
      ref={forwardedRef}
      className={classNames('rt-reset', 'rt-Code', className)}
    />
  );
});
Code.displayName = 'Code';

export { Code };
export type { CodeProps };
