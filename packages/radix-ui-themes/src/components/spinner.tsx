import * as React from 'react';
import classNames from 'classnames';
import { spinnerPropDefs } from './spinner.props';
import { extractMarginProps, withMarginProps, withBreakpoints } from '../helpers';

import type { PropsWithoutRefOrColor, MarginProps, GetPropDefTypes } from '../helpers';

type SpinnerElement = React.ElementRef<'span'>;
type SpinnerOwnProps = GetPropDefTypes<typeof spinnerPropDefs>;
interface SpinnerProps extends PropsWithoutRefOrColor<'span'>, MarginProps, SpinnerOwnProps {}
const Spinner = React.forwardRef<SpinnerElement, SpinnerProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const {
    className,
    size = spinnerPropDefs.size.default,
    color = spinnerPropDefs.color.default,
    highContrast = spinnerPropDefs.highContrast.default,
    radius = spinnerPropDefs.radius.default,
    ...spinnerProps
  } = marginRest;

  return (
    <span
      data-accent-color={color}
      data-radius={radius}
      {...spinnerProps}
      ref={forwardedRef}
      className={classNames(
        'rt-Spinner',
        className,
        withBreakpoints(size, 'rt-r-size'),
        { 'rt-high-contrast': highContrast },
        withMarginProps(marginProps)
      )}
    >
      <span className="rt-SpinnerLeaf" />
      <span className="rt-SpinnerLeaf" />
      <span className="rt-SpinnerLeaf" />
      <span className="rt-SpinnerLeaf" />
      <span className="rt-SpinnerLeaf" />
      <span className="rt-SpinnerLeaf" />
      <span className="rt-SpinnerLeaf" />
      <span className="rt-SpinnerLeaf" />
    </span>
  );
});
Spinner.displayName = 'Spinner';

export { Spinner };
export type { SpinnerProps };
