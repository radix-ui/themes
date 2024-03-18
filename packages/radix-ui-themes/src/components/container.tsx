import * as React from 'react';
import classNames from 'classnames';
import { Slot } from '@radix-ui/react-slot';
import { containerPropDefs } from './container.props.js';
import { extractProps, getSubtree } from '../helpers/index.js';
import { heightPropDefs, layoutPropDefs, marginPropDefs, widthPropDefs } from '../props/index.js';

import type { ComponentPropsWithout, RemovedProps } from '../helpers/index.js';
import type { MarginProps, LayoutProps, ContainerOwnProps } from '../props/index.js';

type ContainerElement = React.ElementRef<'div'>;
interface ContainerProps
  extends ComponentPropsWithout<'div', RemovedProps>,
    MarginProps,
    LayoutProps,
    ContainerOwnProps {}
const Container = React.forwardRef<ContainerElement, ContainerProps>(
  ({ width, minWidth, maxWidth, height, minHeight, maxHeight, ...props }, forwardedRef) => {
    const { asChild, children, className, ...containerProps } = extractProps(
      props,
      containerPropDefs,
      layoutPropDefs,
      marginPropDefs
    );

    const { className: innerClassName, style: innerStyle } = extractProps(
      { width, minWidth, maxWidth, height, minHeight, maxHeight },
      widthPropDefs,
      heightPropDefs
    );

    const Comp = asChild ? Slot : 'div';

    return (
      <Comp
        {...containerProps}
        ref={forwardedRef}
        className={classNames('rt-Container', className)}
      >
        {getSubtree({ asChild, children }, (children) => (
          <div className={classNames('rt-ContainerInner', innerClassName)} style={innerStyle}>
            {children}
          </div>
        ))}
      </Comp>
    );
  }
);
Container.displayName = 'Container';

export { Container };
export type { ContainerProps };
