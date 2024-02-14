import * as React from 'react';
import classNames from 'classnames';
import { Slot } from '@radix-ui/react-slot';
import { containerPropDefs } from './container.props.js';
import { extractProps, getRoot, subtract } from '../helpers/index.js';
import {
  deprecatedLayoutPropDefs,
  heightPropDefs,
  layoutPropDefs,
  marginPropDefs,
  widthPropDefs,
} from '../props/index.js';

import type { ComponentPropsWithoutColor } from '../helpers/index.js';
import type { MarginProps, LayoutProps, GetPropDefTypes } from '../props/index.js';

type ContainerElement = React.ElementRef<'div'>;
type ContainerOwnProps = GetPropDefTypes<typeof containerPropDefs>;
interface ContainerProps
  extends ComponentPropsWithoutColor<'div'>,
    MarginProps,
    LayoutProps,
    ContainerOwnProps {}
const Container = React.forwardRef<ContainerElement, ContainerProps>(
  ({ width, minWidth, maxWidth, ...props }, forwardedRef) => {
    const {
      asChild,
      children: childrenProp,
      className,
      ...containerProps
    } = extractProps(
      props,
      containerPropDefs,
      subtract(layoutPropDefs, widthPropDefs),
      deprecatedLayoutPropDefs,
      marginPropDefs
    );

    const { className: innerClassName, style: innerStyle } = extractProps(
      { width, minWidth, maxWidth },
      widthPropDefs,
      heightPropDefs
    );

    const { Root: ContainerRoot, children } = getRoot({
      asChild,
      children: childrenProp,
      parent: asChild ? Slot : 'div',
    });

    return (
      <ContainerRoot
        {...containerProps}
        ref={forwardedRef}
        className={classNames('rt-Container', className)}
      >
        <div className={classNames('rt-ContainerInner', innerClassName)} style={innerStyle}>
          {children}
        </div>
      </ContainerRoot>
    );
  }
);
Container.displayName = 'Container';

export { Container };
export type { ContainerProps };
