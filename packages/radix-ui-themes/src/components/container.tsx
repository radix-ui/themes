import * as React from 'react';
import classNames from 'classnames';
import { containerPropDefs } from './container.props';
import { deprecatedLayoutPropDefs, extractProps, layoutPropDefs, marginPropDefs } from '../helpers';

import type { MarginProps, LayoutProps, GetPropDefTypes } from '../helpers';

type ContainerElement = React.ElementRef<'div'>;
type ContainerOwnProps = GetPropDefTypes<typeof containerPropDefs>;
interface ContainerProps
  extends React.ComponentPropsWithoutRef<'div'>,
    MarginProps,
    LayoutProps,
    ContainerOwnProps {}
const Container = React.forwardRef<ContainerElement, ContainerProps>((props, forwardedRef) => {
  const { children, className, ...containerProps } = extractProps(
    props,
    containerPropDefs,
    layoutPropDefs,
    deprecatedLayoutPropDefs,
    marginPropDefs
  );
  return (
    <div {...containerProps} ref={forwardedRef} className={classNames('rt-Container', className)}>
      <div className="rt-ContainerInner">{children}</div>
    </div>
  );
});
Container.displayName = 'Container';

export { Container };
export type { ContainerProps };
