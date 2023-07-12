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
        className,
        'rt-Container',
        withBreakpoints(size, 'size'),
        withMarginProps(marginProps),
        withLayoutProps(layoutProps),
        withBreakpoints(display, 'rt-display')
      )}
    >
      <div className="rt-ContainerInner">{children}</div>
    </div>
  );
});
Container.displayName = 'Container';

export { Container };
