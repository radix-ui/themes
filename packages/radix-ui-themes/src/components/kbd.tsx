import * as React from 'react';
import classNames from 'classnames';
import { kbdWidthDefault } from './kbd.props';
import { extractMarginProps, withMarginProps } from '../helpers';

import type { KbdWidth } from './kbd.props';
import type { MarginProps } from '../helpers';

type KbdElement = React.ElementRef<'kbd'>;
interface KbdProps extends React.ComponentPropsWithoutRef<'kbd'>, MarginProps {
  width?: KbdWidth;
}
const Kbd = React.forwardRef<KbdElement, KbdProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const { className, width = kbdWidthDefault, ...kbdProps } = marginRest;
  return (
    <kbd
      {...kbdProps}
      ref={forwardedRef}
      className={classNames('rui-Kbd', `width-${width}`, withMarginProps(marginProps), className)}
    />
  );
});
Kbd.displayName = 'Kbd';

export { Kbd };
