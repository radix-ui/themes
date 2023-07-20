import * as React from 'react';
import classNames from 'classnames';
import { insetPropDefs } from './inset.props';
import { extractMarginProps, withMarginProps, withBreakpoints } from '../helpers';

import type { MarginProps, GetPropDefTypes } from '../helpers';

type InsetElement = React.ElementRef<'div'>;
type InsetOwnProps = GetPropDefTypes<typeof insetPropDefs>;
interface InsetProps extends React.ComponentPropsWithoutRef<'div'>, MarginProps, InsetOwnProps {}
const Inset = React.forwardRef<InsetElement, InsetProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const {
    className,
    side = insetPropDefs.side.default,
    p,
    px,
    py,
    pt,
    pr,
    pb,
    pl,
    ...insetProps
  } = marginRest;
  return (
    <div
      {...insetProps}
      ref={forwardedRef}
      className={classNames(
        'rt-Inset',
        withMarginProps(marginProps),
        withBreakpoints(p, 'rt-p'),
        withBreakpoints(px, 'rt-px'),
        withBreakpoints(py, 'rt-py'),
        withBreakpoints(pt, 'rt-pt'),
        withBreakpoints(pr, 'rt-pr'),
        withBreakpoints(pb, 'rt-pb'),
        withBreakpoints(pl, 'rt-pl'),
        withBreakpoints(side, 'side'),
        className
      )}
    />
  );
});
Inset.displayName = 'Inset';

export { Inset };
