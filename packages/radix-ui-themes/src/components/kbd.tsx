import * as React from 'react';
import classNames from 'classnames';
import { extractMarginProps, withMarginProps } from '../helpers';

import type { MarginProps } from '../helpers';

type KbdElement = React.ElementRef<'kbd'>;
interface KbdProps extends React.ComponentPropsWithoutRef<'kbd'>, MarginProps {}
const Kbd = React.forwardRef<KbdElement, KbdProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const { className, ...kbdProps } = marginRest;
  return (
    <kbd
      {...kbdProps}
      ref={forwardedRef}
      className={classNames('rt-Kbd', className, withMarginProps(marginProps))}
    />
  );
});
Kbd.displayName = 'Kbd';

export { Kbd };
