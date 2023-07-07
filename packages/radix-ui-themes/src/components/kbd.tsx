import * as React from 'react';
import classNames from 'classnames';
import { kbdPropDefs } from './kbd.props';
import { extractMarginProps, withMarginProps } from '../helpers';

import type { MarginProps, GetPropDefTypes } from '../helpers';

type KbdElement = React.ElementRef<'kbd'>;
type KbdOwnProps = GetPropDefTypes<typeof kbdPropDefs>;
interface KbdProps extends React.ComponentPropsWithoutRef<'kbd'>, MarginProps, KbdOwnProps {}
const Kbd = React.forwardRef<KbdElement, KbdProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const { className, width = kbdPropDefs.width.default, ...kbdProps } = marginRest;
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
