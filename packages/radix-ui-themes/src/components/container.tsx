import * as React from 'react';
import classNames from 'classnames';
import { extractMarginProps, withBreakpoints, withMargin } from '../helpers';

import type { MarginProps, Responsive } from '../helpers';

const containerSizes = ['1', '2', '3'] as const;
type ContainerSize = (typeof containerSizes)[number];
const defaultContainerSize: ContainerSize = '3';

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
        withMargin(marginProps)
      )}
    />
  );
});
Container.displayName = 'Container';

export { containerSizes, defaultContainerSize, Container };
