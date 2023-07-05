import * as React from 'react';
import classNames from 'classnames';
import { containerSizeDefault } from './container.props';
import {
  extractMarginProps,
  withMarginProps,
  extractLayoutProps,
  withLayoutProps,
  withBreakpoints,
} from '../helpers';

import type { ContainerSize, ContainerDisplay } from './container.props';
import type { MarginProps, LayoutProps, Responsive } from '../helpers';

type ContainerElement = React.ElementRef<'div'>;
interface ContainerProps extends React.ComponentPropsWithoutRef<'div'>, MarginProps, LayoutProps {
  size?: Responsive<ContainerSize>;
  display?: Responsive<ContainerDisplay>;
}
const Container = React.forwardRef<ContainerElement, ContainerProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const { rest: layoutRest, ...layoutProps } = extractLayoutProps(marginRest);
  const {
    children,
    className,
    size = containerSizeDefault,
    display,
    ...containerProps
  } = layoutRest;
  return (
    <div
      {...containerProps}
      ref={forwardedRef}
      className={classNames(
        className,
        'rui-Container',
        withBreakpoints(size, 'size'),
        withMarginProps(marginProps),
        withLayoutProps(layoutProps),
        withBreakpoints(display, 'rui-display')
      )}
    >
      <div className="rui-ContainerInner">{children}</div>
    </div>
  );
});
Container.displayName = 'Container';

export { Container };
