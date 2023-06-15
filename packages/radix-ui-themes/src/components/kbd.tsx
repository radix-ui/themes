import * as React from 'react';
import classNames from 'classnames';
import { extractMarginProps, withMargin } from '../helpers';

import type { MarginProps } from '../helpers';

type KbdElement = React.ElementRef<'kbd'>;
interface KbdProps extends React.ComponentPropsWithoutRef<'kbd'>, MarginProps {
  width?: 'command' | 'shift' | 'space';
}
const Kbd = React.forwardRef<KbdElement, KbdProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const { className, width, ...kbdProps } = marginRest;

  return (
    <kbd
      {...kbdProps}
      ref={forwardedRef}
      className={classNames('rui-Kbd', `width-${width}`, withMargin(marginProps), className)}
    />
  );
});
Kbd.displayName = 'Kbd';

export { Kbd };
