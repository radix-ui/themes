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
    clip = insetPropDefs.clip.default,
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
        className,
        withBreakpoints(side, 'rt-r-side'),
        withBreakpoints(clip, 'rt-r-clip'),
        withBreakpoints(p, 'rt-r-p'),
        withBreakpoints(px, 'rt-r-px'),
        withBreakpoints(py, 'rt-r-py'),
        withBreakpoints(pt, 'rt-r-pt'),
        withBreakpoints(pr, 'rt-r-pr'),
        withBreakpoints(pb, 'rt-r-pb'),
        withBreakpoints(pl, 'rt-r-pl'),
        withMarginProps(marginProps)
      )}
    />
  );
});
Inset.displayName = 'Inset';

export { Inset };
export type { InsetProps };
