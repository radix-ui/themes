import * as React from 'react';
import classNames from 'classnames';
import { kbdPropDefs } from './kbd.props.js';
import { extractMarginProps, withMarginProps, GetPropDefTypes, withBreakpoints } from '../helpers/index.js';

import type { MarginProps } from '../helpers/index.js';

type KbdElement = React.ElementRef<'kbd'>;
type KbdOwnProps = GetPropDefTypes<typeof kbdPropDefs>;
interface KbdProps extends React.ComponentPropsWithoutRef<'kbd'>, MarginProps, KbdOwnProps {}
const Kbd = React.forwardRef<KbdElement, KbdProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const { className, size = kbdPropDefs.size.default, ...kbdProps } = marginRest;
  return (
    <kbd
      {...kbdProps}
      ref={forwardedRef}
      className={classNames(
        'rt-Kbd',
        className,
        withBreakpoints(size, 'rt-r-size'),
        withMarginProps(marginProps)
      )}
    />
  );
});
Kbd.displayName = 'Kbd';

export { Kbd };
export type { KbdProps };
