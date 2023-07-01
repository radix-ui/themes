import * as React from 'react';
import classNames from 'classnames';
import { defaultContainerSize } from './container.props';
import { extractMarginProps, withBreakpoints, withMarginProps } from '../helpers';

import type { ContainerSize } from './container.props';
import type { MarginProps, Responsive } from '../helpers';

type ContainerElement = React.ElementRef<'div'>;
interface ContainerProps extends React.ComponentPropsWithoutRef<'div'>, MarginProps {
  size?: Responsive<ContainerSize>;
}
const Container = React.forwardRef<ContainerElement, ContainerProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const { className, size = defaultContainerSize, ...containerProps } = marginRest;
  return (
    <div
      {...containerProps}
      ref={forwardedRef}
      className={classNames(
        className,
        'rui-Container',
        withBreakpoints(size, 'size'),
        withMarginProps(marginProps)
      )}
    />
  );
});
Container.displayName = 'Container';

export { Container };
