import * as React from 'react';
import classNames from 'classnames';
import { containerPropDefs } from './container.props';
import {
  extractMarginProps,
  withMarginProps,
  extractLayoutProps,
  withLayoutProps,
  withBreakpoints,
} from '../helpers';

import type { MarginProps, LayoutProps, GetPropDefTypes } from '../helpers';

type ContainerElement = React.ElementRef<'div'>;
type ContainerOwnProps = GetPropDefTypes<typeof containerPropDefs>;
interface ContainerProps
  extends React.ComponentPropsWithoutRef<'div'>,
    MarginProps,
    LayoutProps,
    ContainerOwnProps {}
const Container = React.forwardRef<ContainerElement, ContainerProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const { rest: layoutRest, ...layoutProps } = extractLayoutProps(marginRest);
  const {
    children,
    className,
    size = containerPropDefs.size.default,
    display = containerPropDefs.display.default,
    ...containerProps
  } = layoutRest;
  return (
    <div
      {...containerProps}
      ref={forwardedRef}
      className={classNames(
        'rt-Container',
        className,
        withBreakpoints(size, 'rt-r-size'),
        withBreakpoints(display, 'rt-r-display'),
        withLayoutProps(layoutProps),
        withMarginProps(marginProps)
      )}
    >
      <div className="rt-ContainerInner">{children}</div>
    </div>
  );
});
Container.displayName = 'Container';

export { Container };
export type { ContainerProps };
