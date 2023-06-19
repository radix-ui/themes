import * as React from 'react';
import classNames from 'classnames';
import { extractMarginProps, withMargin } from '../helpers';

import type { MarginProps } from '../helpers';

const kbdWidths = ['command', 'shift', 'space'] as const;
type KbdWidth = (typeof kbdWidths)[number];
const defaultKbdWidth: KbdWidth | undefined = undefined;

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

export { kbdWidths, defaultKbdWidth, Kbd };
export type { KbdWidth };
