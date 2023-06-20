import * as React from 'react';
import classNames from 'classnames';
import { extractMarginProps, withMargin } from '../helpers';
import { defaultKbdWidth } from './kbd.props';

import type { MarginProps } from '../helpers';
import type { KbdWidth } from './kbd.props';

type KbdElement = React.ElementRef<'kbd'>;
interface KbdProps extends React.ComponentPropsWithoutRef<'kbd'>, MarginProps {
  width?: KbdWidth;
}
const Kbd = React.forwardRef<KbdElement, KbdProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const { className, width = defaultKbdWidth, ...kbdProps } = marginRest;
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
